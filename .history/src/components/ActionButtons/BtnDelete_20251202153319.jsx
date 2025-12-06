import { useDispatch } from "react-redux";
import { deleteUser } from "../";
import "../../styles/ActionButtons/BtnDelete.css"; 

export default function BtnDelete({ userId }) {
  const dispatch = useDispatch();

  const handleDelete = async () => {
    if (window.confirm(`Bạn chắc chắn muốn xóa user ID: ${userId}?`)) {
      try {
        await dispatch(deleteUser(userId)).unwrap();
        alert("Xóa thành công!");
      } catch (error) {
        console.error("Delete error:", error);
        alert("Lỗi khi xóa: " + error.message);
      }
    }
  };

  return (
    <button 
      className="btn-action delete-icon" 
      title="Xóa"
      onClick={handleDelete}
    >
      <i className="fa-solid fa-trash"></i>
    </button>
  );
}