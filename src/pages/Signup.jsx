import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./signup.css";

const API_BASE =
  import.meta.env.VITE_API_URL ||
  "http://localhost:5000/api";

export default function Signup() {
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] =
    useState(false);

  const [form, setForm] = useState({
    fullName: "",
    email: "",
    role: "Student",
    password: "",
    confirmPassword: "",
    terms: false,
  });

  const updateForm = (e) => {
    const { name, value, type, checked } = e.target;

    setForm((old) => ({
      ...old,
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
      alert(
        "Password must be at least 8 characters."
      );
      return;
    }

    if (!/[A-Z]/.test(form.password)) {
      alert(
        "Password must contain at least one uppercase letter."
      );
      return;
    }

    if (!/[a-z]/.test(form.password)) {
      alert(
        "Password must contain at least one lowercase letter."
      );
      return;
    }

    if (!/[0-9]/.test(form.password)) {
      alert(
        "Password must contain at least one number."
      );
      return;
    }

    if (
      form.password !== form.confirmPassword
    ) {
      alert("Passwords do not match.");
      return;
    }

    if (!form.terms) {
      alert(
        "Please accept the terms and conditions."
      );
      return;
    }

    if (form.role !== "Student") {
      alert(
        "Currently only Student accounts can be created."
      );
      return;
    }

    try {
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
        alert(
          data.message ||
            "Unable to create account."
        );
        return;
      }

      /*
        Signup does NOT automatically log the user in.
        The user must login with the registered
        email and password.
      */

      localStorage.removeItem(
        "collegiya_student_token"
      );

      localStorage.removeItem(
        "collegiya_student_user"
      );

      alert(
        "Account created successfully! Please login to continue."
      );

      navigate("/login");
    } catch (error) {
      console.error("Signup Error:", error);

      alert(
        "Unable to connect to COLLEGIYA server. Please make sure the backend is running."
      );
    }
  };

  return (
    <main className="signup-screen">

      <div className="signup-wrapper">

        {/* BRAND */}

        <section className="signup-brand-panel">

          <div className="signup-decoration signup-decoration-one" />

          <div className="signup-decoration signup-decoration-two" />

          <Link
            to="/"
            className="signup-brand-logo"
          >
            <img
              src="/logo.jpg"
              alt="Collegiya"
            />
          </Link>

          <div className="signup-brand-content">

            <div className="signup-brand-badge">
              <span />
              JOIN COLLEGIYA
            </div>

            <h1>
              Start.
              <br />
              Learn.
              <br />
              <strong>Grow.</strong>
            </h1>

            <p>
              Create your Collegiya account and
              start your learning journey.
            </p>

            <div className="signup-brand-features">

              <div className="signup-feature">

                <div className="signup-feature-icon">
                  ✓
                </div>

                <div>
                  <strong>
                    Structured Learning
                  </strong>

                  <span>
                    Learn at your own pace
                  </span>
                </div>

              </div>

              <div className="signup-feature">

                <div className="signup-feature-icon">
                  ◈
                </div>

                <div>
                  <strong>
                    Expert Content
                  </strong>

                  <span>
                    Learn from quality resources
                  </span>
                </div>

              </div>

              <div className="signup-feature">

                <div className="signup-feature-icon">
                  ★
                </div>

                <div>
                  <strong>
                    Track Progress
                  </strong>

                  <span>
                    See your learning growth
                  </span>
                </div>

              </div>

            </div>

          </div>

          <div className="signup-brand-footer">
            © {new Date().getFullYear()} COLLEGIYA
          </div>

        </section>

        {/* FORM */}

        <section className="signup-form-panel">

          <div className="signup-mobile-logo">
            <Link to="/">
              <img
                src="/logo.jpg"
                alt="Collegiya"
              />
            </Link>
          </div>

          <div className="signup-form-container">

            <div className="signup-title">

              <span>
                CREATE ACCOUNT
              </span>

              <h2>
                Begin your journey.
              </h2>

              <p>
                Create your account and unlock
                the Collegiya learning experience.
              </p>

            </div>

            <form
              className="signup-form"
              onSubmit={submitSignup}
            >

              <div className="signup-field">

                <label htmlFor="fullName">
                  Full Name
                </label>

                <input
                  id="fullName"
                  name="fullName"
                  type="text"
                  value={form.fullName}
                  onChange={updateForm}
                  placeholder="Enter your full name"
                  autoComplete="name"
                />

              </div>

              <div className="signup-field">

                <label htmlFor="email">
                  Email Address
                </label>

                <input
                  id="email"
                  name="email"
                  type="email"
                  value={form.email}
                  onChange={updateForm}
                  placeholder="Enter your email"
                  autoComplete="email"
                />

              </div>

              <div className="signup-field">

                <label htmlFor="role">
                  I am a
                </label>

                <select
                  id="role"
                  name="role"
                  value={form.role}
                  onChange={updateForm}
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

              </div>

              <div className="signup-field">

                <label htmlFor="password">
                  Password
                </label>

                <div className="signup-password-wrap">

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
                    placeholder="Create a strong password"
                    autoComplete="new-password"
                  />

                  <button
                    type="button"
                    className="signup-password-toggle"
                    onClick={() =>
                      setShowPassword(
                        (value) => !value
                      )
                    }
                  >
                    {showPassword ? "Hide" : "Show"}
                  </button>

                </div>

              </div>

              <div className="signup-field">

                <label htmlFor="confirmPassword">
                  Confirm Password
                </label>

                <div className="signup-password-wrap">

                  <input
                    id="confirmPassword"
                    name="confirmPassword"
                    type={
                      showConfirmPassword
                        ? "text"
                        : "password"
                    }
                    value={
                      form.confirmPassword
                    }
                    onChange={updateForm}
                    placeholder="Confirm your password"
                    autoComplete="new-password"
                  />

                  <button
                    type="button"
                    className="signup-password-toggle"
                    onClick={() =>
                      setShowConfirmPassword(
                        (value) => !value
                      )
                    }
                  >
                    {showConfirmPassword
                      ? "Hide"
                      : "Show"}
                  </button>

                </div>

              </div>

              <label className="signup-terms">

                <input
                  name="terms"
                  type="checkbox"
                  checked={form.terms}
                  onChange={updateForm}
                />

                <span>
                  I agree to the{" "}
                  <a
                    href="#terms"
                    onClick={(e) =>
                      e.preventDefault()
                    }
                  >
                    Terms & Conditions
                  </a>{" "}
                  and Privacy Policy.
                </span>

              </label>

              <button
                type="submit"
                className="signup-submit"
              >
                Create Account
              </button>

            </form>

            <div className="signup-login">

              Already have an account?{" "}

              <Link to="/login">
                Login
              </Link>

            </div>

            <div className="signup-secure">

              <span>🔒</span>

              Your information is securely
              protected.

            </div>

          </div>

        </section>

      </div>

    </main>
  );
}
