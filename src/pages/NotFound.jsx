import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

const NotFound = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-[#f0f4f0] flex flex-col items-center justify-center p-6 text-center">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-2xl"
      >
        {/* 404 Number */}
        <motion.h1
          initial={{ scale: 0.5 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", stiffness: 200 }}
          className="text-9xl font-serif font-bold text-[#84A98C] mb-4"
        >
          404
        </motion.h1>

        {/* Message */}
        <h2 className="text-3xl font-serif text-[#2F3E46] mb-4">
          Page Not Found
        </h2>
        <p className="text-lg text-[#2F3E46]/70 mb-12">
          Oops! The page you're looking for doesn't exist.
          <br />
          Let's get you back on track.
        </p>

        {/* Leaf decoration */}
        <motion.div
          animate={{ rotate: [0, 10, -10, 0] }}
          transition={{ duration: 3, repeat: Infinity }}
          className="text-6xl mb-8"
        >
          🌿
        </motion.div>

        {/* Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => navigate('/')}
            className="px-8 py-4 bg-[#2F3E46] text-white rounded-full font-medium shadow-lg hover:bg-black transition-all"
          >
            Go Home
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => navigate(-1)}
            className="px-8 py-4 bg-sage-300 text-clay-900 rounded-full font-medium shadow-lg hover:bg-sage-400 transition-all"
          >
            Go Back
          </motion.button>
        </div>

        <p className="mt-8 text-sm text-[#2F3E46]/50 italic">
          "Not all who wander are lost" — but this page is.
        </p>
      </motion.div>
    </div>
  );
};

export default NotFound;
