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
        style={{ backgroundImage: "url('https://images.unsplash.com/photo-1601654253194-260e0b6984f9?q=80&w=1399&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')" }}
        // style={{ backgroundImage: "url('https://plus.unsplash.com/premium_photo-1663013222785-f653d121e06b?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')" }}

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
          Discover Your Ayurvedic Mind-Body Type.
          <br />
          <span className="text-2xl md:text-4xl italic">
            Uncover your unique blueprint—Vata, Pitta, or Kapha—for a balanced life.
          </span>
        </h1>

        <button 
          onClick={handleStart} // 4. Call the redirect function
          className="group relative px-8 py-4 bg-white text-[#2F3E46] font-medium rounded-full transition-all hover:bg-[#84A98C] hover:text-white shadow-lg"
        >
          <span className="relative z-10 flex items-center gap-2">
            Start the Assessment
          </span>
        </button>
      </motion.div>
      
      {/* ... Footer same as before ... */}
    </div>
  );
};

export default HeroLanding;