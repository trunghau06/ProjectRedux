import { createAsyncThunk } from "@reduxjs/toolkit";
import { fetchData, API_URL } from "../../api/api.js"; 

export const loadUsers = createAsyncThunk(
    "users/loadUsers",
    async ({ page = 1, limit = 10, sortBy = "id", order = "asc" }) => {
        const data = await fetchData(page, limit, sortBy, order);
        return data;
    }
);

// thêm record
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