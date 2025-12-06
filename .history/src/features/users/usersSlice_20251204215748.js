export default function Pagination({
    currentPage,
    hasMore,
    loading,
    onPageChange
}) {
    
    // totalPages chỉ đơn giản vậy thôi
    const totalPages = hasMore ? currentPage + 1 : currentPage;

    const handlePrev = () => {
        if (currentPage > 1 && !loading) {
            onPageChange(currentPage - 1);
        }
    };

    const handleNext = () => {
        if (!loading && hasMore) {
            onPageChange(currentPage + 1);
        }
    };

    return (
        <div className="pagination-container">
            <button 
                onClick={handlePrev}
                disabled={currentPage <= 1 || loading}
            >
                ← Prev
            </button>

            <div className="pagination-info">
                Trang {currentPage} / {totalPages}
            </div>

            <button 
                onClick={handleNext}
                disabled={!hasMore || loading}
            >
                Next →
            </button>
        </div>
    );
}
