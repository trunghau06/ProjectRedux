import React from 'react';
import RetryButton from '../ActionButtons/RetryButton';
import '../../styles/Error/ErrorInline.css';

export default function ErrorInline({ error, onRetry }) {
  return (
    <div className="error-inline">
      <p className="error-inline-message"> {error}</p>
      <RetryButton onRetry={onRetry} size="small" />
    </div>
  );
}