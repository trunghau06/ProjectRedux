import React from "react";

export default function Pagination({
  currentPage,
  setCurrentPage,
  loading,
  hasMore,
  totalItems,
  itemsPerPage,
}) {
  // Số trang đã load vào data
  const loadedPages = Math.ceil(totalItems / itemsPerPage) || 1;

  // Tổng số trang thật sự (đã load + có thể còn nữa)
  const totalPages = hasMore ? loadedPages + 1 : loadedPages;

  // Vị trí bản ghi đầu và cuối
  const startRecord = (currentPage - 1) * itemsPerPage + 1;
  const endRecord = Math.min(currentPage * itemsPerPage, totalItems);

  const nextPage = () => {
    if (!loading && (hasMore || currentPage < totalPages)) {
      setCurrentPage(currentPage + 1);
    }
  };

  const prevPage = () => {
    if (!loading && currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  return (
    <div className="pagination-wrapper" style={{ marginTop: "20px" }}>
      <div className="pagination">
        {/* Nút Previous */}
        <button
          onClick={prevPage}
          disabled={loading || currentPage === 1}
          style={{
            padding: "6px 12px",
            borderRadius: "4px",
            backgroundColor:
              currentPage === 1 ? "#ccc" : "rgba(255,255,255,0.8)",
            border: "1px solid #ccc",
            cursor: currentPage === 1 ? "not-allowed" : "pointer",
          }}
        >
          Trước
        </button>

        {/* Hiển thị trang */}
        <span style={{ margin: "0 10px", fontSize: "14px" }}>
          Trang {currentPage} / {totalPages}
        </span>

        {/* Nút Next */}
        <button
          onClick={nextPage}
          disabled={loading || (!hasMore && currentPage >= totalPages)}
          style={{
            padding: "6px 12px",
            borderRadius: "4px",
            backgroundColor:
              !hasMore && currentPage >= totalPages
                ? "#ccc"
                : "rgba(255,255,255,0.8)",
            border: "1px solid #ccc",
            cursor:
              !hasMore && currentPage >= totalPages ? "not-allowed" : "pointer",
          }}
        >
          Sau
        </button>
      </div>

      {/* Hiển thị số bản ghi */}
      <div
        style={{
          marginTop: "8px",
          fontSize: "12px",
          color: "#389e0d",
        }}
      >
        Hiển thị {startRecord}-{endRecord} /{" "}
        {hasMore ? `${totalItems}+` : totalItems}
      </div>
    </div>
  );
}
