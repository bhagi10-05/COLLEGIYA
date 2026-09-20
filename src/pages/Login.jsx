import React, { useState } from "react";
import {
  Link,
  useLocation,
  useNavigate,
} from "react-router-dom";
import "./login.css";

const API_BASE =
  import.meta.env.VITE_API_URL ||
  "http://localhost:5000/api";

export default function Login() {
  const navigate = useNavigate();
  const location = useLocation();

  const [passwordVisible, setPasswordVisible] =
    useState(false);

  const [loading, setLoading] =
    useState(false);

  const [form, setForm] = useState({
    email: "",
    password: "",
    remember: false,
  });

  const updateForm = (e) => {
    const {
      name,
      value,
      type,
      checked,
    } = e.target;

    setForm((old) => ({
      ...old,
      [name]:
        type === "checkbox"
          ? checked
          : value,
    }));
  };

  const submitLogin = async (e) => {
    e.preventDefault();

    if (loading) return;

    const email =
      form.email.trim().toLowerCase();

    const password =
      form.password;

    if (!email) {
      alert(
        "Please enter your email."
      );
      return;
    }

    if (!password.trim()) {
      alert(
        "Please enter your password."
      );
      return;
    }

    try {
      setLoading(true);

      const response = await fetch(
        `${API_BASE}/auth/student/login`,
        {
          method: "POST",
          headers: {
            "Content-Type":
              "application/json",
          },
          body: JSON.stringify({
            email,
            password,
          }),
        }
      );

      const data =
        await response.json();

      if (!response.ok) {
        if (
          response.status === 404 ||
          response.status === 401
        ) {
          alert(
            data.message ||
              "Invalid email or password."
          );
        } else {
          alert(
            data.message ||
              "Login failed. Please try again."
          );
        }

        return;
      }

      if (
        !data.token ||
        !data.student
      ) {
        alert(
          "Login response is invalid. Please try again."
        );
        return;
      }

      // Store real JWT
      localStorage.setItem(
        "collegiya_student_token",
        data.token
      );

      // Store only safe student information
      localStorage.setItem(
        "collegiya_student_user",
        JSON.stringify({
          id:
            data.student.id,
          fullName:
            data.student.name,
          email:
            data.student.email,
          role:
            data.student.role,
        })
      );

      const destination =
        location.state?.from ||
        "/student/dashboard";

      navigate(destination, {
        replace: true,
      });
    } catch (error) {
      console.error(
        "Login Error:",
        error
      );

      if (
        error instanceof TypeError
      ) {
        alert(
          "Unable to connect to COLLEGIYA server. Please make sure the backend is running."
        );
      } else {
        alert(
          "Login failed. Please try again."
        );
      }
    } finally {
      setLoading(false);
    }
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
            <span>
              Learn Better.
            </span>

            <span>
              Grow Smarter.
            </span>
          </div>

        </section>

        {/* LOGIN AREA */}

        <section className="login-form-panel">

          <div className="login-form-container">

            <div className="login-mobile-logo">

              <Link to="/">
                <img
                  src="/logo.jpg"
                  alt="Collegiya"
                />
              </Link>

            </div>

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

            <form
              className="login-form"
              onSubmit={submitLogin}
            >

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
                    disabled={loading}
                  />

                </div>

              </div>

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
                    disabled={loading}
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
                    disabled={loading}
                  />

                  <button
                    type="button"
                    className="login-password-button"
                    onClick={() =>
                      setPasswordVisible(
                        (old) => !old
                      )
                    }
                    disabled={loading}
                  >
                    {passwordVisible
                      ? "Hide"
                      : "Show"}
                  </button>

                </div>

              </div>

              <label className="login-remember">

                <input
                  type="checkbox"
                  name="remember"
                  checked={form.remember}
                  onChange={updateForm}
                  disabled={loading}
                />

                <span>
                  Remember me
                </span>

              </label>

              <button
                type="submit"
                className="login-button"
                disabled={loading}
              >

                <span>
                  {loading
                    ? "Signing In..."
                    : "Sign In"}
                </span>

                {!loading && (
                  <svg
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                  >
                    <path d="M5 12h14" />
                    <path d="M13 6l6 6-6 6" />
                  </svg>
                )}

              </button>

            </form>

            <div className="login-divider">
              <span>
                OR
              </span>
            </div>

            <button
              type="button"
              className="login-google"
              onClick={() =>
                alert(
                  "Google authentication will be connected next."
                )
              }
              disabled={loading}
            >

              <span className="login-google-icon">
                G
              </span>

              Continue with Google

            </button>

            <div className="login-signup">

              <span>
                New to Collegiya?
              </span>

              <Link to="/signup">
                Create an account
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
