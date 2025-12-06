import { createSlice } from '@reduxjs/toolkit';
import { loadUsers }   from './userThunks.js';

const usersSlice = createSlice({
    name: "users",

    initialState: {         // trạng thái ban đầu   
        data      : [],     // nơi lưu danh sách 
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
                    return;
                }

                const existingIds = new Set(state.data.map(user => user.id));
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