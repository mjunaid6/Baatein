import { useState } from "react";
import { acceptFriendRequest, rejectFriendRequest } from "../../utils/apiCalls";
import { defaultProfilePictureUrl } from "../../utils/data/data";

const FriendRequestCard = ({ id, name, imageUrl, handleAcceptedOrRejected }) => {
  const [loading, setLoading] = useState(false);

  const handleAcceptFriend = async () => {
    try {
      setLoading(true);

      await acceptFriendRequest(id);

      handleAcceptedOrRejected(id);
      
    } catch (error) {
      console.error("Failed to accept request:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleRejectFriend = async () => {
    try {
      setLoading(true);

      await rejectFriendRequest(id);

      handleAcceptedOrRejected(id);
      
    } catch (error) {
      console.error("Failed to reject request:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative flex w-full h-16 gap-2 items-center mb-2 
                    border-2 border-purple-300 rounded-md 
                    hover:bg-purple-100 shadow-xl">

      <div className="w-16 h-full p-2">
        <img
          src={imageUrl || defaultProfilePictureUrl}
          alt={name}
          className="w-full h-full rounded-full object-cover"
        />
      </div>

      <h2 className="font-bold text-[20px] text-gray-600 w-[70%]">
        {name}
      </h2>

      <button
        disabled={loading}
        onClick={handleAcceptFriend}
        className="mr-3 text-xl text-gray-600 hover:text-green-500 
                   disabled:opacity-50"
      >
        {loading ? "..." : <i className="ri-user-add-fill"></i>}
      </button>

      <button
        disabled={loading}
        onClick={handleRejectFriend}
        className="mr-3 text-xl text-gray-600 hover:text-red-500 
                   disabled:opacity-50"
      >
        {loading ? "..." : <i className="ri-user-unfollow-line"></i>}
      </button>
      

    </div>
  );
};

export default FriendRequestCard;