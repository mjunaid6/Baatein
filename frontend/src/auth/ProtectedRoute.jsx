import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "./AuthContext"
import LoadingPage from "../pages/LoadingPage"

const ProtectedRoute = () => {
    const {isAuthenticated, loading} = useAuth();

    if(loading) return <LoadingPage/>;

    return isAuthenticated ? <Outlet/> : <Navigate to={"/login"}/>;
}

export default ProtectedRoute;