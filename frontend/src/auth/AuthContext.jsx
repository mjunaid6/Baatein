import { createContext, useContext , useEffect, useState } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    useEffect(() => {
        const refresh = async () => {
            try{
                const resp = await api.post("/auth/refresh-token")
                setAccessToken(resp.data.accesToken)
            } catch (err) {
                setAccessToken(null);
            }
        }

        refresh();
    }, [])

    const [accessToken, setAccessToken] = useState(null)
    const [role, setRole] = useState(null)
    const isAuthenticated = !!accessToken;

    return (
        <AuthContext.Provider
            value={{accessToken , setAccessToken, role, setRole, isAuthenticated}}
        > 
            {children}
        </AuthContext.Provider> 
    )
}


export const useAuth = () => useContext(AuthContext);

export default useAuth;