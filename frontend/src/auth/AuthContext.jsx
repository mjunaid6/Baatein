import { createContext, useContext , useEffect, useState } from "react";
import api from "./api";
import { setToken } from "./authToken";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        let mounted = true;

        const refresh = async () => {
            try {
            const resp = await api.post("/auth/refresh-token");
            if (mounted) {
                setAccessToken(resp.data.accessToken);
                setToken(resp.data.accessToken);
                setRole(resp.data.role ?? null);
            }
            } catch {
            if (mounted) {
                setAccessToken(null);
                setToken(resp.data.accessToken);
                setRole(null);
            }
            } finally {
            if (mounted) {
                setLoading(false); 
            }
            }
        };

        refresh();

        return () => {
            mounted = false;
        };
    }, []);


    const [accessToken, setAccessToken] = useState(null)
    const [role, setRole] = useState(null)
    const isAuthenticated = !!accessToken;

    return (
        <AuthContext.Provider
            value={{accessToken , setAccessToken, role, setRole, isAuthenticated, loading}}
        > 
            {children}
        </AuthContext.Provider> 
    )
}


export const useAuth = () => useContext(AuthContext);