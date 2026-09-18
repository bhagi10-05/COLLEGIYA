import React, { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import "./courses.css";

const courses = [
  {
    id: 1,
    icon: "💻",
    category: "Development",
    title: "Web Development",
    description: "Learn HTML, CSS, JavaScript and build modern websites.",
    lessons: 25,
    completed: 18,
    progress: 72,
    level: "Beginner",
    duration: "8 Weeks",
  },
  {
    id: 2,
    icon: "⚡",
    category: "Programming",
    title: "JavaScript Basics",
    description: "Build a strong foundation in modern JavaScript programming.",
    lessons: 24,
    completed: 14,
    progress: 58,
    level: "Beginner",
    duration: "6 Weeks",
  },
  {
    id: 3,
    icon: "⚛",
    category: "Development",
    title: "React Fundamentals",
    description: "Create interactive and scalable interfaces with React.",
    lessons: 22,
    completed: 8,
    progress: 35,
    level: "Intermediate",
    duration: "7 Weeks",
  },
  {
    id: 4,
    icon: "🟢",
    category: "Backend",
    title: "Node.js & Express",
    description: "Learn backend development and create powerful APIs.",
    lessons: 28,
    completed: 0,
    progress: 0,
    level: "Intermediate",
    duration: "8 Weeks",
  },
  {
    id: 5,
    icon: "🍃",
    category: "Database",
    title: "MongoDB Essentials",
    description: "Understand NoSQL databases and work with MongoDB.",
    lessons: 20,
    completed: 0,
    progress: 0,
    level: "Beginner",
    duration: "5 Weeks",
  },
  {
    id: 6,
    icon: "🤖",
    category: "Technology",
    title: "AI & Machine Learning",
    description: "Explore AI concepts and start building intelligent systems.",
    lessons: 30,
    completed: 0,
    progress: 0,
    level: "Intermediate",
    duration: "10 Weeks",
  },
];

const categories = [
  "All",
  "Development",
  "Programming",
  "Backend",
  "Database",
  "Technology",
];

function Courses() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [search, setSearch] = useState("");

  const filteredCourses = useMemo(() => {
    return courses.filter((course) => {
      const matchesCategory =
        activeCategory === "All" ||
        course.category === activeCategory;

      const text =
        `${course.title} ${course.category} ${course.description}`.toLowerCase();

      const matchesSearch = text.includes(search.toLowerCase().trim());

      return matchesCategory && matchesSearch;
    });
  }, [activeCategory, search]);

  return (
    <div className="sc-page">
      <section className="sc-header">
        <div className="sc-header-content">
          <span className="sc-eyebrow">STUDENT LEARNING</span>

          <h1>
            My <strong>Courses</strong>
          </h1>

          <p>
            Continue your learning journey and build skills that move
            you forward.
          </p>
        </div>

        <div className="sc-header-art">
          <div className="sc-art-circle sc-art-circle-one"></div>
          <div className="sc-art-circle sc-art-circle-two"></div>

          <div className="sc-art-card">
            <span>ACTIVE COURSES</span>
            <strong>06</strong>
            <small>Keep learning</small>
          </div>
        </div>
      </section>

      <section className="sc-toolbar">
        <div className="sc-search">
          <span>⌕</span>

          <input
            type="text"
            placeholder="Search courses..."
            value={search}
            onChange={(event) => setSearch(event.target.value)}
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

        <div className="sc-filter">
          {categories.map((category) => (
            <button
              key={category}
              type="button"
              className={
                activeCategory === category
                  ? "active"
                  : ""
              }
              onClick={() => setActiveCategory(category)}
            >
              {category}
            </button>
          ))}
        </div>
      </section>

      <section className="sc-section">
        <div className="sc-section-head">
          <div>
            <span>YOUR COURSES</span>
            <h2>
              {activeCategory === "All"
                ? "All Courses"
                : activeCategory}
            </h2>
          </div>

          <p>
            {filteredCourses.length} course
            {filteredCourses.length !== 1 ? "s" : ""}
          </p>
        </div>

        {filteredCourses.length > 0 ? (
          <div className="sc-grid">
            {filteredCourses.map((course) => (
              <article className="sc-course-card" key={course.id}>
                <div className="sc-card-top">
                  <div className="sc-course-icon">
                    {course.icon}
                  </div>

                  <span className="sc-category">
                    {course.category}
                  </span>
                </div>

                <div className="sc-card-body">
                  <h3>{course.title}</h3>

                  <p>{course.description}</p>

                  <div className="sc-meta">
                    <span>▣ {course.lessons} Lessons</span>
                    <span>◷ {course.duration}</span>
                  </div>

                  <div className="sc-level">
                    <span>{course.level}</span>
                    <strong>{course.progress}%</strong>
                  </div>

                  <div className="sc-progress">
                    <div
                      style={{
                        width: `${course.progress}%`,
                      }}
                    ></div>
                  </div>

                  <div className="sc-card-bottom">
                    <small>
                      {course.completed} of {course.lessons} completed
                    </small>

                    <Link
                      to="/student/learning"
                      className={
                        course.progress > 0
                          ? "sc-continue"
                          : "sc-start"
                      }
                    >
                      {course.progress > 0
                        ? "Continue"
                        : "Start Learning"}
                      <span>→</span>
                    </Link>
                  </div>
                </div>
              </article>
            ))}
          </div>
        ) : (
          <div className="sc-empty">
            <div>⌕</div>
            <h3>No courses found</h3>
            <p>
              Try another search term or choose a different category.
            </p>

            <button
              type="button"
              onClick={() => {
                setSearch("");
                setActiveCategory("All");
              }}
            >
              View All Courses
            </button>
          </div>
        )}
      </section>

      <section className="sc-bottom-banner">
        <div className="sc-bottom-icon">
          <img src="/logo.jpg" alt="Collegiya" />
        </div>

        <div className="sc-bottom-content">
          <span>KEEP MOVING FORWARD</span>

          <h2>
            Your next skill starts here.
          </h2>

          <p>
            Learn consistently, complete lessons and grow every day.
          </p>
        </div>

        <Link
          to="/student/learning"
          className="sc-bottom-button"
        >
          Continue Learning →
        </Link>
      </section>
    </div>
  );
}

export default Courses;
