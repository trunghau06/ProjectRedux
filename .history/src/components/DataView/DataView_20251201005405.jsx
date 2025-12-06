import React, { useEffect, useRef, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loadUsers } from "../../features/users/userThunks";
import DataTable from "./DataTable";
import DataCard from "./DataCard";

export default function DataView() {
  const dispatch = useDispatch();
  const { data, loading, page, hasMore } = useSelector(state => state.users);
  const containerRef = useRef(null);
  const isLoadingRef = useRef(false);

  // Load trang đầu tiên
  useEffect(() => {
    dispatch(loadUsers({ page: 1, limit: 10 }));
  }, [dispatch]);

  const handleScroll = useCallback(() => {
    const container = containerRef.current;
    
    // Không load nếu: đang loading, không có container, hoặc hết data
    if (!container || loading || isLoadingRef.current || !hasMore) return;

    const { scrollTop, scrollHeight, clientHeight } = container;
    
    // Khi scroll gần đến cuối (còn 200px)
    if (scrollHeight - scrollTop <= clientHeight + 200) {
      console.log("Loading more... Page:", page);
      isLoadingRef.current = true;
      dispatch(loadUsers({ page: page, limit: 10 }))
        .finally(() => {
          isLoadingRef.current = false;
        });
    }
  }, [dispatch, loading, page, hasMore]);

  useEffect(() => {
    const container = containerRef.current;
    if (container) {
      container.addEventListener('scroll', handleScroll);
      return () => container.removeEventListener('scroll', handleScroll);
    }
  }, [handleScroll]);

  return (
    <div 
      id="cardsContainer" 
      className="cards-container" 
      ref={containerRef}
      style={{ display: data.length ? 'block' : 'none' }}
    >
      <div id="cardsSpacer" className="cards-spacer">
        <div id="cardsContent" className="cards-content">
          
          {/* Desktop - Table */}
          <div id="tableView" className="view-wrapper">
            <DataTable />
          </div>

          {/* Mobile - Card */}
          <div id="cardView" className="view-wrapper card-list-grid">
            <DataCard />
          </div>

          {/* Loading */}
          {loading && (
            <div id="loadingMore" className="loading-more" style={{ display: 'block' }}>
              <div>Đang tải thêm dữ liệu...</div>
            </div>
          )}

          {/* End of data */}
          {!hasMore && data.length > 0 && (
            <div style={{ textAlign: 'center', padding: '20px', color: '#666' }}>
              Đã tải hết dữ liệu
            </div>
          )}
        </div>
      </div>
    </div>
  );
}