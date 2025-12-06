import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { loadUsers } from '../../features/users/userThunks.js';
import { setSort } from '../../features/users/usersSlice.js';
// Không cần useState, useEffect, useRef nữa

export default function SortField({ label, sortKey }) {
    const dispatch = useDispatch();
    const currentSortBy = useSelector(state => state.users.sortBy);
    const currentOrder = useSelector(state => state.users.order);
    const currentLimit = useSelector(state => state.users.limit);

    const isCurrentSortKey = currentSortBy === sortKey;

    // Thiết lập giá trị được chọn trong <select>
    // Nếu đây là cột đang sắp xếp, value là 'asc' hoặc 'desc'. Ngược lại, là chuỗi rỗng.
    const currentSelection = isCurrentSortKey ? currentOrder : ''; 

    const handleSortChange = (e) => {
        const selectedOrder = e.target.value;

        // Bỏ qua nếu giá trị là chuỗi rỗng mặc định/placeholder
        if (!selectedOrder) return; 

        const newSortKey = sortKey;
        const newOrder = selectedOrder;

        dispatch(setSort({ sortBy: newSortKey, order: newOrder }));
        
        dispatch(loadUsers({ 
            page: 1, 
            limit: currentLimit, 
            sortBy: newSortKey, 
            order: newOrder 
        }));
    };

    const renderMenuIcon = () => {
        // Icon luôn hiển thị ▼ (chỉ là giao diện, select xử lý logic)
        return '▼'; 
    }

    return (
        <th 
            className="sort-select-header" // Đổi tên class để dễ quản lý CSS
        >
            <div className="header-content-wrapper">
                <span>{label}</span>
                <span className="sort-menu-icon">
                    {renderMenuIcon()}
                </span>
            </div>

            {/* Thẻ <select> VÔ HÌNH: Đặt lên trên để kích hoạt menu native */}
            <select 
                className="sort-native-select"
                onChange={handleSortChange}
                value={currentSelection} 
            >
                {/* Option đầu tiên làm placeholder/default */}
                <option value="" disabled={isCurrentSortKey}>
                    Chọn sắp xếp
                </option>
                
                <option value="asc">
                    Tăng dần (Ascending)
                </option>
                
                <option value="desc">
                    Giảm dần (Descending)
                </option>
            </select>
            
        </th>
    );
}