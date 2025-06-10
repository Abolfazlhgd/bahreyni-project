import React, { useState } from "react";

const CheckRegisterForm = () => {
  const [formData, setFormData] = useState({
    sayadiNumber: "",
    amount: "",
    dueDate: "",
    recipient: "",
  });

  const [success, setSuccess] = useState(false);

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("ثبت چک:", formData);
    setSuccess(true);
    // reset or handle data as needed
  };

  return (
    <div dir="rtl" className="max-w-md mx-auto p-6 bg-white shadow rounded-lg">
      <h2 className="text-lg font-bold mb-4 p-6 text-center text-blue-600">
        ثبت چک صیادی
      </h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          name="sayadiNumber"
          placeholder="شماره صیادی"
          value={formData.sayadiNumber}
          onChange={handleChange}
          className="w-full px-3 py-2 border rounded"
        />
        <input
          type="number"
          name="amount"
          placeholder="مبلغ (تومان)"
          value={formData.amount}
          onChange={handleChange}
          className="w-full px-3 py-2 border rounded"
        />
        <input
          type="date"
          name="dueDate"
          value={formData.dueDate}
          onChange={handleChange}
          className="w-full px-3 py-2 border rounded"
        />
        <input
          type="text"
          name="recipient"
          placeholder="نام ذی‌نفع"
          value={formData.recipient}
          onChange={handleChange}
          className="w-full px-3 py-2 border rounded"
        />
        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600"
        >
          ثبت چک
        </button>
        {success && (
          <p className="text-green-600 text-center font-medium mt-2">
            چک با موفقیت ثبت شد!
          </p>
        )}
      </form>
    </div>
  );
};

export default CheckRegisterForm;
