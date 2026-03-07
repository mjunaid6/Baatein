import { createContext, useContext, useEffect, useState } from "react";
import api from "./api";
import { setToken } from "./authToken";
import { refreshToken } from "../utils/authAPICalls";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [accessToken, setAccessToken] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let mounted = true;

    const refresh = async () => {
      try {
        const data = await refreshToken();

        if (mounted) {
          setAccessToken(data.accessToken);
          setToken(data.accessToken);  
        }
      } catch {
        if (mounted) {
          setAccessToken(null);
          setToken(null);  
        }
      } finally {
        if (mounted) setLoading(false);
      }
    };

    refresh();
    return () => (mounted = false);
  }, []);

  const isAuthenticated = !!accessToken;

  return (
    <AuthContext.Provider
      value={{
        accessToken,
        setAccessToken,
        isAuthenticated,
        loading,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);