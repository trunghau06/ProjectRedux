import React, { useState, useRef, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { loadUsers } from '../../features/users/userThunks.js';
import { setSort } from '../../features/users/usersSlice.js';

export default function SortDropdownHeader({ label, sortKey }) {
    const dispatch = useDispatch();
    const currentSortBy = useSelector(state => state.users.sortBy);
    const currentOrder = useSelector(state => state.users.order);
    const currentLimit = useSelector(state => state.users.limit);

    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const headerRef = useRef(null);

    const isCurrentSortKey = currentSortBy === sortKey;

    // Đóng menu khi click ra ngoài
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (headerRef.current && !headerRef.current.contains(event.target)) {
                setIsMenuOpen(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    const handleMenuToggle = (e) => {
        // Ngăn chặn sự kiện lan truyền khi click vào icon
        e.stopPropagation(); 
        setIsMenuOpen(!isMenuOpen);
    };

    const handleSortSelect = (order) => {
        const newSortKey = sortKey;
        const newOrder = order;

        // 1. Cập nhật state Redux
        dispatch(setSort({ sortBy: newSortKey, order: newOrder }));
        
        // 2. Tải lại dữ liệu trang 1
        dispatch(loadUsers({ 
            page: 1, 
            limit: currentLimit, 
            sortBy: newSortKey, 
            order: newOrder 
        }));

        setIsMenuOpen(false); // Đóng menu sau khi chọn
    };

    const renderCurrentIcon = () => {
        if (!isCurrentSortKey) {
            return '•••'; // Icon mặc định (dấu ba chấm hoặc biểu tượng menu)
        }
        return currentOrder === 'asc' ? '▲' : '▼'; // Hiển thị trạng thái đang sắp xếp
    }

    return (
        <th 
            className="sort-dropdown-header" 
            ref={headerRef}
        >
            <div className="header-content-wrapper">
                {/* 1. Tiêu đề cột */}
                <span>{label}</span>

                {/* 2. Icon Menu/Sắp xếp - Click vào đây để mở menu */}
                <span 
                    className={`sort-menu-icon ${isCurrentSortKey ? 'active' : ''}`}
                    onClick={handleMenuToggle}
                >
                    {renderCurrentIcon()}
                </span>
            </div>

            {/* 3. Menu Dropdown */}
            {isMenuOpen && (
                <div className="sort-menu-dropdown">
                    <button 
                        onClick={() => handleSortSelect('asc')}
                        className={isCurrentSortKey && currentOrder === 'asc' ? 'selected' : ''}
                    >
                        Tăng dần (Ascending)
                    </button>
                    <button 
                        onClick={() => handleSortSelect('desc')}
                        className={isCurrentSortKey && currentOrder === 'desc' ? 'selected' : ''}
                    >
                        Giảm dần (Descending)
                    </button>
                </div>
            )}
        </th>
    );
}