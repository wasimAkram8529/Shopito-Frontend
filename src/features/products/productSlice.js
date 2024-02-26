import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import productService from "./productService";
import { toast } from "react-toastify";

// const productDefaultState = {
//   _id: null,
//   brand: "",
//   description: "",
//   price: 0,
//   image: [],
//   rating: [],
// };

const initialState = {
  products: [],
  product: [],
  productReview: [],
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: "",
};

export const getProducts = createAsyncThunk(
  "products/get-products",
  async (query, thunkAPI) => {
    try {
      return await productService.getProducts(query);
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// Get A Product
export const getAProduct = createAsyncThunk(
  "products/get-A-products",
  async (id, thunkAPI) => {
    try {
      return await productService.getAProduct(id);
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// Write Product Review
export const writeProductReview = createAsyncThunk(
  "products/review",
  async (payload, thunkAPI) => {
    try {
      const { id, review } = payload;
      return await productService.writeProductReview(id, review);
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// Update Product Review
export const updateProductReview = createAsyncThunk(
  "products/update-review",
  async (payload, thunkAPI) => {
    try {
      const { id, review } = payload;
      return await productService.updateProductReview(id, review);
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// Delete Product Review
export const deleteProductReview = createAsyncThunk(
  "products/delete-review",
  async (payload, thunkAPI) => {
    try {
      const { id, userId } = payload;
      console.log(id, userId);
      return await productService.deleteProductReview(id, userId);
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const productSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    RESET_PRODUCT(state) {
      state.isError = false;
      state.isSuccess = false;
      state.isLoading = false;
      state.message = "";
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getProducts.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getProducts.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.products = action.payload;
      })
      .addCase(getProducts.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.payload;
      }) // Get A Product
      .addCase(getAProduct.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getAProduct.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.product = action.payload;
      })
      .addCase(getAProduct.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.payload;
      }) // Write Product REview
      .addCase(writeProductReview.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(writeProductReview.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.product = action.payload.product;
        toast.success(action.payload.message);
      })
      .addCase(writeProductReview.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.payload.message;
        toast.error(action.payload.message);
      }) // Update Product Review
      .addCase(updateProductReview.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateProductReview.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.product = action.payload.updatedReview;
        toast.success(action.payload.message);
      })
      .addCase(updateProductReview.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.payload.message;
        toast.error(action.payload.message);
      }) // Delete Product Review
      .addCase(deleteProductReview.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteProductReview.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.product = action.payload.product;
        toast.success(action.payload.message);
      })
      .addCase(deleteProductReview.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.payload;
        toast.error(action.payload);
      });
  },
});

export const { RESET_PRODUCT } = productSlice.actions;
export default productSlice.reducer;
