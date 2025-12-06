//* Nơi chứa dữ liệu lấy về
import { createSlice } from '@reduxjs/toolkit';
import { loadUsers }   from './userThunks.js';

const usersSlice = createSlice({
  name    : "users",

  initialState: {
    data: [],
    loading: false,
    error: null,
    page: 1,
    limit: 15,
    sortBy: "id",
    order: "asc"
  },
  reducers: {
    resetUsers: (state) => { state.data = []; state.page = 1; }
  },
  extraReducers: (builder) => {
    builder
      .addCase(loadUsers.pending, (state) => { state.loading = true; state.error = null; })
      .addCase(loadUsers.fulfilled, (state, action) => {
        state.loading = false;
        state.data.push(...action.payload);
      })
      .addCase(loadUsers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  }
});

export const { resetUsers } = usersSlice.actions;
export default usersSlice.reducer;           

