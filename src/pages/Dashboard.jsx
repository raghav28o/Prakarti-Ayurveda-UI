import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { isAuthenticated, logout } from '../utils/auth';
import { Leaf, User, Wind, Flame, Sprout, Soup, Salad, Wheat, AlertTriangle, History, CalendarDays } from 'lucide-react';
import { ENDPOINTS } from '../apiConfig';
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

const Dashboard = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [plan, setPlan] = useState(null);
  const [historyPlans, setHistoryPlans] = useState([]);
  const [selectedHistoryPlanId, setSelectedHistoryPlanId] = useState(null);
  const [activeDay, setActiveDay] = useState(new Date().toLocaleString('en-US', { weekday: 'long' }).toUpperCase());
  const [isRegenerating, setIsRegenerating] = useState(false);

  const handleRegenerate = async () => {
    if (!plan || !plan.assessment?.id) {
        console.error("No assessment available to regenerate.");
        return;
    }
    setIsRegenerating(true);
    try {
        const assessmentId = plan.assessment.id;
        const regenerateResponse = await fetchWithAuth(`${ENDPOINTS.BASE_URL}/api/assessments/${assessmentId}/regenerate-diet-plan`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' }
        });

        if (!regenerateResponse.ok) {
            throw new Error(`Failed to regenerate diet plan: ${regenerateResponse.status}`);
        }
        
        const newPlan = await regenerateResponse.json();
        
        setPlan(newPlan);
        
        const response = await fetchWithAuth(ENDPOINTS.ASSESSMENT_HISTORY, {});
        if (!response.ok) {
          throw new Error('Failed to fetch history');
        }
        const data = await response.json();
        const sortedData = data.sort((a, b) => new Date(b.assessment.createdAt) - new Date(a.assessment.createdAt));
        setHistoryPlans(sortedData);
        setSelectedHistoryPlanId(newPlan.assessment.id);

    } catch (error) {
        console.error('❌ Error regenerating plan:', error);
    } finally {
        setIsRegenerating(false);
    }
  };

  useEffect(() => {
    const fetchHistory = async () => {
      try {
        // Token handling is now inside fetchWithAuth, no need to check here
        // If not authenticated, fetchWithAuth will still proceed, and backend will handle auth errors.

        const response = await fetchWithAuth(ENDPOINTS.ASSESSMENT_HISTORY, {});
        if (!response.ok) {
          throw new Error('Failed to fetch history');
        }
        const data = await response.json();
        // Sort history by date, most recent first
        const sortedData = data.sort((a, b) => new Date(b.assessment.createdAt) - new Date(a.assessment.createdAt));
        setHistoryPlans(sortedData);

        const initialPlan = location.state?.plan;
        if (initialPlan) {
          setPlan(initialPlan);
          setSelectedHistoryPlanId(initialPlan.assessment.id);
        } else if (sortedData.length > 0) {
          setPlan(sortedData[0]); // Load the most recent plan by default
          setSelectedHistoryPlanId(sortedData[0].assessment.id);
        }

      } catch (error) {
        console.error("Error fetching assessment history:", error);
        // Handle error, e.g., redirect to login or show an error message
      }
    };

    fetchHistory();
  }, [navigate, location.state?.plan, ENDPOINTS.ASSESSMENT_HISTORY]); // Added ENDPOINTS.ASSESSMENT_HISTORY to dependencies

  const handleHistoryClick = (historicalPlan) => {
    setPlan(historicalPlan);
    setSelectedHistoryPlanId(historicalPlan.assessment.id);
    // If the historical plan has daily diets, set active day to its first day, otherwise reset to current weekday
    if (historicalPlan.dietPlan?.dailyDiets && historicalPlan.dietPlan.dailyDiets.length > 0) {
      setActiveDay(historicalPlan.dietPlan.dailyDiets[0].dayOfWeek.toUpperCase());
    } else {
      setActiveDay(new Date().toLocaleString('en-US', { weekday: 'long' }).toUpperCase());
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
  const { breakfast, lunch, dinner, dailyDiets, avoidFoods, doshaType } = dietPlan;
  const currentDoshaStyle = doshaColors[doshaType] || doshaColors['VATA'];

  // Determine if dailyDiets array is valid and not empty
  const hasDailyDiets = dailyDiets && dailyDiets.length > 0;

  // Set activeDayPlan based on whether dailyDiets exist
  const currentDisplayedPlan = hasDailyDiets
    ? dailyDiets.find(d => d.dayOfWeek === activeDay) || dailyDiets[0]
    : { breakfast, lunch, dinner }; // Fallback to top-level meals

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-green-50 to-emerald-100 text-gray-800 relative overflow-hidden">
      {/* Decorative background leaves */}
      <motion.div
        initial={{ rotate: 0 }}
        animate={{ rotate: 360 }}
        transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
        className="absolute top-[10%] left-[5%] text-green-300 opacity-20 text-8xl pointer-events-none select-none"
        key="leaf1"
      >
        🌿
      </motion.div>
      <motion.div
        initial={{ rotate: 0 }}
        animate={{ rotate: -360 }}
        transition={{ duration: 50, repeat: Infinity, ease: "linear" }}
        className="absolute bottom-[10%] right-[5%] text-emerald-300 opacity-20 text-9xl pointer-events-none select-none"
        key="leaf2"
      >
        🍃
      </motion.div>
      <div className="absolute top-[20%] right-[15%] text-green-200 opacity-15 text-7xl pointer-events-none select-none">
        🌱
      </div>
      <div className="absolute bottom-[20%] left-[15%] text-emerald-200 opacity-15 text-6xl pointer-events-none select-none">
        🌿
      </div>
      <div className="relative z-10"> {/* Wrap main content in a relative div with z-index */}
        {/* Header */}
        <header className="p-4 flex justify-between items-center w-full">
        <div className="flex items-center gap-2">
          <Leaf className="text-green-600" size={24} />
          <span className="font-serif text-xl font-semibold">Prakarti AyurVeda</span>
        </div>
        <div className="flex items-center gap-4">
          {isAuthenticated() ? (
            <button
              onClick={logout}
              className="px-4 py-2 text-sm font-medium text-white bg-green-600 rounded-full hover:bg-green-700 transition-colors"
            >
              Logout
            </button>
          ) : (
            <button
              onClick={() => navigate('/auth')}
              className="px-4 py-2 text-sm font-medium text-white bg-green-600 rounded-full hover:bg-green-700 transition-colors"
            >
              Login
            </button>
          )}
        </div>
      </header>

      <main className="w-full py-4 md:py-8 px-12 md:px-20">
        {/* Main Title */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-serif text-gray-900 leading-tight">
            Your Path to Balance
          </h1>
          <p className="text-lg text-gray-600 mt-2">
            A weekly diet plan tailored for your <span className={`font-semibold ${currentDoshaStyle.text}`}>{doshaType}</span> constitution.
          </p>
        </div>

        {/* Main Content Grid */}
        <div className="grid md:grid-cols-6 gap-8">
          {/* NEW Leftmost Panel: Assessment History */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7 }}
            className="md:col-span-1 space-y-8"
          >
            <div className="bg-white/80 backdrop-blur-sm p-6 rounded-2xl shadow-sm border border-gray-200/80">
              <h3 className="text-lg font-semibold mb-4 flex items-center gap-2"><History size={20} /> Past Plans</h3>
              <div className="space-y-3 max-h-[calc(100vh-200px)] overflow-y-auto"> {/* Adjusted max-height */}
                {historyPlans.map((hp) => {
                  const date = new Date(hp.assessment.createdAt).toLocaleDateString('en-US', {
                    year: 'numeric', month: 'short', day: 'numeric'
                  });
                  return (
                    <button
                      key={hp.assessment.id}
                      onClick={() => handleHistoryClick(hp)}
                      className={`w-full text-left p-3 rounded-lg flex items-center justify-between transition-colors
                        ${selectedHistoryPlanId === hp.assessment.id ? 'bg-green-100 text-green-800 font-medium' : 'hover:bg-gray-50 text-gray-700'}
                      `}
                    >
                      <span><CalendarDays size={16} className="inline mr-2" />{date}</span>
                      <span className={`text-xs font-bold px-2 py-1 rounded-full ${doshaColors[hp.assessment.dominantDosha]?.bg} ${doshaColors[hp.assessment.dominantDosha]?.text}`}>
                        {hp.assessment.dominantDosha}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>
          </motion.div>

          {/* Left Panel: User Info & Scores */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="md:col-span-2 space-y-8"
          >
            {/* User Card */}
            <div className="bg-white/80 backdrop-blur-sm p-6 rounded-2xl shadow-sm border border-gray-200/80">
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center">
                  <User size={32} className="text-green-700" />
                </div>
                <div>
                  <h2 className="text-xl font-bold">{assessment.user.name}</h2>
                  <p className="text-sm text-gray-600">{assessment.user.email}</p>
                </div>
              </div>
            </div>

            {/* Dosha Scores */}
            <div className="bg-white/80 backdrop-blur-sm p-6 rounded-2xl shadow-sm border border-gray-200/80">
              <h3 className="text-lg font-semibold mb-4">Your Dosha Scores</h3>
              <div className="space-y-4">
                {Object.entries({ VATA: assessment.vataScore, PITTA: assessment.pittaScore, KAPHA: assessment.kaphaScore }).map(([key, value]) => {
                  const style = doshaColors[key];
                  const Icon = style.icon;
                  return (
                    <div key={key} className={`p-4 rounded-lg ${style.bg}`}>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <Icon size={20} className={style.text} />
                          <span className={`font-bold ${style.text}`}>{key}</span>
                        </div>
                        <span className={`font-semibold text-lg ${style.text}`}>{value}</span>
                      </div>
                      <div className="w-full bg-gray-200/50 rounded-full h-1.5 mt-2">
                        <div className={`h-1.5 rounded-full ${style.text.replace('text-', 'bg-')}`} style={{ width: `${(value / (assessment.vataScore + assessment.pittaScore + assessment.kaphaScore)) * 100}%` }}></div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
            
            {/* Foods to Minimize */}
            <div className="bg-red-50 p-6 rounded-2xl border border-red-200">
                <h3 className="font-bold text-red-800 flex items-center gap-2 mb-2">
                    <AlertTriangle size={20} />
                    Foods to Minimize
                </h3>
                <p className="text-sm text-red-700 leading-relaxed">{avoidFoods}</p>
            </div>
          </motion.div>

          {/* Right Panel: Weekly Plan */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="md:col-span-3 bg-white/80 backdrop-blur-sm p-6 rounded-2xl shadow-lg border border-gray-200/80"
          >
            {hasDailyDiets && (
                <div className="flex justify-between border-b border-gray-200 mb-6">
                {dailyDiets.map(day => (
                    <button
                    key={day.id}
                    onClick={() => setActiveDay(day.dayOfWeek)}
                    className={`text-sm font-semibold pb-3 -mb-px px-1 transition-colors ${activeDay === day.dayOfWeek ? `border-b-2 ${currentDoshaStyle.border} ${currentDoshaStyle.text}` : 'text-gray-500 hover:text-gray-800'}`}
                    >
                    {day.dayOfWeek.substring(0, 3)}
                    </button>
                ))}
                </div>
            )}


            {/* Meal Cards */}
            <AnimatePresence mode="wait">
              <motion.div
                key={activeDay}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
                className="space-y-6"
              >
                  <MealCard icon={Wheat} title="Breakfast" description={currentDisplayedPlan.breakfast} />
                  <MealCard icon={Salad} title="Lunch" description={currentDisplayedPlan.lunch} />
                  <MealCard icon={Soup} title="Dinner" description={currentDisplayedPlan.dinner} />
              </motion.div>
            </AnimatePresence>
          </motion.div>
        </div>
        
        {/* Regenerate Button outside the grid */}
        <div className="mt-12 text-center flex justify-center items-center gap-4">
            <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => navigate('/assessment', { state: { from: 'dashboard' } })}
            className="px-8 py-4 bg-green-600 text-white rounded-full font-bold shadow-lg hover:bg-green-700 transition-all"
            >
            Take Assessment to Regenerate Plan
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleRegenerate}
              disabled={isRegenerating}
              className="px-8 py-4 bg-orange-500 text-white rounded-full font-bold shadow-lg hover:bg-orange-600 transition-all disabled:opacity-50"
            >
              {isRegenerating ? '🔄 Regenerating...' : 'Regenerate Plan without Assessment'}
            </motion.button>
        </div>
      </main>
      </div> {/* Closing tag for relative z-10 div */}
    </div>
  );
};

const MealCard = ({ icon: Icon, title, description }) => {
    return (
        <div className="flex gap-4 items-start">
            <div className="bg-green-100 text-green-700 w-12 h-12 rounded-full flex-shrink-0 flex items-center justify-center">
                <Icon size={24} />
            </div>
            <div>
                <h4 className="font-bold text-lg text-gray-800 mb-1">{title}</h4>
                <p className="text-sm text-gray-600 leading-relaxed">{description}</p>
            </div>
        </div>
    );
};

export default Dashboard;