import React from 'react';
import '../../styles/Shared/ErrorDisplay.css';

export default function ErrorDisplay({ error, onRetry }) {
  return (
    <div className="error-container">
      <div className="error-icon">X</div>
      <h3 className="error-title">Lỗi khi tải dữ liệu</h3>
      <p className="error-message">{error}</p>
      <button onClick={onRetry} className="retry-button">
        🔄 Thử lại
      </button>
    </div>
  );
}