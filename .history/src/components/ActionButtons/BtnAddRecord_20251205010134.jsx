import React            from "react";
import { useDispatch }  from "react-redux";
import { openAddModal } from "../../components/Modal/ModalSlice.jsx";
import "../../styles/ActionButtons/BtnAddRecord.css";

export default function BtnAddRecord({ loading, isOpen }) {
    const dispatch = useDispatch();

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