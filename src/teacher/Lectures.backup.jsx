import React, {
  useEffect,
  useMemo,
  useState,
} from "react";
import {
  Link,
  useSearchParams,
} from "react-router-dom";
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

const getYouTubeEmbedUrl = (
  url
) => {
  if (!url) return "";

  try {
    const parsed =
      new URL(url);

    if (
      parsed.hostname.includes(
        "youtube.com"
      )
    ) {
      const id =
        parsed.searchParams.get(
          "v"
        );

      return id
        ? `https://www.youtube.com/embed/${id}`
        : "";
    }

    if (
      parsed.hostname ===
        "youtu.be" ||
      parsed.hostname.endsWith(
        ".youtu.be"
      )
    ) {
      const id =
        parsed.pathname
          .replace(
            "/",
            ""
          )
          .split("?")[0];

      return id
        ? `https://www.youtube.com/embed/${id}`
        : "";
    }
  } catch {
    return "";
  }

  return "";
};

const isYouTubeUrl = (
  url
) => {
  return Boolean(
    getYouTubeEmbedUrl(url)
  );
};

export default function TeacherLectures() {
  const [
    searchParams,
  ] = useSearchParams();

  const selectedCourseFromUrl =
    searchParams.get(
      "course"
    ) || "";

  const [courses, setCourses] =
    useState([]);

  const [lectures, setLectures] =
    useState([]);

  const [
    selectedCourse,
    setSelectedCourse,
  ] = useState(
    selectedCourseFromUrl
  );

  const [
    showForm,
    setShowForm,
  ] = useState(false);

  const [
    editingLecture,
    setEditingLecture,
  ] = useState(null);

  const [search, setSearch] =
    useState("");

  const [loading, setLoading] =
    useState(true);

  const [saving, setSaving] =
    useState(false);

  const [uploadingVideo, setUploadingVideo] =
    useState(false);

  const [uploadingNotes, setUploadingNotes] =
    useState(false);

  const [error, setError] =
    useState("");

  const [form, setForm] =
    useState(emptyForm);

  // =========================
  // LOAD DATA
  // =========================

  const loadData = async () => {
    try {
      setLoading(true);
      setError("");

      const response =
        await fetch(
          `${API_BASE_URL}/courses?all=true`
        );

      const data =
        await response.json();

      if (
        !response.ok ||
        !data.success
      ) {
        throw new Error(
          data.message ||
            "Courses load नहीं हुए."
        );
      }

      const allCourses =
        data.courses || [];

      setCourses(
        allCourses
      );

      if (
        selectedCourseFromUrl &&
        allCourses.some(
          (course) =>
            String(
              course._id
            ) ===
            String(
              selectedCourseFromUrl
            )
        )
      ) {
        setSelectedCourse(
          selectedCourseFromUrl
        );
      } else if (
        selectedCourse &&
        allCourses.some(
          (course) =>
            String(
              course._id
            ) ===
            String(
              selectedCourse
            )
        )
      ) {
        // Keep current selection.
      } else if (
        allCourses.length > 0
      ) {
        setSelectedCourse(
          allCourses[0]._id
        );
      }

      const allLectures = [];

      allCourses.forEach(
        (course) => {
          const lessons =
            Array.isArray(
              course.lessons
            )
              ? course.lessons
              : [];

          lessons.forEach(
            (lesson) => {
              allLectures.push({
                id: lesson._id,
                courseId:
                  course._id,
                title:
                  lesson.title ||
                  "",
                course:
                  course.title ||
                  "Unknown Course",
                type:
                  lesson.type ||
                  "Video",
                videoUrl:
                  lesson.videoUrl ||
                  "",
                notesUrl:
                  lesson.notesUrl ||
                  "",
                resourceUrl:
                  lesson.resourceUrl ||
                  "",
                duration:
                  lesson.duration ||
                  "00:00",
                description:
                  lesson.description ||
                  "",
                chapter:
                  lesson.chapter ||
                  "Chapter 01",
                order:
                  lesson.order ||
                  1,
                status:
                  lesson.published
                    ? "Published"
                    : "Draft",
                createdAt:
                  lesson.createdAt ||
                  "",
                updatedAt:
                  lesson.updatedAt ||
                  "",
              });
            }
          );
        }
      );

      allLectures.sort(
        (a, b) => {
          if (
            String(
              a.courseId
            ) ===
            String(
              selectedCourse ||
                selectedCourseFromUrl
            )
          ) {
            return (
              Number(a.order) -
              Number(b.order)
            );
          }

          return (
            new Date(
              b.createdAt || 0
            ) -
            new Date(
              a.createdAt || 0
            )
          );
        }
      );

      setLectures(
        allLectures
      );
    } catch (err) {
      console.error(
        "Lecture load error:",
        err
      );

      setError(
        err.message ||
          "Lectures load नहीं हो पाए."
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, [
    selectedCourseFromUrl,
  ]);

  // =========================
  // SELECT COURSE
  // =========================

  useEffect(() => {
    if (
      selectedCourseFromUrl
    ) {
      setSelectedCourse(
        selectedCourseFromUrl
      );
    }
  }, [
    selectedCourseFromUrl,
  ]);

  // =========================
  // FORM
  // =========================

  const handleChange = (
    e
  ) => {
    const {
      name,
      value,
    } = e.target;

    setForm((previous) => ({
      ...previous,
      [name]: value,
    }));
  };

  const openCreateForm = () => {
    setEditingLecture(null);

    setForm({
      ...emptyForm,
      course:
        selectedCourse ||
        courses[0]?._id ||
        "",
      order:
        lectures.filter(
          (item) =>
            String(
              item.courseId
            ) ===
            String(
              selectedCourse
            )
        ).length + 1,
    });

    setError("");
    setShowForm(true);
  };

  const openEditForm = (
    lecture
  ) => {
    setEditingLecture(
      lecture
    );

    const source =
      lecture.videoUrl &&
      isYouTubeUrl(
        lecture.videoUrl
      )
        ? "youtube"
        : lecture.videoUrl
        ? "external"
        : "youtube";

    setForm({
      title:
        lecture.title || "",
      course:
        lecture.courseId || "",
      type:
        lecture.type ||
        "Video",
      videoSource:
        source,
      duration:
        lecture.duration ||
        "",
      videoUrl:
        lecture.videoUrl ||
        "",
      notesUrl:
        lecture.notesUrl ||
        "",
      resourceUrl:
        lecture.resourceUrl ||
        "",
      description:
        lecture.description ||
        "",
      chapter:
        lecture.chapter ||
        "Chapter 01",
      order:
        lecture.order || 1,
      status:
        lecture.status ||
        "Draft",
    });

    setError("");
    setShowForm(true);
  };

  const closeForm = () => {
    if (saving) return;

    setShowForm(false);
    setEditingLecture(null);

    setForm({
      ...emptyForm,
      course:
        selectedCourse ||
        courses[0]?._id ||
        "",
    });
  };

  // =========================
  // CLOUDINARY UPLOAD
  // =========================

  const uploadFile = async (
    file,
    kind
  ) => {
    if (!file) return;

    if (
      kind === "video"
    ) {
      if (
        !file.type.startsWith(
          "video/"
        )
      ) {
        alert(
          "Please select a video file."
        );
        return;
      }

      if (
        file.size >
        100 * 1024 * 1024
      ) {
        alert(
          "Video file must be 100MB or smaller."
        );
        return;
      }
    }

    if (
      kind === "notes"
    ) {
      const allowed =
        file.type ===
          "application/pdf" ||
        file.type.startsWith(
          "image/"
        );

      if (!allowed) {
        alert(
          "Notes ke liye PDF ya image file select करें."
        );
        return;
      }

      if (
        file.size >
        100 * 1024 * 1024
      ) {
        alert(
          "Notes file must be 100MB or smaller."
        );
        return;
      }
    }

    const formData =
      new FormData();

    formData.append(
      "file",
      file
    );

    try {
      if (
        kind === "video"
      ) {
        setUploadingVideo(
          true
        );
      } else {
        setUploadingNotes(
          true
        );
      }

      setError("");

      const response =
        await fetch(
          `${API_BASE_URL}/upload`,
          {
            method: "POST",
            body: formData,
          }
        );

      const data =
        await response.json();

      if (
        !response.ok ||
        !data.success ||
        !data.file?.url
      ) {
        throw new Error(
          data.message ||
            "File upload failed."
        );
      }

      if (
        kind === "video"
      ) {
        setForm(
          (previous) => ({
            ...previous,
            videoUrl:
              data.file.url,
            videoSource:
              "upload",
          })
        );
      } else {
        setForm(
          (previous) => ({
            ...previous,
            notesUrl:
              data.file.url,
          })
        );
      }

      alert(
        kind === "video"
          ? "Video uploaded successfully."
          : "Notes uploaded successfully."
      );
    } catch (err) {
      console.error(
        "Upload error:",
        err
      );

      setError(
        err.message ||
          "File upload failed."
      );

      alert(
        err.message ||
          "File upload failed."
      );
    } finally {
      if (
        kind === "video"
      ) {
        setUploadingVideo(
          false
        );
      } else {
        setUploadingNotes(
          false
        );
      }
    }
  };

  const handleVideoFile = (
    e
  ) => {
    const file =
      e.target.files?.[0];

    if (file) {
      uploadFile(
        file,
        "video"
      );
    }

    e.target.value = "";
  };

  const handleNotesFile = (
    e
  ) => {
    const file =
      e.target.files?.[0];

    if (file) {
      uploadFile(
        file,
        "notes"
      );
    }

    e.target.value = "";
  };

  // =========================
  // CREATE / UPDATE
  // =========================

  const saveLecture = async (
    e
  ) => {
    e.preventDefault();

    if (
      !form.title.trim()
    ) {
      alert(
        "Lecture Title जरूरी है."
      );
      return;
    }

    if (!form.course) {
      alert(
        "Course select करें."
      );
      return;
    }

    if (
      form.type === "Video" &&
      !form.videoUrl.trim()
    ) {
      alert(
        "Video upload करें या video URL डालें."
      );
      return;
    }

    try {
      setSaving(true);
      setError("");

      const payload = {
        title:
          form.title.trim(),

        chapter:
          form.chapter.trim() ||
          "Chapter 01",

        description:
          form.description.trim(),

        type:
          form.type,

        videoUrl:
          form.videoUrl.trim(),

        notesUrl:
          form.notesUrl.trim(),

        resourceUrl:
          form.resourceUrl.trim(),

        duration:
          form.duration.trim() ||
          "00:00",

        order:
          Number(form.order) ||
          1,

        published:
          form.status ===
          "Published",
      };

      let response;

      if (
        editingLecture
      ) {
        response =
          await fetch(
            `${API_BASE_URL}/courses/${form.course}/lessons/${editingLecture.id}`,
            {
              method: "PUT",

              headers: {
                "Content-Type":
                  "application/json",
              },

              body:
                JSON.stringify(
                  payload
                ),
            }
          );
      } else {
        response =
          await fetch(
            `${API_BASE_URL}/courses/${form.course}/lessons`,
            {
              method: "POST",

              headers: {
                "Content-Type":
                  "application/json",
              },

              body:
                JSON.stringify(
                  payload
                ),
            }
          );
      }

      const data =
        await response.json();

      if (
        !response.ok ||
        !data.success
      ) {
        throw new Error(
          data.message ||
            "Lecture save नहीं हुआ."
        );
      }

      alert(
        editingLecture
          ? "Lecture updated successfully."
          : "Lecture added successfully."
      );

      closeForm();

      await loadData();
    } catch (err) {
      console.error(
        "Lecture save error:",
        err
      );

      setError(
        err.message ||
          "Lecture save नहीं हुआ."
      );

      alert(
        err.message ||
          "Lecture save नहीं हुआ."
      );
    } finally {
      setSaving(false);
    }
  };

  // =========================
  // DELETE
  // =========================

  const deleteLecture = async (
    courseId,
    lessonId
  ) => {
    if (
      !window.confirm(
        "क्या आप यह lecture permanently delete करना चाहते हैं?"
      )
    ) {
      return;
    }

    try {
      setError("");

      const response =
        await fetch(
          `${API_BASE_URL}/courses/${courseId}/lessons/${lessonId}`,
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
            "Lecture delete नहीं हुआ."
        );
      }

      await loadData();
    } catch (err) {
      console.error(
        "Delete lecture error:",
        err
      );

      setError(
        err.message ||
          "Lecture delete नहीं हुआ."
      );

      alert(
        err.message ||
          "Lecture delete नहीं हुआ."
      );
    }
  };

  // =========================
  // MOVE LECTURE
  // =========================

  const moveLecture = async (
    lecture,
    direction
  ) => {
    const courseLectures =
      lectures
        .filter(
          (item) =>
            String(
              item.courseId
            ) ===
            String(
              lecture.courseId
            )
        )
        .sort(
          (a, b) =>
            Number(a.order) -
            Number(b.order)
        );

    const index =
      courseLectures.findIndex(
        (item) =>
          String(item.id) ===
          String(lecture.id)
      );

    const targetIndex =
      direction === "up"
        ? index - 1
        : index + 1;

    if (
      index < 0 ||
      targetIndex < 0 ||
      targetIndex >=
        courseLectures.length
    ) {
      return;
    }

    const target =
      courseLectures[
        targetIndex
      ];

    try {
      setError("");

      const firstResponse =
        await fetch(
          `${API_BASE_URL}/courses/${lecture.courseId}/lessons/${lecture.id}`,
          {
            method: "PUT",

            headers: {
              "Content-Type":
                "application/json",
            },

            body: JSON.stringify({
              order:
                target.order,
            }),
          }
        );

      const firstData =
        await firstResponse.json();

      if (
        !firstResponse.ok ||
        !firstData.success
      ) {
        throw new Error(
          firstData.message ||
            "Lecture order update failed."
        );
      }

      const secondResponse =
        await fetch(
          `${API_BASE_URL}/courses/${lecture.courseId}/lessons/${target.id}`,
          {
            method: "PUT",

            headers: {
              "Content-Type":
                "application/json",
            },

            body: JSON.stringify({
              order:
                lecture.order,
            }),
          }
        );

      const secondData =
        await secondResponse.json();

      if (
        !secondResponse.ok ||
        !secondData.success
      ) {
        throw new Error(
          secondData.message ||
            "Lecture order update failed."
        );
      }

      await loadData();
    } catch (err) {
      console.error(
        "Move lecture error:",
        err
      );

      setError(
        err.message ||
          "Lecture order update failed."
      );
    }
  };

  // =========================
  // FILTERED LECTURES
  // =========================

  const selectedCourseObject =
    courses.find(
      (course) =>
        String(
          course._id
        ) ===
        String(
          selectedCourse
        )
    );

  const selectedCourseLectures =
    useMemo(() => {
      return lectures
        .filter(
          (lecture) =>
            String(
              lecture.courseId
            ) ===
            String(
              selectedCourse
            )
        )
        .sort(
          (a, b) =>
            Number(a.order) -
            Number(b.order)
        );
    }, [
      lectures,
      selectedCourse,
    ]);

  const filteredLectures =
    useMemo(() => {
      const value =
        search
          .toLowerCase()
          .trim();

      if (!value) {
        return selectedCourseLectures;
      }

      return selectedCourseLectures.filter(
        (lecture) =>
          lecture.title
            .toLowerCase()
            .includes(value) ||
          lecture.chapter
            .toLowerCase()
            .includes(value) ||
          lecture.type
            .toLowerCase()
            .includes(value)
      );
    }, [
      selectedCourseLectures,
      search,
    ]);

  const total =
    selectedCourseLectures.length;

  const published =
    selectedCourseLectures.filter(
      (item) =>
        item.status ===
        "Published"
    ).length;

  const drafts =
    selectedCourseLectures.filter(
      (item) =>
        item.status === "Draft"
    ).length;

  // =========================
  // RENDER
  // =========================

  return (
    <div className="teacher-lectures-page">

      {/* HEADER */}

      <div className="lectures-header">

        <div>

          <span className="lectures-eyebrow">
            TEACHER PORTAL
          </span>

          <h1>
            Course Content
          </h1>

          <p>
            Create and manage
            lectures for your
            students.
          </p>

        </div>

        <button
          className="add-lecture-btn"
          type="button"
          onClick={
            openCreateForm
          }
          disabled={
            courses.length === 0
          }
        >
          <span>＋</span>
          Add Lecture
        </button>

      </div>

      {/* ERROR */}

      {error && (
        <div
          style={{
            marginBottom:
              "18px",
            padding:
              "14px 18px",
            borderRadius:
              "14px",
            background:
              "#fff1f2",
            color:
              "#be123c",
            border:
              "1px solid #fecdd3",
            fontWeight: 600,
          }}
        >
          {error}
        </div>
      )}

      {/* COURSE SELECTOR */}

      <div
        style={{
          marginBottom:
            "20px",
          padding:
            "18px",
          borderRadius:
            "18px",
          background:
            "#ffffff",
          border:
            "1px solid #e5e7eb",
          boxShadow:
            "0 8px 25px rgba(15,23,42,0.05)",
        }}
      >

        <label
          style={{
            display:
              "block",
            marginBottom:
              "8px",
            fontWeight:
              700,
          }}
        >
          Select Course
        </label>

        <select
          value={
            selectedCourse
          }
          onChange={(e) => {
            setSelectedCourse(
              e.target.value
            );
            setSearch("");
          }}
          style={{
            width: "100%",
            maxWidth:
              "650px",
            padding:
              "13px 15px",
            borderRadius:
              "12px",
            border:
              "1px solid #dbe2ea",
            background:
              "#f8fafc",
            fontSize:
              "15px",
            fontWeight:
              600,
          }}
        >

          <option value="">
            Select a course
          </option>

          {courses.map(
            (course) => (
              <option
                key={
                  course._id
                }
                value={
                  course._id
                }
              >
                {course.title}
              </option>
            )
          )}

        </select>

        {selectedCourseObject && (
          <div
            style={{
              marginTop:
                "10px",
              color:
                "#64748b",
              fontSize:
                "14px",
            }}
          >
            Managing content for{" "}
            <strong>
              {
                selectedCourseObject.title
              }
            </strong>
          </div>
        )}

      </div>

      {/* STATS */}

      <div className="lecture-stat-grid">

        <div className="lecture-stat-card">
          <div className="lecture-stat-icon blue">
            🎬
          </div>

          <div>
            <span>
              Total Lectures
            </span>

            <strong>
              {total}
            </strong>
          </div>
        </div>

        <div className="lecture-stat-card">
          <div className="lecture-stat-icon green">
            ✓
          </div>

          <div>
            <span>
              Published
            </span>

            <strong>
              {published}
            </strong>
          </div>
        </div>

        <div className="lecture-stat-card">
          <div className="lecture-stat-icon orange">
            ◷
          </div>

          <div>
            <span>
              Drafts
            </span>

            <strong>
              {drafts}
            </strong>
          </div>
        </div>

        <div className="lecture-stat-card">
          <div className="lecture-stat-icon purple">
            📚
          </div>

          <div>
            <span>
              Learning Content
            </span>

            <strong>
              {total}
            </strong>
          </div>
        </div>

      </div>

      {/* TOOLBAR */}

      <div className="lectures-toolbar">

        <div className="lecture-search">

          <span>⌕</span>

          <input
            type="text"
            placeholder="Search lectures..."
            value={search}
            onChange={(e) =>
              setSearch(
                e.target.value
              )
            }
          />

        </div>

      </div>

      {/* CONTENT */}

      {loading ? (

        <div className="lectures-empty">

          <div className="empty-lecture-icon">
            ⏳
          </div>

          <span>
            LOADING CONTENT
          </span>

          <h2>
            Loading lectures...
          </h2>

          <p>
            Connecting to
            COLLEGIYA database.
          </p>

        </div>

      ) : courses.length === 0 ? (

        <div className="lectures-empty">

          <div className="empty-lecture-icon">
            📚
          </div>

          <span>
            NO COURSES
          </span>

          <h2>
            Create a course first
          </h2>

          <p>
            Add a course before
            creating lectures.
          </p>

          <Link
            to="/teacher/courses"
            className="add-lecture-btn"
            style={{
              display:
                "inline-flex",
              textDecoration:
                "none",
            }}
          >
            Go to Courses
          </Link>

        </div>

      ) : !selectedCourse ? (

        <div className="lectures-empty">

          <div className="empty-lecture-icon">
            🎓
          </div>

          <span>
            SELECT COURSE
          </span>

          <h2>
            Select a course
          </h2>

          <p>
            Select a course above
            to manage its lectures.
          </p>

        </div>

      ) : filteredLectures.length === 0 ? (

        <div className="lectures-empty">

          <div className="empty-lecture-icon">
            🎬
          </div>

          <span>
            {total === 0
              ? "NO LECTURES"
              : "NO RESULTS"}
          </span>

          <h2>
            {total === 0
              ? "Add your first lecture"
              : "No lectures found"}
          </h2>

          <p>
            {total === 0
              ? "Start building this course by adding video lessons, notes and resources."
              : "Try changing your search."}
          </p>

          {total === 0 && (
            <button
              type="button"
              className="add-lecture-btn"
              onClick={
                openCreateForm
              }
            >
              <span>＋</span>
              Add First Lecture
            </button>
          )}

        </div>

      ) : (

        <div className="lecture-list">

          {filteredLectures.map(
            (
              lecture,
              index
            ) => {

              const originalIndex =
                selectedCourseLectures.findIndex(
                  (item) =>
                    String(
                      item.id
                    ) ===
                    String(
                      lecture.id
                    )
                );

              return (
                <article
                  className="lecture-card"
                  key={
                    lecture.id
                  }
                >

                  <div className="lecture-number">
                    {String(
                      lecture.order
                    ).padStart(
                      2,
                      "0"
                    )}
                  </div>

                  <div className="lecture-card-content">

                    <div className="lecture-card-top">

                      <span className="lecture-course">
                        {selectedCourseObject?.title}
                      </span>

                      <span
                        className={`lecture-type ${lecture.type
                          .toLowerCase()
                          .replace(
                            /\s+/g,
                            "-"
                          )}`}
                      >
                        {lecture.type}
                      </span>

                      <span
                        className={`lecture-status ${
                          lecture.status ===
                          "Published"
                            ? "published"
                            : "draft"
                        }`}
                      >
                        {lecture.status}
                      </span>

                    </div>

                    <h2>
                      {lecture.title}
                    </h2>

                    <div className="lecture-chapter">
                      {lecture.chapter}
                    </div>

                    {lecture.description && (
                      <p>
                        {
                          lecture.description
                        }
                      </p>
                    )}

                    <div className="lecture-meta">

                      <span>
                        ⏱{" "}
                        {
                          lecture.duration
                        }
                      </span>

                      {lecture.videoUrl && (
                        <span>
                          🎥 Video
                        </span>
                      )}

                      {lecture.notesUrl && (
                        <span>
                          📄 Notes
                        </span>
                      )}

                      {lecture.resourceUrl && (
                        <span>
                          🔗 Resource
                        </span>
                      )}

                    </div>

                    <div className="lecture-actions">

                      {lecture.videoUrl && (
                        <a
                          href={
                            getYouTubeEmbedUrl(
                              lecture.videoUrl
                            ) ||
                            lecture.videoUrl
                          }
                          target="_blank"
                          rel="noreferrer"
                          className="lecture-action watch"
                        >
                          ▶ Watch
                        </a>
                      )}

                      {lecture.notesUrl && (
                        <a
                          href={
                            lecture.notesUrl
                          }
                          target="_blank"
                          rel="noreferrer"
                          className="lecture-action notes"
                        >
                          📄 Notes
                        </a>
                      )}

                      {lecture.resourceUrl && (
                        <a
                          href={
                            lecture.resourceUrl
                          }
                          target="_blank"
                          rel="noreferrer"
                          className="lecture-action resource"
                        >
                          🔗 Resource
                        </a>
                      )}

                      <button
                        type="button"
                        className="lecture-action edit"
                        onClick={() =>
                          openEditForm(
                            lecture
                          )
                        }
                      >
                        ✎ Edit
                      </button>

                      <button
                        type="button"
                        className="lecture-action move"
                        disabled={
                          originalIndex ===
                          0
                        }
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
                        className="lecture-action move"
                        disabled={
                          originalIndex ===
                          selectedCourseLectures.length -
                            1
                        }
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
                        className="lecture-action delete"
                        onClick={() =>
                          deleteLecture(
                            lecture.courseId,
                            lecture.id
                          )
                        }
                      >
                        Delete
                      </button>

                    </div>

                  </div>

                </article>
              );
            }
          )}

        </div>

      )}

      {/* ADD / EDIT MODAL */}

      {showForm && (
        <div className="lecture-form-overlay">

          <div className="lecture-form-card">

            <div className="lecture-form-header">

              <div>
                <span>
                  {editingLecture
                    ? "EDIT CONTENT"
                    : "NEW CONTENT"}
                </span>

                <h2>
                  {editingLecture
                    ? "Edit Lecture"
                    : "Add Lecture"}
                </h2>

                <p>
                  Add video, notes,
                  links and learning
                  resources.
                </p>
              </div>

              <button
                type="button"
                className="lecture-form-close"
                onClick={
                  closeForm
                }
                disabled={
                  saving ||
                  uploadingVideo ||
                  uploadingNotes
                }
              >
                ×
              </button>

            </div>

            <form
              onSubmit={
                saveLecture
              }
            >

              <div className="lecture-form-grid">

                {/* TITLE */}

                <div className="lecture-form-group full">

                  <label>
                    Lecture Title *
                  </label>

                  <input
                    name="title"
                    type="text"
                    placeholder="e.g. Introduction to React Components"
                    value={
                      form.title
                    }
                    onChange={
                      handleChange
                    }
                    disabled={
                      saving
                    }
                  />

                </div>

                {/* COURSE */}

                <div className="lecture-form-group">

                  <label>
                    Course *
                  </label>

                  <select
                    name="course"
                    value={
                      form.course
                    }
                    onChange={
                      handleChange
                    }
                    disabled={
                      saving ||
                      Boolean(
                        editingLecture
                      )
                    }
                  >

                    <option value="">
                      Select course
                    </option>

                    {courses.map(
                      (
                        course
                      ) => (
                        <option
                          key={
                            course._id
                          }
                          value={
                            course._id
                          }
                        >
                          {
                            course.title
                          }
                        </option>
                      )
                    )}

                  </select>

                </div>

                {/* TYPE */}

                <div className="lecture-form-group">

                  <label>
                    Content Type
                  </label>

                  <select
                    name="type"
                    value={
                      form.type
                    }
                    onChange={
                      handleChange
                    }
                    disabled={
                      saving
                    }
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

                {/* DURATION */}

                <div className="lecture-form-group">

                  <label>
                    Duration
                  </label>

                  <input
                    name="duration"
                    type="text"
                    placeholder="e.g. 12:30"
                    value={
                      form.duration
                    }
                    onChange={
                      handleChange
                    }
                    disabled={
                      saving
                    }
                  />

                </div>

                {/* ORDER */}

                <div className="lecture-form-group">

                  <label>
                    Lecture Order
                  </label>

                  <input
                    name="order"
                    type="number"
                    min="1"
                    value={
                      form.order
                    }
                    onChange={
                      handleChange
                    }
                    disabled={
                      saving
                    }
                  />

                </div>

                {/* CHAPTER */}

                <div className="lecture-form-group full">

                  <label>
                    Chapter
                  </label>

                  <input
                    name="chapter"
                    type="text"
                    placeholder="e.g. Chapter 01 — Introduction"
                    value={
                      form.chapter
                    }
                    onChange={
                      handleChange
                    }
                    disabled={
                      saving
                    }
                  />

                </div>

                {/* VIDEO SOURCE */}

                {form.type ===
                  "Video" && (
                  <div className="lecture-form-group full">

                    <label>
                      Video Source
                    </label>

                    <div
                      style={{
                        display:
                          "flex",
                        flexWrap:
                          "wrap",
                        gap:
                          "8px",
                        marginBottom:
                          "12px",
                      }}
                    >

                      {[
                        [
                          "upload",
                          "☁ Upload Video",
                        ],
                        [
                          "youtube",
                          "▶ YouTube",
                        ],
                        [
                          "external",
                          "🔗 Website",
                        ],
                      ].map(
                        (item) => (
                          <button
                            key={
                              item[0]
                            }
                            type="button"
                            onClick={() =>
                              setForm(
                                (
                                  previous
                                ) => ({
                                  ...previous,
                                  videoSource:
                                    item[0],
                                })
                              )
                            }
                            style={{
                              padding:
                                "10px 14px",
                              borderRadius:
                                "10px",
                              border:
                                "1px solid #dbe2ea",
                              background:
                                form.videoSource ===
                                item[0]
                                  ? "#e0f2fe"
                                  : "#fff",
                              fontWeight:
                                700,
                              cursor:
                                "pointer",
                            }}
                          >
                            {
                              item[1]
                            }
                          </button>
                        )
                      )}

                    </div>

                    {/* UPLOAD */}

                    {form.videoSource ===
                      "upload" && (
                      <div>

                        <input
                          type="file"
                          accept="video/mp4,video/webm,video/quicktime"
                          onChange={
                            handleVideoFile
                          }
                          disabled={
                            saving ||
                            uploadingVideo
                          }
                        />

                        {uploadingVideo && (
                          <div
                            style={{
                              marginTop:
                                "10px",
                              fontWeight:
                                700,
                            }}
                          >
                            Uploading video to
                            cloud...
                          </div>
                        )}

                        {form.videoUrl && (
                          <div
                            style={{
                              marginTop:
                                "10px",
                              fontSize:
                                "13px",
                              wordBreak:
                                "break-all",
                            }}
                          >
                            Video uploaded ✓
                          </div>
                        )}

                      </div>
                    )}

                    {/* YOUTUBE */}

                    {form.videoSource ===
                      "youtube" && (
                      <div>

                        <input
                          name="videoUrl"
                          type="url"
                          placeholder="https://www.youtube.com/watch?v=..."
                          value={
                            form.videoUrl
                          }
                          onChange={
                            handleChange
                          }
                          disabled={
                            saving
                          }
                        />

                        {getYouTubeEmbedUrl(
                          form.videoUrl
                        ) && (
                          <div
                            style={{
                              marginTop:
                                "10px",
                              color:
                                "#15803d",
                              fontWeight:
                                600,
                            }}
                          >
                            ✓ Valid YouTube
                            video detected
                          </div>
                        )}

                      </div>
                    )}

                    {/* EXTERNAL */}

                    {form.videoSource ===
                      "external" && (
                      <input
                        name="videoUrl"
                        type="url"
                        placeholder="https://example.com/video"
                        value={
                          form.videoUrl
                        }
                        onChange={
                          handleChange
                        }
                        disabled={
                          saving
                        }
                      />
                    )}

                  </div>
                )}

                {/* NOTES */}

                <div className="lecture-form-group full">

                  <label>
                    Notes / PDF
                  </label>

                  <div
                    style={{
                      display:
                        "grid",
                      gridTemplateColumns:
                        "1fr 1fr",
                      gap:
                        "10px",
                    }}
                  >

                    <input
                      name="notesUrl"
                      type="url"
                      placeholder="Paste notes/PDF URL"
                      value={
                        form.notesUrl
                      }
                      onChange={
                        handleChange
                      }
                      disabled={
                        saving
                      }
                    />

                    <label
                      style={{
                        display:
                          "flex",
                        alignItems:
                          "center",
                        justifyContent:
                          "center",
                        minHeight:
                          "48px",
                        border:
                          "1px dashed #94a3b8",
                        borderRadius:
                          "10px",
                        cursor:
                          "pointer",
                        background:
                          "#f8fafc",
                        fontWeight:
                          700,
                      }}
                    >
                      {uploadingNotes
                        ? "Uploading..."
                        : "☁ Upload Notes / PDF"}

                      <input
                        type="file"
                        accept="application/pdf,image/jpeg,image/png,image/webp"
                        onChange={
                          handleNotesFile
                        }
                        disabled={
                          saving ||
                          uploadingNotes
                        }
                        style={{
                          display:
                            "none",
                        }}
                      />
                    </label>

                  </div>

                  {form.notesUrl && (
                    <div
                      style={{
                        marginTop:
                          "8px",
                        fontSize:
                          "13px",
                        color:
                          "#15803d",
                        fontWeight:
                          600,
                      }}
                    >
                      ✓ Notes attached
                    </div>
                  )}

                </div>

                {/* RESOURCE */}

                <div className="lecture-form-group full">

                  <label>
                    Additional Resource
                  </label>

                  <input
                    name="resourceUrl"
                    type="url"
                    placeholder="https://example.com/resource"
                    value={
                      form.resourceUrl
                    }
                    onChange={
                      handleChange
                    }
                    disabled={
                      saving
                    }
                  />

                </div>

                {/* DESCRIPTION */}

                <div className="lecture-form-group full">

                  <label>
                    Description
                  </label>

                  <textarea
                    name="description"
                    rows="5"
                    placeholder="Explain what students will learn in this lecture..."
                    value={
                      form.description
                    }
                    onChange={
                      handleChange
                    }
                    disabled={
                      saving
                    }
                  />

                </div>

                {/* STATUS */}

                <div className="lecture-form-group full">

                  <label>
                    Lecture Status
                  </label>

                  <select
                    name="status"
                    value={
                      form.status
                    }
                    onChange={
                      handleChange
                    }
                    disabled={
                      saving
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

              </div>

              <div className="lecture-form-actions">

                <button
                  type="button"
                  className="lecture-cancel-btn"
                  onClick={
                    closeForm
                  }
                  disabled={
                    saving ||
                    uploadingVideo ||
                    uploadingNotes
                  }
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
                    : "Add Lecture"}
                </button>

              </div>

            </form>

          </div>

        </div>
      )}

    </div>
  );
}
