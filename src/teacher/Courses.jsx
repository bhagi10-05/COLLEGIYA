import React, {
  useEffect,
  useMemo,
  useState,
} from "react";
import { Link, useNavigate } from "react-router-dom";
import "./courses.css";

const API_BASE_URL =
  import.meta.env.VITE_API_URL ||
  "http://localhost:5000/api";

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
  const navigate = useNavigate();

  const [courses, setCourses] = useState([]);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("All");
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState(emptyForm);

  const [editingCourse, setEditingCourse] =
    useState(null);

  const [loading, setLoading] =
    useState(true);

  const [saving, setSaving] =
    useState(false);

  const [error, setError] =
    useState("");

  // =====================================
  // LOAD COURSES
  // =====================================
  const loadCourses = async () => {
    try {
      setLoading(true);
      setError("");

      const response = await fetch(
        `${API_BASE_URL}/courses?all=true`
      );

      const data = await response.json();

      if (!response.ok || !data.success) {
        throw new Error(
          data.message ||
            "Unable to load courses."
        );
      }

      const mappedCourses =
        (data.courses || []).map(
          (course) => ({
            id: course._id,

            title:
              course.title || "",

            category:
              course.category ||
              "General",

            description:
              course.description ||
              "",

            duration:
              course.duration ||
              "Not added",

            lectures:
              Array.isArray(course.lessons)
                ? course.lessons.length
                : Number(
                    course.plannedLectures
                  ) || 0,

            students:
              Number(course.students) || 0,

            status:
              course.published
                ? "Published"
                : "Draft",

            thumbnail:
              course.thumbnail || "",

            level:
              course.level ||
              "Beginner",

            instructor:
              course.instructor ||
              "COLLEGIYA Faculty",

            raw: course,
          })
        );

      setCourses(mappedCourses);
    } catch (err) {
      console.error(
        "Load courses error:",
        err
      );

      setError(
        err.message ||
          "Unable to load courses."
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadCourses();
  }, []);

  // =====================================
  // FILTERED COURSES
  // =====================================
  const filteredCourses = useMemo(() => {
    return courses.filter((course) => {
      const searchText =
        search.toLowerCase();

      const matchesSearch =
        course.title
          .toLowerCase()
          .includes(searchText) ||
        course.category
          .toLowerCase()
          .includes(searchText);

      const matchesFilter =
        filter === "All" ||
        course.status === filter;

      return (
        matchesSearch &&
        matchesFilter
      );
    });
  }, [
    courses,
    search,
    filter,
  ]);

  // =====================================
  // STATS
  // =====================================
  const totalCourses =
    courses.length;

  const publishedCourses =
    courses.filter(
      (course) =>
        course.status === "Published"
    ).length;

  const draftCourses =
    courses.filter(
      (course) =>
        course.status === "Draft"
    ).length;

  const totalStudents =
    courses.reduce(
      (total, course) =>
        total + course.students,
      0
    );

  // =====================================
  // FORM CHANGE
  // =====================================
  const handleChange = (e) => {
    const {
      name,
      value,
    } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // =====================================
  // OPEN CREATE FORM
  // =====================================
  const openCreateForm = () => {
    setEditingCourse(null);
    setForm(emptyForm);
    setError("");
    setShowForm(true);
  };

  // =====================================
  // OPEN EDIT FORM
  // =====================================
  const openEditForm = (course) => {
    setEditingCourse(course);

    setForm({
      title:
        course.title || "",

      category:
        course.category || "",

      description:
        course.description || "",

      duration:
        course.duration ===
        "Not added"
          ? ""
          : course.duration || "",

      lectures:
        course.lectures || 0,

      status:
        course.status || "Draft",

      thumbnail:
        course.thumbnail || "",
    });

    setError("");
    setShowForm(true);
  };

  // =====================================
  // CLOSE FORM
  // =====================================
  const closeCreateForm = () => {
    if (saving) return;

    setShowForm(false);
    setEditingCourse(null);
    setForm(emptyForm);
    setError("");
  };

  // =====================================
  // CREATE / UPDATE COURSE
  // =====================================
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.title.trim()) {
      alert(
        "Please enter course title."
      );
      return;
    }

    if (!form.category.trim()) {
      alert(
        "Please enter course category."
      );
      return;
    }

    if (!form.description.trim()) {
      alert(
        "Please enter course description."
      );
      return;
    }

    try {
      setSaving(true);
      setError("");

      const isEditing =
        Boolean(editingCourse);

      const url = isEditing
        ? `${API_BASE_URL}/courses/${editingCourse.id}`
        : `${API_BASE_URL}/courses`;

      const method = isEditing
        ? "PUT"
        : "POST";

      const body = {
        title:
          form.title.trim(),

        category:
          form.category.trim(),

        description:
          form.description.trim(),

        duration:
          form.duration.trim() ||
          "Not added",

        plannedLectures:
          Number(form.lectures) || 0,

        thumbnail:
          form.thumbnail.trim(),

        published:
          form.status ===
          "Published",
      };

      const response =
        await fetch(url, {
          method,

          headers: {
            "Content-Type":
              "application/json",
          },

          body: JSON.stringify(body),
        });

      const data =
        await response.json();

      if (
        !response.ok ||
        !data.success
      ) {
        throw new Error(
          data.message ||
            "Unable to save course."
        );
      }

      setShowForm(false);
      setEditingCourse(null);
      setForm(emptyForm);

      await loadCourses();

      alert(
        isEditing
          ? "Course updated successfully."
          : "Course created successfully."
      );
    } catch (err) {
      console.error(
        "Save course error:",
        err
      );

      setError(
        err.message ||
          "Unable to save course."
      );
    } finally {
      setSaving(false);
    }
  };

  // =====================================
  // DELETE COURSE
  // =====================================
  const deleteCourse = async (id) => {
    const confirmed =
      window.confirm(
        "Are you sure you want to delete this course?\n\nAll lectures inside this course will also be removed."
      );

    if (!confirmed) return;

    try {
      setError("");

      const response =
        await fetch(
          `${API_BASE_URL}/courses/${id}`,
          {
            method: "DELETE",
          }
        );

      const data =
        await response.json();

      if (
        !response.ok ||
        !data.success
      ) {
        throw new Error(
          data.message ||
            "Unable to delete course."
        );
      }

      setCourses((prev) =>
        prev.filter(
          (course) =>
            course.id !== id
        )
      );

      alert(
        "Course deleted successfully."
      );
    } catch (err) {
      console.error(
        "Delete course error:",
        err
      );

      setError(
        err.message ||
          "Unable to delete course."
      );
    }
  };

  // =====================================
  // MANAGE COURSE
  // =====================================
  const manageCourse = (course) => {
    navigate(
      `/teacher/lectures?course=${course.id}`
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
            Create, manage and organize all
            your courses from one place.
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
          ERROR
      ========================= */}

      {error && !showForm && (
        <div
          style={{
            marginBottom: "20px",
            padding: "14px 16px",
            borderRadius: "12px",
            background:
              "#fff1f2",
            color: "#be123c",
            border:
              "1px solid #fecdd3",
            fontSize: "14px",
          }}
        >
          {error}
        </div>
      )}

      {/* =========================
          STATS
      ========================= */}

      <div className="course-stat-grid">

        <div className="course-stat-card">
          <div className="course-stat-icon blue">
            📚
          </div>

          <div>
            <span>
              Total Courses
            </span>

            <strong>
              {loading
                ? "..."
                : totalCourses}
            </strong>
          </div>
        </div>

        <div className="course-stat-card">
          <div className="course-stat-icon green">
            ✓
          </div>

          <div>
            <span>
              Published
            </span>

            <strong>
              {loading
                ? "..."
                : publishedCourses}
            </strong>
          </div>
        </div>

        <div className="course-stat-card">
          <div className="course-stat-icon orange">
            ◷
          </div>

          <div>
            <span>
              Draft Courses
            </span>

            <strong>
              {loading
                ? "..."
                : draftCourses}
            </strong>
          </div>
        </div>

        <div className="course-stat-card">
          <div className="course-stat-icon purple">
            ♙
          </div>

          <div>
            <span>
              Total Students
            </span>

            <strong>
              {loading
                ? "..."
                : totalStudents}
            </strong>
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
            onChange={(e) =>
              setSearch(
                e.target.value
              )
            }
          />
        </div>

        <div className="course-filters">

          {[
            "All",
            "Published",
            "Draft",
          ].map((item) => (
            <button
              key={item}
              type="button"
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
            </button>
          ))}

        </div>

      </div>

      {/* =========================
          CREATE / EDIT FORM
      ========================= */}

      {showForm && (
        <div className="course-form-overlay">

          <div className="course-form-card">

            <div className="course-form-header">

              <div>
                <span>
                  {editingCourse
                    ? "EDIT COURSE"
                    : "NEW COURSE"}
                </span>

                <h2>
                  {editingCourse
                    ? "Edit Course"
                    : "Create Course"}
                </h2>

                <p>
                  {editingCourse
                    ? "Update your course information."
                    : "Add basic information about your course."}
                </p>
              </div>

              <button
                type="button"
                className="course-form-close"
                onClick={
                  closeCreateForm
                }
                disabled={saving}
              >
                ×
              </button>

            </div>

            {error && (
              <div
                style={{
                  margin:
                    "0 24px 18px",
                  padding:
                    "12px 14px",
                  borderRadius:
                    "10px",
                  background:
                    "#fff1f2",
                  color:
                    "#be123c",
                  border:
                    "1px solid #fecdd3",
                  fontSize:
                    "14px",
                }}
              >
                {error}
              </div>
            )}

            <form
              onSubmit={
                handleSubmit
              }
            >

              <div className="course-form-grid">

                <div className="course-form-group full">
                  <label>
                    Course Title *
                  </label>

                  <input
                    name="title"
                    type="text"
                    placeholder="e.g. Complete React JS Course"
                    value={
                      form.title
                    }
                    onChange={
                      handleChange
                    }
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
                    value={
                      form.category
                    }
                    onChange={
                      handleChange
                    }
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
                    value={
                      form.duration
                    }
                    onChange={
                      handleChange
                    }
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
                    value={
                      form.lectures
                    }
                    onChange={
                      handleChange
                    }
                  />

                </div>

                <div className="course-form-group">

                  <label>
                    Course Status
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
                    value={
                      form.thumbnail
                    }
                    onChange={
                      handleChange
                    }
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
                    value={
                      form.description
                    }
                    onChange={
                      handleChange
                    }
                  />

                </div>

              </div>

              <div className="course-form-actions">

                <button
                  type="button"
                  className="course-cancel-btn"
                  onClick={
                    closeCreateForm
                  }
                  disabled={saving}
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  className="course-save-btn"
                  disabled={saving}
                >
                  {saving
                    ? "Saving..."
                    : editingCourse
                    ? "Update Course"
                    : "Create Course"}
                </button>

              </div>

            </form>

          </div>

        </div>
      )}

      {/* =========================
          LOADING
      ========================= */}

      {loading ? (

        <div className="courses-empty">

          <div className="empty-illustration">
            <div className="empty-book">
              ⏳
            </div>
          </div>

          <span className="empty-label">
            LOADING COURSES
          </span>

          <h2>
            Loading your courses...
          </h2>

          <p>
            Please wait while we fetch your
            courses from COLLEGIYA.
          </p>

        </div>

      ) : filteredCourses.length === 0 ? (

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
              onClick={
                openCreateForm
              }
            >
              <span>＋</span>
              Create Your First Course
            </button>
          )}

        </div>

      ) : (

        <div className="course-list">

          {filteredCourses.map(
            (course) => (

              <article
                className="course-card"
                key={course.id}
              >

                <div className="course-thumbnail">

                  {course.thumbnail ? (
                    <img
                      src={
                        course.thumbnail
                      }
                      alt={
                        course.title
                      }
                    />
                  ) : (
                    <div className="thumbnail-placeholder">
                      <span>
                        📚
                      </span>
                    </div>
                  )}

                  <span
                    className={`course-status ${
                      course.status ===
                      "Published"
                        ? "published"
                        : "draft"
                    }`}
                  >
                    {
                      course.status
                    }
                  </span>

                </div>

                <div className="course-content">

                  <span className="course-category">
                    {
                      course.category
                    }
                  </span>

                  <h2>
                    {course.title}
                  </h2>

                  <p>
                    {
                      course.description
                    }
                  </p>

                  <div className="course-meta">

                    <span>
                      <b>▶</b>
                      {
                        course.lectures
                      }{" "}
                      Lectures
                    </span>

                    <span>
                      <b>♙</b>
                      {
                        course.students
                      }{" "}
                      Students
                    </span>

                    <span>
                      <b>◷</b>
                      {
                        course.duration
                      }
                    </span>

                  </div>

                  <div className="course-footer">

                    <button
                      type="button"
                      className="manage-course"
                      onClick={() =>
                        manageCourse(
                          course
                        )
                      }
                    >
                      Manage Course
                    </button>

                    <div className="course-actions">

                      <button
                        type="button"
                        title="Edit"
                        onClick={() =>
                          openEditForm(
                            course
                          )
                        }
                      >
                        ✎
                      </button>

                      <button
                        type="button"
                        title="Delete"
                        onClick={() =>
                          deleteCourse(
                            course.id
                          )
                        }
                      >
                        🗑
                      </button>

                    </div>

                  </div>

                </div>

              </article>

            )
          )}

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
              Add clear lectures, useful
              resources and quizzes to give
              students a better learning
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
