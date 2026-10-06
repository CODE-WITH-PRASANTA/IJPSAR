// src/api/Axios.js
import axios from "axios";
import { logoutUser } from "../utils/auth";

export const BASE_URL = "http://localhost:5000";
export const IMG_URL = BASE_URL;

export const API = axios.create({
  baseURL: `${BASE_URL}/api`,
  withCredentials: true,
});

// ─────────────────────────────────────────────
// Request interceptor — attach token
// ─────────────────────────────────────────────
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

// ─────────────────────────────────────────────
// Response interceptor — handle expired / invalid token
// ─────────────────────────────────────────────
API.interceptors.response.use(
  (response) => response,
  (error) => {
    const status = error.response?.status;
    const url = error.config?.url || "";

    // Don't trigger logout for auth endpoints themselves —
    // we want the login/register page to show inline errors instead.
    const isAuthEndpoint =
      url.includes("/author/login") ||
      url.includes("/author/register");

    if (status === 401 && !isAuthEndpoint) {
      logoutUser("session-expired");
    }

    return Promise.reject(error);
  }
);

export default API;