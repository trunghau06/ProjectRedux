import './App.css'
import Header from './components/Header.jsx'
import Loader_Spinner from './components/Loader_Spinner.jsx'
import BtnAddRecord from './components/BtnAddRecord.jsx'
import DataCard from './components/DataCard.jsx'
import DataTable from './components/DataTable.jsx'
import AddRecordModal from './components/AddRecordModal.jsx'

function App() {
  return (
    <div className="container">
      <Header />

      {/* Loader Spinner */}
      <Loader_Spinner />

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
      Bt
    </div>
  )
}

export default App
