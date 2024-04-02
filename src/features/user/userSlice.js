import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import userService from "./userService";
import { toast } from "react-toastify";
// const userDefaultState = {
//   _id: null,
//   firstname: null,
//   lastname: null,
//   email: null,
//   mobile: null,
//   token: null,
// };
const clearTokenCookie = () => {
  document.cookie = "token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
};

const initialState = {
  user: [],
  cart: [],
  userCart: [],
  order: [],
  userOrders: [],
  isLoggedIn: false,
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: "",
};

export const register = createAsyncThunk(
  "auth/register-user",
  async (userData, thunkAPI) => {
    try {
      return await userService.registerUser(userData);
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

export const login = createAsyncThunk(
  "auth/login-user",
  async (userData, thunkAPI) => {
    try {
      return await userService.loginUser(userData);
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

// Logout User
export const logout = createAsyncThunk("auth/logout", async (_, thunkAPI) => {
  try {
    return await userService.logout();
  } catch (error) {
    const message =
      (error.response && error.response.data && error.response.data.message) ||
      error.message ||
      error.toString();
    return thunkAPI.rejectWithValue(message);
  }
});

// Get User WishList
export const getUserWishList = createAsyncThunk(
  "auth/getUserWishList",
  async (_, thunkAPI) => {
    try {
      return await userService.getUserWishList();
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

// Remove From Wishlist
export const removeFromWishList = createAsyncThunk(
  "auth/remove-from-WishList",
  async (id, thunkAPI) => {
    try {
      return await userService.removeFromWishList(id);
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

// Get Login Status
export const getLoginStatus = createAsyncThunk(
  "auth/getLoginStatus",
  async (_, thunkAPI) => {
    try {
      return await userService.getLoginStatus();
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

// Add To Wishlist
export const addToWishList = createAsyncThunk(
  "auth/add-to-wishList",
  async (id, thunkAPI) => {
    try {
      return await userService.addToWishList(id);
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

// Add To Cart
export const addToCart = createAsyncThunk(
  "auth/add-to-cart",
  async (cartItem, thunkAPI) => {
    try {
      return await userService.addToCart(cartItem);
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

// Get Cart
export const getUserCart = createAsyncThunk(
  "auth/get-cart",
  async (_, thunkAPI) => {
    try {
      return await userService.getUserCart();
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

// Remove A Item From cart
export const removeFromCart = createAsyncThunk(
  "auth/remove-cart",
  async (id, thunkAPI) => {
    try {
      return await userService.removeFromCart(id);
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

// Update Cart Quantity
export const updateCartQuantity = createAsyncThunk(
  "auth/update-cart",
  async (data, thunkAPI) => {
    try {
      return await userService.updateCartQuantity(data);
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

// Update Cart Quantity
export const createOrder = createAsyncThunk(
  "auth/create-order",
  async (data, thunkAPI) => {
    try {
      return await userService.createOrder(data);
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

// Get orders
export const getOrders = createAsyncThunk(
  "auth/get-order",
  async (_, thunkAPI) => {
    try {
      return await userService.getOrders();
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

// Get A order
export const getAOrder = createAsyncThunk(
  "auth/get-A-Order",
  async (id, thunkAPI) => {
    try {
      return await userService.getAOrder(id);
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

// Update User
export const updateUser = createAsyncThunk(
  "auth/update-User",
  async (userData, thunkAPI) => {
    try {
      return await userService.updateUser(userData);
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

// Update User Photo
export const updateUserPhoto = createAsyncThunk(
  "auth/update-user-photo",
  async (userPhoto, thunkAPI) => {
    try {
      return await userService.updateUserPhoto(userPhoto);
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

// Get A User
export const getAUser = createAsyncThunk(
  "auth/get-user",
  async (_, thunkAPI) => {
    try {
      return await userService.getAUser();
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

// Forgot Password Token
export const forgotPassword = createAsyncThunk(
  "auth/forgot-password",
  async (userEmail, thunkAPI) => {
    try {
      return await userService.forgotPasswordToken(userEmail);
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
// Reset Password
export const resetPassword = createAsyncThunk(
  "auth/reset-password",
  async (payload, thunkAPI) => {
    try {
      const { token, userData } = payload;
      return await userService.resetPassword(token, userData);
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

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    RESET_AUTH(state) {
      state.user = [];
      state.userCart = [];
      state.order = [];
      state.cart = [];
      state.userOrders = [];
      state.isError = false;
      state.isSuccess = false;
      state.isLoading = false;
      state.message = "";
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(register.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(register.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isLoggedIn = false;
        state.user = action.payload;
        toast.success("User Registration Successful");
      })
      .addCase(register.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.payload;
        state.user = [];
        toast.error(action.payload);
      })
      .addCase(getLoginStatus.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getLoginStatus.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isLoggedIn = action.payload;
        //console.log(action.payload);
        state.user = [];
        if (action.payload.message === "invalid signature") {
          state.isLoggedIn = false;
        }
      })
      .addCase(getLoginStatus.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      }) // Login User
      .addCase(login.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isLoggedIn = true;
        state.user = action.payload;
        //console.log(action.payload);
        toast.success("Login successful");
      })
      .addCase(login.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        state.user = [];
        toast.success(action.payload);
      })
      // Logout User
      .addCase(logout.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(logout.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isLoggedIn = false;
        state.user = [];
        state.userCart = [];
        state.userOrders = [];
        state.order = [];
        toast.success(action.payload);
        clearTokenCookie();
      })
      .addCase(logout.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        toast.success(action.payload);
      })
      .addCase(addToWishList.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(addToWishList.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.user = action.payload;
        toast.success("Product Added To WishList");
        //console.log(state.user);
      })
      .addCase(addToWishList.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.payload;
        toast.error(action.payload);
      })
      .addCase(getUserWishList.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getUserWishList.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.wishList = action.payload.wishlist;
      })
      .addCase(getUserWishList.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.payload;
        toast.error(action.payload);
      })
      .addCase(removeFromWishList.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(removeFromWishList.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        // state.user = action.payload;
        state.wishList = action.payload.wishlist;
        // console.log(state.wishList);
        // console.log(state.user);
      })
      .addCase(removeFromWishList.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.payload;
        toast.error(action.payload);
      })
      .addCase(addToCart.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(addToCart.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.cart = action.payload;
        toast.success("Added To Cart");
      })
      .addCase(addToCart.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.payload;
        toast.error(action.payload);
      })
      .addCase(getUserCart.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getUserCart.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.userCart = action.payload;
      })
      .addCase(getUserCart.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.payload;
      }) // RemoveA Item From Cart
      .addCase(removeFromCart.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(removeFromCart.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.userCart = action.payload;
        //console.log(action.payload);
        toast.success("Product Removed From cart");
      })
      .addCase(removeFromCart.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.payload;
        toast.error(action.payload);
      }) // Update Cart Quantity
      .addCase(updateCartQuantity.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateCartQuantity.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.userCart = action.payload;
        //console.log(action.payload);
        // console.log(action.payload);
        toast.success("Cart Updated");
      })
      .addCase(updateCartQuantity.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.payload;
        toast.error(action.payload);
      }) // Create Order
      .addCase(createOrder.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createOrder.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.order = action.payload;
        toast.success("Order Created");
      })
      .addCase(createOrder.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.payload;
        toast.error(action.payload);
      }) // Get Orders
      .addCase(getOrders.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getOrders.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.userOrders = action.payload;
        //console.log(action.payload);
      })
      .addCase(getOrders.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.payload;
        toast.error(action.payload);
      }) //Get A Order
      .addCase(getAOrder.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getAOrder.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.order = action.payload;
        //console.log(action.payload);
      })
      .addCase(getAOrder.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.payload;
        toast.error(action.payload);
      }) // Update User
      .addCase(updateUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.user = action.payload;
        toast.success("User Profile Updated");
        //console.log(action.payload);
      })
      .addCase(updateUser.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.payload;
        toast.error(action.payload);
      }) // Update User Photo
      .addCase(updateUserPhoto.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateUserPhoto.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.user = action.payload;
        toast.success("Image Updated");
        //console.log(action.payload);
      })
      .addCase(updateUserPhoto.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.payload;
        toast.error(action.payload);
      }) // Get A User
      .addCase(getAUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getAUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.user = action.payload;
        //console.log(action.payload);
      })
      .addCase(getAUser.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.payload;
        toast.error(action.payload);
      }) // Forgot Password
      .addCase(forgotPassword.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(forgotPassword.fulfilled, (state) => {
        state.isLoading = false;
        state.isSuccess = true;
        //console.log(action.payload);
        toast.success("Password Reset Link is Sent to Your Mail Please Check");
      })
      .addCase(forgotPassword.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.payload;
        toast.error(action.payload);
      }) // Reset Password
      .addCase(resetPassword.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(resetPassword.fulfilled, (state) => {
        state.isLoading = false;
        state.isSuccess = true;
      })
      .addCase(resetPassword.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.payload;
        toast.error(action.payload);
      });
  },
});

export const { RESET_AUTH } = authSlice.actions;
export default authSlice.reducer;
