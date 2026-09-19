import React from "react";
import { Link } from "react-router-dom";
import "./footer.css";

function Footer() {
  return (
    <footer className="col-footer">

      <div className="col-footer-container">

        {/* BRAND */}
        <div className="col-footer-brand">

          <Link
            to="/"
            className="col-footer-logo-link"
            aria-label="Collegiya Home"
          >
            <img
              src="/logo.jpg"
              alt="Collegiya"
              className="col-footer-logo"
            />
          </Link>

          <p>
            Learn better, build practical skills and grow
            smarter with Collegiya.
          </p>

          <div className="col-footer-tagline">
            Learn Better. Grow Smarter.
          </div>

        </div>

        {/* PLATFORM */}
        <div className="col-footer-column">

          <h3>Platform</h3>

          <Link to="/courses">Courses</Link>
          <Link to="/learning">Learning</Link>
          <Link to="/quiz">Quiz</Link>
          <Link to="/certificate">Certificates</Link>

        </div>

        {/* PORTALS */}
        <div className="col-footer-column">

          <h3>Portals</h3>

          <Link to="/student/dashboard">
            Student Portal
          </Link>

          

          <Link to="/college/dashboard">
            College Portal
          </Link>

          <Link to="/admin/dashboard">
            Admin Portal
          </Link>

        </div>

        {/* ACCOUNT */}
        <div className="col-footer-column">

          <h3>Account</h3>

          <Link to="/login">
            Login
          </Link>

          <Link to="/signup">
            Create Account
          </Link>

          <Link to="/privacy">
            Privacy Policy
          </Link>

          <Link to="/terms">
            Terms & Conditions
          </Link>

        </div>

      </div>

      {/* BOTTOM */}
      <div className="col-footer-bottom">

        <div className="col-footer-bottom-inner">

          <span>
            © {new Date().getFullYear()} Collegiya. All rights reserved.
          </span>

          <div className="col-footer-mini-brand">
            <img
              src="/logo.jpg"
              alt="Collegiya"
            />

            <span>
              Learn Better. Grow Smarter.
            </span>
          </div>

        </div>

      </div>

    </footer>
  );
}

export default Footer;
