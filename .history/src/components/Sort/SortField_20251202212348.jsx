import React from "react";

export default function SortFie({ active, order }) {
    if (!active) {
        return <span className="sort-icon inactive">⇅</span>;
    }

    return (
        <span className="sort-icon active">
            {order === "asc" ? "↑" : "↓"}
        </span>
    );
}