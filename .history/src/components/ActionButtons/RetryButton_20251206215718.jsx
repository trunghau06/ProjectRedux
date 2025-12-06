import React from 'react';
import '../../styles/ActionButtons/RetryButton.css';

export default function RetryButton({ onRetry, size = 'medium', text = ' Thử lại' }) {
  return (
    <button 
      onClick={onRetry}
      className={`retry-button retry-button-${size}`}
    >
      {text}
    </button>
  );
}