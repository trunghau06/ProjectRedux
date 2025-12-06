//* Nơi gọi yêu cầu A
import { createAsyncThunk } from "@reduxjs/toolkit";
import { fetchData, API_URL } from "../../api/api.js"; 

export const loadUsers = createAsyncThunk(
    "users/loadUsers",
    async ({ page = 1, limit = 10, sortBy = "id", order = "asc" }) => {
        const data = await fetchData(page, limit, sortBy, order);
        return data;
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
      throw new Error(`Failed to edit user: ${response.status}`);
    }
    
    const data = await response.json();
    console.log("Edit user success:", data);
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
      throw new Error(`Failed to delete user: ${response.status}`);
    }
    
    console.log("Delete user success:", userId);
    return userId; // Trả về userId đã xóa
  }
);