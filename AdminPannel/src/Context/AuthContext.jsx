import {
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

import api from "../api/axios";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  /* =====================================================
     GET SAVED ADMIN
  ===================================================== */

  const [admin, setAdmin] = useState(() => {
    try {
      const savedAdmin = localStorage.getItem("admin");

      return savedAdmin
        ? JSON.parse(savedAdmin)
        : null;
    } catch (error) {
      console.error(
        "SAVED ADMIN PARSE ERROR:",
        error
      );

      return null;
    }
  });

  const [loading, setLoading] = useState(true);

  /* =====================================================
     CHECK ADMIN
  ===================================================== */

  const checkAdmin = async () => {
    try {
      const response =
        await api.get("/admin/profile");

      const adminData =
        response?.data?.admin;

      if (!adminData) {
        throw new Error(
          "Admin profile data not found."
        );
      }

      setAdmin(adminData);

      localStorage.setItem(
        "admin",
        JSON.stringify(adminData)
      );
    } catch (error) {
      console.log(
        "PROFILE ERROR:",
        error.response?.data ||
          error.message
      );

      /*
      ===================================================
      ONLY CLEAR ADMIN STATE WHEN AUTH FAILED
      ===================================================
      */

      if (
        error.response?.status === 401 ||
        error.response?.status === 403
      ) {
        setAdmin(null);

        /*
        Do not remove adminToken here immediately.
        Axios/backend may be handling the session.
        */
      }
    } finally {
      setLoading(false);
    }
  };

  /* =====================================================
     LOGIN
  ===================================================== */

  const login = async (
    email,
    password
  ) => {
    try {
      console.log(
        "========== ADMIN LOGIN =========="
      );

      const response =
        await api.post(
          "/admin/login",
          {
            email,
            password,
          }
        );

      console.log(
        "ADMIN LOGIN RESPONSE:",
        response.data
      );

      /*
      ===================================================
      GET LOGIN DATA
      ===================================================
      */

      const adminData =
        response?.data?.admin;

      const token =
        response?.data?.token ||
        response?.data?.accessToken ||
        response?.data?.data?.token ||
        response?.data?.data?.accessToken;

      /*
      ===================================================
      TOKEN VALIDATION
      ===================================================
      */

      if (!token) {
        console.error(
          "ADMIN TOKEN NOT FOUND:",
          response.data
        );

        throw new Error(
          "Login successful, but authentication token was not returned."
        );
      }

      /*
      ===================================================
      ADMIN STATE
      ===================================================
      */

      setAdmin(adminData || null);

      /*
      ===================================================
      SAVE ADMIN TOKEN
      ===================================================
      */

      localStorage.setItem(
        "adminToken",
        token
      );

      /*
      ===================================================
      SAVE ADMIN DATA
      ===================================================
      */

      if (adminData) {
        localStorage.setItem(
          "admin",
          JSON.stringify(adminData)
        );
      }

      console.log(
        "ADMIN TOKEN SAVED:",
        Boolean(
          localStorage.getItem(
            "adminToken"
          )
        )
      );

      console.log(
        "ADMIN SAVED:",
        Boolean(
          localStorage.getItem("admin")
        )
      );

      return response.data;
    } catch (error) {
      console.error(
        "ADMIN LOGIN ERROR:",
        error
      );

      throw error;
    }
  };

  /* =====================================================
     LOGOUT
  ===================================================== */

  const logout = async () => {
    try {
      await api.post(
        "/admin/logout"
      );
    } catch (error) {
      console.log(
        "Logout error:",
        error
      );
    } finally {
      setAdmin(null);

      localStorage.removeItem(
        "adminToken"
      );

      localStorage.removeItem(
        "admin"
      );
    }
  };

  /* =====================================================
     PAGE RELOAD
  ===================================================== */

  useEffect(() => {
    checkAdmin();
  }, []);

  /* =====================================================
     AUTH STATUS
  ===================================================== */

  const isAuthenticated =
    Boolean(admin);

  /* =====================================================
     PROVIDER
  ===================================================== */

  return (
    <AuthContext.Provider
      value={{
        admin,
        loading,
        isAuthenticated,
        login,
        logout,
        checkAdmin,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

/* =====================================================
   CUSTOM HOOK
===================================================== */

export const useAuth = () => {
  const context =
    useContext(AuthContext);

  if (!context) {
    throw new Error(
      "useAuth must be used inside AuthProvider"
    );
  }

  return context;
};