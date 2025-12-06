import React, { useEffect, useRef, useCallback, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loadUsers } from "../../features/users/userThunks";
import DataTable from "./DataTable";
import DataCard from "./DataCard";
import LoaderSpinner from "../Loader/LoaderSpinner";
import Pagination from "../Shared/Pagination";
import "../../styles/Shared/Pagination.css";

export default function DataView() {
  const dispatch = useDispatch();
  const { data, loading, page, hasMore, limit, sortBy, order } = useSelector(
    (state) => state.users
  );

  const containerRef = useRef(null);
  const isLoadingRef = useRef(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

  const [paginationPage, setPaginationPage] = useState(1);

  // Khóa auto detect khi dùng prev/next
  const [lockAutoPage, setLockAutoPage] = useState(false);

  /** ---------------------------------------------------
   * 1) LOAD TRANG 1 NGAY LẦN ĐẦU
   ---------------------------------------------------- */
  useEffect(() => {
    if (data.length === 0) {
      dispatch(loadUsers({ page: 1, limit, sortBy, order }));
    }
  }, [dispatch, limit, sortBy, order]);

  /** ---------------------------------------------------
   * 2) CHECK WIDTH → MOBILE MODE
   ---------------------------------------------------- */
  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 768);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  /** ---------------------------------------------------
   * 3) SCROLL LOAD THÊM
   ---------------------------------------------------- */
  const handleScroll = useCallback(() => {
    const container = containerRef.current;
    if (!container || loading || !hasMore || isLoadingRef.current) return;

    const { scrollTop, scrollHeight, clientHeight } = container;

    if (scrollHeight - scrollTop - clientHeight <= 100) {
      isLoadingRef.current = true;
      dispatch(loadUsers({ page, limit, sortBy, order })).finally(() => {
        isLoadingRef.current = false;
      });
    }
  }, [dispatch, page, limit, sortBy, order, loading, hasMore]);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;
    container.addEventListener("scroll", handleScroll);
    return () => container.removeEventListener("scroll", handleScroll);
  }, [handleScroll]);

  /** ---------------------------------------------------
   * 4) CLICK PREV / NEXT
   ---------------------------------------------------- */
const handlePaginationChange = async (newPage) => {
  setPaginationPage(newPage); // tăng page ngay lập tức

  const requiredLength = newPage * limit;

  // Load thêm nếu chưa đủ dữ liệu
  if (data.length < requiredLength && hasMore) {
    const pagesLoaded = Math.ceil(data.length / limit);
    const pagesToLoad = newPage - pagesLoaded;

    for (let i = 0; i < pagesToLoad; i++) {
      await dispatch(loadUsers({ page: pagesLoaded + i + 1, limit, sortBy, order }));
    }
  }

  scrollToPage(newPage);
};


  const scrollToPage = (pageNumber) => {
    const container = containerRef.current;
    if (!container) return;

    const table = container.querySelector("#tableView");
    if (!table || table.style.display === "none") return;

    const rows = table.querySelectorAll("tbody tr");
    const targetIndex = (pageNumber - 1) * limit;

    if (rows[targetIndex]) {
      const offsetTop = rows[targetIndex].offsetTop;
      container.scrollTo({
        top: offsetTop,
        behavior: "smooth",
      });
    }
  };

  /** ---------------------------------------------------
   * 5) AUTO DETECT PAGE KHI SCROLL
   ---------------------------------------------------- */
  useEffect(() => {
    if (lockAutoPage) return;

    const container = containerRef.current;
    if (!container) return;

    const rows = container.querySelectorAll("#tableView tbody tr");
    if (rows.length === 0) return;

    const updateCurrentPage = () => {
      const containerTop = container.getBoundingClientRect().top;

      for (let i = 0; i < rows.length; i++) {
        const rowTop = rows[i].getBoundingClientRect().top;

        if (rowTop >= containerTop - 50) {
          const newPage = Math.floor(i / limit) + 1;
          if (newPage !== paginationPage) {
            setPaginationPage(newPage);
          }
          break;
        }
      }
    };

    let f1 = requestAnimationFrame(() => {
      let f2 = requestAnimationFrame(() => updateCurrentPage());
      return () => cancelAnimationFrame(f2);
    });

    return () => cancelAnimationFrame(f1);
  }, [data.length, limit, lockAutoPage]);

  /** ---------------------------------------------------
   * 6) LOADER LẦN ĐẦU
   ---------------------------------------------------- */
  if (loading && data.length === 0) return <LoaderSpinner />;

  /** ---------------------------------------------------
   * 7) CHECK: Pagination chỉ hiện khi TABLE đang bật
   ---------------------------------------------------- */
  const showPagination =
    typeof document !== "undefined" &&
    document.querySelector("#tableView")?.style.display !== "none";

  /** ---------------------------------------------------
   * 8) RENDER VIEW
   ---------------------------------------------------- */
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

      {showPagination && (
        <Pagination
          currentPage={paginationPage}
          totalItems={data.length}
          itemsPerPage={limit}
          loading={loading}
          onPageChange={handlePaginationChange}
        />
      )}
    </>
  );
}
