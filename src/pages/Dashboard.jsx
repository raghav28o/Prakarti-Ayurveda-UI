import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { isAuthenticated, logout } from '../utils/auth';
import { Leaf, User, Wind, Flame, Sprout, Soup, Salad, Wheat, AlertTriangle } from 'lucide-react';

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
  const [activeDay, setActiveDay] = useState(new Date().toLocaleString('en-US', { weekday: 'long' }).toUpperCase());

  useEffect(() => {
    const initialPlan = location.state?.plan;
    if (initialPlan) {
      localStorage.setItem('lastPlan', JSON.stringify(initialPlan));
      setPlan(initialPlan);
    } else {
      const storedPlan = localStorage.getItem('lastPlan');
      if (storedPlan) {
        setPlan(JSON.parse(storedPlan));
      } else {
        navigate('/assessment');
      }
    }
  }, [location.state?.plan, navigate]);

  if (!plan) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <p className="text-gray-500">Loading your personalized plan...</p>
      </div>
    );
  }

  const { assessment, dietPlan } = plan;
  const { dailyDiets, avoidFoods, doshaType } = dietPlan;
  const currentDoshaStyle = doshaColors[doshaType] || doshaColors['VATA'];
  const activeDayPlan = dailyDiets.find(d => d.dayOfWeek === activeDay) || dailyDiets[0];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-green-50 text-gray-800">
      {/* Header */}
      <header className="p-4 flex justify-between items-center max-w-7xl mx-auto">
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

      <main className="max-w-7xl mx-auto p-4 md:p-8">
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
        <div className="grid md:grid-cols-3 gap-8">
          {/* Left Panel: User Info & Scores */}
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7 }}
            className="md:col-span-1 space-y-8"
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
            transition={{ duration: 0.7 }}
            className="md:col-span-2 bg-white/80 backdrop-blur-sm p-6 rounded-2xl shadow-lg border border-gray-200/80"
          >
            {/* Day Tabs */}
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
                  <MealCard icon={Wheat} title="Breakfast" description={activeDayPlan.breakfast} />
                  <MealCard icon={Salad} title="Lunch" description={activeDayPlan.lunch} />
                  <MealCard icon={Soup} title="Dinner" description={activeDayPlan.dinner} />
              </motion.div>
            </AnimatePresence>
            <div className="mt-8 text-center">
                <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => navigate('/assessment', { state: { from: 'dashboard' } })}
                className="px-8 py-4 bg-green-600 text-white rounded-full font-bold shadow-lg hover:bg-green-700 transition-all"
                >
                Take Assessment to Regenerate Plan
                </motion.button>
            </div>
          </motion.div>
        </div>
      </main>
    </div>
  );
};

const MealCard = ({ icon: Icon, title, description }) => (
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

export default Dashboard;

