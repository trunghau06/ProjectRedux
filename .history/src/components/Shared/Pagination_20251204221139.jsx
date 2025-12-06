import React from "react";
import "../../styles/Shared/Pagination.css";

export default function Pagination({
  currentPage,
  totalItems,
  itemsPerPage,
  loading,
  onPageChange
}) {

  const totalPages = Math.max(1, Math.ceil(totalItems / itemsPerPage));

  const startRecord =
    totalItems === 0 ? 0 : (currentPage - 1) * itemsPerPage + 1;

  const endRecord = Math.min(currentPage * itemsPerPage, totalItems);

  const handlePrev = () => {
    if (currentPage > 1 && !loading) onPageChange(currentPage - 1);
  };

  const handleNext = () => {
    if (!loading && currentPage < totalPages)
      onPageChange(currentPage + 1);
  };

  if (totalItems === 0) return null;

  return (
    <div className="pagination-container">

      <button
        className="pagination-btn"
        onClick={handlePrev}
        disabled={currentPage <= 1 || loading}
      >
        ← Prev
      </button>

      <div className="pagination-info">
        <div style={{ fontWeight: "bold", fontSize: "15px" }}>
          {currentPage} / {totalPages}
        </div>

        <div style={{ fontSize: "12px", color: "#389e0d", marginTop: "3px" }}>
          {startRecord}-{endRecord} / {totalItems}
        </div>
      </div>

      <button
        className="pagination-btn"
        onClick={handleNext}
        disabled={loading || currentPage >= totalPages}
      >
        Next →
      </button>

    </div>
  );
}
