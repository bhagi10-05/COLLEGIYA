import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./signup.css";

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

  const submitSignup = (e) => {
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

    const existingUser = localStorage.getItem(
      "collegiya_registered_user"
    );

    if (existingUser) {
      try {
        const user = JSON.parse(existingUser);

        if (
          user.email &&
          user.email.toLowerCase() === email
        ) {
          alert(
            "An account with this email already exists. Please login."
          );

          navigate("/login");
          return;
        }
      } catch (error) {
        console.error(error);
      }
    }

    const newUser = {
      fullName,
      email,
      role: form.role || "Student",
      password: form.password,
      createdAt: new Date().toISOString(),
    };

    localStorage.setItem(
      "collegiya_registered_user",
      JSON.stringify(newUser)
    );

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
                    Courses & Practice
                  </strong>

                  <span>
                    Learn and test your skills
                  </span>
                </div>

              </div>

              <div className="signup-feature">

                <div className="signup-feature-icon">
                  ★
                </div>

                <div>
                  <strong>
                    Track Your Progress
                  </strong>

                  <span>
                    Keep improving every day
                  </span>
                </div>

              </div>

            </div>

          </div>

          <div className="signup-brand-footer">
            <span>Learn Better.</span>
            <span>Grow Smarter.</span>
          </div>

        </section>


        {/* SIGNUP FORM */}

        <section className="signup-form-panel">

          <div className="signup-form-container">

            <div className="signup-mobile-logo">

              <Link to="/">
                <img
                  src="/logo.jpg"
                  alt="Collegiya"
                />
              </Link>

            </div>


            <div className="signup-title">

              <span className="signup-title-label">
                CREATE ACCOUNT
              </span>

              <h2>
                Join Collegiya
              </h2>

              <p>
                Create your account to start learning.
              </p>

            </div>


            <form
              className="signup-form"
              onSubmit={submitSignup}
            >

              {/* NAME */}

              <div className="signup-group">

                <label htmlFor="signup-name">
                  Full name
                </label>

                <input
                  id="signup-name"
                  name="fullName"
                  type="text"
                  placeholder="Enter your full name"
                  value={form.fullName}
                  onChange={updateForm}
                  autoComplete="name"
                />

              </div>


              {/* EMAIL */}

              <div className="signup-group">

                <label htmlFor="signup-email">
                  Email address
                </label>

                <input
                  id="signup-email"
                  name="email"
                  type="email"
                  placeholder="you@example.com"
                  value={form.email}
                  onChange={updateForm}
                  autoComplete="email"
                />

              </div>


              {/* ROLE */}

              <div className="signup-group">

                <label htmlFor="signup-role">
                  Account type
                </label>

                <select
                  id="signup-role"
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


              {/* PASSWORD */}

              <div className="signup-group">

                <label htmlFor="signup-password">
                  Password
                </label>

                <div className="signup-password-input">

                  <input
                    id="signup-password"
                    name="password"
                    type={
                      showPassword
                        ? "text"
                        : "password"
                    }
                    placeholder="Create a strong password"
                    value={form.password}
                    onChange={updateForm}
                    autoComplete="new-password"
                  />

                  <button
                    type="button"
                    onClick={() =>
                      setShowPassword(
                        (old) => !old
                      )
                    }
                  >
                    {showPassword
                      ? "Hide"
                      : "Show"}
                  </button>

                </div>

              </div>


              {/* CONFIRM PASSWORD */}

              <div className="signup-group">

                <label htmlFor="signup-confirm-password">
                  Confirm password
                </label>

                <div className="signup-password-input">

                  <input
                    id="signup-confirm-password"
                    name="confirmPassword"
                    type={
                      showConfirmPassword
                        ? "text"
                        : "password"
                    }
                    placeholder="Confirm your password"
                    value={
                      form.confirmPassword
                    }
                    onChange={updateForm}
                    autoComplete="new-password"
                  />

                  <button
                    type="button"
                    onClick={() =>
                      setShowConfirmPassword(
                        (old) => !old
                      )
                    }
                  >
                    {showConfirmPassword
                      ? "Hide"
                      : "Show"}
                  </button>

                </div>

              </div>


              {/* TERMS */}

              <label className="signup-terms">

                <input
                  type="checkbox"
                  name="terms"
                  checked={form.terms}
                  onChange={updateForm}
                />

                <span>
                  I agree to the terms and conditions.
                </span>

              </label>


              {/* CREATE ACCOUNT */}

              <button
                type="submit"
                className="signup-button"
              >

                <span>
                  Create Account
                </span>

                <svg
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <path d="M5 12h14" />
                  <path d="M13 6l6 6-6 6" />
                </svg>

              </button>

            </form>


            {/* LOGIN */}

            <div className="signup-login">

              <span>
                Already have an account?
              </span>

              <Link to="/login">
                Sign in
              </Link>

            </div>


            <div className="signup-secure">

              <svg
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <rect
                  x="5"
                  y="10"
                  width="14"
                  height="10"
                  rx="2"
                />

                <path d="M8 10V7a4 4 0 018 0v3" />
              </svg>

              <span>
                Secure account • Collegiya
              </span>

            </div>

          </div>

        </section>

      </div>

    </main>
  );
}
