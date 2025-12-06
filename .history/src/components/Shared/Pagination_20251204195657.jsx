import React, { useEffect, useState } from "react";
import "../../styles/Shared/Pagination.css";

export default function Pagination({
  currentPage,
  totalItems,        // số record đã load
  itemsPerPage,
  hasMore,           // còn tải được hay không
  loading,
  onPageChange
}) {
  const [isTableVisible, setIsTableVisible] = useState(true);

  // Detect table/card visible
  useEffect(() => {
    const checkVisibility = () => {
      const tableView = document.querySelector("#tableView");
      const cardView = document.querySelector("#cardView");

      if (tableView && cardView) {
        const tableVisible =
          window.getComputedStyle(tableView).display !== "none";
        const cardVisible =
          window.getComputedStyle(cardView).display !== "none";

        setIsTableVisible(tableVisible && !cardVisible);
      }
    };

    checkVisibility();

    const observer = new MutationObserver(checkVisibility);
    const tableView = document.querySelector("#tableView");
    const cardView = document.querySelector("#cardView");

    if (tableView) observer.observe(tableView, { attributes: true });
    if (cardView) observer.observe(cardView, { attributes: true });

    const timer = setTimeout(checkVisibility, 100);

    return () => {
      observer.disconnect();
      clearTimeout(timer);
    };
  }, []);

  // ================================================
  // 🔥 FIX LOGIC PHÂN TRANG
  // ================================================

  // Số record đã load
  const itemsLoaded = totalItems;

  // Số trang *hiển thị được* dựa trên số record đã load
  const shownPages = Math.ceil(itemsLoaded / itemsPerPage) || 1;

  // ❗ totalPages để *kiểm tra nút Next*
  // Nếu còn hasMore => cho phép sang trang vô hạn
  const totalPages = hasMore ? Infinity : shownPages;

  // ❗ totalPages hiển thị ra UI
  const displayTotalPages = shownPages;

  // Dải số record hiển thị
  const startRecord = (currentPage - 1) * itemsPerPage + 1;
  const endRecord = Math.min(currentPage * itemsPerPage, itemsLoaded);

  const handlePrev = () => {
    if (currentPage > 1 && !loading) {
      onPageChange(currentPage - 1);
    }
  };

  const handleNext = () => {
    if (!loading && (hasMore || currentPage < shownPages)) {
      onPageChange(currentPage + 1);
    }
  };

  if (!isTableVisible || totalItems === 0) return null;

  return (
    <div className="pagination-container">
      <button
        className="pagination-btn"
        onClick={handlePrev}
        disabled={currentPage <= 1 || loading}
        title={`Xem trang ${currentPage - 1}`}
      >
        ← Prev
      </button>

      <div className="pagination-info">
        <div style={{ fontWeight: "bold", fontSize: "15px" }}>
          Trang {currentPage} / {displayTotalPages}
        </div>

        <div
          style={{
            fontSize: "12px",
            color: "#389e0d",
            marginTop: "3px",
          }}
        >
          Hiển thị {startRecord}-{endRecord} / {itemsLoaded}
        </div>

        {hasMore && (
          <div
            style={{
              fontSize: "11px",
              color: "#389e0d",
              marginTop: "2px",
            }}
          >
            ⟳ Có thể tải thêm
          </div>
        )}
      </div>

      <button
        className="pagination-btn"
        onClick={handleNext}
        disabled={loading}
        title={`Xem trang ${currentPage + 1}`}
      >
        Next →
      </button>
    </div>
  );
}
