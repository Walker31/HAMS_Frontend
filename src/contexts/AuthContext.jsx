import { createContext, useContext, useEffect, useState } from "react";

const AuthContext = createContext();

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    try {
      const saved = localStorage.getItem("user");
      if (saved) {
        setUser(JSON.parse(saved));
      }
    } catch (err) {
      console.log("Failed To parse user data from localStorage", err);
      localStorage.removeItem("user");
    }

    setLoading(false);
  }, []);

  const login = (userData) => {
    setUser(userData);
    localStorage.setItem("user", JSON.stringify(userData));
    localStorage.setItem("loggedIn", "true");
    alert("Logged in")
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("user");
    localStorage.setItem("loggedIn", "false");
  };

  const value = {
    user,
    login,
    logout,
    isLoggedIn: !!user,
  };

  if (loading) {
    return <div>Let shii Load, pl wait</div>;
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
