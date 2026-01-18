import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  CheckCircle2,
  Circle,
  ArrowLeft,
  Sparkles,
} from 'lucide-react';
import { useNavigate, useLocation } from 'react-router-dom';
import { isAuthenticated } from '../utils/auth';
import { ENDPOINTS } from '../apiConfig';

const Assessment = ({ questions }) => {
  const navigate = useNavigate();
  const location = useLocation();

  const [currentIndex, setCurrentIndex] = useState(0);
  const [userResponses, setUserResponses] = useState([]);
  const [selectedOption, setSelectedOption] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  /* ================= API SUBMISSION ================= */
  const submitAssessment = async (responses) => {
    setIsLoading(true);
    setError(null);

    const token = localStorage.getItem('token');
    if (!token || token === 'undefined') {
      navigate('/auth', { state: { responses } });
      return;
    }

    const userRaw = localStorage.getItem('user');
    if (!userRaw || userRaw === 'undefined') {
      navigate('/auth', { state: { responses } });
      return;
    }

    let user;
    try {
      user = JSON.parse(userRaw);
    } catch {
      navigate('/auth', { state: { responses } });
      return;
    }

    const isFromDashboard = location.state?.from === 'dashboard';
    const endpoint = isFromDashboard ? ENDPOINTS.RUN_WEEKLY_ASSESSMENT : ENDPOINTS.RUN_ASSESSMENT;
    const navigationTarget = isFromDashboard ? '/dashboard' : '/result';

    try {
      const response = await fetch(endpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(responses),
      });

      if (!response.ok) {
        throw new Error('Failed to submit assessment');
      }

      const result = await response.json();

      navigate(navigationTarget, { state: { plan: result } });
    } catch (err) {
      setError(err.message || 'Something went wrong');
    } finally {
      setIsLoading(false);
    }
  };

  /* ================= ANSWER HANDLER ================= */
  const handleAnswer = (option, optionIndex) => {
    setSelectedOption(optionIndex);

    setTimeout(() => {
      const newResponse = {
        questionCode: questions[currentIndex].questionCode,
        answerValue: option.answerValue,
        doshaType: option.doshaType,
        weight: option.weight,
      };

      const updatedResponses = [...userResponses, newResponse];
      setUserResponses(updatedResponses);

      if (currentIndex < questions.length - 1) {
        setCurrentIndex(currentIndex + 1);
        setSelectedOption(null);
      } else {
        if (isAuthenticated()) {
          submitAssessment(updatedResponses);
        } else {
          navigate('/auth', { state: { responses: updatedResponses } });
        }
      }
    }, 350);
  };

  /* ================= PREVIOUS ================= */
  const handlePrevious = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
      setUserResponses(userResponses.slice(0, -1));
      setSelectedOption(null);
    }
  };

  const currentQuestion = questions[currentIndex];
  const progress = ((currentIndex + 1) / questions.length) * 100;

  /* ================= LOADING SCREEN ================= */
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 via-blue-50 to-green-50">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center"
        >
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
            className="w-16 h-16 border-4 border-blue-200 border-t-blue-600 rounded-full mx-auto mb-6"
          />
          <h3 className="text-2xl font-serif text-gray-800 mb-2">
            Analyzing Your Constitution
          </h3>
          <p className="text-gray-600">
            Preparing your personalized insights...
          </p>
        </motion.div>
      </div>
    );
  }

  /* ================= MAIN UI ================= */
  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-green-50 to-teal-50 relative overflow-hidden">
      <div className="relative z-10 min-h-screen flex flex-col items-center justify-center p-6 py-12">

        {/* Header */}
        <div className="w-full max-w-3xl mb-8">
          <div className="flex items-center justify-between mb-6">
            {currentIndex > 0 && (
              <button
                onClick={handlePrevious}
                className="flex items-center gap-2 text-gray-600 hover:text-gray-900"
              >
                <ArrowLeft className="w-5 h-5" />
                <span>Previous</span>
              </button>
            )}

            <div className="ml-auto flex items-center gap-2 text-sm text-gray-600">
              <Sparkles className="w-4 h-4 text-amber-500" />
              <span>
                Question {currentIndex + 1} of {questions.length}
              </span>
            </div>
          </div>

          {/* Progress Bar */}
          <div className="h-2 bg-white/50 rounded-full overflow-hidden">
            <motion.div
              animate={{ width: `${progress}%` }}
              transition={{ duration: 0.4 }}
              className="h-full bg-gradient-to-r from-orange-400 via-amber-500 to-green-500"
            />
          </div>

          {/* Progress Dots */}
          <div className="flex justify-center gap-2 mt-4">
            {questions.map((_, i) =>
              i < currentIndex ? (
                <CheckCircle2 key={i} className="w-3 h-3 text-green-600" />
              ) : i === currentIndex ? (
                <Circle
                  key={i}
                  className="w-3 h-3 text-amber-600 fill-amber-500"
                />
              ) : (
                <Circle key={i} className="w-3 h-3 text-gray-300" />
              )
            )}
          </div>
        </div>

        {/* Question Card */}
        <AnimatePresence mode="wait">
          <motion.div
            key={currentIndex}
            initial={{ x: 100, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: -100, opacity: 0 }}
            transition={{ duration: 0.35 }}
            className="w-full max-w-3xl bg-white/80 backdrop-blur-xl rounded-3xl p-8 shadow-2xl"
          >
            <h2 className="text-3xl md:text-4xl font-serif text-gray-800 mb-8">
              {currentQuestion.text}
            </h2>

            <div className="space-y-4">
              {currentQuestion.options.map((option, index) => {
                const isSelected = selectedOption === index;

                return (
                  <motion.button
                    key={index}
                    onClick={() => handleAnswer(option, index)}
                    disabled={selectedOption !== null}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className={`w-full text-left p-6 rounded-2xl transition-all
                      ${
                        isSelected
                          ? 'bg-gradient-to-r from-amber-500 to-green-600 text-white'
                          : 'bg-white hover:shadow-lg'
                      }
                    `}
                  >
                    {option.label}
                  </motion.button>
                );
              })}
            </div>

            {error && (
              <p className="mt-6 text-sm text-red-600 text-center">
                {error}
              </p>
            )}
          </motion.div>
        </AnimatePresence>

        <p className="mt-8 text-sm text-gray-600 italic text-center">
          Choose the option that resonates most with you.
        </p>
      </div>
    </div>
  );
};

export default Assessment;
