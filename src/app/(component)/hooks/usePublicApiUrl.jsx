import axios from "axios";

const publicApiurl = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL,
  withCredentials: true,
});

export default publicApiurl;
