import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/teacher-login.css";

export default function TeacherLogin() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = (e) => {
    e.preventDefault();

    if (!email || !password) {
      alert("Please enter email and password");
      return;
    }

    navigate("/teacher/dashboard");
  };

  return (
    <div className="teacher-login-page">
      <div className="teacher-login-card">

        <div className="teacher-login-logo">
          <img src="/logo.jpg" alt="COLLEGIYA" />
        </div>

        <div className="teacher-login-heading">
          <span>COLLEGIYA</span>
          <h1>Teacher Portal</h1>
          <p>Sign in to manage your teaching workspace.</p>
        </div>

        <form onSubmit={handleLogin}>

          <div className="teacher-field">
            <label>Email Address</label>
            <input
              type="email"
              placeholder="teacher@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div className="teacher-field">
            <div className="teacher-password-label">
              <label>Password</label>
              <button type="button">Forgot password?</button>
            </div>

            <input
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <button className="teacher-login-btn" type="submit">
            Sign In
          </button>

        </form>

        <div className="teacher-login-divider">
          <span>New to COLLEGIYA?</span>
        </div>

        <button
          className="teacher-register-btn"
          onClick={() => navigate("/teacher/register")}
        >
          Apply as a Teacher
        </button>

        <p className="teacher-login-note">
          Teacher accounts are created after verification.
        </p>

      </div>
    </div>
  );
}
