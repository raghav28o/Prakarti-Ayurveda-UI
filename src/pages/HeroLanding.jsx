import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Leaf } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { ENDPOINTS } from '../apiConfig';

const HeroLanding = () => {
  const navigate = useNavigate();

  const [animationStage, setAnimationStage] = useState(0);
  const [lineWidth, setLineWidth] = useState(0);

  const text = "Prakarti AyurVeda";

  useEffect(() => {
    // Stage 0 → Text reveal
    const timer1 = setTimeout(() => setAnimationStage(1), 2500);
    // Stage 1 → Move title to top
    const timer2 = setTimeout(() => setAnimationStage(2), 4200);

    // Animated underline
    const lineTimer = setTimeout(() => {
      let progress = 0;
      const interval = setInterval(() => {
        progress += 5;
        setLineWidth(progress);
        if (progress >= 100) clearInterval(interval);
      }, 80);
    }, 800);

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
      clearTimeout(lineTimer);
    };
  }, []);

  const handleStart = () => {
    navigate('/DoshaAwareness');
  };

  return (
    <div className="relative min-h-screen w-full overflow-hidden">

      <header className="absolute top-0 right-0 p-4 z-40">
        <motion.a
          href={`${ENDPOINTS.GOOGLE_AUTH}`}
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 1.0 }}
          className="px-6 py-3 bg-blue-500 text-white rounded-full hover:bg-blue-600 transition-all shadow-lg text-sm flex items-center gap-2"
        >
          <svg className="w-4 h-4" viewBox="0 0 533.5 544.3" xmlns="http://www.w3.org/2000/svg"><path d="M533.5 272.3c0-18.7-1.5-36.8-4.7-54.3H272.1v104.8h147c-6.1 33.8-25.7 63.7-59.2 84.4l-.1 1.7 87.7 67.9.1.8c51.9-47.2 82.2-116.2 82.2-192.8z" fill="#4285F4"/><path d="M272.1 544.3c73.4 0 135.3-24.1 180.4-65.7l-87.7-68c-24.4 16.6-55.9 26-92.6 26-71 0-131.2-47.9-152.9-112.3l-1.4.1-85.2 65.9-.9 1.6c43.9 87.7 136 149.9 240.4 149.9z" fill="#34A853"/><path d="M119.3 324.3c-11.4-33.8-11.4-70.1 0-103.9V21.4L33.9 85.1l-2.6 1.6C12.4 133.9 0 190.1 0 272.3s12.4 138.4 31.3 192.6l85.4-66c-3.1-9.2-4.7-18.7-4.7-28.1z" fill="#FBBC04"/><path d="M272.1 107.7c38.8-.6 74.3 14 101.2 40.4l76.7-76.6C405.4 24.1 339.7-.8 272.1 0 167.7 0 75.5 62.2 31.5 149.9l87.9 67.9c21.6-64 81.7-111.9 152.7-111.9z" fill="#EA4335"/></svg>
          Login with Google
        </motion.a>
      </header>


      {/* ================= Background Image ================= */}
      <motion.div
        initial={{ y: '100%' }}
        animate={{ y: animationStage >= 1 ? '0%' : '100%' }}
        transition={{ duration: 1.5, ease: [0.43, 0.13, 0.23, 0.96] }}
        className="absolute inset-0 z-0 bg-cover bg-center"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1601654253194-260e0b6984f9?q=80&w=1399&auto=format&fit=crop')"
        }}
      >
        <div className="absolute inset-0 bg-black/20" />
      </motion.div>

      {/* ================= Black Overlay ================= */}
      <motion.div
        initial={{ y: 0 }}
        animate={{ y: animationStage >= 1 ? '-100%' : 0 }}
        transition={{ duration: 1.5, ease: [0.43, 0.13, 0.23, 0.96] }}
        className="absolute inset-0 z-10 bg-black"
      />

      {/* ================= Animated Title ================= */}
      <motion.div
        initial={{ top: '50%', y: '-50%' }}
        animate={{
          top: animationStage >= 1 ? '0%' : '50%',
          y: animationStage >= 1 ? '0%' : '-50%',
        }}
        transition={{ duration: 1.5, ease: [0.43, 0.13, 0.23, 0.96] }}
        className="fixed inset-x-0 flex justify-center z-30"

      >
        <motion.div
          animate={{
            scale: animationStage >= 1 ? 0.6 : 1,
            padding: animationStage >= 1 ? '1rem 1.5rem' : '0'
          }}
          transition={{ duration: 1.5 }}
          className={`flex flex-col items-center gap-3 ${
            animationStage >= 1
              ? 'bg-white/10 backdrop-blur-md border border-white/20 rounded-full'
              : ''
          }`}
        >
          <div className="flex items-center gap-3">
            <Leaf
              size={animationStage >= 1 ? 24 : 40}
              className="fill-white text-white transition-all duration-1000"
            />

            <div
              className="font-serif italic text-white tracking-wide whitespace-nowrap"
              style={{
                fontSize: animationStage >= 1
                  ? '1.25rem'
                  : 'clamp(1.5rem, 5vw, 3rem)'
              }}
            >
              {text.split('').map((char, i) => (
                <motion.span
                  key={i}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.5 + i * 0.1 }}
                >
                  {char}
                </motion.span>
              ))}
            </div>
          </div>

          {/* Underline */}
          {animationStage === 0 && (
            <motion.div
              className="h-0.5 bg-gradient-to-r from-transparent via-white to-transparent"
              style={{ width: `${lineWidth}%`, maxWidth: '300px' }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            />
          )}
        </motion.div>
      </motion.div>

      {/* ================= Glass Card ================= */}
      <motion.div
        initial={{ scale: 0.85, opacity: 0 }}
        animate={{
          scale: animationStage >= 2 ? 1 : 0.85,
          opacity: animationStage >= 2 ? 1 : 0
        }}
        transition={{ duration: 0.8, delay: 0.3 }}
        className="relative z-20 min-h-screen flex items-center justify-center px-4"
      >
        <div className="w-[90%] max-w-2xl p-12 rounded-[40px] border border-white/30 bg-white/20 backdrop-blur-xl shadow-2xl text-center">

          <motion.h1
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="text-4xl md:text-6xl font-serif text-white mb-6"
          >
            Discover Your Ayurvedic Mind-Body Type.
            <br />
            <span className="text-2xl md:text-4xl italic">
              Uncover your unique blueprint—Vata, Pitta, or Kapha.
            </span>
          </motion.h1>

          <div className='flex justify-center items-center gap-x-4'>
          <motion.button
            onClick={handleStart}
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.9 }}
            className="px-8 py-4 bg-white text-[#2F3E46] rounded-full hover:bg-[#84A98C] hover:text-white transition-all shadow-lg"
          >
            Start the Assessment
          </motion.button>
          </div>
        </div>
      </motion.div>

    </div>
  );
};

export default HeroLanding;
