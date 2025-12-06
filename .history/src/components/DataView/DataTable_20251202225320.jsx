import React            from "react";
import { useSelector }  from "react-redux";
import { lightenColor } from "../../utils/colorUtils"; 
import EditDeleteFrame  from "../ActionButtons/EditDeleteFrame";
import GenderBadge      from "../Shared/GenderBadge";
import SortDropdownHeader from "./SortDropdownHeader"; // IMPORT MỚI
import "../../styles/DataView/DataTable.css";

export default function DataTable() {
    const users = useSelector((state) => 
        state.users.data) || [];        // Lấy dữ liệu record  từ Redux store

    return (
        <div id="tableView" className="view-wrapper">
        <table className="data-table">
            <thead>
            <tr className="header-row">
                <th></th> 
                {/* Sử dụng SortDropdownHeader cho các cột cần sắp xếp */}
                <SortDropdownHeader label="ID" sortKey="id" />
                <th>Avatar</th> {/* Cột Avatar không sắp xếp */}
                <SortDropdownHeader label="Name" sortKey="name" />
                <SortDropdownHeader label="Company" sortKey="company" />
                <SortDropdownHeader label="Genre" sortKey="genre" />
                <SortDropdownHeader label="Email" sortKey="email" />
                <SortDropdownHeader label="Phone" sortKey="phone" />
                <SortDropdownHeader label="DOB" sortKey="dob" />
                <SortDropdownHeader label="Color" sortKey="color" />
                <SortDropdownHeader label="Timezone" sortKey="timezone" />
                <SortDropdownHeader label="Music" sortKey="music" />
                <SortDropdownHeader label="City" sortKey="city" />
                <SortDropdownHeader label="State" sortKey="state" />
                <SortDropdownHeader label="Country" sortKey="country" />
                <SortDropdownHeader label="Address" sortKey="address" />
                <SortDropdownHeader label="Street" sortKey="street" />
                <SortDropdownHeader label="Building" sortKey="building" />
                <SortDropdownHeader label="ZIP" sortKey="zip" />
                <SortDropdownHeader label="Password" sortKey="password" />
                <SortDropdownHeader label="Desc" sortKey="desc" />
                <SortDropdownHeader label="Fincode" sortKey="fincode" />
                <SortDropdownHeader label="IP" sortKey="ip" />
                <SortDropdownHeader label="Job" sortKey="job" />
                <SortDropdownHeader label="JD" sortKey="jd" />
                <SortDropdownHeader label="TypeOfJob" sortKey="typeofjob" />
                <SortDropdownHeader label="CreatedAt" sortKey="createdAt" />
            </tr>
            </thead>
            <tbody>
            {users.map((user) => (      // duyệt danh sách user
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
                <td>{user.name      || "N/A"}</td>
                <td>{user.company   || "N/A"}</td>
                <td>
                    <GenderBadge genre={user.genre} />
                </td>
                <td>{user.email     || "N/A"}</td>
                <td>{user.phone     || "N/A"}</td>
                <td>{user.dob       || "N/A"}</td>
                <td>{user.color     || "N/A"}</td>
                <td>{user.timezone  || "N/A"}</td>
                <td>{user.music     || "N/A"}</td>
                <td>{user.city      || "N/A"}</td>
                <td>{user.state     || "N/A"}</td>
                <td>{user.country   || "N/A"}</td>
                <td>{user.address   || "N/A"}</td>
                <td>{user.street    || "N/A"}</td>
                <td>{user.building  || "N/A"}</td>
                <td>{user.zip       || user.zipcode || "N/A"}</td>
                <td>{user.password  || "N/A"}</td>
                <td>{user.desc      || "N/A"}</td>
                <td>{user.fincode   || "N/A"}</td>
                <td>{user.ip        || "N/A"}</td>
                <td>{user.job       || "N/A"}</td>
                <td>{user.jd        || "N/A"}</td>
                <td>{user.typeofjob || "N/A"}</td>
                <td>{user.createdAt || "N/A"}</td>
                </tr>
            ))}
            </tbody>
        </table>
        </div>
    );
}