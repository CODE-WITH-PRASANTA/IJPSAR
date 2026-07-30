import {
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

import api from "../api/axios";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  /* ================= GET SAVED ADMIN ================= */

  const [admin, setAdmin] = useState(() => {
    try {
      const savedAdmin = localStorage.getItem("admin");

      return savedAdmin
        ? JSON.parse(savedAdmin)
        : null;
    } catch (error) {
      return null;
    }
  });

  const [loading, setLoading] = useState(true);

  /* ================= CHECK ADMIN ================= */

  const checkAdmin = async () => {
    try {
      const response = await api.get("/admin/profile");

      const adminData = response.data.admin;

      setAdmin(adminData);

      localStorage.setItem(
        "admin",
        JSON.stringify(adminData)
      );
    } catch (error) {
      console.log(
        "PROFILE ERROR:",
        error.response?.data || error.message
      );

      /*
        Only logout when backend confirms
        authentication failed
      */

      if (
        error.response?.status === 401 ||
        error.response?.status === 403
      ) {
        setAdmin(null);

        // localStorage.removeItem("admin");
      }
    } finally {
      setLoading(false);
    }
  };

  /* ================= LOGIN ================= */

 const login = async (email, password) => {
  const response = await api.post("/admin/login", {
    email,
    password,
  });

  const { admin, token } = response.data;

  setAdmin(admin);

  localStorage.setItem("admin", token);

  localStorage.setItem(
    "admin",
    JSON.stringify(admin)
  );

  return response.data;
};

  /* ================= LOGOUT ================= */

const logout = async () => {
  try {
    await api.post("/admin/logout");
  } catch (error) {
    console.log("Logout error:", error);
  } finally {
    setAdmin(null);

    localStorage.removeItem("adminToken");
    localStorage.removeItem("admin");
  }
};

  /* ================= PAGE RELOAD ================= */

  useEffect(() => {
    checkAdmin();
  }, []);

  const isAuthenticated = Boolean(admin);

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

/* ================= CUSTOM HOOK ================= */

export const useAuth = () => {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error(
      "useAuth must be used inside AuthProvider"
    );
  }

  return context;
};