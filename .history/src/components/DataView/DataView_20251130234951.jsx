import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loadUsers } from "../../features/users/userThunks";
import DataTable from "./DataTable";
import DataCard from "./DataCard";

export default function DataView() {
  const dispatch = useDispatch();
  const { data, loading } = useSelector(state => state.users);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

  // Load dữ liệu lần đầu
  useEffect(() => {
    dispatch(loadUsers({ page: 1, limit: 10 }));
  }, [dispatch]);

  // Listen resize để đổi Table/Card
  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 768);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div id="cardsContainer" className="cards-container" style={{ display: data.length ? 'block' : 'none' }}>
      <div id="cardsSpacer" className="cards-spacer">
        <div id="cardsContent" className="cards-content">
          
          {/* Table */}
          <div id="tableView" className="view-wrapper" style={{ display: isMobile ? 'none' : 'block' }}>
            <DataTable data={data} />
          </div>

          {/* Card */}
          <div id="cardView" className="view-wrapper card-list-grid" style={{ display: isMobile ? 'flex' : 'none' }}>
            <DataCard data={data} />
          </div>

          {/* Loading */}
          {loading && (
            <div id="loadingMore" className="loading-more" style={{ display: 'block' }}>
              <div>Đang tải dữ liệu...</div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
