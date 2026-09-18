import React from "react";
import "./dashboard.css";

const courses = [
  {
    title: "Full Stack Web Development",
    category: "Development",
    progress: 72,
    lessons: "18 / 25 Lessons",
    icon: "⌘",
  },
  {
    title: "JavaScript Fundamentals",
    category: "Programming",
    progress: 58,
    lessons: "14 / 24 Lessons",
    icon: "JS",
  },
  {
    title: "Data Structures & Algorithms",
    category: "Computer Science",
    progress: 41,
    lessons: "10 / 24 Lessons",
    icon: "DS",
  },
];

const activities = [
  {
    icon: "✓",
    title: "Quiz completed",
    text: "JavaScript Basics Quiz",
    time: "Today, 10:30 AM",
  },
  {
    icon: "▶",
    title: "Lesson completed",
    text: "React Components",
    time: "Yesterday, 7:15 PM",
  },
  {
    icon: "◆",
    title: "Certificate earned",
    text: "HTML & CSS Fundamentals",
    time: "12 Sep 2026",
  },
];

function Dashboard() {
  return (
    <div className="student-dashboard">

      {/* HERO */}
      <section className="student-dashboard-hero">

        <div className="dashboard-hero-content">
          <span className="dashboard-eyebrow">
            STUDENT DASHBOARD
          </span>

          <h1>
            Welcome back, Student!
          </h1>

          <p>
            Continue your learning journey and keep
            building your skills.
          </p>

          <div className="dashboard-hero-actions">
            <a
              href="/student/learning"
              className="dashboard-primary-btn"
            >
              Continue Learning
              <span>→</span>
            </a>

            <a
              href="/student/courses"
              className="dashboard-secondary-btn"
            >
              Explore Courses
            </a>
          </div>
        </div>

        <div className="dashboard-hero-visual">
          <div className="hero-orbit orbit-one"></div>
          <div className="hero-orbit orbit-two"></div>

          <div className="hero-learning-card">
            <span className="hero-card-icon">▶</span>

            <div>
              <strong>Learning Progress</strong>
              <small>Keep going!</small>
            </div>

            <b>68%</b>
          </div>

          <div className="hero-floating-card hero-card-top">
            <span>✓</span>
            <div>
              <strong>12</strong>
              <small>Lessons done</small>
            </div>
          </div>

          <div className="hero-floating-card hero-card-bottom">
            <span>◆</span>
            <div>
              <strong>4</strong>
              <small>Certificates</small>
            </div>
          </div>
        </div>

      </section>

      {/* STATISTICS */}
      <section className="dashboard-stat-grid">

        <div className="dashboard-stat-card">
          <div className="stat-icon blue">▣</div>

          <div>
            <span>Enrolled Courses</span>
            <strong>06</strong>
            <small>2 active this week</small>
          </div>
        </div>

        <div className="dashboard-stat-card">
          <div className="stat-icon purple">▶</div>

          <div>
            <span>Learning Hours</span>
            <strong>48.5</strong>
            <small>+6.2 hrs this month</small>
          </div>
        </div>

        <div className="dashboard-stat-card">
          <div className="stat-icon green">✓</div>

          <div>
            <span>Completed Lessons</span>
            <strong>42</strong>
            <small>8 this month</small>
          </div>
        </div>

        <div className="dashboard-stat-card">
          <div className="stat-icon orange">◆</div>

          <div>
            <span>Certificates</span>
            <strong>04</strong>
            <small>All verified</small>
          </div>
        </div>

      </section>

      {/* MAIN GRID */}
      <section className="dashboard-main-grid">

        {/* COURSES */}
        <div className="dashboard-section-card">

          <div className="dashboard-section-header">
            <div>
              <span className="section-label">
                YOUR LEARNING
              </span>

              <h2>Continue Learning</h2>
            </div>

            <a href="/student/courses">
              View All →
            </a>
          </div>

          <div className="dashboard-course-list">

            {courses.map((course) => (
              <div
                className="dashboard-course"
                key={course.title}
              >

                <div className="course-icon">
                  {course.icon}
                </div>

                <div className="course-info">

                  <div className="course-title-row">
                    <div>
                      <span>{course.category}</span>
                      <h3>{course.title}</h3>
                    </div>

                    <strong>
                      {course.progress}%
                    </strong>
                  </div>

                  <div className="course-progress">
                    <div
                      style={{
                        width: `${course.progress}%`,
                      }}
                    ></div>
                  </div>

                  <div className="course-bottom-row">
                    <small>{course.lessons}</small>

                    <a href="/student/learning">
                      Continue →
                    </a>
                  </div>

                </div>

              </div>
            ))}

          </div>
        </div>

        {/* RIGHT COLUMN */}
        <div className="dashboard-right-column">

          {/* WEEKLY GOAL */}
          <div className="dashboard-goal-card">

            <div className="goal-header">
              <div>
                <span>WEEKLY GOAL</span>
                <h3>Learning Target</h3>
              </div>

              <div className="goal-icon">
                ★
              </div>
            </div>

            <div className="goal-progress-area">

              <div className="goal-circle">
                <div>
                  <strong>72%</strong>
                  <span>Complete</span>
                </div>
              </div>

              <div className="goal-info">
                <strong>7.2 / 10 hrs</strong>
                <p>
                  You're doing great! Keep
                  learning to reach your goal.
                </p>
              </div>

            </div>

          </div>

          {/* QUICK ACTIONS */}
          <div className="dashboard-quick-card">

            <div className="dashboard-small-heading">
              <span>QUICK ACTIONS</span>
              <h3>What do you want to do?</h3>
            </div>

            <div className="quick-action-grid">

              <a href="/student/quiz">
                <span className="quick-icon blue">
                  ✓
                </span>
                <strong>Take Quiz</strong>
                <small>Test your skills</small>
              </a>

              <a href="/student/certificate">
                <span className="quick-icon purple">
                  ◆
                </span>
                <strong>Certificates</strong>
                <small>View achievements</small>
              </a>

            </div>

          </div>

        </div>

      </section>

      {/* ACTIVITY */}
      <section className="dashboard-section-card dashboard-activity-card">

        <div className="dashboard-section-header">
          <div>
            <span className="section-label">
              RECENT ACTIVITY
            </span>

            <h2>Your Learning Activity</h2>
          </div>

          <a href="/student/notification">
            View All →
          </a>
        </div>

        <div className="dashboard-activity-list">

          {activities.map((activity) => (
            <div
              className="activity-item"
              key={`${activity.title}-${activity.time}`}
            >

              <div className="activity-icon">
                {activity.icon}
              </div>

              <div className="activity-content">
                <strong>{activity.title}</strong>
                <span>{activity.text}</span>
              </div>

              <time>{activity.time}</time>

            </div>
          ))}

        </div>

      </section>

    </div>
  );
}

export default Dashboard;
