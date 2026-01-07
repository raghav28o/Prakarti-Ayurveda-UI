import React, { useEffect, useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { useNavigate, useLocation } from 'react-router-dom';
import { ENDPOINTS } from '../apiConfig';

const ProcessingLoading = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [error, setError] = useState(null);
  const hasRunRef = useRef(false);

  useEffect(() => {
    // Prevent multiple API calls using ref (survives strict mode)
    if (hasRunRef.current) {
      console.log('⚠️ Duplicate call prevented');
      return;
    }
    hasRunRef.current = true;

    const runAssessment = async () => {
      console.log('🚀 Starting assessment API call at', new Date().toLocaleTimeString());

      try {
        // 1. Get the answers we stored during the quiz
        const answers = location.state?.responses || [];

        // 2. Get the JWT token from localStorage
        const token = localStorage.getItem('token');

        // 3. Call your Spring Boot API with timeout
        console.log('📤 Calling:', ENDPOINTS.RUN_ASSESSMENT, 'with', answers.length, 'responses');
        const startTime = performance.now();

        // Create abort controller for timeout
        const controller = new AbortController();
        const timeoutId = setTimeout(() => {
          controller.abort();
          console.log('⏱️ Request timeout after 30s');
        }, 30000); // 30 second timeout

        const response = await fetch(ENDPOINTS.RUN_ASSESSMENT, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}` // Send the JWT to Spring Boot
          },
          body: JSON.stringify(answers),
          signal: controller.signal
        });

        clearTimeout(timeoutId);

        const endTime = performance.now();
        const elapsedSeconds = ((endTime - startTime) / 1000).toFixed(2);
        console.log(`✅ API call completed in ${elapsedSeconds}s`);

        if (response.ok) {
          const dietPlanData = await response.json();
          console.log('📦 Received data, navigating to results...');

          // 4. Success! Move to the result page with the data
          navigate('/result', { state: { plan: dietPlanData } });
        } else {
          setError("Prakartim is having trouble connecting. Please try again.");
        }
      } catch (err) {
        if (err.name === 'AbortError') {
          console.error('❌ Request aborted due to timeout');
          setError("Request timed out. The backend is taking too long to respond.");
        } else {
          console.error('❌ Connection error:', err);
          setError(`Connection error: ${err.message}. Check if your backend is running.`);
        }
      }
    };

    runAssessment();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); // Run only once on mount

  if (error) return <div className="min-h-screen flex items-center justify-center text-red-500">{error}</div>;

  return (
    <div className="min-h-screen bg-[#f0f4f0] flex flex-col items-center justify-center">
      <motion.div
        animate={{ scale: [1, 1.1, 1], rotate: [0, 5, -5, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
        className="text-6xl mb-6"
      >
        🌿
      </motion.div>
      <h2 className="text-2xl font-serif text-[#2F3E46] animate-pulse">
        Analyzing your unique Prakarti...
      </h2>
      <p className="text-[#84A98C] mt-2 italic text-sm">Our AI agent is crafting your sacred diet plan.</p>
    </div>
  );
};

export default ProcessingLoading;