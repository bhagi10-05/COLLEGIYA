import React, { useEffect, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import "./navbar.css";

function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [search, setSearch] = useState("");

  const closeMenu = () => setMenuOpen(false);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";

    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  const handleSearch = (e) => {
    e.preventDefault();

    const value = search.trim();

    if (!value) return;

    window.location.href = `/courses?search=${encodeURIComponent(value)}`;
    setSearch("");
    setSearchOpen(false);
    closeMenu();
  };

  return (
    <>
      <header className="col-navbar">
        <div className="col-navbar-inner">

          {/* LEFT */}
          <div className="col-navbar-left">

            <button
              type="button"
              className={`col-menu-btn ${
                menuOpen ? "col-menu-active" : ""
              }`}
              onClick={() => setMenuOpen(true)}
              aria-label="Open menu"
              aria-expanded={menuOpen}
            >
              <span></span>
              <span></span>
              <span></span>
            </button>

            <Link
              to="/"
              className="col-logo-link"
              onClick={closeMenu}
              aria-label="Collegiya Home"
            >
              <img
                src="/logo.jpg"
                alt="Collegiya"
                className="col-logo"
              />
            </Link>

          </div>

          {/* DESKTOP NAV */}
          <nav className="col-desktop-nav">

            <NavLink
              to="/"
              className={({ isActive }) =>
                `col-nav-link ${isActive ? "active" : ""}`
              }
            >
              Home
            </NavLink>

            <NavLink
              to="/courses"
              className={({ isActive }) =>
                `col-nav-link ${isActive ? "active" : ""}`
              }
            >
              Courses
            </NavLink>

            <NavLink
              to="/learning"
              className={({ isActive }) =>
                `col-nav-link ${isActive ? "active" : ""}`
              }
            >
              Learning
            </NavLink>

            <NavLink
              to="/quiz"
              className={({ isActive }) =>
                `col-nav-link ${isActive ? "active" : ""}`
              }
            >
              Quiz
            </NavLink>

            <NavLink
              to="/certificate"
              className={({ isActive }) =>
                `col-nav-link ${isActive ? "active" : ""}`
              }
            >
              Certificate
            </NavLink>

          </nav>

          {/* RIGHT */}
          <div className="col-navbar-right">

            <form
              className={`col-search ${
                searchOpen ? "col-search-open" : ""
              }`}
              onSubmit={handleSearch}
            >
              <button
                type="button"
                className="col-search-btn"
                onClick={() => setSearchOpen((value) => !value)}
                aria-label="Search"
              >
                <svg
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <circle
                    cx="11"
                    cy="11"
                    r="6.5"
                  />
                  <path d="M16 16L21 21" />
                </svg>
              </button>

              <input
                type="search"
                placeholder="Search courses..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                aria-label="Search courses"
              />
            </form>

            <Link
              to="/login"
              className="col-auth-btn"
            >
              Login / Signup
            </Link>

          </div>
        </div>
      </header>

      {/* OVERLAY */}
      {menuOpen && (
        <div
          className="col-menu-overlay"
          onClick={closeMenu}
        ></div>
      )}

      {/* SLIDE MENU */}
      <aside
        className={`col-slide-menu ${
          menuOpen ? "col-slide-menu-open" : ""
        }`}
        aria-hidden={!menuOpen}
      >

        <div className="col-slide-header">

          <Link
            to="/"
            className="col-slide-logo"
            onClick={closeMenu}
          >
            <img
              src="/logo.jpg"
              alt="Collegiya"
            />
          </Link>

          <button
            type="button"
            className="col-close-btn"
            onClick={closeMenu}
            aria-label="Close menu"
          >
            ×
          </button>

        </div>

        <div className="col-slide-content">

          <div className="col-menu-section">
            <span className="col-menu-label">
              EXPLORE
            </span>

            <Link
              to="/"
              onClick={closeMenu}
              className="col-slide-link"
            >
              <span>⌂</span>
              Home
            </Link>

            <Link
              to="/courses"
              onClick={closeMenu}
              className="col-slide-link"
            >
              <span>▣</span>
              Courses
            </Link>

            <Link
              to="/learning"
              onClick={closeMenu}
              className="col-slide-link"
            >
              <span>◈</span>
              Learning
            </Link>

            <Link
              to="/quiz"
              onClick={closeMenu}
              className="col-slide-link"
            >
              <span>✓</span>
              Quiz
            </Link>

            <Link
              to="/certificate"
              onClick={closeMenu}
              className="col-slide-link"
            >
              <span>◇</span>
              Certificate
            </Link>
          </div>

          <div className="col-menu-section">
            <span className="col-menu-label">
              PORTALS
            </span>

            <Link
              to="/student/dashboard"
              onClick={closeMenu}
              className="col-slide-link"
            >
              <span>🎓</span>
              Student Portal
            </Link>

            <Link
              to="/teacher/dashboard"
              onClick={closeMenu}
              className="col-slide-link"
            >
              <span>👨‍🏫</span>
              Teacher Portal
            </Link>

            <Link
              to="/college/dashboard"
              onClick={closeMenu}
              className="col-slide-link"
            >
              <span>🏫</span>
              College Portal
            </Link>

            <Link
              to="/admin/dashboard"
              onClick={closeMenu}
              className="col-slide-link"
            >
              <span>⚙</span>
              Admin Portal
            </Link>
          </div>

          <div className="col-menu-section">
            <span className="col-menu-label">
              ACCOUNT
            </span>

            <Link
              to="/login"
              onClick={closeMenu}
              className="col-slide-link"
            >
              <span>→</span>
              Login
            </Link>

            <Link
              to="/signup"
              onClick={closeMenu}
              className="col-slide-link"
            >
              <span>+</span>
              Create Account
            </Link>
          </div>

        </div>

        <div className="col-slide-footer">
          <img
            src="/logo.jpg"
            alt="Collegiya"
          />

          <div>
            <strong>Collegiya</strong>
            <span>Learn Better. Grow Smarter.</span>
          </div>
        </div>

      </aside>
    </>
  );
}

export default Navbar;
