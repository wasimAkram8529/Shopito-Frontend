import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import uploadService from "./uploadService";
import { toast } from "react-toastify";

const initialState = {
  images: [],
  isError: false,
  isLoadingImg: false,
  isSuccess: false,
  message: "",
};

export const uploadProductImg = createAsyncThunk(
  "uploadImg/upload-productImg",
  async (data, thunkAPI) => {
    try {
      const formData = new FormData();
      for (let i = 0; i < data.length; i++) {
        formData.append("images", data[i]);
      }
      return await uploadService.uploadProductImg(formData);
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
export const deleteProductImg = createAsyncThunk(
  "deleteImg/delete-productImg",
  async (id, thunkAPI) => {
    try {
      return await uploadService.deleteProductImg(id);
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

export const uploadSlice = createSlice({
  name: "uploadImg",
  initialState,
  reducers: {
    RESET_IMGURL(state) {
      state.images = [];
      state.isError = false;
      state.isSuccess = false;
      state.isLoadingImg = false;
      state.message = "";
    },
  },
  extraReducers: (builder) => {
    // upload Product img
    builder
      .addCase(uploadProductImg.pending, (state) => {
        state.isLoadingImg = true;
      })
      .addCase(uploadProductImg.fulfilled, (state, action) => {
        state.isLoadingImg = false;
        state.isError = false;
        state.isSuccess = true;
        state.images = action.payload;
        //console.log(action.payload);
        //toast.success("Image Upload Successfully");
      })
      .addCase(uploadProductImg.rejected, (state, action) => {
        state.isLoadingImg = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error;
        state.images = [];
        toast.error("Something went wrong");
      }) // Delete Product Image
      .addCase(deleteProductImg.pending, (state) => {
        state.isLoadingImg = true;
      })
      .addCase(deleteProductImg.fulfilled, (state, action) => {
        state.isLoadingImg = false;
        state.isError = false;
        state.isSuccess = true;
        state.images = state.images.filter(
          (image) => image.public_id !== action.payload.id
        );
        console.log(state.images);
        toast.success(action.payload.message);
      })
      .addCase(deleteProductImg.rejected, (state, action) => {
        state.isLoadingImg = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.payload;
        state.images = [];
        toast.error("Something went wrong");
      });
  },
});

export const { RESET_IMGURL } = uploadSlice.actions;
export default uploadSlice.reducer;
