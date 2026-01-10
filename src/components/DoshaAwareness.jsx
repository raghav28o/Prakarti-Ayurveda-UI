import React from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import DoshaCard from "./DoshaCard";

const doshas = [
  {
    title: "Vata",
    element: "Air & Ether",
    icon: "🌬️",
    color: "bg-[#D0E7E9]",
    description: "Vata governs movement, creativity, and communication.",
    mind: "Quick thinking, imaginative, adaptable",
    body: "Light frame, dry skin, cold hands & feet",
    imbalance: "Anxiety, insomnia, bloating",
    balance: "Grounded, calm, creative flow",
  },
  {
    title: "Pitta",
    element: "Fire & Water",
    icon: "🔥",
    color: "bg-[#FFD8B1]",
    description: "Pitta controls digestion, metabolism, and intelligence.",
    mind: "Focused, sharp, goal-oriented",
    body: "Moderate build, warm body, strong digestion",
    imbalance: "Anger, acidity, inflammation",
    balance: "Confident, clear, balanced energy",
  },
  {
    title: "Kapha",
    element: "Earth & Water",
    icon: "🌿",
    color: "bg-[#E2E2BE]",
    description: "Kapha provides structure, stability, and immunity.",
    mind: "Calm, compassionate, steady",
    body: "Strong build, smooth skin, good stamina",
    imbalance: "Weight gain, laziness, congestion",
    balance: "Strong, loving, emotionally stable",
  },
];

const DoshaAwareness = () => {
  const navigate = useNavigate();

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -24 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="min-h-screen flex flex-col items-center justify-center px-6 py-20 text-[#2F3E46]"
    >
      {/* Header */}
      <div className="text-center max-w-2xl mb-16">
        <h2 className="text-3xl md:text-4xl font-serif mb-4">
          The Three Vital Energies
        </h2>
        <p className="text-lg opacity-80 leading-relaxed">
          Ayurveda teaches that your body and mind are governed by three
          fundamental energies. Everyone has all three — but in unique
          proportions.
        </p>
      </div>

      {/* Dosha Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full max-w-6xl">
        {doshas.map((dosha) => (
          <DoshaCard
            key={dosha.title}
            title={dosha.title}
            element={dosha.element}
            icon={dosha.icon}
            color={dosha.color}
            description={dosha.description}
            mind={dosha.mind}
            body={dosha.body}
            imbalance={dosha.imbalance}
            balance={dosha.balance}
          />
        ))}
      </div>

      {/* Why it matters */}
      <div className="max-w-3xl text-center mt-20">
        <h3 className="text-2xl font-serif mb-4">
          Why Knowing Your Dosha Matters
        </h3>
        <p className="text-md opacity-75 leading-relaxed">
          In Ayurveda, imbalance is the root of discomfort and disease.
          Understanding your dominant dosha allows us to personalize your
          <strong> diet, lifestyle, sleep, and daily routine</strong> — instead
          of following generic health advice.
        </p>
      </div>

      {/* CTA */}
      <motion.button
        whileTap={{ scale: 0.96 }}
        whileHover={{ scale: 1.02 }}
        onClick={() => navigate("/assessment")}
        className="mt-16 px-12 py-4 bg-[#2F3E46] text-white rounded-full font-semibold shadow-xl hover:bg-black transition-colors"
      >
        Discover My Dosha Type
      </motion.button>

      <p className="mt-4 text-sm opacity-50 italic">
        Takes less than 3 minutes • Personalized insights
      </p>
    </motion.div>
  );
};

export default DoshaAwareness;
