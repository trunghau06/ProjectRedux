//* Nơi gọi yêu cầu API
import { createAsyncThunk } from "@reduxjs/toolkit";
import { fetchData, API_URL } from "../../api/api.js"; 

export const loadUsers = createAsyncThunk(
  "users/loadUsers",
  async ({ page = 1, limit = 10, sortBy = "id", order = "asc" }, { getState }) => {
    const state = getState();
    const currentSortBy = state.users.sortBy;
    const currentOrder = state.users.order;

    // Nếu sort thay đổi, reset về trang 1
    const isNewSort = sortBy !== currentSortBy || order !== currentOrder;
    const actualPage = isNewSort ? 1 : page;

    let data = await fetchData(actualPage, limit, sortBy, order);

    // Nếu trường sort là string, sort case-insensitive phía client
    if (data.length && typeof data[0][sortBy] === "string") {
      data.sort((a, b) => {
        const valA = String(a[sortBy]).toLowerCase();
        const valB = String(b[sortBy]).toLowerCase();
        return order === "asc"
          ? valA.localeCompare(valB)
          : valB.localeCompare(valA);
      });
    }


    return { data, page: actualPage, sortBy, order };
  }
);

export const addUser = createAsyncThunk(
  "users/addUser",
  async (userData) => {
    const response = await fetch(API_URL, { 
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(userData)
    });
    
    if (!response.ok) {
      const errorText = await response.text();
      console.error("API Error:", errorText);
      throw new Error(`Failed to add user: ${response.status}`);
    }
    
    return await response.json();
  }
);

export const editUser = createAsyncThunk(
  "users/editUser",
  async ({ id, updates }) => {
    const response = await fetch(`${API_URL}/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(updates)
    });
    
    if (!response.ok) {
      const errorText = await response.text();
      console.error("API Error:", errorText);
      throw new Error(`Chỉnh sửa thất bại: ${response.status}`);
    }
    
    const data = await response.json();
    console.log("Chỉnh sửa thành công:", data);
    return data;
  }
);

export const deleteUser = createAsyncThunk(
  "users/deleteUser",
  async (userId) => {
    const response = await fetch(`${API_URL}/${userId}`, {
      method: "DELETE",
      headers: { "Content-Type": "application/json" }
    });
    
    if (!response.ok) {
      const errorText = await response.text();
      console.error("API Error:", errorText);
      throw new Error(`Xóa không thành công: ${response.status}`);
    }
    
    console.log("Xóa thành công:", userId);
    return userId;
  }
);