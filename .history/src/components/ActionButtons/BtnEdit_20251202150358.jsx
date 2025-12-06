import "../../../styles/ActionButtons/BtnEdit.css"; 

export default function BtnEdit({ userId, userData }) {
  const handleEdit = () => {
    console.log("Edit user:", userId, userData);
    // TODO: Dispatch openEditModal action
  };

  return (
    <button 
      className="btn-action edit-icon" 
      title="Chỉnh sửa"
      onClick={handleEdit}
    >
      <i className="fa-solid fa-pen"></i>
    </button>
  );
}