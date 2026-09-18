import React, { useEffect, useRef, useState } from "react";
import {
  NavLink,
  Outlet,
  Link,
  useLocation,
  useNavigate,
} from "react-router-dom";
import "./studentlayout.css";

const menuGroups = [
  {
    title: "LEARNING",
    items: [
      { label: "Dashboard", path: "/student/dashboard", icon: "⌂" },
      { label: "My Courses", path: "/student/courses", icon: "▣" },
      { label: "Learning", path: "/student/learning", icon: "▶" },
      { label: "Quizzes", path: "/student/quiz", icon: "✓" },
    ],
  },
  {
    title: "ACHIEVEMENT",
    items: [
      { label: "Certificates", path: "/student/certificate", icon: "◆" },
      { label: "Notifications", path: "/student/notification", icon: "●" },
    ],
  },
  {
    title: "ACCOUNT",
    items: [
      { label: "My Profile", path: "/student/profile", icon: "●" },
    ],
  },
];

const pageNames = {
  "/student": "Dashboard",
  "/student/dashboard": "Dashboard",
  "/student/courses": "My Courses",
  "/student/learning": "Learning",
  "/student/quiz": "Quizzes",
  "/student/notification": "Notifications",
  "/student/notifications": "Notifications",
  "/student/profile": "My Profile",
  "/student/certificate": "Certificates",
  "/student/certificates": "Certificates",
};

const searchItems = [
  {
    label: "Dashboard",
    path: "/student/dashboard",
    icon: "⌂",
    keywords: "home dashboard progress overview",
  },
  {
    label: "My Courses",
    path: "/student/courses",
    icon: "▣",
    keywords: "courses course classes subjects",
  },
  {
    label: "Learning",
    path: "/student/learning",
    icon: "▶",
    keywords: "learn lesson lessons video study",
  },
  {
    label: "Quizzes",
    path: "/student/quiz",
    icon: "✓",
    keywords: "quiz quizzes test exam questions",
  },
  {
    label: "Certificates",
    path: "/student/certificate",
    icon: "◆",
    keywords: "certificate certificates achievement",
  },
  {
    label: "Notifications",
    path: "/student/notification",
    icon: "●",
    keywords: "notification notifications alerts updates",
  },
  {
    label: "My Profile",
    path: "/student/profile",
    icon: "●",
    keywords: "profile account student settings",
  },
];

function StudentLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchText, setSearchText] = useState("");

  const searchInputRef = useRef(null);

  const location = useLocation();
  const navigate = useNavigate();

  const pageName =
    pageNames[location.pathname] || "Student Portal";

  const closeSidebar = () => {
    setSidebarOpen(false);
  };

  const toggleSearch = () => {
    setSearchOpen((current) => !current);
  };

  const closeSearch = () => {
    setSearchOpen(false);
    setSearchText("");
  };

  const goToSearchResult = (path) => {
    navigate(path);
    closeSearch();
  };

  const handleLogout = () => {
    const confirmed = window.confirm(
      "Are you sure you want to logout?"
    );

    if (confirmed) {
      navigate("/login");
    }
  };

  useEffect(() => {
    if (searchOpen) {
      setTimeout(() => {
        searchInputRef.current?.focus();
      }, 100);
    }
  }, [searchOpen]);

  useEffect(() => {
    setSearchOpen(false);
    setSearchText("");
  }, [location.pathname]);

  useEffect(() => {
    const handleKeyboard = (event) => {
      if (event.key === "Escape") {
        closeSearch();
        closeSidebar();
      }

      if (
        (event.ctrlKey || event.metaKey) &&
        event.key.toLowerCase() === "k"
      ) {
        event.preventDefault();
        setSearchOpen(true);
      }
    };

    document.addEventListener("keydown", handleKeyboard);

    return () => {
      document.removeEventListener("keydown", handleKeyboard);
    };
  }, []);

  const filteredItems = searchItems.filter((item) => {
    const text = searchText.trim().toLowerCase();

    if (!text) {
      return true;
    }

    return `${item.label} ${item.keywords}`
      .toLowerCase()
      .includes(text);
  });

  return (
    <div className="student-portal">

      {/* MOBILE SIDEBAR OVERLAY */}
      {sidebarOpen && (
        <button
          className="student-sidebar-overlay"
          onClick={closeSidebar}
          aria-label="Close sidebar"
        />
      )}

      {/* SIDEBAR */}
      <aside
        className={`student-sidebar ${
          sidebarOpen ? "student-sidebar-open" : ""
        }`}
      >
        <div className="student-sidebar-header">

          <Link
            to="/student/dashboard"
            className="student-brand"
            onClick={closeSidebar}
          >
            <img
              src="/logo.jpg"
              alt="Collegiya"
            />

            <div className="student-brand-text">
              <strong>Collegiya</strong>
              <span>Student Portal</span>
            </div>
          </Link>

          <button
            className="student-sidebar-close"
            onClick={closeSidebar}
            aria-label="Close menu"
          >
            ×
          </button>
        </div>

        {/* PROFILE */}
        <div className="student-sidebar-profile">
          <div className="student-sidebar-avatar">
            S
          </div>

          <div className="student-sidebar-user">
            <strong>Student</strong>
            <span>Learning Account</span>
          </div>

          <span className="student-online-dot"></span>
        </div>

        {/* MENU */}
        <nav className="student-navigation">
          {menuGroups.map((group) => (
            <div
              className="student-menu-group"
              key={group.title}
            >
              <p className="student-menu-title">
                {group.title}
              </p>

              {group.items.map((item) => (
                <NavLink
                  key={item.path}
                  to={item.path}
                  onClick={closeSidebar}
                  className={({ isActive }) =>
                    `student-menu-link ${
                      isActive ? "active" : ""
                    }`
                  }
                >
                  <span className="student-menu-icon">
                    {item.icon}
                  </span>

                  <span className="student-menu-label">
                    {item.label}
                  </span>

                  {item.label === "Notifications" && (
                    <span className="student-menu-count">
                      3
                    </span>
                  )}
                </NavLink>
              ))}
            </div>
          ))}
        </nav>

        {/* SIDEBAR BOTTOM */}
        <div className="student-sidebar-bottom">

          <Link
            to="/"
            className="student-back-home"
            onClick={closeSidebar}
          >
            <span>←</span>
            <span>Back to Collegiya</span>
          </Link>

          <button
            className="student-logout"
            onClick={handleLogout}
          >
            <span>↪</span>
            <span>Logout</span>
          </button>

        </div>
      </aside>

      {/* MAIN */}
      <div className="student-main-area">

        {/* TOPBAR */}
        <header className="student-topbar">

          <div className="student-topbar-left">

            <button
              className="student-mobile-menu"
              onClick={() => setSidebarOpen(true)}
              aria-label="Open menu"
            >
              <span></span>
              <span></span>
              <span></span>
            </button>

            <div className="student-breadcrumb">
              <span>Student Portal</span>
              <b>/</b>
              <strong>{pageName}</strong>
            </div>

          </div>

          <div className="student-topbar-right">

            {/* SEARCH BUTTON */}
            {!searchOpen && (
              <button
                type="button"
                className="student-topbar-search"
                onClick={toggleSearch}
                aria-label="Open search"
              >
                <span className="search-symbol">
                  🔍
                </span>

                <small>Search</small>
              </button>
            )}

            {/* SEARCH BOX */}
            {searchOpen && (
              <div className="student-topbar-search-box">

                <span className="search-input-icon">
                  🔍
                </span>

                <input
                  ref={searchInputRef}
                  type="text"
                  value={searchText}
                  onChange={(event) =>
                    setSearchText(event.target.value)
                  }
                  placeholder="Search..."
                  autoComplete="off"
                />

                {searchText && (
                  <button
                    type="button"
                    className="search-clear-button"
                    onClick={() => setSearchText("")}
                  >
                    ×
                  </button>
                )}

                <button
                  type="button"
                  className="search-close-button"
                  onClick={closeSearch}
                >
                  ×
                </button>

              </div>
            )}

            {/* SEARCH RESULTS */}
            {searchOpen && (
              <div className="student-search-results">

                <div className="search-results-title">
                  {searchText
                    ? "SEARCH RESULTS"
                    : "QUICK ACCESS"}
                </div>

                {filteredItems.map((item) => (
                  <button
                    type="button"
                    key={item.path}
                    className="student-search-item"
                    onClick={() =>
                      goToSearchResult(item.path)
                    }
                  >
                    <span className="search-item-icon">
                      {item.icon}
                    </span>

                    <span className="search-item-content">
                      <strong>{item.label}</strong>
                      <small>
                        Open {item.label}
                      </small>
                    </span>

                    <span className="search-item-arrow">
                      →
                    </span>
                  </button>
                ))}

                {filteredItems.length === 0 && (
                  <div className="search-no-result">
                    <strong>No result found</strong>
                    <span>
                      Try Dashboard, Courses, Learning,
                      Quiz or Profile.
                    </span>
                  </div>
                )}

              </div>
            )}

            {/* NOTIFICATION */}
            <Link
              to="/student/notification"
              className="student-topbar-notification"
              aria-label="Notifications"
            >
              <span className="student-bell">
                ●
              </span>
              <i></i>
            </Link>

            {/* PROFILE */}
            <Link
              to="/student/profile"
              className="student-topbar-profile"
            >
              <div className="student-topbar-avatar">
                S
              </div>

              <div className="student-topbar-user">
                <strong>Student</strong>
                <span>My Account</span>
              </div>

              <b>⌄</b>
            </Link>

          </div>
        </header>

        {/* PAGE CONTENT */}
        <main className="student-page-content">
          <Outlet />
        </main>

        {/* MOBILE FOOTER */}
        <footer className="student-mobile-footer">

          <NavLink to="/student/dashboard">
            <span>⌂</span>
            <small>Home</small>
          </NavLink>

          <NavLink to="/student/courses">
            <span>▣</span>
            <small>Courses</small>
          </NavLink>

          <NavLink to="/student/learning">
            <span>▶</span>
            <small>Learn</small>
          </NavLink>

          <NavLink to="/student/notification">
            <span>●</span>
            <small>Alerts</small>
          </NavLink>

          <NavLink to="/student/profile">
            <span>●</span>
            <small>Profile</small>
          </NavLink>

        </footer>

      </div>
    </div>
  );
}

export default StudentLayout;
