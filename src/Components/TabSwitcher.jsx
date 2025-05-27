import React, { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const TabSwitcher = ({ onLoginSuccess }) => {
  const [activeTab, setActiveTab] = useState("login");
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

  const users = [
    { id: 1, phone: "09123456789", password: "123456", name: "علی رضایی" },
    { id: 2, phone: "09351234567", password: "abcdef", name: "مریم محمدی" },
    { id: 3, phone: "09154399319", password: "54321", name: "ابوالفضل" },
  ];

  const handleTabChange = (tab) => {
    setError("");
    setActiveTab(tab);
  };

  const handleLoginSubmit = (e) => {
    e.preventDefault();
    const user = users.find(
      (u) => u.phone === loginData.phone && u.password === loginData.password
    );
    if (user) {
      onLoginSuccess(user);
    } else {
      setError("شماره همراه یا رمز عبور اشتباه است");
    }
  };

  const handleRegisterSubmit = (e) => {
    e.preventDefault();
    const { name, phone, password, confirmPassword } = registerData;

    if (!name || !phone || !password || !confirmPassword) {
      setError("لطفاً همه فیلدها را پر کنید");
      return;
    }

    if (password !== confirmPassword) {
      setError("رمز عبور و تکرار آن مطابقت ندارند");
      return;
    }

    onLoginSuccess({ name, phone });
  };

  const variants = {
    initial: { opacity: 0, x: 50 },
    animate: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: -50 },
  };

  return (
    <div className="w-full max-w-md">
      <div className="flex bg-blue-100 rounded-full p-1 mb-6">
        <button
          type="button"
          onClick={() => handleTabChange("login")}
          className={`flex-1 py-2 rounded-full text-center font-semibold transition-colors ${
            activeTab === "login"
              ? "bg-blue-600 text-white"
              : "text-blue-600 hover:bg-blue-200"
          }`}
        >
          ورود
        </button>
        <button
          type="button"
          onClick={() => handleTabChange("register")}
          className={`flex-1 py-2 rounded-full text-center font-semibold transition-colors ${
            activeTab === "register"
              ? "bg-blue-600 text-white"
              : "text-blue-600 hover:bg-blue-200"
          }`}
        >
          ثبت نام
        </button>
      </div>

      <AnimatePresence mode="wait">
        {activeTab === "login" ? (
          <motion.form
            key="login"
            onSubmit={handleLoginSubmit}
            initial="initial"
            animate="animate"
            exit="exit"
            variants={variants}
            transition={{ duration: 0.3 }}
            className="bg-white p-6 rounded-lg shadow-md h-[420px] flex flex-col gap-5"
            noValidate
          >
            <div className="space-y-4">
              <input
                type="tel"
                value={loginData.phone}
                onChange={(e) =>
                  setLoginData({ ...loginData, phone: e.target.value })
                }
                placeholder="شماره همراه"
                className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 text-right"
                required
              />
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  value={loginData.password}
                  onChange={(e) =>
                    setLoginData({ ...loginData, password: e.target.value })
                  }
                  placeholder="رمز عبور"
                  className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 pl-10 text-right"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute top-2 left-3 text-gray-400 hover:text-gray-600"
                  tabIndex={-1}
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
            </div>
            {error && (
              <p className="text-red-500 text-sm mt-1 text-center font-semibold">
                {error}
              </p>
            )}
            <button
              type="submit"
              className="mt-6 bg-blue-500 hover:bg-blue-600 text-white py-2 rounded transition-colors duration-200"
            >
              ورود
            </button>
          </motion.form>
        ) : (
          <motion.form
            key="register"
            onSubmit={handleRegisterSubmit}
            initial="initial"
            animate="animate"
            exit="exit"
            variants={variants}
            transition={{ duration: 0.3 }}
            className="bg-white p-6 rounded-lg shadow-md h-[420px] flex flex-col gap-5"
            noValidate
          >
            <div className="space-y-4">
              <input
                type="text"
                value={registerData.name}
                onChange={(e) =>
                  setRegisterData({ ...registerData, name: e.target.value })
                }
                placeholder="نام و نام خانوادگی"
                className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 text-right"
                required
              />
              <input
                type="tel"
                value={registerData.phone}
                onChange={(e) =>
                  setRegisterData({ ...registerData, phone: e.target.value })
                }
                placeholder="شماره همراه"
                className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 text-right"
                required
              />
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  value={registerData.password}
                  onChange={(e) =>
                    setRegisterData({
                      ...registerData,
                      password: e.target.value,
                    })
                  }
                  placeholder="رمز عبور"
                  className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 pl-10 text-right"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute top-2 left-3 text-gray-400 hover:text-gray-600"
                  tabIndex={-1}
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
              <div className="relative">
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  value={registerData.confirmPassword}
                  onChange={(e) =>
                    setRegisterData({
                      ...registerData,
                      confirmPassword: e.target.value,
                    })
                  }
                  placeholder="تکرار رمز عبور"
                  className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 pl-10 text-right"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute top-2 left-3 text-gray-400 hover:text-gray-600"
                  tabIndex={-1}
                >
                  {showConfirmPassword ? (
                    <EyeOff size={20} />
                  ) : (
                    <Eye size={20} />
                  )}
                </button>
              </div>
            </div>
            {error && (
              <p className="text-red-500 text-sm mt-1 text-center font-semibold">
                {error}
              </p>
            )}
            <button
              type="submit"
              className="mt-6 bg-blue-500 hover:bg-blue-600 text-white py-2 rounded transition-colors duration-200"
            >
              ثبت نام
            </button>
          </motion.form>
        )}
      </AnimatePresence>
    </div>
  );
};

export default TabSwitcher;
