import React, { useEffect, useRef, useState } from "react";
import "./learning.css";

const lessons = [
  {
    id: 1,
    title: "Introduction to Web Development",
    duration: "08:42",
    description:
      "Web development kya hai, frontend aur backend kya hota hai aur website kaise kaam karti hai.",
    video: "https://www.w3schools.com/html/mov_bbb.mp4",
    color: "blue",
  },
  {
    id: 2,
    title: "HTML Complete Basics",
    duration: "12:20",
    description:
      "HTML structure, headings, paragraphs, links, images aur important HTML elements.",
    video: "https://www.w3schools.com/html/mov_bbb.mp4",
    color: "purple",
  },
  {
    id: 3,
    title: "CSS From Zero",
    duration: "15:40",
    description:
      "CSS selectors, colors, fonts, spacing, borders, layouts aur responsive design.",
    video: "https://www.w3schools.com/html/mov_bbb.mp4",
    color: "cyan",
  },
  {
    id: 4,
    title: "JavaScript Fundamentals",
    duration: "18:15",
    description:
      "Variables, functions, conditions, loops, events aur JavaScript fundamentals.",
    video: "https://www.w3schools.com/html/mov_bbb.mp4",
    color: "orange",
  },
  {
    id: 5,
    title: "React Introduction",
    duration: "20:30",
    description:
      "React components, JSX, props, state aur modern frontend development.",
    video: "https://www.w3schools.com/html/mov_bbb.mp4",
    color: "pink",
  },
  {
    id: 6,
    title: "Build Your First Project",
    duration: "24:10",
    description:
      "HTML, CSS, JavaScript aur React ko use karke practical project banana.",
    video: "https://www.w3schools.com/html/mov_bbb.mp4",
    color: "green",
  },
];

function Learning() {
  const videoRef = useRef(null);
  const playerRef = useRef(null);
  const controlsTimer = useRef(null);

  const [currentLesson, setCurrentLesson] = useState(lessons[0]);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [buffered, setBuffered] = useState(0);
  const [volume, setVolume] = useState(1);
  const [muted, setMuted] = useState(false);
  const [speed, setSpeed] = useState(1);
  const [settingsOpen, setSettingsOpen] = useState(false);
  const [controlsVisible, setControlsVisible] = useState(true);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [liked, setLiked] = useState(false);
  const [saved, setSaved] = useState(false);
  const [descriptionOpen, setDescriptionOpen] = useState(false);

  const [completed, setCompleted] = useState(() => {
    try {
      return JSON.parse(
        localStorage.getItem("collegiya_learning_completed") || "[]"
      );
    } catch {
      return [];
    }
  });

  const currentIndex =
    lessons.findIndex((item) => item.id === currentLesson.id) + 1;

  const progress =
    lessons.length > 0
      ? Math.round((completed.length / lessons.length) * 100)
      : 0;

  useEffect(() => {
    localStorage.setItem(
      "collegiya_learning_completed",
      JSON.stringify(completed)
    );
  }, [completed]);

  useEffect(() => {
    const handleFullscreen = () => {
      setIsFullscreen(Boolean(document.fullscreenElement));
    };

    document.addEventListener("fullscreenchange", handleFullscreen);

    return () => {
      document.removeEventListener("fullscreenchange", handleFullscreen);
    };
  }, []);

  useEffect(() => {
    return () => {
      if (controlsTimer.current) {
        clearTimeout(controlsTimer.current);
      }
    };
  }, []);

  const showControls = () => {
    setControlsVisible(true);

    if (controlsTimer.current) {
      clearTimeout(controlsTimer.current);
    }

    controlsTimer.current = setTimeout(() => {
      if (videoRef.current && !videoRef.current.paused) {
        setControlsVisible(false);
      }
    }, 3000);
  };

  const playPause = async () => {
    const video = videoRef.current;

    if (!video) return;

    if (video.paused) {
      try {
        await video.play();
      } catch (error) {
        console.log(error);
      }
    } else {
      video.pause();
    }

    showControls();
  };

  const seek = (seconds) => {
    const video = videoRef.current;

    if (!video) return;

    video.currentTime = Math.max(
      0,
      Math.min(video.currentTime + seconds, video.duration || 0)
    );

    showControls();
  };

  const changeProgress = (event) => {
    const video = videoRef.current;

    if (!video) return;

    const value = Number(event.target.value);

    video.currentTime = value;
    setCurrentTime(value);
    showControls();
  };

  const changeVolume = (event) => {
    const value = Number(event.target.value);
    const video = videoRef.current;

    if (!video) return;

    video.volume = value;
    video.muted = value === 0;

    setVolume(value);
    setMuted(value === 0);
  };

  const toggleMute = () => {
    const video = videoRef.current;

    if (!video) return;

    video.muted = !video.muted;
    setMuted(video.muted);
  };

  const changeSpeed = (value) => {
    const video = videoRef.current;

    if (!video) return;

    video.playbackRate = value;
    setSpeed(value);
    setSettingsOpen(false);
    showControls();
  };

  const fullscreen = async () => {
    const player = playerRef.current;

    if (!player) return;

    try {
      if (!document.fullscreenElement) {
        await player.requestFullscreen();
      } else {
        await document.exitFullscreen();
      }
    } catch (error) {
      console.log(error);
    }
  };

  const formatTime = (value) => {
    if (!Number.isFinite(value)) return "00:00";

    const hours = Math.floor(value / 3600);
    const minutes = Math.floor((value % 3600) / 60);
    const seconds = Math.floor(value % 60);

    if (hours > 0) {
      return (
        String(hours).padStart(2, "0") +
        ":" +
        String(minutes).padStart(2, "0") +
        ":" +
        String(seconds).padStart(2, "0")
      );
    }

    return (
      String(minutes).padStart(2, "0") +
      ":" +
      String(seconds).padStart(2, "0")
    );
  };

  const completeLesson = (id) => {
    setCompleted((old) => {
      if (old.includes(id)) return old;
      return [...old, id];
    });
  };

  const selectLesson = (lesson) => {
    const index = lessons.findIndex(
      (item) => item.id === lesson.id
    );

    if (index > 0) {
      const previousLesson = lessons[index - 1];

      if (!completed.includes(previousLesson.id)) {
        return;
      }
    }

    setCurrentLesson(lesson);
    setCurrentTime(0);
    setDuration(0);
    setBuffered(0);
    setIsPlaying(false);
    setSettingsOpen(false);
    setDescriptionOpen(false);

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const previousLesson = () => {
    if (currentIndex <= 1) return;

    selectLesson(lessons[currentIndex - 2]);
  };

  const nextLesson = () => {
    completeLesson(currentLesson.id);

    if (currentIndex < lessons.length) {
      selectLesson(lessons[currentIndex]);
    }
  };

  const handleEnded = () => {
    setIsPlaying(false);
    setControlsVisible(true);
    completeLesson(currentLesson.id);
  };

  useEffect(() => {
    const handleKeyboard = (event) => {
      const tag = event.target?.tagName?.toLowerCase();

      if (
        tag === "input" ||
        tag === "button" ||
        tag === "textarea"
      ) {
        return;
      }

      if (event.code === "Space" || event.key.toLowerCase() === "k") {
        event.preventDefault();
        playPause();
      }

      if (event.key === "ArrowLeft") {
        event.preventDefault();
        seek(-10);
      }

      if (event.key === "ArrowRight") {
        event.preventDefault();
        seek(10);
      }

      if (event.key.toLowerCase() === "m") {
        event.preventDefault();
        toggleMute();
      }

      if (event.key.toLowerCase() === "f") {
        event.preventDefault();
        fullscreen();
      }
    };

    window.addEventListener("keydown", handleKeyboard);

    return () => {
      window.removeEventListener("keydown", handleKeyboard);
    };
  });

  return (
    <main className="color-learning-page">
      <div className="learning-wrapper">

        {/* TOP COURSE HEADER */}

        <div className="course-top-card">
          <div className="course-top-left">
            <div className="course-icon">
              🎓
            </div>

            <div>
              <span>COLLEGIYA COURSE</span>
              <h2>Full Stack Web Development</h2>
            </div>
          </div>

          <div className="course-progress-box">
            <strong>{progress}%</strong>

            <div className="course-progress-track">
              <div
                style={{
                  width: `${progress}%`,
                }}
              />
            </div>

            <small>
              {completed.length}/{lessons.length} completed
            </small>
          </div>
        </div>

        {/* VIDEO */}

        <section
          ref={playerRef}
          className={
            isFullscreen
              ? "color-player fullscreen-player"
              : "color-player"
          }
          onMouseMove={showControls}
          onTouchStart={showControls}
        >
          <video
            ref={videoRef}
            key={currentLesson.id}
            className="color-video"
            src={currentLesson.video}
            playsInline
            preload="metadata"
            onClick={playPause}
            onPlay={() => {
              setIsPlaying(true);
              showControls();
            }}
            onPause={() => {
              setIsPlaying(false);
              setControlsVisible(true);
            }}
            onLoadedMetadata={(event) => {
              setDuration(event.target.duration || 0);
            }}
            onTimeUpdate={(event) => {
              const video = event.target;

              setCurrentTime(video.currentTime);

              if (
                video.buffered.length > 0 &&
                video.duration
              ) {
                const end = video.buffered.end(
                  video.buffered.length - 1
                );

                setBuffered(
                  Math.min(
                    100,
                    (end / video.duration) * 100
                  )
                );
              }
            }}
            onEnded={handleEnded}
          />

          {!isPlaying && (
            <button
              className="big-play-button"
              onClick={playPause}
              aria-label="Play video"
            >
              ▶
            </button>
          )}

          <button
            className="skip-button skip-left"
            onDoubleClick={() => seek(-10)}
          >
            <span>↶</span>
            <small>10</small>
          </button>

          <button
            className="skip-button skip-right"
            onDoubleClick={() => seek(10)}
          >
            <span>↷</span>
            <small>10</small>
          </button>

          <div
            className={
              controlsVisible
                ? "color-controls controls-show"
                : "color-controls"
            }
          >
            <div className="color-progress">
              <div
                className="color-buffer"
                style={{
                  width: `${buffered}%`,
                }}
              />

              <div
                className="color-played"
                style={{
                  width:
                    duration > 0
                      ? `${(currentTime / duration) * 100}%`
                      : "0%",
                }}
              />

              <input
                type="range"
                min="0"
                max={duration || 0}
                step="0.1"
                value={currentTime}
                onChange={changeProgress}
              />
            </div>

            <div className="control-row">
              <div className="control-left">
                <button onClick={playPause}>
                  {isPlaying ? "❚❚" : "▶"}
                </button>

                <button
                  className="ten-sec"
                  onClick={() => seek(-10)}
                >
                  ↶
                  <small>10</small>
                </button>

                <button
                  className="ten-sec"
                  onClick={() => seek(10)}
                >
                  ↷
                  <small>10</small>
                </button>

                <button onClick={toggleMute}>
                  {muted || volume === 0 ? "🔇" : "🔊"}
                </button>

                <input
                  className="volume-control"
                  type="range"
                  min="0"
                  max="1"
                  step="0.01"
                  value={muted ? 0 : volume}
                  onChange={changeVolume}
                />

                <span className="time-text">
                  {formatTime(currentTime)} / {formatTime(duration)}
                </span>
              </div>

              <div className="control-right">
                <div className="settings-area">
                  <button
                    onClick={() =>
                      setSettingsOpen(!settingsOpen)
                    }
                  >
                    ⚙
                  </button>

                  {settingsOpen && (
                    <div className="speed-menu">
                      <strong>Playback speed</strong>

                      {[0.5, 0.75, 1, 1.25, 1.5, 1.75, 2].map(
                        (item) => (
                          <button
                            key={item}
                            className={
                              speed === item
                                ? "speed-active"
                                : ""
                            }
                            onClick={() =>
                              changeSpeed(item)
                            }
                          >
                            {item === 1 ? "Normal" : `${item}x`}

                            {speed === item && " ✓"}
                          </button>
                        )
                      )}
                    </div>
                  )}
                </div>

                <button onClick={fullscreen}>⛶</button>
              </div>
            </div>
          </div>
        </section>

        {/* VIDEO INFORMATION */}

        <section className="video-info-card">
          <div className="lesson-badge">
            LESSON {currentIndex}
          </div>

          <h1>{currentLesson.title}</h1>

          <div className="lesson-meta">
            <span>🎓 COLLEGIYA Learning</span>
            <span>•</span>
            <span>{currentLesson.duration}</span>

            {completed.includes(currentLesson.id) && (
              <>
                <span>•</span>
                <span className="completed-text">
                  ✓ Completed
                </span>
              </>
            )}
          </div>

          <div className="action-buttons">
            <button
              className={liked ? "active-action" : ""}
              onClick={() => setLiked(!liked)}
            >
              {liked ? "♥" : "♡"} Like
            </button>

            <button>
              ↗ Share
            </button>

            <button
              className={saved ? "active-action" : ""}
              onClick={() => setSaved(!saved)}
            >
              {saved ? "✓ Saved" : "＋ Save"}
            </button>
          </div>
        </section>

        {/* DESCRIPTION */}

        <section className="description-card">
          <div className="description-heading">
            <div>
              <span>ABOUT THIS LESSON</span>
              <h3>What you will learn</h3>
            </div>

            <button
              onClick={() =>
                setDescriptionOpen(!descriptionOpen)
              }
            >
              {descriptionOpen ? "Less" : "More"}
            </button>
          </div>

          <p
            className={
              descriptionOpen
                ? "description-full"
                : ""
            }
          >
            {currentLesson.description}
            <br />
            <br />
            Lesson complete karne ke baad next lesson unlock
            hoga. Concepts ko sirf dekhna nahi, practice bhi
            karna hai.
          </p>
        </section>

        {/* PLAYLIST */}

        <section className="playlist-card">
          <div className="playlist-header">
            <div>
              <span>YOUR LEARNING JOURNEY</span>
              <h2>Course Playlist</h2>
              <p>
                Complete lessons step-by-step
              </p>
            </div>

            <div className="playlist-progress">
              <strong>{progress}%</strong>

              <div>
                <i
                  style={{
                    width: `${progress}%`,
                  }}
                />
              </div>
            </div>
          </div>

          <div className="lesson-list">
            {lessons.map((lesson, index) => {
              const isCurrent =
                lesson.id === currentLesson.id;

              const isCompleted =
                completed.includes(lesson.id);

              const isLocked =
                index > 0 &&
                !completed.includes(
                  lessons[index - 1].id
                );

              return (
                <button
                  key={lesson.id}
                  disabled={isLocked}
                  onClick={() => selectLesson(lesson)}
                  className={[
                    "lesson-item",
                    `lesson-${lesson.color}`,
                    isCurrent ? "lesson-current" : "",
                    isCompleted ? "lesson-done" : "",
                    isLocked ? "lesson-locked" : "",
                  ].join(" ")}
                >
                  <div className="lesson-number">
                    {isCompleted ? "✓" : index + 1}
                  </div>

                  <div className="lesson-thumbnail">
                    <div className="thumbnail-shape">
                      <span>▶</span>
                    </div>

                    <small>{lesson.duration}</small>
                  </div>

                  <div className="lesson-content">
                    <h3>{lesson.title}</h3>

                    <p>{lesson.description}</p>

                    <span>
                      {isCompleted
                        ? "✓ Completed"
                        : isCurrent
                        ? "● Now Playing"
                        : isLocked
                        ? "🔒 Complete previous lesson"
                        : "▶ Start lesson"}
                    </span>
                  </div>

                  <div className="lesson-right">
                    {isCompleted && (
                      <b>✓</b>
                    )}

                    {isLocked && (
                      <b>🔒</b>
                    )}

                    {isCurrent && !isCompleted && (
                      <i />
                    )}
                  </div>
                </button>
              );
            })}
          </div>
        </section>

        {/* PREVIOUS NEXT */}

        <div className="lesson-navigation">
          <button
            disabled={currentIndex === 1}
            onClick={previousLesson}
          >
            <span>←</span>

            <div>
              <small>PREVIOUS</small>
              <strong>Lesson</strong>
            </div>
          </button>

          <button
            disabled={currentIndex === lessons.length}
            onClick={nextLesson}
          >
            <div>
              <small>NEXT</small>
              <strong>Lesson</strong>
            </div>

            <span>→</span>
          </button>
        </div>

      </div>
    </main>
  );
}

export default Learning;
