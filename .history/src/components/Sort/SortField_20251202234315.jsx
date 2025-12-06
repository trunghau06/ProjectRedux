import React, { useState, useRef, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { loadUsers } from '../../features/users/userThunks.js';
import { setSort } from '../../features/users/usersSlice.js';
import "../../styles/Sort/SortField.css";

export default function SortField({ label, sortKey }) {
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
            // Kiểm tra xem click có nằm ngoài thẻ <th> chứa menu hay không
            if (headerRef.current && !headerRef.current.contains(event.target)) {
                setIsMenuOpen(false);
            }
        };
        // Thêm lắng nghe sự kiện click toàn bộ document
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    const handleMenuToggle = (e) => {
        e.stopPropagation(); 
        setIsMenuOpen(!isMenuOpen);
    };

    const handleSortSelect = (order) => {
        const newSortKey = sortKey;
        const newOrder = order;

        dispatch(setSort({ sortBy: newSortKey, order: newOrder }));
        
        dispatch(loadUsers({ 
            page: 1, 
            limit: currentLimit, 
            sortBy: newSortKey, 
            order: newOrder 
        }));

        setIsMenuOpen(false); // Đóng menu sau khi chọn
    };

    const renderMenuIcon = () => {
        return '▼'; 
    }

    return (
        <th 
            className="sort-dropdown-header" 
            ref={headerRef}
        >
            <div className="header-content-wrapper">
                <span>{label}</span>

                <span 
                    className="sort-menu-icon" 
                    onClick={handleMenuToggle}
                >
                    {renderMenuIcon()}
                </span>
            </div>

            {isMenuOpen && (
                <div className="sort-menu-dropdown">
                    <div
                        onClick={() => handleSortSelect('asc')}
                        className={isCurrentSortKey && currentOrder === 'asc' ? 'selected' : ''}
                    >
                        Tăng dần
                    </div>
                    <div
                        onClick={() => handleSortSelect('desc')}
                        className={isCurrentSortKey && currentOrder === 'desc' ? 'selected' : ''}
                    >
                        Giảm dần
                    </div>
                </div>
            )}
        </th>
    );
}