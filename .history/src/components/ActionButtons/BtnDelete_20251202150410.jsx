import "../../../styles/ActionButtons/BtnDelete.css"; 

export default function BtnDelete({ userId }) {
  const handleDelete = () => {
    if (window.confirm(`Bạn chắc chắn muốn xóa user ID: ${userId}?`)) {
      console.log("Delete user:", userId);
      // TODO: Dispatch deleteUser action
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