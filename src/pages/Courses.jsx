import React, { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import "./courses.css";

const courses = [
  {
    id: 1,
    icon: "💻",
    category: "Development",
    title: "Web Development",
    description:
      "Learn HTML, CSS and JavaScript to build modern responsive websites.",
    level: "Beginner",
    lessons: "25 Lessons",
    duration: "8 Weeks",
  },
  {
    id: 2,
    icon: "⚡",
    category: "Programming",
    title: "JavaScript",
    description:
      "Build strong programming fundamentals with modern JavaScript.",
    level: "Beginner",
    lessons: "24 Lessons",
    duration: "6 Weeks",
  },
  {
    id: 3,
    icon: "⚛️",
    category: "Development",
    title: "React.js",
    description:
      "Create fast, interactive and scalable web applications with React.",
    level: "Intermediate",
    lessons: "22 Lessons",
    duration: "7 Weeks",
  },
  {
    id: 4,
    icon: "🟢",
    category: "Backend",
    title: "Node.js & Express",
    description:
      "Learn backend development and create powerful REST APIs.",
    level: "Intermediate",
    lessons: "28 Lessons",
    duration: "8 Weeks",
  },
  {
    id: 5,
    icon: "🍃",
    category: "Database",
    title: "MongoDB",
    description:
      "Understand NoSQL databases and work with real-world data.",
    level: "Beginner",
    lessons: "20 Lessons",
    duration: "5 Weeks",
  },
  {
    id: 6,
    icon: "🤖",
    category: "AI & Technology",
    title: "AI & Machine Learning",
    description:
      "Understand AI concepts and start building intelligent applications.",
    level: "Intermediate",
    lessons: "30 Lessons",
    duration: "10 Weeks",
  },
];

const categories = [
  "All Courses",
  "Development",
  "Programming",
  "Backend",
  "Database",
  "AI & Technology",
];

function Courses() {
  const [category, setCategory] = useState("All Courses");
  const [search, setSearch] = useState("");

  const filteredCourses = useMemo(() => {
    const query = search.trim().toLowerCase();

    return courses.filter((course) => {
      const categoryMatch =
        category === "All Courses" ||
        course.category === category;

      const searchMatch =
        !query ||
        course.title.toLowerCase().includes(query) ||
        course.category.toLowerCase().includes(query) ||
        course.description.toLowerCase().includes(query);

      return categoryMatch && searchMatch;
    });
  }, [category, search]);

  return (
    <div className="cp-page">
      {/* HERO */}
      <section className="cp-hero">
        <div className="cp-hero-content">
          <span className="cp-eyebrow">
            LEARN • BUILD • GROW
          </span>

          <h1>
            Explore courses.
            <br />
            <strong>Build your future.</strong>
          </h1>

          <p>
            Learn practical skills through structured courses,
            lessons, quizzes and real-world learning.
          </p>

          <div className="cp-hero-actions">
            <a href="#courses" className="cp-primary-btn">
              Explore Courses <span>→</span>
            </a>

            <Link to="/signup" className="cp-secondary-btn">
              Join Collegiya
            </Link>
          </div>
        </div>

        <div className="cp-hero-visual">
          <div className="cp-visual-circle cp-circle-one"></div>
          <div className="cp-visual-circle cp-circle-two"></div>

          <div className="cp-learning-card">
            <div className="cp-learning-logo">
              <img src="/logo.jpg" alt="Collegiya" />
            </div>

            <div>
              <span>LEARNING JOURNEY</span>
              <strong>Start learning</strong>
              <small>One skill at a time</small>
            </div>

            <b>✓</b>
          </div>

          <div className="cp-floating-card">
            <strong>100+</strong>
            <span>Learning resources</span>
          </div>
        </div>
      </section>

      {/* SEARCH + FILTER */}
      <section className="cp-discover" id="courses">
        <div className="cp-discover-heading">
          <span>COURSE LIBRARY</span>
          <h2>Find what you want to learn</h2>
          <p>
            Explore courses designed for students and future
            professionals.
          </p>
        </div>

        <div className="cp-search-box">
          <span>⌕</span>

          <input
            type="text"
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            placeholder="Search courses..."
          />

          {search && (
            <button
              type="button"
              onClick={() => setSearch("")}
              aria-label="Clear search"
            >
              ×
            </button>
          )}
        </div>

        <div className="cp-filters">
          {categories.map((item) => (
            <button
              key={item}
              type="button"
              className={category === item ? "active" : ""}
              onClick={() => setCategory(item)}
            >
              {item}
            </button>
          ))}
        </div>
      </section>

      {/* COURSE GRID */}
      <section className="cp-course-section">
        <div className="cp-section-top">
          <div>
            <span>POPULAR LEARNING PATHS</span>
            <h2>
              {category === "All Courses"
                ? "Explore Courses"
                : category}
            </h2>
          </div>

          <small>
            {filteredCourses.length} course
            {filteredCourses.length !== 1 ? "s" : ""}
          </small>
        </div>

        {filteredCourses.length > 0 ? (
          <div className="cp-grid">
            {filteredCourses.map((course) => (
              <article className="cp-course-card" key={course.id}>
                <div className="cp-card-cover">
                  <div className="cp-course-icon">
                    {course.icon}
                  </div>

                  <span className="cp-category">
                    {course.category}
                  </span>
                </div>

                <div className="cp-card-body">
                  <div className="cp-card-level">
                    <span>{course.level}</span>
                    <span>●</span>
                  </div>

                  <h3>{course.title}</h3>

                  <p>{course.description}</p>

                  <div className="cp-card-meta">
                    <span>▣ {course.lessons}</span>
                    <span>◷ {course.duration}</span>
                  </div>

                  <div className="cp-card-footer">
                    <strong>Free to explore</strong>

                    <Link to="/login">
                      Start <span>→</span>
                    </Link>
                  </div>
                </div>
              </article>
            ))}
          </div>
        ) : (
          <div className="cp-empty">
            <div>⌕</div>
            <h3>No courses found</h3>
            <p>
              Try another keyword or select a different category.
            </p>

            <button
              type="button"
              onClick={() => {
                setSearch("");
                setCategory("All Courses");
              }}
            >
              Show All Courses
            </button>
          </div>
        )}
      </section>

      {/* LEARNING PATH */}
      <section className="cp-path">
        <div className="cp-path-content">
          <span>LEARNING PATH</span>

          <h2>
            From beginner
            <br />
            <strong>to job-ready.</strong>
          </h2>

          <p>
            Start with fundamentals, practice your skills and
            gradually move towards advanced development.
          </p>

          <Link to="/signup" className="cp-path-btn">
            Start Your Journey →
          </Link>
        </div>

        <div className="cp-path-steps">
          <div className="cp-step">
            <span>01</span>
            <div>
              <strong>Learn</strong>
              <small>Build your fundamentals</small>
            </div>
          </div>

          <div className="cp-step-line"></div>

          <div className="cp-step">
            <span>02</span>
            <div>
              <strong>Practice</strong>
              <small>Test and improve your skills</small>
            </div>
          </div>

          <div className="cp-step-line"></div>

          <div className="cp-step">
            <span>03</span>
            <div>
              <strong>Build</strong>
              <small>Create real projects</small>
            </div>
          </div>

          <div className="cp-step-line"></div>

          <div className="cp-step">
            <span>04</span>
            <div>
              <strong>Grow</strong>
              <small>Move towards your goals</small>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="cp-cta">
        <div className="cp-cta-logo">
          <img src="/logo.jpg" alt="Collegiya" />
        </div>

        <div>
          <span>YOUR FUTURE STARTS TODAY</span>
          <h2>Learn Better. Grow Smarter.</h2>
          <p>
            Join Collegiya and build skills for your next step.
          </p>
        </div>

        <Link to="/signup" className="cp-cta-button">
          Get Started →
        </Link>
      </section>
    </div>
  );
}

export default Courses;
