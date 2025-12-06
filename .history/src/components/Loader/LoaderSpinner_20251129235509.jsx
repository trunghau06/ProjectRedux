import '@/styles/Loader/LoaderSpinner.css';
export default function LoaderSpinner() {
    return (
        <div className="loader" id="loader">
            <div className="spinner"></div>
            <div className="loader-text">Đang tải dữ liệu...</div>
        </div>
    );
}