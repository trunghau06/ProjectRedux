import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loadUsers } from "../../features/users/userThunks";
import DataTable from "./DataTable";
import DataCard from "./DataCard";

export default function DataView() {
  const dispatch = useDispatch();
  const { data, loading } = useSelector(state => state.users);

  useEffect(() => {
    dispatch(loadUsers({ page: 1, limit: 10 }));
  }, [dispatch]);

  return (
    <div id="cardsContainer" className="cards-container" style={{ display: data.length ? 'block' : 'none' }}>
      <div id="cardsSpacer" className="cards-spacer">
        <div id="cardsContent" className="cards-content">
          
          {/* Desktop - Table */}
          <div id="tableView" className="view-wrapper">
            <DataTable />
          </div>

          {/* Mobile - Card */}
          <div id="cardView" className="view-wrapper card-list-grid">
            <DataCard />
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