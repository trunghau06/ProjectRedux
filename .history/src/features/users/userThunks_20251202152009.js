import { createAsyncThunk } from "@reduxjs/toolkit";
import { fetchData, API_URL } from "../../api/api.js"; 

export const loadUsers = createAsyncThunk(
    "users/loadUsers",
    async ({ page = 1, limit = 10, sortBy = "id", order = "asc" }) => {
        const data = await fetchData(page, limit, sortBy, order);
        return data;
    }
);

// Add user (FAKE - vì API đầy)
export const addUser = createAsyncThunk(
  "users/addUser",
  async (userData) => {
    const fakeResponse = {
      ...userData,
      id: Date.now().toString(),
      createdAt: userData.createdAt || new Date().toISOString()
    };
    
    await new Promise(resolve => setTimeout(resolve, 500));
    
    console.log("Fake add user:", fakeResponse);
    return fakeResponse;
  }
);

// ✅ THÊM MỚI: Edit user (FAKE)
export const editUser = createAsyncThunk(
  "users/editUser",
  async ({ id, updates }) => {
    // Fake delay
    await new Promise(resolve => setTimeout(resolve, 500));
    
    console.log("Fake edit user:", id, updates);
    
    // Trả về data đã update
    return {
      ...updates,
      id: id
    };
  }
);