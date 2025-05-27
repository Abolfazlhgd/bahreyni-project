import React from "react";
import { Flag, Trophy, Home } from "lucide-react";
import { motion } from "framer-motion";

function BottomNav({ active, onChange }) {
  const tabs = [
    { icon: <Flag size={22} />, id: "game", label: "اهداف" },
    { icon: <Trophy size={22} />, id: "trophy", label: "دستاوردها" },
    { icon: <Home size={22} />, id: "home", label: "خانه" },
  ];

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-100 flex justify-around py-3 z-50">
      {tabs.map((item) => (
        <button
          key={item.id}
          onClick={() => onChange(item.id)}
          className="relative flex flex-col items-center text-gray-400"
          style={{ color: active === item.id ? "#3b82f6" : undefined }}
        >
          <div className="relative p-2 rounded-full">
            {active === item.id && (
              <motion.div
                layoutId="highlight"
                className="absolute inset-0 bg-blue-50 rounded-full"
                style={{ zIndex: -1 }}
                transition={{ type: "spring", stiffness: 500, damping: 30 }}
              />
            )}
            {item.icon}
          </div>
          <span className="text-xs mt-1">{item.label}</span>
        </button>
      ))}
    </div>
  );
}

export default BottomNav;
