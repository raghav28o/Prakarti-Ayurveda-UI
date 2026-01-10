import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { isAuthenticated } from '../utils/auth';
import { ENDPOINTS } from '../apiConfig';

const Assessment = ({ questions }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [userResponses, setUserResponses] = useState([]);
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const submitAssessment = async (responses) => {
    setIsLoading(true);
    setError(null);

    const token = localStorage.getItem('token');
    const user = JSON.parse(localStorage.getItem('user'));

    try {
      const response = await fetch(ENDPOINTS.RUN_ASSESSMENT, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          userId: user.id,
          responses: responses
        })
      });

      if (!response.ok) {
        throw new Error('Failed to submit assessment');
      }

      const result = await response.json();
      navigate('/result', { state: { plan: result } });

    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleAnswer = (option) => {
    const newResponse = {
      questionCode: questions[currentIndex].questionCode,
      answerValue: option.answerValue,
      doshaType: option.doshaType,
      weight: option.weight
    };

    const updatedResponses = [...userResponses, newResponse];
    setUserResponses(updatedResponses);

    if (currentIndex < questions.length - 1) {
      setCurrentIndex(currentIndex + 1);
    } else {
      if (isAuthenticated()) {
        submitAssessment(updatedResponses);
      } else {
        navigate('/auth', { state: { responses: updatedResponses } });
      }
    }
  };

  const currentQuestion = questions[currentIndex];
  const progress = ((currentIndex + 1) / questions.length) * 100;

  return (
    <div className="min-h-screen bg-[#f4f1de] flex flex-col items-center justify-center p-6">
      {/* Progress Bar */}
      <div className="w-full max-w-xl bg-gray-200 h-2 rounded-full mb-12 relative overflow-hidden">
        <motion.div 
          initial={{ width: 0 }}
          animate={{ width: `${progress}%` }}
          className="bg-[#84A98C] h-full"
        />
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={currentIndex}
          initial={{ x: 50, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          exit={{ x: -50, opacity: 0 }}
          transition={{ duration: 0.4, ease: "easeInOut" }}
          className="w-full max-w-2xl bg-white/60 backdrop-blur-md p-10 rounded-[40px] shadow-xl border border-white"
        >
          <span className="text-sm font-medium text-[#84A98C] uppercase tracking-widest">
            Question {currentIndex + 1} of {questions.length}
          </span>
          
          <h2 className="text-3xl font-serif text-[#2F3E46] mt-4 mb-10 leading-snug">
            {currentQuestion.text}
          </h2>

          <div className="space-y-4">
            {currentQuestion.options.map((option, index) => (
              <motion.button
                key={index}
                whileHover={{ scale: 1.02, backgroundColor: "#ffffff" }}
                whileTap={{ scale: 0.98 }}
                onClick={() => handleAnswer(option)}
                className="w-full text-left p-6 rounded-2xl border border-[#84A98C]/20 bg-white/40 hover:shadow-md transition-all text-[#2F3E46] text-lg"
              >
                {option.label}
              </motion.button>
            ))}
          </div>
        </motion.div>
      </AnimatePresence>

      <p className="mt-8 text-sm text-[#2F3E46]/50 italic">
        Answer honestly. There are no wrong choices.
      </p>
    </div>
  );
};

export default Assessment;