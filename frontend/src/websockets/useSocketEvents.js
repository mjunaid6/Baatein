import { useEffect } from "react";
import useWebSocket from "./useWebSocket";

export const useSocketEvents = ({
    setConversations,
    setFriends,
    setRequests,
    currConversation,
    setCurrConversation,
}) => {

    const { subscribeToNotifications } = useWebSocket();

    useEffect(() => {

        const handleNewMessage = (data) => {
            setConversations((prev) => {
                const updated = [...prev];

                const index = updated.findIndex(
                    (c) => c.conversationId === data.conversationId
                );

                // If convo not found → optional add
                if (index === -1) return prev;

                const convo = updated[index];

                const updatedConvo = {
                    ...convo,
                    lastMessage: data.content,
                };

                updated.splice(index, 1);
                return [updatedConvo, ...updated];
            });
        };

        const handleFriendRequest = (data) => {
            setRequests((prev) => [data, ...prev]);
        };

        const handleRejectRequest = (data) => {
            setRequests((prev) =>
                prev.filter((r) => r.friendshipId !== data.friendshipId)
            );
        };

        const handleFriendAdded = (data) => {
            setFriends((prev) => [data.friend, ...prev]);
            setConversations((prev) => [data.conversation, ...prev]);
        };

        const handleFriendRemoved = (data) => {
            setFriends((prev) =>
                prev.filter((f) => f.friendshipId !== data.friendshipId)
            );
        };

        const handleBlocked = (data) => {
            setFriends((prev) =>
                prev.map((f) =>
                    f.friendshipId === data.friendshipId
                        ? { ...f, isBlocked: "blocked" }
                        : f
                )
            );

            setConversations((prev) =>
                prev.map((c) =>
                    c.conversationId === data.conversationId
                        ? { ...c, canMessage: false }
                        : c
                )
            );
        };

        const handleUnblocked = (data) => {
            setFriends((prev) =>
                prev.map((f) =>
                    f.friendshipId === data.friendshipId
                        ? { ...f, isBlocked: "unblocked" }
                        : f
                )
            );
            setConversations((prev) =>
                prev.map((c) =>
                    c.conversationId === data.conversationId
                        ? { ...c, canMessage: true }
                        : c
                )
            );
        };

        const eventHandlers = {
            "NEW MESSAGE": handleNewMessage,
            "FRIEND REQUEST": handleFriendRequest,
            "FRIEND REQUEST REJECTED": handleRejectRequest,
            "FRIEND ADDED": handleFriendAdded,
            "FRIEND REMOVED": handleFriendRemoved,
            "FRIEND BLOCKED": handleBlocked,
            "FRIEND UNBLOCKED": handleUnblocked,
        };

        const unsubscribe = subscribeToNotifications((data) => {
            console.log(data);
            eventHandlers[data.type]?.(data.payload);
        });

        return () => unsubscribe?.();

    }, [
        setConversations,
        setFriends,
        setRequests,
        currConversation,
        setCurrConversation,
    ]);
};