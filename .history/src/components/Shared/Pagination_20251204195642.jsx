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
        attributeFilter: ['style', 'class'] 
      });
    }
    if (cardView) {
      observer.observe(cardView, { 
        attributes: true, 
        attributeFilter: ['style', 'class'] 
      });
    }

    const timer = setTimeout(checkVisibility, 100);

    return () => {
      observer.disconnect();
      clearTimeout(timer);
    };
  }, []);

  // --- FIX CHÍNH ---
  const itemsLoaded = Math.min(totalItems, currentPage * itemsPerPage);

  // ❌ Sai trước đây: tính theo itemsLoaded → thiếu trang
  // const totalPages = Math.ceil(itemsLoaded / itemsPerPage) || 1;

  // ✅ Đúng: totalPages phải theo tổng data đã load
  const totalPages = Math.ceil(totalItems / itemsPerPage) || 1;

  const startRecord = (currentPage - 1) * itemsPerPage + 1;
  const endRecord = Math.min(currentPage * itemsPerPage, totalItems);
  // --- END FIX ---

  const handlePrev = () => {
    if (currentPage > 1 && !loading) {
      onPageChange(currentPage - 1);
    }
  };

  const handleNext = () => {
    if (!loading && (currentPage < totalPages || hasMore)) {
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
        <div style={{ fontWeight: 'bold', fontSize: '15px' }}>
          Trang {currentPage} / {totalPages}
        </div>
        <div style={{ fontSize: '12px', color: '#389e0d', marginTop: '3px' }}>
          Hiển thị {startRecord}-{endRecord} / {totalItems}
        </div>

        {hasMore && currentPage === totalPages && (
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
