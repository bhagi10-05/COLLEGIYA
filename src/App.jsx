import React from "react";
import { Routes, Route } from "react-router-dom";

/* =========================
   MAIN WEBSITE
========================= */
import MainLayout from "./layouts/MainLayout";

/* =========================
   STUDENT LAYOUT
========================= */
import StudentLayout from "./layouts/StudentLayout";

/* =========================
   PUBLIC PAGES
========================= */
import Home from "./pages/Home";
import Courses from "./pages/Courses";
import Learning from "./pages/Learning";
import Login from "./pages/Login";
import Signup from "./pages/Signup";

/* =========================
   STUDENT PAGES
========================= */
import StudentDashboard from "./student/Dashboard";
import StudentCourses from "./student/Courses";
import StudentLearning from "./student/Learning";
import StudentQuiz from "./student/Quiz";
import StudentNotification from "./student/Notification";
import StudentProfile from "./student/Profile";
import StudentCertificate from "./student/Certificate";

/* =========================
   TEACHER MODULE
========================= */
import TeacherLayout from "./teacher/layouts/TeacherLayout";
import TeacherLogin from "./teacher/pages/TeacherLogin";
import TeacherDashboard from "./teacher/pages/TeacherDashboard";


/* ==================================================
   TEACHER PLACEHOLDER
================================================== */

function TeacherComingSoon({ title }) {
  return (
    <div
      style={{
        background: "#ffffff",
        border: "1px solid #e8ebf2",
        borderRadius: "18px",
        padding: "40px",
        minHeight: "300px",
      }}
    >
      <h1>{title}</h1>

      <p
        style={{
          color: "#747b8c",
          marginTop: "10px",
        }}
      >
        This Teacher Module is coming soon.
      </p>
    </div>
  );
}


/* ==================================================
   APP ROUTES
================================================== */

export default function App() {
  return (
    <Routes>

      {/* ==============================================
          PUBLIC COLLEGIYA WEBSITE
      ============================================== */}

      <Route element={<MainLayout />}>

        <Route
          path="/"
          element={<Home />}
        />

        <Route
          path="/courses"
          element={<Courses />}
        />

        <Route
          path="/learning"
          element={<Learning />}
        />

        <Route
          path="/login"
          element={<Login />}
        />

        <Route
          path="/signup"
          element={<Signup />}
        />

      </Route>


      {/* ==============================================
          STUDENT PORTAL
      ============================================== */}

      <Route
        path="/student"
        element={<StudentLayout />}
      >

        {/* /student */}
        <Route
          index
          element={<StudentDashboard />}
        />

        {/* /student/dashboard */}
        <Route
          path="dashboard"
          element={<StudentDashboard />}
        />

        {/* /student/courses */}
        <Route
          path="courses"
          element={<StudentCourses />}
        />

        {/* /student/learning */}
        <Route
          path="learning"
          element={<StudentLearning />}
        />

        {/* /student/quiz */}
        <Route
          path="quiz"
          element={<StudentQuiz />}
        />

        {/* /student/notification */}
        <Route
          path="notification"
          element={<StudentNotification />}
        />

        {/* /student/notifications */}
        <Route
          path="notifications"
          element={<StudentNotification />}
        />

        {/* /student/profile */}
        <Route
          path="profile"
          element={<StudentProfile />}
        />

        {/* /student/certificate */}
        <Route
          path="certificate"
          element={<StudentCertificate />}
        />

        {/* /student/certificates */}
        <Route
          path="certificates"
          element={<StudentCertificate />}
        />

      </Route>


      {/* ==============================================
          TEACHER LOGIN
          Separate from Teacher Layout
      ============================================== */}

      <Route
        path="/teacher/login"
        element={<TeacherLogin />}
      />


      {/* ==============================================
          TEACHER PORTAL
          COMPLETELY SEPARATE MODULE
      ============================================== */}

      <Route
        path="/teacher"
        element={<TeacherLayout />}
      >

        {/* /teacher */}
        <Route
          index
          element={<TeacherDashboard />}
        />

        {/* /teacher/dashboard */}
        <Route
          path="dashboard"
          element={<TeacherDashboard />}
        />

        {/* /teacher/courses */}
        <Route
          path="courses"
          element={
            <TeacherComingSoon title="My Courses" />
          }
        />

        {/* /teacher/students */}
        <Route
          path="students"
          element={
            <TeacherComingSoon title="Students" />
          }
        />

        {/* /teacher/tests */}
        <Route
          path="tests"
          element={
            <TeacherComingSoon title="Tests" />
          }
        />

        {/* /teacher/content */}
        <Route
          path="content"
          element={
            <TeacherComingSoon title="Content" />
          }
        />

        {/* /teacher/analytics */}
        <Route
          path="analytics"
          element={
            <TeacherComingSoon title="Analytics" />
          }
        />

        {/* /teacher/earnings */}
        <Route
          path="earnings"
          element={
            <TeacherComingSoon title="Earnings" />
          }
        />

      </Route>

    </Routes>
  );
}
