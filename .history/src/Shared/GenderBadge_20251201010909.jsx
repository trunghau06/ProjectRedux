import React from "react";
import "../../styles/Shared/GenderBadge.css"; // CSS cho badge

export default function GenderBadge({ genre }) {
  if (!genre) return null;

  const isMale = genre.toLowerCase() === "male";
  const badgeClass = isMale ? "badge-male" : "badge-female";
  const iconClass = isMale ? "fa-mars" : "fa-venus";
  const label = isMale ? "Nam" : "Nữ";

  return (
    <span className={`gender-badge ${badgeClass}`}>
      <i className={`fa-solid ${iconClass}`}></i> {label}
    </span>
  );
}
