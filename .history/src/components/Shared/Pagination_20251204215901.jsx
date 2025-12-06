import React, { useEffect, useState } from "react";
import "../../styles/Shared/Pagination.css";

export default function Pagination({
  currentPage,
  totalItems,    // số record đã load về client (data.length)
  itemsPerPage,
  hasMore,
  loading,
  onPageChange
}) {
  const [isTableVisible, setIsTableVisible] = useState(true);

  useEffect(() => {
    const checkVisibility = () => {
      const tableView = document.querySelector('#tableView');
      const cardView = document.querySelector('#cardView');

      if (tableView && cardView) {
        const tableStyle = window.getComputedStyle(tableView);
        const cardStyle = window.getComputedStyle(cardView);

        const isTableShown =
          tableStyle.display !== 'none' &&
          tableStyle.visibility !== 'hidden' &&
          tableStyle.opacity !== '0';

        const isCardShown =
          cardStyle.display !== 'none' &&
          cardStyle.visibility !== 'hidden' &&
          cardStyle.opacity !== '0';

        // chỉ hiển thị khi table hiện và card không hiện
        setIsTableVisible(isTableShown && !isCardShown);
      }
    };

    checkVisibility();

    const observer = new MutationObserver(checkVisibility);
    const tableView = document.querySelector('#tableView');
    const cardView = document.querySelector('#cardView');

    if (tableView) {
      observer.observe(tableView, { attributes: true, attributeFilter: ['style', 'class'] });
    }
    if (cardView) {
      observer.observe(cardView, { attributes: true, attributeFilter: ['style', 'class'] });
    }

    const timer = setTimeout(checkVisibility, 100);

    return () => {
      observer.disconnect();
      clearTimeout(timer);
    };
  }, []);

  // ------------------- LOGIC HIỂN THỊ TỔNG & SỐ TRANG -------------------
  // Nếu đã biết tổng (hasMore === false) => dùng totalItems thật.
  // Nếu chưa biết tổng (hasMore === true) => hiển thị tổng tạm theo trang hiện tại
  //   displayedTotal = currentPage * itemsPerPage (không vượt quá totalItems nếu totalItems < ...)
  const displayedTotal = hasMore
    ? Math.min(totalItems, currentPage * itemsPerPage)
    : totalItems;

  const totalPages = Math.max(1, Math.ceil(displayedTotal / itemsPerPage));

  // start/end record bảo đảm không vượt quá displayedTotal / totalItems
  let startRecord = displayedTotal === 0 ? 0 : (currentPage - 1) * itemsPerPage + 1;
  if (startRecord > displayedTotal) startRecord = Math.max(1, displayedTotal - (displayedTotal % itemsPerPage) + 1);

  const endRecord = Math.min(currentPage * itemsPerPage, displayedTotal);
  // ------------------------------------------------------------------

  const handlePrev = () => {
    if (currentPage > 1 && !loading) {
      onPageChange(currentPage - 1);
    }
  };

  const handleNext = () => {
    // Next active nếu:
    // - còn khả năng tải thêm (hasMore === true) OR
    // - đã load sẵn trang tiếp theo (currentPage < totalPages)
    if (!loading && (hasMore || currentPage < totalPages)) {
      onPageChange(currentPage + 1);
    }
  };

  // Không render nếu không phải table hoặc không có bản ghi
  if (!isTableVisible || displayedTotal === 0) return null;

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
        <div style={{ fontWeight: 'bold', fontSize: '15px' }}>
          Trang {currentPage} / {totalPages}
        </div>

        <div style={{ fontSize: '12px', color: '#389e0d', marginTop: '3px' }}>
          Hiển thị {startRecord}-{endRecord} / {displayedTotal}
        </div>

        {hasMore && (
          <div style={{ fontSize: '11px', color: '#389e0d', marginTop: '4px' }}>
            ⟳ Có thể tải thêm (đã tải: {totalItems})
          </div>
        )}
      </div>

      <button
        className="pagination-btn"
        onClick={handleNext}
        disabled={loading || (!hasMore && currentPage >= totalPages)}
        title={`Xem trang ${currentPage + 1}`}
      >
        Next →
      </button>
    </div>
  );
}
