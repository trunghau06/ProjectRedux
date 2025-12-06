import ".//styles/ActionButtons/ActionButtons.css"; 

export default function ActionButtons() {
  return (
    <div className="card-actions">
      <button className="btn-action edit-icon" title="Chỉnh sửa">
        <i className="fa-solid fa-pen"></i>
      </button>
      <button className="btn-action delete-icon" title="Xóa">
        <i className="fa-solid fa-trash"></i>
      </button>
    </div>
  );
}
