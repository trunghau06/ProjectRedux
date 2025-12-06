import React, { useState, useRef, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { loadUsers } from '../../features/users/userThunks.js';
import { setSort } from '../../features/users/usersSlice.js';

export default function SortField({ label, sortKey }) {
    const dispatch = useDispatch();
    const currentSortBy = useSelector(state => state.users.sortBy);
    const currentOrder = useSelector(state => state.users.order);
    const currentLimit = useSelector(state => state.users.limit);

    // Không cần isMenuOpen và handleClickOutside/useEffect nữa vì <select> tự xử lý
    // const [isMenuOpen, setIsMenuOpen] = useState(false);
    // const headerRef = useRef(null);

    const isCurrentSortKey = currentSortBy === sortKey;

    const currentSelection = isCurrentSortKey ? currentOrder : ''; // Giá trị mặc định cho select

    // Xử lý sự kiện khi giá trị <select> thay đổi
    const handleSortChange = (e) => {
        const selectedOrder = e.target.value;

        // Bỏ qua nếu giá trị là chuỗi rỗng mặc định
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
        // Vẫn giữ icon ▼ như dấu hiệu menu
        return '▼'; 
    }

    return (
        <th 
            className="sort-dropdown-header" 
            // Không cần ref={headerRef} nữa
        >
            <div className="header-content-wrapper">
                <span>{label}</span>

                {/* Thay thế icon cũ bằng <select> 
                  Sử dụng onChange để xử lý việc chọn sort
                */}
                <select 
                    className="sort-select"
                    onChange={handleSortChange}
                    value={currentSelection} 
                >
                    {/* Option đầu tiên là mặc định/placeholder, không có value */}
                    <option value="" disabled={isCurrentSortKey}>
                        {renderMenuIcon()}
                    </option>
                    
                    <option value="asc">
                        Tăng dần (Ascending)
                    </option>
                    
                    <option value="desc">
                        Giảm dần (Descending)
                    </option>
                </select>
                
            </div>
            {/* Không cần khối {isMenuOpen && (...)} nữa */}
        </th>
    );
}