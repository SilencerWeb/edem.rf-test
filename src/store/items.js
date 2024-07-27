import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const fetchItems = createAsyncThunk(
  "items/fetchItems",
  async ({ offset, limit }, { signal }) => {
    const response = await fetch(
      `http://localhost:3000/items?offset=${offset}&limit=${limit}`,
      { signal }
    );
    const jsonData = await response.json();
    return jsonData;
  }
);

export const items = createSlice({
  name: "items",
  initialState: { data: { items: [], count: null }, isLoading: false },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchItems.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchItems.fulfilled, (state, action) => {
        state.isLoading = false;

        if (state.data.items.length === 0) {
          state.data = action.payload;
        } else {
          state.data.items.push(...action.payload.items);
          state.data.count = action.payload.count;
        }

        if (state.data.items.length === state.data.count) {
          setTimeout(() => {
            alert("Поездок больше не найдено");
          });
        }
      });
  },
});
