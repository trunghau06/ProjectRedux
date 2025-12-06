/**
 * Làm sáng màu hex
 * @param {string} color - Mã màu hex 
 * @param {number} percent - Phần trăm làm sáng (0-100)
 * @returns {string} - Mã màu hex đã làm sáng
 */
export const lightenColor = (color, percent) => {
  if (!color) return "#FFFFFF";

  const hex = color.replace("#", "");
  
  // Chuyển hex sang số
  const num = parseInt(hex, 16);
  
  // Tính toán độ sáng
  const amt = Math.round(2.55 * percent);
  
  // Tách và tăng từng kênh màu RGB
  const R = (num >> 16) + amt;
  const G = ((num >> 8) & 0x00ff) + amt;
  const B = (num & 0x0000ff) + amt;
  
  // Kết hợp lại và đảm bảo giá trị trong khoảng 0-255
  return (
    "#" +
    (
      0x1000000 +
      (R < 255 ? (R < 1 ? 0 : R) : 255) * 0x10000 +
      (G < 255 ? (G < 1 ? 0 : G) : 255) * 0x100 +
      (B < 255 ? (B < 1 ? 0 : B) : 255)
    )
      .toString(16)
      .slice(1)
      .toUpperCase()
  );
};

/**
 * Làm tối màu hex
 * @param {string} color - Mã màu hex
 * @param {number} percent - Phần trăm làm tối (0-100)
 * @returns {string} - Mã màu hex đã làm tối
 */
export const darkenColor = (color, percent) => {
  if (!color) return "#000000";
  
  const hex = color.replace("#", "");
  const num = parseInt(hex, 16);
  const amt = Math.round(2.55 * percent);
  
  const R = (num >> 16) - amt;
  const G = ((num >> 8) & 0x00ff) - amt;
  const B = (num & 0x0000ff) - amt;
  
  return (
    "#" +
    (
      0x1000000 +
      (R > 0 ? R : 0) * 0x10000 +
      (G > 0 ? G : 0) * 0x100 +
      (B > 0 ? B : 0)
    )
      .toString(16)
      .slice(1)
      .toUpperCase()
  );
};