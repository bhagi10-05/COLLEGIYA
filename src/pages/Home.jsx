import { Link } from "react-router-dom";
import CourseCard from "../components/CourseCard";
import { courses } from "../data/courses";

export default function Home() {
  return (
    <>
      <section className="hero">
        <div className="hero-content">
          <span className="badge">🚀 LEARN • GROW • SUCCEED</span>

          <h1>
            Build Your
            <span> Future With Learning.</span>
          </h1>

          <p>
            Learn practical skills, prepare for exams and build the knowledge
            you need for your future.
          </p>

          <div className="hero-actions">
            <Link to="/courses" className="primary-btn">
              Explore Courses →
            </Link>

            <Link to="/register" className="outline-btn">
              Join COLLEGIYA
            </Link>
          </div>

          <div className="stats">
            <div><b>50K+</b><span>Learners</span></div>
            <div><b>200+</b><span>Courses</span></div>
            <div><b>98%</b><span>Satisfaction</span></div>
          </div>
        </div>

        <div className="hero-visual">
          <div className="dashboard-preview">
            <div className="preview-top">
              <span>COLLEGIYA</span>
              <small>Student Dashboard</small>
            </div>

            <h3>Welcome back 👋</h3>
            <p>Continue your learning journey.</p>

            <div className="learning-box">
              <div>
                <b>Full Stack Web Development</b>
                <span>78% completed</span>
              </div>
              <strong>78%</strong>
              <div className="progress">
                <i />
              </div>
            </div>

            <div className="preview-grid">
              <div>📚 <b>6</b><span>Courses</span></div>
              <div>🔥 <b>12</b><span>Day Streak</span></div>
              <div>🏆 <b>8</b><span>Certificates</span></div>
            </div>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="section-heading">
          <div>
            <span>POPULAR COURSES</span>
            <h2>Start Learning Today</h2>
          </div>

          <Link to="/courses">View all →</Link>
        </div>

        <div className="course-grid">
          {courses.slice(0, 3).map(course => (
            <CourseCard key={course.id} course={course} />
          ))}
        </div>
      </section>

      <section className="features">
        <span>WHY COLLEGIYA</span>
        <h2>Everything You Need To Learn Better</h2>

        <div className="feature-grid">
          <div>
            <strong>🎓</strong>
            <h3>Expert Learning</h3>
            <p>Structured courses designed for effective learning.</p>
          </div>

          <div>
            <strong>📈</strong>
            <h3>Track Progress</h3>
            <p>Monitor your progress and keep improving.</p>
          </div>

          <div>
            <strong>📝</strong>
            <h3>Practice & Exams</h3>
            <p>Test your knowledge with practice exams.</p>
          </div>

          <div>
            <strong>🏆</strong>
            <h3>Certificates</h3>
            <p>Showcase your completed learning achievements.</p>
          </div>
        </div>
      </section>
    </>
  );
}
