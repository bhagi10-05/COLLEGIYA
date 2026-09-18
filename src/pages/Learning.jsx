import React from "react";
import { Link } from "react-router-dom";
import "./learning.css";

const learningSteps = [
  {
    number: "01",
    icon: "🌱",
    title: "Start with Basics",
    text: "Build a strong foundation before moving to advanced topics.",
  },
  {
    number: "02",
    icon: "📚",
    title: "Learn Step by Step",
    text: "Follow structured lessons that make complex topics easier.",
  },
  {
    number: "03",
    icon: "🧠",
    title: "Practice & Test",
    text: "Check your understanding with quizzes and practical tasks.",
  },
  {
    number: "04",
    icon: "🚀",
    title: "Build & Grow",
    text: "Use what you learn to create projects and grow your skills.",
  },
];

const courses = [
  {
    icon: "💻",
    title: "Web Development",
    lessons: 25,
    progress: 72,
    tag: "DEVELOPMENT",
  },
  {
    icon: "⚡",
    title: "JavaScript",
    lessons: 24,
    progress: 58,
    tag: "PROGRAMMING",
  },
  {
    icon: "⚛️",
    title: "React.js",
    lessons: 22,
    progress: 35,
    tag: "FRONTEND",
  },
];

function Learning() {
  return (
    <main className="learning-page">

      {/* HERO */}
      <section className="learning-hero">
        <div className="learning-container learning-hero-grid">

          <div className="learning-hero-content">

            <div className="learning-eyebrow">
              <span></span>
              YOUR LEARNING JOURNEY
            </div>

            <h1>
              Learn at your
              <br />
              <strong>own pace.</strong>
            </h1>

            <p>
              Discover structured learning paths, practical lessons,
              quizzes and projects designed to help you learn,
              practice and grow.
            </p>

            <div className="learning-hero-actions">
              <Link
                to="/courses"
                className="learning-primary-btn"
              >
                Explore Courses
                <span>→</span>
              </Link>

              <Link
                to="/signup"
                className="learning-secondary-btn"
              >
                Start Learning
              </Link>
            </div>

            <div className="learning-trust">
              <div className="learning-trust-item">
                <strong>01</strong>
                <span>Learn</span>
              </div>

              <div className="learning-trust-line"></div>

              <div className="learning-trust-item">
                <strong>02</strong>
                <span>Practice</span>
              </div>

              <div className="learning-trust-line"></div>

              <div className="learning-trust-item">
                <strong>03</strong>
                <span>Grow</span>
              </div>
            </div>

          </div>

          {/* HERO VISUAL */}
          <div className="learning-hero-visual">

            <div className="learning-glow learning-glow-one"></div>
            <div className="learning-glow learning-glow-two"></div>

            <div className="learning-main-card">

              <div className="learning-card-top">
                <div className="learning-card-logo">
                  <img
                    src="/logo.jpg"
                    alt="Collegiya"
                  />
                </div>

                <span>MY LEARNING</span>
              </div>

              <div className="learning-card-title">
                Keep moving forward
              </div>

              <div className="learning-card-progress-info">
                <span>Overall Progress</span>
                <strong>72%</strong>
              </div>

              <div className="learning-big-progress">
                <div></div>
              </div>

              <div className="learning-card-bottom">
                <span>18 lessons completed</span>
                <span>🔥 7 day streak</span>
              </div>

            </div>

            <div className="learning-floating learning-floating-top">

              <div className="learning-floating-icon">
                ✓
              </div>

              <div>
                <strong>Lesson complete</strong>
                <small>Great progress!</small>
              </div>

            </div>

            <div className="learning-floating learning-floating-bottom">

              <strong>7</strong>

              <div>
                <span>DAY</span>
                <small>STREAK 🔥</small>
              </div>

            </div>

          </div>

        </div>
      </section>

      {/* INTRO */}
      <section className="learning-section learning-intro-section">
        <div className="learning-container">

          <div className="learning-intro">

            <div>
              <span className="learning-section-label">
                HOW COLLEGIYA WORKS
              </span>

              <h2>
                A simple path from
                <br />
                <strong>learning to doing.</strong>
              </h2>
            </div>

            <p>
              Learning becomes easier when you know what to learn,
              why you are learning it and what to do next.
              Collegiya keeps your journey structured and simple.
            </p>

          </div>

        </div>
      </section>

      {/* STEPS */}
      <section className="learning-section learning-steps-section">
        <div className="learning-container">

          <div className="learning-step-grid">

            {learningSteps.map((step) => (
              <article
                className="learning-step-card"
                key={step.number}
              >

                <div className="learning-step-top">
                  <span>{step.number}</span>
                  <b>{step.icon}</b>
                </div>

                <h3>{step.title}</h3>

                <p>{step.text}</p>

                <div className="learning-step-arrow">
                  →
                </div>

              </article>
            ))}

          </div>

        </div>
      </section>

      {/* ACTIVE COURSES */}
      <section className="learning-section learning-courses-section">

        <div className="learning-container">

          <div className="learning-heading-row">

            <div>
              <span className="learning-section-label">
                CONTINUE YOUR JOURNEY
              </span>

              <h2>
                Pick up where you left off
              </h2>
            </div>

            <Link
              to="/courses"
              className="learning-view-link"
            >
              View all courses →
            </Link>

          </div>

          <div className="learning-course-grid">

            {courses.map((course) => {

              const completed = Math.round(
                (course.lessons * course.progress) / 100
              );

              return (
                <article
                  className="learning-course-card"
                  key={course.title}
                >

                  <div className="learning-course-top">

                    <div className="learning-course-icon">
                      {course.icon}
                    </div>

                    <span>{course.tag}</span>

                  </div>

                  <h3>{course.title}</h3>

                  <div className="learning-course-meta">
                    <span>
                      {course.lessons} Lessons
                    </span>

                    <strong>
                      {course.progress}%
                    </strong>
                  </div>

                  <div className="learning-progress">
                    <div
                      style={{
                        width: `${course.progress}%`,
                      }}
                    ></div>
                  </div>

                  <div className="learning-course-footer">

                    <small>
                      {completed} lessons completed
                    </small>

                    <Link to="/login">
                      Continue →
                    </Link>

                  </div>

                </article>
              );
            })}

          </div>

        </div>
      </section>

      {/* FEATURES */}
      <section className="learning-features">

        <div className="learning-container learning-features-grid">

          <div className="learning-feature-content">

            <span className="learning-section-label">
              BUILT FOR STUDENTS
            </span>

            <h2>
              Everything you need
              <br />
              <strong>to keep learning.</strong>
            </h2>

            <p>
              Courses, lessons, practice, progress tracking and
              certificates — brought together in one simple
              learning experience.
            </p>

            <Link
              to="/signup"
              className="learning-feature-btn"
            >
              Create Free Account
              <span>→</span>
            </Link>

          </div>

          <div className="learning-feature-list">

            <div className="learning-feature-item">

              <div className="learning-feature-icon">
                ▶
              </div>

              <div>
                <strong>Structured Lessons</strong>
                <small>
                  Learn concepts in the right sequence.
                </small>
              </div>

            </div>

            <div className="learning-feature-item">

              <div className="learning-feature-icon">
                ✓
              </div>

              <div>
                <strong>Practice & Quizzes</strong>
                <small>
                  Test what you learn after every step.
                </small>
              </div>

            </div>

            <div className="learning-feature-item">

              <div className="learning-feature-icon">
                ◈
              </div>

              <div>
                <strong>Track Your Progress</strong>
                <small>
                  See your learning journey clearly.
                </small>
              </div>

            </div>

            <div className="learning-feature-item">

              <div className="learning-feature-icon">
                ◆
              </div>

              <div>
                <strong>Earn Certificates</strong>
                <small>
                  Showcase your completed achievements.
                </small>
              </div>

            </div>

          </div>

        </div>

      </section>

      {/* CTA */}
      <section className="learning-section learning-cta-section">

        <div className="learning-container">

          <div className="learning-cta">

            <div className="learning-cta-logo">
              <img
                src="/logo.jpg"
                alt="Collegiya"
              />
            </div>

            <div className="learning-cta-content">

              <span>START TODAY</span>

              <h2>
                Learn Better. Grow Smarter.
              </h2>

              <p>
                Your next skill can start with one lesson.
              </p>

            </div>

            <Link
              to="/courses"
              className="learning-cta-btn"
            >
              Explore Courses →
            </Link>

          </div>

        </div>

      </section>

    </main>
  );
}

export default Learning;
