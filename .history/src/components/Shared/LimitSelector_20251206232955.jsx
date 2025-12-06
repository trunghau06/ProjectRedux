import React from "react";
import "../../styles/Shared/LimitSelector.css";

export default function LimitSelector({ limit, onLimitChange, loading }) {
  const handleChange = (e) => {
    const newLimit = parseInt(e.target.value);
    onLimitChange(newLimit);
  };

  return (
    <div className="limit-selector-container">
      <label htmlFor="limitSelect" className="limit-selector-label">
        Số record/trang:
      </label>
      <select
        id="limitSelect"
        value   ={limit}
        onChange={handleChange}
        disabled={loading}
        className="limit-selector-select"
      >
        <option value={10}>10</option>
        <option value={20}>20</option>
        <option value={50}>50</option>
        <option value={100}>100</option>
      </select>
    </div>
  );
}