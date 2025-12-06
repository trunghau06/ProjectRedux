//* Nơi chứa dữ liệu lấy về
import { createSlice } from '@reduxjs/toolkit';
import { loadUsers }   from './userThunks.js';

const usersSlice = createSlice({
    name: "users",

    initialState: {    // giá trị ban đầu của state
    data      : [],    // mảng chứa danh sách user
    loading   : false, // trạng thái tải dữ liệu
    error     : null,  // kiểm lỗi
    page      : 1,     // trang hiện tại
    limit     : 10,    // số record mỗi lần
    sortBy    : "id",
    order     : "asc"
    },

    reducers: {         // nơi chứa các hàm thay đổi state
        resetUsers: (state) => { 
            state.data = []; 
            state.page = 1; 
        }
    },

    extraReducers: (builder) => {                       // nơi xử lý các action bất đồng bộ
        builder
            .addCase(loadUsers.pending,   (state) => { // case bắt đầu tải
                state.loading = true;                  // đang trong trạng thái tải
                state.error   = null; 
            })

            .addCase(loadUsers.fulfilled, (state, action) => {
            state.loading  = false;                    // tải xong
            state.data.push(...action.payload);       // đổ dữ liệu mới vào 
            })

            .addCase(loadUsers.rejected,  (state, action) => {
            state.loading = false;
            state.error   = action.error.message;
            });
    }
});

export const { resetUsers } = usersSlice.actions;
export default usersSlice.reducer;           

