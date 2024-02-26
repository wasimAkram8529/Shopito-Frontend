import axios from "axios";

// const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
export const API_URL = `http://localhost:5000/api/blogs/`;

// Get All Blogs
const getAllBlogs = async () => {
  const response = await axios.get(API_URL);
  return response.data;
};

// Get A Blog
const getABlog = async (id) => {
  const response = await axios.get(API_URL + `${id}`);
  return response.data;
};

const blogService = {
  getAllBlogs,
  getABlog,
};
export default blogService;
