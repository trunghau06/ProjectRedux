export default function BtnAddRecord({ loading, isOpen }) {
    const dispatch = dispatch();

    const handleClick = () => {
        dispatch(openAddModal());
    };

    if (isOpen || loading) return null; // ẩn luôn khi modal mở hoặc đang load

    return (
        <button 
            id="addRecordBtn" 
            className="add-record-btn"
            onClick={handleClick}
            title="Thêm record mới"
        >
            <i className="fa-solid fa-plus"></i>
        </button>
    );
}
