import '@/styles/AddRecordModalAddRecordModal.css';

export default function AddRecordModal() {
  return (
    <div id="addRecordModal" className="modal">
      <div className="modal-content">
        <div className="modal-header">
          <h2>Thêm Record Mới</h2>
          <span id="closeModalBtn" className="close">&times;</span>
        </div>
        <form id="addRecordForm">
          <div className="form-grid">
            <div className="form-group">
              <label htmlFor="dob">DOB:</label>
              <input type="datetime-local" name="dob" />
            </div>

            <div className="form-group">
              <label htmlFor="name">Name:</label>
              <input type="text" id="name" name="name" placeholder="Tối thiểu 20 ký tự" required />
            </div>

            <div className="form-group">
              <label htmlFor="company">Company:</label>
              <input type="text" id="company" name="company" required />
            </div>

            <div className="form-group">
              <label htmlFor="genre">Gender:</label>
              <select id="genre" name="genre" required>
                <option value="">-- Chọn giới tính --</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
              </select>
            </div>

            <div className="form-group">
              <label htmlFor="email">Email:</label>
              <input type="email" id="email" name="email" placeholder="abc@gmail.com" required />
            </div>

            <div className="form-group">
              <label htmlFor="phone">Phone:</label>
              <input type="tel" id="phone" name="phone" placeholder="Chỉ được nhập số (vd: 0123456789)" required />
            </div>

            <div className="form-group">
              <label htmlFor="color">Color:</label>
              <input type="color" id="color" name="color" defaultValue="#ffffff" required />
            </div>

            <div className="form-group">
              <label htmlFor="timezone">Timezone:</label>
              <input type="text" id="timezone" name="timezone" placeholder="GMT+7" required />
            </div>

            <div className="form-group">
              <label htmlFor="music">Favorite Music:</label>
              <input type="text" id="music" name="music" required />
            </div>

            <div className="form-group">
              <label htmlFor="city">City:</label>
              <input type="text" id="city" name="city" required />
            </div>

            <div className="form-group">
              <label htmlFor="state">State:</label>
              <input type="text" id="state" name="state" required />
            </div>

            <div className="form-group">
              <label htmlFor="address">Address:</label>
              <input type="text" id="address" name="address" required />
            </div>

            <div className="form-group">
              <label htmlFor="street">Street:</label>
              <input type="text" id="street" name="street" required />
            </div>

            <div className="form-group">
              <label htmlFor="building">Building:</label>
              <input type="text" id="building" name="building" required />
            </div>

            <div className="form-group">
              <label htmlFor="zip">ZIP Code:</label>
              <input type="text" id="zip" name="zip" required />
            </div>

            <div className="form-group">
              <label htmlFor="password">Password:</label>
              <input type="password" id="password" name="password" placeholder="Tối thiểu 8 ký tự: Chữ HOA, chữ thường, số, ký tự đặc biệt (!@#$...)" required />
            </div>

            <div className="form-group full-width">
              <label htmlFor="avatarFile">Avatar:</label>
              <div className="avatar-upload-container">
                <div className="avatar-preview" id="avatarPreview">
                  <i className="fa-solid fa-user" style={{ fontSize: 40, color: "#ccc" }}></i>
                </div>
                <div className="avatar-upload-controls">
                  <input type="file" id="avatarFile" name="avatarFile" accept="image/*" />
                </div>
              </div>
            </div>
          </div>

          <div className="modal-footer">
            <button type="button" id="cancelBtn" className="btn-cancel">Thoát</button>
            <button type="submit" className="btn-submit">Thêm Record</button>
          </div>
        </form>
      </div>
    </div>
  );
}
