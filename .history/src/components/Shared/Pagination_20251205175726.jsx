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
  const maxPage = Math.ceil(totalItems / itemsPerPage) || 1; // luôn >=1
  const current = Math.min(currentPage, maxPage);

  const startRecord = totalItems === 0 ? 0 : (current - 1) * itemsPerPage + 1;
  const endRecord   = Math.min(current * itemsPerPage, totalItems);

  const handlePrev = () => {
    if (current > 1 && !loading) onPageChange(current - 1);
  };

  const handleNext = () => {
    if (current < maxPage && !loading) onPageChange(current + 1);
  };

  if (totalItems === 0) return null;

  return (
    <div className="pagination-container">
      <button
        className="pagination-btn"
        onClick={handlePrev}
        disabled={current <= 1 || loading} // trang đầu → disable
        style={{ opacity: current <= 1 ? 0.5 : 1, cursor: current <= 1 ? "not-allowed" : "pointer" }}
      >
        ← Prev
      </button>

      <div className="pagination-info">
        <div style={{ fontWeight: "bold", fontSize: "18px" }}>
          Trang {current}
        </div>
        <div style={{ fontSize: "14px", color: "#389e0d", marginTop: "3px", fontWeight: "bold" }}>
          {startRecord}-{endRecord} / {totalItems}
        </div>
      </div>

      <button
        className="pagination-btn"
        onClick={handleNext}
        disabled={current >= maxPage || loading} // trang cuối → disable
        style={{ opacity: current >= maxPage ? 0.5 : 1, cursor: current >= maxPage ? "not-allowed" : "pointer" }}
      >
        Next →
      </button>
    </div>
  );
}
