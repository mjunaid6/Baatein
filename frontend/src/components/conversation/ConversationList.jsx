import { useEffect, useState } from "react";
import { getConversations } from "../../utils/data/data";
import ConversationCard from "./ConversationCard";

const ConversationList = ({ setCurrFriend }) => {
    const [conversations, setConversations] = useState([]);

    useEffect(() => {
        const fetchConversations = async () => {
            try {
                const data = await getConversations();
                setConversations(data);
            } catch (err) {
                console.error("Failed to load conversations", err);
            }
        };

        fetchConversations();
    }, []);

    return (
        <div className="flex flex-col gap-2">
            {conversations.map(conv => (
                <ConversationCard
                    key={conv.conversationId}
                    name={conv.name}
                    imgUrl={conv.imgUrl}
                    lastMessage={conv.lastMessage}
                    onSelect={() => setCurrFriend(conv)}
                />
            ))}
        </div>
    );
};

export default ConversationList;