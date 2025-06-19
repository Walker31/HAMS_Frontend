import { createContext, use, useContext, useEffect,useState } from "react";

const AuthContext = createContext();

export function useAuth() {
    return useContext(AuthContext);
}

export function AuthProvider({children}) {
    const [user,setUser] = useState(null);
    const [loading,setLoading] = useState(true);

    useEffect(()=> {
        const savedUser = Json.parse(localStorage.getItem('user'));

        if(savedUser) {
            setUser(savedUser);
        }
        setLoading(false);
    },[]);

    const login = (userData) => {
        setUser(userData);
        localStorage.setItem('user',userData);
    }

    const logout = () => {
        setUser(null);
        localStorage.removeItem('user');
    }

    const value ={
        user,login,logout,isLoggedIn : !!user
    };

    if(loading) {
        return <div>Loading....</div>
    }

    return <AuthContext.Provider  value={value}>{children}</AuthContext.Provider>
}