/src/components/ActionButtons/BtnDelete.jsx

import "../../../styles/ActionButtons/BtnDelete.css"; 
// Chú ý: Bạn cần tạo file CSS này và sử dụng đường dẫn tương đối đúng (../../styles/ActionButtons/BtnDelete.css)

export default function BtnDelete() {
  return (
    <button className="btn-action delete-icon" title="Xóa">
      <i className="fa-solid fa-trash"></i>
    </button>
  );
}