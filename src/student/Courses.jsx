import React, {
  useCallback,
  useEffect,
  useMemo,
  useState,
} from "react";
import { Link } from "react-router-dom";
import "./courses.css";

const API_BASE_URL =
  import.meta.env.VITE_API_URL || import.meta.env.VITE_API_URL || "https://collegiya-backend.onrender.com/api";

const DEFAULT_THUMBNAIL = "/logo.jpg";

const filters = [
  "All Courses",
  "In Progress",
  "Completed",
  "Not Started",
];

const colors = [
  "blue",
  "purple",
  "orange",
  "green",
  "pink",
  "cyan",
];

const icons = [
  "💻",
  "⚛️",
  "🎤",
  "🖥️",
  "🧩",
  "🚀",
];

function formatDuration(duration) {
  if (!duration) return "Not added";
  return duration;
}

function getCourseStatus(course) {
  const progress = Number(course.progress) || 0;

  if (progress >= 100) {
    return "Completed";
  }

  if (progress > 0) {
    return "In Progress";
  }

  return "Not Started";
}

function normalizeCourse(course, index) {
  const lessons = Array.isArray(course.lessons)
    ? course.lessons.length
    : Number(course.plannedLectures) || 0;

  const progress = Number(course.progress) || 0;

  return {
    id: course._id,
    title: course.title || "Untitled Course",
    category: course.category || "General",
    level: course.level || "Beginner",
    icon: icons[index % icons.length],
    description:
      course.description ||
      "Start learning this course with COLLEGIYA.",
    instructor:
      course.instructor || "COLLEGIYA Faculty",
    lessons,
    hours: formatDuration(course.duration),
    progress,
    color: colors[index % colors.length],
    status: getCourseStatus(course),
    thumbnail:
      course.thumbnail || DEFAULT_THUMBNAIL,
  };
}

function Courses() {
  const [courses, setCourses] = useState([]);
  const [activeFilter, setActiveFilter] =
    useState("All Courses");
  const [search, setSearch] = useState("");

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // =================================
  // LOAD PUBLISHED COURSES
  // =================================

  const loadCourses = useCallback(async () => {
    try {
      setError("");

      const response = await fetch(
        `${API_BASE_URL}/courses?_=${Date.now()}`,
        {
          method: "GET",
          cache: "no-store",
          headers: {
            Accept: "application/json",
          },
        }
      );

      const data = await response.json();

      if (!response.ok || !data.success) {
        throw new Error(
          data.message || "Failed to load courses."
        );
      }

      const normalizedCourses = (
        Array.isArray(data.courses)
          ? data.courses
          : []
      ).map(normalizeCourse);

      setCourses(normalizedCourses);
    } catch (err) {
      console.error(
        "Student courses loading error:",
        err
      );

      setError(
        err.message ||
          "Unable to connect with COLLEGIYA backend."
      );
    } finally {
      setLoading(false);
    }
  }, []);

  // =================================
  // FIRST LOAD
  // =================================

  useEffect(() => {
    loadCourses();
  }, [loadCourses]);

  // =================================
  // AUTO REFRESH
  // =================================

  useEffect(() => {
    const handleFocus = () => {
      loadCourses();
    };

    const handleVisibilityChange = () => {
      if (document.visibilityState === "visible") {
        loadCourses();
      }
    };

    window.addEventListener(
      "focus",
      handleFocus
    );

    document.addEventListener(
      "visibilitychange",
      handleVisibilityChange
    );

    return () => {
      window.removeEventListener(
        "focus",
        handleFocus
      );

      document.removeEventListener(
        "visibilitychange",
        handleVisibilityChange
      );
    };
  }, [loadCourses]);

  // =================================
  // FILTER + SEARCH
  // =================================

  const filteredCourses = useMemo(() => {
    const query = search.trim().toLowerCase();

    return courses.filter((course) => {
      const matchesFilter =
        activeFilter === "All Courses" ||
        course.status === activeFilter;

      const matchesSearch =
        !query ||
        `${course.title} ${course.category} ${course.level} ${course.description} ${course.instructor}`
          .toLowerCase()
          .includes(query);

      return matchesFilter && matchesSearch;
    });
  }, [
    courses,
    activeFilter,
    search,
  ]);

  // =================================
  // COURSE STATS
  // =================================

  const totalCourses = courses.length;

  const inProgressCourses =
    courses.filter(
      (course) =>
        course.status === "In Progress"
    ).length;

  const completedCourses =
    courses.filter(
      (course) =>
        course.status === "Completed"
    ).length;

  return (
    <div className="student-courses">

      {/* =================================
          PAGE HERO
      ================================= */}

      <section className="courses-hero">

        <div className="courses-hero-content">

          <div className="courses-hero-badge">
            📚 MY LEARNING
          </div>

          <h1>
            My Courses
          </h1>

          <p>
            अपने enrolled courses को manage करें और अपनी
            learning journey को आगे बढ़ाएं।
          </p>

          <div className="courses-hero-stats">

            <div>
              <strong>
                {String(totalCourses).padStart(
                  2,
                  "0"
                )}
              </strong>

              <span>
                Total Courses
              </span>
            </div>

            <div>
              <strong>
                {String(
                  inProgressCourses
                ).padStart(2, "0")}
              </strong>

              <span>
                In Progress
              </span>
            </div>

            <div>
              <strong>
                {String(
                  completedCourses
                ).padStart(2, "0")}
              </strong>

              <span>
                Completed
              </span>
            </div>

          </div>

        </div>

        <div className="courses-hero-visual">

          <div className="courses-floating-card card-one">
            📖
          </div>

          <div className="courses-floating-card card-two">
            🎯
          </div>

          <div className="courses-hero-book">
            <span>📚</span>
            <strong>LEARN</strong>
            <small>EVERY DAY</small>
          </div>

        </div>

      </section>

      {/* =================================
          ERROR
      ================================= */}

      {error && (
        <div
          style={{
            margin: "20px 0",
            padding: "14px 18px",
            borderRadius: "14px",
            background: "#fff1f2",
            color: "#be123c",
            border: "1px solid #fecdd3",
            fontWeight: 600,
          }}
        >
          {error}
        </div>
      )}

      {/* =================================
          TOOLBAR
      ================================= */}

      <section className="courses-toolbar">

        <div className="courses-filter-list">

          {filters.map((filter) => (
            <button
              key={filter}
              type="button"
              className={
                activeFilter === filter
                  ? "course-filter active"
                  : "course-filter"
              }
              onClick={() =>
                setActiveFilter(filter)
              }
            >
              {filter}
            </button>
          ))}

        </div>

        <div className="courses-search">

          <span>
            🔍
          </span>

          <input
            type="text"
            placeholder="Search courses..."
            value={search}
            onChange={(event) =>
              setSearch(event.target.value)
            }
          />

          {search && (
            <button
              type="button"
              onClick={() =>
                setSearch("")
              }
              aria-label="Clear search"
            >
              ×
            </button>
          )}

        </div>

      </section>

      {/* =================================
          COURSE GRID
      ================================= */}

      <section className="courses-content">

        <div className="courses-heading">

          <div>
            <span>
              YOUR COURSES
            </span>

            <h2>
              Continue Your Learning
            </h2>
          </div>

          <p>
            {loading
              ? "Loading..."
              : `${filteredCourses.length} course${
                  filteredCourses.length !== 1
                    ? "s"
                    : ""
                } found`}
          </p>

        </div>

        {/* =================================
            LOADING
        ================================= */}

        {loading ? (

          <div className="courses-empty">

            <div className="courses-empty-icon">
              ⏳
            </div>

            <h3>
              Loading courses...
            </h3>

            <p>
              COLLEGIYA से courses load हो रहे हैं।
            </p>

          </div>

        ) : filteredCourses.length > 0 ? (

          <div className="courses-grid">

            {filteredCourses.map(
              (course) => (

                <article
                  className={`course-card course-${course.color}`}
                  key={course.id}
                >

                  {/* CARD TOP */}

                  <div className="course-card-top">

                    <div className="course-card-icon">

                      {course.thumbnail ? (

                        <img
                          src={course.thumbnail}
                          alt={course.title}
                          onError={(event) => {
                            event.currentTarget.onerror =
                              null;

                            event.currentTarget.src =
                              DEFAULT_THUMBNAIL;
                          }}
                          style={{
                            width: "100%",
                            height: "100%",
                            objectFit: "cover",
                            borderRadius: "inherit",
                          }}
                        />

                      ) : (

                        course.icon

                      )}

                    </div>

                    <span className="course-status">
                      {course.status}
                    </span>

                  </div>

                  {/* TITLE */}

                  <div className="course-card-body">

                    <div className="course-card-tags">

                      <span>
                        {course.category}
                      </span>

                      <span>
                        {course.level}
                      </span>

                    </div>

                    <h3>
                      {course.title}
                    </h3>

                    <p>
                      {course.description}
                    </p>

                    <div className="course-instructor">

                      <div className="course-instructor-avatar">
                        C
                      </div>

                      <span>
                        {course.instructor}
                      </span>

                    </div>

                  </div>

                  {/* PROGRESS */}

                  <div className="course-progress-area">

                    <div className="course-progress-info">

                      <span>
                        Your Progress
                      </span>

                      <strong>
                        {course.progress}%
                      </strong>

                    </div>

                    <div className="course-progress-bar">

                      <span
                        style={{
                          width: `${course.progress}%`,
                        }}
                      />

                    </div>

                  </div>

                  {/* META */}

                  <div className="course-meta">

                    <span>
                      📖 {course.lessons} Lessons
                    </span>

                    <span>
                      ⏱ {course.hours}
                    </span>

                  </div>

                  {/* ACTION */}

                  <Link
                    to={`/student/learning?course=${course.id}`}
                    className="course-action"
                  >
                    {course.progress === 100
                      ? "Review Course"
                      : course.progress === 0
                      ? "Start Course"
                      : "Continue Learning"}

                    <span>
                      →
                    </span>
                  </Link>

                </article>

              )
            )}

          </div>

        ) : (

          <div className="courses-empty">

            <div className="courses-empty-icon">
              🔎
            </div>

            <h3>
              No courses found
            </h3>

            <p>
              Search बदलें या कोई दूसरा course filter चुनें।
            </p>

            <button
              type="button"
              onClick={() => {
                setSearch("");
                setActiveFilter(
                  "All Courses"
                );
              }}
            >
              Show All Courses
            </button>

          </div>

        )}

      </section>

      {/* =================================
          LEARNING TIP
      ================================= */}

      <section className="courses-tip">

        <div className="courses-tip-icon">
          💡
        </div>

        <div className="courses-tip-content">

          <span>
            LEARNING TIP
          </span>

          <h3>
            रोज थोड़ा सीखें, लगातार आगे बढ़ें।
          </h3>

          <p>
            एक साथ बहुत कुछ करने के बजाय रोज 30–60 मिनट
            focused learning आपकी progress को बेहतर बना सकती है।
          </p>

        </div>

        <Link
          to="/student/learning"
          className="courses-tip-button"
        >
          Start Learning →
        </Link>

      </section>

    </div>
  );
}

export default Courses;
