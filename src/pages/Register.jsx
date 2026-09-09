import { Link, useNavigate } from "react-router-dom";

export default function Register() {
  const navigate = useNavigate();

  function submit(e) {
    e.preventDefault();
    navigate("/dashboard");
  }

  return (
    <section className="auth-page">
      <form className="auth-card" onSubmit={submit}>
        <div className="auth-logo">C</div>
        <h1>Create Account</h1>
        <p>Start your COLLEGIYA learning journey.</p>

        <input placeholder="Full name" required />
        <input type="email" placeholder="Email address" required />
        <input type="password" placeholder="Create password" required />

        <button className="primary-btn full">Create Account</button>

        <div className="or">OR</div>

        <button type="button" className="google-btn">
          🌐 Continue with Google
        </button>

        <p className="switch">
          Already have an account?
          <Link to="/login"> Login</Link>
        </p>
      </form>
    </section>
  );
}
