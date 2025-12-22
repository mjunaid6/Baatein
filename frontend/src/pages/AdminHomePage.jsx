import { useState } from "react";
import AdminNavBar from "../components/admin/AdminNavBar";
import UserList from "../components/admin/UserList";
import { arr } from "../utils/arrays";
import { Route, Routes } from "react-router-dom";
import AdminDashboard from "../components/admin/AdminDashboard";
import AdminBG from "../components/styles/AdminBG";
import AdminList from "../components/admin/AdminsList";
import AdminHelp from "../components/admin/AdminHelp";
import Meme from "../components/admin/Meme";

const AdminHomePage = () => {
    const [users,setUsers] = useState(arr);
    return (
        <div className="relative min-h-screen flex flex-col items-center overflow-hidden">
            <AdminNavBar/>
            <AdminBG/>
            <Routes>
                <Route index element={<AdminDashboard/>}/>
                <Route path="users" element={<UserList users={users}/>}/>
                <Route path="admins" element={<AdminList/>}/>
                <Route path="help" element={<AdminHelp/>}/>
                <Route path="payments" element={<Meme/>}/>
            </Routes>
        </div>
    )
}

export default AdminHomePage;