import React from "react";
import "../styles/teacher-dashboard.css";

export default function TeacherDashboard() {
  return (
    <section className="teacher-dashboard">
      <div className="teacher-page-heading">
        <div>
          <span className="teacher-label">TEACHER PORTAL</span>
          <h1>Teacher Dashboard</h1>
          <p>
            Manage your courses, students, tests and teaching activities
            from one place.
          </p>
        </div>

        <button className="create-course-btn">
          + Create Course
        </button>
      </div>

      <div className="teacher-stats">
        <div className="teacher-stat-card">
          <span>Total Courses</span>
          <strong>0</strong>
          <small>Published courses</small>
        </div>

        <div className="teacher-stat-card">
          <span>Total Students</span>
          <strong>0</strong>
          <small>Enrolled students</small>
        </div>

        <div className="teacher-stat-card">
          <span>Total Tests</span>
          <strong>0</strong>
          <small>Created tests</small>
        </div>

        <div className="teacher-stat-card">
          <span>Total Earnings</span>
          <strong>₹0</strong>
          <small>Current earnings</small>
        </div>
      </div>

      <div className="teacher-dashboard-grid">
        <div className="teacher-panel">
          <h2>Quick Actions</h2>

          <div className="quick-actions">
            <a href="/teacher/create-course">Create Course</a>
            <a href="/teacher/tests">Create Test</a>
            <a href="/teacher/content">Add Content</a>
            <a href="/teacher/students">View Students</a>
          </div>
        </div>

        <div className="teacher-panel">
          <h2>Recent Activity</h2>
          <div className="empty-state">
            <div className="empty-icon">+</div>
            <h3>No activity yet</h3>
            <p>
              Your recent teaching activities will appear here.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
