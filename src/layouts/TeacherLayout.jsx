import React, { useState } from "react";
import { NavLink, Outlet } from "react-router-dom";
import "./teacherlayout.css";

export default function TeacherLayout() {
  const [menuOpen, setMenuOpen] = useState(false);

  const menuItems = [
    { path: "dashboard", icon: "▦", label: "Dashboard" },
    { path: "courses", icon: "▤", label: "My Courses" },
    { path: "lectures", icon: "▶", label: "Lectures" },
    { path: "students", icon: "♙", label: "Students" },
    { path: "quiz", icon: "✓", label: "Quiz & Tests" },
    { path: "assignments", icon: "☷", label: "Assignments" },
    { path: "announcements", icon: "◈", label: "Announcements" },
    { path: "earnings", icon: "₹", label: "Earnings" },
  ];

  return (
    <div className="teacher-portal">
      {menuOpen && (
        <div
          className="teacher-overlay"
          onClick={() => setMenuOpen(false)}
        />
      )}

      <aside className={`teacher-sidebar ${menuOpen ? "open" : ""}`}>
        <div className="teacher-brand">
          <div className="teacher-brand-mark">C</div>
          <div>
            <strong>COLLEGIYA</strong>
            <span>Teacher Portal</span>
          </div>
        </div>

        <nav className="teacher-nav">
          <p className="teacher-nav-title">TEACHING</p>

          {menuItems.map((item) => (
            <NavLink
              key={item.path}
              to={`/teacher/${item.path}`}
              onClick={() => setMenuOpen(false)}
              className={({ isActive }) =>
                `teacher-nav-link ${isActive ? "active" : ""}`
              }
            >
              <span className="teacher-nav-icon">{item.icon}</span>
              <span>{item.label}</span>
            </NavLink>
          ))}

          <p className="teacher-nav-title teacher-nav-bottom-title">
            ACCOUNT
          </p>

          <NavLink
            to="/teacher/profile"
            onClick={() => setMenuOpen(false)}
            className={({ isActive }) =>
              `teacher-nav-link ${isActive ? "active" : ""}`
            }
          >
            <span className="teacher-nav-icon">◉</span>
            <span>Profile</span>
          </NavLink>

          <NavLink
            to="/teacher/settings"
            onClick={() => setMenuOpen(false)}
            className={({ isActive }) =>
              `teacher-nav-link ${isActive ? "active" : ""}`
            }
          >
            <span className="teacher-nav-icon">⚙</span>
            <span>Settings</span>
          </NavLink>
        </nav>

        <div className="teacher-sidebar-user">
          <div className="teacher-avatar">T</div>
          <div>
            <strong>Teacher</strong>
            <span>Teacher Account</span>
          </div>
        </div>
      </aside>

      <div className="teacher-main">
        <header className="teacher-header">
          <button
            className="teacher-menu-btn"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Open menu"
          >
            ☰
          </button>

          <div className="teacher-header-title">
            <span>Teacher Portal</span>
            <strong>Teaching Dashboard</strong>
          </div>

          <div className="teacher-header-actions">
            <button className="teacher-icon-btn" title="Notifications">
              ♢
            </button>

            <NavLink to="/teacher/profile" className="teacher-header-profile">
              <div className="teacher-avatar small">T</div>
              <div className="teacher-profile-text">
                <strong>Teacher</strong>
                <span>Instructor</span>
              </div>
            </NavLink>
          </div>
        </header>

        <main className="teacher-content">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
