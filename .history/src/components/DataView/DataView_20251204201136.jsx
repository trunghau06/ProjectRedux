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

    // 🔒 Ngăn auto detect trang tự sửa lại prev/next
    const [lockAutoPage, setLockAutoPage] = useState(false);

    useEffect(() => {
        if (data.length === 0 && !loading) {
            dispatch(loadUsers({ page: 1, limit, sortBy, order }));
        }
    }, [dispatch, data.length, loading, limit, sortBy, order]);

    useEffect(() => {
        const handleResize = () => setIsMobile(window.innerWidth <= 768);
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

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

    // ---------------------------
    // CLICK NEXT / PREV
    // ---------------------------
    const handlePaginationChange = async (newPage) => {
        setLockAutoPage(true); 
        setTimeout(() => setLockAutoPage(false), 400); 

        const requiredLength = newPage * limit;

        if (data.length < requiredLength && hasMore) {
            
            let nextAPIPageToLoad = page; 

            // Cần tải bao nhiêu trang nữa để đạt đến newPage
            while (data.length < requiredLength && hasMore) {
                // Tải trang API tiếp theo (sử dụng state.users.page)
                await dispatch(loadUsers({ 
                    page: nextAPIPageToLoad, 
                    limit, sortBy, order 
                }));
                // Cập nhật chỉ số trang API cần tải tiếp theo sau khi dispatch thành công
                // Chúng ta phải đọc lại state.page từ Redux (nếu nó tự tăng) hoặc tính toán
                // Ở đây, ta dùng page (state.users.page) để đảm bảo đồng bộ
                // Do Redux state.page đã được cập nhật thành page + 1 sau khi loadUsers.fulfilled
                // nên ta phải lấy lại giá trị mới nhất của page từ closure, nhưng vì page
                // là dependency của handlePaginationChange, ta sẽ dựa vào state.users.page
                // Nhưng vì handlePaginationChange là async, ta phải dựa vào state.page mới nhất
                // hoặc tính toán lại. Để đơn giản, ta sẽ chỉ dựa vào logic của Slice.
                nextAPIPageToLoad = page + 1; 
            }
        }
        
        setPaginationPage(newPage);
        scrollToPage(newPage);
    };

    const scrollToPage = (pageNumber) => {
        const container = containerRef.current;
        if (!container) return;

        const table = container.querySelector("#tableView");
        const targetView = table && table.style.display !== "none" ? table : container.querySelector("#cardView");

        if (!targetView) return;

        const rows = targetView.querySelectorAll("tbody tr, .data-card-item"); 
        const targetIndex = (pageNumber - 1) * limit;

        if (rows[targetIndex]) {
            const offsetTop = rows[targetIndex].offsetTop;
            container.scrollTo({
                top: offsetTop,
                behavior: "smooth",
            });
        }
    };

    // ---------------------------
    // AUTO UPDATE CURRENT PAGE KHI SCROLL
    // ---------------------------
    useEffect(() => {
        // Tự động đồng bộ paginationPage với trang hiển thị thực tế
        const maxPage = Math.ceil(data.length / limit) || 1;
        setPaginationPage(prevState => Math.min(prevState, maxPage));
        
        if (lockAutoPage) return; 

        const container = containerRef.current;
        if (!container) return;

        const updateCurrentPage = () => {
            const table = container.querySelector("#tableView");
            const targetView = table && table.style.display !== "none" ? table : container.querySelector("#cardView");

            if (!targetView) return;

            const rows = targetView.querySelectorAll("tbody tr, .data-card-item"); 
            if (rows.length === 0) return;

            const containerTop = container.getBoundingClientRect().top;

            for (let i = 0; i < rows.length; i++) {
                const rowTop = rows[i].getBoundingClientRect().top;
                
                // Nếu hàng này nằm trong khoảng nhìn thấy (cách top container 50px trở lại)
                if (rowTop >= containerTop - 50) { 
                    const newPage = Math.floor(i / limit) + 1;
                    if (newPage !== paginationPage) {
                        setPaginationPage(newPage);
                    }
                    break;
                }
            }
        };

        const timer = setTimeout(updateCurrentPage, 120);
        return () => clearTimeout(timer);
    }, [data.length, limit, paginationPage, lockAutoPage]);


    if (loading && data.length === 0) return <LoaderSpinner />;

    // Tính toán currentVisiblePage (trang đang hiển thị) cho Pagination component
    const currentVisiblePage = paginationPage;

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

            <Pagination
                currentPage={currentVisiblePage}
                totalItems={data.length}
                itemsPerPage={limit}
                hasMore={hasMore}
                loading={loading}
                onPageChange={handlePaginationChange}
            />
        </>
    );
}