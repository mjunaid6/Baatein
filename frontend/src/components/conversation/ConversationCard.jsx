const ConversationCard = ({ name, imgUrl, lastMessage, onSelect }) => {
    return (
        <div
            onClick={onSelect}
            className="flex w-full h-16 gap-3 items-center mb-2 
                       border-2 border-purple-300 rounded-2xl 
                       hover:bg-purple-100 shadow-xl 
                       cursor-pointer transition"
        >
            <div className="w-16 h-full p-2">
                <img
                    src={imgUrl || "/default-avatar.png"}
                    alt={name}
                    className="w-full h-full rounded-full object-cover"
                />
            </div>

            <div className="flex flex-col w-full overflow-hidden">
                <h2 className="font-bold text-[18px] text-gray-700 truncate">
                    {name}
                </h2>
                <p className="text-sm text-gray-500 truncate">
                    {lastMessage || "No messages yet"}
                </p>
            </div>
        </div>
    );
};

export default ConversationCard;