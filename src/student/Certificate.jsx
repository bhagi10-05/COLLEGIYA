import React, { useState } from "react";
import "./certificate.css";

const certificates = [
  {
    id: 1,
    title: "Web Development Fundamentals",
    issuer: "Collegiya",
    date: "15 September 2026",
    score: "92%",
    status: "Verified",
  },
  {
    id: 2,
    title: "JavaScript Basics",
    issuer: "Collegiya",
    date: "10 September 2026",
    score: "88%",
    status: "Verified",
  },
  {
    id: 3,
    title: "React Fundamentals",
    issuer: "Collegiya",
    date: "05 September 2026",
    score: "90%",
    status: "Verified",
  },
];

function Certificate() {
  const [selectedCertificate, setSelectedCertificate] = useState(null);

  const handleDownload = () => {
    alert("Certificate download feature will be connected soon.");
  };

  const handleShare = () => {
    alert("Certificate sharing feature will be connected soon.");
  };

  return (
    <div className="certificate-page">

      <section className="certificate-hero">
        <div>
          <span className="certificate-eyebrow">
            ACHIEVEMENTS
          </span>

          <h1>My Certificates</h1>

          <p>
            View and manage the certificates you have earned
            through your learning journey.
          </p>
        </div>

        <div className="certificate-hero-icon">
          🎓
        </div>
      </section>

      <section className="certificate-stats">

        <div className="certificate-stat-card">
          <span className="certificate-stat-icon">🏆</span>
          <div>
            <strong>{certificates.length}</strong>
            <span>Certificates Earned</span>
          </div>
        </div>

        <div className="certificate-stat-card">
          <span className="certificate-stat-icon">✓</span>
          <div>
            <strong>100%</strong>
            <span>Verified</span>
          </div>
        </div>

        <div className="certificate-stat-card">
          <span className="certificate-stat-icon">⭐</span>
          <div>
            <strong>90%</strong>
            <span>Average Score</span>
          </div>
        </div>

        <div className="certificate-stat-card">
          <span className="certificate-stat-icon">📚</span>
          <div>
            <strong>3</strong>
            <span>Courses Completed</span>
          </div>
        </div>

      </section>

      <section className="certificate-section">

        <div className="certificate-section-heading">
          <div>
            <span className="section-small-title">
              YOUR ACHIEVEMENTS
            </span>

            <h2>Earned Certificates</h2>
          </div>

          <span className="certificate-count">
            {certificates.length} Certificates
          </span>
        </div>

        <div className="certificate-grid">

          {certificates.map((certificate) => (
            <article
              className="certificate-card"
              key={certificate.id}
            >

              <div className="certificate-preview">

                <div className="certificate-preview-top">
                  <span>COLLEGIYA</span>
                  <span>✓ VERIFIED</span>
                </div>

                <div className="certificate-preview-content">
                  <span className="mini-label">
                    CERTIFICATE OF COMPLETION
                  </span>

                  <h3>{certificate.title}</h3>

                  <p>
                    This certificate is proudly presented
                    to the student for successfully completing
                    the course.
                  </p>

                  <div className="certificate-seal">
                    C
                  </div>
                </div>

                <div className="certificate-preview-bottom">
                  <span>{certificate.date}</span>
                  <span>{certificate.score}</span>
                </div>

              </div>

              <div className="certificate-card-body">

                <div className="certificate-title-row">
                  <div>
                    <h3>{certificate.title}</h3>

                    <p>
                      Issued by {certificate.issuer}
                    </p>
                  </div>

                  <span className="verified-badge">
                    ✓ Verified
                  </span>
                </div>

                <div className="certificate-meta">

                  <div>
                    <span>Completed</span>
                    <strong>{certificate.date}</strong>
                  </div>

                  <div>
                    <span>Score</span>
                    <strong>{certificate.score}</strong>
                  </div>

                </div>

                <div className="certificate-actions">

                  <button
                    type="button"
                    className="certificate-primary-button"
                    onClick={() =>
                      setSelectedCertificate(certificate)
                    }
                  >
                    View Certificate
                  </button>

                  <button
                    type="button"
                    className="certificate-secondary-button"
                    onClick={handleDownload}
                  >
                    ↓
                  </button>

                  <button
                    type="button"
                    className="certificate-secondary-button"
                    onClick={handleShare}
                  >
                    ↗
                  </button>

                </div>

              </div>

            </article>
          ))}

        </div>

      </section>

      <section className="certificate-verification">

        <div className="verification-icon">
          ✓
        </div>

        <div className="verification-content">
          <span>PUBLIC VERIFICATION</span>

          <h2>Verify a Collegiya Certificate</h2>

          <p>
            Anyone can verify a Collegiya certificate using
            its unique certificate ID.
          </p>
        </div>

        <button
          type="button"
          className="verification-button"
          onClick={() =>
            alert("Certificate verification will be available soon.")
          }
        >
          Verify Certificate
        </button>

      </section>

      <section className="certificate-empty-cta">

        <div>
          <span className="certificate-eyebrow">
            KEEP LEARNING
          </span>

          <h2>Earn Your Next Certificate</h2>

          <p>
            Continue learning and complete more courses to
            unlock new achievements.
          </p>
        </div>

        <a
          href="/student/courses"
          className="explore-courses-button"
        >
          Explore Courses →
        </a>

      </section>

      {selectedCertificate && (
        <div
          className="certificate-modal-overlay"
          onClick={() => setSelectedCertificate(null)}
        >
          <div
            className="certificate-modal"
            onClick={(event) => event.stopPropagation()}
          >

            <button
              type="button"
              className="certificate-modal-close"
              onClick={() => setSelectedCertificate(null)}
              aria-label="Close"
            >
              ×
            </button>

            <div className="certificate-large">

              <div className="certificate-large-header">
                <span>COLLEGIYA</span>
                <span>✓ VERIFIED</span>
              </div>

              <div className="certificate-large-content">

                <span>
                  CERTIFICATE OF COMPLETION
                </span>

                <h2>
                  {selectedCertificate.title}
                </h2>

                <p>
                  This certificate recognizes successful
                  completion of the course on Collegiya.
                </p>

                <div className="certificate-large-seal">
                  C
                </div>

                <div className="certificate-large-info">
                  <div>
                    <span>Completion Date</span>
                    <strong>
                      {selectedCertificate.date}
                    </strong>
                  </div>

                  <div>
                    <span>Final Score</span>
                    <strong>
                      {selectedCertificate.score}
                    </strong>
                  </div>
                </div>

              </div>

            </div>

            <div className="modal-actions">

              <button
                type="button"
                onClick={handleDownload}
                className="certificate-primary-button"
              >
                Download Certificate
              </button>

              <button
                type="button"
                onClick={handleShare}
                className="certificate-secondary-wide"
              >
                Share
              </button>

            </div>

          </div>
        </div>
      )}

    </div>
  );
}

export default Certificate;
