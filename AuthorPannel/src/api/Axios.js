import axios from "axios";

export const BASE_URL = "http://localhost:5000";
export const IMG_URL = BASE_URL;

export const API = axios.create({
  baseURL: `${BASE_URL}/api`,
});

/* ================= REQUEST ================= */

API.interceptors.request.use(
  (config) => {
    const authorToken =
      localStorage.getItem("authorToken");

    if (authorToken) {
      config.headers.Authorization =
        `Bearer ${authorToken}`;
    }

    console.log("API URL:", config.url);
    console.log(
      "TOKEN SENT:",
      authorToken ? "YES" : "NO"
    );

    return config;
  },
  (error) => Promise.reject(error)
);

export default API;