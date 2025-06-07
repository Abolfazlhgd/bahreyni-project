import React from "react";
import { User, LogOut, Trophy, Award, ChevronLeft } from "lucide-react";

function Card({ children, className = "" }) {
  return (
    <div className={`bg-white rounded-2xl shadow-sm p-6 ${className}`}>
      {children}
    </div>
  );
}

export default function TrophyPage({ onBack }) {
  // داده‌های نمونه با رنگ‌بندی مدال‌ها
  const topPlayers = [
    {
      id: 1,
      name: "محمد یاسین بحرینی",
      time: "20 ثانیه",
      score: 950,
      medal: "gold",
    },
    {
      id: 2,
      name: "سارا محمدی",
      time: "22 ثانیه",
      score: 920,
      medal: "silver",
    },
    { id: 3, name: "علی رضایی", time: "23 ثانیه", score: 910, medal: "bronze" },
  ];

  const otherPlayers = [
    { id: 4, name: "فاطمه زاهدی", time: "24 ثانیه", score: 890 },
    { id: 5, name: "امیرحسین نوروزی", time: "25 ثانیه", score: 880 },
    { id: 6, name: "نازنین کریمی", time: "26 ثانیه", score: 870 },
    { id: 7, name: "رضا موسوی", time: "27 ثانیه", score: 860 },
    { id: 8, name: "زهرا احمدی", time: "28 ثانیه", score: 850 },
    { id: 9, name: "محسن صالحی", time: "29 ثانیه", score: 840 },
    { id: 10, name: "مریم جعفری", time: "30 ثانیه", score: 830 },
  ];

  // کلاس‌های رنگ برای مدال‌ها
  const medalClasses = {
    gold: {
      bg: "bg-gradient-to-r from-yellow-100 to-yellow-50",
      circle: "bg-yellow-400 text-white",
      icon: "text-yellow-500",
    },
    silver: {
      bg: "bg-gradient-to-r from-gray-100 to-gray-50",
      circle: "bg-gray-300 text-white",
      icon: "text-gray-400",
    },
    bronze: {
      bg: "bg-gradient-to-r from-amber-100 to-amber-50",
      circle: "bg-amber-500 text-white",
      icon: "text-amber-500",
    },
  };

  return (
    <div className="TrophyPage min-h-screen p-4 pb-20 animate-fade-in md:w-4/5 mx-auto">
      {/* هدر صفحه */}
      <div className="flex justify-between items-center mb-6">
        <button
          onClick={onBack}
          className="p-2 rounded-full bg-gray-100 text-gray-500 hover:bg-gray-200 transition-colors"
        >
          <ChevronLeft size={20} />
        </button>
        <h2 className="text-xl font-bold text-gray-800">دستاوردها</h2>
        <button className="p-2 rounded-full bg-gray-100 text-gray-500 hover:bg-gray-200 transition-colors">
          <LogOut size={20} />
        </button>
      </div>

      {/* بخش برترین‌ها */}
      <div className="mb-6">
        <div className="flex items-center justify-center gap-2 mb-4">
          <Trophy className="text-yellow-500" size={24} />
          <h3 className="text-lg font-semibold text-gray-800">
            برترین‌های مسابقه
          </h3>
        </div>

        <Card className="mb-4">
          <div dir="rtl" className="space-y-4">
            {topPlayers.map((player, index) => (
              <div
                key={player.id}
                className={`flex items-center justify-between p-4 rounded-lg ${
                  medalClasses[player.medal].bg
                }`}
              >
                <div className="flex items-center gap-3">
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center ${
                      medalClasses[player.medal].circle
                    }`}
                  >
                    {index === 0 && (
                      <Trophy
                        size={16}
                        className={medalClasses[player.medal].icon}
                      />
                    )}
                    {index !== 0 && index + 1}
                  </div>
                  <div className="flex items-center gap-2">
                    <User size={16} className="text-gray-500" />
                    <span className="font-medium">{player.name}</span>
                  </div>
                </div>
                <div className="text-left">
                  <span className="text-sm font-medium">{player.time}</span>
                  <span className="block text-xs text-gray-500">
                    {player.score} امتیاز
                  </span>
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>

      {/* جدول رده‌بندی کامل */}
      <div>
        <div className="flex items-center justify-center gap-2 mb-4">
          <Award className="text-blue-500" size={24} />
          <h3 className="text-lg font-semibold text-gray-800">
            جدول رده‌بندی کامل
          </h3>
        </div>

        <Card>
          <div className="overflow-x-auto">
            <table dir="rtl" className="w-full text-sm">
              <thead>
                <tr className="text-right text-gray-500 border-b">
                  <th className="pb-3">رتبه</th>
                  <th className="pb-3">نام شرکت کننده</th>
                  <th className="pb-3">زمان</th>
                  <th className="pb-3">امتیاز</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {otherPlayers.map((player) => (
                  <tr
                    key={player.id}
                    className="text-right py-3 hover:bg-gray-50 transition-colors"
                  >
                    <td className="py-3">{player.id}</td>
                    <td className="py-3 flex items-center gap-2">
                      <User size={14} className="text-gray-400" />
                      {player.name}
                    </td>
                    <td className="py-3">{player.time}</td>
                    <td className="py-3 text-blue-500 font-medium">
                      {player.score}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>
      </div>
    </div>
  );
}
