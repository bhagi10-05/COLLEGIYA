import React, { useMemo, useState } from "react";
import "./assignments.css";

export default function Assignments() {
  const [assignments, setAssignments] = useState([]);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("All");
  const [showModal, setShowModal] = useState(false);

  const [form, setForm] = useState({
    title: "",
    course: "",
    description: "",
    dueDate: "",
    marks: "100",
    status: "Draft",
  });

  const filteredAssignments = useMemo(() => {
    return assignments.filter((item) => {
      const searchMatch =
        item.title.toLowerCase().includes(search.toLowerCase()) ||
        item.course.toLowerCase().includes(search.toLowerCase());

      const filterMatch =
        filter === "All" || item.status === filter;

      return searchMatch && filterMatch;
    });
  }, [assignments, search, filter]);

  const published = assignments.filter(
    (item) => item.status === "Published"
  ).length;

  const drafts = assignments.filter(
    (item) => item.status === "Draft"
  ).length;

  const submissions = assignments.reduce(
    (sum, item) => sum + item.submissions,
    0
  );

  const createAssignment = (e) => {
    e.preventDefault();

    if (!form.title.trim() || !form.course.trim()) {
      alert("Assignment title aur course required hai.");
      return;
    }

    const newAssignment = {
      id: Date.now(),
      ...form,
      submissions: 0,
      createdAt: new Date().toLocaleDateString("en-IN"),
    };

    setAssignments((prev) => [newAssignment, ...prev]);

    setForm({
      title: "",
      course: "",
      description: "",
      dueDate: "",
      marks: "100",
      status: "Draft",
    });

    setShowModal(false);
  };

  const deleteAssignment = (id) => {
    if (!window.confirm("Kya aap ye assignment delete karna chahte hain?")) {
      return;
    }

    setAssignments((prev) =>
      prev.filter((item) => item.id !== id)
    );
  };

  const toggleStatus = (id) => {
    setAssignments((prev) =>
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

  return (
    <div className="teacher-assignments-page">

      <div className="assignment-hero">

        <div>
          <span className="assignment-eyebrow">
            TEACHER PORTAL
          </span>

          <h1>Assignments</h1>

          <p>
            Create assignments, set deadlines and manage
            student submissions.
          </p>
        </div>

        <button
          className="assignment-primary-btn"
          onClick={() => setShowModal(true)}
        >
          ＋ Create Assignment
        </button>

      </div>

      <div className="assignment-stats">

        <div className="assignment-stat">
          <div className="assignment-stat-icon purple">
            ☷
          </div>

          <div>
            <strong>{assignments.length}</strong>
            <span>Total Assignments</span>
          </div>
        </div>

        <div className="assignment-stat">
          <div className="assignment-stat-icon green">
            ✓
          </div>

          <div>
            <strong>{published}</strong>
            <span>Published</span>
          </div>
        </div>

        <div className="assignment-stat">
          <div className="assignment-stat-icon orange">
            ◷
          </div>

          <div>
            <strong>{drafts}</strong>
            <span>Drafts</span>
          </div>
        </div>

        <div className="assignment-stat">
          <div className="assignment-stat-icon blue">
            ↗
          </div>

          <div>
            <strong>{submissions}</strong>
            <span>Submissions</span>
          </div>
        </div>

      </div>

      <div className="assignment-toolbar">

        <div className="assignment-search">
          <span>⌕</span>

          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search assignments or courses..."
          />
        </div>

        <div className="assignment-filters">

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

      <div className="assignment-list">

        {filteredAssignments.length === 0 ? (
          <div className="assignment-empty">

            <div className="assignment-empty-icon">
              ☷
            </div>

            <h2>
              {assignments.length === 0
                ? "No assignments yet"
                : "No assignments found"}
            </h2>

            <p>
              {assignments.length === 0
                ? "Create your first assignment for your students."
                : "Try changing your search or filter."}
            </p>

            {assignments.length === 0 && (
              <button
                className="assignment-primary-btn"
                onClick={() => setShowModal(true)}
              >
                Create Your First Assignment
              </button>
            )}

          </div>
        ) : (
          filteredAssignments.map((item, index) => (
            <div
              className="assignment-card"
              key={item.id}
            >

              <div className="assignment-number">
                {String(index + 1).padStart(2, "0")}
              </div>

              <div className="assignment-main">

                <div className="assignment-top">

                  <div>
                    <span className="assignment-type">
                      ASSIGNMENT
                    </span>

                    <h2>{item.title}</h2>

                    <p className="assignment-course">
                      📚 {item.course}
                    </p>
                  </div>

                  <span
                    className={`assignment-status ${
                      item.status.toLowerCase()
                    }`}
                  >
                    {item.status}
                  </span>

                </div>

                {item.description && (
                  <p className="assignment-description">
                    {item.description}
                  </p>
                )}

                <div className="assignment-meta">

                  <span>
                    📅 Due:{" "}
                    {item.dueDate || "Not set"}
                  </span>

                  <span>
                    🏆 {item.marks} Marks
                  </span>

                  <span>
                    ↑ {item.submissions} Submissions
                  </span>

                  <span>
                    Created: {item.createdAt}
                  </span>

                </div>

                <div className="assignment-actions">

                  <button
                    className="assignment-action publish"
                    onClick={() => toggleStatus(item.id)}
                  >
                    {item.status === "Published"
                      ? "Move to Draft"
                      : "Publish"}
                  </button>

                  <button
                    className="assignment-action"
                    onClick={() =>
                      alert(
                        "Submission management next module me connect hoga."
                      )
                    }
                  >
                    View Submissions
                  </button>

                  <button
                    className="assignment-action danger"
                    onClick={() =>
                      deleteAssignment(item.id)
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

      <div className="assignment-back">
        <a href="/teacher/dashboard">
          ← Back to Dashboard
        </a>
      </div>

      {showModal && (
        <div
          className="assignment-modal-overlay"
          onMouseDown={() => setShowModal(false)}
        >

          <div
            className="assignment-modal"
            onMouseDown={(e) => e.stopPropagation()}
          >

            <div className="assignment-modal-header">

              <div>
                <span>NEW ASSIGNMENT</span>
                <h2>Create Assignment</h2>
              </div>

              <button
                onClick={() => setShowModal(false)}
              >
                ×
              </button>

            </div>

            <form onSubmit={createAssignment}>

              <label>
                Assignment Title *

                <input
                  value={form.title}
                  onChange={(e) =>
                    setForm({
                      ...form,
                      title: e.target.value,
                    })
                  }
                  placeholder="e.g. Physics Numerical Assignment"
                />
              </label>

              <label>
                Course *

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

              <label>
                Description

                <textarea
                  value={form.description}
                  onChange={(e) =>
                    setForm({
                      ...form,
                      description: e.target.value,
                    })
                  }
                  placeholder="Describe the assignment..."
                />
              </label>

              <div className="assignment-form-grid">

                <label>
                  Due Date

                  <input
                    type="date"
                    value={form.dueDate}
                    onChange={(e) =>
                      setForm({
                        ...form,
                        dueDate: e.target.value,
                      })
                    }
                  />
                </label>

                <label>
                  Total Marks

                  <input
                    type="number"
                    min="1"
                    value={form.marks}
                    onChange={(e) =>
                      setForm({
                        ...form,
                        marks: e.target.value,
                      })
                    }
                  />
                </label>

              </div>

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

              <div className="assignment-modal-actions">

                <button
                  type="button"
                  className="assignment-cancel"
                  onClick={() => setShowModal(false)}
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  className="assignment-save"
                >
                  Create Assignment
                </button>

              </div>

            </form>

          </div>

        </div>
      )}

    </div>
  );
}
