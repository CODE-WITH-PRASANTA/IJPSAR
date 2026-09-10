import axios from "axios";

export const BASE_URL = "http://localhost:5000";
export const IMG_URL = BASE_URL;

export const API = axios.create({
  baseURL: `${BASE_URL}/api`,
});

/* =========================================================
   REQUEST INTERCEPTOR
========================================================= */

API.interceptors.request.use(
  (config) => {
    const adminToken = localStorage.getItem("adminToken");
    const editorToken = localStorage.getItem("editorToken");
    const authorToken = localStorage.getItem("authorToken");
    const normalToken = localStorage.getItem("token");

    let token = null;
    const requestUrl = String(config.url || "").toLowerCase();

    if (requestUrl.includes("/admin/")) {
      token = adminToken || normalToken;
    } else if (requestUrl.includes("/editor/")) {
      token = editorToken || normalToken;
    } else if (requestUrl.includes("/author/")) {
      token = authorToken || normalToken;
    } else if (requestUrl.includes("/submitform/")) {
      token = adminToken || editorToken || authorToken || normalToken;
    } else {
      token = adminToken || editorToken || authorToken || normalToken;
    }

    if (token) {
      config.headers = config.headers || {};
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },

  (error) => {
    return Promise.reject(error);
  }
);

/* =========================================================
   RESPONSE INTERCEPTOR
========================================================= */

API.interceptors.response.use(
  (response) => {
    return response;
  },

  (error) => {
    return Promise.reject(error);
  }
);

export default API;