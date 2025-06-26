import { createContext, useContext, useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";

const AuthContext = createContext();

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const decodeAndValidateToken = (token) => {
    try {
      const decoded = jwtDecode(token);
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
      alert(`Logged in successfully as ${decoded.role}`);
    } else {
      console.error("Invalid or expired token during login");
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("token");
  };

  const value = {
    user,
    role: user?.role || null,       // dynamic role based on token
    isLoggedIn: !!user,
    login,
    logout,
  };

  if (loading) return <div>Loading... Please wait</div>;

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
