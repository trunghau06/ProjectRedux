//* Nơi chứa trả về từ yêu cầu
import { createSlice } from '@reduxjs/toolkit';
import { loadUsers }   from './userThunks.js';
import { addUser }     from './userThunks.js';
import { editUser }    from './userThunks.js';
import { deleteUser }  from './userThunks.js';

const usersSlice = createSlice({
    name: "users",

    initialState: {
        data      : [],
        totalItems: 0, 
        loading   : false,
        error     : null,
        page      : 1,   
        limit     : 10,    
        sortBy    : "id",   
        order     : "asc", 
        hasMore   : true    
    },

    reducers: {
        resetUsers: (state) => { 
            state.data = []; 
            state.page = 1;
            state.hasMore = true;
        },
        
        setSort: (state, action) => {
            const { sortBy, order } = action.payload;
            state.sortBy = sortBy;
            state.order = order;
            state.data = [];
            state.page = 1;
            state.hasMore = true;
        },

        // Thêm action để thay đổi limit
        setLimit: (state, action) => {
            state.limit = action.payload;
            state.data = [];
            state.page = 1;
            state.hasMore = true;
        }
    },

    extraReducers: (builder) => {
        builder
            .addCase(loadUsers.pending, (state) => {
                state.loading = true;
                state.error   = null; 
            })

            totalItems: 0, 

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