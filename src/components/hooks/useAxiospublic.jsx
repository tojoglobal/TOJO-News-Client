import axios from "axios";

const axiosPublic = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL,
  headers: {
    "Content-type": "application/json",
  },
  withCredentials: true,
});

// Add response interceptor
axiosPublic.interceptors.response.use(
  response => response,
  error => {
    if (error.response?.status === 500) {
      console.error('Server Error:', error.response.data);
      // You can add custom error handling here
    }
    return Promise.reject(error);
  }
);

export const useAxiospublic = () => {
  return axiosPublic;
};
