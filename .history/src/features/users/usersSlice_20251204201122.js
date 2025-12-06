//* Nơi chứa trả về từ yêu cầu
import { createSlice } from '@reduxjs/toolkit';
import { loadUsers }   from './userThunks.js';
import { addUser }     from './userThunks.js';
import { editUser }    from './userThunks.js';
import { deleteUser }  from './userThunks.js';

const usersSlice = createSlice({
    name: "users",

    initialState: {         // trạng thái ban đầu   
        data      : [],     // nơi lưu danh sách 
        loading   : false,  // trạng thái đang tải
        error     : null,   // lỗi nếu có
        page      : 1,      // Trang sẽ fetch tiếp theo
        limit     : 10,     // số lượng item mỗi trang
        sortBy    : "id",   
        order     : "asc", 
        hasMore   : true    
    },

    reducers: {                     // nơi các action thay đổi state
        resetUsers: (state) => { 
            state.data = []; 
            state.page = 1;
            state.hasMore = true;
        },
        // Thêm reducer setSort
        setSort: (state, action) => {
            const { sortBy, order } = action.payload;
            state.sortBy = sortBy;
            state.order = order;
            // Reset dữ liệu và phân trang để tải lại trang 1 với cấu hình mới
            state.data = [];
            state.page = 1;
            state.hasMore = true;
        }
    },

    extraReducers: (builder) => {    // nơi xử lý các action bất đồng bộ
        builder
            .addCase(loadUsers.pending, (state) => {  // case khi bắt đầu tải
                state.loading = true;
                state.error   = null; 
            })

            .addCase(loadUsers.fulfilled, (state, action) => {  // Case khi tải thành công
                state.loading = false;
                const { data, page, sortBy, order } = action.payload;

                // --- ĐỒNG BỘ TRẠNG THÁI (Nếu fetch không khớp với trạng thái hiện tại, bỏ qua) ---
                if (sortBy !== state.sortBy || order !== state.order) {
                    return; 
                }

                // Nếu không có dữ liệu trả về
                if (data.length === 0) {
                    state.hasMore = false;
                    return;
                }

                // Lọc trùng lặp
                const existingIds = new Set(state.data.map(user => user.id)); 
                const newUsers = data.filter(user => !existingIds.has(user.id)); // Chỉ thêm user mới

                // Thêm dữ liệu mới và cập nhật page
                if (newUsers.length > 0) {  
                    state.data.push(...newUsers);
                    // Tăng page để lần sau fetch trang tiếp theo
                    state.page = page + 1; 
                }

                // Kiểm tra còn dữ liệu không
                if (data.length < state.limit) {
                    state.hasMore = false;
                }
            })

            .addCase(loadUsers.rejected, (state, action) => {  // Case khi tải thất bại
                state.loading = false;
                state.error   = action.error.message;
            })

            // thêm record
            .addCase(addUser.pending, (state) => {      // Case khi bắt đầu tải
                state.loading = true;
            })
            .addCase(addUser.fulfilled, (state, action) => {  // Case khi thêm thành công
                state.loading = false;
                state.data.unshift(action.payload); // Thêm vào đầu mảng
            })
            .addCase(addUser.rejected, (state, action) => {  // Case khi thêm thất bại
                state.loading = false;
                state.error   = action.error.message;
            })

            // sửa record
            .addCase(editUser.pending, (state) => {
                state.loading = true;   // Case khi bắt đầu tải
            })
            .addCase(editUser.fulfilled, (state, action) => {   // Case khi sửa thành công
                state.loading = false;
                const index = state.data.findIndex(user => user.id === action.payload.id);
                if (index !== -1) {
                    state.data[index] = action.payload;
                }
            })
            .addCase(editUser.rejected, (state, action) => {    // Case khi sửa thất bại
                state.loading = false;
                state.error = action.error.message;
            })

            // xóa record 
            .addCase(deleteUser.pending, (state) => {   // Case khi bắt đầu tải
                state.loading = true;
            })
            .addCase(deleteUser.fulfilled, (state, action) => {  // Case khi xóa thành công
                state.loading = false;
                // Xóa user khỏi state
                state.data = state.data.filter(user => user.id !== action.payload);
            })
            .addCase(deleteUser.rejected, (state, action) => {    // Case khi xóa thất bại
                state.loading = false;
                state.error = action.error.message;
            });
    }    
});

export const { resetUsers, setSort } = usersSlice.actions;
export default usersSlice.reducer;