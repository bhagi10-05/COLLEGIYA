import React, { useState } from "react";
import {
  Link,
  useLocation,
  useNavigate,
} from "react-router-dom";
import "./login.css";

const API_BASE =
  import.meta.env.VITE_API_URL ||
  import.meta.env.VITE_API_URL || "https://collegiya-backend.onrender.com/api";

export default function Login() {
  const navigate = useNavigate();
  const location = useLocation();

  const [passwordVisible, setPasswordVisible] =
    useState(false);

  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState({
    email: "",
    password: "",
    remember: false,
  });

  const updateForm = (e) => {
    const { name, value, type, checked } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const submitLogin = async (e) => {
    e.preventDefault();

    if (loading) return;

    const email = form.email.trim().toLowerCase();
    const password = form.password;

    if (!email) {
      alert("Please enter your email.");
      return;
    }

    if (!password.trim()) {
      alert("Please enter your password.");
      return;
    }

    try {
      setLoading(true);

      const response = await fetch(
        `${API_BASE}/auth/student/login`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email,
            password,
          }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        alert(
          data.message ||
            "Invalid email or password."
        );
        return;
      }

      if (!data.token || !data.student) {
        alert(
          "Login response is invalid. Please try again."
        );
        return;
      }

      localStorage.setItem(
        "collegiya_student_token",
        data.token
      );

      localStorage.setItem(
        "collegiya_student_user",
        JSON.stringify({
          id: data.student.id,
          fullName: data.student.name,
          email: data.student.email,
          role: data.student.role,
        })
      );

      const destination =
        location.state?.from ||
        "/student/dashboard";

      navigate(destination, {
        replace: true,
      });
    } catch (error) {
      console.error("Login Error:", error);

      alert(
        "Unable to connect to COLLEGIYA server. Please make sure the backend is running."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="login-page">

      <div className="login-card">

        {/* LEFT VISUAL PANEL */}

        <section className="login-visual">

          <Link to="/" className="login-logo">
            <img
              src="/logo.jpg"
              alt="COLLEGIYA"
            />
          </Link>

          <div className="login-visual-content">

            <div className="login-eyebrow">
              WELCOME BACK
            </div>

            <h1>
              Keep learning.
              <br />
              <span>Keep growing.</span>
            </h1>

            <p>
              Your courses, learning progress,
              quizzes and achievements are all
              waiting for you.
            </p>

            <div className="login-highlights">

              <div>
                <strong>01</strong>
                <span>Continue your courses</span>
              </div>

              <div>
                <strong>02</strong>
                <span>Practice with quizzes</span>
              </div>

              <div>
                <strong>03</strong>
                <span>Track your progress</span>
              </div>

            </div>

          </div>

          <div className="login-visual-footer">
            <span>
              © {new Date().getFullYear()} COLLEGIYA
            </span>

            <span>
              Education for everyone
            </span>
          </div>

        </section>

        {/* LOGIN PANEL */}

        <section className="login-form-section">

          <div className="login-mobile-logo">
            <Link to="/">
              <img
                src="/logo.jpg"
                alt="COLLEGIYA"
              />
            </Link>
          </div>

          <div className="login-form-container">

            <div className="login-title">

              <span className="login-title-label">
                SIGN IN
              </span>

              <h2>
                Welcome back.
              </h2>

              <p>
                Login to continue your learning journey.
              </p>

            </div>

            <form
              className="login-form"
              onSubmit={submitLogin}
            >

              <div className="login-group">

                <label htmlFor="email">
                  Email Address
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
                    <path d="m3 7 9 6 9-6" />
                  </svg>

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

              <div className="login-group">

                <div className="login-label-line">

                  <label htmlFor="password">
                    Password
                  </label>

                  <button
                    type="button"
                    onClick={() =>
                      setPasswordVisible(
                        (value) => !value
                      )
                    }
                  >
                    {passwordVisible
                      ? "Hide password"
                      : "Show password"}
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
                    <path d="M8 10V7a4 4 0 0 1 8 0v3" />
                  </svg>

                  <input
                    id="password"
                    name="password"
                    type={
                      passwordVisible
                        ? "text"
                        : "password"
                    }
                    value={form.password}
                    onChange={updateForm}
                    placeholder="Enter your password"
                    autoComplete="current-password"
                  />

                  <button
                    type="button"
                    className="login-password-button"
                    onClick={() =>
                      setPasswordVisible(
                        (value) => !value
                      )
                    }
                  >
                    {passwordVisible
                      ? "Hide"
                      : "Show"}
                  </button>

                </div>

              </div>

              <div className="login-options">

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

                <button
                  type="button"
                  className="login-forgot"
                  onClick={() =>
                    alert(
                      "Password reset will be available soon."
                    )
                  }
                >
                  Forgot password?
                </button>

              </div>

              <button
                type="submit"
                className="login-button"
                disabled={loading}
              >
                <span>
                  {loading
                    ? "Signing in..."
                    : "Sign In"}
                </span>

                <svg
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <path d="M5 12h13" />
                  <path d="m13 6 6 6-6 6" />
                </svg>

              </button>

            </form>

            <div className="login-divider">
              <span>OR</span>
            </div>

            <button
              type="button"
              className="login-google"
              onClick={() =>
                alert(
                  "Google login will be available soon."
                )
              }
            >
              <span className="login-google-icon">
                G
              </span>

              Continue with Google
            </button>

            <div className="login-signup">

              <span>
                Don't have an account?
              </span>

              <Link to="/signup">
                Create account
              </Link>

            </div>

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
                <path d="M8 10V7a4 4 0 0 1 8 0v3" />
              </svg>

              Secure login • Your data is protected

            </div>

          </div>

        </section>

      </div>

    </main>
  );
}
