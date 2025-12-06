import { createSlice } from '@reduxjs/toolkit';
import { loadUsers }   from './userThunks.js';

const usersSlice = createSlice({
    name: "users",

    initialState: {
        data      : [],    // Mảng luu
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
                
                // Nếu không có data trả về → hết data
                if (action.payload.length === 0) {
                    state.hasMore = false;
                } else {
                    state.data.push(...action.payload);
                    state.page += 1; // ← Tăng page sau khi load thành công
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