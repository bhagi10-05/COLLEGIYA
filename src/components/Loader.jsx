import React from "react";
import "./loader.css";

function Loader({
  text = "Loading...",
  fullScreen = false,
  size = "medium",
}) {
  const loaderClass = [
    "loader-wrapper",
    fullScreen ? "loader-fullscreen" : "",
    `loader-${size}`,
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <div
      className={loaderClass}
      role="status"
      aria-live="polite"
      aria-label={text}
    >
      <div className="loader-spinner">
        <span></span>
        <span></span>
        <span></span>
      </div>

      {text && (
        <p className="loader-text">
          {text}
        </p>
      )}
    </div>
  );
}

export default Loader;
