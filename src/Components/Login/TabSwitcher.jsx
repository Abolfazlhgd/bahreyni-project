// TabSwitcher.jsx
import React, { useState, useRef, useEffect } from "react";
import { Eye, EyeOff, Loader2 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate, useLocation } from "react-router-dom";

const users = [
  { id: 1, phone: "09123456789", password: "123456", name: "علی رضایی" },
  { id: 2, phone: "09351234567", password: "abcdef", name: "مریم محمدی" },
  { id: 3, phone: "09154399319", password: "54321", name: "ابوالفضل" },
];

const TabSwitcher = ({ onLoginSuccess }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const currentTab = location.pathname.includes("register")
    ? "register"
    : "login";

  const [loginData, setLoginData] = useState({ phone: "", password: "" });
  const [registerData, setRegisterData] = useState({
    name: "",
    phone: "",
    password: "",
    confirmPassword: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const formContainerRef = useRef(null);
  const formRef = useRef(null);

  // Set fixed height for form container based on the tallest form
  useEffect(() => {
    if (formRef.current && formContainerRef.current) {
      // Calculate required height (register form is taller)
      const registerHeight = 520; // Approximate height for register form
      const loginHeight = 380; // Approximate height for login form
      formContainerRef.current.style.height = `${Math.max(
        registerHeight,
        loginHeight
      )}px`;
    }
  }, [currentTab]);

  const variants = {
    initial: { opacity: 0, y: 20 },
    animate: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.3,
        ease: "easeOut",
      },
    },
    exit: {
      opacity: 0,
      y: -20,
      transition: {
        duration: 0.2,
      },
    },
  };

  const switchTab = (tab) => {
    setError("");
    navigate(`/${tab}`);
  };

  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    await new Promise((resolve) => setTimeout(resolve, 800));

    const user = users.find(
      (u) => u.phone === loginData.phone && u.password === loginData.password
    );

    if (user) {
      onLoginSuccess(user);
    } else {
      setError("شماره همراه یا رمز عبور اشتباه است");
      setIsLoading(false);
    }
  };

  const handleRegisterSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    const { name, phone, password, confirmPassword } = registerData;

    if (!name || !phone || !password || !confirmPassword) {
      setError("لطفاً همه فیلدها را پر کنید");
      setIsLoading(false);
      return;
    }

    if (password !== confirmPassword) {
      setError("رمز عبور و تکرار آن مطابقت ندارند");
      setIsLoading(false);
      return;
    }

    await new Promise((resolve) => setTimeout(resolve, 800));

    onLoginSuccess({ name, phone });
  };

  return (
    <div className="w-full max-w-md mx-auto mt-6 px-4">
      <div className="flex bg-blue-100 rounded-full p-1 mb-6">
        <button
          onClick={() => switchTab("login")}
          className={`flex-1 py-2 rounded-full text-center font-semibold transition-colors ${
            currentTab === "login"
              ? "bg-blue-600 text-white"
              : "text-blue-600 hover:bg-blue-200"
          }`}
        >
          ورود
        </button>
        <button
          onClick={() => switchTab("register")}
          className={`flex-1 py-2 rounded-full text-center font-semibold transition-colors ${
            currentTab === "register"
              ? "bg-blue-600 text-white"
              : "text-blue-600 hover:bg-blue-200"
          }`}
        >
          ثبت‌نام
        </button>
      </div>

      {/* Form container with fixed height and scroll */}
      <div
        ref={formContainerRef}
        className="bg-white rounded-lg shadow-md overflow-y-auto"
      >
        <AnimatePresence mode="wait">
          <motion.form
            key={currentTab}
            ref={formRef}
            onSubmit={
              currentTab === "login" ? handleLoginSubmit : handleRegisterSubmit
            }
            initial="initial"
            animate="animate"
            exit="exit"
            variants={variants}
            className="p-6 flex flex-col gap-4 min-h-full"
            noValidate
          >
            {currentTab === "register" && (
              <div className="mb-2">
                <label className="block text-gray-700 text-sm font-medium mb-1 text-right">
                  نام و نام خانوادگی
                </label>
                <input
                  type="text"
                  placeholder="نام کامل خود را وارد کنید"
                  value={registerData.name}
                  onChange={(e) =>
                    setRegisterData({ ...registerData, name: e.target.value })
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-md text-right focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
            )}

            <div className="mb-2">
              <label className="block text-gray-700 text-sm font-medium mb-1 text-right">
                شماره همراه
              </label>
              <input
                type="tel"
                placeholder="09*********"
                value={
                  currentTab === "login" ? loginData.phone : registerData.phone
                }
                onChange={(e) =>
                  currentTab === "login"
                    ? setLoginData({ ...loginData, phone: e.target.value })
                    : setRegisterData({
                        ...registerData,
                        phone: e.target.value,
                      })
                }
                className="w-full px-3 py-2 border border-gray-300 rounded-md text-right focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>

            <div className="mb-2 relative">
              <label className="block text-gray-700 text-sm font-medium mb-1 text-right">
                رمز عبور
              </label>
              <input
                type={showPassword ? "text" : "password"}
                placeholder="••••••••"
                value={
                  currentTab === "login"
                    ? loginData.password
                    : registerData.password
                }
                onChange={(e) =>
                  currentTab === "login"
                    ? setLoginData({ ...loginData, password: e.target.value })
                    : setRegisterData({
                        ...registerData,
                        password: e.target.value,
                      })
                }
                className="w-full px-3 py-2 border border-gray-300 rounded-md text-right pl-10 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute left-3 bottom-2 text-gray-400 hover:text-gray-600"
              >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>

            {currentTab === "register" && (
              <div className="mb-4 relative">
                <label className="block text-gray-700 text-sm font-medium mb-1 text-right">
                  تکرار رمز عبور
                </label>
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  placeholder="••••••••"
                  value={registerData.confirmPassword}
                  onChange={(e) =>
                    setRegisterData({
                      ...registerData,
                      confirmPassword: e.target.value,
                    })
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-md text-right pl-10 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute left-3 bottom-2 text-gray-400 hover:text-gray-600"
                >
                  {showConfirmPassword ? (
                    <EyeOff size={20} />
                  ) : (
                    <Eye size={20} />
                  )}
                </button>
              </div>
            )}

            {error && (
              <div className="mb-4 text-red-500 text-sm text-center font-medium py-2 px-3 bg-red-50 rounded">
                {error}
              </div>
            )}

            <button
              type="submit"
              className="mt-2 w-full bg-blue-600 hover:bg-blue-700 text-white py-2.5 rounded-md font-medium flex items-center justify-center gap-2 transition-colors"
              disabled={isLoading}
            >
              {isLoading ? (
                <>
                  <Loader2 size={18} className="animate-spin" />
                  {currentTab === "login"
                    ? "در حال ورود..."
                    : "در حال ثبت‌نام..."}
                </>
              ) : currentTab === "login" ? (
                "ورود به حساب"
              ) : (
                "ثبت‌نام"
              )}
            </button>
          </motion.form>
        </AnimatePresence>
      </div>
    </div>
  );
};

export default TabSwitcher;
