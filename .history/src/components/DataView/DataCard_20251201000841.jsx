import React from "react";
import { useSelector } from "react-redux";
import "../../styles/DataView/DataCard.css";

export default function DataCard() {
  const users = useSelector((state) => state.users.data) || [];

  return (
    <div id="cardView" className="card-view-container">
      {users.map((user) => (
        <div
          key={user.id}
          className="card"
          data-id={user.id}
          style={{ backgroundColor: user.color || "#FFFFFF" }}
        >
          <div className="card-header">
            <img
              src={user.avatar || "https://via.placeholder.com/60"}
              alt={user.name || "N/A"}
              className="avatar"
            />
            <div className="card-info">
              <div className="card-name">{user.name || "N/A"}</div>
              <div className="card-company">{user.company || "N/A"}</div>
            </div>
            {/* Nếu muốn thêm badge giới tính */}
            {/* <span className={`card-badge ${genderBadgeClass}`}>
              <i className={`fa-solid ${genderIconClass}`}></i> {genderLabel}
            </span> */}
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

          {/* Không cần card-actions nếu không dùng nút */}
          {/* <div className="card-actions">
            <button className="btn-action edit-icon" title="Chỉnh sửa">
              <i className="fa-solid fa-pen"></i>
            </button>
            <button className="btn-action delete-icon" title="Xóa">
              <i className="fa-solid fa-trash"></i>
            </button>
          </div> */}
        </div>
      ))}
    </div>
  );
}
