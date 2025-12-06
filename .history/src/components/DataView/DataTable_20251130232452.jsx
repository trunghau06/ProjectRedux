import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loadUsers } from "../../features/users/userThunks.js";
import '../../styles/DataView/DataTable.css';

export default function DataTable() {
  const dispatch = useDispatch();
  const { data, loading, page, limit } = useSelector(state => state.users);

  useEffect(() => {
    dispatch(loadUsers({ page, limit }));
  }, [dispatch, page, limit]);

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
            <th>Address</th>
            <th>Street</th>
            <th>Building</th>
            <th>ZIP</th>
            <th>CreatedAt</th>
            <th>Password</th>
          </tr>
        </thead>
        <tbody>
          {loading ? (
            <tr><td colSpan="20">Loading...</td></tr>
          ) : (
            data.map(user => (
              <tr key={user.id} style={{ backgroundColor: user.color || "#fff" }}>
                <td>
                  {/* placeholder cho button edit/delete sau này */}
                </td>
                <td>{user.id}</td>
                <td><img src={user.avatar} alt={user.name} className="avatar-small"/></td>
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
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}
