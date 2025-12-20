import { useState } from "react";
import UserBox from "./UserBox";
import { adminsList } from "../../utils/arrays";
import AdminBox from "./AdminBox";

const AdminList = () => {
    const [admins, setAdmins] = useState(adminsList);
    return (
    <div className="
      w-[80vw] p-5 rounded-2xl
      flex flex-col
      bg-white/70 backdrop-blur-2xl
      border-r border-blue-400/40
      shadow-xl
    ">
      <div className="flex justify-around items-center gap-3 p-3 border-b border-blue-300/40 rounded-b-xl">
        <h2 className="text-lg font-semibold text-gray-800">
          Admins({admins.length})
        </h2>
      </div>

      <div className="flex-1 overflow-y-scroll hide-scroll-bar p-3 space-y-2 max-h-[70vh]">
        {admins.map((admin) => (
          <AdminBox key={admin.id} admin={admin} />
        ))}
      </div>
    </div>
  );
}

export default AdminList;