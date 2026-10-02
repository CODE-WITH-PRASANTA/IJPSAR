import axios from "axios";

export const BASE_URL = "http://localhost:5000";
export const IMG_URL = BASE_URL;

export const API = axios.create({
  baseURL: `${BASE_URL}/api`,
  withCredentials: true,
});

API.interceptors.request.use(
  (config) => {
    const authorToken = localStorage.getItem("authorToken");

    if (authorToken) {
      config.headers.Authorization = `Bearer ${authorToken}`;
    }

    return config;
  },
  (error) => Promise.reject(error)
);

export default API;