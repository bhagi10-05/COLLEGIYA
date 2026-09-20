import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./login.css";

export default function Login() {
  const navigate = useNavigate();

  const [passwordVisible, setPasswordVisible] = useState(false);

  const [form, setForm] = useState({
    email: "",
    password: "",
    remember: false,
  });

  const updateForm = (e) => {
    const { name, value, type, checked } = e.target;

    setForm((old) => ({
      ...old,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const submitLogin = (e) => {
    e.preventDefault();

    if (!form.email.trim()) {
      alert("Please enter your email.");
      return;
    }

    if (!form.password.trim()) {
      alert("Please enter your password.");
      return;
    }

    /*
      Existing login flow is preserved.
      A local student session is created only
      after the existing validation succeeds.
    */

    const loginToken =
      `student_${Date.now()}_` +
      Math.random().toString(36).slice(2);

    localStorage.setItem(
      "collegiya_student_token",
      loginToken
    );

    navigate("/student/dashboard");
  };

  return (
    <main className="login-screen">

      <div className="login-wrapper">

        {/* LEFT BRAND AREA */}

        <section className="login-brand-panel">

          <div className="login-decoration login-decoration-one" />

          <div className="login-decoration login-decoration-two" />

          <Link
            to="/"
            className="login-brand-logo"
          >
            <img
              src="/logo.jpg"
              alt="Collegiya"
            />
          </Link>

          <div className="login-brand-content">

            <div className="login-brand-badge">
              <span />
              LEARNING PLATFORM
            </div>

            <h1>
              Learn.
              <br />
              Practice.
              <br />
              <strong>Grow.</strong>
            </h1>

            <p>
              Everything you need to learn new skills,
              practice your knowledge and build your future
              is waiting for you.
            </p>

            <div className="login-brand-features">

              <div className="login-feature">

                <div className="login-feature-icon">
                  ✓
                </div>

                <div>
                  <strong>
                    Structured Courses
                  </strong>

                  <span>
                    Learn step by step
                  </span>
                </div>

              </div>

              <div className="login-feature">

                <div className="login-feature-icon">
                  ◈
                </div>

                <div>
                  <strong>
                    Practice & Quiz
                  </strong>

                  <span>
                    Improve your knowledge
                  </span>
                </div>

              </div>

              <div className="login-feature">

                <div className="login-feature-icon">
                  ★
                </div>

                <div>
                  <strong>
                    Track Progress
                  </strong>

                  <span>
                    See how far you have come
                  </span>
                </div>

              </div>

            </div>

          </div>

          <div className="login-brand-footer">
            <span>Learn Better.</span>
            <span>Grow Smarter.</span>
          </div>

        </section>


        {/* LOGIN AREA */}

        <section className="login-form-panel">

          <div className="login-form-container">

            {/* MOBILE LOGO */}

            <div className="login-mobile-logo">

              <Link to="/">
                <img
                  src="/logo.jpg"
                  alt="Collegiya"
                />
              </Link>

            </div>


            {/* HEADING */}

            <div className="login-title">

              <span className="login-title-label">
                WELCOME BACK
              </span>

              <h2>
                Sign in to Collegiya
              </h2>

              <p>
                Enter your details to continue learning.
              </p>

            </div>


            {/* FORM */}

            <form
              className="login-form"
              onSubmit={submitLogin}
            >

              {/* EMAIL */}

              <div className="login-group">

                <label htmlFor="login-email">
                  Email address
                </label>

                <div className="login-input">

                  <svg
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                  >
                    <rect
                      x="3"
                      y="5"
                      width="18"
                      height="14"
                      rx="2"
                    />

                    <path d="M3 7l9 6 9-6" />
                  </svg>

                  <input
                    id="login-email"
                    name="email"
                    type="email"
                    placeholder="you@example.com"
                    value={form.email}
                    onChange={updateForm}
                    autoComplete="email"
                  />

                </div>

              </div>


              {/* PASSWORD */}

              <div className="login-group">

                <div className="login-label-line">

                  <label htmlFor="login-password">
                    Password
                  </label>

                  <button
                    type="button"
                    onClick={() =>
                      alert(
                        "Password reset will be connected with backend."
                      )
                    }
                  >
                    Forgot password?
                  </button>

                </div>

                <div className="login-input">

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

                  <input
                    id="login-password"
                    name="password"
                    type={
                      passwordVisible
                        ? "text"
                        : "password"
                    }
                    placeholder="Enter your password"
                    value={form.password}
                    onChange={updateForm}
                    autoComplete="current-password"
                  />

                  <button
                    type="button"
                    className="login-password-button"
                    onClick={() =>
                      setPasswordVisible(
                        (old) => !old
                      )
                    }
                  >
                    {passwordVisible
                      ? "Hide"
                      : "Show"}
                  </button>

                </div>

              </div>


              {/* REMEMBER */}

              <label className="login-remember">

                <input
                  type="checkbox"
                  name="remember"
                  checked={form.remember}
                  onChange={updateForm}
                />

                <span>
                  Remember me
                </span>

              </label>


              {/* LOGIN BUTTON */}

              <button
                type="submit"
                className="login-button"
              >

                <span>
                  Sign In
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


            {/* DIVIDER */}

            <div className="login-divider">
              <span>OR</span>
            </div>


            {/* GOOGLE */}

            <button
              type="button"
              className="login-google"
              onClick={() =>
                alert(
                  "Google authentication will be connected next."
                )
              }
            >

              <span className="login-google-icon">
                G
              </span>

              Continue with Google

            </button>


            {/* SIGNUP */}

            <div className="login-signup">

              <span>
                New to Collegiya?
              </span>

              <Link to="/signup">
                Create an account
              </Link>

            </div>


            {/* SECURITY */}

            <div className="login-secure">

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
                Secure login • Collegiya
              </span>

            </div>

          </div>

        </section>

      </div>

    </main>
  );
}
