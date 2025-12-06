import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { closeModal } from "./ModalSlice.jsx";
import { addUser } from "../../features/users/userThunks.js";
import "../../styles/Modal/AddRecordModal.css";

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
    zipcode: "",
    password: "",
    desc: "",
    country: "",
    fincode: "",
    ip: "",
    job: "",
    jd: "",
    typeofjob: ""
  });

  const [avatarFile, setAvatarFile] = useState(null);
  const [avatarPreview, setAvatarPreview] = useState(null);

  useEffect(() => {
    if (isOpen) resetForm();
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
      zipcode: "",
      password: "",
      desc: "",
      country: "",
      fincode: "",
      ip: "",
      job: "",
      jd: "",
      typeofjob: ""
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
      reader.onload = (event) => setAvatarPreview(event.target.result);
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
          if (width > maxWidth) { height *= maxWidth / width; width = maxWidth; }
          if (height > maxHeight) { width *= maxHeight / height; height = maxHeight; }
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
    if (!avatarFile) { alert("Vui lòng chọn ảnh avatar!"); return; }
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

  const handleClose = () => dispatch(closeModal());
  const handleBackdropClick = (e) => { if (e.target === e.currentTarget) handleClose(); };
  if (!isOpen) return null;

  return (
    <div id="addRecordModal" className={`modal ${isOpen ? "open" : ""}`} onClick={handleBackdropClick}>
      <div className="modal-content">
        <div className="modal-header">
          <h2>Thêm Record Mới</h2>
          <button className="close" onClick={handleClose}>&times;</button>
        </div>

        <form id="addRecordForm" onSubmit={handleSubmit}>
          <div className="form-group avatar-group">
            <label>Avatar *</label>
            <div id="avatarPreview" className="avatar-preview">
              {avatarPreview ? <img src={avatarPreview} alt="Preview" /> :
                <i className="fa-solid fa-user" style={{ fontSize: '40px', color: '#ccc' }}></i>}
            </div>
            <input type="file" name="avatarFile" accept="image/*" onChange={handleAvatarChange} required />
          </div>

          <div className="form-grid">
            {Object.keys(formData).map((key) => (
              <div className="form-group" key={key}>
                <label>{key.charAt(0).toUpperCase() + key.slice(1)}</label>
                <input
                  type={key === "password" ? "password" : "text"}
                  name={key}
                  value={formData[key]}
                  onChange={handleInputChange}
                  required={["name","genre","email","phone","password"].includes(key)}
                />
              </div>
            ))}
          </div>

          <div className="form-actions">
            <button type="button" className="btn-cancel" onClick={handleClose}>Hủy</button>
            <button type="submit" className="btn-submit">Thêm Record</button>
          </div>
        </form>
      </div>
    </div>
  );
}
