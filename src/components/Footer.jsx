import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer>
      <div>
        <Link to="/" className="brand footer-brand">
          <span>C</span>
          <b>COLLEGIYA</b>
        </Link>
        <p>Learn today. Build your tomorrow.</p>
      </div>

      <div>
        <h4>Platform</h4>
        <Link to="/courses">Courses</Link>
        <Link to="/dashboard">Dashboard</Link>
        <Link to="/exams">Exams</Link>
      </div>

      <div>
        <h4>Company</h4>
        <a>About</a>
        <a>Contact</a>
        <a>Help Center</a>
      </div>

      <div>
        <h4>Follow</h4>
        <a>YouTube</a>
        <a>Instagram</a>
        <a>LinkedIn</a>
      </div>
    </footer>
  );
}
