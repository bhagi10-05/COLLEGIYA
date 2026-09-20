import React, {
  useEffect,
  useMemo,
  useState,
} from "react";

import { Link } from "react-router-dom";

import "./courses.css";

const API_BASE_URL =
  import.meta.env.VITE_API_URL ||
  "http://localhost:5000/api";

const DEFAULT_THUMBNAIL = "/logo.jpg";

const emptyForm = {
  title: "",
  category: "General",
  description: "",
  duration: "",
  lectures: 0,
  status: "Draft",
  thumbnail: "",
};

function normalizeCourse(course) {
  const lessons = Array.isArray(course.lessons)
    ? [...course.lessons].sort(
        (a, b) =>
          Number(a.order || 0) -
          Number(b.order || 0)
      )
    : [];

  return {
    ...course,
    id: course._id || course.id,
    title: course.title || "Untitled Course",
    category:
      course.category || "General",
    description:
      course.description || "",
    duration:
      course.duration || "Not added",
    lectures:
      course.plannedLectures ??
      lessons.length ??
      0,
    students:
      Number(course.students || 0),
    thumbnail:
      course.thumbnail ||
      DEFAULT_THUMBNAIL,
    published:
      Boolean(course.published),
    lessons,
  };
}

export default function TeacherCourses() {
  const [courses, setCourses] =
    useState([]);

  const [loading, setLoading] =
    useState(true);

  const [saving, setSaving] =
    useState(false);

  const [error, setError] =
    useState("");

  const [search, setSearch] =
    useState("");

  const [filter, setFilter] =
    useState("All");

  const [showForm, setShowForm] =
    useState(false);

  const [editingCourse, setEditingCourse] =
    useState(null);

  const [form, setForm] =
    useState(emptyForm);

  const loadCourses = async () => {
    try {
      setLoading(true);
      setError("");

      const response = await fetch(
        `${API_BASE_URL}/courses?all=true`
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.message ||
            "Courses load nahi ho sake."
        );
      }

      const list = Array.isArray(data)
        ? data
        : data.courses || data.data || [];

      setCourses(
        list.map(normalizeCourse)
      );
    } catch (err) {
      console.error(err);

      setError(
        err.message ||
          "Courses load karne me problem hui."
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadCourses();
  }, []);

  const stats = useMemo(() => {
    const total = courses.length;

    const published = courses.filter(
      (course) => course.published
    ).length;

    const drafts = courses.filter(
      (course) => !course.published
    ).length;

    const students = courses.reduce(
      (sum, course) =>
        sum + Number(course.students || 0),
      0
    );

    const lectures = courses.reduce(
      (sum, course) =>
        sum +
        Number(
          course.lessons?.length ??
            course.lectures ??
            0
        ),
      0
    );

    return {
      total,
      published,
      drafts,
      students,
      lectures,
    };
  }, [courses]);

  const filteredCourses = useMemo(() => {
    const keyword =
      search.trim().toLowerCase();

    return courses.filter((course) => {
      const matchesSearch =
        !keyword ||
        course.title
          .toLowerCase()
          .includes(keyword) ||
        course.category
          .toLowerCase()
          .includes(keyword) ||
        course.description
          .toLowerCase()
          .includes(keyword);

      const matchesFilter =
        filter === "All" ||
        (filter === "Published" &&
          course.published) ||
        (filter === "Draft" &&
          !course.published);

      return (
        matchesSearch &&
        matchesFilter
      );
    });
  }, [courses, search, filter]);

  const openCreateForm = () => {
    setEditingCourse(null);

    setForm({
      ...emptyForm,
    });

    setShowForm(true);
    setError("");
  };

  const openEditForm = (course) => {
    setEditingCourse(course);

    setForm({
      title: course.title || "",
      category:
        course.category || "General",
      description:
        course.description || "",
      duration:
        course.duration || "",
      lectures:
        course.plannedLectures ??
        course.lectures ??
        course.lessons?.length ??
        0,
      status: course.published
        ? "Published"
        : "Draft",
      thumbnail:
        course.thumbnail || "",
    });

    setShowForm(true);
    setError("");
  };

  const closeForm = () => {
    if (saving) return;

    setShowForm(false);
    setEditingCourse(null);
    setForm({
      ...emptyForm,
    });
  };

  const handleChange = (event) => {
    const {
      name,
      value,
    } = event.target;

    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const saveCourse = async (
    event
  ) => {
    event.preventDefault();

    if (!form.title.trim()) {
      setError(
        "Course title required hai."
      );
      return;
    }

    try {
      setSaving(true);
      setError("");

      /*
       * Backend me current create API available hai.
       * Existing UI ko preserve karte hue
       * create functionality connect ki gayi hai.
       */

      if (editingCourse) {
        /*
         * Current backend me dedicated
         * course PUT endpoint nahi hai.
         *
         * Isliye edit ko abhi local UI me
         * misleading API call nahi kar rahe.
         */
        setCourses((prev) =>
          prev.map((course) =>
            course.id === editingCourse.id
              ? normalizeCourse({
                  ...course,
                  title: form.title,
                  category:
                    form.category,
                  description:
                    form.description,
                  duration:
                    form.duration,
                  plannedLectures:
                    Number(
                      form.lectures || 0
                    ),
                  thumbnail:
                    form.thumbnail ||
                    DEFAULT_THUMBNAIL,
                  published:
                    form.status ===
                    "Published",
                })
              : course
          )
        );

        closeForm();

        return;
      }

      const payload = {
        title: form.title.trim(),
        category:
          form.category || "General",
        description:
          form.description || "",
        duration:
          form.duration || "Not added",
        plannedLectures:
          Number(form.lectures || 0),
        thumbnail:
          form.thumbnail ||
          DEFAULT_THUMBNAIL,
        published:
          form.status ===
          "Published",
      };

      const response = await fetch(
        `${API_BASE_URL}/courses`,
        {
          method: "POST",
          headers: {
            "Content-Type":
              "application/json",
          },
          body: JSON.stringify(payload),
        }
      );

      const data =
        await response.json();

      if (!response.ok) {
        throw new Error(
          data.message ||
            "Course create nahi ho saka."
        );
      }

      await loadCourses();

      closeForm();
    } catch (err) {
      console.error(err);

      setError(
        err.message ||
          "Course save nahi ho saka."
      );
    } finally {
      setSaving(false);
    }
  };

  const deleteCourse = async (id) => {
    /*
     * Current backend me course DELETE endpoint
     * available nahi hai.
     *
     * Isliye destructive fake request nahi bhej rahe.
     */
    alert(
      "Course delete API abhi backend me add karna baaki hai."
    );
  };

  return (
    <div className="teacher-courses-page">

      {/* ================= HEADER ================= */}

      <section className="courses-header">

        <div className="courses-header-content">

          <div className="courses-heading-area">

            <div className="courses-eyebrow">
              <span className="eyebrow-dot" />
              TEACHER PORTAL
            </div>

            <h1>
              My Courses
            </h1>

            <p>
              Create, organize and manage
              your learning content from
              one place.
            </p>

          </div>

          <button
            className="create-course-btn"
            onClick={openCreateForm}
          >
            <span className="create-plus">
              +
            </span>

            <span>
              Create Course
            </span>
          </button>

        </div>

        {/* HEADER QUICK INFO */}

        <div className="courses-header-glow glow-one" />
        <div className="courses-header-glow glow-two" />

      </section>

      {/* ================= ERROR ================= */}

      {error && (
        <div className="course-page-alert">
          <span>!</span>
          <div>
            <strong>
              Something needs attention
            </strong>
            <p>{error}</p>
          </div>

          <button
            onClick={() => setError("")}
          >
            ×
          </button>
        </div>
      )}

      {/* ================= STATS ================= */}

      <section className="course-stat-grid">

        <div className="course-stat-card">
          <div className="course-stat-top">
            <div className="course-stat-icon blue">
              <span>▣</span>
            </div>

            <span className="stat-label">
              TOTAL COURSES
            </span>
          </div>

          <div className="course-stat-number">
            {stats.total}
          </div>

          <div className="course-stat-bottom">
            <span className="stat-line" />
            <span>
              All created courses
            </span>
          </div>
        </div>

        <div className="course-stat-card">
          <div className="course-stat-top">
            <div className="course-stat-icon green">
              <span>✓</span>
            </div>

            <span className="stat-label">
              PUBLISHED
            </span>
          </div>

          <div className="course-stat-number">
            {stats.published}
          </div>

          <div className="course-stat-bottom">
            <span className="stat-line" />
            <span>
              Visible to students
            </span>
          </div>
        </div>

        <div className="course-stat-card">
          <div className="course-stat-top">
            <div className="course-stat-icon orange">
              <span>◷</span>
            </div>

            <span className="stat-label">
              DRAFT COURSES
            </span>
          </div>

          <div className="course-stat-number">
            {stats.drafts}
          </div>

          <div className="course-stat-bottom">
            <span className="stat-line" />
            <span>
              Still in preparation
            </span>
          </div>
        </div>

        <div className="course-stat-card">
          <div className="course-stat-top">
            <div className="course-stat-icon purple">
              <span>♙</span>
            </div>

            <span className="stat-label">
              STUDENTS
            </span>
          </div>

          <div className="course-stat-number">
            {stats.students}
          </div>

          <div className="course-stat-bottom">
            <span className="stat-line" />
            <span>
              Across all courses
            </span>
          </div>
        </div>

      </section>

      {/* ================= TOOLBAR ================= */}

      <section className="courses-toolbar">

        <div className="course-toolbar-left">

          <div className="course-search">

            <span className="search-icon">
              ⌕
            </span>

            <input
              type="text"
              placeholder="Search your courses..."
              value={search}
              onChange={(event) =>
                setSearch(
                  event.target.value
                )
              }
            />

            {search && (
              <button
                className="search-clear"
                onClick={() =>
                  setSearch("")
                }
              >
                ×
              </button>
            )}

          </div>

        </div>

        <div className="course-filters">

          {[
            "All",
            "Published",
            "Draft",
          ].map((item) => (
            <button
              key={item}
              className={
                filter === item
                  ? "active"
                  : ""
              }
              onClick={() =>
                setFilter(item)
              }
            >
              {item}

              {item === "All" && (
                <span>
                  {stats.total}
                </span>
              )}

              {item ===
                "Published" && (
                <span>
                  {stats.published}
                </span>
              )}

              {item === "Draft" && (
                <span>
                  {stats.drafts}
                </span>
              )}
            </button>
          ))}

        </div>

      </section>

      {/* ================= COURSE LIST ================= */}

      <section className="courses-content">

        <div className="courses-section-heading">

          <div>
            <span className="section-kicker">
              YOUR LIBRARY
            </span>

            <h2>
              Course Collection
            </h2>
          </div>

          <div className="course-result-count">
            {filteredCourses.length}{" "}
            course
            {filteredCourses.length !==
              1
              ? "s"
              : ""}
          </div>

        </div>

        {loading ? (
          <div className="courses-loading">

            <div className="loading-spinner" />

            <h3>
              Loading courses...
            </h3>

            <p>
              Your course library is
              being prepared.
            </p>

          </div>
        ) : filteredCourses.length ===
          0 ? (
          <div className="courses-empty">

            <div className="empty-illustration">
              <div className="empty-orbit orbit-one" />
              <div className="empty-orbit orbit-two" />

              <div className="empty-book">
                <span />
                <span />
                <span />
              </div>
            </div>

            <span className="empty-label">
              {search ||
              filter !== "All"
                ? "NO MATCHES"
                : "YOUR LIBRARY IS EMPTY"}
            </span>

            <h3>
              {search ||
              filter !== "All"
                ? "No courses found"
                : "Create your first course"}
            </h3>

            <p>
              {search ||
              filter !== "All"
                ? "Try changing your search or filter."
                : "Start building your course and share your knowledge with students."}
            </p>

            {!search &&
              filter === "All" && (
                <button
                  className="empty-create-btn"
                  onClick={
                    openCreateForm
                  }
                >
                  <span>+</span>
                  Create Your First Course
                </button>
              )}

          </div>
        ) : (
          <div className="course-list">

            {filteredCourses.map(
              (course, index) => {
                const lessonCount =
                  course.lessons
                    ?.length ??
                  course.lectures ??
                  0;

                return (
                  <article
                    className="premium-course-card"
                    key={course.id}
                    style={{
                      "--card-index":
                        index,
                    }}
                  >

                    {/* THUMBNAIL */}

                    <div className="premium-course-media">

                      <img
                        src={
                          course.thumbnail ||
                          DEFAULT_THUMBNAIL
                        }
                        alt={
                          course.title
                        }
                        onError={(
                          event
                        ) => {
                          event.currentTarget.src =
                            DEFAULT_THUMBNAIL;
                        }}
                      />

                      <div className="media-overlay" />

                      <div
                        className={
                          course.published
                            ? "course-status published"
                            : "course-status draft"
                        }
                      >
                        <span />
                        {course.published
                          ? "Published"
                          : "Draft"}
                      </div>

                      <div className="course-media-number">
                        {String(
                          index + 1
                        ).padStart(2, "0")}
                      </div>

                    </div>

                    {/* CONTENT */}

                    <div className="premium-course-content">

                      <div className="premium-course-meta">

                        <span className="course-category">
                          {course.category}
                        </span>

                        <span className="meta-dot">
                          •
                        </span>

                        <span>
                          {course.duration}
                        </span>

                      </div>

                      <h3>
                        {course.title}
                      </h3>

                      <p className="premium-course-description">
                        {course.description ||
                          "No course description has been added yet."}
                      </p>

                      <div className="premium-course-info">

                        <div>
                          <span className="info-icon">
                            ▤
                          </span>
                          <strong>
                            {lessonCount}
                          </strong>
                          <span>
                            Lectures
                          </span>
                        </div>

                        <div>
                          <span className="info-icon">
                            ♙
                          </span>
                          <strong>
                            {
                              course.students
                            }
                          </strong>
                          <span>
                            Students
                          </span>
                        </div>

                      </div>

                      <div className="premium-course-actions">

                        <Link
                          to={`/teacher/lectures?course=${course.id}`}
                          className="manage-content-btn"
                        >
                          <span>
                            Manage Content
                          </span>
                          <span className="arrow">
                            →
                          </span>
                        </Link>

                        <button
                          className="icon-action edit"
                          title="Edit course"
                          onClick={() =>
                            openEditForm(
                              course
                            )
                          }
                        >
                          ✎
                        </button>

                        <button
                          className="icon-action delete"
                          title="Delete course"
                          onClick={() =>
                            deleteCourse(
                              course.id
                            )
                          }
                        >
                          ♲
                        </button>

                      </div>

                    </div>

                  </article>
                );
              }
            )}

          </div>
        )}

      </section>

      {/* ================= CREATE / EDIT MODAL ================= */}

      {showForm && (
        <div
          className="course-form-overlay"
          onMouseDown={(
            event
          ) => {
            if (
              event.target ===
              event.currentTarget
            ) {
              closeForm();
            }
          }}
        >

          <div className="course-form-card">

            <div className="course-form-header">

              <div className="form-heading">

                <div className="form-heading-icon">
                  ✦
                </div>

                <div>
                  <span>
                    COURSE STUDIO
                  </span>

                  <h2>
                    {editingCourse
                      ? "Edit Course"
                      : "Create New Course"}
                  </h2>
                </div>

              </div>

              <button
                className="course-form-close"
                onClick={
                  closeForm
                }
              >
                ×
              </button>

            </div>

            <form
              onSubmit={
                saveCourse
              }
            >

              <div className="course-form-grid">

                <div className="course-form-group full">
                  <label>
                    Course Title
                    <span>*</span>
                  </label>

                  <input
                    name="title"
                    value={
                      form.title
                    }
                    onChange={
                      handleChange
                    }
                    placeholder="e.g. Complete JavaScript Masterclass"
                    autoFocus
                  />
                </div>

                <div className="course-form-group">
                  <label>
                    Category
                  </label>

                  <input
                    name="category"
                    value={
                      form.category
                    }
                    onChange={
                      handleChange
                    }
                    placeholder="e.g. Programming"
                  />
                </div>

                <div className="course-form-group">
                  <label>
                    Duration
                  </label>

                  <input
                    name="duration"
                    value={
                      form.duration
                    }
                    onChange={
                      handleChange
                    }
                    placeholder="e.g. 12 hours"
                  />
                </div>

                <div className="course-form-group">
                  <label>
                    Planned Lectures
                  </label>

                  <input
                    type="number"
                    min="0"
                    name="lectures"
                    value={
                      form.lectures
                    }
                    onChange={
                      handleChange
                    }
                    placeholder="e.g. 30"
                  />
                </div>

                <div className="course-form-group">
                  <label>
                    Visibility
                  </label>

                  <select
                    name="status"
                    value={
                      form.status
                    }
                    onChange={
                      handleChange
                    }
                  >
                    <option>
                      Draft
                    </option>
                    <option>
                      Published
                    </option>
                  </select>
                </div>

                <div className="course-form-group full">
                  <label>
                    Thumbnail URL
                  </label>

                  <input
                    name="thumbnail"
                    value={
                      form.thumbnail
                    }
                    onChange={
                      handleChange
                    }
                    placeholder="https://..."
                  />
                </div>

                <div className="course-form-group full">
                  <label>
                    Course Description
                  </label>

                  <textarea
                    name="description"
                    value={
                      form.description
                    }
                    onChange={
                      handleChange
                    }
                    rows="5"
                    placeholder="Tell students what they will learn in this course..."
                  />
                </div>

              </div>

              <div className="course-form-tip">
                <span>✦</span>

                <p>
                  After creating the course,
                  use{" "}
                  <strong>
                    Manage Content
                  </strong>{" "}
                  to add lectures, videos,
                  YouTube links, notes and
                  learning resources.
                </p>
              </div>

              <div className="course-form-actions">

                <button
                  type="button"
                  className="course-cancel-btn"
                  onClick={
                    closeForm
                  }
                  disabled={
                    saving
                  }
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  className="course-save-btn"
                  disabled={
                    saving
                  }
                >
                  {saving ? (
                    <>
                      <span className="button-spinner" />
                      Saving...
                    </>
                  ) : (
                    <>
                      <span>
                        {editingCourse
                          ? "Save Changes"
                          : "Create Course"}
                      </span>

                      <span>
                        →
                      </span>
                    </>
                  )}
                </button>

              </div>

            </form>

          </div>

        </div>
      )}

    </div>
  );
}
