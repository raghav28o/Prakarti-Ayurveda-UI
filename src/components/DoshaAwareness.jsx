import React, { useState } from "react";
import { motion } from "framer-motion";
import { Wind, Flame, Sprout, ChevronRight } from "lucide-react";
import { useNavigate } from "react-router-dom";

const doshas = [
  {
    title: "Vata",
    element: "Air & Ether",
    icon: Wind,
    gradient: "from-blue-100 to-cyan-50",
    accentColor: "bg-blue-500",
    description: "The energy of movement and creativity",
    characteristics: [
      { label: "Mind", value: "Quick, creative, intuitive" },
      { label: "Body", value: "Lean, agile, light frame" },
      { label: "When Balanced", value: "Creative, energetic, joyful" },
      { label: "When Imbalanced", value: "Anxious, restless, scattered" }
    ],
    qualities: ["Cold", "Dry", "Light", "Mobile", "Subtle"]
  },
  {
    title: "Pitta",
    element: "Fire & Water",
    icon: Flame,
    gradient: "from-orange-100 to-amber-50",
    accentColor: "bg-orange-500",
    description: "The energy of transformation and metabolism",
    characteristics: [
      { label: "Mind", value: "Sharp, focused, determined" },
      { label: "Body", value: "Athletic, warm, strong digestion" },
      { label: "When Balanced", value: "Confident, purposeful, radiant" },
      { label: "When Imbalanced", value: "Irritable, inflamed, critical" }
    ],
    qualities: ["Hot", "Sharp", "Light", "Oily", "Intense"]
  },
  {
    title: "Kapha",
    element: "Earth & Water",
    icon: Sprout,
    gradient: "from-green-100 to-emerald-50",
    accentColor: "bg-green-600",
    description: "The energy of structure and stability",
    characteristics: [
      { label: "Mind", value: "Calm, compassionate, steady" },
      { label: "Body", value: "Strong, resilient, smooth skin" },
      { label: "When Balanced", value: "Grounded, loving, patient" },
      { label: "When Imbalanced", value: "Lethargic, resistant, heavy" }
    ],
    qualities: ["Heavy", "Slow", "Cool", "Oily", "Smooth"]
  },
];

const DoshaCard = ({ dosha, isHovered, onHover, onLeave }) => {
  const Icon = dosha.icon;
  
  return (
    <motion.div
      onMouseEnter={onHover}
      onMouseLeave={onLeave}
      className="relative h-full"
    >
      <motion.div
        animate={{
          scale: isHovered ? 1.05 : 1,
          y: isHovered ? -8 : 0,
        }}
        transition={{ duration: 0.3, ease: "easeOut" }}
        className={`relative h-full bg-gradient-to-br ${dosha.gradient} rounded-3xl p-8 cursor-pointer overflow-hidden`}
      >
        {/* Accent bar */}
        <div className={`absolute top-0 left-0 right-0 h-1 ${dosha.accentColor}`} />
        
        {/* Icon */}
        <motion.div
          animate={{
            scale: isHovered ? 1.1 : 1,
            rotate: isHovered ? 5 : 0,
          }}
          transition={{ duration: 0.3 }}
          className="mb-6"
        >
          <div className={`w-16 h-16 rounded-2xl ${dosha.accentColor} flex items-center justify-center`}>
            <Icon className="w-8 h-8 text-white" />
          </div>
        </motion.div>

        {/* Title */}
        <h3 className="text-3xl text-gray-800 mb-2">{dosha.title}</h3>
        <p className="text-sm text-gray-600 mb-4 font-medium">{dosha.element}</p>
        
        {/* Description */}
        <p className="text-gray-700 mb-6 leading-relaxed">{dosha.description}</p>

        {/* Characteristics - shown on hover */}
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{
            opacity: isHovered ? 1 : 0,
            height: isHovered ? "auto" : 0,
          }}
          transition={{ duration: 0.3 }}
          className="space-y-3 overflow-hidden"
        >
          {dosha.characteristics.map((char, idx) => (
            <motion.div
              key={idx}
              initial={{ x: -20, opacity: 0 }}
              animate={{
                x: isHovered ? 0 : -20,
                opacity: isHovered ? 1 : 0,
              }}
              transition={{ delay: idx * 0.1, duration: 0.3 }}
            >
              <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1">
                {char.label}
              </p>
              <p className="text-sm text-gray-700">{char.value}</p>
            </motion.div>
          ))}

          {/* Qualities tags */}
          <div className="flex flex-wrap gap-2 pt-4">
            {dosha.qualities.map((quality, idx) => (
              <span
                key={idx}
                className="px-3 py-1 bg-white/60 backdrop-blur-sm rounded-full text-xs font-medium text-gray-700"
              >
                {quality}
              </span>
            ))}
          </div>
        </motion.div>

        {/* Hover indicator */}
        <motion.div
          animate={{
            opacity: isHovered ? 1 : 0,
          }}
          className="absolute bottom-6 right-6"
        >
          <ChevronRight className="w-5 h-5 text-gray-600" />
        </motion.div>
      </motion.div>
    </motion.div>
  );
};

const DoshaAwareness = () => {
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const navigate = useNavigate();


  const handleStart = () => {
    navigate('/assessment');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white">
      {/* Header Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="max-w-7xl mx-auto px-6 pt-20 pb-12"
      >
        <div className="text-center max-w-3xl mx-auto">
          <motion.div
            initial={{ scale: 0.9 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.5 }}
            className="inline-block px-4 py-2 bg-gradient-to-r from-blue-100 to-green-100 rounded-full mb-6"
          >
            <span className="text-sm font-medium text-gray-700">Ancient Wisdom, Modern Application</span>
          </motion.div>
          
          <h1 className="text-5xl md:text-6xl text-gray-900 mb-6 leading-tight">
            The Three Doshas
          </h1>
          <p className="text-xl text-gray-600 leading-relaxed">
            Your unique constitution is shaped by three fundamental energies. Understanding your dosha unlocks personalized pathways to optimal health and wellbeing.
          </p>
        </div>
      </motion.div>

      {/* Dosha Cards */}
      <div className="max-w-7xl mx-auto px-6 pb-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {doshas.map((dosha, index) => (
            <DoshaCard
              key={dosha.title}
              dosha={dosha}
              isHovered={hoveredIndex === index}
              onHover={() => setHoveredIndex(index)}
              onLeave={() => setHoveredIndex(null)}
            />
          ))}
        </div>
      </div>

      {/* Why It Matters Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="max-w-4xl mx-auto px-6 py-16"
      >
        <div className="bg-white rounded-3xl p-10 md:p-12 shadow-sm border border-gray-100">
          <h2 className="text-3xl font-serif text-gray-900 mb-6 text-center">
            Why Your Dosha Matters
          </h2>
          <p className="text-lg text-gray-600 leading-relaxed text-center mb-8">
            In Ayurveda, imbalance is the root of discomfort. When you understand your unique constitution, you can personalize your diet, lifestyle, sleep patterns, and daily routines—moving beyond generic wellness advice to what truly works for you.
          </p>
          
          <div className="grid md:grid-cols-3 gap-6 mt-8">
            <div className="text-center p-6">
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">🍽️</span>
              </div>
              <h3 className="font-semibold text-gray-800 mb-2">Personalized Nutrition</h3>
              <p className="text-sm text-gray-600">Foods that balance your unique energy</p>
            </div>
            
            <div className="text-center p-6">
              <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">🧘</span>
              </div>
              <h3 className="font-semibold text-gray-800 mb-2">Tailored Practices</h3>
              <p className="text-sm text-gray-600">Exercise and routines suited to you</p>
            </div>
            
            <div className="text-center p-6">
              <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">✨</span>
              </div>
              <h3 className="font-semibold text-gray-800 mb-2">Optimal Wellbeing</h3>
              <p className="text-sm text-gray-600">Live in harmony with your nature</p>
            </div>
          </div>
        </div>
      </motion.div>

      {/* CTA Section */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        className="text-center py-20 px-6"
      >
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.98 }}
          onClick={handleStart}
          className="group relative px-10 py-5 bg-gradient-to-r from-gray-900 to-gray-800 text-white rounded-full font-semibold text-lg shadow-xl hover:shadow-2xl transition-all"
        >
          <span className="flex items-center gap-3">
            Discover Your Dosha Type
            <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </span>
        </motion.button>
        <p className="mt-6 text-sm text-gray-500">
          Take the 3-minute assessment • Get personalized insights
        </p>
      </motion.div>
    </div>
  );
};

export default DoshaAwareness;