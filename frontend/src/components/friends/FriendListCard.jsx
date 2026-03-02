import { useState } from "react";
import { deleteFriend, blockFriend, unblockFriend } from "../../utils/apiCalls";

const FriendListCard = ({ id, imgUrl, name, onSelect, isBlocked, onDelete }) => {
  const [options, setOptions] = useState(false);
  const [blocked, setBlocked] = useState(isBlocked === "blocked");

  const handleDelete = async (e) => {
    e.stopPropagation();
    try {
      deleteFriend(id);
      onDelete(id);
      setOptions(false);
    } catch (err) {
      console.error("Failed to delete friend", err);
    }
  };

  const handleBlock = async (e) => {
    e.stopPropagation();
    try {
      blocked ? unblockFriend(id) : blockFriend(id);
      setOptions(false);
      setBlocked(!blocked);
    } catch (err) {
      console.error("Failed to block friend", err);
    }
  };

  return (
    <div
      onClick={onSelect}
      className="relative flex w-full h-16 gap-2 items-center mb-2 
                 border-2 border-purple-300 rounded-2xl 
                 cursor-pointer hover:bg-purple-100 shadow-xl"
    >
      <div className="w-16 h-full p-2">
        <img
          src={imgUrl || "/default-avatar.png"}
          alt={name}
          className="w-full h-full rounded-full object-cover"
        />
      </div>

      <h2 className="font-bold text-[20px] text-gray-600 w-[70%]">
        {name}
      </h2>

      <i
        onClick={(e) => {
          e.stopPropagation();
          setOptions(!options);
        }}
        className="ri-arrow-drop-down-line hover:bg-purple-400 
                   rounded-full w-6 h-6 text-center 
                   flex items-center justify-center 
                   cursor-pointer"
      ></i>

      {options && (
        <div
          onClick={(e) => e.stopPropagation()}
          className="absolute top-[90%] right-2 
                     w-28 bg-white border border-gray-200 
                     rounded-lg shadow-lg flex flex-col 
                     overflow-hidden z-20"
        >
          <button
            onClick={handleBlock}
            className="px-3 py-2 text-sm text-yellow-600 
                       hover:bg-yellow-100 text-left"
          >
            {blocked ? "Unblock" : "Block"}
          </button>

          <button
            onClick={handleDelete}
            className="px-3 py-2 text-sm text-red-600 
                       hover:bg-red-100 text-left"
          >
            Remove
          </button>
        </div>
      )}
    </div>
  );
};

export default FriendListCard;