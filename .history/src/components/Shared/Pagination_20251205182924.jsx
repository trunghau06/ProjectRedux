// Pagination.jsx
import React from "react";
import "../../styles/Shared/Pagination.css";

export default function Pagination({
  currentPage,
  totalItems,
  itemsPerPage,
  hasMore,
  loading,
  onPageChange
}) {
  const maxPage = Math.ceil(totalItems / itemsPerPage);
  const current = Math.min(currentPage, maxPage);

  // startRecord-endRecord phải dựa trên page hiện tại và totalItems
  const startRecord = totalItems === 0 ? 0 : (current - 1) * itemsPerPage + 1;
  const endRecord   = Math.min(current * itemsPerPage, totalItems);

  const handlePrev = () => {
    if (currentPage > 1 && !loading) onPageChange(currentPage - 1);
  };

  const handleNext = () => {
    if (!loading && (hasMore || endRecord < totalItems)) onPageChange(currentPage + 1);
  };

  if (totalItems === 0) return null;

  return (
    <div className="pagination-container">
      <button
        className="pagination-btn"
        onClick  ={handlePrev}
        disabled ={currentPage <= 1 || loading}
      >
        ← Prev
      </button>

      <div className="pagination-info">
        <div style={{ fontWeight: "bold", fontSize: "18px" }}>
          Trang {currentPage}
        </div>
        <div style={{ fontSize: "14px", color: "#389e0d", marginTop: "3px", fontWeight: "bold" }}>
          {startRecord}-{endRecord} / {totalItems}
        </div>
      </div>

      <button
        className="pagination-btn"
        onClick  ={handleNext}
        disabled ={loading || (!hasMore && endRecord >= totalItems)}
      >
        Next →
      </button>
    </div>
  );
}