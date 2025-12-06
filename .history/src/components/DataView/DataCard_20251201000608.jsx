import React from "react";
i

function DataCard({ user }) {
  const lightenColor = (hexColor, percent) => {
    hexColor = hexColor.replace("#", "");
    let r = parseInt(hexColor.substring(0, 2), 16);
    let g = parseInt(hexColor.substring(2, 4), 16);
    let b = parseInt(hexColor.substring(4, 6), 16);
    r = Math.min(255, Math.floor(r + (255 - r) * percent / 100));
    g = Math.min(255, Math.floor(g + (255 - g) * percent / 100));
    b = Math.min(255, Math.floor(b + (255 - b) * percent / 100));
    return `rgb(${r},${g},${b})`;
  };

  const isMale = user.genre?.toLowerCase() === "male";
  const genderBadgeClass = isMale ? "badge-male" : "badge-female";
  const genderIconClass = isMale ? "fa-mars" : "fa-venus";
  const genderLabel = isMale ? "Nam" : "Nữ";

  return (
    <div
      className="card"
      style={{ backgroundColor: lightenColor(user.color || "#FFFFFF", 70) }}
      data-id={user.id}
    >
      <div className="card-header">
        <img
          src={user.avatar || "https://via.placeholder.com/60"}
          alt={user.name}
          className="avatar"
        />
        <div className="card-info">
          <div className="card-name">{user.name || "N/A"}</div>
          <div className="card-company">{user.company || "N/A"}</div>
        </div>
        <span className={`card-badge ${genderBadgeClass}`}>
          <i className={`fa-solid ${genderIconClass}`}></i> {genderLabel}
        </span>
      </div>

      <div className="card-body">
        <div className="card-item"><strong>ID:</strong> {user.id || "N/A"}</div>
        <div className="card-item"><strong>Created At:</strong> {user.createdAt || "N/A"}</div>
        <div className="card-item"><strong>Name:</strong> {user.name || "N/A"}</div>
        <div className="card-item"><strong>Genre:</strong> {user.genre || "N/A"}</div>
        <div className="card-item"><strong>Company:</strong> {user.company || "N/A"}</div>
        <div className="card-item"><strong>DOB:</strong> {user.dob || "N/A"}</div>
        <div className="card-item"><strong>Color:</strong> {user.color || "N/A"}</div>
        <div className="card-item"><strong>Timezone:</strong> {user.timezone || "N/A"}</div>
        <div className="card-item"><strong>Music:</strong> {user.music || "N/A"}</div>
        <div className="card-item"><strong>Address:</strong> {user.address || "N/A"}</div>
        <div className="card-item"><strong>City:</strong> {user.city || "N/A"}</div>
        <div className="card-item"><strong>State:</strong> {user.state || "N/A"}</div>
        <div className="card-item"><strong>Street:</strong> {user.street || "N/A"}</div>
        <div className="card-item"><strong>Building:</strong> {user.building || "N/A"}</div>
        <div className="card-item"><strong>ZIP:</strong> {user.zip || user.zipcode || "N/A"}</div>
        <div className="card-item"><strong>Email:</strong> {user.email || "N/A"}</div>
        <div className="card-item"><strong>Phone:</strong> {user.phone || "N/A"}</div>
        <div className="card-item"><strong>Password:</strong> {user.password || "N/A"}</div>
      </div>
    </div>
  );
}

export default DataCard;
