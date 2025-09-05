import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import apiClient from "../../services/apiClient";

export const fetchTranslations = createAsyncThunk(
  "language/fetchTranslations",
  async (lang, { rejectWithValue }) => {
    try {
      const res = await apiClient.get(`/translations?lang=${lang || "en"}`);
      return { lang, data: res.data.data };
    } catch (err) {
      return rejectWithValue(err.response?.data || err.message);
    }
  }
);

const languageSlice = createSlice({
  name: "language",
  initialState: {
    lang: "en",
    translations: {},
    loading: false,
    error: null,
  },
  reducers: {
    setLang: (state, action) => {
      state.lang = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchTranslations.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchTranslations.fulfilled, (state, action) => {
        state.lang = action.payload.lang;
        state.loading = false;
        state.translations = action.payload.data;
      })
      .addCase(fetchTranslations.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Error fetching translations";
      });
  },
});

export const { setLang } = languageSlice.actions;
export default languageSlice.reducer;
