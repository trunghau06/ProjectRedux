import React from "react";
import { useSelector } from "react-redux";
import { lightenColor } from "";
import "../../styles/DataView/DataCard.css";

export default function DataCard() {
  const users = useSelector((state) => state.users.data) || [];

  const handleEdit = (user) => {
    console.log("Edit user:", user);
  };

  const handleDelete = (userId) => {
    console.log("Delete user:", userId);
  };

  return (
    <div id="cardView" className="card-list-grid">
      {users.map((user) => {
        const genderBadgeClass = user.genre === "male" ? "badge-male" : "badge-female";
        const genderIconClass = user.genre === "male" ? "fa-mars" : "fa-venus";
        const genderLabel = user.genre === "male" ? "Nam" : "Nữ";

        return (
          <div
            key={user.id}
            className="card"
            data-id={user.id}
            style={{ backgroundColor: lightenColor(user.color || "#FFFFFF", 70) }}
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

            <div className="card-actions">
              <button
                className="btn-action edit-icon"
                title="Chỉnh sửa"
                onClick={() => handleEdit(user)}
              >
                <i className="fa-solid fa-pen"></i>
              </button>
              <button
                className="btn-action delete-icon"
                title="Xóa"
                onClick={() => handleDelete(user.id)}
              >
                <i className="fa-solid fa-trash"></i>
              </button>
            </div>
          </div>
        );
      })}
    </div>
  );
}