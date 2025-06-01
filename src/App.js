import React, { useState } from "react";
import Login from "./Components/Login.jsx";
import HomePage from "./Components/Home/HomePage.jsx";
import TrophyPage from "./Components/TrophyPage.jsx";
import GamePage from "./Components/GamePage.jsx";
import TransferPage from "./Components/Games/TransferForm.jsx"; // صفحه جدید
import PaymentConfirmPage from "./Components/Games/PaymentConfirm.jsx"; // صفحه جدید
import BottomNav from "./Components/Home/BottomNav.jsx";
import TransactionReceipt from "./Components/Games/TransactionReceipt.jsx";
import BillPaymentForm from "./Components/Games/BillPayment/BillPaymentForm.jsx";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [activePage, setActivePage] = useState("home"); // home | trophy | game | transfer
  const [transferData, setTransferData] = useState(null); // داده‌های انتقال وجه

  if (!isLoggedIn) {
    return (
      <div className="bg-gradient-to-b from-blue-50 to-white min-h-screen">
        <Login onLoginSuccess={() => setIsLoggedIn(true)} />
      </div>
    );
  }

  const handleTransferSubmit = (data) => {
    setTransferData(data);
    setActivePage("payment-confirm");
  };

  const renderPage = () => {
    switch (activePage) {
      case "home":
        return <HomePage />;
      case "trophy":
        return <TrophyPage />;
      case "game":
        return <GamePage onGameSelect={setActivePage} />;
      case "transfer":
        return <TransferPage onSubmit={handleTransferSubmit} />;
      case "payment-confirm":
        return (
          <PaymentConfirmPage
            data={transferData}
            onBack={() => setActivePage("transfer")}
            onSuccess={() => setActivePage("success")}
          />
        );
      case "success":
        return (
          <TransactionReceipt
            data={transferData}
            onBackToHome={() => {
              setTransferData(null);
              setActivePage("home");
            }}
          />
        );
      case "bill-payment":
        return (
          <BillPaymentForm
            onSubmit={(data) => {
              console.log("قبض ارسال شد:", data);
              // بعداً می‌تونی به صفحه تأیید قبض بری
            }}
          />
        );
      default:
        return <HomePage />;
    }
  };

  return (
    <div className="bg-gradient-to-b from-blue-50 to-white min-h-screen pb-20">
      {renderPage()}
      {/* نویگیشن پایین فقط برای صفحات اصلی نمایش داده شود */}
      {!["transfer", "payment-confirm"].includes(activePage) && (
        <BottomNav active={activePage} onChange={setActivePage} />
      )}
    </div>
  );
}

export default App;
