// DataView.jsx
import React, { useEffect, useRef, useCallback, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loadUsers } from "../../features/users/userThunks";
import DataTable from "./DataTable";
import DataCard from "./DataCard";
import LoaderSpinner from "../Loader/LoaderSpinner";
import Pagination from "../Shared/Pagination";
import Btn

export default function DataView() {
  const dispatch = useDispatch();
  const { data, loading, hasMore } = useSelector(state => state.users);
  const containerRef = useRef(null);
  const isLoadingRef = useRef(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
  const [paginationPage, setPaginationPage] = useState(1);
  const { isOpen } = useSelector(state => state.modal); 

  // Load trang 1 lần đầu
  useEffect(() => {
    dispatch(loadUsers({ page: 1, limit: 10 }));
  }, [dispatch]);

  // Theo dõi màn hình
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
      const nextPage = Math.floor(data.length / 10) + 1;
      dispatch(loadUsers({ page: nextPage, limit: 10 })).finally(() => {
        isLoadingRef.current = false;
        setPaginationPage(nextPage);
      });
    }
  }, [dispatch, loading, hasMore, data.length]);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;
    container.addEventListener("scroll", handleScroll);
    return () => container.removeEventListener("scroll", handleScroll);
  }, [handleScroll]);

  if (loading && data.length === 0) return <LoaderSpinner />;

  const handlePageChange = async (newPage) => {
    setPaginationPage(newPage);
    const requiredLength = newPage * 10;
    if (data.length < requiredLength && hasMore) {
      const pagesToLoad = Math.ceil((requiredLength - data.length) / 10);
      for (let i = 0; i < pagesToLoad; i++) {
        await dispatch(loadUsers({ page: Math.floor(data.length / 10) + 1, limit: 10 }));
      }
    }

    // Scroll tới record đầu của trang
    const container = containerRef.current;
    const table = container?.querySelector("#tableView");
    const rows = table?.querySelectorAll("tbody tr");
    const targetIndex = (newPage - 1) * 10;
    if (rows?.[targetIndex]) {
      container.scrollTo({ top: rows[targetIndex].offsetTop, behavior: "smooth" });
    }
  };

  return (
    <>
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
          itemsPerPage={10}
          hasMore={hasMore}
          loading={loading}
          onPageChange={handlePageChange}
        />
      )}
    </>
  );
}
