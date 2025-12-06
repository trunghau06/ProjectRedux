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
          tableStyle.display !== "none" && 
          tableStyle.visibility !== "hidden" &&
          tableStyle.opacity !== "0";
          
        const isCardShown = 
          cardStyle.display !== "none" && 
          cardStyle.visibility !== "hidden" &&
          cardStyle.opacity !== "0";
        
        setIsTableVisible(isTableShown && !isCardShown);
      }
    };

    checkVisibility();

    const observer = new MutationObserver(checkVisibility);
    const tableView = document.querySelector('#tableView');
    const cardView = document.querySelector('#cardView');

    if (tableView) {
      observer.observe(tableView, { 
        attributes: true, 
        attributeFilter: ["style", "class"] 
      });
    }
    if (cardView) {
      observer.observe(cardView, { 
        attributes: true, 
        attributeFilter: ["style", "class"] 
      });
    }

    const timer = setTimeout(checkVisibility, 100);

    return () => {
      observer.disconnect();
      clearTimeout(timer);
    };
  }, []);

  // -----------------------------
  //    ⚡ FIX CHÍNH TẠI ĐÂY ⚡
  // -----------------------------

  // Tổng số trang dựa TRỰC TIẾP vào tổng items thật
  const totalPages = Math.max(1, Math.ceil(totalItems / itemsPerPage));

  // Xác định record đang hiển thị
  const startRecord = (currentPage - 1) * itemsPerPage + 1;
  const endRecord = Math.min(currentPage * itemsPerPage, totalItems);

  // -----------------------------
  //       END FIX
  // -----------------------------

  const handlePrev = () => {
    if (currentPage > 1 && !loading) {
      onPageChange(currentPage - 1);
    }
  };

  const handleNext = () => {
    if (!loading && currentPage < totalPages) {
      onPageChange(currentPage + 1);
    }
  };

  if (!isTableVisible || totalItems === 0) return null;

  return (
    <div className="pagination-container">
      {/* PREV BUTTON */}
      <button 
        className="pagination-btn"
        onClick={handlePrev}
        disabled={currentPage <= 1 || loading}
        title={`Xem trang ${currentPage - 1}`}
      >
        ← Prev
      </button>
      
      {/* PAGE INFO */}
      <div className="pagination-info">
        <div style={{ fontWeight: 'bold', fontSize: '15px' }}>
          Trang {currentPage} / {totalPages}
        </div>
        <div style={{ fontSize: '12px', color: '#389e0d', marginTop: '3px' }}>
          Hiển thị {startRecord}-{endRecord} / {totalItems}
        </div>

        {/* Chỉ báo còn data để scroll */}
        {hasMore && currentPage === totalPages && (
          <div style={{ fontSize: '11px', color: '#389e0d', marginTop: '2px' }}>
            ⟳ Có thể tải thêm
          </div>
        )}
      </div>
      
      {/* NEXT BUTTON */}
      <button 
        className="pagination-btn"
        onClick={handleNext}
        disabled={loading || currentPage >= totalPages}
        title={`Xem trang ${currentPage + 1}`}
      >
        Next →
      </button>
    </div>
  );
}
