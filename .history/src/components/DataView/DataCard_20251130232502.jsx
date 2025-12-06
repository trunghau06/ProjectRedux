import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loadUsers } from "../../features/users/userThunks.js";
import '../../styles/DataView/DataCard.css';

export default function DataCard() {
  const dispatch = useDispatch();
  const { data, loading, page, limit } = useSelector(state => state.users);

  useEffect(() => {
    dispatch(loadUsers({ page, limit }));
  }, [dispatch, page, limit]);

  if (loading) return <div>Loading cards...</div>;

  return (
    <div className="cards-container">
      {data.map(user => (
        <div className="card" key={user.id} style={{ backgroundColor: user.color || "#fff" }}>
          <div className="card-header">
            <img src={user.avatar} alt={user.name} className="avatar"/>
            <div className="card-info">
              <div className="card-name">{user.name}</div>
              <div className="card-company">{user.company}</div>
            </div>
            <span className={`card-badge ${user.genre?.toLowerCase() === "male" ? "badge-male" : "badge-female"}`}>
              {user.genre}
            </span>
          </div>
          <div className="card-body">
            <div><strong>ID:</strong> {user.id}</div>
            <div><strong>Email:</strong> {user.email}</div>
            <div><strong>Phone:</strong> {user.phone}</div>
            <div><strong>DOB:</strong> {user.dob}</div>
            <div><strong>City:</strong> {user.city}</div>
            <div><strong>State:</strong> {user.state}</div>
          </div>
        </div>
      ))}
    </div>
  );
}
