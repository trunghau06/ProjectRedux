//* Nơi gửi yêu cầu lên api
import { createAsyncThunk } from '@reduxjs/toolkit';
import { fetchData } from '../../api/api.js';

export const loadUsers = createAsyncThunk(
    "users/loadUsers",
    async ( { page = 1, limit = 10, sortBy = "id", order = "asc" } ) => {
        const data = await fetchData( page, limit, sortBy, order );
        return data;
    }