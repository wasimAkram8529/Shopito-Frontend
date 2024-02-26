import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import contactService from "./contactService";
import { toast } from "react-toastify";

const initialState = {
  contact: [],
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: "",
};

export const createEnquiry = createAsyncThunk(
  "contact/create-contact",
  async (enquiry, thunkAPI) => {
    try {
      return await contactService.createEnquiry(enquiry);
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

export const contactSlice = createSlice({
  name: "contact",
  initialState,
  reducers: {
    RESET_CONTACT(state) {
      state.isError = false;
      state.isSuccess = false;
      state.isLoading = false;
      state.message = "";
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(createEnquiry.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createEnquiry.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.contact = action.payload;
        toast.success("Enquiry Created");
      })
      .addCase(createEnquiry.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.payload;
        toast.error("Something went wrong");
      });
  },
});

export const { RESET_CONTACT } = contactSlice.actions;
export default contactSlice.reducer;
