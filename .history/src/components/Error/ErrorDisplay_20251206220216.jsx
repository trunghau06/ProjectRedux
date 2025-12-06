import React from 'react';
import RetryButton from '../ActionButtons';
import '../../styles/Error/ErrorDisplay.css';

export default function ErrorDisplay({ error, onRetry }) {
  return (
    <div className="error-container">
      <div className="error-icon">❌</div>
      <h3 className="error-title">Lỗi khi tải dữ liệu</h3>
      <p className="error-message">{error}</p>
      <RetryButton onRetry={onRetry} size="large" />
    </div>
  );
}