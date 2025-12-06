import React from "react";
import { useSelector } from "react-redux";
import { lightenColor } from "../../utils/colorUtils"; 
import EditDeleteFrame from "../ActionButtons/EditDeleteFrame";
import "../../styles/DataView/DataTable.css";

export default function DataTable() {
    const users = useSelector((state) => 
        state.users.data) || [];        // duyệt danh sách user

    return (
        <div id="tableView" className="view-wrapper">
        <table className="data-table">
            <thead>
            <tr className="header-row">
                <th></th>
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
                <th>Country</th>
                <th>Address</th>
                <th>Street</th>
                <th>Building</th>
                <th>ZIP</th>
                <th>Password</th>
                <th>Desc</th>
                <th>Fincode</th>
                <th>IP</th>
                <th>Job</th>
                <th>JD</th>
                <th>TypeOfJob</th>
                <th>CreatedAt</th>
            </tr>
            </thead>
            <tbody>
            {users.map((user) => (
                <tr 
                key={user.id} 
                style={{ backgroundColor: lightenColor(user.color || "#FFFFFF", 70) }}
                >

                <td style={{ textAlign: 'center' }}>
                    <EditDeleteFrame userId={user.id} userData={user} />
                </td>
                
                <td>{user.id}</td>
                <td>
                    <img
                    src={user.avatar || "https://via.placeholder.com/40"}
                    alt={user.name}
                    className="avatar-small"
                    />
                </td>
                <td>{user.name      || "N/A"}</td>
                <td>{user.company   || "N/A"}</td>
                <td>{user.genre     || "N/A"}</td>
                <td>{user.email     || "N/A"}</td>
                <td>{user.phone     || "N/A"}</td>
                <td>{user.dob       || "N/A"}</td>
                <td>{user.color     || "N/A"}</td>
                <td>{user.timezone  || "N/A"}</td>
                <td>{user.music     || "N/A"}</td>
                <td>{user.city      || "N/A"}</td>
                <td>{user.state     || "N/A"}</td>
                <td>{user.country   || "N/A"}</td>
                <td>{user.address   || "N/A"}</td>
                <td>{user.street    || "N/A"}</td>
                <td>{user.building  || "N/A"}</td>
                <td>{user.zip       || user.zipcode || "N/A"}</td>
                <td>{user.password  || "N/A"}</td>
                <td>{user.desc      || "N/A"}</td>
                <td>{user.fincode   || "N/A"}</td>
                <td>{user.ip        || "N/A"}</td>
                <td>{user.job       || "N/A"}</td>
                <td>{user.jd        || "N/A"}</td>
                <td>{user.typeofjob || "N/A"}</td>
                <td>{user.createdAt || "N/A"}</td>
                </tr>
            ))}
            </tbody>
        </table>
        </div>
    );
}