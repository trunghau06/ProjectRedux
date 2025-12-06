import React, { useEffect, useState } from "react";
import "../../styles/Shared/Pagination.css";

export default function Pagination({
  currentPage,
  totalItems,        // = data.length thật
  itemsPerPage,
  hasMore,
  loading,
  onPageChange
}) {
  const [isTableVisible, setIsTableVisible] = useState(true);

  useEffect(() => {
    const checkVisibility = () => {
      const tableView = document.querySelector("#tableView");
      const cardView = document.querySelector("#cardView");

      if (tableView && cardView) {
        const tableShown = window.getComputedStyle(tableView).display !== "none";
        const cardShown = window.getComputedStyle(cardView).display !== "none";
        setIsTableVisible(tableShown && !cardShown);
      }
    };

    checkVisibility();
    const timer = setTimeout(checkVisibility, 100);
    return () => clearTimeout(timer);
  }, []);

  // ---------------------- LOGIC CHUẨN – KHÔNG ĐOÁN ----------------------
  const totalPages = Math.max(1, Math.ceil(totalItems / itemsPerPage));

  const startRecord =
    totalItems === 0 ? 0 : (currentPage - 1) * itemsPerPage + 1;

  const endRecord = Math.min(currentPage * itemsPerPage, totalItems);
  // ----------------------------------------------------------------------

  const handlePrev = () => {
    if (currentPage > 1 && !loading) onPageChange(currentPage - 1);
  };

  const handleNext = () => {
    if (!loading && (hasMore || currentPage < totalPages))
      onPageChange(currentPage + 1);
  };

  if (!isTableVisible || totalItems === 0) return null;

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
          Trang {currentPage} / {totalPages}
        </div>

        <div style={{ fontSize: "12px", color: "#389e0d", marginTop: "3px" }}>
          Hiển thị {startRecord}-{endRecord} / {totalItems}
        </div>
      </div>

      <button
        className="pagination-btn"
        onClick={handleNext}
        disabled={loading || (!hasMore && currentPage >= totalPages)}
      >
        Next →
      </button>
    </div>
  );
}
