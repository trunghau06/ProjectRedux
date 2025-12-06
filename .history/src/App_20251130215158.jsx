import './App.css'
import Header from './components/Header/Header.jsx'
import LoaderSpinner from './components/Loader/LoaderSpinner.jsx'
import BtnAddRecord from './components/ActionButtons/BtnAddRecord.jsx'
import DataCard from './components/DataView/DataCard.jsx'
import DataTable from './components/DataView/DataTable.jsx'
import AddRecordModal from './components/AddRecordModal/AddRecordModal.jsx'

function App() {
  return (
    <div className="container">
      <Header />

      <LoaderSpinner />

      <div className="cards-container">
        <div className="cards-spacer">
          <div className="cards-content">

            <DataTable />

            <DataCard />

            <div id="loadingMore" className="loading-more">
              <div>Đang tải thêm...</div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}

export default App
