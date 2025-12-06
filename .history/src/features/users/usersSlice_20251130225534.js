//* Nơi chứa dữ liệu lấy về
import { createSlice } from '@reduxjs/toolkit';
import { loadUsers }   from './userThunks.js';

const usersSlice = createSlice({
    name: "users",

    initialState: {    // giá trị ban đầu của state
    data      : [],    // mảng chứa danh sách user
    loading   : false, // trạng thái tải dữ liệu
    error     : null,   // kiểm lỗi
    page      : 1,      // trang hiện tại
    limit     : 10,     // số record mỗi lần
    sortBy    : "id",
    order     : "asc"
    },

    reducers: {
    resetUsers: (state) => { state.data = []; state.page = 1; }
    },

    extraReducers: (builder) => {
    builder
        .addCase(loadUsers.pending,   (state) => {
            state.loading = true; 
            state.error   = null; 
        })

        .addCase(loadUsers.fulfilled, (state, action) => {
        state.loading  = false;
        state.data.push(...action.payload);
        })

        .addCase(loadUsers.rejected,  (state, action) => {
        state.loading = false;
        state.error   = action.error.message;
        });
    }
});

export const { resetUsers } = usersSlice.actions;
export default usersSlice.reducer;           

