import { useState } from "react";

function BillPaymentForm({ onSubmit }) {
  const [billId, setBillId] = useState("");
  const [paymentId, setPaymentId] = useState("");
  const [error, setError] = useState("");

  const validateForm = () => {
    if (!billId.match(/^\d{13}$/)) {
      setError("شناسه قبض باید ۱۳ رقم باشد.");
      return false;
    }
    if (!paymentId.match(/^\d{13}$/)) {
      setError("شناسه پرداخت باید ۱۳ رقم باشد.");
      return false;
    }
    setError("");
    return true;
  };

  const handleSubmit = () => {
    if (!validateForm()) return;

    onSubmit({
      billId,
      paymentId,
    });
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-white rounded-xl shadow-md space-y-6">
      <h2 className="text-lg font-bold text-center">پرداخت قبض</h2>

      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">
            شناسه قبض
          </label>
          <input
            type="text"
            maxLength={13}
            value={billId}
            onChange={(e) => setBillId(e.target.value.replace(/\D/g, ""))}
            className="w-full mt-1 p-2 border rounded-md text-center"
            placeholder="مثلاً 1234567890123"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            شناسه پرداخت
          </label>
          <input
            type="text"
            maxLength={13}
            value={paymentId}
            onChange={(e) => setPaymentId(e.target.value.replace(/\D/g, ""))}
            className="w-full mt-1 p-2 border rounded-md text-center"
            placeholder="مثلاً 1234567890123"
          />
        </div>

        {error && <p className="text-red-500 text-sm text-center">{error}</p>}

        <button
          onClick={handleSubmit}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-md"
        >
          بررسی قبض
        </button>
      </div>
    </div>
  );
}

export default BillPaymentForm;
