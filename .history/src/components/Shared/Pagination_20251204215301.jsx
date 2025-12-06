import React, { useEffect, useState } from "react";
import "../../styles/Shared/Pagination.css";

export default function Pagination({ 
  currentPage, 
  totalItems, 
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


  // ------------------- 🔧 LOGIC TÍNH SỐ TRANG -------------------
  // totalItems là số bản ghi *thực tế đã load* về client (data.length)
  // Tổng trang hiển thị chỉ dựa trên dữ liệu đã load: 
  // → khi mới load trang 1 (ví dụ totalItems = itemsPerPage) => totalPages = 1 (không hiển thị 1/2)
  // Khi người dùng đã load thêm trang thì totalPages sẽ tăng theo totalItems.
  const totalPages = Math.max(1, Math.ceil(totalItems / itemsPerPage));

  const startRecord = totalItems === 0 ? 0 : (currentPage - 1) * itemsPerPage + 1;
  const endRecord = Math.min(currentPage * itemsPerPage, totalItems);
  // -----------------------------------------------------------


  const handlePrev = () => {
    if (currentPage > 1 && !loading) {
      onPageChange(currentPage - 1);
    }
  };

  const handleNext = () => {
    // Cho phép Next khi:
    // - đang còn khả năng tải thêm (hasMore === true) OR
    // - currentPage < totalPages (đã load sẵn trang tiếp theo)
    if (!loading && (hasMore || currentPage < totalPages)) {
      onPageChange(currentPage + 1);
    }
  };

  // KHÔNG hiển thị pagination khi table không visible hoặc không có bản ghi
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
        <div style={{ fontWeight: 'bold', fontSize: '15px' }}>
          Trang {currentPage} / {totalPages}
        </div>
        <div style={{ fontSize: '12px', color: '#389e0d', marginTop: '3px' }}>
          Hiển thị {startRecord}-{endRecord} / {hasMore ? `${totalItems}+` : totalItems}
        </div>

        {hasMore && currentPage >= totalPages && (
          <div style={{ fontSize: '11px', color: '#389e0d', marginTop: '2px' }}>
            ⟳ Có thể tải thêm
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
