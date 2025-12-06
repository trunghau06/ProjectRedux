import BtnEdit from './BtnEdit.jsx';
import BtnDelete from './BtnDelete.jsx';

import "../../styles/ActionButtons/Edit."; 

export default function EditDeleteFrame() {
  return (
    <div className="card-actions">
      <BtnEdit />
      <BtnDelete />
    </div>
  );
}