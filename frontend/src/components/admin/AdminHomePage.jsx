import { useState } from "react";
import AdminNavBar from "./AdminNavBar";
import UserList from "./UserList";
import { arr } from "../../utils/arrays";

const AdminHomePage = () => {
    const [users,setUsers] = useState(arr);
    return (
        <div className="relative min-h-screen flex flex-col items-center">
            <AdminNavBar/>
            <UserList users={users}/>
        </div>
    )
}

export default AdminHomePage;