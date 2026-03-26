import { useEffect, useState } from "react";
import { deleteFriend, blockFriend, unblockFriend } from "../../utils/apiCalls";
import { defaultProfilePictureUrl } from "../../utils/data/data";

const FriendListCard = ({ id, imgUrl, name, onSelect, isBlocked, onDelete }) => {
  const [options, setOptions] = useState(false);
  const [blocked, setBlocked] = useState(isBlocked === "blocked");
  const [confirmAction, setConfirmAction] = useState(null); 
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setBlocked(isBlocked === "blocked");
  }, [isBlocked])

  const handleDelete = async () => {
    try {
      setLoading(true);
      await deleteFriend(id);
      onDelete(id);
    } catch (err) {
      console.error("Failed to delete friend", err);
    } finally {
      setLoading(false);
      setOptions(false);
      setConfirmAction(null);
    }
  };

  const handleBlockOrUnblock = async () => {
    try {
      setLoading(true);
      blocked ? await unblockFriend(id) : await blockFriend(id);
      setBlocked(!blocked);
    } catch (err) {
      console.error("Failed to block/unblock friend", err);
    } finally {
      setLoading(false);
      setOptions(false);
      setConfirmAction(null);
    }
  };

  useEffect(() => {
    if (!options && !confirmAction) return;

    const handleKeyDown = (e) => {
      if (e.key === "Escape") {
        setOptions(false);
        setConfirmAction(null);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [options, confirmAction]);

  return (
    <>
      <div
        onClick={() => {
          if (blocked) return;
          onSelect();
        }}
        className="relative flex w-full h-16 gap-2 items-center mb-2 
                   border-2 border-purple-300 rounded-2xl 
                   cursor-pointer hover:bg-purple-100 shadow-xl"
      >
        <div className="w-16 h-full p-2">
          <img
            src={imgUrl ? import.meta.env.VITE_BASE_IMAGE_URL + imgUrl : defaultProfilePictureUrl}
            alt={name}
            className="w-full h-full rounded-full object-cover"
          />
        </div>

        <div className="flex flex-col w-[70%] truncate">
          <h2 className="font-bold text-[20px] text-gray-600 truncate">
            {name}
          </h2>

          {blocked && (
            <span className="text-xs text-gray-500">
              User is blocked
            </span>
          )}
        </div>

        <i
          onClick={(e) => {
            e.stopPropagation();
            setOptions(!options);
          }}
          className="ri-more-2-fill
                     rounded-full w-6 h-6 flex items-center 
                     justify-center cursor-pointer"
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
              onClick={() => setConfirmAction("block")}
              className="px-3 py-2 text-sm text-yellow-600 
                         hover:bg-yellow-100 text-left cursor-pointer"
            >
              {blocked ? "Unblock" : "Block"}
            </button>

            <button
              onClick={() => setConfirmAction("delete")}
              className="px-3 py-2 text-sm text-red-600 
                         hover:bg-red-100 text-left cursor-pointer"
            >
              Remove
            </button>
          </div>
        )}
      </div>

      {confirmAction && (
        <div className="fixed inset-0 flex justify-center items-center 
                        bg-black/40 backdrop-blur-sm z-50">
          <div className="bg-white p-6 rounded-xl shadow-xl w-[300px] flex flex-col gap-4">
            <h3 className="text-lg font-semibold text-center">
              {confirmAction === "delete"
                ? `Remove ${name} from your friends?`
                : blocked
                ? `Unblock ${name}?`
                : `Block ${name}?`}
            </h3>

            <div className="flex gap-3">
              <button
                disabled={loading}
                onClick={
                  confirmAction === "delete"
                    ? handleDelete
                    : handleBlockOrUnblock
                }
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

export default FriendListCard;