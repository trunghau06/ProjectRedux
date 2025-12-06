import { createAsyncThunk } from "@reduxjs/toolkit";
import { fetchData, API_URL } from "../../api/api.js"; // import API_URL từ api.js

export const loadUsers = createAsyncThunk(
    "users/loadUsers",
    async ({ page = 1, limit = 10, sortBy = "id", order = "asc" }) => {
        const data = await fetchData(page, limit, sortBy, order);
        return data;
    }
);

// thêm u
export const addUser = createAsyncThunk(
    "users/addUser",
    async (userData) => {
        const response = await fetch(API_URL, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(userData)
        });
        if (!response.ok) throw new Error("Failed to add user");
        return await response.json();
    }
);
