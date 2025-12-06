import React            from "react";
import { useSelector }  from "react-redux";
import { lightenColor } from "../../utils/colorUtils"; 
import EditDeleteFrame  from "../ActionButtons/EditDeleteFrame";
import GenderBadge      from "../Shared/GenderBadge";
import SortableHeader   from "../Sort/SortField"; 
import "../../styles/DataView/DataTable.css";

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
                <So label="ID" sortKey="id" />
                <SortableHeader label="Avatar" sortKey="avatar" />
                <SortableHeader label="Name" sortKey="name" />
                <SortableHeader label="Company" sortKey="company" />
                <SortableHeader label="Genre" sortKey="genre" />
                <SortableHeader label="Email" sortKey="email" />
                <SortableHeader label="Phone" sortKey="phone" />
                <SortableHeader label="DOB" sortKey="dob" />
                <SortableHeader label="Color" sortKey="color" />
                <SortableHeader label="Timezone" sortKey="timezone" />
                <SortableHeader label="Music" sortKey="music" />
                <SortableHeader label="City" sortKey="city" />
                <SortableHeader label="State" sortKey="state" />
                <SortableHeader label="Country" sortKey="country" />
                <SortableHeader label="Address" sortKey="address" />
                <SortableHeader label="Street" sortKey="street" />
                <SortableHeader label="Building" sortKey="building" />
                <SortableHeader label="ZIP" sortKey="zip" />
                <SortableHeader label="Password" sortKey="password" />
                <SortableHeader label="Desc" sortKey="desc" />
                <SortableHeader label="Fincode" sortKey="fincode" />
                <SortableHeader label="IP" sortKey="ip" />
                <SortableHeader label="Job" sortKey="job" />
                <SortableHeader label="JD" sortKey="jd" />
                <SortableHeader label="TypeOfJob" sortKey="typeofjob" />
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