// src/App.jsx
import './App.css';
import Header from './components/Header/Header.jsx';
import BtnAddRecord from './components/ActionButtons/BtnAddRecord.jsx';
import Moda from './components/Modal/ModalAction.jsx';
import DataView from './components/DataView/DataView.jsx';

function App() {
  return (
    <div className="container">
      <Header />
      <DataView />     
      <BtnAddRecord />
      <ModalAction />
    </div>
  );
}

export default App;
