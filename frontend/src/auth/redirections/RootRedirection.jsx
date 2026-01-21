import { Navigate } from "react-router-dom";
import { useAuth } from "../AuthContext";
import LoadingPage from "../../pages/LoadingPage";

const RootRedirection = () => {
  const { isAuthenticated, loading } = useAuth();

  if (loading) return <LoadingPage/>;

  return isAuthenticated
    ? <Navigate to="/chat" replace />
    : <Navigate to="/login" replace />;
};

export default RootRedirection;