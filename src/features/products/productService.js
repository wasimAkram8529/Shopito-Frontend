import axios from "axios";

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
export const API_URL = `${BACKEND_URL}/api/products/`;

// Get All Products
const getProducts = async (query) => {
  const { sort, minAmount, maxAmount, tags } = query;
  const response = await axios.get(API_URL, {
    params: {
      sort: `${sort}`,
      numericFilters: `price>=${minAmount},price<=${maxAmount}`,
      tags,
    },
  });
  return response.data;
};

// Get A Product
const getAProduct = async (id) => {
  const response = await axios.get(API_URL + `${id}`);
  return response.data;
};

// review A Product
const writeProductReview = async (id, review) => {
  const response = await axios.post(API_URL + `reviewProduct/${id}`, review);
  return response.data;
};

// Update Product Review
const updateProductReview = async (id, newReview) => {
  //console.log(newReview);
  const response = await axios.patch(API_URL + `updateReview/${id}`, newReview);
  return response.data;
};
// Delete A Review
const deleteProductReview = async (id, userId) => {
  //console.log("id", userId);
  const response = await axios.patch(API_URL + `deleteReview/${id}`, {
    userId,
  });
  return response.data;
};

const productService = {
  getProducts,
  getAProduct,
  writeProductReview,
  updateProductReview,
  deleteProductReview,
};
export default productService;
