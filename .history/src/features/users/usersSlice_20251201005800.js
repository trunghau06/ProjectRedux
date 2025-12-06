import { createSlice } from '@reduxjs/toolkit';
import { loadUsers }   from './userThunks.js';

const usersSlice = createSlice({
    name: "users",

    initialState: {
        data      : [],
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
        }
    },

    extraReducers: (builder) => {
        builder
            .addCase(loadUsers.pending, (state) => {
                state.loading = true;
                state.error   = null; 
            })

            .addCase(loadUsers.fulfilled, (state, action) => {
                state.loading = false;
                
                if (action.payload.length === 0) {
                    state.hasMore = false;
                } else {
                    // ✅ LỌC BỎ TRÙNG: Chỉ thêm user chưa có trong state.data
                    const existingIds = new Set(state.data.map(user => user.id));
                    const newUsers = action.payload.filter(user => !existingIds.has(user.id));
                    
                    if (newUsers.length > 0) {
                        state.data.push(...newUsers);
                        state.page += 1;
                    } else {
                        // Nếu không có user mới → hết data
                        state.hasMore = false;
                    }
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