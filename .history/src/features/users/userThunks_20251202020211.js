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
        // chuyển dob sang ISO nếu có
        if (userData.dob) userData.dob = new Date(userData.dob).toISOString();

        const response = await fetch(API_URL, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(userData)
        });
        if (!response.ok) throw new Error("Failed to add user");
        return await response.json();
    }
);
