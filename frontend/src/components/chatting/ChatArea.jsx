import InputArea from "./InputArea";
import Chat from "./Chat";
import { useEffect, useState } from "react";
import { defaultProfilePictureUrl, getMessages } from "../../utils/data/data";
import useWebSocket from "../../websockets/useWebSocket";

const ChatArea = ({ currConversation, setCurrConversation, profile }) => {
    const [messages, setMessages] = useState([]);

    const { subscribeToConversation, sendMessage, unsubscribeFromConversation } = useWebSocket();

    useEffect(() => {
        if (!currConversation) return;

        const fetchMessages = async () => {
            try {
                const data = await getMessages(currConversation.conversationId);
                setMessages(data || []);
            } catch (err) {
                console.error("Failed to fetch messages", err);
            }
        };

        fetchMessages();

        const handleNewMessage = (message) => {
            if (message.type === "DELETE") {
                setMessages((prev) =>
                prev.filter((msg) => msg.messageId !== message.messageId)
                );
                return;
            }
            setMessages((prev) => [...prev, message]);
        };

        subscribeToConversation(currConversation.conversationId, handleNewMessage);
        
        return () => {
            unsubscribeFromConversation();
        };
    }, [currConversation]);

    const handleSendMessage = (content) => {
        if (!content?.trim()) return;

        sendMessage({
            content: content,
            conversationId: currConversation.conversationId,
        });
    };

    const handleDeleteMessage = (messageId) => {
        sendMessage(messageId, "/app/deleteMessage");
    };

    useEffect(() => {
        if (!currConversation) return;

        const handleKeyDown = (e) => {
            if (e.key === "Escape") setCurrConversation(null);
        };

        window.addEventListener("keydown", handleKeyDown);
        return () => window.removeEventListener("keydown", handleKeyDown);
    }, [currConversation, setCurrConversation]);

    return (
        <div className="relative flex flex-col flex-1 h-screen bg-linear-to-br from-purple-800/40 via-indigo-900/40 to-blue-900/40">
            <div className="absolute inset-0 bg-white/10 backdrop-blur-2xl border border-white/20"></div>

            {!currConversation ? (
                <div className="relative z-10 flex flex-1 items-center justify-center text-2xl text-white/70">
                    Select a friend to start chatting
                </div>
            ) : (
                <>
                    <div className="z-10 sticky top-0 w-full h-16 px-8 flex items-center gap-5 bg-white/20 backdrop-blur-2xl rounded-b-3xl">
                        <img
                            src={currConversation.imgUrl ? import.meta.env.VITE_BASE_IMAGE_URL + currConversation.imgUrl : defaultProfilePictureUrl}
                            className="h-12 w-12 rounded-full object-cover"
                            alt={currConversation.name}
                        />
                        <h2 className="text-xl text-white">
                            {currConversation.name || "Unnamed Conversation"}
                        </h2>

                        <button
                            onClick={() => setCurrConversation(null)}
                            className="absolute right-8 px-3 py-1 h-8 rounded-2xl bg-purple-300 hover:bg-purple-400 border border-white/30 backdrop-blur-lg"
                        >
                            Close
                        </button>
                    </div>

                    <div className="relative z-10 flex-1 min-h-0 flex flex-col">
                        <Chat chats={messages} userId={profile.userId} handleDeleteMessage={handleDeleteMessage} />
                        {!currConversation.canMessage ? (
                            <div className="p-4 text-center text-red-500">
                                You can't send messages in this conversation because either the conversation is blocked or you are no longer a member.
                            </div>
                        ) : <InputArea handleSendMessage={handleSendMessage} />
                        }
                    </div>
                </>
            )}
        </div>
    );
};

export default ChatArea;