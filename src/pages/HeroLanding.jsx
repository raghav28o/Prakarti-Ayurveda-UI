import React from 'react';
import { motion } from 'framer-motion';
import { Leaf } from 'lucide-react';
import { useNavigate } from 'react-router-dom'; // 1. Import useNavigate

const HeroLanding = () => {
  const navigate = useNavigate(); // 2. Initialize navigate

  const handleStart = () => {
    navigate('/DoshaAwareness'); // 3. Function to redirect
  };

  return (
    <div className="relative min-h-screen w-full flex items-center justify-center overflow-hidden bg-[#f0f4f0]">
      {/* ... Background and Doodle code same as before ... */}
      <div 
        className="absolute inset-0 z-0 bg-cover bg-center transition-transform duration-1000 scale-105"
        style={{ backgroundImage: "url('https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?q=80&w=2000&auto=format&fit=crop')" }}
      >
        <div className="absolute inset-0 bg-black/10" /> 
      </div>

      <motion.div 
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="relative z-20 w-[90%] max-w-2xl p-12 rounded-[40px] border border-white/30 bg-white/20 backdrop-blur-xl shadow-2xl text-center"
      >
        {/* ... Logo and Text same as before ... */}
        <div className="flex items-center justify-center gap-2 mb-6 text-white/90">
          <Leaf size={24} className="fill-current" />
          <span className="font-serif italic text-xl tracking-wide">Prakarti AyurVeda</span>
        </div>

        <h1 className="text-4xl md:text-6xl font-serif text-white leading-tight mb-6">
          Your Body Knows the Way.<br />
          <span className="italic">Let's Listen.</span>
        </h1>

        <button 
          onClick={handleStart} // 4. Call the redirect function
          className="group relative px-8 py-4 bg-white text-[#2F3E46] font-medium rounded-full transition-all hover:bg-[#84A98C] hover:text-white shadow-lg"
        >
          <span className="relative z-10 flex items-center gap-2">
            Discover Your Prakarti 🌿
          </span>
        </button>
      </motion.div>
      
      {/* ... Footer same as before ... */}
    </div>
  );
};

export default HeroLanding;