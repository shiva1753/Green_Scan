import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/home.css"; 
import PrintLog from "../PrintLog"; 

function Home() {
  const navigate = useNavigate();
  const [showPrint, setShowPrint] = useState(false);
  const [paperRemaining, setPaperRemaining] = useState(2450);
  const userEmail = localStorage.getItem("userEmail");

  useEffect(() => {
    const isLoggedIn = localStorage.getItem("isLoggedIn");
    const savedBalance = localStorage.getItem("userBalance");
    if (isLoggedIn !== "true") {
      navigate("/login");
    } else if (savedBalance) {
      setPaperRemaining(Number(savedBalance));
    }
  }, [navigate]);

  const handleUpdateUI = (newBalance) => {
    setPaperRemaining(newBalance);
    localStorage.setItem("userBalance", newBalance);
  };

  return (
    <div className="home-container">
      <header className="top-bar">
        <h1 className="logo" id="appLogo">GreenScan</h1>
        <button id="logoutBtn" className="logout-btn" onClick={() => { localStorage.clear(); navigate("/login"); }}>Logout</button>
      </header>

      <section className="stats-grid">
        {/* Paper Card */}
        <div className="stat-card">
          <div className="stat-header">
            <span className="icon">📄</span>
            <span className="stat-title">PAPER REMAINING</span>
          </div>
          <h3 className="stat-value" id="paperCountDisplay">
            {paperRemaining} <span> sheets</span>
          </h3>
          <div className="progress-bar">
            <div className="progress blue" style={{ width: `${(paperRemaining/5000)*100}%` }} />
          </div>
        </div>

        {/* Toner Card - Restored */}
        <div className="stat-card">
          <div className="stat-header">
            <span className="icon">💧</span>
            <span className="stat-title">TONER LEVEL</span>
          </div>
          <h3 className="stat-value" id="tonerDisplay">68<span> %</span></h3>
          <div className="progress-bar">
            <div className="progress green" style={{ width: "68%" }} />
          </div>
        </div>
      </section>

      <section className="action-card">
        <button id="addPrintJobBtn" className="primary-btn" onClick={() => setShowPrint(!showPrint)}>
          {showPrint ? "Close Form" : "+ Add Print Job"}
        </button>
      </section>

      {showPrint && (
        <PrintLog 
          userEmail={userEmail} 
          onPrintSubmit={handleUpdateUI} 
        />
      )}
    </div>
  );
}

export default Home;