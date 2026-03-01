import { useState } from "react";
import api from "../../auth/api";

const FriendRequestForm = ({ friendRequestForm, setFriendRequestForm }) => {
  const [friendId, setFriendId] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!friendId.trim()) {
      setError("Friend ID is required");
      return;
    }

    try {
      setLoading(true);
      setError("");
      setMessage("");

      const resp = await api.put("/friend/addFriend", {
        friendId: friendId.trim(),
      });

      setMessage(resp.data || "Friend request sent successfully.");
      setFriendId("");

      setTimeout(() => {
        setFriendRequestForm(false);
      }, 1200);

    } catch (err) {
      setError(
        err.response?.data || "Failed to send friend request."
      );
    } finally {
      setLoading(false);
    }
  };

  const handleClose = () => {
    setFriendRequestForm(false);
    setMessage("");
    setError("");
  }

  if (!friendRequestForm) return null;

  return (
    <div className="absolute inset-0 flex justify-center items-center bg-black/30 backdrop-blur-sm z-50">
      
      <div className="flex flex-col text-lg font-semibold gap-4 
                      px-6 py-5 w-[320px] 
                      rounded-2xl 
                      bg-white shadow-xl">

        <h2 className="text-xl font-bold text-purple-600 text-center">
          Add Friend
        </h2>

        <form onSubmit={handleSubmit} className="flex flex-col gap-3">

          <input
            type="text"
            placeholder="Enter friend ID"
            value={friendId}
            onChange={(e) => setFriendId(e.target.value)}
            className="w-full border border-gray-300 
                       px-3 py-2 rounded-lg 
                       focus:outline-none 
                       focus:ring-2 focus:ring-purple-400"
          />

          {error && (
            <p className="text-sm text-red-500">{error}</p>
          )}

          {message && (
            <p className="text-sm text-green-600">{message}</p>
          )}

          <div className="flex gap-3 w-full">
            <button
              type="submit"
              disabled={loading}
              className="flex-1 bg-purple-500 text-white 
                         py-2 rounded-lg 
                         hover:bg-purple-600 transition
                         disabled:opacity-50"
            >
              {loading ? "Sending..." : "Send Request"}
            </button>

            <button
              type="button"
              onClick={() => handleClose()}
              className="flex-1 bg-gray-300 text-gray-800 
                         py-2 rounded-lg 
                         hover:bg-gray-400 transition"
            >
              Close
            </button>
          </div>

        </form>

      </div>
    </div>
  );
};

export default FriendRequestForm;