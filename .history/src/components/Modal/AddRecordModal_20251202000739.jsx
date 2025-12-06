import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { closeModal } from "../../components/Modal/ModalSlice.jsx";
import { addUser } from "../../features/users/userThunks.js";
import "../../styles/Modal.css";

export default function AddRecordModal() {
  const dispatch = useDispatch();
  const { isOpen } = useSelector(state => state.modal);
  
  const [formData, setFormData] = useState({
    name: "",
    company: "",
    genre: "male",
    email: "",
    phone: "",
    dob: "",
    color: "#ffffff",
    timezone: "",
    music: "",
    city: "",
    state: "",
    address: "",
    street: "",
    building: "",
    zip: "",
    password: ""
  });
  
  const [avatarFile, setAvatarFile] = useState(null);
  const [avatarPreview, setAvatarPreview] = useState(null);

  useEffect(() => {
    if (isOpen) {
      resetForm();
    }
  }, [isOpen]);

  const resetForm = () => {
    setFormData({
      name: "",
      company: "",
      genre: "male",
      email: "",
      phone: "",
      dob: "",
      color: "#ffffff",
      timezone: "",
      music: "",
      city: "",
      state: "",
      address: "",
      street: "",
      building: "",
      zip: "",
      password: ""
    });
    setAvatarFile(null);
    setAvatarPreview(null);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleAvatarChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setAvatarFile(file);
      const reader = new FileReader();
      reader.onload = (event) => {
        setAvatarPreview(event.target.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const resizeImage = (file, maxWidth = 80, maxHeight = 80) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = (event) => {
        const img = new Image();
        img.onload = () => {
          let { width, height } = img;
          if (width > maxWidth) {
            height = height * (maxWidth / width);
            width = maxWidth;
          }
          if (height > maxHeight) {
            width = width * (maxHeight / height);
            height = maxHeight;
          }
          const canvas = document.createElement("canvas");
          canvas.width = width;
          canvas.height = height;
          const ctx = canvas.getContext("2d");
          ctx.drawImage(img, 0, 0, width, height);
          resolve(canvas.toDataURL("image/png"));
        };
        img.onerror = reject;
        img.src = event.target.result;
      };
      reader.onerror = reject;
      reader.readAsDataURL(file);
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!avatarFile) {
      alert("Vui lòng chọn ảnh avatar!");
      return;
    }

    const avatarUrl = await resizeImage(avatarFile, 80, 80);

    const recordData = {
      ...formData,
      avatar: avatarUrl,
      createdAt: new Date().toISOString()
    };

    try {
      await dispatch(addUser(recordData)).unwrap();
      alert("Thêm record thành công!");
      dispatch(closeModal());
    } catch (error) {
      console.error("Error:", error);
      alert("Lỗi khi thêm record!");
    }
  };

  const handleClose = () => {
    dispatch(closeModal());
  };

  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) {
      handleClose();
    }
  };

  if (!isOpen) return null;

  return (
    <div id="addRecordModal" className="modal" onClick={handleBackdropClick}>
      <div className="modal-content">
        <div className="modal-header">
          <h2>Thêm Record Mới</h2>
          <button 
            id="closeModalBtn" 
            className="close-btn" 
            onClick={handleClose}
          >
            &times;
          </button>
        </div>

        <form id="addRecordForm" onSubmit={handleSubmit}>
          <div className="form-group avatar-group">
            <label>Avatar *</label>
            <div id="avatarPreview" className="avatar-preview">
              {avatarPreview ? (
                <img src={avatarPreview} alt="Preview" />
              ) : (
                <i className="fa-solid fa-user" style={{ fontSize: '40px', color: '#ccc' }}></i>
              )}
            </div>
            <input
              type="file"
              id="avatarFile"
              name="avatarFile"
              accept="image/*"
              onChange={handleAvatarChange}
              required
            />
          </div>

          <div className="form-grid">
            <div className="form-group">
              <label>Name *</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                required
                minLength="20"
              />
            </div>

            <div className="form-group">
              <label>Company</label>
              <input
                type="text"
                name="company"
                value={formData.company}
                onChange={handleInputChange}
              />
            </div>

            <div className="form-group">
              <label>Genre *</label>
              <select
                name="genre"
                value={formData.genre}
                onChange={handleInputChange}
                required
              >
                <option value="male">Male</option>
                <option value="female">Female</option>
              </select>
            </div>

            <div className="form-group">
              <label>Email *</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                required
                pattern="[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}"
                title="Email không đúng định dạng (vd: abc@gmail.com)"
              />
            </div>

            <div className="form-group">
              <label>Phone *</label>
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleInputChange}
                required
                pattern="[0-9]+"
                title="Chỉ được nhập số"
              />
            </div>

            <div className="form-group">
              <label>DOB</label>
              <input
                type="datetime-local"
                name="dob"
                value={formData.dob}
                onChange={handleInputChange}
              />
            </div>

            <div className="form-group">
              <label>Color</label>
              <input
                type="color"
                name="color"
                value={formData.color}
                onChange={handleInputChange}
              />
            </div>

            <div className="form-group">
              <label>Timezone</label>
              <input
                type="text"
                name="timezone"
                value={formData.timezone}
                onChange={handleInputChange}
              />
            </div>

            <div className="form-group">
              <label>Music</label>
              <input
                type="text"
                name="music"
                value={formData.music}
                onChange={handleInputChange}
              />
            </div>

            <div className="form-group">
              <label>City</label>
              <input
                type="text"
                name="city"
                value={formData.city}
                onChange={handleInputChange}
              />
            </div>

            <div className="form-group">
              <label>State</label>
              <input
                type="text"
                name="state"
                value={formData.state}
                onChange={handleInputChange}
              />
            </div>

            <div className="form-group">
              <label>Address</label>
              <input
                type="text"
                name="address"
                value={formData.address}
                onChange={handleInputChange}
              />
            </div>

            <div className="form-group">
              <label>Street</label>
              <input
                type="text"
                name="street"
                value={formData.street}
                onChange={handleInputChange}
              />
            </div>

            <div className="form-group">
              <label>Building</label>
              <input
                type="text"
                name="building"
                value={formData.building}
                onChange={handleInputChange}
              />
            </div>

            <div className="form-group">
              <label>ZIP</label>
              <input
                type="text"
                name="zip"
                value={formData.zip}
                onChange={handleInputChange}
              />
            </div>

            <div className="form-group">
              <label>Password *</label>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleInputChange}
                required
               pattern="(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*()_+\\-=[\\]{};':\"\\|,.<>/?]).{8,}"

                title="Password phải chứa ít nhất 8 ký tự: chữ HOA, chữ thường, số và ký tự đặc biệt"
              />
            </div>
          </div>

          <div className="form-actions">
            <button type="button" id="cancelBtn" onClick={handleClose}>
              Hủy
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