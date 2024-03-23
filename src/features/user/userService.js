import axios from "axios";

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
export const API_URL = `${BACKEND_URL}/api/user/`;
//console.log(BACKEND_URL);

// Register User
const registerUser = async (userData) => {
  const response = await axios.post(API_URL + "register", userData);
  return response.data;
};

// Register User
const loginUser = async (userData) => {
  const response = await axios.post(API_URL + "login", userData);
  return response.data;
};

// Logout User
const logout = async () => {
  const response = await axios.get(API_URL + "logout");
  return response.data.message;
};

// Login Status
const getLoginStatus = async () => {
  const response = await axios.get(API_URL + "getLoginStatus");
  return response.data;
};

// Register User
const addToWishList = async (id) => {
  const response = await axios.post(API_URL + "wishlist", { id });
  return response.data;
};

// Register User
const getUserWishList = async (id) => {
  const response = await axios.get(API_URL + "wishlist");
  return response.data;
};

// Add To Cart
const addToCart = async (cartItem) => {
  const response = await axios.post(API_URL + "cart", cartItem);
  return response.data;
};

// Add To Cart
const getUserCart = async () => {
  const response = await axios.get(API_URL + "cart");
  return response.data;
};

// Remove From WishList
const removeFromWishList = async (id) => {
  const response = await axios.patch(API_URL + "remove", { id });
  return response.data;
};

// Remove From Cart
const removeFromCart = async (id) => {
  const response = await axios.delete(API_URL + `cart/${id}`);
  return response.data;
};

// Update Cart Quantity
const updateCartQuantity = async (data) => {
  const response = await axios.patch(API_URL + "cart", data);
  return response.data;
};

// CreateOrder
const createOrder = async (data) => {
  const response = await axios.post(API_URL + "create-order", data);
  return response.data;
};

// CreateOrder
const getOrders = async () => {
  const response = await axios.get(API_URL + "get-orders");
  return response.data;
};
// CreateOrder
const getAOrder = async (id) => {
  const response = await axios.get(API_URL + `order/${id}`);
  return response.data;
};

const updateUser = async (userData) => {
  const response = await axios.patch(API_URL + `update-user`, userData);
  return response.data;
};

const getAUser = async () => {
  const response = await axios.get(API_URL + `get-user`);
  return response.data;
};

const updateUserPhoto = async (photoURL) => {
  const response = await axios.patch(API_URL + `update-user-photo`, photoURL);
  return response.data;
};

// Forgot Password Token
const forgotPasswordToken = async (userEmail) => {
  const response = await axios.patch(
    API_URL + `forgot-password-token`,
    userEmail
  );
  return response.data;
};
// Reset Password
const resetPassword = async (token, userData) => {
  const response = await axios.patch(
    API_URL + `reset-password/${token}`,
    userData
  );
  return response.data;
};

const userService = {
  registerUser,
  getLoginStatus,
  loginUser,
  logout,
  addToWishList,
  getUserWishList,
  removeFromWishList,
  addToCart,
  getUserCart,
  removeFromCart,
  updateCartQuantity,
  createOrder,
  getOrders,
  getAOrder,
  updateUser,
  getAUser,
  updateUserPhoto,
  forgotPasswordToken,
  resetPassword,
};
export default userService;
