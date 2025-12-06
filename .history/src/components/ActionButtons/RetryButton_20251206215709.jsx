import React from 'react';
import '../../styles/A';

export default function RetryButton({ onRetry, size = 'medium', text = '🔄 Thử lại' }) {
  return (
    <button 
      onClick={onRetry}
      className={`retry-button retry-button-${size}`}
    >
      {text}
    </button>
  );
}