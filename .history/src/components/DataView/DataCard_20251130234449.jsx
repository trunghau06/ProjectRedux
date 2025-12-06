import React from "react";
import { useSelector } from "react-redux";

export default function DataCard() {
  const users = useSelector((state) => state.users.data) || [];

  return (
    <div id="cardView" className="card-view-container">
      {users.map((user) => (
        <div key={user.id} className="card" style={{ backgroundColor: user.color || "#fff" }}>
          <div className="card-header">
            <img src={user.avatar || "https://via.placeholder.com/60"} alt={user.name} className="avatar" />
            <div className="card-info">
              <div className="card-name">{user.name}</div>
              <div className="card-company">{user.company}</div>
            </div>
          </div>
          <div className="card-body">
            <div><strong>ID:</strong> {user.id}</div>
            <div><strong>Genre:</strong> {user.genre}</div>
            <div><strong>Email:</strong> {user.email}</div>
            <div><strong>Phone:</strong> {user.phone}</div>
            <div><strong>DOB:</strong> {user.dob}</div>
            <div><strong>Color:</strong> {user.color}</div>
            <div><strong>Timezone:</strong> {user.timezone}</div>
            <div><strong>Music:</strong> {user.music}</div>
            <div><strong>Address:</strong> {user.address}</div>
            <div><strong>City:</strong> {user.city}</div>
            <div><strong>State:</strong> {user.state}</div>
            <div><strong>Street:</strong> {user.street}</div>
            <div><strong>Building:</strong> {user.building}</div>
            <div><strong>ZIP:</strong> {user.zip}</div>
            <div><strong>CreatedAt:</strong> {user.createdAt}</div>
            <div><strong>Password:</strong> {user.password}</div>
          </div>
        </div>
      ))}
    </div>
  );
}
