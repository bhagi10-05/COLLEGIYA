import React, { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import "./login.css";

export default function Login() {
  const navigate = useNavigate();
  const location = useLocation();

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

    /*
      Check whether the student has created
      an account through Signup.
    */

    const registeredUser = localStorage.getItem(
      "collegiya_registered_user"
    );

    if (!registeredUser) {
      alert(
        "Account not found. Please create an account first."
      );
      navigate("/signup");
      return;
    }

    let user;

    try {
      user = JSON.parse(registeredUser);
    } catch (error) {
      console.error(error);

      localStorage.removeItem(
        "collegiya_registered_user"
      );

      alert(
        "Your account data is invalid. Please sign up again."
      );

      navigate("/signup");
      return;
    }

    if (
      !user.email ||
      !user.password ||
      user.email.toLowerCase() !== email ||
      user.password !== password
    ) {
      alert(
        "Invalid email or password. Please check your details."
      );
      return;
    }

    /*
      Login successful.
    */

    const loginToken =
      `student_${Date.now()}_` +
      Math.random().toString(36).slice(2);

    localStorage.setItem(
      "collegiya_student_token",
      loginToken
    );

    localStorage.setItem(
      "collegiya_student_user",
      JSON.stringify({
        fullName: user.fullName || "",
        email: user.email || "",
        role: user.role || "Student",
      })
    );

    const destination =
      location.state?.from || "/student/dashboard";

    navigate(destination, { replace: true });
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


            <div className="login-divider">
              <span>OR</span>
            </div>


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
