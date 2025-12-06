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

      {/* UI loader */}
      <Loader />

      {/* Bọc danh sách */}
      <div className="cards-container">
        <div className="cards-spacer">
          <div className="cards-content">

            {/* VIEW TABLE */}
            <UserTable />

            {/* VIEW CARD GRID */}
            <UserCardGrid />

            {/* Loading thêm */}
            <div id="loadingMore" className="loading-more">
              <div>Đang tải thêm...</div>
            </div>

          </div>
        </div>
      </div>

      {/* Floating Add Button */}
      <FloatingAddButton />

      {/* Modal thêm user */}
      <AddRecordModal />
    </div>
  );
}

export default App
