import React, { useEffect, useRef, useCallback, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loadUsers }                from "../../features/users/userThunks";
import { setLimit, setSort }        from "../../features/users/usersSlice";
import DataTable     from "./DataTable";
import DataCard      from "./DataCard";
import LoaderSpinner from "../Loader/LoaderSpinner";
import LimitSelector from "../Shared/LimitSelector";
import ErrorDisplay  from "../Error/ErrorDisplay";
import ErrorInline   from "../Error/ErrorInline";

export default function DataView() {
  const dispatch = useDispatch();
  // lấy state
  const { data, loading, hasMore, limit, sortBy, order, totalItems, error } = useSelector(state => state.users);
  const containerRef = useRef(null);  // Theo dõi scroll
  const isLoadingRef = useRef(false); // ngăn load nhiều lần
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
  const { isOpen }   = useSelector(state => state.modal);
  const initialLoadDone = useRef(false);  // chỉ load 1 lần

  // Khôi phục settings từ localStorage khi component mount
  useEffect(() => {
    const savedSortBy = localStorage.getItem("sortBy");
    const savedOrder  = localStorage.getItem("order");
    const savedLimit  = localStorage.getItem("limit");

    if (savedSortBy && savedOrder) {
      dispatch(setSort({ sortBy: savedSortBy, order: savedOrder }));
    }
    
    if (savedLimit) {
      dispatch(setLimit(parseInt(savedLimit)));
    }
  }, [dispatch]);

  // Load trang 1 lần đầu 
  useEffect(() => {
    if (!initialLoadDone.current) {
      dispatch(loadUsers({ page: 1, limit, sortBy, order }));
      initialLoadDone.current = true;
    }
  }, [dispatch, limit, sortBy, order]);

  // Theo dõi resize màn hình
  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 768);
    window.addEventListener("resize", handleResize);  // khi thay đổi size gọi hàm
    return () => window.removeEventListener("resize", handleResize);  // khôi phục lại khi component unmount
  }, []);

  // Scroll load thêm
  const handleScroll = useCallback(() => {
    const container  = containerRef.current;
    if (!container || loading || isLoadingRef.current || !hasMore) return;

    const { scrollTop, scrollHeight, clientHeight } = container;  // lấy vị trí hiện tại
    if (scrollHeight - scrollTop - clientHeight <= 5) {
      isLoadingRef.current = true;  // Không load nhiều làn
      const nextPage       = Math.floor(data.length / limit) + 1;
      dispatch(loadUsers({ page: nextPage, limit, sortBy, order })) // gửi để lấy thêm dữ liệu  
        .finally(() => {
          isLoadingRef.current = false; // cho phép load thêm lần sau 
        });
    }
  }, [dispatch, loading, hasMore, data.length, limit, sortBy, order]);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;
    container.addEventListener("scroll", handleScroll);
    return () => container.removeEventListener("scroll", handleScroll);
  }, [handleScroll]);

  // Xử lý retry khi load lần đầu thất bại
  const handleRetry = () => {
    dispatch(loadUsers({ page: 1, limit, sortBy, order }));
  };

  // Xử lý retry khi load thêm thất bại
  const handleRetryLoadMore = () => {
    const nextPage = Math.floor(data.length / limit) + 1;
    dispatch(loadUsers({ page: nextPage, limit, sortBy, order }));
  };

  // Hiển thị spinner khi đang load lần đầu
  if (loading && data.length === 0) return <LoaderSpinner />;

  // Hiển thị lỗi khi load lần đầu thất bại
  if (error && data.length === 0) {
    return <ErrorDisplay error={error} onRetry={handleRetry} />;
  }

  // Thay đổi số lượng page
  const handleLimitChange = (newLimit) => {
    localStorage.setItem("limit", newLimit.toString()); 
    dispatch(setLimit(newLimit));
    dispatch(loadUsers({ page: 1, limit: newLimit, sortBy, order }));
  };

  const handleSortChange = (newSortBy, newOrder) => {
    localStorage.setItem("sortBy", newSortBy);
    localStorage.setItem("order", newOrder);
    dispatch(setSort({ sortBy: newSortBy, order: newOrder }));
    dispatch(loadUsers({ page: 1, limit: limit, sortBy: newSortBy, order: newOrder }));
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

            {/* Hiển thị lỗi khi load thêm thất bại */}
            {error && data.length > 0 && (
              <ErrorInline error={error} onRetry={handleRetryLoadMore} />
            )}

            {!hasMore && data.length > 0 && !isMobile && (
              <div style={{ textAlign: "center", padding: "20px", color: "#666" }}>
                Đã tải hết dữ liệu
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}