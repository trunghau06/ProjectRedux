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
  // Tính toán
  const totalPages = Math.ceil(totalItems / itemsPerPage) || 1;
  const startRecord = (currentPage - 1) * itemsPerPage + 1;
  const endRecord = Math.min(currentPage * itemsPerPage, totalItems);

  // Handlers
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

  // Chỉ hiển thị khi ở Table View
  const tableView = document.querySelector('#tableView');
  const isTableVisible = tableView && tableView.style.display !== 'none';

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
        <div style={{ fontSize: '12px', color: '#666', marginTop: '3px' }}>
          Hiển thị {startRecord}-{endRecord} / {totalItems}
        </div>
        {hasMore && currentPage === totalPages && (
          <div style={{ fontSize: '11px', color: '#007bff', marginTop: '2px' }}>
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