import { useLocation, useNavigate } from "react-router-dom";

function BillDetailsPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const { billId, paymentId } = location.state || {};

  return (
    <div className="max-w-md mx-auto p-6 bg-white rounded-xl shadow-md space-y-4 mt-6">
      <button
        onClick={() => navigate(-1)}
        className="text-sm text-blue-600 hover:underline"
      >
        ← بازگشت
      </button>

      <h2 className="text-lg font-bold text-center">جزئیات قبض</h2>

      <div className="space-y-2 text-center">
        <p>
          🔹 شناسه قبض: <strong>{billId}</strong>
        </p>
        <p>
          🔹 شناسه پرداخت: <strong>{paymentId}</strong>
        </p>
        <p>
          مبلغ: <strong>۱۲۰٬۰۰۰ تومان</strong>
        </p>
        <p>
          نوع قبض: <strong>برق</strong>
        </p>
      </div>

      <button
        onClick={() => alert("درگاه پرداخت باز می‌شود...")}
        className="w-full bg-green-600 hover:bg-green-700 text-white py-2 rounded-md mt-4"
      >
        پرداخت
      </button>
    </div>
  );
}

export default BillDetailsPage;
