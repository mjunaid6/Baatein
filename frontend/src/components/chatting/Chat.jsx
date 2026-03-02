const Chat = ({ chats, userId }) => {
  return (
    <div className="flex-1 w-full overflow-y-scroll hide-scroll-bar p-4 flex flex-col gap-2">
      {chats.map((chat) => (
        <div
          key={chat.messageId}
          className={`
            p-2 max-w-xs w-fit text-white rounded-2xl backdrop-blur-2xl border border-white/30
            ${userId === chat.senderId
              ? "self-end bg-purple-600/50"
              : "self-start bg-white/20"}
          `}
        >
          {chat.content}
        </div>
      ))}
    </div>
  );
};

export default Chat;
