import BtnEdit   from './BtnEdit.jsx';
import BtnDelete from './BtnDelete.jsx';
import "../../styles/ActionButtons/EditDeleteFrame.css"; 

export default function EditDeleteFrame({ userId, userData }) {
  return (
    <div className="card-actions">
      <BtnEdit u serId={userId} userData={userData} />
      <BtnDelete userId={userId} />
    </div>
  );
}