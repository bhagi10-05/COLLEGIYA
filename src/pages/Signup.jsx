import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./signup.css";

const API_BASE =
  import.meta.env.VITE_API_URL ||
  "http://localhost:5000/api";

export default function Signup() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    fullName: "",
    email: "",
    role: "Student",
    password: "",
    confirmPassword: "",
    terms: false,
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [loading, setLoading] = useState(false);

  const updateForm = (e) => {
    const { name, value, type, checked } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const submitSignup = async (e) => {
    e.preventDefault();

    const fullName = form.fullName.trim();
    const email = form.email.trim().toLowerCase();

    if (!fullName) {
      alert("Please enter your full name.");
      return;
    }

    if (!email) {
      alert("Please enter your email.");
      return;
    }

    if (!form.password) {
      alert("Please enter your password.");
      return;
    }

    if (form.password.length < 8) {
      alert("Password must be at least 8 characters.");
      return;
    }

    if (!/[A-Z]/.test(form.password)) {
      alert("Password must contain at least one uppercase letter.");
      return;
    }

    if (!/[a-z]/.test(form.password)) {
      alert("Password must contain at least one lowercase letter.");
      return;
    }

    if (!/[0-9]/.test(form.password)) {
      alert("Password must contain at least one number.");
      return;
    }

    if (form.password !== form.confirmPassword) {
      alert("Passwords do not match.");
      return;
    }

    if (!form.terms) {
      alert("Please accept the terms and conditions.");
      return;
    }

    if (form.role !== "Student") {
      alert("Currently only Student accounts can be created.");
      return;
    }

    try {
      setLoading(true);

      const response = await fetch(
        `${API_BASE}/auth/student/signup`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name: fullName,
            email,
            password: form.password,
          }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        alert(data.message || "Unable to create account.");
        return;
      }

      localStorage.removeItem("collegiya_student_token");
      localStorage.removeItem("collegiya_student_user");

      alert(
        "Account created successfully! Please login to continue."
      );

      navigate("/login", { replace: true });
    } catch (error) {
      console.error("Signup Error:", error);

      alert(
        "Unable to connect to COLLEGIYA server. Please make sure the backend is running."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="signup-page">

      <div className="signup-card">

        {/* RIGHT PANEL */}
        <section className="signup-form-section signup-form-full">

          <div className="signup-form-header">

            <span className="signup-small-title">
              CREATE YOUR ACCOUNT
            </span>

            <h2>Get started</h2>

            <p>
              Enter your details to create your COLLEGIYA account.
            </p>

          </div>

          <form
            className="signup-form"
            onSubmit={submitSignup}
          >

            <div className="signup-row">

              <div className="signup-input-group">

                <label htmlFor="fullName">
                  Full Name
                </label>

                <input
                  id="fullName"
                  name="fullName"
                  type="text"
                  value={form.fullName}
                  onChange={updateForm}
                  placeholder="Your full name"
                  autoComplete="name"
                />

              </div>

              <div className="signup-input-group">

                <label htmlFor="email">
                  Email Address
                </label>

                <input
                  id="email"
                  name="email"
                  type="email"
                  value={form.email}
                  onChange={updateForm}
                  placeholder="you@example.com"
                  autoComplete="email"
                />

              </div>

            </div>

            <div className="signup-input-group">

              <label>Account Type</label>

              <div className="signup-role-grid">

                <label
                  className={`signup-role ${
                    form.role === "Student"
                      ? "active"
                      : ""
                  }`}
                >
                  <input
                    type="radio"
                    name="role"
                    value="Student"
                    checked={form.role === "Student"}
                    onChange={updateForm}
                  />
                  <span className="signup-role-icon">
                    🎓
                  </span>
                  <span>
                    <strong>Student</strong>
                    <small>Learn & grow</small>
                  </span>
                </label>

                <label
                  className={`signup-role ${
                    form.role === "Teacher"
                      ? "active"
                      : ""
                  }`}
                >
                  <input
                    type="radio"
                    name="role"
                    value="Teacher"
                    checked={form.role === "Teacher"}
                    onChange={updateForm}
                  />
                  <span className="signup-role-icon">
                    👨‍🏫
                  </span>
                  <span>
                    <strong>Teacher</strong>
                    <small>Teach students</small>
                  </span>
                </label>

                <label
                  className={`signup-role ${
                    form.role === "Creator"
                      ? "active"
                      : ""
                  }`}
                >
                  <input
                    type="radio"
                    name="role"
                    value="Creator"
                    checked={form.role === "Creator"}
                    onChange={updateForm}
                  />
                  <span className="signup-role-icon">
                    ✨
                  </span>
                  <span>
                    <strong>Creator</strong>
                    <small>Create content</small>
                  </span>
                </label>

              </div>

            </div>

            <div className="signup-row">

              <div className="signup-input-group">

                <label htmlFor="password">
                  Password
                </label>

                <div className="signup-password">

                  <input
                    id="password"
                    name="password"
                    type={
                      showPassword
                        ? "text"
                        : "password"
                    }
                    value={form.password}
                    onChange={updateForm}
                    placeholder="Minimum 8 characters"
                    autoComplete="new-password"
                  />

                  <button
                    type="button"
                    onClick={() =>
                      setShowPassword((v) => !v)
                    }
                    aria-label="Toggle password"
                  >
                    {showPassword ? "Hide" : "Show"}
                  </button>

                </div>

              </div>

              <div className="signup-input-group">

                <label htmlFor="confirmPassword">
                  Confirm Password
                </label>

                <div className="signup-password">

                  <input
                    id="confirmPassword"
                    name="confirmPassword"
                    type={
                      showConfirm
                        ? "text"
                        : "password"
                    }
                    value={form.confirmPassword}
                    onChange={updateForm}
                    placeholder="Re-enter password"
                    autoComplete="new-password"
                  />

                  <button
                    type="button"
                    onClick={() =>
                      setShowConfirm((v) => !v)
                    }
                    aria-label="Toggle confirm password"
                  >
                    {showConfirm ? "Hide" : "Show"}
                  </button>

                </div>

              </div>

            </div>

            <label className="signup-terms">

              <input
                type="checkbox"
                name="terms"
                checked={form.terms}
                onChange={updateForm}
              />

              <span>
                I agree to the{" "}
                <a
                  href="#terms"
                  onClick={(e) => e.preventDefault()}
                >
                  Terms & Conditions
                </a>{" "}
                and Privacy Policy.
              </span>

            </label>

            <button
              type="submit"
              className="signup-button"
              disabled={loading}
            >
              {loading
                ? "Creating Account..."
                : "Create Account"}
              <span>→</span>
            </button>

          </form>

          <div className="signup-login-link">
            Already have an account?
            <Link to="/login">Login</Link>
          </div>

          <div className="signup-security">
            <span>🔒</span>
            Secure account creation
          </div>

        </section>

      </div>

    </main>
  );
}
