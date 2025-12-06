import React, { useEffect, useRef, useCallback, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loadUsers }                from "../../features/users/userThunks";
import DataTable                    from "./DataTable";
import DataCard                     from "./DataCard";
import LoaderSpinner                from "../Loader/LoaderSpinner";

export default function DataView() {
  const dispatch = useDispatch();     // Gọi hành động Redux
  const { data, loading, page, hasMore } = useSelector(state => state.users); // Lấy dữ liệu từ Redux store
  const containerRef = useRef(null);  // Tham chiếu đến container cuộn
  const isLoadingRef = useRef(false); // Trạng thái tải thêm dữ liệu
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768); // Kiểm tra màn hình

  // Lần đầu mở trang
  useEffect(() => {
    dispatch(loadUsers({ page: 1, limit: 10 }));
  }, [dispatch]);

  // Theo dõi màn hình
  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 768);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  /
  const handleScroll = useCallback(() => {
    const container = containerRef.current;
    if (!container || loading || isLoadingRef.current || !hasMore) return;

    const { scrollTop, scrollHeight, clientHeight } = container;
    if (scrollHeight - scrollTop - clientHeight <= 5) {
      isLoadingRef.current = true;
      dispatch(loadUsers({ page: page, limit: 10 })).finally(() => {
        isLoadingRef.current = false;
      });
    }
  }, [dispatch, loading, page, hasMore]);

  useEffect(() => {
    const container = containerRef.current;
    if (container) {
      container.addEventListener("scroll", handleScroll);
      return () => container.removeEventListener("scroll", handleScroll);
    }
  }, [handleScroll]);

  if (loading && data.length === 0) return <LoaderSpinner />;

  return (
    <div
      id="cardsContainer"
      className="cards-container"
      ref={containerRef}
      style={{ display: data.length ? "block" : "none" }}
    >
      <div id="cardsSpacer" className="cards-spacer">
        <div id="cardsContent" className="cards-content">
          <div id="tableView" className="view-wrapper">
            <DataTable />
          </div>

          <div id="cardView" className="view-wrapper card-list-grid">
            <DataCard />
          </div>

          {/* Load more spinner */}
          {loading && data.length > 0 && (
            <div id="loadingMore" className="loading-more">
              <div>...</div>
            </div>
          )}

          {/* End of data */}
          {!hasMore && data.length > 0 && !isMobile && (
            <div style={{ textAlign: "center", padding: "20px", color: "#666" }}>
              Đã tải hết dữ liệu
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
