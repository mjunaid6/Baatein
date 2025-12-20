import { useState } from "react";
import AdminNavBar from "./AdminNavBar";
import UserList from "./UserList";
import { arr } from "../../utils/arrays";
import { Route, Routes } from "react-router-dom";
import AdminDashboard from "./AdminDashboard";
import AdminBG from "../styles/AdminBG";
import AdminList from "./AdminsList";
import AdminHelp from "./AdminHelp";
import Meme from "./Meme";

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