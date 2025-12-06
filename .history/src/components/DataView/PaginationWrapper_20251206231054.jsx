// src/components/Shared/PaginationWrapper.jsx
import React, { useState, useCallback, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { loadUsers } from '../../features/users/userThunks';
import Pagination from '../Shared/Pagination';

export default function PaginationWrapper() {
  const dispatch = useDispatch();
  // lấy danh sách
  const { data, loading, hasMore, limit, sortBy, order } = useSelector(state => state.users);
  const { isOpen } = useSelector(state => state.modal); // ẩn khi modal mở
  const [paginationPage, setPaginationPage] = useState(1);  // page hiện tại

  // Tự động cập nhật page khi data thay đổi (do scroll load)
  useEffect(() => {
    if (data.length > 0) {
      const currentPage = Math.ceil(data.length / limit);
      setPaginationPage(currentPage);
    }
  }, [data.length, limit]);

  const handlePageChange = useCallback(async (newPage) => {
    const requiredLength = newPage * limit;

    // Load thêm nếu chưa đủ dữ liệu
    if (data.length < requiredLength && hasMore) {
      const pagesToLoad = Math.ceil((requiredLength - data.length) / limit); // tính số lượng page cần load
      for (let i = 0; i < pagesToLoad; i++) {
        const nextPageToLoad = Math.floor(data.length / limit) + 1; // tính page tiếp theo
        await dispatch(loadUsers({ page: nextPageToLoad, limit, sortBy, order }));
      }
    }

    setPaginationPage(newPage); // cập nhật page

    // Scroll đến record đầu của trang
    setTimeout(() => {
      const container = document.querySelector('#cardsContainer');
      const isMobile = window.innerWidth <= 768;
      
      if (isMobile) {
        // Card view: scroll đến card đầu tiên của trang
        const cards = container?.querySelectorAll('.card');
        const targetIndex = (newPage - 1) * limit;  // tinh card đầu tiên của trang
        if (cards?.[targetIndex]) { // kiểm tra c
          const cardTop = cards[targetIndex].offsetTop;
          container.scrollTo({ top: cardTop - 100, behavior: "smooth" });
        }
      } else {
        // Table view: scroll đến row đầu tiên của trang
        const table = container?.querySelector("#tableView");
        const rows = table?.querySelectorAll("tbody tr");
        const targetIndex = (newPage - 1) * limit;
        if (rows?.[targetIndex]) {
          container.scrollTo({ top: rows[targetIndex].offsetTop, behavior: "smooth" });
        }
      }
    }, 100);
  }, [dispatch, data.length, hasMore, limit, sortBy, order]);

  if (isOpen || data.length === 0) return null;

  return (
    <Pagination
      currentPage={paginationPage}
      totalItems={data.length}
      itemsPerPage={limit}
      hasMore={hasMore}
      loading={loading}
      onPageChange={handlePageChange}
    />
  );
}