import React, { useEffect, useState } from "react";

function TransactionReceipt({ data, onBackToHome }) {
  const [trackingCode, setTrackingCode] = useState("");
  const [timestamp, setTimestamp] = useState("");

  useEffect(() => {
    if (!data) return;

    // ساخت کد رهگیری تصادفی و تاریخ/ساعت
    const now = new Date();
    setTrackingCode(
      Math.floor(100000000 + Math.random() * 900000000).toString()
    );
    setTimestamp(
      `${now.toLocaleDateString("fa-IR")} - ${now.toLocaleTimeString("fa-IR")}`
    );
  }, [data]);

  if (!data) {
    return (
      <div className="flex justify-center items-center h-64">
        <p>اطلاعاتی برای نمایش وجود ندارد.</p>
      </div>
    );
  }

  return (
    <div className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-md text-right">
      <h2 className="text-2xl font-bold text-center text-green-600 mb-6">
        پرداخت موفق
      </h2>

      <div className="space-y-4 text-sm text-gray-700 mb-6">
        <div className="flex justify-between">
          <span>از کارت:</span>
          <span className="font-mono">{data.sourceCard}</span>
        </div>
        <div className="flex justify-between">
          <span>به کارت:</span>
          <span className="font-mono">{data.destCard}</span>
        </div>
        <div className="flex justify-between font-bold">
          <span>مبلغ:</span>
          <span className="text-green-700">{data.amount} تومان</span>
        </div>
        <div className="flex justify-between">
          <span>کد پیگیری:</span>
          <span className="font-mono text-blue-600">{trackingCode}</span>
        </div>
        <div className="flex justify-between">
          <span>تاریخ و ساعت:</span>
          <span>{timestamp}</span>
        </div>
      </div>

      <button
        onClick={onBackToHome}
        className="w-full py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
      >
        بازگشت به صفحه اصلی
      </button>
    </div>
  );
}

export default TransactionReceipt;
