// src/components/ActionButtons/ActionButtons.jsx

import BtnEdit from './BtnEdit.jsx';
import BtnDelete from './BtnDelete.jsx';

// (Tùy chọn) Chỉ import style cho container nếu cần
import "../../styles/ActionButtons/ActionButtons.css"; 

export default function EditDeleteFrame() {
  return (
    <div className="card-actions">
      <BtnEdit />
      <BtnDelete />
    </div>
  );
}