import axios from "axios";

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
export const API_URL = `${BACKEND_URL}/api/blogs/`;

// Get All Blogs
const getAllBlogs = async (filterData) => {
  const { sort, tags, category } = filterData;
  const response = await axios.get(API_URL, {
    params: {
      sort,
      tags,
      category,
    },
  });
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
