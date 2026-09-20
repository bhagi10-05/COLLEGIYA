import React, { useState } from "react";
import "./profile.css";

export default function TeacherProfile() {
  const [saved, setSaved] = useState(false);

  const [profile, setProfile] = useState({
    name: "Teacher",
    email: "teacher@collegiya.com",
    phone: "+91 98765 43210",
    qualification: "Post Graduate",
    specialization: "Computer Science",
    experience: "2 Years",
    subjects: "Web Development, JavaScript, React",
    bio: "Passionate educator focused on practical and career-oriented learning.",
  });

  const change = (e) => {
    setProfile({
      ...profile,
      [e.target.name]: e.target.value,
    });
    setSaved(false);
  };

  const save = (e) => {
    e.preventDefault();
    setSaved(true);
  };

  return (
    <div className="tp-page">

      <div className="tp-top">
        <div>
          <div className="tp-label">TEACHER PORTAL</div>
          <h1>My Profile</h1>
          <p>Manage your professional teacher profile.</p>
        </div>

        <button className="tp-save-top" onClick={save}>
          ✓ Save Changes
        </button>
      </div>


      <div className="tp-hero">

        <div className="tp-avatar">
          {profile.name.charAt(0)}
        </div>

        <div className="tp-hero-info">
          <div className="tp-name">
            <h2>{profile.name}</h2>
            <span>✓ Verified</span>
          </div>

          <p>{profile.specialization}</p>

          <small>
            ✉ {profile.email} &nbsp; • &nbsp; Teacher Account
          </small>
        </div>

        <div className="tp-active">
          <b>●</b>
          <div>
            <strong>Profile Active</strong>
            <span>Account is active</span>
          </div>
        </div>

      </div>


      {saved && (
        <div className="tp-success">
          ✓ Profile changes saved successfully.
        </div>
      )}


      <form onSubmit={save}>

        <div className="tp-grid">

          <div className="tp-main">

            <section className="tp-card">

              <div className="tp-card-title">
                <div className="tp-icon blue">👤</div>

                <div>
                  <h3>Personal Information</h3>
                  <p>Your basic personal details</p>
                </div>
              </div>

              <div className="tp-fields">

                <div>
                  <label>Full Name</label>
                  <input
                    name="name"
                    value={profile.name}
                    onChange={change}
                  />
                </div>

                <div>
                  <label>Email Address</label>
                  <input
                    name="email"
                    type="email"
                    value={profile.email}
                    onChange={change}
                  />
                </div>

                <div>
                  <label>Phone Number</label>
                  <input
                    name="phone"
                    value={profile.phone}
                    onChange={change}
                  />
                </div>

                <div>
                  <label>Qualification</label>
                  <input
                    name="qualification"
                    value={profile.qualification}
                    onChange={change}
                  />
                </div>

              </div>

            </section>


            <section className="tp-card">

              <div className="tp-card-title">
                <div className="tp-icon purple">🎓</div>

                <div>
                  <h3>Professional Information</h3>
                  <p>Your teaching expertise</p>
                </div>
              </div>

              <div className="tp-fields">

                <div>
                  <label>Specialization</label>
                  <input
                    name="specialization"
                    value={profile.specialization}
                    onChange={change}
                  />
                </div>

                <div>
                  <label>Teaching Experience</label>
                  <input
                    name="experience"
                    value={profile.experience}
                    onChange={change}
                  />
                </div>

                <div className="tp-full">
                  <label>Teaching Subjects</label>
                  <input
                    name="subjects"
                    value={profile.subjects}
                    onChange={change}
                  />
                </div>

                <div className="tp-full">
                  <label>Professional Bio</label>
                  <textarea
                    name="bio"
                    value={profile.bio}
                    onChange={change}
                  />
                </div>

              </div>

            </section>


            <section className="tp-card">

              <div className="tp-card-title">
                <div className="tp-icon green">🔗</div>

                <div>
                  <h3>Professional Links</h3>
                  <p>Your online presence</p>
                </div>
              </div>

              <div className="tp-fields">

                <div>
                  <label>Website</label>
                  <input placeholder="https://yourwebsite.com" />
                </div>

                <div>
                  <label>LinkedIn</label>
                  <input placeholder="LinkedIn profile URL" />
                </div>

              </div>

            </section>

          </div>


          <aside className="tp-side">

            <div className="tp-completion">

              <div className="tp-completion-head">
                <div>
                  <small>PROFILE COMPLETION</small>
                  <strong>75%</strong>
                </div>

                <div className="tp-circle">
                  75%
                </div>
              </div>

              <div className="tp-progress">
                <div></div>
              </div>

              <p>
                Complete your profile to help students
                know you better.
              </p>

            </div>


            <div className="tp-card">

              <div className="tp-card-title">
                <div className="tp-icon orange">⚙</div>

                <div>
                  <h3>Account</h3>
                  <p>Account information</p>
                </div>
              </div>

              <div className="tp-account">

                <div>
                  <span>Account Type</span>
                  <b>Teacher</b>
                </div>

                <div>
                  <span>Status</span>
                  <b className="tp-green">● Active</b>
                </div>

                <div>
                  <span>Member Since</span>
                  <b>2026</b>
                </div>

              </div>

            </div>


            <div className="tp-mini">

              <div className="tp-mini-avatar">
                {profile.name.charAt(0)}
              </div>

              <div>
                <strong>{profile.name}</strong>
                <span>COLLEGIYA Teacher</span>
              </div>

            </div>

          </aside>

        </div>


        <div className="tp-bottom">

          <button
            type="button"
            className="tp-cancel"
            onClick={() => setSaved(false)}
          >
            Cancel
          </button>

          <button className="tp-save">
            ✓ Save Profile
          </button>

        </div>

      </form>

    </div>
  );
}
