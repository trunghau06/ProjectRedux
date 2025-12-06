import React            from "react";
import { useDispatch }  from "react-redux";
import { openAddModal } from "../../components/Modal/ModalSlice.jsx";
import "../../styles/ActionButtons/BtnAddRecord.css";

export default function BtnAddRecord({ hide }) {
  const dispatch = useDispatch();

  const handleClick = () => {
    dispatch(openAddModal());
  };

  return (
    <button
      id="addRecordBtn"
      className="add-record-btn"
      onClick={handleClick}
      title="Thêm record mới"
      style={{ display: hide ? "none" : "flex" }} // ẩn cả nút
    >
      <i className="fa-solid fa-plus"></i>
    </button>
  );
}
