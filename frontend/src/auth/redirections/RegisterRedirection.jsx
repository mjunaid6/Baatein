import { Navigate } from "react-router-dom";
import { useAuth } from "../AuthContext";
import LoadingPage from "../../pages/LoadingPage";
import Register from "../../pages/Register";

const RegisterRedirection = () => {
  const { isAuthenticated, loading } = useAuth();

  if (loading) return <LoadingPage/>;

  return isAuthenticated
    ? <Navigate to="/chat" replace />
    : <Register/>;
};

export default RegisterRedirection;