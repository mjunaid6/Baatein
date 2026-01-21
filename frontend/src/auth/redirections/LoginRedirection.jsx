import { Navigate } from "react-router-dom";
import { useAuth } from "../AuthContext";
import Login from "../../pages/Login";
import LoadingPage from "../../pages/LoadingPage";

const LoginRedirection = () => {
  const { isAuthenticated, loading } = useAuth();

  if (loading) return <LoadingPage />;

  return isAuthenticated
    ? <Navigate to="/chat" replace />
    : <Login />;
};

export default LoginRedirection;
