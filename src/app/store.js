//* Nơi giữ tất cả slice lấy về
import { configureStore } from '@reduxjs/toolkit';
import usersReducer       from '../features/users/usersSlice.js';
import modalReducer       from '../components/Modal/ModalSlice.jsx';

export const store = configureStore( {
    reducer: {
        users: usersReducer,        // quản lý state record
        modal: modalReducer,        // quản lý state modal
    }
} );