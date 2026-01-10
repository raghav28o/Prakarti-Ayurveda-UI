import React, { useState } from "react";
import { motion } from "framer-motion";

export default function DoshaCard({
  title,
  element,
  icon,
  color = "bg-white",
  description,
  mind,
  body,
  imbalance,
  balance,
}) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      animate={{ y: isHovered ? -10 : 0, scale: isHovered ? 1.08 : 1 }}
      transition={{ type: "spring", stiffness: 200, damping: 18 }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={`${color} rounded-[36px] p-8 shadow-sm hover:shadow-lg transition-all border border-white/50 cursor-pointer`}
    >
      {/* Header */}
      <div className="flex items-center gap-4 mb-4">
        {icon && (
          <span className="text-4xl">
            {icon}
          </span>
        )}
        <div>
          <h2 className="font-serif text-2xl font-bold text-[#2F3E46]">
            {title}
          </h2>
          {element && (
            <p className="text-xs uppercase tracking-widest opacity-60">
              {element}
            </p>
          )}
        </div>
      </div>

      {/* Description */}
      {description && (
        <p className="text-sm italic opacity-80 mb-5 leading-relaxed">
          {description}
        </p>
      )}

      {/* Details - Show on Hover */}
      {isHovered && (
        <motion.ul
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 10 }}
          transition={{ duration: 0.3 }}
          className="space-y-3 text-sm text-[#2F3E46] border-t border-black/10 pt-4 mt-4"
        >
          {mind && (
            <li>
              <span className="font-semibold">🧠 Mind:</span> {mind}
            </li>
          )}
          {body && (
            <li>
              <span className="font-semibold">💪 Body:</span> {body}
            </li>
          )}
          {imbalance && (
            <li>
              <span className="font-semibold">⚠️ Imbalance:</span> {imbalance}
            </li>
          )}
          {balance && (
            <li>
              <span className="font-semibold">🌱 When Balanced:</span> {balance}
            </li>
          )}
        </motion.ul>
      )}
    </motion.div>
  );
}
