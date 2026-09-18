import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Signup.css";

export default function Signup() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    role: "Student",
    password: "",
    confirmPassword: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [agree, setAgree] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    setError("");
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!formData.fullName.trim()) {
      setError("Please enter your full name.");
      return;
    }

    if (!formData.email.trim()) {
      setError("Please enter your email address.");
      return;
    }

    if (formData.password.length < 6) {
      setError("Password must contain at least 6 characters.");
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    if (!agree) {
      setError("Please accept the Terms & Conditions.");
      return;
    }

    // Temporary signup action
    // Backend/Firebase can be connected here later.
    alert("Account created successfully!");

    navigate("/login");
  };

  return (
    <div className="signup-page">

      <div className="signup-card">

        {/* ================= LEFT PANEL ================= */}
        <div className="signup-left">

          <img
            src="/logo.jpg"
            alt="Collegiya"
            className="signup-brand-logo"
          />

          <div className="left-content">

            <div className="signup-badge">
              LEARN • GROW • ACHIEVE
            </div>

            <h1>
              Start your
              <span> learning journey.</span>
            </h1>

            <p>
              Join Collegiya and explore courses, learning resources,
              tests, career guidance and much more.
            </p>

            <div className="benefits">

              <div className="benefit-item">
                <div className="benefit-icon">✓</div>
                <div>
                  <strong>Learn at your pace</strong>
                  <small>
                    Access your learning journey anytime.
                  </small>
                </div>
              </div>

              <div className="benefit-item">
                <div className="benefit-icon">✓</div>
                <div>
                  <strong>Prepare for your future</strong>
                  <small>
                    Courses, tests and career resources.
                  </small>
                </div>
              </div>

              <div className="benefit-item">
                <div className="benefit-icon">✓</div>
                <div>
                  <strong>Track your progress</strong>
                  <small>
                    Keep your learning journey organized.
                  </small>
                </div>
              </div>

            </div>
          </div>
        </div>


        {/* ================= RIGHT PANEL ================= */}
        <div className="signup-right">

          {/* Mobile Logo */}
          <div className="mobile-logo-box">
            <img
              src="/logo.jpg"
              alt="Collegiya"
            />
          </div>

          {/* Header */}
          <div className="signup-header">

            <div className="header-label">
              CREATE ACCOUNT
            </div>

            <h2>
              Join Collegiya
            </h2>

            <p>
              Create your account and start your journey.
            </p>

          </div>


          {/* Form */}
          <form
            className="signup-form"
            onSubmit={handleSubmit}
          >

            {/* Full Name */}
            <div className="form-group">

              <label htmlFor="fullName">
                Full name
              </label>

              <div className="input-box">

                <span className="input-icon">
                  ♙
                </span>

                <input
                  id="fullName"
                  name="fullName"
                  type="text"
                  placeholder="Enter your full name"
                  value={formData.fullName}
                  onChange={handleChange}
                  autoComplete="name"
                />

              </div>

            </div>


            {/* Email */}
            <div className="form-group">

              <label htmlFor="email">
                Email address
              </label>

              <div className="input-box">

                <span className="input-icon">
                  ✉
                </span>

                <input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="Enter your email"
                  value={formData.email}
                  onChange={handleChange}
                  autoComplete="email"
                />

              </div>

            </div>


            {/* Role */}
            <div className="form-group">

              <label htmlFor="role">
                I am a
              </label>

              <div className="input-box select-box">

                <span className="input-icon">
                  ☷
                </span>

                <select
                  id="role"
                  name="role"
                  value={formData.role}
                  onChange={handleChange}
                >
                  <option value="Student">
                    Student
                  </option>

                  <option value="Teacher">
                    Teacher
                  </option>

                  <option value="Creator">
                    Creator
                  </option>
                </select>

                <span className="select-arrow">
                  ▾
                </span>

              </div>

            </div>


            {/* Password */}
            <div className="form-group">

              <label htmlFor="password">
                Password
              </label>

              <div className="input-box">

                <span className="input-icon">
                  ●
                </span>

                <input
                  id="password"
                  name="password"
                  type={
                    showPassword
                      ? "text"
                      : "password"
                  }
                  placeholder="Create a password"
                  value={formData.password}
                  onChange={handleChange}
                  autoComplete="new-password"
                />

                <button
                  type="button"
                  className="password-button"
                  onClick={() =>
                    setShowPassword(!showPassword)
                  }
                  aria-label="Show password"
                >
                  {showPassword ? "Hide" : "Show"}
                </button>

              </div>

              <small className="input-help">
                Minimum 6 characters
              </small>

            </div>


            {/* Confirm Password */}
            <div className="form-group">

              <label htmlFor="confirmPassword">
                Confirm password
              </label>

              <div className="input-box">

                <span className="input-icon">
                  ●
                </span>

                <input
                  id="confirmPassword"
                  name="confirmPassword"
                  type={
                    showConfirmPassword
                      ? "text"
                      : "password"
                  }
                  placeholder="Confirm your password"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  autoComplete="new-password"
                />

                <button
                  type="button"
                  className="password-button"
                  onClick={() =>
                    setShowConfirmPassword(
                      !showConfirmPassword
                    )
                  }
                  aria-label="Show confirm password"
                >
                  {showConfirmPassword
                    ? "Hide"
                    : "Show"}
                </button>

              </div>

            </div>


            {/* Terms */}
            <label className="terms">

              <input
                type="checkbox"
                checked={agree}
                onChange={(e) =>
                  setAgree(e.target.checked)
                }
              />

              <span>
                I agree to the{" "}
                <a href="#terms">
                  Terms & Conditions
                </a>{" "}
                and{" "}
                <a href="#privacy">
                  Privacy Policy
                </a>.
              </span>

            </label>


            {/* Error */}
            {error && (
              <div className="signup-error">
                {error}
              </div>
            )}


            {/* Submit */}
            <button
              type="submit"
              className="signup-submit"
            >
              <span>
                Create Account
              </span>

              <b>
                →
              </b>
            </button>

          </form>


          {/* Login */}
          <div className="already-account">

            <span>
              Already have an account?
            </span>

            <Link to="/login">
              Login
            </Link>

          </div>


          {/* Security */}
          <div className="security-note">
            <span>🔒</span>
            <span>
              Your information is secure with Collegiya.
            </span>
          </div>

        </div>

      </div>

    </div>
  );
}
