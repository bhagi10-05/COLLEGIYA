import React, { useState } from "react";
import { NavLink, Outlet } from "react-router-dom";
import "./teacherlayout.css";

export default function TeacherLayout() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [accountOpen, setAccountOpen] = useState(false);

  const menuItems = [
    { path: "dashboard", icon: "▦", label: "Dashboard" },
    { path: "courses", icon: "▤", label: "Courses" },
    { path: "lectures", icon: "▶", label: "Lectures" },
    { path: "students", icon: "♙", label: "Students" },
    { path: "quiz", icon: "✓", label: "Quiz" },
    { path: "assignments", icon: "☷", label: "Tasks" },
    { path: "announcements", icon: "◈", label: "News" },
    { path: "earnings", icon: "₹", label: "Earnings" },
  ];

  return (
    <div className="teacher-portal">

      {/* MOBILE OVERLAY */}
      {menuOpen && (
        <div
          className="teacher-overlay"
          onClick={() => setMenuOpen(false)}
        />
      )}

      {/* SIDEBAR */}
      <aside className={`teacher-sidebar ${menuOpen ? "open" : ""}`}>

        {/* BRAND */}
        <div className="teacher-brand">
          <div className="teacher-brand-mark">
            C
          </div>

          <div>
            <strong>COLLEGIYA</strong>
            <span>Teacher Portal</span>
          </div>
        </div>

        {/* NAVIGATION */}
        <nav className="teacher-nav">

          <p className="teacher-nav-title">
            TEACHING
          </p>

          {menuItems.map((item) => (
            <NavLink
              key={item.path}
              to={`/teacher/${item.path}`}
              onClick={() => setMenuOpen(false)}
              className={({ isActive }) =>
                `teacher-nav-link ${isActive ? "active" : ""}`
              }
            >
              <span className="teacher-nav-icon">
                {item.icon}
              </span>

              <span>
                {item.label}
              </span>
            </NavLink>
          ))}

          <p className="teacher-nav-title teacher-nav-bottom-title">
            ACCOUNT
          </p>

          {/* PROFILE */}
          <NavLink
            to="/teacher/profile"
            onClick={() => setMenuOpen(false)}
            className={({ isActive }) =>
              `teacher-nav-link ${isActive ? "active" : ""}`
            }
          >
            <span className="teacher-nav-icon">
              ◉
            </span>

            <span>
              Profile
            </span>
          </NavLink>

          {/* SETTINGS */}
          <NavLink
            to="/teacher/settings"
            onClick={() => setMenuOpen(false)}
            className={({ isActive }) =>
              `teacher-nav-link ${isActive ? "active" : ""}`
            }
          >
            <span className="teacher-nav-icon">
              ⚙
            </span>

            <span>
              Settings
            </span>
          </NavLink>

        </nav>

        {/* SIDEBAR USER */}
        <div className="teacher-sidebar-user">

          <div className="teacher-avatar">
            T
          </div>

          <div>
            <strong>
              Teacher
            </strong>

            <span>
              Teacher Account
            </span>
          </div>

        </div>

      </aside>

      {/* MAIN */}
      <div className="teacher-main">

        {/* HEADER */}
        <header className="teacher-header">

          {/* MOBILE MENU */}
          <button
            className="teacher-menu-btn"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Open menu"
          >
            ☰
          </button>

          {/* TITLE */}
          <div className="teacher-header-title">

            <span>
              Teacher Portal
            </span>

            <strong>
              Teaching Dashboard
            </strong>

          </div>

          {/* RIGHT SIDE */}
          <div className="teacher-header-actions">

            {/* NOTIFICATION */}
            <button
              className="teacher-icon-btn"
              title="Notifications"
            >
              ♢
            </button>

            {/* PROFILE + SETTINGS */}
            <div className="teacher-account-menu">

              <button
                className="teacher-header-profile"
                onClick={() => setAccountOpen(!accountOpen)}
              >

                <div className="teacher-avatar small">
                  T
                </div>

                <div className="teacher-profile-text">

                  <strong>
                    Teacher
                  </strong>

                  <span>
                    Instructor
                  </span>

                </div>

                <span className="teacher-account-arrow">
                  ▾
                </span>

              </button>

              {/* ACCOUNT DROPDOWN */}
              {accountOpen && (
                <div className="teacher-account-dropdown">

                  <NavLink
                    to="/teacher/profile"
                    onClick={() => setAccountOpen(false)}
                  >
                    <span>◉</span>
                    Profile
                  </NavLink>

                  <NavLink
                    to="/teacher/settings"
                    onClick={() => setAccountOpen(false)}
                  >
                    <span>⚙</span>
                    Settings
                  </NavLink>

                </div>
              )}

            </div>

          </div>

        </header>

        {/* PAGE CONTENT */}
        <main className="teacher-content">
          <Outlet />
        </main>

      </div>

      {/* MOBILE BOTTOM MENU */}
      <nav className="teacher-bottom-nav">

        {/* DASHBOARD */}
        <NavLink
          to="/teacher/dashboard"
          className={({ isActive }) =>
            `teacher-bottom-link ${isActive ? "active" : ""}`
          }
        >
          <span className="teacher-bottom-icon">
            ▦
          </span>

          <span className="teacher-bottom-label">
            Dashboard
          </span>
        </NavLink>

        {/* COURSES */}
        <NavLink
          to="/teacher/courses"
          className={({ isActive }) =>
            `teacher-bottom-link ${isActive ? "active" : ""}`
          }
        >
          <span className="teacher-bottom-icon">
            ▤
          </span>

          <span className="teacher-bottom-label">
            Courses
          </span>
        </NavLink>

        {/* LECTURES */}
        <NavLink
          to="/teacher/lectures"
          className={({ isActive }) =>
            `teacher-bottom-link ${isActive ? "active" : ""}`
          }
        >
          <span className="teacher-bottom-icon">
            ▶
          </span>

          <span className="teacher-bottom-label">
            Lectures
          </span>
        </NavLink>

        {/* STUDENTS */}
        <NavLink
          to="/teacher/students"
          className={({ isActive }) =>
            `teacher-bottom-link ${isActive ? "active" : ""}`
          }
        >
          <span className="teacher-bottom-icon">
            ♙
          </span>

          <span className="teacher-bottom-label">
            Students
          </span>
        </NavLink>

        {/* QUIZ */}
        <NavLink
          to="/teacher/quiz"
          className={({ isActive }) =>
            `teacher-bottom-link ${isActive ? "active" : ""}`
          }
        >
          <span className="teacher-bottom-icon">
            ✓
          </span>

          <span className="teacher-bottom-label">
            Quiz
          </span>
        </NavLink>

      </nav>

    </div>
  );
}
