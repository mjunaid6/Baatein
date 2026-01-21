import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "./AuthContext"

const AdminRoute = () => {
    const {isAuthenticated, role} = useAuth();

    if(!isAuthenticated) return <Navigate to={"/login"} replace />;
    if(role !== "ADMIN") return <Navigate to={"/chat"} replace/>;

    return <Outlet/>;
}

export default AdminRoute;