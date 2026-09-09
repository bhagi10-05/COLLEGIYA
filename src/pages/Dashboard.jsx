import { Link } from "react-router-dom";

export default function Dashboard() {
  return (
    <section className="page dashboard">
      <div className="dashboard-heading">
        <div>
          <span>STUDENT DASHBOARD</span>
          <h1>Welcome back! 👋</h1>
          <p>Continue where you left off.</p>
        </div>

        <Link to="/courses" className="primary-btn">
          Browse Courses
        </Link>
      </div>

      <div className="dashboard-stats">
        <div><b>6</b><span>📚 Courses Enrolled</span></div>
        <div><b>12</b><span>🔥 Day Streak</span></div>
        <div><b>48h</b><span>⏱️ Learning Time</span></div>
        <div><b>8</b><span>🏆 Certificates</span></div>
      </div>

      <h2>Continue Learning</h2>

      <div className="continue-card">
        <div className="detail-icon">💻</div>

        <div className="continue-info">
          <span>IN PROGRESS</span>
          <h3>Full Stack Web Development</h3>
          <p>HTML • CSS • JavaScript • React</p>

          <div className="progress">
            <i style={{ width: "78%" }} />
          </div>

          <small>78% completed</small>
        </div>

        <Link to="/course/web-development" className="primary-btn">
          Continue →
        </Link>
      </div>

      <div className="dashboard-bottom">
        <div className="activity">
          <h2>Recent Activity</h2>
          <p>✅ Completed JavaScript Basics</p>
          <p>📝 Attempted Programming Test</p>
          <p>🎓 Completed HTML Module</p>
        </div>

        <div className="quick">
          <h2>Quick Actions</h2>
          <Link to="/exams">📝 Take an Exam</Link>
          <Link to="/certificates">🏆 View Certificates</Link>
          <Link to="/courses">📚 Find a Course</Link>
        </div>
      </div>
    </section>
  );
}
