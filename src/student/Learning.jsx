import React, { useEffect, useRef, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import "./learning.css";

const API_BASE_URL =
  import.meta.env.VITE_API_URL || import.meta.env.VITE_API_URL || "https://collegiya-backend.onrender.com/api";

const DEFAULT_VIDEO =
  "https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4";

const fallbackLessons = [
  {
    id: "1",
    title: "Introduction to Web Development",
    chapter: "Chapter 01",
    duration: "08:42",
    type: "Video",
    completed: true,
    video: DEFAULT_VIDEO,
    notesUrl: "",
    resourceUrl: "",
    description:
      "Introduction to modern web development and the technologies used to build websites.",
  },
  {
    id: "2",
    title: "HTML Fundamentals",
    chapter: "Chapter 02",
    duration: "12:18",
    type: "Video",
    completed: true,
    video: DEFAULT_VIDEO,
    notesUrl: "",
    resourceUrl: "",
    description:
      "Learn the basic structure of HTML documents and important HTML elements.",
  },
  {
    id: "3",
    title: "CSS Fundamentals",
    chapter: "Chapter 03",
    duration: "15:26",
    type: "Video",
    completed: false,
    video: DEFAULT_VIDEO,
    notesUrl: "",
    resourceUrl: "",
    description:
      "Learn how CSS is used to design and style modern web pages.",
  },
];

function formatTime(seconds) {
  if (!Number.isFinite(seconds)) return "00:00";

  const mins = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60);

  return `${String(mins).padStart(2, "0")}:${String(secs).padStart(
    2,
    "0"
  )}`;
}

function getYouTubeEmbedUrl(url) {
  if (!url) return "";

  try {
    const parsed = new URL(url);

    if (
      parsed.hostname.includes("youtube.com") ||
      parsed.hostname.includes("youtu.be")
    ) {
      if (parsed.pathname === "/watch") {
        const videoId = parsed.searchParams.get("v");

        if (videoId) {
          return `https://www.youtube.com/embed/${videoId}`;
        }
      }

      if (parsed.hostname.includes("youtu.be")) {
        const videoId = parsed.pathname.replace("/", "").split("/")[0];

        if (videoId) {
          return `https://www.youtube.com/embed/${videoId}`;
        }
      }

      if (parsed.pathname.startsWith("/embed/")) {
        return url;
      }

      if (parsed.pathname.startsWith("/shorts/")) {
        const videoId = parsed.pathname.split("/")[2];

        if (videoId) {
          return `https://www.youtube.com/embed/${videoId}`;
        }
      }
    }
  } catch (error) {
    return "";
  }

  return "";
}

export default function Learning() {
  const [searchParams] = useSearchParams();
  const courseId = searchParams.get("course");

  const videoRef = useRef(null);
  const playerRef = useRef(null);

  const [course, setCourse] = useState(null);
  const [lessons, setLessons] = useState([]);
  const [currentLesson, setCurrentLesson] = useState(null);

  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(1);
  const [isFullscreen, setIsFullscreen] = useState(false);

  const [completedLessons, setCompletedLessons] = useState([]);

  useEffect(() => {
    let cancelled = false;

    const loadCourse = async () => {
      setIsLoading(true);
      setError("");

      try {
        if (!courseId) {
          if (!cancelled) {
            setCourse({
              title: "Web Development",
              description:
                "Master modern web development through structured, practical video lessons.",
              instructor: "COLLEGIYA Faculty",
            });

            setLessons(fallbackLessons);
            setCurrentLesson(fallbackLessons[0].id);

            setCompletedLessons(
              fallbackLessons
                .filter((lesson) => lesson.completed)
                .map((lesson) => lesson.id)
            );
          }

          return;
        }

        const response = await fetch(
          `${API_BASE_URL}/courses/${courseId}`
        );

        const data = await response.json();

        if (!response.ok || !data.success) {
          throw new Error(
            data.message || "Course could not be loaded."
          );
        }

        const apiCourse = data.course;

        const apiLessons = Array.isArray(apiCourse.lessons)
          ? apiCourse.lessons
              .filter((lesson) => lesson.published === true)
              .map((lesson, index) => ({
                id: lesson._id || `lesson-${index + 1}`,
                title:
                  lesson.title || `Lesson ${index + 1}`,
                chapter:
                  lesson.chapter ||
                  `Chapter ${String(index + 1).padStart(2, "0")}`,
                duration: lesson.duration || "00:00",
                type: lesson.type || "Video",
                completed: false,
                video: lesson.videoUrl || "",
                notesUrl: lesson.notesUrl || "",
                resourceUrl: lesson.resourceUrl || "",
                description: lesson.description || "",
                order: Number(lesson.order) || index + 1,
              }))
              .sort((a, b) => a.order - b.order)
          : [];

        if (!cancelled) {
          setCourse(apiCourse);
          setLessons(apiLessons);

          if (apiLessons.length > 0) {
            setCurrentLesson(apiLessons[0].id);
          } else {
            setCurrentLesson(null);
          }

          setCompletedLessons([]);
        }
      } catch (err) {
        console.error("Learning course error:", err);

        if (!cancelled) {
          setError(
            err.message ||
              "Unable to load course. Please try again."
          );

          setCourse(null);
          setLessons([]);
          setCurrentLesson(null);
        }
      } finally {
        if (!cancelled) {
          setIsLoading(false);
        }
      }
    };

    loadCourse();

    return () => {
      cancelled = true;
    };
  }, [courseId]);

  const lesson = lessons.find(
    (item) => String(item.id) === String(currentLesson)
  );

  const completedCount = completedLessons.length;

  const courseProgress =
    lessons.length > 0
      ? Math.round((completedCount / lessons.length) * 100)
      : 0;

  const currentIndex = lesson
    ? lessons.findIndex(
        (item) =>
          String(item.id) === String(currentLesson)
      )
    : -1;

  const instructor =
    course?.instructor || "COLLEGIYA Faculty";

  const courseTitle =
    course?.title || "Web Development";

  const lessonDescription =
    lesson?.description ||
    "In this lesson, you will learn the core concepts required to build modern websites. Follow the lesson carefully and practice each concept on your own device.";

  const youtubeEmbed =
    lesson?.type === "Video"
      ? getYouTubeEmbedUrl(lesson?.video)
      : "";

  const hasDirectVideo =
    lesson?.type === "Video" &&
    lesson?.video &&
    !youtubeEmbed;

  useEffect(() => {
    setCurrentTime(0);
    setDuration(0);
    setIsPlaying(false);

    if (videoRef.current) {
      videoRef.current.pause();
      videoRef.current.load();
    }
  }, [currentLesson]);

  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(
        Boolean(document.fullscreenElement)
      );
    };

    document.addEventListener(
      "fullscreenchange",
      handleFullscreenChange
    );

    return () => {
      document.removeEventListener(
        "fullscreenchange",
        handleFullscreenChange
      );
    };
  }, []);

  const togglePlay = async () => {
    if (!videoRef.current || !lesson) return;

    if (videoRef.current.paused) {
      try {
        await videoRef.current.play();
        setIsPlaying(true);
      } catch (error) {
        console.log("Video play blocked:", error);
      }
    } else {
      videoRef.current.pause();
      setIsPlaying(false);
    }
  };

  const handleLoadedMetadata = () => {
    if (!videoRef.current) return;

    setDuration(videoRef.current.duration || 0);
  };

  const handleTimeUpdate = () => {
    if (!videoRef.current) return;

    setCurrentTime(videoRef.current.currentTime);
  };

  const handleSeek = (event) => {
    const value = Number(event.target.value);

    if (videoRef.current) {
      videoRef.current.currentTime = value;
      setCurrentTime(value);
    }
  };

  const handleVolume = (event) => {
    const value = Number(event.target.value);

    setVolume(value);

    if (videoRef.current) {
      videoRef.current.volume = value;
    }
  };

  const toggleFullscreen = async () => {
    if (!playerRef.current) return;

    try {
      if (!document.fullscreenElement) {
        await playerRef.current.requestFullscreen();
      } else {
        await document.exitFullscreen();
      }
    } catch (error) {
      console.log("Fullscreen error:", error);
    }
  };

  const markComplete = () => {
    if (!lesson) return;

    if (!completedLessons.includes(lesson.id)) {
      setCompletedLessons((previous) => [
        ...previous,
        lesson.id,
      ]);
    }
  };

  const selectLesson = (id) => {
    setCurrentLesson(id);

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const nextLesson = () => {
    if (!lesson) return;

    if (currentIndex < lessons.length - 1) {
      markComplete();

      setCurrentLesson(
        lessons[currentIndex + 1].id
      );
    }
  };

  const previousLesson = () => {
    if (!lesson) return;

    if (currentIndex > 0) {
      setCurrentLesson(
        lessons[currentIndex - 1].id
      );
    }
  };

  const handleVideoEnded = () => {
    markComplete();
    setIsPlaying(false);
  };

  if (isLoading) {
    return (
      <div className="premium-learning">
        <section className="learning-top">
          <div className="learning-breadcrumb">
            <Link to="/student/dashboard">
              Dashboard
            </Link>

            <span>/</span>

            <span>My Learning</span>
          </div>

          <div className="learning-heading-row">
            <div>
              <span className="learning-eyebrow">
                <span className="eyebrow-dot"></span>
                LOADING COURSE
              </span>

              <h1>Loading...</h1>

              <p>
                Please wait while your course is loading.
              </p>
            </div>
          </div>
        </section>
      </div>
    );
  }

  if (error) {
    return (
      <div className="premium-learning">
        <section className="learning-top">
          <div className="learning-breadcrumb">
            <Link to="/student/dashboard">
              Dashboard
            </Link>

            <span>/</span>

            <span>My Learning</span>
          </div>

          <div className="learning-heading-row">
            <div>
              <span className="learning-eyebrow">
                <span className="eyebrow-dot"></span>
                COURSE ERROR
              </span>

              <h1>Unable to Load Course</h1>

              <p>{error}</p>

              <Link
                to="/student/courses"
                style={{
                  display: "inline-block",
                  marginTop: "20px",
                }}
              >
                ← Back to Courses
              </Link>
            </div>
          </div>
        </section>
      </div>
    );
  }

  if (!lesson) {
    return (
      <div className="premium-learning">
        <section className="learning-top">
          <div className="learning-breadcrumb">
            <Link to="/student/dashboard">
              Dashboard
            </Link>

            <span>/</span>

            <span>My Learning</span>
          </div>

          <div className="learning-heading-row">
            <div>
              <span className="learning-eyebrow">
                <span className="eyebrow-dot"></span>
                COURSE CONTENT
              </span>

              <h1>
                {course?.title || "Course"}
              </h1>

              <p>
                No published lessons are available in this
                course yet.
              </p>

              <Link
                to="/student/courses"
                style={{
                  display: "inline-block",
                  marginTop: "20px",
                }}
              >
                ← Back to Courses
              </Link>
            </div>
          </div>
        </section>
      </div>
    );
  }

  return (
    <div className="premium-learning">
      {/* PAGE HEADER */}
      <section className="learning-top">
        <div className="learning-breadcrumb">
          <Link to="/student/dashboard">
            Dashboard
          </Link>

          <span>/</span>

          <span>My Learning</span>

          <span>/</span>

          <strong>{courseTitle}</strong>
        </div>

        <div className="learning-heading-row">
          <div>
            <span className="learning-eyebrow">
              <span className="eyebrow-dot"></span>
              STUDENT LEARNING
            </span>

            <h1>{lesson.title}</h1>

            <p>
              {courseTitle} • {instructor}
            </p>
          </div>

          <div className="course-progress-box">
            <div>
              <span>COURSE PROGRESS</span>
              <strong>{courseProgress}%</strong>
            </div>

            <div className="playlist-progress-track">
              <div
                className="playlist-progress"
                style={{
                  width: `${courseProgress}%`,
                }}
              ></div>
            </div>

            <small>
              {completedCount} of {lessons.length} lessons
              completed
            </small>
          </div>
        </div>
      </section>

      {/* CLASSROOM */}
      <section className="learning-classroom">
        <div className="video-section">
          <div
            className="video-card"
            ref={playerRef}
          >
            <div className="video-top-overlay">
              <span className="video-course-badge">
                {lesson.type}
              </span>

              <span>
                {lesson.chapter}
              </span>
            </div>

            {lesson.type === "Video" &&
              youtubeEmbed && (
                <div className="main-video youtube-video-wrapper">
                  <iframe
                    src={youtubeEmbed}
                    title={lesson.title}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    allowFullScreen
                  ></iframe>
                </div>
              )}

            {lesson.type === "Video" &&
              hasDirectVideo && (
                <>
                  <video
                    ref={videoRef}
                    className="main-video"
                    preload="metadata"
                    onLoadedMetadata={
                      handleLoadedMetadata
                    }
                    onTimeUpdate={
                      handleTimeUpdate
                    }
                    onPlay={() =>
                      setIsPlaying(true)
                    }
                    onPause={() =>
                      setIsPlaying(false)
                    }
                    onEnded={
                      handleVideoEnded
                    }
                    playsInline
                  >
                    <source
                      src={lesson.video}
                    />
                    Your browser does not support
                    HTML video.
                  </video>

                  <button
                    className="big-play"
                    onClick={togglePlay}
                    aria-label="Play video"
                  >
                    {isPlaying ? "Ⅱ" : "▶"}
                  </button>

                  <div className="custom-controls">
                    <div className="video-progress">
                      <input
                        type="range"
                        min="0"
                        max={duration || 0}
                        step="0.1"
                        value={Math.min(
                          currentTime,
                          duration || 0
                        )}
                        onChange={handleSeek}
                      />
                    </div>

                    <div className="controls-row">
                      <div className="controls-left">
                        <button
                          className="control-button"
                          onClick={togglePlay}
                        >
                          {isPlaying ? "Ⅱ" : "▶"}
                        </button>

                        <span className="time-display">
                          {formatTime(currentTime)} /{" "}
                          {formatTime(duration)}
                        </span>
                      </div>

                      <div className="controls-right">
                        <div className="volume-control">
                          <span>
                            {volume === 0
                              ? "🔇"
                              : "🔊"}
                          </span>

                          <input
                            type="range"
                            min="0"
                            max="1"
                            step="0.05"
                            value={volume}
                            onChange={
                              handleVolume
                            }
                          />
                        </div>

                        <button
                          className="control-button"
                          onClick={
                            toggleFullscreen
                          }
                        >
                          {isFullscreen
                            ? "⤢"
                            : "⛶"}
                        </button>
                      </div>
                    </div>
                  </div>
                </>
              )}

            {lesson.type === "Video" &&
              !lesson.video && (
                <div className="video-center-control">
                  <div className="empty-video-icon">
                    ▶
                  </div>

                  <h3>
                    Video not available
                  </h3>

                  <p>
                    Teacher has not added a video URL
                    for this lesson yet.
                  </p>
                </div>
              )}

            {lesson.type !== "Video" && (
              <div className="video-center-control">
                <div className="empty-video-icon">
                  {lesson.type === "PDF"
                    ? "📄"
                    : lesson.type === "Article"
                    ? "📖"
                    : "🎓"}
                </div>

                <span className="video-course-badge">
                  {lesson.type}
                </span>

                <h3>{lesson.title}</h3>

                <p>
                  This lesson is available as{" "}
                  {lesson.type.toLowerCase()} content.
                </p>

                {lesson.notesUrl && (
                  <a
                    href={lesson.notesUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="next-lesson-button"
                  >
                    Open Notes / PDF →
                  </a>
                )}
              </div>
            )}
          </div>

          {/* LESSON INFORMATION */}
          <div className="lesson-information">
            <div className="lesson-title-area">
              <span className="lesson-chapter">
                {lesson.chapter}
              </span>

              <h2>{lesson.title}</h2>

              <div className="lesson-meta">
                <span>
                  ⏱ {lesson.duration}
                </span>

                <span>
                  •
                </span>

                <span>
                  {lesson.type}
                </span>

                <span>
                  •
                </span>

                <span>
                  Lesson {currentIndex + 1} of{" "}
                  {lessons.length}
                </span>
              </div>
            </div>

            <button
              className="complete-button"
              onClick={markComplete}
            >
              {completedLessons.includes(
                lesson.id
              )
                ? "✓ Completed"
                : "Mark Complete"}
            </button>
          </div>

          {/* RESOURCES */}
          {(lesson.notesUrl ||
            lesson.resourceUrl) && (
            <div
              className="lesson-highlights"
              style={{
                display: "flex",
                flexWrap: "wrap",
                gap: "12px",
                marginTop: "18px",
              }}
            >
              {lesson.notesUrl && (
                <a
                  href={lesson.notesUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="next-lesson-button"
                >
                  📄 Open Notes / PDF
                </a>
              )}

              {lesson.resourceUrl && (
                <a
                  href={lesson.resourceUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="next-lesson-button"
                >
                  🔗 Open Resource
                </a>
              )}
            </div>
          )}

          {/* NAVIGATION */}
          <div className="lesson-navigation">
            <button
              className="next-lesson-button"
              onClick={previousLesson}
              disabled={currentIndex <= 0}
            >
              ← Previous Lesson
            </button>

            <button
              className="next-lesson-button"
              onClick={nextLesson}
              disabled={
                currentIndex >=
                lessons.length - 1
              }
            >
              Next Lesson →
            </button>
          </div>

          {/* DETAILS */}
          <div className="learning-details">
            <div className="details-tabs">
              <button className="active">
                Overview
              </button>

              <button>
                Resources
              </button>
            </div>

            <div className="overview-content">
              <h3>
                About this lesson
              </h3>

              <p>
                {lessonDescription}
              </p>

              <div className="lesson-highlights">
                <div>
                  <strong>
                    Chapter
                  </strong>

                  <span>
                    {lesson.chapter}
                  </span>
                </div>

                <div>
                  <strong>
                    Type
                  </strong>

                  <span>
                    {lesson.type}
                  </span>
                </div>

                <div>
                  <strong>
                    Duration
                  </strong>

                  <span>
                    {lesson.duration}
                  </span>
                </div>

                <div>
                  <strong>
                    Instructor
                  </strong>

                  <span>
                    {instructor}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* PLAYLIST */}
        <aside className="playlist-card">
          <div className="playlist-header">
            <div>
              <span>
                COURSE PLAYLIST
              </span>

              <h2>
                {courseTitle}
              </h2>
            </div>

            <div className="progress-ring-mini">
              {courseProgress}%
            </div>
          </div>

          <div className="playlist-progress-top">
            <div>
              <span>
                Your progress
              </span>

              <strong>
                {completedCount}/{lessons.length}
              </strong>
            </div>

            <div className="playlist-progress-track">
              <div
                className="playlist-progress"
                style={{
                  width: `${courseProgress}%`,
                }}
              ></div>
            </div>
          </div>

          <div className="playlist-menu">
            {lessons.map(
              (item, index) => {
                const active =
                  String(item.id) ===
                  String(currentLesson);

                const completed =
                  completedLessons.includes(
                    item.id
                  );

                return (
                  <button
                    key={item.id}
                    className={`playlist-item ${
                      active ? "active" : ""
                    }`}
                    onClick={() =>
                      selectLesson(item.id)
                    }
                  >
                    <div className="playlist-item-top">
                      <div className="lesson-number">
                        {String(
                          index + 1
                        ).padStart(2, "0")}
                      </div>

                      <div className="playlist-item-info">
                        <span>
                          {item.chapter}
                        </span>

                        <strong>
                          {item.title}
                        </strong>

                        <div className="playlist-item-meta">
                          <span>
                            {item.type}
                          </span>

                          <span>
                            {item.duration}
                          </span>
                        </div>
                      </div>

                      <div className="playlist-arrow">
                        {completed
                          ? "✓"
                          : active
                          ? "▶"
                          : "›"}
                      </div>
                    </div>
                  </button>
                );
              }
            )}
          </div>

          <div className="playlist-footer">
            <span>
              {lessons.length} lessons
            </span>

            <span>
              {courseProgress}% completed
            </span>
          </div>
        </aside>
      </section>

      {/* MOBILE NEXT */}
      {currentIndex <
        lessons.length - 1 && (
        <div className="mobile-next-card">
          <span>
            NEXT LESSON
          </span>

          <strong>
            {lessons[currentIndex + 1].title}
          </strong>

          <button
            className="next-lesson-button"
            onClick={nextLesson}
          >
            Continue →
          </button>
        </div>
      )}
    </div>
  );
}
