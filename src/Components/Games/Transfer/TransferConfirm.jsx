import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle, XCircle, Clock, RotateCw, ArrowLeft } from "lucide-react";

function PaymentConfirm({ data, onBack, onSuccess }) {
  const [otp, setOtp] = useState("");
  const [cvv2, setCvv2] = useState("");
  const [expiryMonth, setExpiryMonth] = useState("");
  const [expiryYear, setExpiryYear] = useState("");
  const [isPaying, setIsPaying] = useState(false);
  const [isOtpRequested, setIsOtpRequested] = useState(false);
  const [otpCode, setOtpCode] = useState("");
  const [showOtpModal, setShowOtpModal] = useState(false);
  const [otpTimer, setOtpTimer] = useState(0);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (!data) {
      onBack();
    }
  }, [data, onBack]);

  // Countdown timer
  useEffect(() => {
    if (otpTimer > 0) {
      const interval = setInterval(() => {
        setOtpTimer((prev) => prev - 1);
      }, 1000);
      return () => clearInterval(interval);
    }
  }, [otpTimer]);

  const generateOtp = () => {
    const randomCode = Math.floor(100000 + Math.random() * 900000).toString();
    setOtpCode(randomCode);
    setShowOtpModal(true);
    setOtpTimer(60);
    setTimeout(() => setShowOtpModal(false), 5000);
  };

  const handleRequestOtp = () => {
    setIsOtpRequested(true);
    generateOtp();
  };

  const validateForm = () => {
    const newErrors = {};

    if (otp.length !== 6) {
      newErrors.otp = "رمز دوم پویا باید ۶ رقمی باشد";
    }

    if (cvv2.length < 3 || cvv2.length > 4) {
      newErrors.cvv2 = "CVV2 باید ۳ یا ۴ رقمی باشد";
    }

    if (
      expiryMonth.length !== 2 ||
      parseInt(expiryMonth) < 1 ||
      parseInt(expiryMonth) > 12
    ) {
      newErrors.expiryMonth = "ماه انقضا نامعتبر است";
    }

    if (expiryYear.length !== 2) {
      newErrors.expiryYear = "سال انقضا نامعتبر است";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = () => {
    if (!validateForm()) return;

    setIsPaying(true);
    setTimeout(() => {
      onSuccess();
    }, 2000);
  };

  if (!data) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="max-w-md mx-auto p-6 bg-white rounded-xl shadow-lg text-right relative"
    >
      <div className="flex items-center justify-between mb-6">
        <button
          onClick={onBack}
          className="flex items-center text-blue-600 hover:text-blue-800"
        >
          <ArrowLeft size={18} className="ml-1" />
          بازگشت
        </button>
        <h2 className="text-2xl font-bold text-gray-800">تأیید پرداخت</h2>
      </div>

      {/* Transaction Summary */}
      <div className="bg-blue-50 p-4 rounded-lg mb-6 border border-blue-100">
        <div className="flex justify-between items-center mb-3">
          <div className="text-sm text-gray-600">از کارت:</div>
          <div className="font-mono text-gray-800">{data.sourceCard}</div>
        </div>
        <div className="flex justify-between items-center mb-3">
          <div className="text-sm text-gray-600">به کارت:</div>
          <div className="font-mono text-gray-800">{data.destCard}</div>
        </div>
        <div className="flex justify-between items-center">
          <div className="text-sm text-gray-600">مبلغ:</div>
          <div className="font-bold text-green-600">{data.amount} تومان</div>
        </div>
      </div>

      {/* OTP Input + Request Button */}
      <div className="mb-5">
        <label className="block mb-2 text-sm font-medium text-gray-700">
          رمز دوم پویا
        </label>
        <div className="flex gap-2">
          <div className="relative flex-1">
            <input
              type="text"
              inputMode="numeric"
              maxLength={6}
              value={otp}
              onChange={(e) => {
                const val = e.target.value;
                if (/^\d{0,6}$/.test(val)) setOtp(val);
              }}
              placeholder="رمز یکبار مصرف"
              className={`w-full p-3 border-2 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                errors.otp ? "border-red-500" : "border-gray-300"
              }`}
            />
            {otp.length === 6 && !errors.otp && (
              <CheckCircle
                className="absolute left-3 top-3.5 text-green-500"
                size={20}
              />
            )}
          </div>
          <motion.button
            whileHover={otpTimer === 0 ? { scale: 1.05 } : {}}
            whileTap={otpTimer === 0 ? { scale: 0.95 } : {}}
            onClick={handleRequestOtp}
            disabled={otpTimer > 0}
            className={`px-4 py-3 text-sm font-medium rounded-lg flex items-center ${
              otpTimer > 0
                ? "bg-gray-200 text-gray-600"
                : "bg-blue-600 text-white hover:bg-blue-700"
            }`}
          >
            {otpTimer > 0 ? (
              <>
                <Clock size={16} className="ml-1" />
                {otpTimer} ثانیه
              </>
            ) : (
              "دریافت رمز"
            )}
          </motion.button>
        </div>
        {errors.otp && (
          <p className="mt-1 text-red-500 text-sm flex items-center">
            <XCircle className="ml-1" size={16} />
            {errors.otp}
          </p>
        )}
      </div>

      {/* CVV2 */}
      <div className="mb-5">
        <label className="block mb-2 text-sm font-medium text-gray-700">
          CVV2
        </label>
        <div className="relative">
          <input
            type="text"
            inputMode="numeric"
            maxLength={4}
            value={cvv2}
            onChange={(e) => {
              const val = e.target.value;
              if (/^\d{0,4}$/.test(val)) setCvv2(val);
            }}
            placeholder="۳ یا ۴ رقم پشت کارت"
            className={`w-full p-3 border-2 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
              errors.cvv2 ? "border-red-500" : "border-gray-300"
            }`}
          />
          {cvv2.length >= 3 && !errors.cvv2 && (
            <CheckCircle
              className="absolute left-3 top-3.5 text-green-500"
              size={20}
            />
          )}
        </div>
        {errors.cvv2 && (
          <p className="mt-1 text-red-500 text-sm flex items-center">
            <XCircle className="ml-1" size={16} />
            {errors.cvv2}
          </p>
        )}
      </div>

      {/* Expiry Date */}
      <div className="mb-6">
        <label className="block mb-2 text-sm font-medium text-gray-700">
          تاریخ انقضا
        </label>
        <div className="grid grid-cols-2 gap-3">
          <div>
            <div className="relative">
              <input
                type="text"
                inputMode="numeric"
                maxLength={2}
                value={expiryMonth}
                onChange={(e) => {
                  const val = e.target.value;
                  if (/^(0[1-9]|1[0-2]?)$/.test(val)) setExpiryMonth(val);
                }}
                placeholder="ماه"
                className={`w-full p-3 border-2 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                  errors.expiryMonth ? "border-red-500" : "border-gray-300"
                }`}
              />
              {expiryMonth.length === 2 && !errors.expiryMonth && (
                <CheckCircle
                  className="absolute left-3 top-3.5 text-green-500"
                  size={20}
                />
              )}
            </div>
            {errors.expiryMonth && (
              <p className="mt-1 text-red-500 text-sm flex items-center">
                <XCircle className="ml-1" size={16} />
                {errors.expiryMonth}
              </p>
            )}
          </div>
          <div>
            <div className="relative">
              <input
                type="text"
                inputMode="numeric"
                maxLength={2}
                value={expiryYear}
                onChange={(e) => {
                  const val = e.target.value;
                  if (/^\d{0,2}$/.test(val)) setExpiryYear(val);
                }}
                placeholder="سال"
                className={`w-full p-3 border-2 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                  errors.expiryYear ? "border-red-500" : "border-gray-300"
                }`}
              />
              {expiryYear.length === 2 && !errors.expiryYear && (
                <CheckCircle
                  className="absolute left-3 top-3.5 text-green-500"
                  size={20}
                />
              )}
            </div>
            {errors.expiryYear && (
              <p className="mt-1 text-red-500 text-sm flex items-center">
                <XCircle className="ml-1" size={16} />
                {errors.expiryYear}
              </p>
            )}
          </div>
        </div>
      </div>

      {/* Buttons */}
      <div className="flex gap-3">
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={onBack}
          className="flex-1 py-3 bg-gray-100 text-gray-800 rounded-lg hover:bg-gray-200 font-medium"
        >
          بازگشت
        </motion.button>
        <motion.button
          whileHover={!isPaying ? { scale: 1.02 } : {}}
          whileTap={!isPaying ? { scale: 0.98 } : {}}
          onClick={handleSubmit}
          disabled={isPaying}
          className={`flex-1 py-3 text-white rounded-lg font-medium ${
            isPaying ? "bg-blue-400" : "bg-blue-600 hover:bg-blue-700"
          }`}
        >
          {isPaying ? (
            <div className="flex items-center justify-center">
              <RotateCw className="animate-spin ml-2" size={18} />
              در حال پرداخت...
            </div>
          ) : (
            "پرداخت نهایی"
          )}
        </motion.button>
      </div>

      {/* OTP Modal */}
      <AnimatePresence>
        {showOtpModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50"
          >
            <motion.div
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: -20 }}
              className="bg-white p-6 rounded-xl shadow-xl max-w-xs w-full mx-4 text-center"
            >
              <div className="bg-blue-100 p-3 rounded-full inline-block mb-4">
                <CheckCircle className="text-blue-600" size={32} />
              </div>
              <h3 className="text-lg font-bold mb-2">پیامک بانک</h3>
              <p className="text-gray-600 mb-4">رمز یکبار مصرف پرداخت</p>
              <div className="bg-gray-100 p-4 rounded-lg mb-4">
                <p className="text-2xl font-mono font-bold">{otpCode}</p>
              </div>
              <p className="text-sm text-gray-500">
                این پیامک فقط برای نمایش است
              </p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

export default PaymentConfirm;
