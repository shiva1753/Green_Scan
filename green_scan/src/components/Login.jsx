import { useState } from "react";
import "../styles/auth.css";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    setMessage("");

    try {
      const res = await fetch("http://localhost:5000/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (res.ok) {
        // ✅ Sync state before redirecting
        localStorage.setItem("isLoggedIn", "true");
        localStorage.setItem("userEmail", email);
        localStorage.setItem("userBalance", data.paperBalance);
        
        console.log("✅ Login success, forcing redirect...");
        // Use hard redirect to ensure Selenium catches the URL change immediately
        window.location.href = "/home"; 
      } else {
        setMessage(data.message || "Invalid credentials");
      }
    } catch (error) {
      setMessage("Backend error. Check terminal.");
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-card">
        <h2>Login to GreenScan</h2>
        <form onSubmit={handleLogin}>
          <label>Email</label>
          <input
            id="loginEmail"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <label>Password</label>
          <input
            id="loginPassword"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          {message && <p id="errorMessage" style={{color: 'red'}}>{message}</p>}
          <button id="loginBtn" type="submit">Login</button>
        </form>
      </div>
    </div>
  );
}

export default Login;