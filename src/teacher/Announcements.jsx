import React, { useMemo, useState } from "react";
import "./announcements.css";

export default function Announcements() {
  const [announcements, setAnnouncements] = useState([]);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("All");
  const [showModal, setShowModal] = useState(false);

  const [form, setForm] = useState({
    title: "",
    message: "",
    course: "",
    audience: "All Students",
    date: "",
    priority: "Normal",
    status: "Draft",
  });

  const filtered = useMemo(() => {
    return announcements.filter((item) => {
      const textMatch =
        item.title.toLowerCase().includes(search.toLowerCase()) ||
        item.message.toLowerCase().includes(search.toLowerCase()) ||
        item.course.toLowerCase().includes(search.toLowerCase());

      const statusMatch =
        filter === "All" || item.status === filter;

      return textMatch && statusMatch;
    });
  }, [announcements, search, filter]);

  const published = announcements.filter(
    (item) => item.status === "Published"
  ).length;

  const drafts = announcements.filter(
    (item) => item.status === "Draft"
  ).length;

  const important = announcements.filter(
    (item) => item.priority === "Important"
  ).length;

  const createAnnouncement = (e) => {
    e.preventDefault();

    if (!form.title.trim() || !form.message.trim()) {
      alert("Title aur message required hai.");
      return;
    }

    const newAnnouncement = {
      id: Date.now(),
      ...form,
      createdAt: new Date().toLocaleDateString("en-IN"),
    };

    setAnnouncements((prev) => [
      newAnnouncement,
      ...prev,
    ]);

    setForm({
      title: "",
      message: "",
      course: "",
      audience: "All Students",
      date: "",
      priority: "Normal",
      status: "Draft",
    });

    setShowModal(false);
  };

  const deleteAnnouncement = (id) => {
    if (!window.confirm("Announcement delete karein?")) {
      return;
    }

    setAnnouncements((prev) =>
      prev.filter((item) => item.id !== id)
    );
  };

  const toggleStatus = (id) => {
    setAnnouncements((prev) =>
      prev.map((item) =>
        item.id === id
          ? {
              ...item,
              status:
                item.status === "Published"
                  ? "Draft"
                  : "Published",
            }
          : item
      )
    );
  };

  const togglePriority = (id) => {
    setAnnouncements((prev) =>
      prev.map((item) =>
        item.id === id
          ? {
              ...item,
              priority:
                item.priority === "Important"
                  ? "Normal"
                  : "Important",
            }
          : item
      )
    );
  };

  return (
    <div className="teacher-announcements-page">

      <div className="announcement-hero">

        <div>
          <span className="announcement-eyebrow">
            TEACHER PORTAL
          </span>

          <h1>Announcements</h1>

          <p>
            Share important updates and messages with your students.
          </p>
        </div>

        <button
          className="announcement-primary-btn"
          onClick={() => setShowModal(true)}
        >
          ＋ New Announcement
        </button>

      </div>

      <div className="announcement-stats">

        <div className="announcement-stat">
          <div className="announcement-icon purple">
            ◈
          </div>

          <div>
            <strong>{announcements.length}</strong>
            <span>Total Announcements</span>
          </div>
        </div>

        <div className="announcement-stat">
          <div className="announcement-icon green">
            ✓
          </div>

          <div>
            <strong>{published}</strong>
            <span>Published</span>
          </div>
        </div>

        <div className="announcement-stat">
          <div className="announcement-icon orange">
            ◷
          </div>

          <div>
            <strong>{drafts}</strong>
            <span>Drafts</span>
          </div>
        </div>

        <div className="announcement-stat">
          <div className="announcement-icon red">
            !
          </div>

          <div>
            <strong>{important}</strong>
            <span>Important</span>
          </div>
        </div>

      </div>

      <div className="announcement-toolbar">

        <div className="announcement-search">
          <span>⌕</span>

          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search announcements..."
          />
        </div>

        <div className="announcement-filters">

          {["All", "Published", "Draft"].map((item) => (
            <button
              key={item}
              className={filter === item ? "active" : ""}
              onClick={() => setFilter(item)}
            >
              {item}
            </button>
          ))}

        </div>

      </div>

      <div className="announcement-list">

        {filtered.length === 0 ? (
          <div className="announcement-empty">

            <div className="announcement-empty-icon">
              ◈
            </div>

            <h2>
              {announcements.length === 0
                ? "No announcements yet"
                : "No announcements found"}
            </h2>

            <p>
              {announcements.length === 0
                ? "Create your first announcement for your students."
                : "Try changing your search or filter."}
            </p>

            {announcements.length === 0 && (
              <button
                className="announcement-primary-btn"
                onClick={() => setShowModal(true)}
              >
                Create Announcement
              </button>
            )}

          </div>
        ) : (
          filtered.map((item, index) => (
            <div
              className={`announcement-card ${
                item.priority === "Important"
                  ? "important"
                  : ""
              }`}
              key={item.id}
            >

              <div className="announcement-number">
                {String(index + 1).padStart(2, "0")}
              </div>

              <div className="announcement-main">

                <div className="announcement-top">

                  <div>

                    <div className="announcement-labels">

                      <span className="announcement-type">
                        ANNOUNCEMENT
                      </span>

                      {item.priority === "Important" && (
                        <span className="important-badge">
                          IMPORTANT
                        </span>
                      )}

                    </div>

                    <h2>{item.title}</h2>

                    <p className="announcement-course">
                      📚 {item.course || "All Courses"}
                    </p>

                  </div>

                  <span
                    className={`announcement-status ${
                      item.status.toLowerCase()
                    }`}
                  >
                    {item.status}
                  </span>

                </div>

                <p className="announcement-message">
                  {item.message}
                </p>

                <div className="announcement-meta">

                  <span>
                    👥 {item.audience}
                  </span>

                  <span>
                    📅{" "}
                    {item.date || "Immediately"}
                  </span>

                  <span>
                    Created: {item.createdAt}
                  </span>

                </div>

                <div className="announcement-actions">

                  <button
                    className="announcement-action publish"
                    onClick={() =>
                      toggleStatus(item.id)
                    }
                  >
                    {item.status === "Published"
                      ? "Move to Draft"
                      : "Publish"}
                  </button>

                  <button
                    className={`announcement-action ${
                      item.priority === "Important"
                        ? "priority-active"
                        : ""
                    }`}
                    onClick={() =>
                      togglePriority(item.id)
                    }
                  >
                    {item.priority === "Important"
                      ? "★ Important"
                      : "☆ Mark Important"}
                  </button>

                  <button
                    className="announcement-action danger"
                    onClick={() =>
                      deleteAnnouncement(item.id)
                    }
                  >
                    Delete
                  </button>

                </div>

              </div>

            </div>
          ))
        )}

      </div>

      <div className="announcement-back">
        <a href="/teacher/dashboard">
          ← Back to Dashboard
        </a>
      </div>

      {showModal && (
        <div
          className="announcement-modal-overlay"
          onMouseDown={() => setShowModal(false)}
        >

          <div
            className="announcement-modal"
            onMouseDown={(e) => e.stopPropagation()}
          >

            <div className="announcement-modal-header">

              <div>
                <span>NEW ANNOUNCEMENT</span>
                <h2>Create Announcement</h2>
              </div>

              <button
                onClick={() => setShowModal(false)}
              >
                ×
              </button>

            </div>

            <form onSubmit={createAnnouncement}>

              <label>
                Title *

                <input
                  value={form.title}
                  onChange={(e) =>
                    setForm({
                      ...form,
                      title: e.target.value,
                    })
                  }
                  placeholder="e.g. New class schedule"
                />
              </label>

              <label>
                Message *

                <textarea
                  value={form.message}
                  onChange={(e) =>
                    setForm({
                      ...form,
                      message: e.target.value,
                    })
                  }
                  placeholder="Write your announcement..."
                />
              </label>

              <label>
                Course

                <input
                  value={form.course}
                  onChange={(e) =>
                    setForm({
                      ...form,
                      course: e.target.value,
                    })
                  }
                  placeholder="e.g. Class 12 Physics"
                />
              </label>

              <div className="announcement-form-grid">

                <label>
                  Audience

                  <select
                    value={form.audience}
                    onChange={(e) =>
                      setForm({
                        ...form,
                        audience: e.target.value,
                      })
                    }
                  >
                    <option>All Students</option>
                    <option>Course Students</option>
                    <option>Active Students</option>
                  </select>
                </label>

                <label>
                  Publish Date

                  <input
                    type="date"
                    value={form.date}
                    onChange={(e) =>
                      setForm({
                        ...form,
                        date: e.target.value,
                      })
                    }
                  />
                </label>

              </div>

              <div className="announcement-form-grid">

                <label>
                  Priority

                  <select
                    value={form.priority}
                    onChange={(e) =>
                      setForm({
                        ...form,
                        priority: e.target.value,
                      })
                    }
                  >
                    <option>Normal</option>
                    <option>Important</option>
                  </select>
                </label>

                <label>
                  Status

                  <select
                    value={form.status}
                    onChange={(e) =>
                      setForm({
                        ...form,
                        status: e.target.value,
                      })
                    }
                  >
                    <option>Draft</option>
                    <option>Published</option>
                  </select>
                </label>

              </div>

              <div className="announcement-modal-actions">

                <button
                  type="button"
                  className="announcement-cancel"
                  onClick={() => setShowModal(false)}
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  className="announcement-save"
                >
                  Create Announcement
                </button>

              </div>

            </form>

          </div>

        </div>
      )}

    </div>
  );
}
