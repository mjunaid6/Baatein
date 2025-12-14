import AdminSideBar from "./AdminSideBar";
import { arr } from "../../utils/arrays";
import { useState } from "react";
import BG from "../../pages/BG";

const AdminPanel = () => {
    const [users, setUsers] = useState(arr);
    return (
        <>
            <BG/>
            <AdminSideBar users={users}/>
        </>
    )
}

export default AdminPanel;