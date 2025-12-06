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
  // Tính số trang tối đa, ít nhất là 1 để Prev/Next không bị sai
  const maxPage = Math.max(Math.ceil(totalItems / itemsPerPage), 1);

  // Chỉ số trang hiện tại không vượt quá maxPage
  const current = Math.min(currentPage, maxPage);

  // Tính bản ghi hiện tại đang hiển thị
  const startRecord = totalItems === 0 ? 0 : (current - 1) * itemsPerPage + 1;
  const endRecord = Math.min(current * itemsPerPage, totalItems);

  // Prev chỉ click được nếu không ở trang đầu và không đang loading
  const handlePrev = () => {
    if (current > 1 && !loading) onPageChange(current - 1);
  };

  // Next chỉ click được nếu không ở trang cuối và không đang loading
  const handleNext = () => {
    if (current < maxPage && !loading) onPageChange(current + 1);
  };

  // Nếu không có dữ liệu, ẩn pagination
  if (totalItems === 0) return null;

  return (
    <div className="pagination-container">
      <button
        className="pagination-btn"
        onClick={handlePrev}
        disabled={current <= 1 || loading} // Trang đầu Prev xám
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
        disabled={current >= maxPage || loading} // Trang cuối Next xám
      >
        Next →
      </button>
    </div>
  );
}
