import "../../../styles/ActionButtons/BtnEdit.css"; 
// Chú ý: Bạn cần tạo file CSS này và sử dụng đường dẫn tương đối đúng (../../styles/ActionButtons/BtnEdit.css)

export default function BtnEdit() {
  return (
    <button className="btn-action edit-icon" title="Chỉnh sửa">
      <i className="fa-solid fa-pen"></i>
    </button>
  );
}