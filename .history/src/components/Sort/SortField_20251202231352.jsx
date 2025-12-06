import React, { useState, useRef, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { loadUsers } from '../../features/users/userThunks.js';
import { setSort } from '../../features/users/usersSlice.js';

export default function SortField({ label, sortKey }) {
    const dispatch = useDispatch();
    const currentSortBy = useSelector(state => state.users.sortBy);
    const currentOrder = useSelector(state => state.users.order);
    const currentLimit = useSelector(state => state.users.limit);

    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const headerRef = useRef(null);

    const isCurrentSortKey = currentSortBy === sortKey;

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

        setIsMenuOpen(false);
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

                {/* Icon ▼ không bị ảnh hưởng bởi trạng thái sắp xếp */}
                <span 
                    className="sort-menu-icon" 
                    onClick={handleMenuToggle}
                >
                    {renderMenuIcon()}
                </span>
            </div>

            {/* Menu Dropdown */}
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