//* Nơi chứa trả về từ yêu cầu
import { createSlice } from '@reduxjs/toolkit';
import { loadUsers }   from './userThunks.js';
import { addUser }     from './userThunks.js';
import { editUser }    from './userThunks.js';
import { deleteUser }  from './userThunks.js';

// Đọc settings từ localStorage
const getSavedLimit = () => {   // lấy limit đã lưu trong ls
    const saved = localStorage.getItem("limit");
    return saved ? parseInt(saved) : 10; // chu
};

const getSavedSortBy = () => {
    return localStorage.getItem("sortBy") || "id";
};

const getSavedOrder = () => {
    return localStorage.getItem("order") || "asc";
};

const usersSlice = createSlice({
    name: "users",

    initialState: {
        data      : [], 
        totalItems: 0, 
        loading   : false,
        error     : null,
        page      : 1,   
        limit     : getSavedLimit(),    // Đọc từ localStorage
        sortBy    : getSavedSortBy(),   // Đọc từ localStorage
        order     : getSavedOrder(),    // Đọc từ localStorage
        hasMore   : true    
    },

    reducers: { // Nơi chứa action đồng bộ
        // Tải lại trang ban đầu
        resetUsers: (state) => { 
            state.data = []; 
            state.page = 1;
            state.hasMore = true;
        },
        
        // Sắp xếp
        setSort: (state, action) => {
            const { sortBy, order } = action.payload;
            state.sortBy = sortBy;
            state.order = order;
            state.data = [];
            state.page = 1;
            state.hasMore = true;
            // Lưu vào localStorage
            localStorage.setItem("sortBy", sortBy);
            localStorage.setItem("order", order);
        },

        // Thay đổi limit
        setLimit: (state, action) => {
            state.limit = action.payload;
            state.data = [];
            state.page = 1;
            state.hasMore = true;
            // Lưu vào localStorage
            localStorage.setItem("limit", action.payload.toString());
        }
    },

    extraReducers: (builder) => {   // nơi xử lý các action được tạo từ createAsyncThunk
        builder
            // Tải danh sách
            .addCase(loadUsers.pending, (state) => {    // đang tải
                state.loading = true;
                state.error   = null; 
            })

            .addCase(loadUsers.fulfilled, (state, action) => {  // tải thành công
                state.loading = false;
                const { data, page, sortBy, order } = action.payload;   // lấy kết quả API 

                // Nếu sort thay đổi, reset data
                if (sortBy !== state.sortBy || order !== state.order) {
                    state.data = [];
                    state.page = 1;
                    state.sortBy = sortBy;
                    state.order = order;
                    state.hasMore = true;
                }

                // Nếu không có dữ liệu trả về
                if (data.length === 0) {
                    state.hasMore = false;
                    return;
                }

                // Lọc trùng lặp
                const existingIds = new Set(state.data.map(user => user.id));
                const newUsers = data.filter(user => !existingIds.has(user.id));

                // Thêm dữ liệu mới
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

            .addCase(loadUsers.rejected, (state, action) => {
                state.loading = false;
                state.error   = action.error.message;
            })

            // Thêm record
            .addCase(addUser.pending, (state) => {
                state.loading = true;
            })
            .addCase(addUser.fulfilled, (state, action) => {
                state.loading = false;
                state.data.unshift(action.payload);
            })
            .addCase(addUser.rejected, (state, action) => {
                state.loading = false;
                state.error   = action.error.message;
            })

            // Sửa record
            .addCase(editUser.pending, (state) => {
                state.loading = true;
            })
            .addCase(editUser.fulfilled, (state, action) => {
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

            // Xóa record 
            .addCase(deleteUser.pending, (state) => {
                state.loading = true;
            })
            .addCase(deleteUser.fulfilled, (state, action) => {
                state.loading = false;
                state.data = state.data.filter(user => user.id !== action.payload);
            })
            .addCase(deleteUser.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            });
    }    
});

export const { resetUsers, setSort, setLimit } = usersSlice.actions;
export default usersSlice.reducer;