import React, { useState } from "react";
import {
  Link,
  useLocation,
  useNavigate,
} from "react-router-dom";
import "./login.css";

const API_BASE =
  import.meta.env.VITE_API_URL ||
  "https://collegiya-backend.onrender.com/api";

export default function Login() {
  const navigate = useNavigate();
  const location = useLocation();

  const [passwordVisible, setPasswordVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));

    if (error) {
      setError("");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (loading) return;

    const email = form.email.trim().toLowerCase();
    const password = form.password;

    if (!email || !password) {
      setError("Please enter your email and password.");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const response = await fetch(
        `${API_BASE}/auth/student/login`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
          body: JSON.stringify({
            email,
            password,
          }),
        }
      );

      let data = {};

      try {
        data = await response.json();
      } catch {
        data = {};
      }

      if (!response.ok) {
        setError(
          data?.message ||
            `Login failed. Server returned ${response.status}.`
        );
        return;
      }

      if (!data?.success || !data?.token) {
        setError(
          data?.message ||
            "Login failed. Please try again."
        );
        return;
      }

      // Save authentication data
      localStorage.setItem("token", data.token);

      if (data.student) {
        localStorage.setItem(
          "student",
          JSON.stringify(data.student)
        );

        localStorage.setItem(
          "user",
          JSON.stringify(data.student)
        );
      }

      localStorage.setItem("isLoggedIn", "true");

      // Redirect to the page user originally wanted,
      // otherwise open the student dashboard.
      const redirectPath =
        location.state?.from?.pathname ||
        "/student/dashboard";

      navigate(redirectPath, {
        replace: true,
      });
    } catch (err) {
      console.error("Student Login Error:", err);

      setError(
        "Unable to connect to COLLEGIYA server. Please check your internet connection and try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-page">
      <div className="login-container">
        <div className="login-card">
          <div className="login-header">
            <div className="login-logo">
              <img
                src="/logo.jpg"
                alt="COLLEGIYA"
              />
            </div>

            <h1>Welcome Back</h1>

            <p>
              Login to continue your COLLEGIYA learning journey.
            </p>
          </div>

          {error && (
            <div
              className="login-error"
              role="alert"
            >
              {error}
            </div>
          )}

          <form
            className="login-form"
            onSubmit={handleSubmit}
          >
            <div className="form-group">
              <label htmlFor="email">
                Email Address
              </label>

              <input
                id="email"
                name="email"
                type="email"
                placeholder="Enter your email"
                value={form.email}
                onChange={handleChange}
                autoComplete="email"
                required
                disabled={loading}
              />
            </div>

            <div className="form-group">
              <div className="password-label-row">
                <label htmlFor="password">
                  Password
                </label>

                <Link
                  to="/forgot-password"
                  className="forgot-password"
                >
                  Forgot Password?
                </Link>
              </div>

              <div className="password-input-wrapper">
                <input
                  id="password"
                  name="password"
                  type={
                    passwordVisible
                      ? "text"
                      : "password"
                  }
                  placeholder="Enter your password"
                  value={form.password}
                  onChange={handleChange}
                  autoComplete="current-password"
                  required
                  disabled={loading}
                />

                <button
                  type="button"
                  className="password-toggle"
                  onClick={() =>
                    setPasswordVisible(
                      (prev) => !prev
                    )
                  }
                  aria-label={
                    passwordVisible
                      ? "Hide password"
                      : "Show password"
                  }
                  disabled={loading}
                >
                  {passwordVisible ? "Hide" : "Show"}
                </button>
              </div>
            </div>

            <button
              type="submit"
              className="login-submit-btn"
              disabled={loading}
            >
              {loading ? (
                <>
                  <span className="login-spinner"></span>
                  Logging in...
                </>
              ) : (
                "Login"
              )}
            </button>
          </form>

          <div className="login-divider">
            <span>OR</span>
          </div>

          <div className="signup-link">
            <span>Don't have an account?</span>

            <Link to="/signup">
              Create Account
            </Link>
          </div>

          <div className="login-footer">
            <Link to="/">
              ← Back to COLLEGIYA
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
