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

    /* =====================================================
       GET ROLE TOKENS
    ===================================================== */

    const adminToken =
      localStorage.getItem("adminToken");

    const editorToken =
      localStorage.getItem("editorToken");

    const authorToken =
      localStorage.getItem("authorToken");

    const normalToken =
      localStorage.getItem("token");

    console.log(
      "ADMIN TOKEN EXISTS:",
      Boolean(adminToken)
    );

    console.log(
      "EDITOR TOKEN EXISTS:",
      Boolean(editorToken)
    );

    console.log(
      "AUTHOR TOKEN EXISTS:",
      Boolean(authorToken)
    );

    console.log(
      "NORMAL TOKEN EXISTS:",
      Boolean(normalToken)
    );

    /* =====================================================
       SELECT TOKEN
    =====================================================

       IMPORTANT:

       Admin requests should use adminToken.
       Editor requests should use editorToken.
       Author requests should use authorToken.

    ===================================================== */

    let token = null;

    const requestUrl =
      String(config.url || "").toLowerCase();

    /*
    ---------------------------------------------------------
    ADMIN REQUESTS
    ---------------------------------------------------------
    */

    if (
      requestUrl.includes("/admin/")
    ) {
      token =
        adminToken ||
        normalToken;
    }

    /*
    ---------------------------------------------------------
    EDITOR REQUESTS
    ---------------------------------------------------------
    */

    else if (
      requestUrl.includes("/editor/")
    ) {
      token =
        editorToken ||
        normalToken;
    }

    /*
    ---------------------------------------------------------
    AUTHOR REQUESTS
    ---------------------------------------------------------
    */

    else if (
      requestUrl.includes("/author/")
    ) {
      token =
        authorToken ||
        normalToken;
    }

    /*
    ---------------------------------------------------------
    SUBMITFORM REQUESTS
    ---------------------------------------------------------

    Some submitform routes are used by different roles.

    Therefore, use the available role token.

    Priority:

    admin
    editor
    author
    normal

    */

    else if (
      requestUrl.includes("/submitform/")
    ) {
      token =
        adminToken ||
        editorToken ||
        authorToken ||
        normalToken;
    }

    /*
    ---------------------------------------------------------
    OTHER REQUESTS
    ---------------------------------------------------------
    */

    else {
      token =
        adminToken ||
        editorToken ||
        authorToken ||
        normalToken;
    }

    /* =====================================================
       ADD AUTHORIZATION HEADER
    ===================================================== */

    if (token) {
      config.headers = config.headers || {};

      config.headers.Authorization =
        `Bearer ${token}`;

      console.log(
        "AUTHORIZATION HEADER ADDED"
      );
    } else {
      console.log(
        "NO AUTH TOKEN FOUND"
      );
    }

    return config;
  },

  (error) => {
    console.error(
      "API REQUEST INTERCEPTOR ERROR:",
      error
    );

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
    console.error(
      "========== API RESPONSE ERROR =========="
    );

    console.error(
      "STATUS:",
      error.response?.status
    );

    console.error(
      "URL:",
      error.config?.url
    );

    console.error(
      "MESSAGE:",
      error.response?.data
    );

    return Promise.reject(error);
  }
);

export default API;