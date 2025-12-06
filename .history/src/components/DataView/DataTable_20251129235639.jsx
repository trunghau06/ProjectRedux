import '../../styles/DataView/DataTable.css';
export default function Data_Table() {
    return (
        <div id="tableView" className="view-wrapper">
            <table className="data-table">
                <thead>
                <tr className="header-row">
                    <th></th>
                    <th>ID</th>
                    <th>Avatar</th>
                    <th>Name</th>
                    <th>Company</th>
                    <th>Genre</th>
                    <th>Email</th>
                    <th>Phone</th>
                    <th>DOB</th>
                    <th>Color</th>
                    <th>Timezone</th>
                    <th>Music</th>
                    <th>City</th>
                    <th>State</th>
                    <th>Address</th>
                    <th>Street</th>
                    <th>Building</th>
                    <th>ZIP</th>
                    <th>CreatedAt</th>
                    <th>Password</th>
                </tr>
                </thead>
                <tbody id="tableBody">
                {/* Dữ liệu render từ Redux */}
                </tbody>
            </table>
        </div>
    );
}