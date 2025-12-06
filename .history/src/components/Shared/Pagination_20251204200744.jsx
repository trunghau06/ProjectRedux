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

  const itemsLoaded = totalItems;
  
  // Tính tổng số trang dựa trên dữ liệu đã tải
  const totalPages = Math.ceil(itemsLoaded / itemsPerPage);
  const actualTotalPages = totalPages === 0 ? 1 : totalPages;
  
  // Giới hạn currentPage hiển thị để tránh nhảy số
  const currentDisplayedPage = Math.min(currentPage, actualTotalPages);

  const startRecord = (currentDisplayedPage - 1) * itemsPerPage + 1;
  const endRecord = Math.min(currentDisplayedPage * itemsPerPage, itemsLoaded);

  const handlePrev = () => {
    if (currentDisplayedPage > 1 && !loading) {
      onPageChange(currentDisplayedPage - 1);
    }
  };

  const handleNext = () => {
    // Cho phép Next nếu chưa đạt tới trang cuối của dữ liệu đã tải HOẶC còn dữ liệu để tải thêm (hasMore)
    if (!loading && (currentDisplayedPage < actualTotalPages || hasMore)) {
      onPageChange(currentDisplayedPage + 1);
    }
  };

  if (!isTableVisible || totalItems === 0) return null;

  return (
    <div className="pagination-container">
      <button 
        className="pagination-btn"
        onClick={handlePrev}
        disabled={currentDisplayedPage <= 1 || loading}
        title={`Xem trang ${currentDisplayedPage - 1}`}
      >
        ← Prev
      </button>
      
      <div className="pagination-info">
        <div style={{ fontWeight: 'bold', fontSize: '15px' }}>
          Trang {currentDisplayedPage} / {actualTotalPages}
        </div>
        <div style={{ fontSize: '12px', color: '#389e0d', marginTop: '3px' }}>
          Hiển thị {startRecord}-{endRecord} / {itemsLoaded}
        </div>

        {hasMore && currentDisplayedPage === actualTotalPages && (
          <div style={{ fontSize: '11px', color: '#389e0d', marginTop: '2px' }}>
            ⟳ Có thể tải thêm
          </div>
        )}
      </div>
      
      <button 
        className="pagination-btn"
        onClick={handleNext}
        disabled={loading || (!hasMore && currentDisplayedPage >= actualTotalPages)}
        title={`Xem trang ${currentDisplayedPage + 1}`}
      >
        Next →
      </button>
    </div>
  );
}