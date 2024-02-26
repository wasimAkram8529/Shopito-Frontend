import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import blogService from "./blogService";
import { toast } from "react-toastify";

const initialState = {
  blogs: [],
  blog: null,
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: "",
};

export const getAllBlogs = createAsyncThunk(
  "blog/get-All-blog",
  async (_, thunkAPI) => {
    try {
      return await blogService.getAllBlogs();
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

export const getABlog = createAsyncThunk(
  "blog/get-a-blog",
  async (id, thunkAPI) => {
    try {
      return await blogService.getABlog(id);
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

export const blogSlice = createSlice({
  name: "blog",
  initialState,
  reducers: {
    RESET_BLOG(state) {
      state.isError = false;
      state.isSuccess = false;
      state.isLoading = false;
      state.message = "";
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getAllBlogs.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getAllBlogs.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.blogs = action.payload;
      })
      .addCase(getAllBlogs.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.payload;
        toast.error("Something went wrong");
      })
      .addCase(getABlog.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getABlog.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.blog = action.payload;
      })
      .addCase(getABlog.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        toast.error(action.payload);
      });
  },
});

export const { RESET_BLOG } = blogSlice.actions;
export default blogSlice.reducer;
