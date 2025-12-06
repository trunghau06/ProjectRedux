import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { loadUsers } from '../../features/users'; 
import { setSort } from '../../redux/usersSlice.js';

/**
 * Component hiển thị tiêu đề cột có thể sắp xếp.
 * @param {string} label - Tên hiển thị của cột.
 * @param {string} sortKey - Key tương ứng trong dữ liệu (ví dụ: 'name', 'id').
 */
export default function SortableHeader({ label, sortKey }) {
    const dispatch = useDispatch();
    const currentSortBy = useSelector(state => state.users.sortBy);
    const currentOrder = useSelector(state => state.users.order);
    const currentLimit = useSelector(state => state.users.limit);

    const isCurrentSortKey = currentSortBy === sortKey;

    const handleSortClick = () => {
        let newOrder;
        
        // Xác định thứ tự sắp xếp mới
        if (isCurrentSortKey) {
            newOrder = currentOrder === 'asc' ? 'desc' : 'asc';
        } else {
            // Khi chuyển sang cột mới, mặc định sắp xếp tăng dần
            newOrder = 'asc'; 
        }

        // Cập nhật state Redux (setSort sẽ reset page=1, data=[])
        dispatch(setSort({ sortBy: sortKey, order: newOrder }));
        
        // Tải lại dữ liệu trang 1 với cấu hình mới
        dispatch(loadUsers({ 
            page: 1, 
            limit: currentLimit, 
            sortBy: sortKey, 
            order: newOrder 
        }));
    };

    // Hàm hiển thị mũi tên sắp xếp
    const renderSortIcon = () => {
        if (!isCurrentSortKey) {
            return <span className="sort-icon-placeholder">⇅</span>; 
        }
        return currentOrder === 'asc' ? '▲' : '▼';
    };

    return (
        // Thêm className và onClick để xử lý sự kiện
        <th className="sortable-header" onClick={handleSortClick}>
            {label}
            {/* Hiển thị biểu tượng sắp xếp */}
            <span className={`sort-icon ${isCurrentSortKey ? 'active' : ''} ${currentOrder}`}>
                {renderSortIcon()}
            </span>
        </th>
    );
}
