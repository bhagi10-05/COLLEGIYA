import { Link, useParams } from "react-router-dom";
import { courses } from "../data/courses";

export default function CourseDetails() {
  const { id } = useParams();
  const course = courses.find(c => c.id === id);

  if (!course) {
    return (
      <section className="page empty">
        <h1>Course not found</h1>
        <Link to="/courses">← Back to Courses</Link>
      </section>
    );
  }

  return (
    <section className="course-detail">
      <div className="detail-main">
        <span className="tag">{course.level}</span>
        <div className="detail-icon">{course.icon}</div>

        <h1>{course.title}</h1>
        <p className="detail-description">{course.description}</p>

        <div className="detail-stats">
          <span>⭐ {course.rating} Rating</span>
          <span>👥 {course.students} Students</span>
          <span>📚 {course.lessons} Lessons</span>
          <span>⏱️ {course.duration}</span>
        </div>

        <h2>What you'll learn</h2>

        <div className="learn-list">
          <div>✓ Build strong fundamentals</div>
          <div>✓ Work on practical projects</div>
          <div>✓ Learn industry-relevant concepts</div>
          <div>✓ Practice with structured exercises</div>
        </div>

        <h2>Course Curriculum</h2>

        <div className="curriculum">
          <div>01 <b>Introduction & Fundamentals</b><span>12 Lessons</span></div>
          <div>02 <b>Core Concepts</b><span>18 Lessons</span></div>
          <div>03 <b>Practical Development</b><span>24 Lessons</span></div>
          <div>04 <b>Projects & Practice</b><span>20 Lessons</span></div>
        </div>
      </div>

      <aside className="enroll-card">
        <div className="enroll-icon">{course.icon}</div>
        <h2>{course.title}</h2>
        <p>Start learning this course today.</p>
        <div className="price">FREE</div>

        <Link to="/register" className="primary-btn full">
          Enroll Now →
        </Link>

        <small>✓ Lifetime access</small>
        <small>✓ Mobile friendly</small>
        <small>✓ Certificate eligibility</small>
      </aside>
    </section>
  );
}
