import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loadUsers } from "../../features/users/userThunks";
import DataTable from "./DataTable";
import DataCard from "./DataCard";

export default function DataView() {
  const dispatch = useDispatch();
  const { data, loading } = useSelector(state => state.users);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

  useEffect(() => {
    dispatch(loadUsers({ page: 1, limit: 10 }));
  }, [dispatch]);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 768);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  if (!data.length && !loading) return null;

  return (
    <div id="cardsContainer" className="cards-container">
      <div id="cardsSpacer" className="cards-spacer">
        <div id="cardsContent" className="cards-content">
          
          {/* Desktop - Table */}
          {!isMobile ? (
            <div id="tableView" className="view-wrapper">
              <DataTable />
            </div>
          ) : (
            /* Mobile - Card */
            <div id="cardView" className="view-wrapper card-list-grid">
              <DataCard />
            </div>
          )}

          {/* Loading */}
          {loading && (
            <div id="loadingMore" className="loading-more">
              <div>Đang tải dữ liệu...</div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}