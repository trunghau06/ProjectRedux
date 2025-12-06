// DataView.jsx
import React, { useEffect, useRef, useCallback, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loadUsers } from "../../features/users/userThunks";
import { setLimit } from "../../features/users/usersSlice";
import DataTable from "./DataTable";
import DataCard from "./DataCard";
import LoaderSpinner from "../Loader/LoaderSpinner";
import Pagination from "../Shared/Pagination";
import LimitSelector from "../";
import BtnAddRecord from "../ActionButtons/BtnAddRecord";

export default function DataView() {
  const dispatch     = useDispatch();
  const { data, loading, hasMore, limit } = useSelector(state => state.users);
  const containerRef = useRef(null);
  const isLoadingRef = useRef(false);
  const [isMobile, setIsMobile]    = useState(window.innerWidth <= 768);
  const [paginationPage, setPaginationPage] = useState(1);
  const { isOpen }   = useSelector(state => state.modal); 

  // Load trang 1 lần đầu
  useEffect(() => {
    dispatch(loadUsers({ page: 1, limit }));
  }, [dispatch, limit]);

  // Theo dõi màn hình
  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 768);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Scroll load thêm - load theo số lượng limit đã chọn
  const handleScroll = useCallback(() => {
    const container  = containerRef.current;
    if (!container || loading || isLoadingRef.current || !hasMore) return;

    const { scrollTop, scrollHeight, clientHeight } = container;
    if (scrollHeight - scrollTop - clientHeight <= 5) {
      isLoadingRef.current = true;
      // Tính trang tiếp theo dựa trên limit hiện tại
      const nextPage = Math.floor(data.length / limit) + 1;
      // Load với limit đã chọn
      dispatch(loadUsers({ page: nextPage, limit })).finally(() => {
        isLoadingRef.current = false;
        // Cập nhật pagination page
        const currentDisplayPage = Math.ceil(data.length / limit);
        setPaginationPage(currentDisplayPage + 1);
      });
    }
  }, [dispatch, loading, hasMore, data.length, limit]);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;
    container.addEventListener("scroll", handleScroll);
    return () => container.removeEventListener("scroll", handleScroll);
  }, [handleScroll]);

  if (loading && data.length === 0) return <LoaderSpinner />;

  const handlePageChange = async (newPage) => {
    setPaginationPage(newPage);
    const requiredLength = newPage * limit;
    
    // Nếu chưa đủ dữ liệu, load thêm
    if (data.length < requiredLength && hasMore) {
      const pagesToLoad = Math.ceil((requiredLength - data.length) / limit);
      for (let i = 0; i < pagesToLoad; i++) {
        const nextPageToLoad = Math.floor(data.length / limit) + 1;
        await dispatch(loadUsers({ page: nextPageToLoad, limit }));
      }
    }

    // Scroll tới record đầu của trang
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

  return (
    <>
      {/* LimitSelector đặt ở đây - bên ngoài scroll container */}
      <div style={{ padding: "10px 20px", display: "flex", justifyContent: "flex-end" }}>
        <LimitSelector 
          limit={limit}
          onLimitChange={handleLimitChange}
          loading={loading}
        />
      </div>

      <div
        id="cardsContainer"
        className="cards-container"
        ref={containerRef}
        style={{ display: data.length ? "block" : "none" }}
      >
        <div className="cards-spacer">
          <div className="cards-content">
            <div id="tableView" className="view-wrapper">
              <DataTable />
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
          totalItems={data.length}
          itemsPerPage={limit}
          hasMore={hasMore}
          loading={loading}
          onPageChange={handlePageChange}
        />
      )}
    </>
  );
}