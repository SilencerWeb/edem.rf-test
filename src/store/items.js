import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const fetchItems = createAsyncThunk(
  "items/fetchItems",
  async (amount, thunkAPI) => {
    const response = await fetch(
      `http://localhost:3000/items?amount=${amount}`,
      {
        signal: thunkAPI.signal,
      }
    );
    const jsonData = await response.json();
    return jsonData;
  }
);

export const items = createSlice({
  name: "items",
  initialState: { data: [], isLoading: false, error: null },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchItems.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchItems.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = null;

        if (state.data.length === 0) {
          state.data = action.payload.items;
        } else {
          state.data.push(...action.payload.items);
        }
      });
  },
});
