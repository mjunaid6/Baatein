import { useEffect, useRef, useState } from "react";

const Chat = ({ chats, userId, handleDeleteMessage }) => {
  const [activeMessageId, setActiveMessageId] = useState(null);
  const [openConfirmationModal, setOpenConfirmationModal] = useState(false);
  const menuRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setActiveMessageId(null);
      }
    };

    window.addEventListener("click", handleClickOutside);
    return () => window.removeEventListener("click", handleClickOutside);
  }, []);

  return (
    <>
      <div className="flex-1 w-full overflow-y-auto hide-scroll-bar p-4 flex flex-col-reverse gap-2">
        {[...chats].reverse().map((chat) => (
          <div
            key={chat.messageId}
            className={`
              relative group p-2 max-w-xs w-fit text-white rounded-2xl backdrop-blur-2xl border border-white/30
              flex gap-2
              ${
                userId === chat.senderId
                  ? "self-end bg-purple-600/50"
                  : "self-start bg-white/20"
              }
            `}
          >
            {userId === chat.senderId && (
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setActiveMessageId(activeMessageId === chat.messageId ? null : chat.messageId);
                }}
                className="hidden group-hover:block transition text-white font-extrabold cursor-pointer"
              >
                ⋮
              </button>
            )}

            {activeMessageId === chat.messageId && (
              <div
                ref={menuRef}
                className="absolute right-full m-2 bg-white text-black rounded-md shadow-lg text-sm z-50 overflow-hidden"
              >
                <button
                  onClick={() => {
                    setOpenConfirmationModal(true);
                  }}
                  className="px-3 py-2 hover:bg-red-300 w-full cursor-pointer"
                >
                  Delete
                </button>
              </div>
            )}

            {chat.content}
          </div>
        ))}
      </div>

      {openConfirmationModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/40 z-50">
          <div className="bg-white rounded-xl p-6 w-72 shadow-lg">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">
              Delete Message?
            </h3>
            <p className="text-sm text-gray-600 mb-6">
              This action cannot be undone.
            </p>

            <div className="flex justify-end gap-3">
              <button
                onClick={() => setOpenConfirmationModal(false)}
                className="px-4 py-2 rounded-lg bg-gray-200 hover:bg-gray-300 cursor-pointer"
              >
                Cancel
              </button>

              <button
                onClick={() => {
                  handleDeleteMessage(activeMessageId);
                  setOpenConfirmationModal(false);
                }}
                className="px-4 py-2 rounded-lg bg-red-500 text-white hover:bg-red-600 cursor-pointer"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Chat;