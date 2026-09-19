import React from "react";
import { Link } from "react-router-dom";
import "./teacher.css";

export default function TeacherDashboard() {
  const stats = [
    {
      icon: "▤",
      value: "0",
      label: "Total Courses",
      note: "Courses created",
      type: "purple",
    },
    {
      icon: "▶",
      value: "0",
      label: "Total Lectures",
      note: "Learning content",
      type: "blue",
    },
    {
      icon: "♙",
      value: "0",
      label: "Students",
      note: "Total learners",
      type: "green",
    },
    {
      icon: "₹",
      value: "₹0",
      label: "Total Earnings",
      note: "Available earnings",
      type: "orange",
    },
  ];

  const quickActions = [
    {
      icon: "+",
      title: "Create Course",
      text: "Start a new course",
      path: "/teacher/courses",
      type: "purple",
    },
    {
      icon: "▶",
      title: "Add Lecture",
      text: "Upload learning content",
      path: "/teacher/lectures",
      type: "blue",
    },
    {
      icon: "✓",
      title: "Create Quiz",
      text: "Test student knowledge",
      path: "/teacher/quiz",
      type: "green",
    },
    {
      icon: "◈",
      title: "Announcement",
      text: "Send student updates",
      path: "/teacher/announcements",
      type: "orange",
    },
  ];

  return (
    <div className="teacher-dashboard">

      {/* TOP HERO */}
      <section className="teacher-hero">
        <div className="teacher-hero-content">
          <span className="teacher-hero-label">TEACHER DASHBOARD</span>

          <h1>
            Good morning, Teacher
            <span className="hero-wave">👋</span>
          </h1>

          <p>
            Manage your courses, learning content and students from one
            powerful workspace.
          </p>

          <div className="teacher-hero-actions">
            <Link to="/teacher/courses" className="teacher-btn primary">
              <span>＋</span>
              Create Course
            </Link>

            <Link to="/teacher/quiz" className="teacher-btn secondary">
              <span>✓</span>
              Create Test
            </Link>
          </div>
        </div>

        <div className="teacher-hero-art">
          <div className="hero-orbit orbit-one"></div>
          <div className="hero-orbit orbit-two"></div>
          <div className="hero-book">
            <span>📚</span>
          </div>
          <div className="hero-floating-card card-one">
            <span>🎓</span>
            <div>
              <strong>Teaching</strong>
              <small>Made simple</small>
            </div>
          </div>
          <div className="hero-floating-card card-two">
            <span>✓</span>
            <div>
              <strong>Learning</strong>
              <small>Student focused</small>
            </div>
          </div>
        </div>
      </section>

      {/* STATS */}
      <section className="teacher-stats">
        {stats.map((stat) => (
          <div className="teacher-stat-card" key={stat.label}>
            <div className={`teacher-stat-icon ${stat.type}`}>
              {stat.icon}
            </div>

            <div className="teacher-stat-content">
              <span>{stat.label}</span>
              <strong>{stat.value}</strong>
              <small>{stat.note}</small>
            </div>

            <div className="teacher-stat-arrow">↗</div>
          </div>
        ))}
      </section>

      {/* MAIN GRID */}
      <div className="teacher-main-grid">

        {/* QUICK ACTIONS */}
        <section className="teacher-panel">
          <div className="teacher-panel-heading">
            <div>
              <span className="panel-label">WORKSPACE</span>
              <h2>Quick Actions</h2>
              <p>Everything you need to start teaching</p>
            </div>
          </div>

          <div className="teacher-quick-grid">
            {quickActions.map((action) => (
              <Link
                key={action.title}
                to={action.path}
                className="teacher-quick-card"
              >
                <div className={`quick-icon ${action.type}`}>
                  {action.icon}
                </div>

                <div className="quick-card-content">
                  <strong>{action.title}</strong>
                  <span>{action.text}</span>
                </div>

                <span className="quick-arrow">→</span>
              </Link>
            ))}
          </div>
        </section>

        {/* COURSE PERFORMANCE */}
        <section className="teacher-panel performance-panel">
          <div className="teacher-panel-heading">
            <div>
              <span className="panel-label">OVERVIEW</span>
              <h2>Course Performance</h2>
              <p>Your teaching activity at a glance</p>
            </div>
          </div>

          <div className="performance-list">
            <div className="performance-row">
              <div className="performance-info">
                <span className="performance-icon purple">▤</span>
                <div>
                  <strong>Published Courses</strong>
                  <small>Courses available to students</small>
                </div>
              </div>
              <b>0</b>
            </div>

            <div className="performance-row">
              <div className="performance-info">
                <span className="performance-icon blue">▶</span>
                <div>
                  <strong>Lectures</strong>
                  <small>Learning videos and lessons</small>
                </div>
              </div>
              <b>0</b>
            </div>

            <div className="performance-row">
              <div className="performance-info">
                <span className="performance-icon green">♙</span>
                <div>
                  <strong>Enrolled Students</strong>
                  <small>Students learning from you</small>
                </div>
              </div>
              <b>0</b>
            </div>

            <div className="performance-row">
              <div className="performance-info">
                <span className="performance-icon orange">✓</span>
                <div>
                  <strong>Tests & Quizzes</strong>
                  <small>Assessments created</small>
                </div>
              </div>
              <b>0</b>
            </div>
          </div>
        </section>
      </div>

      {/* BOTTOM GRID */}
      <div className="teacher-bottom-grid">

        {/* RECENT ACTIVITY */}
        <section className="teacher-panel activity-panel">
          <div className="teacher-panel-heading">
            <div>
              <span className="panel-label">ACTIVITY</span>
              <h2>Recent Activity</h2>
              <p>Keep track of your latest teaching activities</p>
            </div>
          </div>

          <div className="teacher-empty">
            <div className="empty-icon">◌</div>
            <strong>No activity yet</strong>
            <span>
              Your course, student and content activities will appear here.
            </span>

            <Link to="/teacher/courses" className="empty-action">
              Create your first course →
            </Link>
          </div>
        </section>

        {/* CONTINUE TEACHING */}
        <section className="teacher-panel continue-panel">
          <div className="teacher-panel-heading">
            <div>
              <span className="panel-label">TEACHING</span>
              <h2>Continue Teaching</h2>
              <p>Your active teaching workspace</p>
            </div>
          </div>

          <div className="continue-empty">
            <div className="continue-illustration">
              <span>📖</span>
            </div>

            <strong>No courses created</strong>

            <p>
              Create your first course and start sharing your knowledge
              with students.
            </p>

            <Link to="/teacher/courses" className="teacher-create-link">
              Create Course
              <span>→</span>
            </Link>
          </div>
        </section>
      </div>

      {/* GETTING STARTED */}
      <section className="teacher-getting-started">
        <div className="getting-content">
          <span className="panel-label">GET STARTED</span>

          <h2>Build your teaching journey with COLLEGIYA.</h2>

          <p>
            Create your course, add engaging lectures, build assessments
            and help students learn better.
          </p>

          <div className="getting-steps">
            <div>
              <span>01</span>
              <strong>Create Course</strong>
            </div>

            <div>
              <span>02</span>
              <strong>Add Content</strong>
            </div>

            <div>
              <span>03</span>
              <strong>Teach Students</strong>
            </div>
          </div>
        </div>

        <div className="getting-visual">
          <div className="visual-circle circle-one"></div>
          <div className="visual-circle circle-two"></div>

          <div className="visual-book">
            📚
          </div>
        </div>
      </section>

    </div>
  );
}
