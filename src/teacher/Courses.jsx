import React, { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import "./courses.css";

const emptyForm = {
  title: "",
  category: "",
  description: "",
  duration: "",
  lectures: "",
  status: "Draft",
  thumbnail: "",
};

export default function Courses() {
  const [courses, setCourses] = useState([]);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("All");
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState(emptyForm);

  const filteredCourses = useMemo(() => {
    return courses.filter((course) => {
      const searchText = search.toLowerCase();

      const matchesSearch =
        course.title.toLowerCase().includes(searchText) ||
        course.category.toLowerCase().includes(searchText);

      const matchesFilter =
        filter === "All" || course.status === filter;

      return matchesSearch && matchesFilter;
    });
  }, [courses, search, filter]);

  const totalCourses = courses.length;

  const publishedCourses = courses.filter(
    (course) => course.status === "Published"
  ).length;

  const draftCourses = courses.filter(
    (course) => course.status === "Draft"
  ).length;

  const totalStudents = courses.reduce(
    (total, course) => total + course.students,
    0
  );

  const handleChange = (e) => {
    const { name, value } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const openCreateForm = () => {
    setForm(emptyForm);
    setShowForm(true);
  };

  const closeCreateForm = () => {
    setShowForm(false);
    setForm(emptyForm);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!form.title.trim()) {
      alert("Please enter course title.");
      return;
    }

    if (!form.category.trim()) {
      alert("Please enter course category.");
      return;
    }

    if (!form.description.trim()) {
      alert("Please enter course description.");
      return;
    }

    const newCourse = {
      id: Date.now(),
      title: form.title.trim(),
      category: form.category.trim(),
      description: form.description.trim(),
      duration: form.duration.trim() || "Not added",
      lectures: Number(form.lectures) || 0,
      students: 0,
      status: form.status,
      thumbnail: form.thumbnail.trim(),
    };

    setCourses((prev) => [newCourse, ...prev]);

    setForm(emptyForm);
    setShowForm(false);
  };

  const deleteCourse = (id) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this course?"
    );

    if (!confirmed) return;

    setCourses((prev) =>
      prev.filter((course) => course.id !== id)
    );
  };

  return (
    <div className="teacher-courses-page">

      {/* =========================
          HEADER
      ========================= */}

      <div className="courses-header">
        <div>
          <span className="courses-eyebrow">
            TEACHING
          </span>

          <h1>My Courses</h1>

          <p>
            Create, manage and organize all your courses from one place.
          </p>
        </div>

        <button
          className="create-course-btn"
          type="button"
          onClick={openCreateForm}
        >
          <span>＋</span>
          Create Course
        </button>
      </div>


      {/* =========================
          STATS
      ========================= */}

      <div className="course-stat-grid">

        <div className="course-stat-card">
          <div className="course-stat-icon blue">
            📚
          </div>

          <div>
            <span>Total Courses</span>
            <strong>{totalCourses}</strong>
          </div>
        </div>


        <div className="course-stat-card">
          <div className="course-stat-icon green">
            ✓
          </div>

          <div>
            <span>Published</span>
            <strong>{publishedCourses}</strong>
          </div>
        </div>


        <div className="course-stat-card">
          <div className="course-stat-icon orange">
            ◷
          </div>

          <div>
            <span>Draft Courses</span>
            <strong>{draftCourses}</strong>
          </div>
        </div>


        <div className="course-stat-card">
          <div className="course-stat-icon purple">
            ♙
          </div>

          <div>
            <span>Total Students</span>
            <strong>{totalStudents}</strong>
          </div>
        </div>

      </div>


      {/* =========================
          TOOLBAR
      ========================= */}

      <div className="courses-toolbar">

        <div className="course-search">
          <span>⌕</span>

          <input
            type="text"
            placeholder="Search courses..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>


        <div className="course-filters">

          {["All", "Published", "Draft"].map((item) => (
            <button
              key={item}
              type="button"
              className={filter === item ? "active" : ""}
              onClick={() => setFilter(item)}
            >
              {item}
            </button>
          ))}

        </div>

      </div>


      {/* =========================
          CREATE COURSE FORM
      ========================= */}

      {showForm && (
        <div className="course-form-overlay">

          <div className="course-form-card">

            <div className="course-form-header">

              <div>
                <span>NEW COURSE</span>
                <h2>Create Course</h2>
                <p>
                  Add basic information about your course.
                </p>
              </div>

              <button
                type="button"
                className="course-form-close"
                onClick={closeCreateForm}
              >
                ×
              </button>

            </div>


            <form onSubmit={handleSubmit}>

              <div className="course-form-grid">

                <div className="course-form-group full">
                  <label>
                    Course Title *
                  </label>

                  <input
                    name="title"
                    type="text"
                    placeholder="e.g. Complete React JS Course"
                    value={form.title}
                    onChange={handleChange}
                  />
                </div>


                <div className="course-form-group">

                  <label>
                    Category *
                  </label>

                  <input
                    name="category"
                    type="text"
                    placeholder="e.g. Web Development"
                    value={form.category}
                    onChange={handleChange}
                  />

                </div>


                <div className="course-form-group">

                  <label>
                    Duration
                  </label>

                  <input
                    name="duration"
                    type="text"
                    placeholder="e.g. 12 Hours"
                    value={form.duration}
                    onChange={handleChange}
                  />

                </div>


                <div className="course-form-group">

                  <label>
                    Number of Lectures
                  </label>

                  <input
                    name="lectures"
                    type="number"
                    min="0"
                    placeholder="e.g. 25"
                    value={form.lectures}
                    onChange={handleChange}
                  />

                </div>


                <div className="course-form-group">

                  <label>
                    Course Status
                  </label>

                  <select
                    name="status"
                    value={form.status}
                    onChange={handleChange}
                  >
                    <option value="Draft">
                      Draft
                    </option>

                    <option value="Published">
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
                    type="url"
                    placeholder="https://example.com/course-image.jpg"
                    value={form.thumbnail}
                    onChange={handleChange}
                  />

                </div>


                <div className="course-form-group full">

                  <label>
                    Description *
                  </label>

                  <textarea
                    name="description"
                    rows="5"
                    placeholder="Write a short description about your course..."
                    value={form.description}
                    onChange={handleChange}
                  />

                </div>

              </div>


              <div className="course-form-actions">

                <button
                  type="button"
                  className="course-cancel-btn"
                  onClick={closeCreateForm}
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  className="course-save-btn"
                >
                  Create Course
                </button>

              </div>

            </form>

          </div>

        </div>
      )}


      {/* =========================
          COURSE LIST
      ========================= */}

      {filteredCourses.length === 0 ? (

        <div className="courses-empty">

          <div className="empty-illustration">
            <div className="empty-book">
              📖
            </div>
          </div>

          <span className="empty-label">
            {courses.length === 0
              ? "NO COURSES YET"
              : "NO RESULTS"}
          </span>

          <h2>
            {courses.length === 0
              ? "Create your first course"
              : "No courses found"}
          </h2>

          <p>
            {courses.length === 0
              ? "Start sharing your knowledge with students by creating your first course."
              : "Try changing your search or filter to find a course."}
          </p>

          {courses.length === 0 && (
            <button
              className="empty-create-btn"
              type="button"
              onClick={openCreateForm}
            >
              <span>＋</span>
              Create Your First Course
            </button>
          )}

        </div>

      ) : (

        <div className="course-list">

          {filteredCourses.map((course) => (

            <article
              className="course-card"
              key={course.id}
            >

              <div className="course-thumbnail">

                {course.thumbnail ? (
                  <img
                    src={course.thumbnail}
                    alt={course.title}
                  />
                ) : (
                  <div className="thumbnail-placeholder">
                    <span>📚</span>
                  </div>
                )}

                <span
                  className={`course-status ${
                    course.status === "Published"
                      ? "published"
                      : "draft"
                  }`}
                >
                  {course.status}
                </span>

              </div>


              <div className="course-content">

                <span className="course-category">
                  {course.category}
                </span>

                <h2>
                  {course.title}
                </h2>

                <p>
                  {course.description}
                </p>


                <div className="course-meta">

                  <span>
                    <b>▶</b>
                    {course.lectures} Lectures
                  </span>

                  <span>
                    <b>♙</b>
                    {course.students} Students
                  </span>

                  <span>
                    <b>◷</b>
                    {course.duration}
                  </span>

                </div>


                <div className="course-footer">

                  <Link
                    to="/teacher/courses"
                    className="manage-course"
                  >
                    Manage Course
                  </Link>


                  <div className="course-actions">

                    <button
                      type="button"
                      title="Edit"
                      onClick={() =>
                        alert(
                          "Course editing will be connected next."
                        )
                      }
                    >
                      ✎
                    </button>

                    <button
                      type="button"
                      title="Delete"
                      onClick={() =>
                        deleteCourse(course.id)
                      }
                    >
                      🗑
                    </button>

                  </div>

                </div>

              </div>

            </article>

          ))}

        </div>

      )}


      {/* =========================
          BOTTOM INFO
      ========================= */}

      <div className="courses-bottom-info">

        <div>

          <span className="info-icon">
            💡
          </span>

          <div>

            <strong>
              Build a great course
            </strong>

            <p>
              Add clear lectures, useful resources and
              quizzes to give students a better learning
              experience.
            </p>

          </div>

        </div>


        <Link to="/teacher/dashboard">
          ← Back to Dashboard
        </Link>

      </div>

    </div>
  );
}
