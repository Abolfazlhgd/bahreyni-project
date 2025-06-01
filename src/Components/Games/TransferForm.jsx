import React, { useState } from "react";
import { motion } from "framer-motion";
import { CheckCircle, AlertCircle } from "lucide-react";

function TransferForm({ onSubmit }) {
  const [sourceCard, setSourceCard] = useState("");
  const [destCard, setDestCard] = useState("");
  const [amount, setAmount] = useState("");
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const formatCardNumber = (value) => {
    const v = value.replace(/\s+/g, "").replace(/[^0-9]/gi, "");
    const matches = v.match(/\d{4,16}/g);
    const match = (matches && matches[0]) || "";
    const parts = [];

    for (let i = 0, len = match.length; i < len; i += 4) {
      parts.push(match.substring(i, i + 4));
    }

    return parts.length ? parts.join("-") : value;
  };

  const validate = () => {
    const newErrors = {};
    if (!sourceCard || sourceCard.replace(/-/g, "").length !== 16) {
      newErrors.sourceCard = "شماره کارت معتبر وارد کنید";
    }
    if (!destCard || destCard.replace(/-/g, "").length !== 16) {
      newErrors.destCard = "شماره کارت معتبر وارد کنید";
    }
    if (!amount || amount < 1000) {
      newErrors.amount = "حداقل مبلغ ۱,۰۰۰ تومان";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validate()) {
      setIsSubmitting(true);
      try {
        await onSubmit({
          sourceCard,
          destCard,
          amount,
        });
      } finally {
        setIsSubmitting(false);
      }
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.98 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.3 }}
      className="max-w-md mx-auto p-6 bg-white rounded-xl shadow-lg"
    >
      <motion.h2
        initial={{ y: -20 }}
        animate={{ y: 0 }}
        className="text-2xl font-bold text-center mb-6 text-gray-800"
      >
        انتقال وجه
      </motion.h2>

      <form onSubmit={handleSubmit} className="space-y-5">
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.1 }}
        >
          <label className="block text-gray-700 mb-2 font-medium">
            شماره کارت مبدأ
          </label>
          <div className="relative">
            <input
              type="text"
              maxLength={19}
              value={sourceCard}
              onChange={(e) => setSourceCard(formatCardNumber(e.target.value))}
              placeholder="6037-****-****-****"
              className={`w-full p-3 border-2 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                errors.sourceCard ? "border-red-500" : "border-gray-300"
              }`}
            />
            {!errors.sourceCard &&
              sourceCard.replace(/-/g, "").length === 16 && (
                <CheckCircle
                  className="absolute left-3 top-3.5 text-green-500"
                  size={20}
                />
              )}
          </div>
          {errors.sourceCard && (
            <p className="mt-1 text-red-500 text-sm flex items-center">
              <AlertCircle className="ml-1" size={16} />
              {errors.sourceCard}
            </p>
          )}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
        >
          <label className="block text-gray-700 mb-2 font-medium">
            شماره کارت مقصد
          </label>
          <div className="relative">
            <input
              type="text"
              maxLength={19}
              value={destCard}
              onChange={(e) => setDestCard(formatCardNumber(e.target.value))}
              placeholder="6219-****-****-****"
              className={`w-full p-3 border-2 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                errors.destCard ? "border-red-500" : "border-gray-300"
              }`}
            />
            {!errors.destCard && destCard.replace(/-/g, "").length === 16 && (
              <CheckCircle
                className="absolute left-3 top-3.5 text-green-500"
                size={20}
              />
            )}
          </div>
          {errors.destCard && (
            <p className="mt-1 text-red-500 text-sm flex items-center">
              <AlertCircle className="ml-1" size={16} />
              {errors.destCard}
            </p>
          )}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3 }}
        >
          <label className="block text-gray-700 mb-2 font-medium">
            مبلغ (تومان)
          </label>
          <div className="relative">
            <input
              type="number"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              className={`w-full p-3 border-2 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                errors.amount ? "border-red-500" : "border-gray-300"
              }`}
            />
            {!errors.amount && amount && (
              <span className="absolute left-3 top-3.5 text-gray-500">
                تومان
              </span>
            )}
          </div>
          {errors.amount && (
            <p className="mt-1 text-red-500 text-sm flex items-center">
              <AlertCircle className="ml-1" size={16} />
              {errors.amount}
            </p>
          )}
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
        >
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            type="submit"
            disabled={isSubmitting}
            className={`w-full py-3 rounded-lg text-white font-medium ${
              isSubmitting ? "bg-blue-400" : "bg-blue-600 hover:bg-blue-700"
            }`}
          >
            {isSubmitting ? (
              <span className="inline-flex items-center">
                <svg
                  className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  ></path>
                </svg>
                در حال پردازش...
              </span>
            ) : (
              "ادامه به پرداخت"
            )}
          </motion.button>
        </motion.div>
      </form>
    </motion.div>
  );
}

export default TransferForm;
