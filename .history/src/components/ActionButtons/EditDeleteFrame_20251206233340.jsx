import BtnEdit   from './BtnEdit.jsx';
import BtnDelete from './BtnDelete.jsx';
import "../../styles/"; 

export default function EditDeleteFrame({ userId, userData }) {
  return (
    <div className="card-actions">
      <BtnEdit   userId  ={userId} 
                 userData={userData} />
      <BtnDelete userId  ={userId} />
    </div>
  );
}