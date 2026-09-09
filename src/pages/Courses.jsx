import { useState } from "react";
import CourseCard from "../components/CourseCard";
import { courses } from "../data/courses";

export default function Courses() {
  const [search, setSearch] = useState("");

  const filtered = courses.filter(c =>
    `${c.title} ${c.category}`.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <section className="page">
      <div className="page-heading">
        <span>COLLEGIYA ACADEMY</span>
        <h1>Explore Courses</h1>
        <p>Choose a course and start learning today.</p>
      </div>

      <div className="search-box">
        🔎
        <input
          value={search}
          onChange={e => setSearch(e.target.value)}
          placeholder="Search courses..."
        />
      </div>

      <div className="course-grid">
        {filtered.map(course => (
          <CourseCard key={course.id} course={course} />
        ))}
      </div>

      {!filtered.length && (
        <div className="empty">No courses found.</div>
      )}
    </section>
  );
}
