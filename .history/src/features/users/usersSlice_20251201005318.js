import { createSlice } from '@reduxjs/toolkit';
import { loadUsers }   from './userThunks.js';

const usersSlice = createSlice({
    name: "users",

    initialState: {
        data      : [],    // Mảng luu trữ dữ liệu
        loading   : false, // Trạng thái loading
        error     : null,  // Lỗi nếu có
        page      : 1,     // Trang hiện tại
        limit     : 10,    // Số bản ghi mỗi trang
        sortBy    : "id",  
        order     : "asc", 
        hasMore   : true  
    },

    reducers: {     // nơi chứa các hàm thay đổi state
        resetUsers: (state) => { 
            state.data = []; 
            state.page = 1;
            state.hasMore = true;
        }
    },

    extraReducers: (builder) => {  // nơi xử lý các action bất đồng bộ
        builder
            .addCase(loadUsers.pending, (state) => {  // case khi bắt đầu load
                state.loading = true;
                state.error   = null; 
            })

            .addCase(loadUsers.fulfilled, (state, action) => {  // case khi load thành công
                state.loading = false;
                
                // Nếu không có data trả về -> hết data
                if (action.payload.length === 0) {
                    state.hasMore = false;
                } else {
                    state.data.push(...action.payload);
                    state.page += 1; //  Tăng page sau khi load thành công
                }
            })

            .addCase(loadUsers.rejected, (state, action) => {  // case khi load thất bại
                state.loading = false;
                state.error   = action.error.message;
            });
    }
});

export const { resetUsers } = usersSlice.actions;
export default usersSlice.reducer;