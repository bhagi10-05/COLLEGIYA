import { Link } from "react-router-dom";

export default function CourseCard({ course }) {
  return (
    <article className="course-card">
      <div className="course-icon">{course.icon}</div>

      <span className="tag">{course.level}</span>

      <h3>{course.title}</h3>

      <p>{course.description}</p>

      <div className="course-info">
        <span>👥 {course.students}</span>
        <span>⭐ {course.rating}</span>
      </div>

      <div className="course-bottom">
        <b>Free</b>
        <Link to={`/course/${course.id}`}>View Course →</Link>
      </div>
    </article>
  );
}
