//* Nơi chứa dữ liệu lấy về
import { createSlice } from '@reduxjs/toolkit';
import { loadUsers } from './userThunks.js';

const usersSlice = createSlice( {
    name: 'users',
    initialState: {
        data: [],
        
