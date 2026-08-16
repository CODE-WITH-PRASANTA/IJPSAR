import axios from "axios";

export const BASE_URL = "http://localhost:5000";
export const IMG_URL = BASE_URL;

const API = axios.create({
  baseURL: `${BASE_URL}/api`,
});

API.interceptors.request.use(
  (config) => {
    console.log(
      "========== API REQUEST =========="
    );

    console.log(
      "METHOD:",
      config.method?.toUpperCase()
    );

    console.log(
      "URL:",
      config.url
    );

    /*
     * =====================================================
     * GET EDITOR TOKEN
     * =====================================================
     */

    const editorToken =
      localStorage.getItem("editorToken");

    /*
     * =====================================================
     * GET AUTHOR TOKEN
     * =====================================================
     */

    const authorToken =
      localStorage.getItem("authorToken");

    /*
     * =====================================================
     * SELECT TOKEN
     *
     * Editor token gets priority.
     * If editor token doesn't exist,
     * author token will be used.
     * =====================================================
     */

    const token =
      editorToken || authorToken;

    console.log(
      "EDITOR TOKEN EXISTS:",
      !!editorToken
    );

    console.log(
      "AUTHOR TOKEN EXISTS:",
      !!authorToken
    );

    console.log(
      "TOKEN EXISTS:",
      !!token
    );

    /*
     * =====================================================
     * ADD AUTHORIZATION HEADER
     * =====================================================
     */

    if (token) {
      config.headers.Authorization =
        `Bearer ${token}`;

      console.log(
        "AUTHORIZATION HEADER ADDED"
      );
    } else {
      console.warn(
        "NO AUTHORIZATION TOKEN FOUND"
      );
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default API;