import { createContext, useContext, useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";

const AuthContext = createContext();

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Utility to decode token and check expiry
  const decodeAndValidateToken = (token) => {
    try {
      const decoded = jwtDecode(token);

      // Check for token expiration
      const now = Date.now() / 1000;
      if (decoded.exp && decoded.exp < now) {
        console.warn("Token expired");
        return null;
      }

      return decoded;
    } catch (error) {
      console.error("Token decoding failed:", error);
      return null;
    }
  };

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (token) {
      const decoded = decodeAndValidateToken(token);
      if (decoded) {
        setUser(decoded);
      } else {
        localStorage.removeItem("token");
      }
    }

    setLoading(false);
  }, []);

  const login = (token) => {
    const decoded = decodeAndValidateToken(token);
    if (decoded) {
      setUser(decoded);
      localStorage.setItem("token", token);
      alert("Logged in successfully");
    } else {
      console.error("Invalid or expired token during login");
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("token");
  };

  const value = {
    user,                           // full payload from JWT
    role: user?.role || null,       // shortcut for convenience
    isLoggedIn: !!user,
    login,
    logout,
  };

  if (loading) return <div>Loading... Please wait</div>;

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
