import './App.css'
import Header from './components/Header.jsx'
import LoaderSpinner from './components/LoaderSpinner.jsx'
import BtnAddRecord from './components/BtnAddRecord.jsx'
import DataCard from './components/DataCard.jsx'
import DataTable from './components/DataTable.jsx'
import AddRecordModal from './components/AddRecordModal.jsx'

function App() {
  return (
    <div className="container">
      <Header />

      {/* Loader Spinner */}
      <LoaderSpinner />

      <div className="cards-container">
        <div className="cards-spacer">
          <div className="cards-content">
            {/*Bảng dữ liệu*/}
            <DataTable />

            {/*Card dữ liệu*/}
            <DataCard />

            {/* Loading thêm */}
            <div id="loadingMore" className="loading-more">
              <div>Đang tải thêm...</div>
            </div>

          </div>
        </div>
      </div>
      {/* Nút thêm bản ghi */}
      <BtnAddRecord />

      {/* Modal thêm bản ghi */}
      <AddRecordModal />
    </div>
  );
}

export default App
