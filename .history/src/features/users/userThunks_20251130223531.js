//* Nơi gửi yêu cầu lên api
import { createAsyncThunk } from '@reduxjs/toolkit';
import { fetchData } from '../../api/api.js';

export const loadUsers = createAsyncThunk(
    "users/loadUsers",
    async ( { page, limit, sortBy, order }, thunkAPI ) => {