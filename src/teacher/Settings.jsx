import React, { useState } from "react";
import "./settings.css";

export default function TeacherSettings() {
  const [saved, setSaved] = useState(false);

  const [settings, setSettings] = useState({
    emailNotifications: true,
    studentMessages: true,
    courseUpdates: true,
    assignmentAlerts: true,
    marketingEmails: false,
    publicProfile: true,
    showEmail: false,
    twoFactor: false,
    language: "English",
    timezone: "Asia/Kolkata",
  });

  const toggle = (name) => {
    setSettings((prev) => ({
      ...prev,
      [name]: !prev[name],
    }));
    setSaved(false);
  };

  const change = (e) => {
    setSettings((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
    setSaved(false);
  };

  const saveSettings = () => {
    setSaved(true);
  };

  return (
    <div className="ts-page">

      {/* HEADER */}
      <div className="ts-header">
        <div>
          <span>TEACHER PORTAL</span>
          <h1>Settings</h1>
          <p>Manage your account and teaching preferences.</p>
        </div>

        <button className="ts-save-top" onClick={saveSettings}>
          ✓ Save Changes
        </button>
      </div>


      {saved && (
        <div className="ts-success">
          ✓ Your settings have been saved successfully.
        </div>
      )}


      <div className="ts-layout">

        {/* MAIN */}
        <div className="ts-main">

          {/* GENERAL */}
          <section className="ts-card">

            <div className="ts-title">
              <div className="ts-icon blue">⚙</div>

              <div>
                <h2>General Settings</h2>
                <p>Basic preferences for your account</p>
              </div>
            </div>

            <div className="ts-form-grid">

              <div>
                <label>Language</label>

                <select
                  name="language"
                  value={settings.language}
                  onChange={change}
                >
                  <option>English</option>
                  <option>Hindi</option>
                  <option>Hinglish</option>
                </select>
              </div>

              <div>
                <label>Timezone</label>

                <select
                  name="timezone"
                  value={settings.timezone}
                  onChange={change}
                >
                  <option value="Asia/Kolkata">
                    India — Kolkata (IST)
                  </option>
                  <option value="Asia/Dubai">
                    Dubai (GST)
                  </option>
                  <option value="UTC">
                    UTC
                  </option>
                </select>
              </div>

            </div>

          </section>


          {/* NOTIFICATIONS */}
          <section className="ts-card">

            <div className="ts-title">
              <div className="ts-icon purple">🔔</div>

              <div>
                <h2>Notifications</h2>
                <p>Choose what notifications you receive</p>
              </div>
            </div>


            <div className="ts-options">

              <SettingToggle
                title="Email Notifications"
                description="Receive important updates through email"
                active={settings.emailNotifications}
                onClick={() => toggle("emailNotifications")}
              />

              <SettingToggle
                title="Student Messages"
                description="Get notified when students send messages"
                active={settings.studentMessages}
                onClick={() => toggle("studentMessages")}
              />

              <SettingToggle
                title="Course Updates"
                description="Receive notifications about your courses"
                active={settings.courseUpdates}
                onClick={() => toggle("courseUpdates")}
              />

              <SettingToggle
                title="Assignment Alerts"
                description="Get alerts when students submit assignments"
                active={settings.assignmentAlerts}
                onClick={() => toggle("assignmentAlerts")}
              />

              <SettingToggle
                title="Marketing Emails"
                description="Receive platform news and promotional emails"
                active={settings.marketingEmails}
                onClick={() => toggle("marketingEmails")}
              />

            </div>

          </section>


          {/* PRIVACY */}
          <section className="ts-card">

            <div className="ts-title">
              <div className="ts-icon green">🔒</div>

              <div>
                <h2>Privacy</h2>
                <p>Control your profile visibility</p>
              </div>
            </div>


            <div className="ts-options">

              <SettingToggle
                title="Public Teacher Profile"
                description="Allow students to discover your teacher profile"
                active={settings.publicProfile}
                onClick={() => toggle("publicProfile")}
              />

              <SettingToggle
                title="Show Email Address"
                description="Display your email on your public profile"
                active={settings.showEmail}
                onClick={() => toggle("showEmail")}
              />

            </div>

          </section>


          {/* SECURITY */}
          <section className="ts-card">

            <div className="ts-title">
              <div className="ts-icon orange">🛡</div>

              <div>
                <h2>Security</h2>
                <p>Protect your COLLEGIYA account</p>
              </div>
            </div>


            <SettingToggle
              title="Two-Factor Authentication"
              description="Add an extra layer of security to your account"
              active={settings.twoFactor}
              onClick={() => toggle("twoFactor")}
            />


            <button className="ts-password">
              🔑 Change Password
            </button>

          </section>

        </div>


        {/* SIDE */}
        <aside className="ts-side">

          <div className="ts-security-card">

            <div className="ts-security-icon">
              🛡
            </div>

            <h3>Your Account Security</h3>

            <p>
              Keep your account secure by using a strong
              password and enabling two-factor authentication.
            </p>

            <div className="ts-security-status">
              <span>●</span>
              Account Secure
            </div>

          </div>


          <div className="ts-card ts-account">

            <div className="ts-title">
              <div className="ts-icon blue">👤</div>

              <div>
                <h2>Account</h2>
                <p>Your account details</p>
              </div>
            </div>

            <div className="ts-account-list">

              <div>
                <span>Account Type</span>
                <strong>Teacher</strong>
              </div>

              <div>
                <span>Status</span>
                <strong className="green-text">
                  ● Active
                </strong>
              </div>

              <div>
                <span>Member Since</span>
                <strong>2026</strong>
              </div>

            </div>

          </div>

        </aside>

      </div>


      {/* BOTTOM */}
      <div className="ts-bottom">
        <button
          className="ts-reset"
          onClick={() => window.location.reload()}
        >
          Reset
        </button>

        <button
          className="ts-save"
          onClick={saveSettings}
        >
          ✓ Save Settings
        </button>
      </div>

    </div>
  );
}


function SettingToggle({
  title,
  description,
  active,
  onClick,
}) {
  return (
    <div className="ts-setting">

      <div>
        <strong>{title}</strong>
        <span>{description}</span>
      </div>

      <button
        type="button"
        className={`ts-toggle ${active ? "active" : ""}`}
        onClick={onClick}
      >
        <span />
      </button>

    </div>
  );
}
