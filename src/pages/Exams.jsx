import { useState } from "react";

const exams = [
  ["🧠", "Programming Fundamentals", "30 Questions", "30 Minutes"],
  ["💻", "Web Development", "40 Questions", "45 Minutes"],
  ["📐", "Mathematics", "50 Questions", "60 Minutes"],
  ["📊", "Data Science", "35 Questions", "40 Minutes"]
];

export default function Exams() {
  const [started, setStarted] = useState(null);

  return (
    <section className="page">
      <div className="page-heading">
        <span>TEST YOUR KNOWLEDGE</span>
        <h1>Exams & Practice</h1>
        <p>Practice regularly and improve your knowledge.</p>
      </div>

      {started && (
        <div className="exam-started">
          <h2>{started} 🚀</h2>
          <p>Your practice exam is ready.</p>
          <button onClick={() => setStarted(null)} className="outline-btn">
            Back
          </button>
        </div>
      )}

      <div className="exam-grid">
        {exams.map(exam => (
          <div className="exam-card" key={exam[1]}>
            <div className="exam-icon">{exam[0]}</div>
            <h3>{exam[1]}</h3>
            <p>{exam[2]} • {exam[3]}</p>

            <button
              className="primary-btn"
              onClick={() => setStarted(exam[1])}
            >
              Start Exam →
            </button>
          </div>
        ))}
      </div>
    </section>
  );
}
