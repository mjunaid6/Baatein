import UserBox from "./UserBox";
import "../../index.css";

const UserList = ({ users }) => {
  return (
    <div className="
      w-[80vw]
      flex flex-col
      bg-white/70 backdrop-blur-2xl
      border-r border-blue-400/40
      shadow-xl
    ">
      <div className="flex justify-around items-center gap-3 p-3 border-b border-blue-300/40 rounded-b-xl">
        <h2 className="text-lg font-semibold text-gray-800">
          Users
        </h2>
        {/* <button
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
        </button> */}
      </div>

      <div className="flex-1 overflow-y-scroll hide-scroll-bar p-3 space-y-2">
        {users.map((user) => (
          <UserBox key={user.id} user={user} />
        ))}
      </div>
    </div>
  );
};

export default UserList;
