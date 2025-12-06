//* Nơi chứa dữ liệu lấy về
import { createSlice } from '@reduxjs/toolkit';
import { loadUsers } from './userThunks.js';

const usersSlice = createSlice( {
    name: 'users',

    initialState: {
        data: [],
        loading: false,
        error: null,
        page: 1,
        limit: 10,
        sortBy: 'id',
        order: 'asc',
    },

    reducers: {
        resetUsers: ( state ) => {
            state.data = [];
            state.page = 1;
        }
    },

    extraReducers: ( builder ) => {
        

