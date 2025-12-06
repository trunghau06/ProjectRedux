import React, { useState, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { loadUsers } from '../../features/users/userThunks';
import Pagination from './Pagination';

export default function PaginationWrapper() {
  const dispatch = useDispatch();
  const { data, loading, hasMore, limit, sortBy, order } = useSelector(state => state.users);
  const { isOpen } = useSelector(state => state.modal);
  const [paginationPage, setPaginationPage] = useState(1);

  const handlePageChange = useCallback(async (newPage) => {
    const requiredLength = newPage * limit;

    // Load thêm nếu chưa đủ dữ liệu
    if (data.length < requiredLength && hasMore) {
      const pagesToLoad = Math.ceil((requiredLength - data.length) / limit);
      for (let i = 0; i < pagesToLoad; i++) {
        const nextPageToLoad = Math.floor(data.length / limit) + 1;
        await dispatch(loadUsers({ page: nextPageToLoad, limit, sortBy, order }));
      }
    }

    setPaginationPage(newPage);

    // Scroll đến record đầu của trang (cho desktop)
    setTimeout(() => {
      const container = document.querySelector('#cardsContainer');
      const table = container?.querySelector("#tableView");
      const rows = table?.querySelectorAll("tbody tr");
      const targetIndex = (newPage - 1) * limit;
      if (rows?.[targetIndex]) {
        container.scrollTo({ top: rows[targetIndex].offsetTop, behavior: "smooth" });
      }
    }, 100);
  }, [dispatch, data.length, hasMore, limit, sortBy, order]);

  // Chỉ hiển thị khi có data và modal không mở
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