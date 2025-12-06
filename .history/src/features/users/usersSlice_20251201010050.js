import { createSlice } from '@reduxjs/toolkit';
import { loadUsers }   from './userThunks.js';

const usersSlice = createSlice({
    name: "users",

    initialState: {         // trạng thái ban đầu   
        data      : [],     // nơi lưu danh sách 
        loading   : false,  // trạng thái đang tải
        error     : null,   // lỗi nếu có
        page      : 1,      // trang hiện tại
        limit     : 10,     // số lượng item mỗi trang
        sortBy    : "id",   
        order     : "asc", 
        hasMore   : true    
    },

    reducers: {                     // nơi các action thay đổi state
        resetUsers: (state) => { 
            state.data = []; 
            state.page = 1;
            state.hasMore = true;
        }
    },

    extraReducers: (builder) => {    // nơi xử lý các action bất đồng bộ
        builder
            .addCase(loadUsers.pending, (state) => {  // case khi bắt đầu tải
                state.loading = true;
                state.error   = null; 
            })

            .addCase(loadUsers.fulfilled, (state, action) => {  // case khi tải thành công
                state.loading = false;

                if (action.payload.length === 0) {      // Không còn dữ liệu
                    state.hasMore = false;
                    return;
                }

                const existingIds = new Set(state.data.map(user => user.id));   // Lọc trùng lặp
                const newUsers = action.payload.filter(user => !existingIds.has(user.id)); 

                state.page += 1;

                if (newUsers.length > 0) {
                    state.data.push(...newUsers);
                }

                if (action.payload.length < state.limit) {
                    state.hasMore = false;
                }
            })

            .addCase(loadUsers.rejected, (state, action) => {
                state.loading = false;
                state.error   = action.error.message;
            });
    }
});

export const { resetUsers } = usersSlice.actions;
export default usersSlice.reducer;