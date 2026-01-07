import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

const doshas = [
  {
    title: "Vata",
    element: "Air & Ether",
    traits: "Creative, Energetic, Light",
    color: "bg-[#D0E7E9]", // Soft Blue/Teal
    icon: "🌬️"
  },
  {
    title: "Pitta",
    element: "Fire & Water",
    traits: "Driven, Intelligent, Warm",
    color: "bg-[#FFD8B1]", // Soft Orange
    icon: "🔥"
  },
  {
    title: "Kapha",
    element: "Earth & Water",
    traits: "Calm, Grounded, Loyal",
    color: "#E2E2BE", // Soft Earthy Green
    icon: "🌿"
  }
];

const DoshaAwareness = ({ onNext }) => {
  const navigate = useNavigate();

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="flex flex-col items-center justify-center min-h-screen p-6 text-[#2F3E46]"
    >
      <h2 className="text-3xl md:text-4xl font-serif mb-4">The Three Vital Energies</h2>
      <p className="text-lg mb-12 opacity-80">Which one feels like you?</p>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full max-w-6xl">
        {doshas.map((dosha, index) => (
          <motion.div
            key={dosha.title}
            whileHover={{ y: -10 }}
            className={`${dosha.color === "#E2E2BE" ? 'bg-[#E2E2BE]' : dosha.color} p-8 rounded-[32px] shadow-sm flex flex-col items-center text-center border border-white/50`}
          >
            <span className="text-4xl mb-4">{dosha.icon}</span>
            <h3 className="text-2xl font-serif font-bold mb-2">{dosha.title}</h3>
            <p className="text-sm font-medium uppercase tracking-widest opacity-60 mb-4">{dosha.element}</p>
            <p className="text-md leading-relaxed opacity-80">{dosha.traits}</p>
          </motion.div>
        ))}
      </div>

      <motion.button
        whileTap={{ scale: 0.95 }}
        onClick={() => navigate('/assessment')} // 3. Redirect to assessment
        className="mt-16 px-10 py-4 bg-[#2F3E46] text-white rounded-full font-medium shadow-lg hover:bg-black transition-colors"
      >
        Take the Assessment
      </motion.button>
      
      <p className="mt-4 text-sm opacity-50 italic">Let's find out for sure.</p>
    </motion.div>
  );
};

export default DoshaAwareness;