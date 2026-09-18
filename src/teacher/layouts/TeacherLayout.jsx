import React from "react";
import { Outlet } from "react-router-dom";
import "../styles/teacher-layout.css";

export default function TeacherLayout() {
  return (
    <div className="teacher-app">
      <header className="teacher-topbar">
        <div className="teacher-brand">
          <img src="/logo.jpg" alt="COLLEGIYA" />
          <div>
            <h2>COLLEGIYA</h2>
            <span>Teacher Portal</span>
          </div>
        </div>

        <div className="teacher-user">
          <div className="teacher-avatar">T</div>
          <div className="teacher-user-info">
            <strong>Teacher</strong>
            <span>Instructor</span>
          </div>
        </div>
      </header>

      <div className="teacher-body">
        <aside className="teacher-sidebar">
          <nav>
            <a href="/teacher/dashboard">Dashboard</a>
            <a href="/teacher/courses">My Courses</a>
            <a href="/teacher/students">Students</a>
            <a href="/teacher/tests">Tests</a>
            <a href="/teacher/content">Content</a>
            <a href="/teacher/analytics">Analytics</a>
            <a href="/teacher/earnings">Earnings</a>
          </nav>
        </aside>

        <main className="teacher-main">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
