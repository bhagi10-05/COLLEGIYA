import React from "react";
import "./card.css";

function Card({
  children,
  title,
  description,
  image,
  icon,
  onClick,
  className = "",
}) {
  const cardClass = [
    "common-card",
    onClick ? "card-clickable" : "",
    className,
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <article
      className={cardClass}
      onClick={onClick}
      role={onClick ? "button" : undefined}
      tabIndex={onClick ? 0 : undefined}
    >
      {image && (
        <div className="card-image">
          <img src={image} alt={title || "Card"} />
        </div>
      )}

      {icon && (
        <div className="card-icon">
          {icon}
        </div>
      )}

      <div className="card-content">
        {title && (
          <h3 className="card-title">
            {title}
          </h3>
        )}

        {description && (
          <p className="card-description">
            {description}
          </p>
        )}

        {children}
      </div>
    </article>
  );
}

export default Card;
