import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { closeModal } from "../Modal/ModalSlice.jsx";
import { addUser, editUser } from "../../features/users/userThunks"; 
import "../../styles/Modal/ModalAction.css";

export default function AddRecordModal() {
  const dispatch = useDispatch();
  const { isOpen, isEditMode, editingUser } = useSelector(state => state.modal);
  
  const [formData, setFormData] = useState({
    name     : "",
    company  : "",
    genre    : "male",
    email    : "",
    phone    : "",
    dob      : "",
    color    : "#ffffff",
    timezone : "",
    music    : "",
    city     : "",
    state    : "",
    country  : "",
    address  : "",
    street   : "",
    building : "",
    zip      : "",
    password : "",
    desc     : "",
    fincode  : "",
    ip       : "",
    job      : "",
    jd       : "",
    typeofjob: ""
  });
  
  const [avatarFile, setAvatarFile] = useState(null);
  const [avatarPreview, setAvatarPreview] = useState(null);

  useEffect(() => {
    if (isOpen) {
      if (isEditMode && editingUser) {
        setFormData({
          name     : editingUser.name            || "",
          company  : editingUser.company         || "",
          genre    : editingUser.genre           || "male",
          email    : editingUser.email          || "",
          phone    : editingUser.phone          || "",
          dob      : formatDobForInput(editingUser.dob) || "",
          color    : editingUser.color          || "#ffffff",
          timezone : editingUser.timezone    || "",
          music    : editingUser.music          || "",
          city     : editingUser.city            || "",
          state    : editingUser.state          || "",
          country  : editingUser.country      || "",
          address  : editingUser.address      || "",
          street   : editingUser.street        || "",
          building : editingUser.building    || "",
          zip      : editingUser.zip              || editingUser.zipcode || "",
          password : editingUser.password    || "",
          desc     : editingUser.desc              || "",
          fincode  : editingUser.fincode           || "",
          ip       : editingUser.ip                || "",
          job      : editingUser.job               || "",
          jd       : editingUser.jd        || "",
          typeofjob: editingUser.typeofjob || ""
        });
        setAvatarPreview(editingUser.avatar || null);
      } else {
        resetForm();
      }
    }
  }, [isOpen, isEditMode, editingUser]);

  const formatDobForInput = (dobString) => {
    if (!dobString) return "";
    
    let date = new Date(dobString);
    if (isNaN(date.getTime())) {
      const parts = dobString.split('-');
      if (parts.length === 3) {
        date = new Date(parts[0], parts[1] - 1, parts[2]);
      } else return "";
    }

    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');

    return `${year}-${month}-${day}T${hours}:${minutes}`;
  };

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
      country: "",
      address: "",
      street: "",
      building: "",
      zip: "",
      password: "",
      desc: "",
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

    if (!isEditMode && !avatarFile) {
      alert("Vui lòng chọn ảnh avatar!");
      return;
    }

    let avatarUrl = editingUser?.avatar || "";
    
    if (avatarFile) {
      avatarUrl = await resizeImage(avatarFile, 80, 80);
    }

    const recordData = {
      ...formData,
      avatar: avatarUrl,
      createdAt: isEditMode ? editingUser.createdAt : new Date().toISOString()
    };

    try {
      if (isEditMode) {
        await dispatch(editUser({ 
          id: editingUser.id, 
          updates: recordData 
        })).unwrap();
        alert("Sửa record thành công!");
      } else {
        await dispatch(addUser(recordData)).unwrap();
        alert("Thêm record thành công!");
      }
      dispatch(closeModal());
    } catch (error) {
      console.error("Error:", error);
      alert(isEditMode ? "Lỗi khi sửa record!" : "Lỗi khi thêm record!");
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
          <h2>{isEditMode ? "Chỉnh Sửa Record" : "Thêm Record Mới"}</h2>
          <button 
            id="closeModalBtn" 
            className="close"
            onClick={handleClose}
          >
            &times;
          </button>
        </div>

        <form id="addRecordForm" onSubmit={handleSubmit}>
          {/* Avatar */}
          <div className="form-group avatar-group">
            <label>Avatar {!isEditMode && "*"}</label>
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
              required={!isEditMode}
            />
          </div>

          <div className="form-grid">
            {/* 1. Name */}
            <div className="form-group">
              <label>Name *</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                placeholder="Nhập tên (tối thiểu 20 ký tự)"
                required
                minLength="20"
              />
            </div>

            {/* 2. Company */}
            <div className="form-group">
              <label>Company</label>
              <input
                type="text"
                name="company"
                value={formData.company}
                onChange={handleInputChange}
                placeholder="Nhập công ty"
              />
            </div>

            {/* 3. Genre */}
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

            {/* 4. Email */}
            <div className="form-group">
              <label>Email *</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                placeholder="example@gmail.com"
                required
                pattern="^[a-zA-Z0-9._]+@[a-zA-Z0-9.\-]+\.[a-zA-Z]{2,}$"
                title="Email không đúng định dạng"
              />
            </div>

            {/* 5. Phone */}
            <div className="form-group">
              <label>Phone *</label>
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleInputChange}
                placeholder="0123456789"
                required
                pattern="[0-9]+"
                title="Chỉ được nhập số"
              />
            </div>

            {/* 6. DOB */}
            <div className="form-group">
              <label>DOB</label>
              <input
                type="datetime-local"
                name="dob"
                value={formData.dob}
                onChange={handleInputChange}
              />
            </div>

            {/* 7. Color */}
            <div className="form-group">
              <label>Color</label>
              <input
                type="color"
                name="color"
                value={formData.color}
                onChange={handleInputChange}
              />
            </div>

            {/* 8. Timezone */}
            <div className="form-group">
              <label>Timezone</label>
              <input
                type="text"
                name="timezone"
                value={formData.timezone}
                onChange={handleInputChange}
                placeholder="GMT+7, UTC+0..."
              />
            </div>

            {/* 9. Music */}
            <div className="form-group">
              <label>Music</label>
              <input
                type="text"
                name="music"
                value={formData.music}
                onChange={handleInputChange}
                placeholder="Thể loại nhạc yêu thích"
              />
            </div>

            {/* 10. City */}
            <div className="form-group">
              <label>City</label>
              <input
                type="text"
                name="city"
                value={formData.city}
                onChange={handleInputChange}
                placeholder="Thành phố"
              />
            </div>

            {/* 11. State */}
            <div className="form-group">
              <label>State</label>
              <input
                type="text"
                name="state"
                value={formData.state}
                onChange={handleInputChange}
                placeholder="Tiểu bang / Tỉnh"
              />
            </div>

            {/* 12. Country */}
            <div className="form-group">
              <label>Country</label>
              <input
                type="text"
                name="country"
                value={formData.country}
                onChange={handleInputChange}
                placeholder="Quốc gia"
              />
            </div>

            {/* 13. Address */}
            <div className="form-group">
              <label>Address</label>
              <input
                type="text"
                name="address"
                value={formData.address}
                onChange={handleInputChange}
                placeholder="Địa chỉ"
              />
            </div>

            {/* 14. Street */}
            <div className="form-group">
              <label>Street</label>
              <input
                type="text"
                name="street"
                value={formData.street}
                onChange={handleInputChange}
                placeholder="Tên đường"
              />
            </div>

            {/* 15. Building */}
            <div className="form-group">
              <label>Building</label>
              <input
                type="text"
                name="building"
                value={formData.building}
                onChange={handleInputChange}
                placeholder="Tòa nhà"
              />
            </div>

            {/* 16. ZIP */}
            <div className="form-group">
              <label>ZIP</label>
              <input
                type="text"
                name="zip"
                value={formData.zip}
                onChange={handleInputChange}
                placeholder="Mã bưu điện"
              />
            </div>

            {/* 17. Password */}
            <div className="form-group">
              <label>Password *</label>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleInputChange}
                placeholder="Bao gồm chữ hoa, thường, số và ký tự đặc biệt"
                required
                pattern="(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[^a-zA-Z0-9]).{8,}"
                title="Password: chữ HOA, chữ thường, số và ký tự đặc biệt"
              />
            </div>

            {/* 18. Description */}
            <div className="form-group">
              <label>Description</label>
              <input
                type="text"
                name="desc"
                value={formData.desc}
                onChange={handleInputChange}
                placeholder="Mô tả"
              />
            </div>

            {/* 19. Fincode */}
            <div className="form-group">
              <label>Fincode</label>
              <input
                type="text"
                name="fincode"
                value={formData.fincode}
                onChange={handleInputChange}
                placeholder="Mã tài chính"
              />
            </div>

            {/* 20. IP */}
            <div className="form-group">
              <label>IP</label>
              <input
                type="text"
                name="ip"
                value={formData.ip}
                onChange={handleInputChange}
                placeholder="192.168.1.1"
              />
            </div>

            {/* 21. Job */}
            <div className="form-group">
              <label>Job</label>
              <input
                type="text"
                name="job"
                value={formData.job}
                onChange={handleInputChange}
                placeholder="Nghề nghiệp"
              />
            </div>

            {/* 22. JD */}
            <div className="form-group">
              <label>JD</label>
              <input
                type="text"
                name="jd"
                value={formData.jd}
                onChange={handleInputChange}
                placeholder="Job Description"
              />
            </div>

            {/* 23. Type of Job */}
            <div className="form-group">
              <label>Type of Job</label>
              <input
                type="text"
                name="typeofjob"
                value={formData.typeofjob}
                onChange={handleInputChange}
                placeholder="Full-time, Part-time..."
              />
            </div>
          </div>

          <div className="form-actions">
            <button type="button" id="cancelBtn" onClick={handleClose}>
              Hủy
            </button>
            <button type="submit" className="btn-submit">
              {isEditMode ? "Cập Nhật" : "Thêm Record"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}