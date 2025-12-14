import AdminSideBar from "./AdminSideBar";
import { arr } from "../../utils/arrays";
import { useState } from "react";

const AdminPanel = () => {
    const [users, setUsers] = useState(arr);
    return (
        <>
            <AdminSideBar users={users}/>
        </>
    )
}

export default AdminPanel;