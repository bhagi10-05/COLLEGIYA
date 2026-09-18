import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./quiz.css";

const questions = [
  {
    question: "Which HTML element is used to create a hyperlink?",
    options: ["<a>", "<link>", "<href>", "<url>"],
    answer: "<a>",
  },
  {
    question: "Which JavaScript keyword declares a block-scoped variable that can be reassigned?",
    options: ["const", "let", "static", "define"],
    answer: "let",
  },
  {
    question: "What does CSS primarily control in a web page?",
    options: [
      "Database storage",
      "Visual presentation",
      "Server authentication",
      "File compression",
    ],
    answer: "Visual presentation",
  },
  {
    question: "Which HTTP method is commonly used to retrieve data from a server?",
    options: ["GET", "POST", "PATCH", "DELETE"],
    answer: "GET",
  },
  {
    question: "Which MongoDB data model stores records as BSON documents?",
    options: [
      "Document model",
      "Graph model",
      "Key-value model",
      "Column model",
    ],
    answer: "Document model",
  },
];

function Quiz() {
  const navigate = useNavigate();

  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState("");
  const [answers, setAnswers] = useState({});
  const [submitted, setSubmitted] = useState(false);

  const question = questions[currentQuestion];

  const progress = Math.round(
    ((currentQuestion + 1) / questions.length) * 100
  );

  const handleAnswer = (answer) => {
    setSelectedAnswer(answer);

    setAnswers((prev) => ({
      ...prev,
      [currentQuestion]: answer,
    }));
  };

  const nextQuestion = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion((prev) => prev + 1);
      setSelectedAnswer(answers[currentQuestion + 1] || "");
    } else {
      setSubmitted(true);
    }
  };

  const previousQuestion = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion((prev) => prev - 1);
      setSelectedAnswer(answers[currentQuestion - 1] || "");
    }
  };

  const calculateScore = () => {
    return questions.reduce((score, item, index) => {
      return answers[index] === item.answer ? score + 1 : score;
    }, 0);
  };

  const restartQuiz = () => {
    setCurrentQuestion(0);
    setSelectedAnswer("");
    setAnswers({});
    setSubmitted(false);
  };

  if (submitted) {
    const score = calculateScore();
    const percentage = Math.round((score / questions.length) * 100);

    return (
      <section className="quiz-page">
        <div className="quiz-container">

          <div className="quiz-result-card">

            <div className="result-icon">
              {percentage >= 60 ? "✓" : "!"}
            </div>

            <p className="result-label">
              QUIZ COMPLETED
            </p>

            <h1>Your Result</h1>

            <div className="score-circle">
              <strong>{percentage}%</strong>
              <span>Score</span>
            </div>

            <h2>
              {score} / {questions.length} Correct
            </h2>

            <p className="result-message">
              {percentage >= 80
                ? "Excellent work! Keep learning and improving."
                : percentage >= 60
                ? "Good effort! A little more practice will make you stronger."
                : "Keep practicing. Every attempt helps you improve."}
            </p>

            <div className="result-actions">
              <button
                className="quiz-primary-btn"
                onClick={restartQuiz}
              >
                Try Again
              </button>

              <button
                className="quiz-secondary-btn"
                onClick={() => navigate("/student/dashboard")}
              >
                Dashboard
              </button>
            </div>

          </div>

        </div>
      </section>
    );
  }

  return (
    <section className="quiz-page">

      <div className="quiz-container">

        {/* HEADER */}

        <div className="quiz-top">

          <div>
            <Link
              to="/student/dashboard"
              className="quiz-back"
            >
              ← Dashboard
            </Link>

            <p className="quiz-eyebrow">
              STUDENT PORTAL
            </p>

            <h1>Knowledge Check</h1>

            <p className="quiz-subtitle">
              Test your knowledge and track your progress.
            </p>
          </div>

          <div className="quiz-counter">
            Question{" "}
            <strong>
              {currentQuestion + 1}
            </strong>{" "}
            / {questions.length}
          </div>

        </div>


        {/* PROGRESS */}

        <div className="quiz-progress-section">

          <div className="quiz-progress-info">
            <span>Quiz Progress</span>
            <strong>{progress}%</strong>
          </div>

          <div className="quiz-progress-bar">
            <div
              className="quiz-progress-fill"
              style={{ width: `${progress}%` }}
            ></div>
          </div>

        </div>


        {/* QUESTION NAVIGATION */}

        <div className="question-numbers">

          {questions.map((_, index) => (
            <button
              key={index}
              className={`
                question-number
                ${currentQuestion === index ? "active" : ""}
                ${answers[index] ? "answered" : ""}
              `}
              onClick={() => {
                setCurrentQuestion(index);
                setSelectedAnswer(answers[index] || "");
              }}
            >
              {index + 1}
            </button>
          ))}

        </div>


        {/* MAIN QUIZ */}

        <div className="quiz-layout">

          <main className="question-card">

            <div className="question-top">

              <span className="question-badge">
                Question {currentQuestion + 1}
              </span>

              <span className="question-points">
                1 Point
              </span>

            </div>

            <h2>
              {question.question}
            </h2>

            <div className="answer-list">

              {question.options.map((option, index) => {

                const optionLetter =
                  String.fromCharCode(65 + index);

                const isSelected =
                  selectedAnswer === option;

                return (
                  <button
                    key={option}
                    className={`answer-option ${
                      isSelected ? "selected" : ""
                    }`}
                    onClick={() => handleAnswer(option)}
                  >

                    <span className="option-letter">
                      {optionLetter}
                    </span>

                    <span className="option-text">
                      {option}
                    </span>

                    <span className="option-check">
                      {isSelected ? "✓" : ""}
                    </span>

                  </button>
                );
              })}

            </div>


            {/* ACTIONS */}

            <div className="quiz-actions">

              <button
                className="quiz-secondary-btn"
                onClick={previousQuestion}
                disabled={currentQuestion === 0}
              >
                ← Previous
              </button>

              <button
                className="quiz-primary-btn"
                onClick={nextQuestion}
                disabled={!selectedAnswer}
              >
                {currentQuestion === questions.length - 1
                  ? "Submit Quiz"
                  : "Next Question →"}
              </button>

            </div>

          </main>


          {/* SIDEBAR */}

          <aside className="quiz-info-card">

            <div className="info-icon">
              ✓
            </div>

            <h3>Quiz Instructions</h3>

            <ul>
              <li>
                Select one answer for each question.
              </li>

              <li>
                You can move between questions.
              </li>

              <li>
                Answered questions are highlighted.
              </li>

              <li>
                Submit the quiz after completing all questions.
              </li>
            </ul>

            <div className="quiz-summary">

              <div>
                <span>Total Questions</span>
                <strong>{questions.length}</strong>
              </div>

              <div>
                <span>Answered</span>
                <strong>
                  {Object.keys(answers).length}
                </strong>
              </div>

            </div>

          </aside>

        </div>

      </div>

    </section>
  );
}

export default Quiz;
