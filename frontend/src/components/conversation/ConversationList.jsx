import { useEffect, useState } from "react";
import ConversationCard from "./ConversationCard";
import useWebSocket from "../../websockets/useWebSocket";

const ConversationList = ({ conversations, setConversations, currConversation, setCurrConversation }) => {
    const [activeType, setActiveType] = useState("private");

    const { subscribeToNotifications } = useWebSocket();
    
    useEffect(() => {
        subscribeToNotifications((data) => {
            setConversations((prev) => {
            const updated = [...prev];

            const index = updated.findIndex(
                (c) => c.conversationId === data.conversationId
            );

            if (index === -1) return prev;

            const convo = updated[index];

            const updatedConvo = {
                ...convo,
                lastMessage: data.content,
            };

            updated.splice(index, 1);

            return [updatedConvo, ...updated];
            });
        });
    }, []);

    const onLeave = (id) => {
        if (currConversation?.conversationId === id) {
            setCurrConversation(null);
        }
        const updatedConversations = conversations.filter(conv => conv.conversationId !== id);
        setConversations(updatedConversations);
    }

    const handleConversationSelect = (conv) => {
        if (currConversation?.conversationId === conv.conversationId) return;
        setCurrConversation(conv);
    }

    const privateConversations = conversations.filter(
        conv => conv.type === "PRIVATE"
    );

    const groupConversations = conversations.filter(
        conv => conv.type === "GROUP"
    );

    const currentList =
        activeType === "private"
            ? privateConversations
            : groupConversations;

    return (
        <div className="flex flex-col gap-3">

            <div className="flex bg-purple-200 rounded-xl p-1">
                <button
                    onClick={() => setActiveType("private")}
                    className={`flex-1 py-2 rounded-lg text-sm font-semibold transition cursor-pointer
                        ${activeType === "private"
                            ? "bg-white text-purple-700 shadow"
                            : "text-gray-600 hover:text-purple-600"
                        }`}
                >
                    Private
                </button>

                <button
                    onClick={() => setActiveType("group")}
                    className={`flex-1 py-2 rounded-lg text-sm font-semibold transition cursor-pointer
                        ${activeType === "group"
                            ? "bg-white text-purple-700 shadow"
                            : "text-gray-600 hover:text-purple-600"
                        }`}
                >
                    Groups
                </button>
            </div>

            <div className="flex flex-col gap-2">
                {currentList.length === 0 && (
                    <div className="text-center text-gray-500 mt-4">
                        No {activeType} conversations
                    </div>
                )}

                {currentList.map(conv => (
                    <ConversationCard
                        key={conv.conversationId}
                        id={conv.conversationId}
                        name={conv.name}
                        imgUrl={conv.imgUrl}
                        lastMessage={conv.lastMessage}
                        onSelect={() => handleConversationSelect(conv)}
                        onLeave={onLeave}
                    />
                ))}
            </div>
        </div>
    );
};

export default ConversationList;