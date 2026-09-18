import React from "react";
import { Link } from "react-router-dom";
import "./home.css";

function Home() {
  return (
    <div className="home-page">

      {/* HERO SECTION */}
      <section className="home-hero">
        <div className="container home-hero-container">

          <div className="hero-content">
            <span className="hero-badge">
              🎓 Smart Learning Platform
            </span>

            <h1>
              Learn Better.
              <br />
              <span>Grow Smarter.</span>
            </h1>

            <p>
              Collegiya is a modern education platform where students,
              teachers and colleges come together to learn, teach,
              communicate and grow.
            </p>

            <div className="hero-actions">
              <Link to="/courses" className="hero-primary-btn">
                Explore Courses
                <span>→</span>
              </Link>

              <Link to="/signup" className="hero-secondary-btn">
                Create Account
              </Link>
            </div>

            <div className="hero-trust">
              <div className="trust-item">
                <strong>100+</strong>
                <span>Learning Topics</span>
              </div>

              <div className="trust-divider"></div>

              <div className="trust-item">
                <strong>24/7</strong>
                <span>Learn Anytime</span>
              </div>

              <div className="trust-divider"></div>

              <div className="trust-item">
                <strong>1</strong>
                <span>Unified Platform</span>
              </div>
            </div>
          </div>

          <div className="hero-visual">
            <div className="hero-image-card">
              <img
                src="/collegiya-logo.jpg"
                alt="Collegiya"
              />

              <div className="floating-card floating-card-one">
                <span className="floating-icon">📚</span>
                <div>
                  <strong>Learn</strong>
                  <small>New courses</small>
                </div>
              </div>

              <div className="floating-card floating-card-two">
                <span className="floating-icon">🏆</span>
                <div>
                  <strong>Achieve</strong>
                  <small>Track progress</small>
                </div>
              </div>

              <div className="hero-circle circle-one"></div>
              <div className="hero-circle circle-two"></div>
            </div>
          </div>

        </div>
      </section>

      {/* FEATURES */}
      <section className="home-features section">
        <div className="container">

          <div className="section-heading">
            <span>WHY COLLEGIYA</span>
            <h2>Everything you need to move forward</h2>
            <p>
              A connected education ecosystem designed for students,
              teachers and colleges.
            </p>
          </div>

          <div className="feature-grid">

            <div className="feature-card">
              <div className="feature-icon">📖</div>
              <h3>Learn</h3>
              <p>
                Discover courses, learning resources and structured
                educational content in one place.
              </p>
              <Link to="/learning">Start Learning →</Link>
            </div>

            <div className="feature-card">
              <div className="feature-icon">🧠</div>
              <h3>Practice</h3>
              <p>
                Test your knowledge with quizzes, assessments and
                practice activities.
              </p>
              <Link to="/quiz">Take a Quiz →</Link>
            </div>

            <div className="feature-card">
              <div className="feature-icon">🎓</div>
              <h3>Grow</h3>
              <p>
                Build your skills, track your progress and move toward
                your academic and career goals.
              </p>
              <Link to="/certificate">View Certificates →</Link>
            </div>

            <div className="feature-card">
              <div className="feature-icon">🏫</div>
              <h3>Connect</h3>
              <p>
                Stay connected with teachers, colleges, notices and
                important academic information.
              </p>
              <Link to="/student/dashboard">Explore Dashboard →</Link>
            </div>

          </div>
        </div>
      </section>

      {/* PLATFORM SECTION */}
      <section className="platform-section section">
        <div className="container">

          <div className="platform-wrapper">

            <div className="platform-content">
              <span className="section-label">
                ONE PLATFORM
              </span>

              <h2>
                Education connected
                <br />
                in one place.
              </h2>

              <p>
                Collegiya brings students, teachers and colleges into
                one connected digital ecosystem.
              </p>

              <div className="platform-list">

                <div className="platform-item">
                  <div className="platform-number">01</div>
                  <div>
                    <h3>For Students</h3>
                    <p>
                      Courses, learning, quizzes, notifications and
                      certificates.
                    </p>
                  </div>
                </div>

                <div className="platform-item">
                  <div className="platform-number">02</div>
                  <div>
                    <h3>For Teachers</h3>
                    <p>
                      Create courses, quizzes and manage students.
                    </p>
                  </div>
                </div>

                <div className="platform-item">
                  <div className="platform-number">03</div>
                  <div>
                    <h3>For Colleges</h3>
                    <p>
                      Manage notices, syllabus, students and academic
                      information.
                    </p>
                  </div>
                </div>

              </div>
            </div>

            <div className="platform-visual">
              <div className="dashboard-preview">

                <div className="preview-top">
                  <div className="preview-dots">
                    <span></span>
                    <span></span>
                    <span></span>
                  </div>

                  <div className="preview-title">
                    Collegiya Dashboard
                  </div>
                </div>

                <div className="preview-body">

                  <div className="preview-sidebar">
                    <div className="preview-logo">C</div>
                    <span></span>
                    <span></span>
                    <span></span>
                    <span></span>
                  </div>

                  <div className="preview-content">

                    <div className="preview-welcome">
                      <div>
                        <small>Welcome back</small>
                        <strong>Keep learning 🚀</strong>
                      </div>

                      <div className="preview-avatar">
                        S
                      </div>
                    </div>

                    <div className="preview-stat-grid">
                      <div>
                        <small>Courses</small>
                        <strong>12</strong>
                      </div>

                      <div>
                        <small>Progress</small>
                        <strong>78%</strong>
                      </div>

                      <div>
                        <small>Quizzes</small>
                        <strong>24</strong>
                      </div>
                    </div>

                    <div className="preview-progress">
                      <div>
                        <span>Learning Progress</span>
                        <strong>78%</strong>
                      </div>

                      <div className="progress-bar">
                        <span></span>
                      </div>
                    </div>

                  </div>
                </div>

              </div>
            </div>

          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="home-cta section">
        <div className="container">

          <div className="cta-box">
            <div>
              <span>START YOUR JOURNEY</span>

              <h2>
                Your learning journey
                <br />
                starts here.
              </h2>

              <p>
                Explore Collegiya and build your path toward a better
                academic and professional future.
              </p>
            </div>

            <Link to="/signup" className="cta-button">
              Get Started
              <span>→</span>
            </Link>
          </div>

        </div>
      </section>

    </div>
  );
}

export default Home;
