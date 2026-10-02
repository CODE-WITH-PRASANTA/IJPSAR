import axios from "axios";

export const BASE_URL = "http://localhost:5000";
export const IMG_URL = BASE_URL;

const API = axios.create({
  baseURL: `${BASE_URL}/api`,
});

API.interceptors.request.use(
  (config) => {
    const editorToken = localStorage.getItem("editorToken");
    const authorToken = localStorage.getItem("authorToken");

    const token = editorToken || authorToken;

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default API;