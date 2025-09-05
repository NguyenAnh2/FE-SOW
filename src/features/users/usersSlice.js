import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getUsersApi } from "./api";

export const fetchUsers = createAsyncThunk("users/me", async (_, thunkAPI) => {
  try {
    const res = await getUsersApi();
    return res.data;
  } catch (err) {
    return thunkAPI.rejectWithValue(err.message);
  }
});

const usersSlice = createSlice({
  name: "users",
  initialState: {
    list: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchUsers.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.loading = false;
        state.list = action.payload;
      })
      .addCase(fetchUsers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default usersSlice.reducer;
