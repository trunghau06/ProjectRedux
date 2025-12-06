import React from "react";

export default function Sort({ active, order }) {
    if (!active) {
        return <span className="sort-icon inactive">⇅</span>;
    }

    return (
        <span className="sort-icon active">
            {order === "asc" ? "↑" : "↓"}
        </span>
    );
}