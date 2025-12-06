import { useState } from "react";

export default function AddRecordModal() {
  const [formData, setFormData] = useState({
    dob: "",
    name: "",
    company: "",
    genre: "",
    email: "",
    phone: "",
    color: "#ffffff",
    timezone: "",
    music: "",
    city: "",
    state: "",
    address: "",
    street: "",
    building: "",
    zip: "",
    password: "",
    avatarFile: null,
  });

  const handleChange = (e) => {
    const { name, value, type, files } = e.target;
    if (type === "file") {
      setFormData({ ...formData, [name]: files[0] });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Submitting:", formData);
    // Thêm xử lý submit API ở đây
  };

  const handleCancel = () => {
    // Reset form hoặc đóng modal
    setFormData({
      dob: "",
      name: "",
      company: "",
      genre: "",
      email: "",
      phone: "",
      color: "#ffffff",
      timezone: "",
      music: "",
      city: "",
      state: "",
      address: "",
      street: "",
      building: "",
      zip: "",
      password: "",
      avatarFile: null,
    });
    // code đóng modal ở đây
  };

  return (
    <div id="addRecordModal" className="modal">
      <div className="modal-content">
        <div className="modal-header">
          <h2>Thêm Record Mới</h2>
          <span id="closeModalBtn" className="close" onClick={handleCancel}>
            &times;
          </span>
        </div>
        <form id="addRecordForm" onSubmit={handleSubmit}>
          <div className="form-grid">
            <div className="form-group">
              <label htmlFor="dob">DOB:</label>
              <input
                type="datetime-local"
                name="dob"
                value={formData.dob}
                onChange={handleChange}
              />
            </div>

            <div className="form-group">
              <label htmlFor="name">Name:</label>
              <input
                type="text"
                id="name"
                name="name"
                placeholder="Tối thiểu 20 ký tự"
                required
                value={formData.name}
                onChange={handleChange}
              />
            </div>

            <div className="form-group">
              <label htmlFor="company">Company:</label>
              <input
                type="text"
                id="company"
                name="company"
                required
                value={formData.company}
                onChange={handleChange}
              />
            </div>

            <div className="form-group">
              <label htmlFor="genre">Gender:</label>
              <select
                id="genre"
                name="genre"
                required
                value={formData.genre}
                onChange={handleChange}
              >
                <option value="">-- Chọn giới tính --</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
              </select>
            </div>

            <div className="form-group">
              <label htmlFor="email">Email:</label>
              <input
                type="email"
                id="email"
                name="email"
                placeholder="abc@gmail.com"
                required
                value={formData.email}
                onChange={handleChange}
              />
            </div>

            <div className="form-group">
              <label htmlFor="phone">Phone:</label>
              <input
                type="tel"
                id="phone"
                name="phone"
                placeholder="Chỉ được nhập số (vd: 0123456789)"
                required
                value={formData.phone}
                onChange={handleChange}
              />
            </div>

            <div className="form-group">
              <label htmlFor="color">Color:</label>
              <input
                type="color"
                id="color"
                name="color"
                value={formData.color}
                required
                onChange={handleChange}
              />
            </div>

            <div className="form-group">
              <label htmlFor="timezone">Timezone:</label>
              <input
                type="text"
                id="timezone"
                name="timezone"
                placeholder="GMT+7"
                required
                value={formData.timezone}
                onChange={handleChange}
              />
            </div>

            <div className="form-group">
              <label htmlFor="music">Favorite Music:</label>
              <input
                type="text"
                id="music"
                name="music"
                required
                value={formData.music}
                onChange={handleChange}
              />
            </div>

            <div className="form-group">
              <label htmlFor="city">City:</label>
              <input
                type="text"
                id="city"
                name="city"
                required
                value={formData.city}
                onChange={handleChange}
              />
            </div>

            <div className="form-group">
              <label htmlFor="state">State:</label>
              <input
                type="text"
                id="state"
                name="state"
                required
                value={formData.state}
                onChange={handleChange}
              />
            </div>

            <div className="form-group">
              <label htmlFor="address">Address:</label>
              <input
                type="text"
                id="address"
                name="address"
                required
                value={formData.address}
                onChange={handleChange}
              />
            </div>

            <div className="form-group">
              <label htmlFor="street">Street:</label>
              <input
                type="text"
                id="street"
                name="street"
                required
                value={formData.street}
                onChange={handleChange}
              />
            </div>

            <div className="form-group">
              <label htmlFor="building">Building:</label>
              <input
                type="text"
                id="building"
                name="building"
                required
                value={formData.building}
                onChange={handleChange}
              />
            </div>

            <div className="form-group">
              <label htmlFor="zip">ZIP Code:</label>
              <input
                type="text"
                id="zip"
                name="zip"
                required
                value={formData.zip}
                onChange={handleChange}
              />
            </div>

            <div className="form-group">
              <label htmlFor="password">Password:</label>
              <input
                type="password"
                id="password"
                name="password"
                placeholder="Tối thiểu 8 ký tự: Chữ HOA, chữ thường, số, ký tự đặc biệt (!@#$...)"
                required
                value={formData.password}
                onChange={handleChange}
              />
            </div>

            <div className="form-group full-width">
              <label htmlFor="avatarFile">Avatar:</label>
              <div className="avatar-upload-container">
                <div className="avatar-preview" id="avatarPreview">
                  {formData.avatarFile ? (
                    <img src={URL.createObjectURL(formData.avatarFile)} alt="avatar" />
                  ) : (
                    <i className="fa-solid fa-user" style={{ fontSize: "40px", color: "#ccc" }}></i>
                  )}
                </div>
                <div className="avatar-upload-controls">
                  <input
                    type="file"
                    id="avatarFile"
                    name="avatarFile"
                    accept="image/*"
                    onChange={handleChange}
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="modal-footer">
            <button type="button" className="btn-cancel" onClick={handleCancel}>
              Thoát
            </button>
            <button type="submit" className="btn-submit">
              Thêm Record
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
