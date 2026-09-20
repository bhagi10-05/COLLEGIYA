import React, { useEffect, useMemo, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import "./lectures.css";

const API_BASE_URL =
  import.meta.env.VITE_API_URL ||
  "http://localhost:5000/api";

const emptyForm = {
  title: "",
  course: "",
  type: "Video",
  videoSource: "youtube",
  duration: "",
  videoUrl: "",
  notesUrl: "",
  resourceUrl: "",
  description: "",
  chapter: "Chapter 01",
  order: 1,
  status: "Draft",
};

const getStatus = (published) =>
  published ? "Published" : "Draft";

const getYoutubeId = (url = "") => {
  const value = url.trim();

  if (!value) return "";

  const patterns = [
    /youtube\.com\/watch\?v=([^&]+)/i,
    /youtu\.be\/([^?&]+)/i,
    /youtube\.com\/embed\/([^?&]+)/i,
    /youtube\.com\/shorts\/([^?&]+)/i,
  ];

  for (const pattern of patterns) {
    const match = value.match(pattern);

    if (match?.[1]) {
      return match[1];
    }
  }

  return "";
};

const getYoutubeEmbed = (url = "") => {
  const id = getYoutubeId(url);

  return id ? `https://www.youtube.com/embed/${id}` : "";
};

const getLectureNumber = (lecture, index) => {
  const number = Number(lecture?.order);

  if (Number.isFinite(number) && number > 0) {
    return String(number).padStart(2, "0");
  }

  return String(index + 1).padStart(2, "0");
};

export default function Lectures() {
  const [searchParams] = useSearchParams();

  const [courses, setCourses] = useState([]);
  const [lectures, setLectures] = useState([]);

  const [selectedCourse, setSelectedCourse] = useState(
    searchParams.get("course") || "All"
  );

  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("All");

  const [showForm, setShowForm] = useState(false);
  const [editingLecture, setEditingLecture] = useState(null);

  const [form, setForm] = useState(emptyForm);

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const [uploadingVideo, setUploadingVideo] = useState(false);
  const [uploadingNotes, setUploadingNotes] = useState(false);

  const [error, setError] = useState("");

  const loadData = async () => {
    try {
      setLoading(true);
      setError("");

      const response = await fetch(
        `${API_BASE_URL}/courses?all=true`
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.message || "Failed to load courses."
        );
      }

      const courseList = Array.isArray(data)
        ? data
        : data.courses || data.data || [];

      setCourses(courseList);

      const flattened = [];

      courseList.forEach((course) => {
        const lessons = Array.isArray(course.lessons)
          ? course.lessons
          : [];

        lessons.forEach((lesson) => {
          flattened.push({
            ...lesson,
            lessonId: lesson._id,
            courseId: course._id,
            courseTitle: course.title,
            courseCategory: course.category,
          });
        });
      });

      flattened.sort(
        (a, b) =>
          Number(a.order || 0) - Number(b.order || 0)
      );

      setLectures(flattened);
    } catch (err) {
      console.error(err);
      setError(
        err.message || "Unable to load lecture data."
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  useEffect(() => {
    const courseFromUrl = searchParams.get("course");

    if (courseFromUrl) {
      setSelectedCourse(courseFromUrl);
    }
  }, [searchParams]);

  const totalLectures = lectures.length;

  const publishedLectures = lectures.filter(
    (lecture) => lecture.published
  ).length;

  const draftLectures = lectures.filter(
    (lecture) => !lecture.published
  ).length;

  const totalCourses = courses.length;

  const filteredLectures = useMemo(() => {
    const searchText = search.trim().toLowerCase();

    return lectures
      .filter((lecture) => {
        const matchesCourse =
          selectedCourse === "All" ||
          lecture.courseId === selectedCourse;

        const matchesSearch =
          !searchText ||
          lecture.title
            ?.toLowerCase()
            .includes(searchText) ||
          lecture.courseTitle
            ?.toLowerCase()
            .includes(searchText) ||
          lecture.chapter
            ?.toLowerCase()
            .includes(searchText) ||
          lecture.description
            ?.toLowerCase()
            .includes(searchText);

        const status = getStatus(lecture.published);

        const matchesFilter =
          filter === "All" || status === filter;

        return (
          matchesCourse &&
          matchesSearch &&
          matchesFilter
        );
      })
      .sort(
        (a, b) =>
          Number(a.order || 0) -
          Number(b.order || 0)
      );
  }, [
    lectures,
    search,
    selectedCourse,
    filter,
  ]);

  const handleChange = (event) => {
    const { name, value } = event.target;

    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const openCreateForm = () => {
    const firstCourse =
      selectedCourse !== "All"
        ? selectedCourse
        : courses[0]?._id || "";

    setEditingLecture(null);

    setForm({
      ...emptyForm,
      course: firstCourse,
      order:
        lectures.filter(
          (lecture) => lecture.courseId === firstCourse
        ).length + 1,
    });

    setError("");
    setShowForm(true);
  };

  const openEditForm = (lecture) => {
    setEditingLecture(lecture);

    setForm({
      title: lecture.title || "",
      course: lecture.courseId || "",
      type: lecture.type || "Video",
      videoSource:
        lecture.videoSource || "youtube",
      duration: lecture.duration || "",
      videoUrl: lecture.videoUrl || "",
      notesUrl: lecture.notesUrl || "",
      resourceUrl: lecture.resourceUrl || "",
      description: lecture.description || "",
      chapter: lecture.chapter || "Chapter 01",
      order: lecture.order || 1,
      status: lecture.published
        ? "Published"
        : "Draft",
    });

    setError("");
    setShowForm(true);
  };

  const closeForm = () => {
    if (saving) return;

    setShowForm(false);
    setEditingLecture(null);
    setForm(emptyForm);
  };

  const uploadFile = async (file, kind) => {
    if (!file) return;

    if (file.size > 100 * 1024 * 1024) {
      alert("Maximum file size is 100MB.");
      return;
    }

    const formData = new FormData();
    formData.append("file", file);

    try {
      if (kind === "video") {
        setUploadingVideo(true);
      } else {
        setUploadingNotes(true);
      }

      const response = await fetch(
        `${API_BASE_URL}/upload`,
        {
          method: "POST",
          body: formData,
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.message || "Upload failed."
        );
      }

      const url =
        data?.file?.url ||
        data?.url ||
        data?.secure_url ||
        "";

      if (!url) {
        throw new Error(
          "Upload succeeded but no file URL was returned."
        );
      }

      if (kind === "video") {
        setForm((prev) => ({
          ...prev,
          videoUrl: url,
          videoSource: "upload",
        }));
      } else {
        setForm((prev) => ({
          ...prev,
          notesUrl: url,
        }));
      }
    } catch (err) {
      console.error(err);
      alert(
        err.message || "File upload failed."
      );
    } finally {
      if (kind === "video") {
        setUploadingVideo(false);
      } else {
        setUploadingNotes(false);
      }
    }
  };

  const saveLecture = async (event) => {
    event.preventDefault();

    if (!form.title.trim()) {
      alert("Please enter lecture title.");
      return;
    }

    if (!form.course) {
      alert("Please select a course.");
      return;
    }

    if (!form.description.trim()) {
      alert("Please enter lecture description.");
      return;
    }

    try {
      setSaving(true);
      setError("");

      const payload = {
        title: form.title.trim(),
        chapter:
          form.chapter.trim() || "Chapter 01",
        description: form.description.trim(),
        type: form.type,
        videoUrl: form.videoUrl.trim(),
        notesUrl: form.notesUrl.trim(),
        resourceUrl: form.resourceUrl.trim(),
        duration:
          form.duration.trim() || "00:00",
        order:
          Number(form.order) > 0
            ? Number(form.order)
            : 1,
        published:
          form.status === "Published",
      };

      let url = `${API_BASE_URL}/courses/${form.course}/lessons`;
      let method = "POST";

      if (editingLecture) {
        url = `${API_BASE_URL}/courses/${form.course}/lessons/${editingLecture.lessonId}`;
        method = "PUT";
      }

      const response = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.message || "Unable to save lecture."
        );
      }

      setShowForm(false);
      setEditingLecture(null);
      setForm(emptyForm);

      await loadData();
    } catch (err) {
      console.error(err);

      setError(
        err.message || "Unable to save lecture."
      );

      alert(
        err.message || "Unable to save lecture."
      );
    } finally {
      setSaving(false);
    }
  };

  const deleteLecture = async (lecture) => {
    const confirmed = window.confirm(
      `Delete "${lecture.title}" from ${lecture.courseTitle}?`
    );

    if (!confirmed) return;

    try {
      setError("");

      const response = await fetch(
        `${API_BASE_URL}/courses/${lecture.courseId}/lessons/${lecture.lessonId}`,
        {
          method: "DELETE",
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.message || "Unable to delete lecture."
        );
      }

      await loadData();
    } catch (err) {
      console.error(err);

      setError(
        err.message || "Unable to delete lecture."
      );

      alert(
        err.message || "Unable to delete lecture."
      );
    }
  };

  const updateLectureOrder = async (
    lecture,
    targetLecture
  ) => {
    if (!targetLecture) return;

    try {
      setError("");

      const firstOrder = Number(
        lecture.order || 1
      );

      const secondOrder = Number(
        targetLecture.order || 1
      );

      await Promise.all([
        fetch(
          `${API_BASE_URL}/courses/${lecture.courseId}/lessons/${lecture.lessonId}`,
          {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              order: secondOrder,
            }),
          }
        ),
        fetch(
          `${API_BASE_URL}/courses/${targetLecture.courseId}/lessons/${targetLecture.lessonId}`,
          {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              order: firstOrder,
            }),
          }
        ),
      ]);

      await loadData();
    } catch (err) {
      console.error(err);

      setError(
        err.message || "Unable to reorder lectures."
      );
    }
  };

  const moveLecture = async (
    lecture,
    direction
  ) => {
    const sameCourse = lectures
      .filter(
        (item) =>
          item.courseId === lecture.courseId
      )
      .sort(
        (a, b) =>
          Number(a.order || 0) -
          Number(b.order || 0)
      );

    const currentIndex = sameCourse.findIndex(
      (item) =>
        item.lessonId === lecture.lessonId
    );

    if (currentIndex === -1) return;

    const targetIndex =
      direction === "up"
        ? currentIndex - 1
        : currentIndex + 1;

    if (
      targetIndex < 0 ||
      targetIndex >= sameCourse.length
    ) {
      return;
    }

    await updateLectureOrder(
      lecture,
      sameCourse[targetIndex]
    );
  };

  const getCourseName = (courseId) => {
    return (
      courses.find(
        (course) => course._id === courseId
      )?.title || "Unknown Course"
    );
  };

  return (
    <div className="teacher-lectures-page">
      <div className="lectures-header">
        <div className="lectures-heading">
          <span className="lectures-eyebrow">
            TEACHING
          </span>

          <h1>My Lectures</h1>

          <p>
            Create, organize and manage your course
            lectures from one place.
          </p>
        </div>

        <button
          type="button"
          className="add-lecture-btn"
          onClick={openCreateForm}
          disabled={courses.length === 0}
        >
          <span>＋</span>
          Add Lecture
        </button>
      </div>

      <div className="lecture-stat-grid">
        <div className="lecture-stat-card">
          <div className="lecture-stat-icon blue">
            📚
          </div>

          <div>
            <span>Total Lectures</span>
            <strong>{totalLectures}</strong>
          </div>
        </div>

        <div className="lecture-stat-card">
          <div className="lecture-stat-icon green">
            ✓
          </div>

          <div>
            <span>Published</span>
            <strong>{publishedLectures}</strong>
          </div>
        </div>

        <div className="lecture-stat-card">
          <div className="lecture-stat-icon orange">
            ◷
          </div>

          <div>
            <span>Draft</span>
            <strong>{draftLectures}</strong>
          </div>
        </div>

        <div className="lecture-stat-card">
          <div className="lecture-stat-icon purple">
            🎓
          </div>

          <div>
            <span>Total Courses</span>
            <strong>{totalCourses}</strong>
          </div>
        </div>
      </div>

      <div className="lectures-toolbar">
        <div className="lecture-search">
          <span>⌕</span>

          <input
            type="text"
            placeholder="Search lectures, courses..."
            value={search}
            onChange={(event) =>
              setSearch(event.target.value)
            }
          />
        </div>

        <div className="lecture-course-select">
          <select
            value={selectedCourse}
            onChange={(event) =>
              setSelectedCourse(event.target.value)
            }
          >
            <option value="All">
              All Courses
            </option>

            {courses.map((course) => (
              <option
                key={course._id}
                value={course._id}
              >
                {course.title}
              </option>
            ))}
          </select>
        </div>

        <div className="lecture-filters">
          {["All", "Published", "Draft"].map(
            (item) => (
              <button
                key={item}
                type="button"
                className={
                  filter === item ? "active" : ""
                }
                onClick={() =>
                  setFilter(item)
                }
              >
                {item}
              </button>
            )
          )}
        </div>
      </div>

      {error && (
        <div className="lectures-error">
          <span>!</span>
          <p>{error}</p>

          <button
            type="button"
            onClick={loadData}
          >
            Retry
          </button>
        </div>
      )}

      {loading ? (
        <div className="lectures-loading">
          <div className="lecture-loader" />
          <h3>Loading lectures...</h3>
          <p>
            Please wait while your lectures are
            being loaded.
          </p>
        </div>
      ) : courses.length === 0 ? (
        <div className="lectures-empty">
          <div className="empty-lecture-icon">
            📚
          </div>

          <span className="empty-label">
            NO COURSES
          </span>

          <h2>Create a course first</h2>

          <p>
            You need at least one course before
            adding lectures.
          </p>

          <Link
            to="/teacher/courses"
            className="empty-create-btn"
          >
            <span>＋</span>
            Create Course
          </Link>
        </div>
      ) : filteredLectures.length === 0 ? (
        <div className="lectures-empty">
          <div className="empty-lecture-icon">
            🎬
          </div>

          <span className="empty-label">
            {lectures.length === 0
              ? "NO LECTURES YET"
              : "NO RESULTS"}
          </span>

          <h2>
            {lectures.length === 0
              ? "Add your first lecture"
              : "No lectures found"}
          </h2>

          <p>
            {lectures.length === 0
              ? "Start building your course by adding video lessons, notes and resources."
              : "Try changing your search, course or status filter."}
          </p>

          {lectures.length === 0 && (
            <button
              type="button"
              className="empty-create-btn"
              onClick={openCreateForm}
            >
              <span>＋</span>
              Add First Lecture
            </button>
          )}
        </div>
      ) : (
        <div className="lecture-list">
          {filteredLectures.map(
            (lecture, index) => {
              const youtubeEmbed =
                getYoutubeEmbed(
                  lecture.videoUrl
                );

              const sameCourseLectures =
                lectures
                  .filter(
                    (item) =>
                      item.courseId ===
                      lecture.courseId
                  )
                  .sort(
                    (a, b) =>
                      Number(a.order || 0) -
                      Number(b.order || 0)
                  );

              const sameCourseIndex =
                sameCourseLectures.findIndex(
                  (item) =>
                    item.lessonId ===
                    lecture.lessonId
                );

              const canMoveUp =
                sameCourseIndex > 0;

              const canMoveDown =
                sameCourseIndex <
                sameCourseLectures.length - 1;

              return (
                <article
                  className="lecture-card"
                  key={
                    lecture.lessonId ||
                    `${lecture.courseId}-${index}`
                  }
                >
                  <div className="lecture-thumbnail">
                    {youtubeEmbed ? (
                      <iframe
                        src={youtubeEmbed}
                        title={lecture.title}
                        loading="lazy"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                      />
                    ) : lecture.videoUrl ? (
                      <video
                        src={lecture.videoUrl}
                        controls
                        preload="metadata"
                      />
                    ) : (
                      <div className="lecture-placeholder">
                        <span>▶</span>
                        <small>
                          No preview available
                        </small>
                      </div>
                    )}

                    <div className="lecture-number">
                      {getLectureNumber(
                        lecture,
                        index
                      )}
                    </div>

                    <span
                      className={`lecture-status ${
                        lecture.published
                          ? "published"
                          : "draft"
                      }`}
                    >
                      {lecture.published
                        ? "Published"
                        : "Draft"}
                    </span>

                    <span className="lecture-type">
                      {lecture.type ===
                      "Video"
                        ? "🎥"
                        : lecture.type ===
                          "PDF"
                        ? "📄"
                        : "📘"}{" "}
                      {lecture.type ||
                        "Video"}
                    </span>
                  </div>

                  <div className="lecture-content">
                    <div className="lecture-topline">
                      <span className="lecture-course">
                        {lecture.courseTitle ||
                          getCourseName(
                            lecture.courseId
                          )}
                      </span>

                      <span className="lecture-chapter">
                        {lecture.chapter ||
                          "Chapter 01"}
                      </span>
                    </div>

                    <h2>
                      {lecture.title}
                    </h2>

                    <p>
                      {lecture.description ||
                        "No lecture description added yet."}
                    </p>

                    <div className="lecture-meta">
                      <span>
                        <b>◷</b>
                        {lecture.duration ||
                          "00:00"}
                      </span>

                      <span>
                        <b>🎥</b>
                        {lecture.type ||
                          "Video"}
                      </span>

                      <span>
                        <b>№</b>
                        Lecture{" "}
                        {getLectureNumber(
                          lecture,
                          index
                        )}
                      </span>
                    </div>

                    <div className="lecture-footer">
                      <div className="lecture-main-actions">
                        {lecture.videoUrl && (
                          <a
                            href={
                              lecture.videoUrl
                            }
                            target="_blank"
                            rel="noreferrer"
                            className="manage-lecture watch"
                          >
                            <span>▶</span>
                            Watch
                          </a>
                        )}

                        {lecture.notesUrl && (
                          <a
                            href={
                              lecture.notesUrl
                            }
                            target="_blank"
                            rel="noreferrer"
                            className="manage-lecture resource"
                          >
                            <span>📄</span>
                            Notes
                          </a>
                        )}

                        {lecture.resourceUrl && (
                          <a
                            href={
                              lecture.resourceUrl
                            }
                            target="_blank"
                            rel="noreferrer"
                            className="manage-lecture resource"
                          >
                            <span>🔗</span>
                            Resource
                          </a>
                        )}
                      </div>

                      <div className="lecture-actions">
                        <button
                          type="button"
                          title="Move up"
                          disabled={!canMoveUp}
                          onClick={() =>
                            moveLecture(
                              lecture,
                              "up"
                            )
                          }
                        >
                          ↑
                        </button>

                        <button
                          type="button"
                          title="Move down"
                          disabled={!canMoveDown}
                          onClick={() =>
                            moveLecture(
                              lecture,
                              "down"
                            )
                          }
                        >
                          ↓
                        </button>

                        <button
                          type="button"
                          title="Edit lecture"
                          onClick={() =>
                            openEditForm(
                              lecture
                            )
                          }
                        >
                          ✎
                        </button>

                        <button
                          type="button"
                          title="Delete lecture"
                          className="delete"
                          onClick={() =>
                            deleteLecture(
                              lecture
                            )
                          }
                        >
                          🗑
                        </button>
                      </div>
                    </div>
                  </div>
                </article>
              );
            }
          )}
        </div>
      )}

      <div className="lectures-bottom-info">
        <div>
          <span className="info-icon">
            💡
          </span>

          <div>
            <strong>
              Build better lessons
            </strong>

            <p>
              Add clear titles, useful notes,
              videos and resources to give
              students a better learning
              experience.
            </p>
          </div>
        </div>

        <Link to="/teacher/courses">
          ← Back to Courses
        </Link>
      </div>

      {showForm && (
        <div className="lecture-form-overlay">
          <div className="lecture-form-card">
            <div className="lecture-form-header">
              <div>
                <span>
                  {editingLecture
                    ? "EDIT LECTURE"
                    : "NEW LECTURE"}
                </span>

                <h2>
                  {editingLecture
                    ? "Edit Lecture"
                    : "Add Lecture"}
                </h2>

                <p>
                  Add lesson content and
                  learning resources.
                </p>
              </div>

              <button
                type="button"
                className="lecture-form-close"
                onClick={closeForm}
              >
                ×
              </button>
            </div>

            <form onSubmit={saveLecture}>
              <div className="lecture-form-grid">
                <div className="lecture-form-group full">
                  <label>
                    Lecture Title *
                  </label>

                  <input
                    name="title"
                    type="text"
                    placeholder="e.g. Introduction to React"
                    value={form.title}
                    onChange={handleChange}
                  />
                </div>

                <div className="lecture-form-group">
                  <label>
                    Course *
                  </label>

                  <select
                    name="course"
                    value={form.course}
                    onChange={handleChange}
                  >
                    <option value="">
                      Select Course
                    </option>

                    {courses.map(
                      (course) => (
                        <option
                          key={course._id}
                          value={
                            course._id
                          }
                        >
                          {course.title}
                        </option>
                      )
                    )}
                  </select>
                </div>

                <div className="lecture-form-group">
                  <label>
                    Chapter
                  </label>

                  <input
                    name="chapter"
                    type="text"
                    placeholder="Chapter 01"
                    value={form.chapter}
                    onChange={handleChange}
                  />
                </div>

                <div className="lecture-form-group">
                  <label>
                    Lecture Type
                  </label>

                  <select
                    name="type"
                    value={form.type}
                    onChange={handleChange}
                  >
                    <option value="Video">
                      Video
                    </option>
                    <option value="Article">
                      Article
                    </option>
                    <option value="PDF">
                      PDF
                    </option>
                    <option value="Live Class">
                      Live Class
                    </option>
                  </select>
                </div>

                <div className="lecture-form-group">
                  <label>
                    Duration
                  </label>

                  <input
                    name="duration"
                    type="text"
                    placeholder="e.g. 36:00"
                    value={form.duration}
                    onChange={handleChange}
                  />
                </div>

                <div className="lecture-form-group">
                  <label>
                    Lecture Order
                  </label>

                  <input
                    name="order"
                    type="number"
                    min="1"
                    value={form.order}
                    onChange={handleChange}
                  />
                </div>

                <div className="lecture-form-group">
                  <label>
                    Status
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

                <div className="lecture-form-group full">
                  <label>
                    Video URL
                  </label>

                  <div className="lecture-input-row">
                    <input
                      name="videoUrl"
                      type="url"
                      placeholder="YouTube or video URL"
                      value={form.videoUrl}
                      onChange={
                        handleChange
                      }
                    />

                    <label className="upload-button">
                      {uploadingVideo
                        ? "Uploading..."
                        : "Upload Video"}

                      <input
                        type="file"
                        accept="video/mp4,video/webm,video/quicktime"
                        hidden
                        disabled={
                          uploadingVideo
                        }
                        onChange={(event) =>
                          uploadFile(
                            event.target
                              .files?.[0],
                            "video"
                          )
                        }
                      />
                    </label>
                  </div>
                </div>

                <div className="lecture-form-group full">
                  <label>
                    Notes / PDF URL
                  </label>

                  <div className="lecture-input-row">
                    <input
                      name="notesUrl"
                      type="url"
                      placeholder="https://..."
                      value={form.notesUrl}
                      onChange={
                        handleChange
                      }
                    />

                    <label className="upload-button">
                      {uploadingNotes
                        ? "Uploading..."
                        : "Upload Notes"}

                      <input
                        type="file"
                        accept=".pdf,image/jpeg,image/png,image/webp"
                        hidden
                        disabled={
                          uploadingNotes
                        }
                        onChange={(event) =>
                          uploadFile(
                            event.target
                              .files?.[0],
                            "notes"
                          )
                        }
                      />
                    </label>
                  </div>
                </div>

                <div className="lecture-form-group full">
                  <label>
                    Resource URL
                  </label>

                  <input
                    name="resourceUrl"
                    type="url"
                    placeholder="Optional external resource URL"
                    value={
                      form.resourceUrl
                    }
                    onChange={
                      handleChange
                    }
                  />
                </div>

                <div className="lecture-form-group full">
                  <label>
                    Description *
                  </label>

                  <textarea
                    name="description"
                    rows="5"
                    placeholder="Write a useful description for students..."
                    value={
                      form.description
                    }
                    onChange={
                      handleChange
                    }
                  />
                </div>
              </div>

              <div className="lecture-form-actions">
                <button
                  type="button"
                  className="lecture-cancel-btn"
                  onClick={closeForm}
                  disabled={saving}
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  className="lecture-save-btn"
                  disabled={
                    saving ||
                    uploadingVideo ||
                    uploadingNotes
                  }
                >
                  {saving
                    ? "Saving..."
                    : editingLecture
                    ? "Update Lecture"
                    : "Create Lecture"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
