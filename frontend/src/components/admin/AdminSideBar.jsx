import UserBox from "./UserBox";
import "../../index.css";

const AdminSideBar = ({ users, setSideBar }) => {
  return (
    <div className="
      w-[25vw] h-screen
      flex flex-col
      bg-white/70 backdrop-blur-2xl
      border-r border-blue-400/40
      shadow-xl
    ">
      {/* Header */}
      <div className="flex items-center gap-3 p-3 border-b border-blue-300/40 rounded-b-xl">
        <button
          onClick={() => setSideBar(true)}
          className="
            flex items-center justify-center gap-2
            px-3 py-2
            text-sm font-semibold text-white
            rounded-xl
            bg-blue-500/90 hover:bg-blue-600
            border border-white/40
            backdrop-blur-md
            transition-all duration-200
            hover:shadow-lg
            cursor-pointer
          "
        >
          <i className="ri-arrow-go-back-fill text-lg"></i>
          Back
        </button>

        <h2 className="text-lg font-semibold text-gray-800">
          Users
        </h2>
      </div>

      {/* User List */}
      <div className="flex-1 overflow-y-scroll hide-scroll-bar p-3 space-y-2">
        {users.map((user) => (
          <UserBox key={user.id} user={user} />
        ))}
      </div>
    </div>
  );
};

export default AdminSideBar;
