//* Nơi gửi yêu cầu lên api
import { createAsyncThunk } from '@reduxjs/toolkit';
import { fetchData } from '../../api/api.js';

// load dữ liệu
export const loadUsers = createAsyncThunk(
    "users/loadUsers",
    async ( { page = 1, limit = 10, sortBy = "id", order = "asc" } ) => {
        const data = await fetchData( page, limit, sortBy, order );
        return data;
    }
);

// thêm recordexport const addUser = createAsyncThunk(
export const addUser = createAsyncThunk(
    'users/addUser',
    async (userData) => {
        const response = await fetch(API_URL, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(userData)
        });
        return await response.json();
    }
);
