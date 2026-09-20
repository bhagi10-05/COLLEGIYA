import React, { useMemo, useState } from "react";
import "./students.css";

const studentsData = [
  {
    id: 1,
    name: "Ramesh Kumar",
    email: "ramesh@example.com",
    course: "Full Stack Development",
    progress: 82,
    lastActive: "Today, 10:24 AM",
    status: "Active",
    score: 88,
    joined: "12 Aug 2026",
  },
  {
    id: 2,
    name: "Priya Sharma",
    email: "priya@example.com",
    course: "React Development",
    progress: 68,
    lastActive: "Today, 09:15 AM",
    status: "Active",
    score: 81,
    joined: "18 Aug 2026",
  },
  {
    id: 3,
    name: "Amit Raj",
    email: "amit@example.com",
    course: "JavaScript Masterclass",
    progress: 94,
    lastActive: "Yesterday",
    status: "Active",
    score: 92,
    joined: "04 Jul 2026",
  },
  {
    id: 4,
    name: "Neha Kumari",
    email: "neha@example.com",
    course: "Web Development",
    progress: 46,
    lastActive: "2 days ago",
    status: "At Risk",
    score: 64,
    joined: "22 Aug 2026",
  },
  {
    id: 5,
    name: "Rahul Singh",
    email: "rahul@example.com",
    course: "Full Stack Development",
    progress: 100,
    lastActive: "3 days ago",
    status: "Completed",
    score: 95,
    joined: "11 Jun 2026",
  },
  {
    id: 6,
    name: "Anjali Kumari",
    email: "anjali@example.com",
    course: "React Development",
    progress: 73,
    lastActive: "Yesterday",
    status: "Active",
    score: 84,
    joined: "27 Jul 2026",
  },
  {
    id: 7,
    name: "Vikas Kumar",
    email: "vikas@example.com",
    course: "JavaScript Masterclass",
    progress: 31,
    lastActive: "5 days ago",
    status: "At Risk",
    score: 58,
    joined: "02 Sep 2026",
  },
  {
    id: 8,
    name: "Pooja Singh",
    email: "pooja@example.com",
    course: "Web Development",
    progress: 100,
    lastActive: "1 week ago",
    status: "Completed",
    score: 91,
    joined: "15 May 2026",
  },
];

function getInitials(name) {
  return name
    .split(" ")
    .map((word) => word[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();
}

function getAvatarClass(id) {
  return `ts-avatar avatar-${((id - 1) % 6) + 1}`;
}

export default function Students() {
  const [search, setSearch] = useState("");
  const [course, setCourse] = useState("All Courses");
  const [status, setStatus] = useState("All Status");
  const [selectedStudent, setSelectedStudent] = useState(null);

  const courses = [
    "All Courses",
    ...new Set(studentsData.map((student) => student.course)),
  ];

  const filteredStudents = useMemo(() => {
    return studentsData.filter((student) => {
      const searchValue = search.toLowerCase().trim();

      const matchesSearch =
        !searchValue ||
        student.name.toLowerCase().includes(searchValue) ||
        student.email.toLowerCase().includes(searchValue);

      const matchesCourse =
        course === "All Courses" || student.course === course;

      const matchesStatus =
        status === "All Status" || student.status === status;

      return matchesSearch && matchesCourse && matchesStatus;
    });
  }, [search, course, status]);

  const totalStudents = studentsData.length;

  const activeStudents = studentsData.filter(
    (student) => student.status === "Active"
  ).length;

  const completedStudents = studentsData.filter(
    (student) => student.status === "Completed"
  ).length;

  const atRiskStudents = studentsData.filter(
    (student) => student.status === "At Risk"
  ).length;

  const averageProgress = Math.round(
    studentsData.reduce(
      (total, student) => total + student.progress,
      0
    ) / studentsData.length
  );

  const completionRate = Math.round(
    (completedStudents / totalStudents) * 100
  );

  return (
    <div className="ts-page">

      {/* ================= HEADER ================= */}
      <section className="ts-header">
        <div className="ts-header-content">
          <div className="ts-breadcrumb">
            Teacher Portal <span>/</span> Students
          </div>

          <h1>Students</h1>

          <p>
            Manage your students, monitor their progress and
            keep track of learning activity.
          </p>
        </div>

        <button className="ts-primary-btn">
          <span>+</span>
          Add Student
        </button>
      </section>

      {/* ================= STATS ================= */}
      <section className="ts-stats">

        <div className="ts-stat-card purple-card">
          <div className="ts-stat-icon purple">♙</div>

          <div>
            <span>Total Students</span>
            <strong>{totalStudents}</strong>
            <small>Across all courses</small>
          </div>
        </div>

        <div className="ts-stat-card green-card">
          <div className="ts-stat-icon green">✓</div>

          <div>
            <span>Active Students</span>
            <strong>{activeStudents}</strong>
            <small>Currently learning</small>
          </div>
        </div>

        <div className="ts-stat-card blue-card">
          <div className="ts-stat-icon blue">★</div>

          <div>
            <span>Completed</span>
            <strong>{completedStudents}</strong>
            <small>Course completed</small>
          </div>
        </div>

        <div className="ts-stat-card orange-card">
          <div className="ts-stat-icon orange">!</div>

          <div>
            <span>Need Attention</span>
            <strong>{atRiskStudents}</strong>
            <small>Low activity</small>
          </div>
        </div>

      </section>

      {/* ================= OVERVIEW ================= */}
      <section className="ts-overview">

        <div className="ts-overview-card">

          <div className="ts-overview-heading">
            <div>
              <span>Learning Overview</span>
              <strong>Average Student Progress</strong>
            </div>

            <div className="ts-progress-number">
              {averageProgress}%
            </div>
          </div>

          <div className="ts-big-progress">
            <div style={{ width: `${averageProgress}%` }} />
          </div>

          <div className="ts-overview-bottom">
            <span>
              Students are making steady progress
            </span>

            <span>
              {activeStudents} active learners
            </span>
          </div>

        </div>

        <div className="ts-mini-card">

          <div className="ts-mini-card-top">
            <span>Completion Rate</span>
            <span className="ts-mini-icon">✓</span>
          </div>

          <strong>{completionRate}%</strong>

          <p>
            Students completed their course
          </p>

        </div>

      </section>

      {/* ================= STUDENTS CARD ================= */}
      <section className="ts-students-card">

        <div className="ts-card-header">

          <div>
            <h2>All Students</h2>
            <p>{filteredStudents.length} students found</p>
          </div>

          <button className="ts-export-btn">
            ↓ Export
          </button>

        </div>

        {/* FILTERS */}
        <div className="ts-filters">

          <div className="ts-search">
            <span>⌕</span>

            <input
              type="text"
              placeholder="Search student by name or email..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>

          <select
            value={course}
            onChange={(e) => setCourse(e.target.value)}
          >
            {courses.map((item) => (
              <option key={item} value={item}>
                {item}
              </option>
            ))}
          </select>

          <select
            value={status}
            onChange={(e) => setStatus(e.target.value)}
          >
            <option>All Status</option>
            <option>Active</option>
            <option>Completed</option>
            <option>At Risk</option>
          </select>

        </div>

        {/* DESKTOP TABLE */}
        <div className="ts-table-wrapper">

          <table className="ts-table">

            <thead>
              <tr>
                <th>STUDENT</th>
                <th>COURSE</th>
                <th>PROGRESS</th>
                <th>SCORE</th>
                <th>LAST ACTIVE</th>
                <th>STATUS</th>
                <th></th>
              </tr>
            </thead>

            <tbody>

              {filteredStudents.map((student) => (

                <tr key={student.id}>

                  <td>
                    <div className="ts-student">

                      <div className={getAvatarClass(student.id)}>
                        {getInitials(student.name)}
                      </div>

                      <div>
                        <strong>{student.name}</strong>
                        <span>{student.email}</span>
                      </div>

                    </div>
                  </td>

                  <td>
                    <span className="ts-course">
                      {student.course}
                    </span>
                  </td>

                  <td>

                    <div className="ts-progress-cell">

                      <div className="ts-progress-track">
                        <div
                          style={{
                            width: `${student.progress}%`,
                          }}
                        />
                      </div>

                      <span>
                        {student.progress}%
                      </span>

                    </div>

                  </td>

                  <td>
                    <strong className="ts-score">
                      {student.score}%
                    </strong>
                  </td>

                  <td>
                    <span className="ts-last-active">
                      {student.lastActive}
                    </span>
                  </td>

                  <td>

                    <span
                      className={`ts-status ${student.status
                        .toLowerCase()
                        .replace(" ", "-")}`}
                    >
                      <i />
                      {student.status}
                    </span>

                  </td>

                  <td>

                    <button
                      className="ts-view-btn"
                      onClick={() =>
                        setSelectedStudent(student)
                      }
                    >
                      View
                    </button>

                  </td>

                </tr>

              ))}

            </tbody>

          </table>

        </div>

        {/* MOBILE LIST */}
        <div className="ts-mobile-list">

          {filteredStudents.map((student) => (

            <div
              className="ts-mobile-student"
              key={student.id}
            >

              <div className="ts-mobile-top">

                <div className="ts-student">

                  <div className={getAvatarClass(student.id)}>
                    {getInitials(student.name)}
                  </div>

                  <div>
                    <strong>{student.name}</strong>
                    <span>{student.email}</span>
                  </div>

                </div>

                <span
                  className={`ts-status ${student.status
                    .toLowerCase()
                    .replace(" ", "-")}`}
                >
                  <i />
                  {student.status}
                </span>

              </div>

              <div className="ts-mobile-course">
                {student.course}
              </div>

              <div className="ts-mobile-progress">

                <div className="ts-mobile-progress-top">
                  <span>Course Progress</span>
                  <strong>{student.progress}%</strong>
                </div>

                <div className="ts-progress-track">
                  <div
                    style={{
                      width: `${student.progress}%`,
                    }}
                  />
                </div>

              </div>

              <div className="ts-mobile-info">

                <div>
                  <span>Score</span>
                  <strong>{student.score}%</strong>
                </div>

                <div>
                  <span>Last Active</span>
                  <strong>{student.lastActive}</strong>
                </div>

              </div>

              <button
                className="ts-mobile-view"
                onClick={() =>
                  setSelectedStudent(student)
                }
              >
                View Student
              </button>

            </div>

          ))}

        </div>

        {/* EMPTY */}
        {filteredStudents.length === 0 && (

          <div className="ts-empty">

            <div>⌕</div>

            <strong>No students found</strong>

            <span>
              Try changing your search or filters.
            </span>

          </div>

        )}

      </section>

      {/* ================= MODAL ================= */}
      {selectedStudent && (

        <div
          className="ts-modal-overlay"
          onClick={() => setSelectedStudent(null)}
        >

          <div
            className="ts-modal"
            onClick={(e) => e.stopPropagation()}
          >

            <button
              className="ts-modal-close"
              onClick={() =>
                setSelectedStudent(null)
              }
            >
              ×
            </button>

            <div className="ts-modal-profile">

              <div
                className={getAvatarClass(
                  selectedStudent.id
                )}
              >
                {getInitials(selectedStudent.name)}
              </div>

              <div>
                <h2>{selectedStudent.name}</h2>
                <p>{selectedStudent.email}</p>
              </div>

            </div>

            <div className="ts-modal-grid">

              <div>
                <span>Course</span>
                <strong>
                  {selectedStudent.course}
                </strong>
              </div>

              <div>
                <span>Progress</span>
                <strong>
                  {selectedStudent.progress}%
                </strong>
              </div>

              <div>
                <span>Score</span>
                <strong>
                  {selectedStudent.score}%
                </strong>
              </div>

              <div>
                <span>Joined</span>
                <strong>
                  {selectedStudent.joined}
                </strong>
              </div>

            </div>

            <div className="ts-modal-progress">

              <div>
                <span>Learning Progress</span>

                <strong>
                  {selectedStudent.progress}%
                </strong>
              </div>

              <div className="ts-progress-track">

                <div
                  style={{
                    width: `${selectedStudent.progress}%`,
                  }}
                />

              </div>

            </div>

            <button
              className="ts-primary-btn ts-modal-btn"
              onClick={() =>
                setSelectedStudent(null)
              }
            >
              Close
            </button>

          </div>

        </div>

      )}

    </div>
  );
}
