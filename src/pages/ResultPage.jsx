import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ENDPOINTS } from '../apiConfig';
import { isAuthenticated, logout } from '../utils/auth';
import { Leaf, Wind, Flame, Sprout, Soup, Salad, Wheat, AlertTriangle, Settings, User, MapPin, Star, X } from 'lucide-react';
import fetchWithAuth from '../utils/api';

const doshaColors = {
  VATA: {
    bg: 'bg-blue-100',
    text: 'text-blue-800',
    border: 'border-blue-300',
    icon: Wind,
  },
  PITTA: {
    bg: 'bg-orange-100',
    text: 'text-orange-800',
    border: 'border-orange-300',
    icon: Flame,
  },
  KAPHA: {
    bg: 'bg-green-100',
    text: 'text-green-800',
    border: 'border-green-300',
    icon: Sprout,
  },
};

const ResultPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [plan, setPlan] = useState(null);
  const [showRegenerateModal, setShowRegenerateModal] = useState(false);
  const [isRegenerating, setIsRegenerating] = useState(false);
  const [userDetails, setUserDetails] = useState({
    age: '',
    gender: 'Male',
    location: '',
    foodPreference: 'VEG'
  });
  const [errors, setErrors] = useState({});

  useEffect(() => {
    const initialPlan = location.state?.plan;
    if (initialPlan) {
      localStorage.setItem('lastPlan', JSON.stringify(initialPlan));
      setPlan(initialPlan);
    } else {
      const storedPlan = localStorage.getItem('lastPlan');
      if (storedPlan) {
        setPlan(JSON.parse(storedPlan));
      }
    }
  }, [location.state?.plan]);

  useEffect(() => {
    if (plan) {
      setUserDetails({
        age: plan.assessment?.user?.age || '',
        gender: plan.assessment?.user?.gender || 'Male',
        location: plan.assessment?.user?.location || '',
        foodPreference: plan.assessment?.user?.foodPreference || 'VEG'
      });
    }
  }, [plan]);

  const validateForm = () => {
    const newErrors = {};
    if (!userDetails.age || userDetails.age < 1 || userDetails.age > 100) newErrors.age = 'A valid age is required';
    if (!userDetails.location || userDetails.location.trim() === '') newErrors.location = 'Location is required';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleRegeneratePlan = async () => {
    if (!validateForm()) return;
    setIsRegenerating(true);
    try {
      const token = localStorage.getItem('token'); // Keep this for userDetails PUT, as fetchWithAuth doesn't handle body for PUT.
      const userId = plan.assessment.user.id;
      const assessmentId = plan.assessment.id;

      await fetchWithAuth(`${ENDPOINTS.BASE_URL}/api/users/${userId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(userDetails)
      });

      const regenerateResponse = await fetchWithAuth(`${ENDPOINTS.BASE_URL}/api/assessments/${assessmentId}/regenerate-diet-plan`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' }
      });

      if (!regenerateResponse.ok) throw new Error(`Failed to regenerate diet plan: ${regenerateResponse.status}`);
      
      const newPlan = await regenerateResponse.json();
      localStorage.setItem('lastPlan', JSON.stringify(newPlan));
      navigate('/dashboard', { state: { plan: newPlan } });

    } catch (error) {
      console.error('❌ Error regenerating plan:', error);
      setErrors({ form: 'Failed to regenerate plan. Please try again.' });
    } finally {
      setIsRegenerating(false);
    }
  };

  if (!plan) {
    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50">
            <p className="text-gray-500">Loading your personalized plan...</p>
      </div>
    );
  }

  const { assessment, dietPlan } = plan;
  const { breakfast, lunch, dinner, avoidFoods, doshaType } = dietPlan;
  const currentDoshaStyle = doshaColors[doshaType] || doshaColors.VATA;
  const Icon = currentDoshaStyle.icon;

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-green-50 text-gray-800">
      <header className="p-4 flex justify-between items-center max-w-5xl mx-auto">
        <div className="flex items-center gap-2">
          <Leaf className="text-green-600" size={24} />
          <span className="font-serif text-xl font-semibold">Prakarti AyurVeda</span>
        </div>
        {isAuthenticated() && (
          <button
            onClick={logout}
            className="px-4 py-2 text-sm font-medium text-gray-700 hover:text-green-700 transition-colors"
          >
            Logout
          </button>
        )}
      </header>

      <main className="max-w-5xl mx-auto p-4 md:p-8">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}>
          <div className="text-center mb-12">
            <motion.div
              initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: 'spring', delay: 0.2 }}
              className={`w-24 h-24 ${currentDoshaStyle.bg} rounded-full flex items-center justify-center mx-auto mb-6`}
            >
              <Icon size={48} className={currentDoshaStyle.text} />
            </motion.div>
            <h1 className="text-4xl md:text-5xl font-serif text-gray-900 leading-tight">
              You are Predominantly <span className={currentDoshaStyle.text}>{doshaType}</span>
            </h1>
            <p className="text-lg text-gray-600 mt-2">Here is your initial assessment and diet outline.</p>
          </div>

          <div className="bg-white/80 backdrop-blur-sm p-8 rounded-2xl shadow-lg border border-gray-200/80 mb-8">
            <h3 className="text-lg font-semibold mb-4 text-center">Your Dosha Scores</h3>
            <div className="flex justify-around items-end">
              {Object.entries({ VATA: assessment.vataScore, PITTA: assessment.pittaScore, KAPHA: assessment.kaphaScore }).map(([key, value]) => {
                const style = doshaColors[key];
                const isDominant = key === doshaType;
                return (
                  <div key={key} className="text-center w-24">
                    <motion.div
                      initial={{ height: 0 }} animate={{ height: `${(value / 50) * 100}%` }} transition={{ duration: 1, delay: 0.5 }}
                      className={`mx-auto w-12 rounded-t-lg ${style.text.replace('text-', 'bg-')} ${isDominant ? 'opacity-100' : 'opacity-40'}`}
                    />
                    <p className={`mt-2 font-bold ${style.text}`}>{value}</p>
                    <p className={`text-sm font-semibold ${style.text}`}>{key}</p>
                  </div>
                );
              })}
            </div>
          </div>
          
          <div className="grid md:grid-cols-3 gap-6 mb-8 text-center">
            <MealCard icon={Wheat} title="Breakfast" description={breakfast} />
            <MealCard icon={Salad} title="Lunch" description={lunch} />
            <MealCard icon={Soup} title="Dinner" description={dinner} />
          </div>

          <div className="bg-red-50 p-6 rounded-2xl border border-red-200 mb-12">
            <h3 className="font-bold text-red-800 flex items-center gap-2 mb-2"><AlertTriangle size={20} /> Foods to Minimize</h3>
            <p className="text-sm text-red-700 leading-relaxed">{avoidFoods}</p>
          </div>

          <div className="text-center">
             <motion.button
                whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}
                onClick={() => setShowRegenerateModal(true)}
                className="px-8 py-4 bg-green-600 text-white rounded-full font-bold shadow-lg hover:bg-green-700 transition-all text-lg"
              >
                <div className='flex justify-center items-center gap-x-2'>
                <Settings /> Personalize Your Weekly Plan
                </div>
            </motion.button>
            <p className="text-sm text-gray-500 mt-3 italic">Refine your diet plan with personal details for a full week's schedule.</p>
          </div>
        </motion.div>
      </main>

      <AnimatePresence>
        {showRegenerateModal && (
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4"
            onClick={() => !isRegenerating && setShowRegenerateModal(false)}
          >
            <motion.div
              initial={{ scale: 0.9, y: 50 }} animate={{ scale: 1, y: 0 }} exit={{ scale: 0.9, y: 50 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-white rounded-2xl p-8 max-w-lg w-full shadow-2xl relative"
            >
              <button onClick={() => setShowRegenerateModal(false)} className="absolute top-4 right-4 text-gray-400 hover:text-gray-600">
                <X />
              </button>
              <h3 className="text-2xl font-serif text-gray-800 mb-2">Personalize Your Plan</h3>
              <p className="text-gray-600 mb-6">Provide these details to create a diet plan tailored to you.</p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormInput icon={User} label="Age" error={errors.age}>
                  <input type="number" min="1" max="100" value={userDetails.age} onChange={(e) => setUserDetails({...userDetails, age: parseInt(e.target.value)})} className="w-full bg-transparent outline-none" placeholder="e.g. 25" />
                </FormInput>
                <FormInput icon={User} label="Gender">
                  <select value={userDetails.gender} onChange={(e) => setUserDetails({...userDetails, gender: e.target.value})} className="w-full bg-transparent outline-none appearance-none">
                    <option>Male</option><option>Female</option><option>Transgender</option>
                  </select>
                </FormInput>
                <FormInput icon={MapPin} label="Location" error={errors.location}>
                  <input type="text" value={userDetails.location} onChange={(e) => setUserDetails({...userDetails, location: e.target.value})} className="w-full bg-transparent outline-none" placeholder="e.g. Gurugram, Haryana" />
                </FormInput>
                <FormInput icon={Star} label="Food Preference">
                  <select value={userDetails.foodPreference} onChange={(e) => setUserDetails({...userDetails, foodPreference: e.target.value})} className="w-full bg-transparent outline-none appearance-none">
                    <option value="VEG">Vegetarian</option><option value="NON_VEG">Non-Vegetarian</option><option value="EGGETARIAN">Eggetarian</option><option value="VEGAN">Vegan</option><option value="JAIN">Jain</option>
                  </select>
                </FormInput>
              </div>

              {errors.form && <p className="text-red-500 text-sm mt-4 text-center">{errors.form}</p>}
              
              <div className="mt-8">
                <button
                  onClick={handleRegeneratePlan}
                  disabled={isRegenerating}
                  className="w-full py-4 bg-green-600 text-white rounded-full font-bold hover:bg-green-700 disabled:opacity-50 transition-all flex items-center justify-center gap-2"
                >
                  {isRegenerating ? '🔄 Regenerating...' : '✨ Create My Weekly Plan'}
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

const MealCard = ({ icon: Icon, title, description }) => (
    <motion.div whileHover={{ scale: 1.05 }} className="bg-white/60 p-6 rounded-2xl shadow-sm border border-gray-200/60 text-center">
        <div className="bg-green-100 text-green-700 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4">
            <Icon size={24} />
        </div>
        <h4 className="font-bold text-lg text-gray-800 mb-1">{title}</h4>
        <p className="text-sm text-gray-600 leading-relaxed">{description}</p>
    </motion.div>
);

const FormInput = ({ icon: Icon, label, error, children }) => (
    <div>
        <label className="block text-sm font-medium text-gray-500 mb-1">{label}</label>
        <div className={`flex items-center gap-3 p-3 rounded-lg border ${error ? 'border-red-400' : 'border-gray-200'} bg-gray-50/50 focus-within:border-green-500 focus-within:ring-1 focus-within:ring-green-500`}>
            <Icon size={18} className={error ? 'text-red-500' : 'text-gray-400'} />
            {children}
        </div>
        {error && <p className="text-red-500 text-xs mt-1">{error}</p>}
    </div>
);

export default ResultPage;