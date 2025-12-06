import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { loadUsers } from '../../redux/userThunks.js'; 
import { setSort } from '../../redux/usersSlice.js';

export default function SortableHeader({ label, sortKey }) {
    const dispatch = useDispatch();
    const currentSortBy = useSelector(state => state.users.sortBy);
    const currentOrder = useSelector(state => state.users.order);
    const currentLimit = useSelector(state => state.users.limit);

    const isCurrentSortKey = currentSortBy === sortKey;

    const handleSortIconClick = (e, newSortKey) => {
        e.stopPropagation(); 
        
        let newOrder;
        
        if (isCurrentSortKey) {
            newOrder = currentOrder === 'asc' ? 'desc' : 'asc';
        } else {
            // Khi chuyển sang cột mới, mặc định là 'asc'
            newOrder = 'asc'; 
        }

        dispatch(setSort({ sortBy: newSortKey, order: newOrder }));
        
        dispatch(loadUsers({ 
            page: 1, 
            limit: currentLimit, 
            sortBy: newSortKey, 
            order: newOrder 
        }));
    };

    const renderSortIcon = () => {
        if (!isCurrentSortKey) {
            return null; // Không hiển thị gì khi cột không phải là cột đang sắp xếp
        }
        return currentOrder === 'asc' ? '▲' : '▼';
    };

    return (
        // Loại bỏ onClick khỏi <th>
        <th className="sortable-header">
            {label}
            {/* Chỉ hiển thị icon khi cột đang được sắp xếp */}
            {isCurrentSortKey ? (
                <span 
                    className={`sort-icon active ${currentOrder}`}
                    onClick={(e) => handleSortIconClick(e, sortKey)}
                >
                    {renderSortIcon()}
                </span>
            ) : (
                // Nếu cột chưa được sắp xếp, hiển thị một icon mờ (▲) 
                // để người dùng biết cột có thể sắp xếp được
                <span 
                    className="sort-icon inactive"
                    onClick={(e) => handleSortIconClick(e, sortKey)}
                >
                    ▲
                </span>
            )}
        </th>
    );
}