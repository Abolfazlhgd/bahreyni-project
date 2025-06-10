import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const questions = [
  {
    question: "کدام ویژگی نشان‌دهنده‌ی سایت جعلی است؟",
    options: [
      "داشتن https",
      "داشتن ای‌نماد",
      "اشتباه املایی در آدرس سایت",
      "درگاه پرداخت بانک مرکزی",
    ],
    answer: 2,
  },
  {
    question:
      "در پیامک زیر کدام مورد نشان‌دهنده فیشینگ است؟\n\n«خریدار عزیز، سفارش شما ثبت شد. برای تایید روی لینک http://pay-bank.click کلیک کنید.»",
    options: [
      "استفاده از لینک کوتاه",
      "کلمه 'خریدار عزیز'",
      "استفاده از .click",
      "نداشتن نام شرکت",
    ],
    answer: 2,
  },
  {
    question: "برای مطمئن شدن از امنیت فروشگاه، چه کاری کنیم؟",
    options: [
      "به تعداد فالوورهای اینستاگرام توجه کنیم",
      "نظرهای کاربران را بخوانیم",
      "وجود نماد اعتماد الکترونیکی را بررسی کنیم",
      "از دوستانمان سوال کنیم",
    ],
    answer: 2,
  },
];

function PhishingGame() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [timeLeft, setTimeLeft] = useState(30);
  const navigate = useNavigate();

  useEffect(() => {
    if (showResult) return;

    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev === 1) {
          clearInterval(timer);
          setShowResult(true);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [showResult]);

  const handleAnswer = (selected) => {
    if (selected === questions[currentIndex].answer) {
      setScore(score + 1);
    }

    if (currentIndex + 1 < questions.length) {
      setCurrentIndex(currentIndex + 1);
    } else {
      setShowResult(true);
    }
  };

  const restartGame = () => {
    setCurrentIndex(0);
    setScore(0);
    setTimeLeft(30);
    setShowResult(false);
  };

  if (showResult || currentIndex >= questions.length) {
    const finalScore = score * 10 + timeLeft;

    return (
      <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded-xl shadow-lg text-center space-y-4">
        <h2 className="text-xl font-bold text-green-600">نتیجه نهایی</h2>
        <p className="text-lg">
          پاسخ‌های درست: {score} از {questions.length}
        </p>
        <p className="text-lg">زمان باقی‌مانده: {timeLeft} ثانیه</p>
        <p className="text-2xl font-bold text-blue-600">
          امتیاز نهایی: {finalScore}
        </p>

        <div className="space-y-2 pt-4">
          <button
            onClick={restartGame}
            className="w-full bg-yellow-500 hover:bg-yellow-600 text-white py-2 rounded-md"
          >
            شروع دوباره
          </button>
          <button
            onClick={() => navigate("/")}
            className="w-full bg-gray-300 hover:bg-gray-400 text-black py-2 rounded-md"
          >
            بازگشت به خانه
          </button>
        </div>
      </div>
    );
  }

  const q = questions[currentIndex];

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded-xl shadow-md space-y-6">
      <div className="flex justify-between items-center">
        <span className="text-sm text-gray-500">
          زمان باقی‌مانده: {timeLeft} ثانیه
        </span>
        <span className="text-sm text-gray-500">
          سوال {currentIndex + 1} از {questions.length}
        </span>
      </div>

      <h3 className="text-lg font-bold text-center whitespace-pre-line">
        {q.question}
      </h3>

      <div className="space-y-2">
        {q.options.map((option, index) => (
          <button
            key={index}
            onClick={() => handleAnswer(index)}
            className="w-full bg-blue-100 hover:bg-blue-200 text-gray-800 py-2 px-4 rounded-md text-right"
          >
            {option}
          </button>
        ))}
      </div>

      <button
        onClick={() => navigate("/")}
        className="mt-4 text-sm text-blue-600 hover:underline block text-center"
      >
        بازگشت به خانه
      </button>
    </div>
  );
}

export default PhishingGame;
