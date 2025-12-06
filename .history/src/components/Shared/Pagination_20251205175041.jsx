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
  // Giới hạn currentPage theo số bản ghi thực tế
const maxPage = Math.ceil(totalItems / itemsPerPage);
const current = Math.min(currentPage, maxPage || 1);

// Tính start và end record dựa trên dữ liệu thực tế
const startRecord = totalItems === 0 ? 0 : (current - 1) * itemsPerPage + 1;
let endRecord = current * itemsPerPage;

// Nếu số record thực tế ít hơn endRecord, cập nhật
if (endRecord > totalItems) endRecord = totalItems;


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