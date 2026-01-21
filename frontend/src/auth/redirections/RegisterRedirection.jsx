import { Navigate } from "react-router-dom";
import { useAuth } from "../AuthContext";
import LoadingPage from "../../pages/LoadingPage";

const RegisterRedirection = () => {
  const { isAuthenticated, loading } = useAuth();

  if (loading) return <LoadingPage/>;

  return isAuthenticated
    ? <Navigate to="/chat" replace />
    : <Navigate to="/register" replace />;
};

export default RegisterRedirection;