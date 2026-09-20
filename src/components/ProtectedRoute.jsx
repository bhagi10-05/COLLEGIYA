import React, {
  useEffect,
  useState,
} from "react";

import {
  Navigate,
  Outlet,
  useLocation,
} from "react-router-dom";

const API_BASE =
  import.meta.env.VITE_API_URL ||
  "http://localhost:5000/api";

export default function ProtectedRoute() {
  const location =
    useLocation();

  const [checking, setChecking] =
    useState(true);

  const [authenticated, setAuthenticated] =
    useState(false);

  useEffect(() => {
    let active = true;

    const verifyToken =
      async () => {
        const token =
          localStorage.getItem(
            "collegiya_student_token"
          );

        if (!token) {
          if (active) {
            setAuthenticated(false);
            setChecking(false);
          }

          return;
        }

        try {
          const response =
            await fetch(
              `${API_BASE}/auth/student/me`,
              {
                method: "GET",
                headers: {
                  Authorization:
                    `Bearer ${token}`,
                },
              }
            );

          if (!response.ok) {
            throw new Error(
              "Invalid authentication"
            );
          }

          const data =
            await response.json();

          if (
            !data.success ||
            !data.student
          ) {
            throw new Error(
              "Invalid student session"
            );
          }

          // Keep safe student data updated.
          localStorage.setItem(
            "collegiya_student_user",
            JSON.stringify({
              id:
                data.student.id,
              fullName:
                data.student.name,
              email:
                data.student.email,
              role:
                data.student.role,
            })
          );

          if (active) {
            setAuthenticated(true);
          }
        } catch (error) {
          console.error(
            "ProtectedRoute:",
            error
          );

          localStorage.removeItem(
            "collegiya_student_token"
          );

          localStorage.removeItem(
            "collegiya_student_user"
          );

          if (active) {
            setAuthenticated(false);
          }
        } finally {
          if (active) {
            setChecking(false);
          }
        }
      };

    verifyToken();

    return () => {
      active = false;
    };
  }, []);

  if (checking) {
    return (
      <div
        style={{
          minHeight: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontFamily:
            "Arial, sans-serif",
          fontSize: "16px",
          fontWeight: "600",
        }}
      >
        Checking secure session...
      </div>
    );
  }

  if (!authenticated) {
    return (
      <Navigate
        to="/login"
        replace
        state={{
          from:
            location.pathname,
        }}
      />
    );
  }

  return <Outlet />;
}
