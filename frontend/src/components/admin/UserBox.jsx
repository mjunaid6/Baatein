const UserBox = ({ user }) => {
  return (
    <div className="
      w-full h-16 px-3
      flex items-center gap-3
      rounded-2xl cursor-pointer
      bg-blue-300/80 hover:bg-blue-400/80
      backdrop-blur-md
      transition-all duration-200
      hover:shadow-lg
    ">
      <img
        src={user.imageUrl}
        alt={user.name}
        className="w-11 h-11 object-cover rounded-full border-2 border-white/50"
      />

      <h2 className="flex-1 font-semibold text-gray-800">
        {user.name}
      </h2>

      <div
        className={`
          p-2
          text-xs font-medium
          rounded-full
          transition-all duration-200
          ${user.online
            ? "bg-green-500/20 text-green-700"
            : "bg-red-500/20 text-red-700"}
        `}
      >
        {user.online ? "Online" : "Offline"}
      </div>
    </div>
  );
};

export default UserBox;
