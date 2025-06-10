import {
  Routes,
  Route,
  Navigate,
  useLocation,
  useNavigate,
  data,
} from "react-router-dom";
import { useState } from "react";
import Login from "./Components/Login/Login.jsx";
import HomePage from "./Components/Home/HomePage";
import TrophyPage from "./Components/Home/TrophyPage.jsx";
import GamePage from "./Components/Home/GamePage.jsx";
import TransferForm from "./Components/Games/Transfer/TransferForm";
import TransferConfirm from "./Components/Games/Transfer/TransferConfirm";
import TransactionReceipt from "./Components/Games/Transfer/TransactionReceipt..jsx";
import BillPaymentForm from "./Components/Games/BillPayment/BillPaymentForm";
import BillDetailsPage from "./Components/Games/BillPayment/BillDetailsPage.jsx";
import BottomNav from "./Components/Home/BottomNav";
import CheckRegisterForm from "./Components/Games/CheckRegister/CheckRegisterForm.jsx";
import PhishingGame from "./Components/Games/PhishingGame/PhishingGame.jsx";

function AppContent() {
  const [transferData, setTransferData] = useState(null);
  const location = useLocation();
  const navigate = useNavigate();

  const showBottomNav = ["/", "/trophies", "/goals"].includes(
    location.pathname
  );

  return (
    <div className="bg-gradient-to-b from-blue-50 to-white min-h-screen pb-20">
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/trophies" element={<TrophyPage />} />
        <Route path="/goals" element={<GamePage />} />
        <Route
          path="/transfer"
          element={
            <TransferForm
              onSubmit={(data) => {
                setTransferData(data);
                navigate("/payment-confirm");
              }}
            />
          }
        />
        <Route
          path="/payment-confirm"
          element={
            <TransferConfirm
              data={transferData}
              onBack={() => navigate("/transfer")}
              onSuccess={() => navigate("/success")}
            />
          }
        />
        <Route
          path="/success"
          element={
            <TransactionReceipt
              data={transferData}
              onBackToHome={() => {
                setTransferData(null);
                navigate("/");
              }}
            />
          }
        />
        <Route
          path="/bill-payment"
          element={
            <BillPaymentForm
              onSubmit={(data) => navigate("/bill-details", { state: data })}
            />
          }
        />
        <Route path="phishing-game" element={<PhishingGame />}/>
        <Route path="/bill-details" element={<BillDetailsPage />} />
        <Route path="/check-register" element={<CheckRegisterForm />} />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>

      {showBottomNav && <BottomNav />}
    </div>
  );
}

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  if (!isLoggedIn) {
    return (
      <div className="bg-gradient-to-b from-blue-50 to-white min-h-screen">
        <Login onLoginSuccess={() => setIsLoggedIn(true)} />
      </div>
    );
  }

  return <AppContent />;
}

export default App;
