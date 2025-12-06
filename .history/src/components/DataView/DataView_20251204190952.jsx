// DataView.jsx
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
  const { data, loading, page, hasMore, limit, sortBy, order } = useSelector(state => state.users);
  const containerRef = useRef(null);
  const isLoadingRef = useRef(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
  
  // State cho pagination - chỉ dùng cho Table View
  const [paginationPage, setPaginationPage] = useState(1);
  
  // Tính toán data hiển thị cho Table (pagination mode)
  const startIndex = (paginationPage - 1) * limit;
  const endIndex = paginationPage * limit;
  const paginatedData = data.slice(startIndex, endIndex);

  // Lần đầu mở trang
  useEffect(() => {
    if (data.length === 0) {
      dispatch(loadUsers({ page: 1, limit, sortBy, order }));
    }
  }, [dispatch, limit, sortBy, order]);

  // Theo dõi màn hình
  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 768);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Reset scroll về đầu khi pagination page thay đổi (chỉ cho table)
  useEffect(() => {
    const container = containerRef.current;
    const tableView = container?.querySelector('#tableView');
    
    if (container && tableView && tableView.style.display !== 'none') {
      container.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }, [paginationPage]);

  // Hàm xử lý khi scroll - load thêm data vào store (cho CẢ Table và Card View)
  const handleScroll = useCallback(() => {
    const container = containerRef.current;
    if (!container || loading || isLoadingRef.current || !hasMore) return;

    const { scrollTop, scrollHeight, clientHeight } = container;
    
    // Load thêm data khi scroll gần cuối
    if (scrollHeight - scrollTop - clientHeight <= 100) {
      isLoadingRef.current = true;
      dispatch(loadUsers({ page, limit, sortBy, order })).finally(() => {
        isLoadingRef.current = false;
      });
    }
  }, [dispatch, loading, page, hasMore, limit, sortBy, order]);

  // Gắn scroll vào container
  useEffect(() => {
    const container = containerRef.current;
    if (container) {
      container.addEventListener("scroll", handleScroll);
      return () => container.removeEventListener("scroll", handleScroll);
    }
  }, [handleScroll]);

  // Callback từ Pagination component
  const handlePaginationChange = (newPage) => {
    const neededDataLength = newPage * limit;
    
    // Nếu data chưa đủ, load thêm
    if (data.length < neededDataLength && hasMore) {
      const currentLoadedPages = Math.ceil(data.length / limit);
      const pagesToLoad = newPage - currentLoadedPages;
      
      const loadPromises = [];
      for (let i = 0; i < pagesToLoad; i++) {
        loadPromises.push(
          dispatch(loadUsers({ page: page + i, limit, sortBy, order }))
        );
      }
      
      Promise.all(loadPromises).then(() => {
        setPaginationPage(newPage);
      });
    } else {
      setPaginationPage(newPage);
    }
  };

  if (loading && data.length === 0) return <LoaderSpinner />;

  return (
    <>
      <div
        id="cardsContainer"
        className="cards-container"
        ref={containerRef}
        style={{ display: data.length ? "block" : "none" }}
      >
        <div id="cardsSpacer" className="cards-spacer">
          <div id="cardsContent" className="cards-content">
            
            {/* Table View - có pagination + scroll load thêm data vào store */}
            <div id="tableView" className="view-wrapper">
              <DataTable paginatedData={paginatedData} />
            </div>

            {/* Card View - chỉ có scroll infinite */}
            <div id="cardView" className="view-wrapper card-list-grid">
              <DataCard />
            </div>

            {/* Loading indicator */}
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

      {/* Pagination Controls - chỉ hiện khi ở Table View */}
      <Pagination
        currentPage={paginationPage}
        totalItems={data.length}
        itemsPerPage={limit}
        hasMore={hasMore}
        loading={loading}
        onPageChange={handlePaginationChange}
      />
    </>
  );
}