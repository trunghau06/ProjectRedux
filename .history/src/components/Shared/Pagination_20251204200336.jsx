import React from "react";

export default function Pagination({
  currentPage,
  pageSize,
  dataLength,
  onNext,
  onPrev,
}) {
  const totalPages = Math.ceil(dataLength / pageSize);

  const startRecord = (currentPage - 1) * pageSize + 1;
  const endRecord = Math.min(currentPage * pageSize, dataLength);

  return (
    <div className="pagination-container">
      <button
        onClick={onPrev}
        disabled={currentPage <= 1}
      >
        Prev
      </button>

      <span>
        Trang {currentPage}/{totalPages} — {startRecord}-{endRecord}/{dataLength}
      </span>

      <button
        onClick={onNext}
        disabled={currentPage >= totalPages}
      >
        Next
      </button>
    </div>
  );
}
