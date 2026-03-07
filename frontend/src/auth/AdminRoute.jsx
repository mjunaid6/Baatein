import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "./AuthContext"

const AdminRoute = () => {
    const {isAuthenticated} = useAuth();

    if(!isAuthenticated) return <Navigate to={"/login"} replace />;

    return <Outlet/>;
}

export default AdminRoute;