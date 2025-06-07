import React from "react";
import { Flag, Trophy, Home } from "lucide-react";
import { motion } from "framer-motion";
import { useLocation, useNavigate } from "react-router-dom";

function BottomNav() {
  const location = useLocation();
  const navigate = useNavigate();

  const tabs = [
    { icon: <Flag size={22} />, path: "/goals", label: "اهداف" },
    { icon: <Trophy size={22} />, path: "/trophies", label: "دستاوردها" },
    { icon: <Home size={22} />, path: "/", label: "خانه" },
  ];

  return (
    <div className="BottomNav fixed bottom-0 left-0 right-0 bg-white border-t border-gray-100 flex justify-around py-3 z-50">
      {tabs.map((item) => {
        const isActive = location.pathname === item.path;

        return (
          <button
            key={item.path}
            onClick={() => navigate(item.path)}
            className="relative flex flex-col items-center text-gray-400"
            style={{ color: isActive ? "#3b82f6" : undefined }}
          >
            <div className="relative p-2 rounded-full">
              {isActive && (
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
        );
      })}
    </div>
  );
}

export default BottomNav;
