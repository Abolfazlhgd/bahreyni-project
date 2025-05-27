import React, { useState } from "react";
import { User, LogOut, Copy } from "lucide-react";
import BottomNav from "./BottomNav";

function HomePage() {
  const [activeTab, setActiveTab] = useState("home");
  const [showFullCard, setShowFullCard] = useState(false);
  const [selectedBadge, setSelectedBadge] = useState(null);

  const badges = [
    {
      id: "bank",
      icon: "🏦",
      title: "رئیس بانک",
      unlocked: true,
      description: "برای مدیریت عالی حساب بانکی‌ات این نشان رو گرفتی!",
    },
    {
      id: "stock",
      icon: "📈",
      title: "سهامدار کوچولو",
      unlocked: false,
      description: "وقتی اولین سهامت رو بخری این نشان باز میشه!",
    },
    {
      id: "saver",
      icon: "💰",
      title: "پس‌اندازگر زرنگ",
      unlocked: true,
      description: "این نشان برای وقتی‌ـه که خوب پس‌انداز کنی.",
    },
    {
      id: "brain",
      icon: "🧠",
      title: "نابغه مالی",
      unlocked: false,
      description: "با یادگیری مفاهیم مالی این نشان رو به‌دست میاری.",
    },
    {
      id: "target",
      icon: "🎯",
      title: "هدف‌گذار قهرمان",
      unlocked: false,
      description: "این نشان زمانی باز میشه که به هدفی مالی برسی.",
    },
    {
      id: "invest",
      icon: "🌱",
      title: "سرمایه‌گذار تازه‌کار",
      unlocked: false,
      description: "با اولین سرمایه‌گذاری، این نشان مال تو میشه!",
    },
  ];

  const Card = ({ children, className = "" }) => (
    <div className={`bg-white rounded-2xl shadow-sm p-6 ${className}`}>
      {children}
    </div>
  );

  const HomeContent = () => (
    <div dir="rtl" className="animate-fade-in md:w-4/5 mx-auto">
      {/* هدر کاربر */}
      <div className="flex justify-between items-center mb-6">
        <div className="flex items-center space-x-2">
          <div className="w-12 h-12 bg-gradient-to-r from-blue-100 to-blue-50 rounded-full flex items-center justify-center">
            <User className="text-blue-500" size={20} />
          </div>
          <div className="text-right pr-4">
            <h2 className="font-bold text-gray-800">محمد یاسین بحرینی</h2>
            <p className="text-sm text-gray-500">0915121216</p>
          </div>
        </div>
        <button className="p-2 rounded-full bg-gray-100 text-gray-500">
          <LogOut size={20} />
        </button>
      </div>

      {/* اطلاعات کاربر */}
      <div className="flex justify-between mb-6">
        <div className="bg-gradient-to-r from-blue-50 to-blue-100 rounded-xl p-3 text-center w-[48%]">
          <p className="text-xs text-gray-500 mb-1">رتبه</p>
          <p className="font-bold text-gray-800">21</p>
        </div>
        <div className="bg-gradient-to-r from-green-50 to-green-100 rounded-xl p-3 text-center w-[48%]">
          <p className="text-xs text-gray-500 mb-1">موجودی</p>
          <p className="font-bold text-gray-800">143,000 تومان</p>
        </div>
      </div>

      {/* کارت بانکی */}
      <Card className="mb-6 bg-gradient-to-r from-blue-600 to-blue-500 text-white">
        <div className="flex justify-between items-start mb-4">
          <span className="text-xs opacity-80">شماره کارت</span>
          <button className="text-blue-200">
            <Copy size={16} />
          </button>
        </div>
        <p className="text-xl tracking-widest mb-6 font-mono">
          {showFullCard ? "6037 6915 3542 9874" : "•••• •••• •••• 9874"}
        </p>
        <div className="flex justify-between items-center">
          <span className="text-xs opacity-80">
            {showFullCard
              ? "IR12 5456 5585 9688 4512 2245"
              : "IR12 •••• •••• •••• 2245"}
          </span>
          <button
            onClick={() => setShowFullCard(!showFullCard)}
            className="text-xs bg-white/20 px-2 py-1 rounded"
          >
            {showFullCard ? "مخفی کردن" : "نمایش کامل"}
          </button>
        </div>
      </Card>

      {/* تابلوی افتخارات */}
      <Card>
        <h3 className="font-bold text-gray-800 mb-2 text-center">
          تابلوی افتخارات
        </h3>

        {/* نمایش توضیح نشان انتخاب شده */}
        {selectedBadge && (
          <div className="text-sm text-center text-blue-700 bg-blue-50 border border-blue-100 rounded-lg py-2 px-3 mb-4">
            {selectedBadge.description}
          </div>
        )}

        <div className="grid grid-cols-3 gap-4 text-center">
          {badges.map((badge) => (
            <button
              key={badge.id}
              onClick={() => setSelectedBadge(badge)}
              className={`w-16 h-16 rounded-full flex items-center justify-center text-2xl shadow transition-all duration-200 ${
                badge.unlocked
                  ? "bg-yellow-400 text-white"
                  : "bg-gray-200 text-gray-400 grayscale"
              }`}
            >
              {badge.icon}
            </button>
          ))}
        </div>
        <p className="mt-4 text-sm text-gray-500 text-center">
          روی هر نشان کلیک کن تا بیشتر راجع‌بهش بدونی!
        </p>
      </Card>
    </div>
  );

  return (
    <div className="bg-gradient-to-b from-blue-50 to-white min-h-screen pb-20 p-4">
      {activeTab === "home" ? (
        <HomeContent />
      ) : (
        <div className="animate-fade-in text-center mt-20 text-gray-700">
          {activeTab === "flag" ? "صفحه اهداف" : "صفحه دستاوردها"}
        </div>
      )}
      <BottomNav active={activeTab} onChange={setActiveTab} />
    </div>
  );
}

export default HomePage;
