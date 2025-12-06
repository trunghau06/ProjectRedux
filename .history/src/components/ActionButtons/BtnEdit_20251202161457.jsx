import { useDispatch }   from "react-redux";
import { openEditModal } from "../Modal/ModalSlice.jsx";
import "../../styles/ActionButtons/BtnEdit.css"; 

export default function BtnEdit({ useruserData }) {
  const dispatch   = useDispatch();

  const handleEdit = () => {
    dispatch(openEditModal(userData)); 
  };

  return (
    <button 
      className="btn-action edit-icon" 
      title    ="Chỉnh sửa"
      onClick  ={handleEdit}
    >
      <i className="fa-solid fa-pen"></i>
    </button>
  );
}