import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  createProductApi,
  deleteProductApi,
  editProductApi,
  getProductApi,
  getProductsApi,
} from "./api";

export const fetchProducts = createAsyncThunk(
  "products/get/all",
  async (searchParams = {}, thunkAPI) => {
    try {
      const res = await getProductsApi(searchParams);
      return res.data;
    } catch (err) {
      return thunkAPI.rejectWithValue(err.message);
    }
  }
);

export const fetchProductById = createAsyncThunk(
  "products/get/id",
  async (id, thunkAPI) => {
    try {
      const res = await getProductApi(id);
      return res.data;
    } catch (err) {
      return thunkAPI.rejectWithValue(err.message);
    }
  }
);

export const createProduct = createAsyncThunk(
  "products/create",
  async (productData, thunkAPI) => {
    try {
      const response = await createProductApi(productData);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || error.message
      );
    }
  }
);

export const editProduct = createAsyncThunk(
  "products/edit",
  async ({ id, payload }, thunkAPI) => {
    try {
      const res = await editProductApi(id, payload);
      return res.data;
    } catch (err) {
      return thunkAPI.rejectWithValue(err.message);
    }
  }
);

export const deleteProduct = createAsyncThunk(
  "products/delete/id",
  async (id, thunkAPI) => {
    try {
      const res = await deleteProductApi(id);
      return res.data;
    } catch (err) {
      return thunkAPI.rejectWithValue(err.message);
    }
  }
);

const productsSlice = createSlice({
  name: "products",
  initialState: {
    list: [],
    loading: false,
    error: null,
    searchFilters: {
      articleSearch: "",
      productSearch: "",
    },
    total: 0,
  },
  reducers: {
    setSearchFilters: (state, action) => {
      state.searchFilters = { ...state.searchFilters, ...action.payload };
    },
    clearSearchFilters: (state) => {
      state.searchFilters = {
        articleSearch: "",
        productSearch: "",
      };
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.loading = false;
        state.list = action.payload.data;
        state.total = action.payload.total;
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { setSearchFilters, clearSearchFilters } = productsSlice.actions;
export default productsSlice.reducer;
