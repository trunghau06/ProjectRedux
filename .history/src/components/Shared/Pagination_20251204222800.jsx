import React from "react";
import "../../styles/Shared/Pagination.css";

export default function Pagination({
  currentPage,
  itemsPerPage,
  loading,
  hasMore,
  onPageChange,
}) {
  const startRecord = (currentPage - 1) * itemsPerPage + 1;
  const endRecord = currentPage * itemsPerPage;

  return (
    <div className="pagination-container">
      <button
        className="pagination-btn"
        onClick={() => currentPage > 1 && !loading && onPageChange(currentPage - 1)}
        disabled={currentPage <= 1 || loading}
      >
        ← Prev
      </button>

      <div className="pagination-info">
        <div style={{ fontWeight: "bold", fontSize: "15px" }}>
          Trang {currentPage}
        </div>
        <div style={{ fontSize: "12px", color: "#389e0d", marginTop: "3px" }}>
          {startRecord}-{endRecord}
        </div>
      </div>

      <button
        className="pagination-btn"
        onClick={() => !loading && hasMore && onPageChange(currentPage + 1)}
        disabled={loading || !hasMore}
      >
        Next →
      </button>
    </div>
  );
}
