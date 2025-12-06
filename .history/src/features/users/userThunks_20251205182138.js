export const loadUsers = createAsyncThunk(
  "users/loadUsers",
  async ({ page = 1, limit = 10, sortBy = "id", order = "asc" }, { getState }) => {
    const state = getState();
    const currentSortBy = state.users.sortBy;
    const currentOrder = state.users.order;

    const isNewSort = sortBy !== currentSortBy || order !== currentOrder;
    const actualPage = isNewSort ? 1 : page;

    const result = await fetchData(actualPage, limit, sortBy, order);
    // result = { data: [...], total: 101 }
    return { 
      data: result.data, 
      page: actualPage, 
      sortBy, 
      order,
      totalItems: result.total 
    };
  }
);
