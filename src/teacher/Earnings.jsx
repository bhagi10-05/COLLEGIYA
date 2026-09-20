import React, { useState } from "react";
import "./earnings.css";

const transactions = [
  {
    id: 1,
    title: "Web Development Complete Course",
    student: "Rahul Kumar",
    amount: 2499,
    date: "18 Sep 2026",
    status: "Paid",
  },
  {
    id: 2,
    title: "React JS Masterclass",
    student: "Priya Singh",
    amount: 1499,
    date: "17 Sep 2026",
    status: "Paid",
  },
  {
    id: 3,
    title: "JavaScript Masterclass",
    student: "Aman Kumar",
    amount: 1999,
    date: "16 Sep 2026",
    status: "Pending",
  },
  {
    id: 4,
    title: "HTML & CSS Complete Course",
    student: "Rohit Das",
    amount: 999,
    date: "15 Sep 2026",
    status: "Paid",
  },
];

const courses = [
  {
    id: 1,
    title: "Web Development Complete Course",
    students: 124,
    earnings: 2499,
    progress: 78,
  },
  {
    id: 2,
    title: "React JS Masterclass",
    students: 86,
    earnings: 1499,
    progress: 62,
  },
  {
    id: 3,
    title: "JavaScript Masterclass",
    students: 64,
    earnings: 1999,
    progress: 48,
  },
];

function money(value) {
  return `₹${value.toLocaleString("en-IN")}`;
}

export default function Earnings() {
  const [filter, setFilter] = useState("All");
  const [showPayout, setShowPayout] = useState(false);

  const paidAmount = transactions
    .filter((item) => item.status === "Paid")
    .reduce((sum, item) => sum + item.amount, 0);

  const pendingAmount = transactions
    .filter((item) => item.status === "Pending")
    .reduce((sum, item) => sum + item.amount, 0);

  const totalAmount = paidAmount + pendingAmount;

  const filteredTransactions =
    filter === "All"
      ? transactions
      : transactions.filter((item) => item.status === filter);

  return (
    <div className="teacher-earnings-page">

      {/* HEADER */}
      <div className="earnings-header">
        <div>
          <span className="earnings-label">TEACHER PORTAL</span>
          <h1>Earnings</h1>
          <p>Track your course revenue, payments and payouts.</p>
        </div>

        <button
          className="earnings-payout-button"
          onClick={() => setShowPayout(true)}
        >
          ₹ Request Payout
        </button>
      </div>

      {/* STATS */}
      <div className="earnings-stats">

        <div className="earnings-stat blue">
          <div className="stat-icon">₹</div>
          <div>
            <span>Total Earnings</span>
            <strong>{money(totalAmount)}</strong>
          </div>
        </div>

        <div className="earnings-stat green">
          <div className="stat-icon">✓</div>
          <div>
            <span>Paid Earnings</span>
            <strong>{money(paidAmount)}</strong>
          </div>
        </div>

        <div className="earnings-stat orange">
          <div className="stat-icon">◷</div>
          <div>
            <span>Pending</span>
            <strong>{money(pendingAmount)}</strong>
          </div>
        </div>

        <div className="earnings-stat purple">
          <div className="stat-icon">▣</div>
          <div>
            <span>Total Sales</span>
            <strong>{transactions.length}</strong>
          </div>
        </div>

      </div>

      {/* MAIN GRID */}
      <div className="earnings-grid">

        {/* TRANSACTIONS */}
        <section className="earnings-card">

          <div className="earnings-card-header">
            <div>
              <h2>Recent Transactions</h2>
              <p>Your latest course payments</p>
            </div>

            <div className="earnings-controls">
              <select
                className="earnings-filter"
                value={filter}
                onChange={(e) => setFilter(e.target.value)}
              >
                <option value="All">All</option>
                <option value="Paid">Paid</option>
                <option value="Pending">Pending</option>
              </select>
            </div>
          </div>

          <div className="transactions">

            {filteredTransactions.length === 0 ? (
              <div className="empty-earnings">
                <div>₹</div>
                <h3>No transactions found</h3>
                <p>There are no transactions for this filter.</p>
              </div>
            ) : (
              filteredTransactions.map((item) => (
                <div className="transaction" key={item.id}>

                  <div className="transaction-left">

                    <div className="transaction-icon">
                      ₹
                    </div>

                    <div>
                      <h3>{item.title}</h3>
                      <p>
                        {item.student} • {item.date}
                      </p>
                    </div>

                  </div>

                  <div className="transaction-money">

                    <strong>
                      {money(item.amount)}
                    </strong>

                    <span
                      className={
                        item.status === "Paid"
                          ? "paid-status"
                          : "pending-status"
                      }
                    >
                      {item.status}
                    </span>

                  </div>

                </div>
              ))
            )}

          </div>

        </section>

        {/* SIDEBAR */}
        <aside className="earnings-sidebar">

          {/* BALANCE */}
          <div className="balance-card">
            <span>Available Balance</span>

            <strong>{money(paidAmount)}</strong>

            <p>Available for payout</p>

            <button
              onClick={() => setShowPayout(true)}
            >
              Request Payout
            </button>
          </div>

          {/* COURSE PERFORMANCE */}
          <div className="earnings-card course-card">

            <div className="earnings-card-header">
              <div>
                <h2>Course Earnings</h2>
                <p>Performance by course</p>
              </div>
            </div>

            <div className="course-list">

              {courses.map((course) => (
                <div className="course-item" key={course.id}>

                  <div className="course-top">
                    <div>
                      <h3>{course.title}</h3>
                      <span>
                        {course.students} students
                      </span>
                    </div>

                    <strong>
                      {money(course.earnings)}
                    </strong>
                  </div>

                  <div className="course-bar">
                    <span
                      style={{
                        width: `${course.progress}%`,
                      }}
                    />
                  </div>

                  <div className="course-bottom">
                    <span>
                      {course.progress}% performance
                    </span>

                    <span className="course-earnings">
                      Earnings
                    </span>
                  </div>

                </div>
              ))}

            </div>

          </div>

        </aside>

      </div>

      {/* PAYOUT MODAL */}
      {showPayout && (
        <div
          className="payout-overlay"
          onClick={() => setShowPayout(false)}
        >
          <div
            className="payout-modal"
            onClick={(e) => e.stopPropagation()}
          >

            <button
              className="close-payout"
              onClick={() => setShowPayout(false)}
            >
              ×
            </button>

            <div className="payout-icon">
              ₹
            </div>

            <h2>Request Payout</h2>

            <p>
              Your available balance is{" "}
              <strong>{money(paidAmount)}</strong>.
            </p>

            <input
              type="number"
              placeholder="Enter payout amount"
            />

            <select>
              <option>Bank Account</option>
              <option>UPI</option>
            </select>

            <button
              className="submit-payout"
              onClick={() => {
                alert("Payout request submitted.");
                setShowPayout(false);
              }}
            >
              Submit Payout Request
            </button>

          </div>
        </div>
      )}

    </div>
  );
}
