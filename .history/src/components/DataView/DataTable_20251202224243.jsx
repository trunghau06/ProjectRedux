import React            from "react";
import { useSelector }  from "react-redux";
import { lightenColor } from "../../utils/colorUtils"; 
import EditDeleteFrame  from "../ActionButtons/EditDeleteFrame";
import GenderBadge      from "../Shared/GenderBadge";
import SortableHeader   from "../Sort/SortField"; 
import "../../styles/DataView/DataTable.css";
import SortField from "../Sort/SortField";

export default function DataTable() {
    const users = useSelector((state) => 
        state.users.data) || [];        // Lấy dữ liệu record  từ Redux store

    return (
        <div id="tableView" className="view-wrapper">
        <table className="data-table">
            <thead>
            <tr className="header-row">
                <th></th> {/* Cột Action không sắp xếp */}
                {/* Thay thế <th> cũ bằng SortableHeader và truyền sortKey tương ứng */}
                <SortField label="ID" sortKey="id" />
                <SortField label="Avatar" sortKey="avatar" />
                <SortField label="Name" sortKey="name" />
                <SortField label="Company" sortKey="company" />
                <SortField label="Genre" sortKey="genre" />
                <SortField label="Email" sortKey="email" />
                <SortField label="Phone" sortKey="phone" />
                <SortField label="DOB" sortKey="dob" />
                <SortField label="Color" sortKey="color" />
                <SortField label="Timezone" sortKey="timezone" />
                <SortField label="Music" sortKey="music" />
                <SortField label="City" sortKey="city" />
                <SortField label="State" sortKey="state" />
                <SortField label="Country" sortKey="country" />
                <SortField label="Address" sortKey="address" />
                <SortField label="Street" sortKey="street" />
                <SortField label="Building" sortKey="building" />
                <SortField label="ZIP" sortKey="zip" />
                <SortField label="Password" sortKey="password" />
                <SortField label="Desc" sortKey="desc" />
                <SortField label="Fincode" sortKey="fincode" />
                <SortField label="IP" sortKey="ip" />
                <SortField label="Job" sortKey="job" />
                <SortField label="JD" sortKey="jd" />
                <SortField label="TypeOfJob" sortKey="typeofjob" />
                <SortableHeader label="CreatedAt" sortKey="createdAt" />
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