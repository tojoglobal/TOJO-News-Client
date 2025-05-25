import axios from "axios";

const axiosPublic = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL,
  headers: {
    "Content-type": "application/json",
  },
  withCredentials: true,
});
export const useAxiospublic = () => {
  return axiosPublic;
};
