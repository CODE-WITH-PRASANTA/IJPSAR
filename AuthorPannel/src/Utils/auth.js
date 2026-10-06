// src/utils/auth.js

// Decode a JWT payload without any library
export const decodeToken = (token) => {
  try {
    const base64Url = token.split(".")[1];
    const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
    const jsonPayload = decodeURIComponent(
      atob(base64)
        .split("")
        .map((c) => "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2))
        .join("")
    );
    return JSON.parse(jsonPayload);
  } catch (err) {
    return null;
  }
};

// Returns true only if token exists AND is not expired
export const isTokenValid = () => {
  const token = localStorage.getItem("authorToken");
  if (!token) return false;

  const decoded = decodeToken(token);
  if (!decoded || !decoded.exp) return false;

  return decoded.exp * 1000 > Date.now();
};

// Milliseconds remaining until token expiry (0 if expired/invalid)
export const getTokenRemainingTime = () => {
  const token = localStorage.getItem("authorToken");
  if (!token) return 0;

  const decoded = decodeToken(token);
  if (!decoded || !decoded.exp) return 0;

  const remaining = decoded.exp * 1000 - Date.now();
  return remaining > 0 ? remaining : 0;
};

// Clear storage and redirect to login (with reason flag)
export const logoutUser = (reason = "session-expired") => {
  localStorage.removeItem("authorToken");
  localStorage.removeItem("author");
  window.location.href = `/author/auth?reason=${reason}`;
};