import React, { useMemo, useState } from "react";
import "./quiz.css";

const initialTests = [];

const emptyQuestion = {
  text: "",
  options: ["", "", "", ""],
  correct: 0,
  marks: 1,
};

export default function Quiz() {
  const [tests, setTests] = useState(initialTests);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("All");

  const [showTestModal, setShowTestModal] = useState(false);
  const [showQuestionModal, setShowQuestionModal] = useState(false);

  const [activeTestId, setActiveTestId] = useState(null);

  const [testForm, setTestForm] = useState({
    title: "",
    course: "",
    description: "",
    duration: "30",
    passing: "40",
    status: "Draft",
  });

  const [question, setQuestion] = useState(emptyQuestion);

  const filteredTests = useMemo(() => {
    return tests.filter((test) => {
      const matchesSearch =
        test.title.toLowerCase().includes(search.toLowerCase()) ||
        test.course.toLowerCase().includes(search.toLowerCase());

      const matchesFilter =
        filter === "All" || test.status === filter;

      return matchesSearch && matchesFilter;
    });
  }, [tests, search, filter]);

  const totalQuestions = tests.reduce(
    (sum, test) => sum + test.questions.length,
    0
  );

  const published = tests.filter(
    (test) => test.status === "Published"
  ).length;

  const drafts = tests.filter(
    (test) => test.status === "Draft"
  ).length;

  const createTest = (e) => {
    e.preventDefault();

    if (!testForm.title.trim() || !testForm.course.trim()) {
      alert("Test title aur course required hai.");
      return;
    }

    const newTest = {
      id: Date.now(),
      ...testForm,
      questions: [],
      createdAt: new Date().toLocaleDateString("en-IN"),
    };

    setTests((prev) => [newTest, ...prev]);

    setTestForm({
      title: "",
      course: "",
      description: "",
      duration: "30",
      passing: "40",
      status: "Draft",
    });

    setShowTestModal(false);
  };

  const openQuestionModal = (id) => {
    setActiveTestId(id);
    setQuestion({ ...emptyQuestion, options: ["", "", "", ""] });
    setShowQuestionModal(true);
  };

  const addQuestion = (e) => {
    e.preventDefault();

    if (!question.text.trim()) {
      alert("Question likhiye.");
      return;
    }

    if (question.options.some((option) => !option.trim())) {
      alert("Sabhi 4 options fill kijiye.");
      return;
    }

    setTests((prev) =>
      prev.map((test) =>
        test.id === activeTestId
          ? {
              ...test,
              questions: [
                ...test.questions,
                {
                  id: Date.now(),
                  ...question,
                },
              ],
            }
          : test
      )
    );

    setQuestion({ ...emptyQuestion, options: ["", "", "", ""] });
    setShowQuestionModal(false);
  };

  const deleteTest = (id) => {
    if (!window.confirm("Kya aap ye test delete karna chahte hain?")) {
      return;
    }

    setTests((prev) => prev.filter((test) => test.id !== id));
  };

  const deleteQuestion = (testId, questionId) => {
    setTests((prev) =>
      prev.map((test) =>
        test.id === testId
          ? {
              ...test,
              questions: test.questions.filter(
                (q) => q.id !== questionId
              ),
            }
          : test
      )
    );
  };

  const toggleStatus = (id) => {
    setTests((prev) =>
      prev.map((test) =>
        test.id === id
          ? {
              ...test,
              status:
                test.status === "Published"
                  ? "Draft"
                  : "Published",
            }
          : test
      )
    );
  };

  const activeTest = tests.find(
    (test) => test.id === activeTestId
  );

  return (
    <div className="teacher-quiz-page">

      <div className="quiz-hero">
        <div>
          <span className="quiz-eyebrow">
            TEACHER PORTAL
          </span>

          <h1>Quiz & Tests</h1>

          <p>
            Create tests, manage questions and evaluate
            student learning.
          </p>
        </div>

        <button
          className="quiz-primary-btn"
          onClick={() => setShowTestModal(true)}
        >
          <span>＋</span>
          Create Test
        </button>
      </div>

      <div className="quiz-stats">

        <div className="quiz-stat-card">
          <div className="quiz-stat-icon purple">✓</div>
          <div>
            <strong>{tests.length}</strong>
            <span>Total Tests</span>
          </div>
        </div>

        <div className="quiz-stat-card">
          <div className="quiz-stat-icon green">●</div>
          <div>
            <strong>{published}</strong>
            <span>Published</span>
          </div>
        </div>

        <div className="quiz-stat-card">
          <div className="quiz-stat-icon orange">◷</div>
          <div>
            <strong>{drafts}</strong>
            <span>Drafts</span>
          </div>
        </div>

        <div className="quiz-stat-card">
          <div className="quiz-stat-icon blue">?</div>
          <div>
            <strong>{totalQuestions}</strong>
            <span>Questions</span>
          </div>
        </div>

      </div>

      <div className="quiz-toolbar">

        <div className="quiz-search">
          <span>⌕</span>
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search tests or courses..."
          />
        </div>

        <div className="quiz-filters">
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

      <div className="quiz-list">

        {filteredTests.length === 0 ? (
          <div className="quiz-empty">

            <div className="quiz-empty-icon">✓</div>

            <h2>
              {tests.length === 0
                ? "No tests created yet"
                : "No tests found"}
            </h2>

            <p>
              {tests.length === 0
                ? "Create your first test and start evaluating students."
                : "Try changing your search or filter."}
            </p>

            {tests.length === 0 && (
              <button
                className="quiz-primary-btn"
                onClick={() => setShowTestModal(true)}
              >
                Create Your First Test
              </button>
            )}

          </div>
        ) : (
          filteredTests.map((test, index) => (
            <div className="quiz-card" key={test.id}>

              <div className="quiz-card-number">
                {String(index + 1).padStart(2, "0")}
              </div>

              <div className="quiz-card-main">

                <div className="quiz-card-top">

                  <div>
                    <span className="quiz-type">
                      TEST
                    </span>

                    <h2>{test.title}</h2>

                    <p className="quiz-course">
                      📚 {test.course}
                    </p>
                  </div>

                  <span
                    className={`quiz-status ${
                      test.status.toLowerCase()
                    }`}
                  >
                    {test.status}
                  </span>

                </div>

                {test.description && (
                  <p className="quiz-description">
                    {test.description}
                  </p>
                )}

                <div className="quiz-meta">

                  <span>
                    ⏱ {test.duration} min
                  </span>

                  <span>
                    ✓ {test.questions.length} Questions
                  </span>

                  <span>
                    🎯 Passing {test.passing}%
                  </span>

                  <span>
                    📅 {test.createdAt}
                  </span>

                </div>

                <div className="quiz-card-actions">

                  <button
                    className="quiz-action add"
                    onClick={() => openQuestionModal(test.id)}
                  >
                    ＋ Add Questions
                  </button>

                  <button
                    className="quiz-action"
                    onClick={() => toggleStatus(test.id)}
                  >
                    {test.status === "Published"
                      ? "Move to Draft"
                      : "Publish"}
                  </button>

                  <button
                    className="quiz-action danger"
                    onClick={() => deleteTest(test.id)}
                  >
                    Delete
                  </button>

                </div>

                {test.questions.length > 0 && (
                  <div className="question-list">

                    <div className="question-heading">
                      <strong>
                        Questions ({test.questions.length})
                      </strong>
                    </div>

                    {test.questions.map((q, qIndex) => (
                      <div
                        className="question-row"
                        key={q.id}
                      >
                        <div className="question-number">
                          Q{qIndex + 1}
                        </div>

                        <div className="question-content">
                          <strong>{q.text}</strong>

                          <div className="question-options">
                            {q.options.map(
                              (option, optionIndex) => (
                                <span
                                  key={optionIndex}
                                  className={
                                    optionIndex === q.correct
                                      ? "correct"
                                      : ""
                                  }
                                >
                                  {String.fromCharCode(
                                    65 + optionIndex
                                  )}
                                  . {option}
                                </span>
                              )
                            )}
                          </div>
                        </div>

                        <div className="question-marks">
                          {q.marks} mark
                        </div>

                        <button
                          className="question-delete"
                          onClick={() =>
                            deleteQuestion(test.id, q.id)
                          }
                        >
                          ×
                        </button>
                      </div>
                    ))}

                  </div>
                )}

              </div>

            </div>
          ))
        )}

      </div>

      <div className="quiz-back">
        <a href="/teacher/dashboard">
          ← Back to Dashboard
        </a>
      </div>

      {showTestModal && (
        <div
          className="quiz-modal-overlay"
          onMouseDown={() => setShowTestModal(false)}
        >
          <div
            className="quiz-modal"
            onMouseDown={(e) => e.stopPropagation()}
          >

            <div className="quiz-modal-header">
              <div>
                <span>NEW TEST</span>
                <h2>Create Test</h2>
              </div>

              <button
                onClick={() => setShowTestModal(false)}
              >
                ×
              </button>
            </div>

            <form onSubmit={createTest}>

              <label>
                Test Title *
                <input
                  value={testForm.title}
                  onChange={(e) =>
                    setTestForm({
                      ...testForm,
                      title: e.target.value,
                    })
                  }
                  placeholder="e.g. Physics Chapter 1 Test"
                />
              </label>

              <label>
                Course *
                <input
                  value={testForm.course}
                  onChange={(e) =>
                    setTestForm({
                      ...testForm,
                      course: e.target.value,
                    })
                  }
                  placeholder="e.g. Class 12 Physics"
                />
              </label>

              <label>
                Description
                <textarea
                  value={testForm.description}
                  onChange={(e) =>
                    setTestForm({
                      ...testForm,
                      description: e.target.value,
                    })
                  }
                  placeholder="Describe this test..."
                />
              </label>

              <div className="form-grid">

                <label>
                  Duration
                  <input
                    type="number"
                    min="1"
                    value={testForm.duration}
                    onChange={(e) =>
                      setTestForm({
                        ...testForm,
                        duration: e.target.value,
                      })
                    }
                  />
                </label>

                <label>
                  Passing %
                  <input
                    type="number"
                    min="1"
                    max="100"
                    value={testForm.passing}
                    onChange={(e) =>
                      setTestForm({
                        ...testForm,
                        passing: e.target.value,
                      })
                    }
                  />
                </label>

              </div>

              <label>
                Status
                <select
                  value={testForm.status}
                  onChange={(e) =>
                    setTestForm({
                      ...testForm,
                      status: e.target.value,
                    })
                  }
                >
                  <option>Draft</option>
                  <option>Published</option>
                </select>
              </label>

              <div className="modal-actions">
                <button
                  type="button"
                  className="quiz-cancel"
                  onClick={() => setShowTestModal(false)}
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  className="quiz-save"
                >
                  Create Test
                </button>
              </div>

            </form>

          </div>
        </div>
      )}

      {showQuestionModal && (
        <div
          className="quiz-modal-overlay"
          onMouseDown={() => setShowQuestionModal(false)}
        >
          <div
            className="quiz-modal question-modal"
            onMouseDown={(e) => e.stopPropagation()}
          >

            <div className="quiz-modal-header">
              <div>
                <span>QUESTION MANAGER</span>
                <h2>Add Question</h2>
                {activeTest && (
                  <small>{activeTest.title}</small>
                )}
              </div>

              <button
                onClick={() => setShowQuestionModal(false)}
              >
                ×
              </button>
            </div>

            <form onSubmit={addQuestion}>

              <label>
                Question *
                <textarea
                  value={question.text}
                  onChange={(e) =>
                    setQuestion({
                      ...question,
                      text: e.target.value,
                    })
                  }
                  placeholder="Write your question here..."
                />
              </label>

              <div className="options-title">
                Options
              </div>

              {question.options.map((option, index) => (
                <div
                  className="option-input-row"
                  key={index}
                >

                  <div className="option-letter">
                    {String.fromCharCode(65 + index)}
                  </div>

                  <input
                    value={option}
                    onChange={(e) => {
                      const newOptions = [
                        ...question.options,
                      ];

                      newOptions[index] = e.target.value;

                      setQuestion({
                        ...question,
                        options: newOptions,
                      });
                    }}
                    placeholder={`Option ${
                      String.fromCharCode(65 + index)
                    }`}
                  />

                  <label className="correct-radio">
                    <input
                      type="radio"
                      name="correct"
                      checked={question.correct === index}
                      onChange={() =>
                        setQuestion({
                          ...question,
                          correct: index,
                        })
                      }
                    />
                    Correct
                  </label>

                </div>
              ))}

              <label>
                Marks
                <input
                  type="number"
                  min="1"
                  value={question.marks}
                  onChange={(e) =>
                    setQuestion({
                      ...question,
                      marks: Number(e.target.value),
                    })
                  }
                />
              </label>

              <div className="modal-actions">

                <button
                  type="button"
                  className="quiz-cancel"
                  onClick={() => setShowQuestionModal(false)}
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  className="quiz-save"
                >
                  Add Question
                </button>

              </div>

            </form>

          </div>
        </div>
      )}

    </div>
  );
}
