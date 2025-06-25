import { createContext, useContext, useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";

const AuthContext = createContext();

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [role, setRole] = useState(null);     
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (token) {
      try {
        const decoded = jwtDecode(token);
        setUser(decoded);
        setRole(decoded.role); // assuming token payload has `role`
      } catch (err) {
        console.error("Invalid token:", err);
        localStorage.removeItem("token");
      }
    }

    setLoading(false);
  }, []);

  const login = (token) => {
    try {
      const decoded = jwtDecode(token);
      setUser(decoded);
      setRole(decoded.role);
      localStorage.setItem("token", token);
      alert("Logged in successfully");
    } catch (err) {
      console.error("Invalid token on login:", err);
    }
  };

  const logout = () => {
    setUser(null);
    setRole(null);
    localStorage.removeItem("token");
  };

  const value = {
    user,
    role,
    login,
    logout,
    isLoggedIn: !!user,
  };

  if (loading) return <div>Loading... Please wait</div>;

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
