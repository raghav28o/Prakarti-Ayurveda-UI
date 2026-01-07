import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ENDPOINTS } from '../apiConfig';

const ResultPage = () => {
  const location = useLocation();
  const [plan, setPlan] = useState(location.state?.plan);
  const [showRegenerateModal, setShowRegenerateModal] = useState(false);
  const [isRegenerating, setIsRegenerating] = useState(false);
  const [userDetails, setUserDetails] = useState({
    age: plan?.assessment?.user?.age || '',
    gender: plan?.assessment?.user?.gender || 'Male',
    location: plan?.assessment?.user?.location || '',
    foodPreference: plan?.assessment?.user?.foodPreference || 'VEG'
  });
  const [errors, setErrors] = useState({});

  if (!plan) return <div className="p-10 text-center">No plan found. Please take the quiz again.</div>;

  const { assessment, dietPlan } = plan;
  const { breakfast, lunch, dinner, avoidFoods, doshaType } = dietPlan;

  const validateForm = () => {
    const newErrors = {};

    // Age validation
    if (!userDetails.age) {
      newErrors.age = 'Age is required';
    } else if (userDetails.age < 1 || userDetails.age > 100) {
      newErrors.age = 'Age must be between 1 and 100';
    }

    // Location validation
    if (!userDetails.location || userDetails.location.trim() === '') {
      newErrors.location = 'Location is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleRegeneratePlan = async () => {
    // Validate form
    if (!validateForm()) {
      return;
    }

    setIsRegenerating(true);

    try {
      const token = localStorage.getItem('token');
      const userId = assessment.user.id;
      const assessmentId = assessment.id;

      // Step 1: Update user details
      console.log('📝 Updating user details...');
      const updateResponse = await fetch(`${ENDPOINTS.BASE_URL}/api/users/${userId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(userDetails)
      });

      if (!updateResponse.ok) {
        throw new Error('Failed to update user details');
      }

      console.log('✅ User details updated');

      // Step 2: Regenerate diet plan
      console.log('🔄 Regenerating diet plan...');
      const regenerateResponse = await fetch(`${ENDPOINTS.BASE_URL}/api/assessments/${assessmentId}/regenerate-diet-plan`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        }
      });

      if (!regenerateResponse.ok) {
        const errorText = await regenerateResponse.text();
        console.error('Backend error:', errorText);
        throw new Error(`Failed to regenerate diet plan: ${regenerateResponse.status}`);
      }

      const newPlan = await regenerateResponse.json();
      console.log('✅ New diet plan generated:', newPlan);

      setPlan(newPlan);
      setShowRegenerateModal(false);
      alert('🎉 Your personalized diet plan has been regenerated!');

    } catch (error) {
      console.error('❌ Error regenerating plan:', error);

      // Show user-friendly error
      let errorMessage = 'Failed to regenerate plan. ';
      if (error.message.includes('500')) {
        errorMessage += 'The server encountered an error. Please try again or contact support.';
      } else if (error.message.includes('401') || error.message.includes('403')) {
        errorMessage += 'Your session may have expired. Please login again.';
      } else {
        errorMessage += error.message || 'Please try again.';
      }

      alert(errorMessage);
    } finally {
      setIsRegenerating(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#f8f9f8] p-6 md:p-12">
      <div className="max-w-4xl mx-auto">
        {/* Header Section */}
        <header className="text-center mb-12">
          <span className="text-[#84A98C] font-bold uppercase tracking-widest">Your Result</span>
          <h1 className="text-5xl font-serif text-[#2F3E46] mt-2">
            You are predominantly <span className="italic underline">{doshaType}</span>
          </h1>
        </header>

        {/* 1. Score Section */}
        <div className="grid grid-cols-3 gap-4 mb-10">
          {[
            { label: 'Vata', score: assessment.vataScore, color: 'bg-blue-100' },
            { label: 'Pitta', score: assessment.pittaScore, color: 'bg-orange-100' },
            { label: 'Kapha', score: assessment.kaphaScore, color: 'bg-green-100' }
          ].map((item) => (
            <div key={item.label} className={`${item.color} p-4 rounded-2xl text-center shadow-sm`}>
              <p className="text-xs uppercase font-bold opacity-60">{item.label}</p>
              <p className="text-2xl font-bold">{item.score}</p>
            </div>
          ))}
        </div>

        {/* 2. Diet Plan Cards */}
        <div className="space-y-6">
          <h3 className="text-2xl font-serif text-[#2F3E46] border-b pb-2">Your Daily Ritual</h3>
          
          <div className="grid md:grid-cols-3 gap-6">
            <PlanCard title="Breakfast" content={breakfast} icon="🥣" />
            <PlanCard title="Lunch" content={lunch} icon="🥗" />
            <PlanCard title="Dinner" content={dinner} icon="🍲" />
          </div>

          {/* 3. Avoid Section */}
          <div className="mt-8 p-6 bg-red-50 rounded-[32px] border border-red-100">
            <h4 className="text-red-800 font-bold flex items-center gap-2">
              ⚠️ Foods to Minimize
            </h4>
            <p className="text-red-700 mt-2">{avoidFoods}</p>
          </div>

          {/* 4. Regenerate Button */}
          <div className="mt-12 text-center">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setShowRegenerateModal(true)}
              className="px-8 py-4 bg-[#84A98C] text-white rounded-full font-bold shadow-lg hover:bg-[#6d8a75] transition-all"
            >
              ✨ Regenerate AI Powered Diet Plan
            </motion.button>
            <p className="text-sm text-gray-500 mt-2 italic">Get a personalized plan based on your preferences</p>
          </div>
        </div>
      </div>

      {/* Regenerate Modal */}
      <AnimatePresence>
        {showRegenerateModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
            onClick={() => !isRegenerating && setShowRegenerateModal(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-white rounded-[32px] p-8 max-w-md w-full shadow-2xl"
            >
              <h3 className="text-2xl font-serif text-[#2F3E46] mb-6">
                Personalize Your Plan
              </h3>

              <div className="space-y-4">
                {/* Age */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Age *</label>
                  <input
                    type="number"
                    min="1"
                    max="100"
                    value={userDetails.age}
                    onChange={(e) => {
                      const value = parseInt(e.target.value);
                      setUserDetails({...userDetails, age: value});
                      setErrors({...errors, age: ''});
                    }}
                    className={`w-full p-3 rounded-xl border ${errors.age ? 'border-red-500' : 'border-gray-300'} focus:ring-2 focus:ring-[#84A98C] outline-none`}
                    placeholder="25"
                  />
                  {errors.age && <p className="text-red-500 text-xs mt-1">{errors.age}</p>}
                </div>

                {/* Gender */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Gender *</label>
                  <select
                    value={userDetails.gender}
                    onChange={(e) => setUserDetails({...userDetails, gender: e.target.value})}
                    className="w-full p-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-[#84A98C] outline-none"
                  >
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                    <option value="Transgender">Transgender</option>
                  </select>
                </div>

                {/* Location */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Location *</label>
                  <input
                    type="text"
                    value={userDetails.location}
                    onChange={(e) => {
                      setUserDetails({...userDetails, location: e.target.value});
                      setErrors({...errors, location: ''});
                    }}
                    className={`w-full p-3 rounded-xl border ${errors.location ? 'border-red-500' : 'border-gray-300'} focus:ring-2 focus:ring-[#84A98C] outline-none`}
                    placeholder="Gurugram, Haryana"
                  />
                  {errors.location && <p className="text-red-500 text-xs mt-1">{errors.location}</p>}
                </div>

                {/* Food Preference */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Food Preference *</label>
                  <select
                    value={userDetails.foodPreference}
                    onChange={(e) => setUserDetails({...userDetails, foodPreference: e.target.value})}
                    className="w-full p-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-[#84A98C] outline-none"
                  >
                    <option value="VEG">Vegetarian</option>
                    <option value="NON_VEG">Non-Vegetarian</option>
                    <option value="EGGETARIAN">Eggetarian</option>
                    <option value="VEGAN">Vegan</option>
                    <option value="JAIN">Jain</option>
                  </select>
                </div>
              </div>

              {/* Buttons */}
              <div className="flex gap-3 mt-6">
                <button
                  onClick={() => setShowRegenerateModal(false)}
                  disabled={isRegenerating}
                  className="flex-1 py-3 border border-gray-300 rounded-full font-medium hover:bg-gray-50 disabled:opacity-50"
                >
                  Cancel
                </button>
                <button
                  onClick={handleRegeneratePlan}
                  disabled={isRegenerating}
                  className="flex-1 py-3 bg-[#84A98C] text-white rounded-full font-bold hover:bg-[#6d8a75] disabled:opacity-50"
                >
                  {isRegenerating ? '🔄 Regenerating...' : '✨ Regenerate'}
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

// Simple reusable card component
const PlanCard = ({ title, content, icon }) => (
  <div className="bg-white p-6 rounded-[32px] shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
    <div className="text-3xl mb-3">{icon}</div>
    <h4 className="font-bold text-[#2F3E46] mb-2">{title}</h4>
    <p className="text-sm leading-relaxed text-gray-600">{content}</p>
  </div>
);

export default ResultPage;