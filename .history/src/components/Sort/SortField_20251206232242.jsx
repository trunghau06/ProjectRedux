import React, { useState, useRef, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { loadUsers } from '../../features/users/userThunks.js';
import { setSort } from '../../features/users/usersSlice.js';
import "../../styles/Sort/SortField.css";

export default function SortField({ label, sortKey }) {
    const dispatch = useDispatch();
    const currentSortBy = useSelector(state => state.users.sortBy); // sort field 
    const currentOrder = useSelector(state => state.users.order);   // asc/ desc
    const currentLimit = useSelector(state => state.users.limit);   // số limit rc

    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const headerRef = useRef(null);

    const isCurrentSortKey = currentSortBy === sortKey;

    // tắt khi click ngoài
    useEffect(() => {
        const handleClickOutside = (event) => {
            // kiểm tra ref gắn DOM và phần tử bị click
            if (headerRef.current && !headerRef.current.contains(event.target)) {
                setIsMenuOpen(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);


    const handleMenuToggle = (e) => {
        e.stopPropagation();
        setIsMenuOpen(!isMenuOpen); // đao trạng thái
    };

    // sắp xếp
    const handleSortSelect = (order) => {
        dispatch(setSort({ sortBy: sortKey, order }));
        dispatch(loadUsers({ page: 1, limit: currentLimit, sortBy: sortKey, order }));
        setIsMenuOpen(false);
    };

    return (
        <th className="sort-dropdown-header" ref={headerRef}>
            <div className="header-content-wrapper">
                <span>{label}</span>
                <span className="sort-menu-icon" onClick={handleMenuToggle}>▼</span>
            </div>

            {isMenuOpen && (
                <div className="sort-menu-dropdown">
                    <div onClick={() => handleSortSelect('asc')}>Tăng dần</div>
                    <div onClick={() => handleSortSelect('desc')}>Giảm dần</div>
                </div>
            )}
        </th>
    );
}
