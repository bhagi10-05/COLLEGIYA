import { Link, useNavigate } from "react-router-dom";

export default function Login() {
  const navigate = useNavigate();

  function submit(e) {
    e.preventDefault();
    navigate("/dashboard");
  }

  return (
    <section className="auth-page">
      <form className="auth-card" onSubmit={submit}>
        <div className="auth-logo">C</div>
        <h1>Welcome Back</h1>
        <p>Login to continue your learning journey.</p>

        <input type="email" placeholder="Email address" required />
        <input type="password" placeholder="Password" required />

        <div className="forgot">
          <label><input type="checkbox" /> Remember me</label>
          <a>Forgot password?</a>
        </div>

        <button className="primary-btn full">Login</button>

        <div className="or">OR</div>

        <button type="button" className="google-btn">
          🌐 Continue with Google
        </button>

        <p className="switch">
          Don't have an account?
          <Link to="/register"> Create one</Link>
        </p>
      </form>
    </section>
  );
}
