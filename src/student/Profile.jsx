import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./profile.css";

function Profile() {
  const [isEditing, setIsEditing] = useState(false);

  const [profile, setProfile] = useState({
    name: "Student",
    email: "student@example.com",
    phone: "+91 98765 43210",
    college: "Collegiya College",
    course: "Bachelor of Computer Applications",
    year: "2nd Year",
    city: "Deoghar, Jharkhand",
    bio: "Passionate learner focused on technology, development and continuous learning.",
  });

  const handleChange = (event) => {
    const { name, value } = event.target;

    setProfile((previous) => ({
      ...previous,
      [name]: value,
    }));
  };

  const handleSave = () => {
    setIsEditing(false);
  };

  return (
    <div className="student-profile-page">

      <section className="student-profile-hero">
        <div className="profile-hero-content">
          <div className="profile-avatar-large">
            {profile.name.charAt(0).toUpperCase()}
          </div>

          <div className="profile-hero-info">
            <span className="profile-badge">STUDENT</span>

            <h1>{profile.name}</h1>

            <p>
              {profile.course} · {profile.year}
            </p>

            <span className="profile-location">
              <span>⌖</span>
              {profile.city}
            </span>
          </div>

          <button
            className="profile-edit-button"
            onClick={() => {
              if (isEditing) {
                handleSave();
              } else {
                setIsEditing(true);
              }
            }}
          >
            {isEditing ? "Save Profile" : "Edit Profile"}
          </button>
        </div>
      </section>

      <section className="profile-stats">

        <div className="profile-stat-card">
          <div className="profile-stat-icon blue">▣</div>
          <div>
            <strong>6</strong>
            <span>Courses</span>
          </div>
        </div>

        <div className="profile-stat-card">
          <div className="profile-stat-icon purple">✓</div>
          <div>
            <strong>24</strong>
            <span>Lessons</span>
          </div>
        </div>

        <div className="profile-stat-card">
          <div className="profile-stat-icon green">◆</div>
          <div>
            <strong>3</strong>
            <span>Certificates</span>
          </div>
        </div>

        <div className="profile-stat-card">
          <div className="profile-stat-icon orange">★</div>
          <div>
            <strong>86%</strong>
            <span>Avg. Score</span>
          </div>
        </div>

      </section>

      <section className="profile-grid">

        <div className="profile-card profile-personal-card">
          <div className="profile-card-header">
            <div>
              <span className="profile-section-label">
                PERSONAL INFORMATION
              </span>

              <h2>About You</h2>
            </div>

            <span className="profile-card-symbol">●</span>
          </div>

          <div className="profile-form">

            <div className="profile-field">
              <label>Full Name</label>

              {isEditing ? (
                <input
                  type="text"
                  name="name"
                  value={profile.name}
                  onChange={handleChange}
                />
              ) : (
                <div className="profile-value">
                  {profile.name}
                </div>
              )}
            </div>

            <div className="profile-field">
              <label>Email Address</label>

              {isEditing ? (
                <input
                  type="email"
                  name="email"
                  value={profile.email}
                  onChange={handleChange}
                />
              ) : (
                <div className="profile-value">
                  {profile.email}
                </div>
              )}
            </div>

            <div className="profile-field">
              <label>Phone Number</label>

              {isEditing ? (
                <input
                  type="text"
                  name="phone"
                  value={profile.phone}
                  onChange={handleChange}
                />
              ) : (
                <div className="profile-value">
                  {profile.phone}
                </div>
              )}
            </div>

            <div className="profile-field">
              <label>Location</label>

              {isEditing ? (
                <input
                  type="text"
                  name="city"
                  value={profile.city}
                  onChange={handleChange}
                />
              ) : (
                <div className="profile-value">
                  {profile.city}
                </div>
              )}
            </div>

          </div>
        </div>

        <div className="profile-card profile-education-card">

          <div className="profile-card-header">
            <div>
              <span className="profile-section-label">
                EDUCATION
              </span>

              <h2>Academic Details</h2>
            </div>

            <span className="profile-card-symbol">◆</span>
          </div>

          <div className="education-item">
            <div className="education-icon">🎓</div>

            <div>
              <span>College</span>
              <strong>{profile.college}</strong>
            </div>
          </div>

          <div className="education-divider"></div>

          <div className="education-item">
            <div className="education-icon">▣</div>

            <div>
              <span>Course</span>
              <strong>{profile.course}</strong>
            </div>
          </div>

          <div className="education-divider"></div>

          <div className="education-item">
            <div className="education-icon">◷</div>

            <div>
              <span>Current Year</span>
              <strong>{profile.year}</strong>
            </div>
          </div>

        </div>

        <div className="profile-card profile-bio-card">

          <div className="profile-card-header">
            <div>
              <span className="profile-section-label">
                ABOUT ME
              </span>

              <h2>My Introduction</h2>
            </div>
          </div>

          {isEditing ? (
            <textarea
              name="bio"
              value={profile.bio}
              onChange={handleChange}
              rows="5"
            />
          ) : (
            <p className="profile-bio-text">
              {profile.bio}
            </p>
          )}

        </div>

        <div className="profile-card profile-security-card">

          <div className="profile-card-header">
            <div>
              <span className="profile-section-label">
                ACCOUNT
              </span>

              <h2>Account Settings</h2>
            </div>

            <span className="profile-card-symbol">⚙</span>
          </div>

          <div className="profile-setting-row">
            <div>
              <strong>Password</strong>
              <span>Keep your account secure</span>
            </div>

            <button
              type="button"
              className="profile-outline-button"
              onClick={() => alert("Password change feature will be added soon.")}
            >
              Change
            </button>
          </div>

          <div className="profile-setting-row">
            <div>
              <strong>Email Notifications</strong>
              <span>Receive learning updates</span>
            </div>

            <label className="profile-switch">
              <input type="checkbox" defaultChecked />
              <span></span>
            </label>
          </div>

          <div className="profile-setting-row">
            <div>
              <strong>Learning Reminders</strong>
              <span>Get reminders for pending lessons</span>
            </div>

            <label className="profile-switch">
              <input type="checkbox" defaultChecked />
              <span></span>
            </label>
          </div>

        </div>

      </section>

      <section className="profile-bottom-actions">

        <Link
          to="/student/certificate"
          className="profile-action-card"
        >
          <span className="profile-action-icon">◆</span>

          <span>
            <strong>My Certificates</strong>
            <small>View your earned certificates</small>
          </span>

          <b>→</b>
        </Link>

        <Link
          to="/student/courses"
          className="profile-action-card"
        >
          <span className="profile-action-icon">▣</span>

          <span>
            <strong>Explore Courses</strong>
            <small>Discover new courses to learn</small>
          </span>

          <b>→</b>
        </Link>

      </section>

    </div>
  );
}

export default Profile;
