import './App.css';
import Header from './components/Header/Header.jsx';
import BtnAddRecord from './components/ActionButtons/BtnAddRecord.jsx';
import ModalAction from './components/Modal/ModalAction.jsx';
import DataView from './components/DataView/DataView.jsx';
import PaginationWrapper from './components/DataView/';

function App() {
  return (
    <>
      <div className="container">
        <Header />
        <DataView />     
        <BtnAddRecord />
        <ModalAction />
      </div>

      <PaginationWrapper />
    </>
  );
}

export default App;