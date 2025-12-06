import './App.css'
import Header from './components/Header/Header.jsx'
import LoaderSpinner from './components/Loader/LoaderSpinner.jsx'
import BtnAddRecord from './components/ActionButtons/BtnAddRecord.jsx'
import DataCard from './components/DataView/DataCard.jsx'
import DataTable from './components/DataView/DataTable.jsx'
import AddRecordModal from './components/AddRecordModal/AddRecordModal.jsx'
import MainContent from './components/MainContent/MainContent.jsx'

function App() {
  return (
    <>
      <div className="container">
        <Header />
        <LoaderSpinner />

        <MainContent
          TableComponent={<DataTable />}
          CardComponent={<DataCard />}
          LoadingComponent={<LoadingMore />}
        />

        <BtnAddRecord />
        <AddRecordModal />
      </div>
    </>
  );
}

export default App
