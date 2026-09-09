import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <header className="navbar">
      <Link to="/" className="brand">
        <span>C</span>
        <b>COLLEGIYA</b>
      </Link>

      <nav>
        <Link to="/">Home</Link>
        <Link to="/courses">Courses</Link>
        <Link to="/dashboard">Dashboard</Link>
        <Link to="/exams">Exams</Link>
        <Link to="/certificates">Certificates</Link>
      </nav>

      <div className="nav-buttons">
        <Link to="/login" className="login-btn">Login</Link>
        <Link to="/register" className="primary-btn">Get Started</Link>
      </div>
    </header>
  );
}
