// src/App.jsx
import './App.css';
import Header from './components/Header/Header.jsx';
import BtnAddRecord from './components/ActionButtons/BtnAddRecord.jsx';
import AddRecordModal from './components/AddRecordModal/AddRecordModal.jsx';
import DataView from './components/DataView/DataView.jsx';

function App() {
  return (
    <div className="container">
      <Header />
      <DataView />     
      <BtnAddRecord />
      <AddRecordModal />
    </div>
  );
}

export default App;
