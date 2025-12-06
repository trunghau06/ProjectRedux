//* Nơi chứa trả về từ yêu cầu
import { createSlice } from '@reduxjs/toolkit';
import { loadUsers }   from './userThunks.js';
import { addUser }     from './userThunks.js';
import { editUser }    from './userThunks.js';
import { deleteUser }  from './userThunks.js';

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

            .addCase(loadUsers.fulfilled, (state, action) => {  // Case khi tải thành công
                state.loading = false;

                if (action.payload.length === 0) {      // Không còn dữ liệu
                    state.hasMore = false;
                    return;
                }

                const existingIds = new Set(state.data.map(user => user.id));              // Lọc trùng lặp
                const newUsers = action.payload.filter(user => !existingIds.has(user.id)); // Chỉ thêm user mới

                state.page += 1;

                if (newUsers.length > 0) {  // Nếu có user mới thì mới thêm vào state
                    state.data.push(...newUsers);
                }

                if (action.payload.length < state.limit) {  // Nếu số lượng tải về ít hơn giới hạn thì không còn dữ liệu
                    state.hasMore = false;
                }
            })

            .addCase(loadUsers.rejected, (state, action) => {  // Case khi tải thất bại
                state.loading = false;
                state.error   = action.error.message;
            })

            // thêm record
            .addCase(addUser.pending, (state) => {      // Case khi bắt đầu tải
                state.loading = true;
            })
            .addCase(addUser.fulfilled, (state, action) => {  // Case khi thêm thành công
                state.loading = false;
                state.data.unshift(action.payload); // Thêm vào đầu mảng
            })
            .addCase(addUser.rejected, (state, action) => {  // Case khi thêm thất bại
                state.loading = false;
                state.error   = action.error.message;
            })

            // sửa record
            .addCase(editUser.pending, (state) => {
                state.loading = true;   // Case khi bắt đầu tải
            })
            .addCase(editUser.fulfilled, (state, action) => {   // Case khi sửa thành công
                state.loading = false;
                const index = state.data.findIndex(user => user.id === action.payload.id);
                if (index !== -1) {
                    state.data[index] = action.payload;
                }
            })
            .addCase(editUser.rejected, (state, action) => {    
                state.loading = false;
                state.error = action.error.message;
            })

            // xóa record 
            .addCase(deleteUser.pending, (state) => {
                state.loading = true;
            })
            .addCase(deleteUser.fulfilled, (state, action) => {
                state.loading = false;
                // Xóa user khỏi state
                state.data = state.data.filter(user => user.id !== action.payload);
            })
            .addCase(deleteUser.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            });

    }    
});

export const { resetUsers } = usersSlice.actions;
export default usersSlice.reducer;