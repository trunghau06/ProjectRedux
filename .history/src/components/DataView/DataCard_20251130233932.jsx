import React from "react";
import { useSelector } from "react-redux";

export default function DataCard() {
  const users = useSelector((state) => state.users.items);

  return (
    <div id="cardView" className="card-view">
      {users.map((user, index) => (
        <div
          className="card"
          key={`${user.id}-${index}`}
          style={{ backgroundColor: user.color || "#fff" }}
        >
          <div className="card-header">
            <img
              src={user.avatar || "https://via.placeholder.com/60"}
              alt={user.name}
              className="avatar"
            />
            <div className="card-info">
              <div className="card-name">{user.name}</div>
              <div className="card-company">{user.company}</div>
            </div>
            <div className="card-genre">{user.genre}</div>
          </div>
          <div className="card-body">
            <div>ID: {user.id}</div>
            <div>DOB: {user.dob}</div>
            <div>Color: {user.color}</div>
            <div>Timezone: {user.timezone}</div>
            <div>Music: {user.music}</div>
            <div>City: {user.city}</div>
            <div>State: {user.state}</div>
            <div>Address: {user.address}</div>
            <div>Street: {user.street}</div>
            <div>Building: {user.building}</div>
            <div>ZIP: {user.zip || user.zipcode}</div>
            <div>Email: {user.email}</div>
            <div>Phone: {user.phone}</div>
            <div>CreatedAt: {user.createdAt}</div>
            <div>Password: {user.password}</div>
          </div>
        </div>
      ))}
    </div>
  );
}
