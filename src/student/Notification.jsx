import React, { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import "./notification.css";

const initialNotifications = [
  {
    id: 1,
    type: "course",
    title: "New Course Available",
    message:
      "A new React & Full Stack Development course has been added to your learning path. Start learning today and build your skills with practical projects and guided lessons.",
    time: "10 minutes ago",
    unread: true,
  },
  {
    id: 2,
    type: "quiz",
    title: "Quiz Reminder",
    message:
      "Your JavaScript fundamentals quiz is waiting for you. Complete it before the deadline and check your understanding of the important concepts covered in this module.",
    time: "1 hour ago",
    unread: true,
  },
  {
    id: 3,
    type: "college",
    title: "College Notice",
    message:
      "A new academic notice has been published by your college administration. Please check the complete notice for important dates, instructions and other academic information.",
    time: "3 hours ago",
    unread: true,
  },
  {
    id: 4,
    type: "certificate",
    title: "Certificate Ready",
    message:
      "Your course completion certificate is now available to view and download. You can access your certificate from the Certificates section of your student portal.",
    time: "Yesterday",
    unread: false,
  },
  {
    id: 5,
    type: "system",
    title: "Profile Updated",
    message:
      "Your student profile information was successfully updated. You can review your profile details anytime from your account section.",
    time: "Yesterday",
    unread: false,
  },
  {
    id: 6,
    type: "course",
    title: "Continue Learning",
    message:
      "You are 72% through your current course. Keep going to complete the remaining lessons, activities and assessments in your learning path.",
    time: "2 days ago",
    unread: false,
  },
];

const getIcon = (type) => {
  switch (type) {
    case "course":
      return "▣";
    case "quiz":
      return "✓";
    case "college":
      return "▤";
    case "certificate":
      return "◆";
    case "system":
      return "⚙";
    default:
      return "●";
  }
};

const getTypeLabel = (type) => {
  switch (type) {
    case "course":
      return "Course";
    case "quiz":
      return "Quiz";
    case "college":
      return "College";
    case "certificate":
      return "Certificate";
    case "system":
      return "Account";
    default:
      return "Update";
  }
};

function Notification() {
  const [notifications, setNotifications] =
    useState(initialNotifications);

  const [filter, setFilter] = useState("all");

  const [expandedNotifications, setExpandedNotifications] =
    useState([]);

  const unreadCount = useMemo(() => {
    return notifications.filter(
      (item) => item.unread
    ).length;
  }, [notifications]);

  const filteredNotifications = useMemo(() => {
    if (filter === "unread") {
      return notifications.filter(
        (item) => item.unread
      );
    }

    return notifications;
  }, [notifications, filter]);

  const markRead = (id) => {
    setNotifications((items) =>
      items.map((item) =>
        item.id === id
          ? {
              ...item,
              unread: false,
            }
          : item
      )
    );
  };

  const removeNotification = (id) => {
    setNotifications((items) =>
      items.filter(
        (item) => item.id !== id
      )
    );

    setExpandedNotifications((items) =>
      items.filter(
        (itemId) => itemId !== id
      )
    );
  };

  const toggleMore = (id) => {
    setExpandedNotifications((items) =>
      items.includes(id)
        ? items.filter(
            (itemId) => itemId !== id
          )
        : [...items, id]
    );
  };

  const isExpanded = (id) => {
    return expandedNotifications.includes(id);
  };

  return (
    <section className="notification-page">

      <div className="notification-container">

        {/* DASHBOARD */}

        <Link
          to="/student/dashboard"
          className="notification-back"
        >
          <span>&lt;&lt;</span>
          Dashboard
        </Link>

        {/* NOTICE BOARD */}

        <div className="notice-board-heading">

          <div className="notice-board-line"></div>

          <h1>NOTICE BOARD</h1>

          <div className="notice-board-line"></div>

          <p>
            Latest updates, announcements and important notices
          </p>

        </div>

        {/* FILTER */}

        <div className="notification-toolbar">

          <div className="notification-tabs">

            <button
              type="button"
              className={
                filter === "all"
                  ? "notification-tab active"
                  : "notification-tab"
              }
              onClick={() => setFilter("all")}
            >
              <span>All</span>
              <b>{notifications.length}</b>
            </button>

            <button
              type="button"
              className={
                filter === "unread"
                  ? "notification-tab active"
                  : "notification-tab"
              }
              onClick={() =>
                setFilter("unread")
              }
            >
              <span>Unread</span>
              <b>{unreadCount}</b>
            </button>

          </div>

          <span className="notification-status">
            {unreadCount > 0
              ? `${unreadCount} unread notice${
                  unreadCount > 1 ? "s" : ""
                }`
              : "Everything is up to date"}
          </span>

        </div>

        {/* NOTICE LIST */}

        <div className="notification-list">

          {filteredNotifications.length === 0 ? (

            <div className="notification-empty">

              <div className="empty-icon">
                ✓
              </div>

              <h2>
                You're all caught up
              </h2>

              <p>
                There are no unread notices right now.
              </p>

              {filter === "unread" && (
                <button
                  type="button"
                  className="empty-action"
                  onClick={() =>
                    setFilter("all")
                  }
                >
                  View all notices
                </button>
              )}

            </div>

          ) : (

            filteredNotifications.map(
              (notification) => {

                const expanded =
                  isExpanded(
                    notification.id
                  );

                return (
                  <article
                    key={notification.id}
                    className={
                      notification.unread
                        ? "notification-card unread"
                        : "notification-card"
                    }
                    onClick={() =>
                      markRead(
                        notification.id
                      )
                    }
                  >

                    {/* ICON */}

                    <div
                      className={`notification-icon ${notification.type}`}
                    >
                      {getIcon(
                        notification.type
                      )}
                    </div>

                    {/* CONTENT */}

                    <div className="notification-content">

                      {/* TOP */}

                      <div className="notification-card-top">

                        <div className="notification-card-title">

                          <div className="notification-type">
                            {getTypeLabel(
                              notification.type
                            )}
                          </div>

                          <div className="notification-title-line">

                            <h3>
                              {notification.title}
                            </h3>

                            {notification.unread && (
                              <span className="unread-dot"></span>
                            )}

                          </div>

                        </div>

                        <span className="notification-time">
                          {notification.time}
                        </span>

                      </div>

                      {/* DESCRIPTION */}

                      {expanded ? (

                        <div className="notification-expanded">

                          <p className="notification-full-message">
                            {notification.message}
                          </p>

                          <button
                            type="button"
                            className="read-more-button"
                            onClick={(event) => {
                              event.stopPropagation();

                              toggleMore(
                                notification.id
                              );
                            }}
                          >
                            ... Read less
                          </button>

                        </div>

                      ) : (

                        <div className="notification-preview">

                          <div className="preview-text">
                            {notification.message}
                          </div>

                          <button
                            type="button"
                            className="read-more-button"
                            onClick={(event) => {
                              event.stopPropagation();

                              toggleMore(
                                notification.id
                              );
                            }}
                          >
                            ... Read more
                          </button>

                        </div>

                      )}

                      {/* READ STATUS */}

                      <div className="notification-card-actions">

                        {notification.unread ? (

                          <button
                            type="button"
                            className="read-btn"
                            onClick={(event) => {
                              event.stopPropagation();

                              markRead(
                                notification.id
                              );
                            }}
                          >
                            ✓ Mark as read
                          </button>

                        ) : (

                          <span className="read-status">
                            ✓ Read
                          </span>

                        )}

                      </div>

                    </div>

                    {/* DELETE */}

                    <button
                      type="button"
                      className="delete-notification"
                      aria-label="Delete notice"
                      onClick={(event) => {
                        event.stopPropagation();

                        removeNotification(
                          notification.id
                        );
                      }}
                    >
                      ×
                    </button>

                  </article>
                );
              }
            )

          )}

        </div>

      </div>

    </section>
  );
}

export default Notification;
