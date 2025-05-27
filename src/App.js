import React, { useState } from "react";
import Login from "./Components/Login.jsx";
import HomePage from "./Components/Home/HomePage.jsx";
import TrophyPage from "./Components/TrophyPage.jsx";
import GamePage from "./Components/Home/GamePage.jsx";
import BottomNav from "./Components/Home/BottomNav.jsx";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [activePage, setActivePage] = useState("home"); // home | trophy | game

  if (!isLoggedIn) {
    return (
      <div className="bg-gradient-to-b from-blue-50 to-white min-h-screen">
        <Login onLoginSuccess={() => setIsLoggedIn(true)} />
      </div>
    );
  }

  const renderPage = () => {
    switch (activePage) {
      case "home":
        return <HomePage />;
      case "trophy":
        return <TrophyPage />;
      case "game":
        return <GamePage />;
      default:
        return <HomePage />;
    }
  };

  return (
    <div className="bg-gradient-to-b from-blue-50 to-white min-h-screen pb-20">
      {renderPage()}
      <BottomNav active={activePage} onChange={setActivePage} />
    </div>
  );
}

export default App;
