import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/auth.css";

function Login() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    setMessage("");

    try {
      const res = await fetch("http://localhost:5000/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          password,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        setMessage(data.message || "Invalid email or password");
        return;
      }

      // ✅ LOGIN SUCCESS
      localStorage.setItem("isLoggedIn", "true");
      navigate("/home");
    } catch (error) {
      setMessage("Backend not reachable. Is server running?");
    }
  };

  return (
    <div className="auth-page">
      <h1 className="app-title">GreenScan</h1>
      <p className="app-subtitle">
        Smart Office Print & Resource Tracker
      </p>

      <div className="auth-card">
        <h2>Welcome Back</h2>
        <p className="card-subtitle">Please login to your account</p>

        <form onSubmit={handleLogin}>
          <label>Email Address</label>
          <input
            id="loginEmail"
            type="email"
            placeholder="Enter your email address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <label>Password</label>
          <input
            id="loginPassword"
            type="password"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          {message && <p className="error-text">{message}</p>}

          <button id="loginBtn" type="submit">
            Login
          </button>
        </form>

        <p className="switch-text">
          Don&apos;t have an account?{" "}
          <span onClick={() => navigate("/register")}>
            Register
          </span>
        </p>
      </div>

      <footer>Academic Lab Project © 2026</footer>
    </div>
  );
}

export default Login;
