import React, { useState, useRef } from "react";
import { motion } from "framer-motion";
import { Wind, Flame, Sprout, ChevronRight, VolumeX, Volume2 } from "lucide-react";
import { useNavigate } from "react-router-dom";
import YouTube from 'react-youtube';

// Enhanced dosha data with specific theming properties
const doshaData = [
  {
    title: "Vata",
    element: "Air & Ether",
    icon: Wind,
    description: "Represents movement, creativity, and impulse. Vata energy is like the wind—light, cool, and dry.",
    gradient: "from-sky-100 to-gray-50",
    iconBg: "bg-sky-200",
    iconColor: "text-sky-800",
  },
  {
    title: "Pitta",
    element: "Fire & Water",
    icon: Flame,
    description: "Embodies transformation, metabolism, and intellect. Pitta energy is like fire—hot, sharp, and intense.",
    gradient: "from-amber-100 to-red-50",
    iconBg: "bg-amber-200",
    iconColor: "text-amber-800",
  },
  {
    title: "Kapha",
    element: "Earth & Water",
    icon: Sprout,
    description: "Provides structure, stability, and lubrication. Kapha energy is like the earth—heavy, cool, and steady.",
    gradient: "from-lime-100 to-emerald-50",
    iconBg: "bg-lime-200",
    iconColor: "text-lime-800",
  },
];

// New DoshaCard component with themed hover effects
const DoshaCard = ({ dosha }) => {
  const Icon = dosha.icon;
  const [isHovered, setIsHovered] = useState(false);

  // Define different hover animations for each dosha
  const hoverAnimations = {
    Vata: {
      background: `linear-gradient(120deg, #e0f2fe 0%, #f3f4f6 50%, #d1e9fa 100%)`,
      // NOTE: A true 'wind' effect requires CSS keyframes. This is a visual approximation.
      backgroundSize: '200% 200%',
      transition: { duration: 2, repeat: Infinity, ease: "linear" }
    },
    Pitta: {
      background: `radial-gradient(circle at 50% 120%, rgba(255,190,0,0.5) 0%, rgba(251,146,60,0.2) 40%, transparent 65%)`,
    },
    Kapha: {
      background: `radial-gradient(circle at 50% 50%, rgba(163, 230, 53, 0.25) 0%, transparent 70%)`,
    },
  };

  return (
    <motion.div
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      className={`relative p-6 rounded-2xl shadow-sm border border-gray-200/80 text-center overflow-hidden bg-gradient-to-br ${dosha.gradient}`}
      whileHover={{ y: -8, shadow: 'lg' }}
      transition={{ duration: 0.3 }}
    >
      <motion.div
        className="absolute inset-0 z-0"
        initial={{ background: 'transparent' }}
        animate={isHovered ? hoverAnimations[dosha.title] : { background: 'transparent' }}
        transition={{ duration: 0.5, ease: 'easeOut' }}
      />
      <div className="relative z-10">
        <div className={`w-12 h-12 flex items-center justify-center rounded-full ${dosha.iconBg} ${dosha.iconColor} mx-auto mb-4`}>
          <Icon className="w-6 h-6" />
        </div>
        <h3 className="text-xl font-serif font-semibold text-gray-800 mb-2">{dosha.title}</h3>
        <p className="text-sm text-gray-600 mb-3">{dosha.element}</p>
        <p className="text-gray-700 text-base leading-relaxed">{dosha.description}</p>
      </div>
    </motion.div>
  );
}

const DoshaAwareness = () => {
  const [player, setPlayer] = useState(null);
  const [isMuted, setIsMuted] = useState(false); // Set to false to attempt unmuted playback
  const navigate = useNavigate();

  const videoOptions = {
    playerVars: {
      autoplay: 1,
      controls: 1,
      rel: 0, 
      showinfo: 0, 
      mute: 0, // Attempt to play with sound by default
      loop: 1,
      playlist: 'DxvvB3bbLUk',
      modestbranding: 1,
      playsinline: 1,
    },
  };

  const onReady = (event) => {
    setPlayer(event.target);
    event.target.playVideo();
    setTimeout(() => {
      setIsMuted(event.target.isMuted());
    }, 1200);
  };

  const onStateChange = (event) => {
    if (player && (event.data === -1 || event.data === 1 || event.data === 2)) {
      setIsMuted(player.isMuted());
    }
  };
  
  const toggleMute = () => {
    if (player) {
      if (player.isMuted()) {
        player.unMute();
        setIsMuted(false);
      } else {
        player.mute();
        setIsMuted(true);
      }
    }
  };

  const handleStart = () => {
    navigate('/assessment');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-green-50 to-emerald-100 text-gray-800 relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none" aria-hidden="true">
        <motion.div initial={{ rotate: 0 }} animate={{ rotate: 360 }} transition={{ duration: 60, repeat: Infinity, ease: "linear" }} className="absolute top-[10%] left-[5%] text-green-300 opacity-20 text-8xl">🌿</motion.div>
        <motion.div initial={{ rotate: 0 }} animate={{ rotate: -360 }} transition={{ duration: 50, repeat: Infinity, ease: "linear" }} className="absolute bottom-[10%] right-[5%] text-emerald-300 opacity-20 text-9xl">🍃</motion.div>
        <div className="absolute top-[20%] right-[15%] text-green-200 opacity-15 text-7xl">🌱</div>
        <div className="absolute bottom-[20%] left-[15%] text-emerald-200 opacity-15 text-6xl">🌿</div>
      </div>
      
      <div className="relative z-10">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="max-w-4xl mx-auto px-6 pt-16 pb-8 text-center">
          <h1 className="text-4xl md:text-5xl font-serif text-gray-900 mb-4">Understanding Your Ayurvedic Dosha</h1>
          <p className="text-lg text-gray-600 leading-relaxed">Unlock the ancient wisdom of Ayurveda by learning about Vata, Pitta, and Kapha—the three fundamental energies that govern your unique constitution and health.</p>
        </motion.div>

        <div className="max-w-4xl mx-auto px-6 mb-12">
          <div className="relative w-full aspect-video rounded-lg shadow-lg overflow-hidden">
            <YouTube videoId="DxvvB3bbLUk" opts={videoOptions}
              className="absolute top-0 left-0 w-full h-full" // The iframe will fill this container
              iframeClassName="absolute top-1/2 left-1/2 min-w-full min-h-full w-auto h-auto object-cover -translate-x-1/2 -translate-y-1/2" // This ensures the video covers the area
              onReady={onReady}
              onStateChange={onStateChange}
              onEnd={(e) => e.target.playVideo()} />
              
            <button onClick={toggleMute} className="absolute bottom-3 left-3 p-2 bg-black/50 text-white rounded-full hover:bg-black/70 transition-colors z-10" aria-label={isMuted ? "Unmute video" : "Mute video"}>
              {isMuted ? <VolumeX className="w-5 h-5"/> : <Volume2 className="w-5 h-5"/>}
            </button>
          </div>
          <p className="text-xs text-center text-gray-500 mt-3 px-6">
            Note: Most browsers require user interaction to play video with sound. If the video is muted by your browser, please use the player controls or the button above to unmute.
          </p>
        </div>

        <div className="max-w-4xl mx-auto px-6 py-12 bg-white/60 backdrop-blur-md rounded-2xl shadow-lg border border-gray-200/80 mb-12">
          <h2 className="text-3xl font-serif font-bold text-gray-900 mb-8 text-center">The Three Doshas</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {doshaData.map((dosha) => (
              <DoshaCard key={dosha.title} dosha={dosha} />
            ))}
          </div>
        </div>

        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }} className="text-center py-16 px-6">
          <h2 className="text-3xl md:text-4xl font-serif font-bold text-gray-900 mb-4">Ready to Discover Your Dosha?</h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto mb-8">Take our simple assessment to understand your unique Ayurvedic constitution and receive personalized guidance for a balanced life.</p>
          <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.98 }} onClick={handleStart} className="group relative px-10 py-4 bg-green-600 text-white rounded-full font-bold text-lg shadow-lg hover:bg-green-700 transition-all flex items-center justify-center mx-auto gap-2">
            Discover Your Dosha
            <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </motion.button>
        </motion.div>
      </div>
    </div>
  );
};

export default DoshaAwareness;
