import axios from "axios";

// const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
export const API_URL = `http://localhost:5000/api/enquiry/`;

// Get All Blogs
const createEnquiry = async (enquiry) => {
  const response = await axios.post(API_URL, enquiry);
  return response.data;
};

// // Get A Blog
// const getABlog = async (id) => {
//   const response = await axios.get(API_URL + `${id}`);
//   return response.data;
// };

const contactService = {
  createEnquiry,
};
export default contactService;
