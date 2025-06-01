import React from "react";
import {
  ChevronLeft,
  Info,
  Zap,
  ShoppingCart,
  CreditCard,
  Trophy,
  Clock,
  Check,
  ShieldAlert,
  Banknote,
  Scale,
  Home,
  Gem,
  LineChart,
  Leaf,
} from "lucide-react";

const colorClasses = {
  blue: "bg-blue-100 text-blue-500",
  green: "bg-green-100 text-green-500",
  purple: "bg-purple-100 text-purple-500",
  orange: "bg-orange-100 text-orange-500",
  yellow: "bg-yellow-100 text-yellow-500",
  red: "bg-red-100 text-red-500",
  pink: "bg-pink-100 text-pink-500",
};

const buttonClasses = {
  blue: "bg-blue-500 hover:bg-blue-600",
  green: "bg-green-500 hover:bg-green-600",
  purple: "bg-purple-500 hover:bg-purple-600",
  orange: "bg-orange-500 hover:bg-orange-600",
  yellow: "bg-yellow-500 hover:bg-yellow-600",
  red: "bg-red-500 hover:bg-red-600",
  pink: "bg-pink-500 hover:bg-pink-600",
};

const games = [
  {
    id: 1,
    icon: <CreditCard size={18} />,
    title: "کارت به کارتِ سریع!",
    color: "blue",
  },
  {
    id: 2,
    icon: <Check size={18} />,
    title: "چک‌نویس حرفه‌ای!",
    color: "green",
  },
  {
    id: 3,
    icon: <ShoppingCart size={18} />,
    title: "پرداخت قبض‌ها",
    color: "purple",
  },
  {
    id: 4,
    icon: <ShieldAlert size={18} />,
    title: "شکارچی فیشینگ!",
    color: "orange",
  },
  {
    id: 5,
    icon: <Banknote size={18} />,
    title: "پول‌شویی؟ نه!",
    color: "red",
  },
  {
    id: 6,
    icon: <Scale size={18} />,
    title: "نیاز vs خواسته",
    color: "yellow",
  },
  {
    id: 7,
    icon: <Home size={18} />,
    title: "کارهای خانه، پاداش!",
    color: "pink",
  },
  {
    id: 8,
    icon: <Gem size={18} />,
    title: "طلاسنجی!",
    color: "purple",
  },
  {
    id: 9,
    icon: <LineChart size={18} />,
    title: "سهام‌باز کوچک",
    color: "green",
  },
  {
    id: 10,
    icon: <Leaf size={18} />,
    title: "باغچهٔ پولی",
    color: "blue",
  },
];

const GamePage = ({ onBack, onGameSelect }) => {
  return (
    <div
      dir="rtl"
      className="min-h-screen p-4 pb-20 animate-fade-in md:w-4/5 mx-auto"
    >
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <button
          onClick={onBack}
          className="p-2 rounded-full bg-gray-100 text-gray-500 hover:bg-gray-200"
        >
          <ChevronLeft size={20} />
        </button>
        <h2 className="text-base sm:text-lg font-bold text-gray-800">
          بازی‌های رقابتی
        </h2>
        <button className="p-2 rounded-full bg-gray-100 text-gray-500 hover:bg-gray-200">
          <Info size={20} />
        </button>
      </div>

      {/* Rules */}
      <div className="bg-white rounded-2xl shadow-sm p-4 mb-6 text-[13px] leading-relaxed">
        <div className="flex items-center gap-2 mb-2">
          <Zap className="text-yellow-500" size={18} />
          <h3 className="font-bold text-gray-800 text-sm">قوانین بازی</h3>
        </div>
        <p className="text-gray-600 text-justify">
          در این بخش می‌توانید در بازی‌های رقابتی شرکت کنید. امتیازات کسب‌شده در
          جدول رده‌بندی نمایش داده می‌شوند.
        </p>
      </div>

      {/* Game Cards */}
      <div className="flex flex-wrap gap-3 justify-between">
        {games.map((game) => (
          <div
            key={game.id}
            className="bg-white rounded-xl shadow-sm p-4 border border-gray-100 hover:shadow-md flex-1 min-w-[44%] max-w-[48%] sm:max-w-[30%] lg:max-w-[31%] xl:max-w-[23%]"
          >
            <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-2 text-right">
              {/* Icon & Title */}
              <div className="flex flex-col items-center md:items-start">
                <div className={`p-2 rounded-xl ${colorClasses[game.color]}`}>
                  {game.icon}
                </div>
                <h3 className="font-bold text-gray-800 text-[12px] mt-1 leading-tight line-clamp-2 text-center md:text-right">
                  {game.title}
                </h3>
              </div>
              {/* Button */}
              <button
                onClick={() => {
                  if (game.id === 1 && onGameSelect) {
                    onGameSelect("transfer"); // کارت به کارت
                  } else if (game.id === 2 && onGameSelect) {
                    onGameSelect("bill-payment"); // پرداخت قبض
                  }
                }}
                className={`md:mt-0 mt-2 px-4 py-1 self-center md:self-end rounded-md ${
                  buttonClasses[game.color]
                } text-white text-[11px] font-medium`}
              >
                شروع
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default GamePage;
