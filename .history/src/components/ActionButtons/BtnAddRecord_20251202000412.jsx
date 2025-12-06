import React from "react";
import { useDispatch } from "react-redux";
import { openAddModal } from "../../components/Modal/ModalSlice.jsx";
import "../..";

export default function BtnAddRecord() {
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
    >
      <i className="fa-solid fa-plus"></i>
    </button>
  );
}