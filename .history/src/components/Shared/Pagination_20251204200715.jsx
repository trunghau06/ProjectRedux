import React, { useEffect, useState } from "react";
import "../../styles/Shared/Pagination.css";

export default function Pagination({ 
  currentPage, 
  totalItems, // Đây phải là state.users.data.length (tổng số item đã load)
  itemsPerPage, 
  hasMore, 
  loading,
  onPageChange 
}) {
  const [isTableVisible, setIsTableVisible] = useState(true);

  // ... (useEffect checkVisibility giữ nguyên) ...

  // --- 🔥 SỬA FIX TÍNH TOÁN VÀ SỐ TRANG CHÍNH XÁC ---
  
  // 1. Số lượng items đã tải (itemsLoaded chính là totalItems truyền vào)
  const itemsLoaded = totalItems; 

  // 2. Tổng số trang dựa trên dữ liệu đã tải (totalPages không thể nhỏ hơn 1)
  const totalPages = Math.ceil(itemsLoaded / itemsPerPage);
  
  // Tổng số trang hiển thị (phải luôn ít nhất là 1, ngay cả khi itemsLoaded = 0)
  const actualTotalPages = totalPages === 0 ? 1 : totalPages;
  
  // 3. Giới hạn currentPage tối đa là actualTotalPages (để tránh nhảy số)
  const currentDisplayedPage = Math.min(currentPage, actualTotalPages);

  // 4. Tính Record (Dùng currentDisplayedPage đã giới hạn)
  const startRecord = (currentDisplayedPage - 1) * itemsPerPage + 1;
  const endRecord = Math.min(currentDisplayedPage * itemsPerPage, itemsLoaded);
  // --- 🔥 END FIX ---

  const handlePrev = () => {
    if (currentDisplayedPage > 1 && !loading) {
      onPageChange(currentDisplayedPage - 1);
    }
  };

  const handleNext = () => {
    // Cho phép Next nếu chưa đạt tới trang cuối của dữ liệu đã tải HOẶC còn dữ liệu trên server (hasMore)
    if (!loading && (currentDisplayedPage < actualTotalPages || hasMore)) {
      onPageChange(currentDisplayedPage + 1);
    }
  };

  if (!isTableVisible || totalItems === 0) return null;
  
  // --- GIAO DIỆN ---
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