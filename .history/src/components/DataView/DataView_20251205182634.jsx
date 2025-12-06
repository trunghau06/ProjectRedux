import React, { useEffect, useRef, useCallback, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loadUsers } from "../../features/users/userThunks";
import { setLimit, setSort } from "../../features/users/usersSlice";
import DataTable from "./DataTable";
import DataCard from "./DataCard";
import LoaderSpinner from "../Loader/LoaderSpinner";
import Pagination from "../Shared/Pagination";
import LimitSelector from "../Shared/LimitSelector";

export default function DataView() {
  const dispatch     = useDispatch();
  const { data, loading, hasMore, limit, sortBy, order, totalItems } = useSelector(state => state.users);
  const containerRef = useRef(null);
  const isLoadingRef = useRef(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
  const [paginationPage, setPaginationPage] = useState(1);
  const { isOpen } = useSelector(state => state.modal);

  // Khi component mount, đọc sort từ localStorage
  useEffect(() => {
    const savedSortBy = localStorage.getItem("sortBy");
    const savedOrder = localStorage.getItem("order");
    if (savedSortBy && savedOrder) {
      dispatch(setSort({ sortBy: savedSortBy, order: savedOrder }));
    }
  }, [dispatch]);

  // Load trang 1 lần đầu
  useEffect(() => {
    dispatch(loadUsers({ page: 1, limit, sortBy, order }));
  }, [dispatch, limit, sortBy, order]);

  // Theo dõi resize màn hình
  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 768);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Scroll load thêm
  const handleScroll = useCallback(() => {
    const container = containerRef.current;
    if (!container || loading || isLoadingRef.current || !hasMore) return;

    const { scrollTop, scrollHeight, clientHeight } = container;
    if (scrollHeight - scrollTop - clientHeight <= 5) {
      isLoadingRef.current = true;
      const nextPage = Math.floor(data.length / limit) + 1;
      dispatch(loadUsers({ page: nextPage, limit, sortBy, order }))
        .finally(() => {
          isLoadingRef.current = false;
          const currentDisplayPage = Math.ceil(data.length / limit);
          setPaginationPage(currentDisplayPage + 1);
        });
    }
  }, [dispatch, loading, hasMore, data.length, limit, sortBy, order]);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;
    container.addEventListener("scroll", handleScroll);
    return () => container.removeEventListener("scroll", handleScroll);
  }, [handleScroll]);

  if (loading && data.length === 0) return <LoaderSpinner />;

  const handlePageChange = async (newPage) => {
    const requiredLength = newPage * limit;

    // Load thêm nếu chưa đủ dữ liệu
    if (data.length < requiredLength && hasMore) {
      const pagesToLoad = Math.ceil((requiredLength - data.length) / limit);
      for (let i = 0; i < pagesToLoad; i++) {
        const nextPageToLoad = Math.floor(data.length / limit) + 1;
        await dispatch(loadUsers({ page: nextPageToLoad, limit, sortBy, order }));
      }
    }

    // Sau khi load xong mới set page
    setPaginationPage(newPage);

    // Scroll đến record đầu của trang
    setTimeout(() => {
      const container = containerRef.current;
      const table = container?.querySelector("#tableView");
      const rows = table?.querySelectorAll("tbody tr");
      const targetIndex = (newPage - 1) * limit;
      if (rows?.[targetIndex]) {
        container.scrollTo({ top: rows[targetIndex].offsetTop, behavior: "smooth" });
      }
    }, 100);
  };


  const handleLimitChange = (newLimit) => {
    dispatch(setLimit(newLimit));
    setPaginationPage(1);
  };

  // Khi sort thay đổi từ SortField, lưu vào localStorage
  const handleSortChange = (newSortBy, newOrder) => {
    localStorage.setItem("sortBy", newSortBy);
    localStorage.setItem("order", newOrder);
    dispatch(setSort({ sortBy: newSortBy, order: newOrder }));
    dispatch(loadUsers({ page: 1, limit: limit, sortBy: newSortBy, order: newOrder }));
    setPaginationPage(1);
  };

  return (
    <>
      <LimitSelector 
        limit={limit}
        onLimitChange={handleLimitChange}
        loading={loading}
      />

      <div
        id="cardsContainer"
        className="cards-container"
        ref={containerRef}
        style={{ display: data.length ? "block" : "none" }}
      >
        <div className="cards-spacer">
          <div className="cards-content">
            <div id="tableView" className="view-wrapper">
              <DataTable handleSortChange={handleSortChange} />
            </div>

            <div id="cardView" className="view-wrapper card-list-grid">
              <DataCard />
            </div>

            {loading && data.length > 0 && (
              <div id="loadingMore" className="loading-more">
                <div>...</div>
              </div>
            )}

            {!hasMore && data.length > 0 && !isMobile && (
              <div style={{ textAlign: "center", padding: "20px", color: "#666" }}>
                Đã tải hết dữ liệu
              </div>
            )}
          </div>
        </div>
      </div>

      {!isOpen && (
        <Pagination
    currentPage={paginationPage}
    totalItems={totalItems}
    itemsPerPage={limit}
    hasMore={hasMore}
    loading={loading}
    onPageChange={handlePageChange}
  />

      )}
    </>
  );
}
