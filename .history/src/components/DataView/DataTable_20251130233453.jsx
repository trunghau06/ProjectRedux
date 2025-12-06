import React from "react";
import "../../styles/DataView/DataTable.css";

export default function DataTable({ users }) {
  return (
    <div className="table-wrapper">
      <table className="data-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Avatar</th>
            <th>Name</th>
            <th>Company</th>
            <th>Genre</th>
            <th>Email</th>
            <th>Phone</th>
            <th>DOB</th>
            <th>Color</th>
            <th>Timezone</th>
            <th>Music</th>
            <th>City</th>
            <th>State</th>
            <th>Address</th>
            <th>Street</th>
            <th>Building</th>
            <th>ZIP</th>
            <th>CreatedAt</th>
            <th>Password</th>
          </tr>
        </thead>
        <tbody>
          {users.map(user => (
            <tr key={user.id}>
              <td>{user.id}</td>
              <td>
                <img
                  src={user.avatar || "https://via.placeholder.com/40"}
                  alt={user.name}
                  className="avatar-small"
                />
              </td>
              <td>{user.name}</td>
              <td>{user.company}</td>
              <td>{user.genre}</td>
              <td>{user.email}</td>
              <td>{user.phone}</td>
              <td>{user.dob}</td>
              <td>{user.color}</td>
              <td>{user.timezone}</td>
              <td>{user.music}</td>
              <td>{user.city}</td>
              <td>{user.state}</td>
              <td>{user.address}</td>
              <td>{user.street}</td>
              <td>{user.building}</td>
              <td>{user.zip || user.zipcode}</td>
              <td>{user.createdAt}</td>
              <td>{user.password}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
