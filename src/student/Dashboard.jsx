import React from "react";
import { Link } from "react-router-dom";
import "./dashboard.css";

const courses = [
  {
    title: "Web Development",
    subtitle: "HTML • CSS • JavaScript",
    icon: "💻",
    progress: 72,
    lessons: "18 / 25 lessons",
    action: "Continue Learning",
    path: "/student/learning",
  },
  {
    title: "React Development",
    subtitle: "React • Components • Hooks",
    icon: "⚛️",
    progress: 48,
    lessons: "12 / 25 lessons",
    action: "Continue Learning",
    path: "/student/learning",
  },
  {
    title: "Communication Skills",
    subtitle: "English • Speaking • Writing",
    icon: "🎤",
    progress: 35,
    lessons: "7 / 20 lessons",
    action: "Continue Learning",
    path: "/student/learning",
  },
];

const activities = [
  {
    icon: "▶",
    title: "Completed React Basics",
    time: "Today, 10:30 AM",
  },
  {
    icon: "✓",
    title: "Quiz submitted successfully",
    time: "Yesterday, 6:20 PM",
  },
  {
    icon: "📚",
    title: "Started Web Development",
    time: "Yesterday, 11:15 AM",
  },
];

const notifications = [
  {
    icon: "📢",
    title: "New course available",
    text: "Advanced JavaScript course is now available.",
    time: "2h ago",
  },
  {
    icon: "📝",
    title: "Upcoming quiz",
    text: "React Fundamentals quiz is scheduled soon.",
    time: "5h ago",
  },
  {
    icon: "🎓",
    title: "Learning milestone",
    text: "You are close to completing your weekly goal.",
    time: "Yesterday",
  },
];

function Dashboard() {
  return (
    <div className="student-dashboard">

      {/* =========================
          WELCOME HERO
      ========================== */}
      <section className="dashboard-hero">

        <div className="dashboard-hero-content">

          <div className="dashboard-hero-badge">
            ✨ STUDENT DASHBOARD
          </div>

          <h1>
            Welcome back,
            <span> Student! 👋</span>
          </h1>

          <p>
            Keep learning, keep growing and take one more step
            towards your goals today.
          </p>

          <div className="dashboard-hero-actions">
            <Link
              to="/student/learning"
              className="dashboard-primary-btn"
            >
              Continue Learning
              <span>→</span>
            </Link>

            <Link
              to="/student/courses"
              className="dashboard-secondary-btn"
            >
              Explore Courses
            </Link>
          </div>

        </div>

        <div className="dashboard-hero-art">
          <div className="hero-orbit orbit-one"></div>
          <div className="hero-orbit orbit-two"></div>

          <div className="hero-student-card">
            <div className="hero-student-icon">
              🎓
            </div>

            <strong>Keep Learning</strong>

            <span>
              Your future starts today
            </span>
          </div>
        </div>

      </section>


      {/* =========================
          STATS
      ========================== */}
      <section className="dashboard-stats">

        <div className="dashboard-stat-card stat-blue">
          <div className="dashboard-stat-icon">
            📚
          </div>

          <div className="dashboard-stat-info">
            <span>Enrolled Courses</span>
            <strong>06</strong>
            <small>Active courses</small>
          </div>
        </div>

        <div className="dashboard-stat-card stat-purple">
          <div className="dashboard-stat-icon">
            ⏱️
          </div>

          <div className="dashboard-stat-info">
            <span>Learning Hours</span>
            <strong>42</strong>
            <small>This month</small>
          </div>
        </div>

        <div className="dashboard-stat-card stat-orange">
          <div className="dashboard-stat-icon">
            ✓
          </div>

          <div className="dashboard-stat-info">
            <span>Tests Completed</span>
            <strong>18</strong>
            <small>Total attempts</small>
          </div>
        </div>

        <div className="dashboard-stat-card stat-green">
          <div className="dashboard-stat-icon">
            🏆
          </div>

          <div className="dashboard-stat-info">
            <span>Certificates</span>
            <strong>03</strong>
            <small>Earned certificates</small>
          </div>
        </div>

      </section>


      {/* =========================
          MAIN GRID
      ========================== */}
      <section className="dashboard-main-grid">

        {/* LEFT */}
        <div className="dashboard-main-column">

          {/* CONTINUE LEARNING */}
          <div className="dashboard-section-card">

            <div className="dashboard-section-header">
              <div>
                <span className="dashboard-section-label">
                  MY LEARNING
                </span>

                <h2>
                  Continue Learning
                </h2>
              </div>

              <Link to="/student/courses">
                View All →
              </Link>
            </div>


            <div className="dashboard-course-list">

              {courses.map((course) => (
                <div
                  className="dashboard-course-card"
                  key={course.title}
                >

                  <div className="dashboard-course-icon">
                    {course.icon}
                  </div>

                  <div className="dashboard-course-content">

                    <div className="dashboard-course-top">
                      <div>
                        <h3>{course.title}</h3>
                        <p>{course.subtitle}</p>
                      </div>

                      <strong>
                        {course.progress}%
                      </strong>
                    </div>

                    <div className="dashboard-progress">
                      <span
                        style={{
                          width: `${course.progress}%`,
                        }}
                      ></span>
                    </div>

                    <div className="dashboard-course-bottom">

                      <small>
                        {course.lessons}
                      </small>

                      <Link to={course.path}>
                        {course.action}
                        <span>→</span>
                      </Link>

                    </div>

                  </div>

                </div>
              ))}

            </div>

          </div>


          {/* RECENT ACTIVITY */}
          <div className="dashboard-section-card">

            <div className="dashboard-section-header">
              <div>
                <span className="dashboard-section-label">
                  ACTIVITY
                </span>

                <h2>
                  Recent Activity
                </h2>
              </div>

              <span className="dashboard-live">
                ● LIVE
              </span>
            </div>

            <div className="dashboard-activity-list">

              {activities.map((activity) => (
                <div
                  className="dashboard-activity-item"
                  key={activity.title}
                >

                  <div className="dashboard-activity-icon">
                    {activity.icon}
                  </div>

                  <div>
                    <strong>
                      {activity.title}
                    </strong>

                    <span>
                      {activity.time}
                    </span>
                  </div>

                </div>
              ))}

            </div>

          </div>

        </div>


        {/* RIGHT */}
        <div className="dashboard-side-column">

          {/* DAILY GOAL */}
          <div className="dashboard-goal-card">

            <div className="dashboard-goal-top">
              <div>
                <span>
                  TODAY'S GOAL
                </span>

                <h2>
                  Keep going!
                </h2>
              </div>

              <div className="dashboard-goal-emoji">
                🔥
              </div>
            </div>

            <div className="dashboard-goal-circle">
              <div className="dashboard-goal-inner">
                <strong>72%</strong>
                <span>Complete</span>
              </div>
            </div>

            <p>
              You have completed 72% of your daily learning goal.
            </p>

            <Link
              to="/student/learning"
              className="dashboard-goal-btn"
            >
              Continue Learning →
            </Link>

          </div>


          {/* UPCOMING TEST */}
          <div className="dashboard-test-card">

            <div className="dashboard-test-heading">
              <div className="dashboard-test-icon">
                📝
              </div>

              <div>
                <span>
                  UPCOMING TEST
                </span>

                <h3>
                  React Fundamentals
                </h3>
              </div>
            </div>

            <div className="dashboard-test-details">

              <div>
                <span>📅</span>
                <strong>24 Sept</strong>
              </div>

              <div>
                <span>⏱</span>
                <strong>30 Minutes</strong>
              </div>

              <div>
                <span>❓</span>
                <strong>25 Questions</strong>
              </div>

            </div>

            <Link
              to="/student/quiz"
              className="dashboard-test-btn"
            >
              View Test →
            </Link>

          </div>


          {/* NOTIFICATIONS */}
          <div className="dashboard-section-card dashboard-notification-card">

            <div className="dashboard-section-header">
              <div>
                <span className="dashboard-section-label">
                  UPDATES
                </span>

                <h2>
                  Notifications
                </h2>
              </div>

              <Link to="/student/notification">
                View All
              </Link>
            </div>

            <div className="dashboard-notification-list">

              {notifications.map((notification) => (
                <div
                  className="dashboard-notification-item"
                  key={notification.title}
                >

                  <div className="dashboard-notification-icon">
                    {notification.icon}
                  </div>

                  <div className="dashboard-notification-content">
                    <strong>
                      {notification.title}
                    </strong>

                    <p>
                      {notification.text}
                    </p>

                    <small>
                      {notification.time}
                    </small>
                  </div>

                </div>
              ))}

            </div>

          </div>

        </div>

      </section>


      {/* =========================
          MOTIVATION
      ========================== */}
      <section className="dashboard-motivation">

        <div className="dashboard-motivation-icon">
          🚀
        </div>

        <div>
          <span>
            YOUR LEARNING JOURNEY
          </span>

          <h2>
            Small progress every day creates big results.
          </h2>

          <p>
            Stay consistent. Learn something new today and
            build the future you want.
          </p>
        </div>

        <Link
          to="/student/learning"
          className="dashboard-motivation-btn"
        >
          Start Learning →
        </Link>

      </section>

    </div>
  );
}

export default Dashboard;
