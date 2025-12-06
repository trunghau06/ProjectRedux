// src/utils/colorUtils.js

/**
 * Làm sáng màu hex (ĐÚNG với code cũ)
 * @param {string} color - Mã màu hex (vd: "#FF5733")
 * @param {number} percent - Phần trăm làm sáng (0-100)
 * @returns {string} - Mã màu RGB
 */
export const lightenColor = (color, percent) => {
  if (!color) return "rgb(255, 255, 255)";
  
  // Loại bỏ dấu #
  const hexColor = color.replace("#", "");
  
  // Tách các kênh màu RGB
  let r = parseInt(hexColor.substring(0, 2), 16);
  let g = parseInt(hexColor.substring(2, 4), 16);
  let b = parseInt(hexColor.substring(4, 6), 16);
  
  // Công thức: Tăng màu từ giá trị hiện tại lên 255
  r = Math.min(255, Math.floor(r + (255 - r) * percent / 100));
  g = Math.min(255, Math.floor(g + (255 - g) * percent / 100));
  b = Math.min(255, Math.floor(b + (255 - b) * percent / 100));
  
  return `rgb(${r}, ${g}, ${b})`;
};

/**
 * Làm tối màu hex
 * @param {string} color - Mã màu hex
 * @param {number} percent - Phần trăm làm tối (0-100)
 * @returns {string} - Mã màu RGB
 */
export const darkenColor = (color, percent) => {
  if (!color) return "rgb(0, 0, 0)";
  
  const hexColor = color.replace("#", "");
  
  let r = parseInt(hexColor.substring(0, 2), 16);
  let g = parseInt(hexColor.substring(2, 4), 16);
  let b = parseInt(hexColor.substring(4, 6), 16);
  
  // Công thức: Giảm màu từ giá trị hiện tại xuống 0
  r = Math.max(0, Math.floor(r - r * percent / 100));
  g = Math.max(0, Math.floor(g - g * percent / 100));
  b = Math.max(0, Math.floor(b - b * percent / 100));
  
  return `rgb(${r}, ${g}, ${b})`;
};