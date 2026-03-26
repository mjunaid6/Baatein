import { useEffect, useState } from "react";
import { leaveConversation } from "../../utils/apiCalls";
import { defaultProfilePictureUrl } from "../../utils/data/data";

const ConversationCard = ({
  id,
  name,
  imgUrl,
  lastMessage,
  type,
  onSelect,
  onLeave
}) => {
  const [options, setOptions] = useState(false);
  const [confirmAction, setConfirmAction] = useState(null); 
  const [loading, setLoading] = useState(false);

  const handleLeaveConversation = async () => {
    try {
      setLoading(true);
      await leaveConversation(id);
      onLeave(id);
      setConfirmAction(null);
      setOptions(false);
    } catch (err) {
      console.error("Failed to leave conversation", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
      if (!options) return;

      const handleKeyDown = (e) => {
          if (e.key === "Escape") setOptions(false);
      };

      window.addEventListener("keydown", handleKeyDown);
      return () => window.removeEventListener("keydown", handleKeyDown);
  }, [options]);

  return (
    <>
      <div
        onClick={onSelect}
        className="relative flex w-full h-16 gap-3 items-center mb-2 
                   border-2 border-purple-300 rounded-2xl 
                   hover:bg-purple-100 shadow-xl 
                   cursor-pointer transition"
      >
        <div className="w-20 h-full p-2">
          <img
            src={imgUrl ? import.meta.env.VITE_BASE_IMAGE_URL + imgUrl : defaultProfilePictureUrl}
            alt={name}
            className="w-full h-full rounded-full object-cover"
          />
        </div>

        <div className="flex flex-col w-full overflow-hidden">
          <h2 className="font-bold text-[18px] text-gray-700 truncate">
            {name || (type === "GROUP" ? "Unnamed Group" : "Unknown User")}
          </h2>
          <p
            className={`text-sm truncate ${
              lastMessage ? "text-green-500" : "text-gray-500"
            }`}
          >
            {lastMessage || "No new messages"}
          </p>
        </div>

        <i
          onClick={(e) => {
            e.stopPropagation();
            setOptions(!options);
          }}
          className="ri-more-2-fill mr-3 text-gray-600 hover:text-purple-600 cursor-pointer"
        ></i>

        {options && (
          <div
            onClick={(e) => e.stopPropagation()}
            className="absolute top-[90%] right-2 
                       w-36 bg-white border border-gray-200 
                       rounded-lg shadow-lg flex flex-col 
                       overflow-hidden z-20"
          >
              <button
                onClick={() => setConfirmAction("leave")}
                className="px-3 py-2 text-sm text-yellow-600 
                           hover:bg-yellow-100 text-left cursor-pointer"
              >
                Leave
              </button>
          </div>
        )}
      </div>

      {confirmAction && (
        <div className="fixed inset-0 flex justify-center items-center 
                        bg-black/30 backdrop-blur-sm z-50">
          <div className="bg-white p-6 rounded-xl shadow-xl w-[300px] flex flex-col gap-4">
            <h3 className="text-lg font-semibold text-center">
                Are you sure you want to leave this conversation?
            </h3>

            <div className="flex gap-3">
              <button
                disabled={loading}
                onClick={handleLeaveConversation}
                className="flex-1 bg-red-500 text-white py-2 rounded-lg 
                           hover:bg-red-600 disabled:opacity-50"
              >
                {loading ? "Processing..." : "Confirm"}
              </button>

              <button
                onClick={() => setConfirmAction(null)}
                className="flex-1 bg-gray-300 py-2 rounded-lg 
                           hover:bg-gray-400"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ConversationCard;