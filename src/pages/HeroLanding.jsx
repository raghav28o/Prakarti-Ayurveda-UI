import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Leaf } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

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
      </motion.div>

    </div>
  );
};

export default HeroLanding;
