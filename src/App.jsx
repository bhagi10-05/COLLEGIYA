import React from "react";
import { Routes, Route } from "react-router-dom";

import MainLayout from "./layouts/MainLayout";
import StudentLayout from "./layouts/StudentLayout";
import TeacherLayout from "./layouts/TeacherLayout";

import ProtectedRoute from "./components/ProtectedRoute";

// =========================
// PUBLIC
// =========================

import Home from "./pages/Home";
import Courses from "./pages/Courses";
import Learning from "./pages/Learning";
import Login from "./pages/Login";
import Signup from "./pages/Signup";

// =========================
// STUDENT
// =========================

import StudentDashboard from "./student/Dashboard";
import StudentCourses from "./student/Courses";
import StudentLearning from "./student/Learning";
import StudentQuiz from "./student/Quiz";
import StudentNotification from "./student/Notification";
import StudentProfile from "./student/Profile";
import StudentCertificate from "./student/Certificate";

// =========================
// TEACHER
// =========================

import TeacherDashboard from "./teacher/Dashboard";
import TeacherCourses from "./teacher/Courses";
import TeacherLectures from "./teacher/Lectures";
import TeacherStudents from "./teacher/Students";
import TeacherQuiz from "./teacher/Quiz";
import TeacherAssignments from "./teacher/Assignments";
import TeacherAnnouncements from "./teacher/Announcements";
import TeacherEarnings from "./teacher/Earnings";
import TeacherProfile from "./teacher/Profile";
import TeacherSettings from "./teacher/Settings";

export default function App() {
  return (
    <Routes>

      {/* =================================
          PUBLIC WEBSITE
      ================================= */}

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


      {/* =================================
          PROTECTED STUDENT PORTAL
      ================================= */}

      <Route element={<ProtectedRoute />}>

        <Route
          path="/student"
          element={<StudentLayout />}
        >

          <Route
            index
            element={<StudentDashboard />}
          />

          <Route
            path="dashboard"
            element={<StudentDashboard />}
          />

          <Route
            path="courses"
            element={<StudentCourses />}
          />

          <Route
            path="learning"
            element={<StudentLearning />}
          />

          <Route
            path="quiz"
            element={<StudentQuiz />}
          />

          <Route
            path="notification"
            element={<StudentNotification />}
          />

          <Route
            path="notifications"
            element={<StudentNotification />}
          />

          <Route
            path="profile"
            element={<StudentProfile />}
          />

          <Route
            path="certificate"
            element={<StudentCertificate />}
          />

          <Route
            path="certificates"
            element={<StudentCertificate />}
          />

        </Route>

      </Route>


      {/* =================================
          TEACHER PORTAL
      ================================= */}

      <Route
        path="/teacher"
        element={<TeacherLayout />}
      >

        <Route
          index
          element={<TeacherDashboard />}
        />

        <Route
          path="dashboard"
          element={<TeacherDashboard />}
        />

        <Route
          path="courses"
          element={<TeacherCourses />}
        />

        <Route
          path="lectures"
          element={<TeacherLectures />}
        />

        <Route
          path="students"
          element={<TeacherStudents />}
        />

        <Route
          path="quiz"
          element={<TeacherQuiz />}
        />

        <Route
          path="assignments"
          element={<TeacherAssignments />}
        />

        <Route
          path="announcements"
          element={<TeacherAnnouncements />}
        />

        <Route
          path="earnings"
          element={<TeacherEarnings />}
        />

        <Route
          path="profile"
          element={<TeacherProfile />}
        />

        <Route
          path="settings"
          element={<TeacherSettings />}
        />

      </Route>

    </Routes>
  );
}
