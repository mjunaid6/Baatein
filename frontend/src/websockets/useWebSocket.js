import { useEffect, useRef } from "react";
import SockJS from "sockjs-client";
import { Client } from "@stomp/stompjs";
import { getAccessToken } from "../auth/authToken";

const useWebSocket = () => {
  const clientRef = useRef(null);
  const subscriptionRef = useRef(null);
  const notificationCallbackRef = useRef(null);
  const subscribeToNotifications = (callback) => {
    notificationCallbackRef.current = callback;
  };

  useEffect(() => {
    const socket = new SockJS(
      import.meta.env.VITE_WEBSOCKET_BASE_URL + "/ws"
    );

    const client = new Client({
      webSocketFactory: () => socket,
      connectHeaders: {
        Authorization: `Bearer ${getAccessToken()}`
      },
      debug: (str) => console.log(str),
      reconnectDelay: 5000, 
    });

    clientRef.current = client;

    client.onConnect = () => {
      console.log("Connected");
      if (notificationCallbackRef.current) {
        client.subscribe("/user/queue/notifications", (message) => {
          const data = JSON.parse(message.body);
          notificationCallbackRef.current(data);
        });
      }
    };

    client.activate();

    return () => {
      if (clientRef.current) {
        clientRef.current.deactivate();
      }
    };
  }, []);

  const subscribeToConversation = (conversationId, onMessage) => {
    if (!clientRef.current || !clientRef.current.connected) return;

    if (subscriptionRef.current) {
      subscriptionRef.current.unsubscribe();
    }

    subscriptionRef.current = clientRef.current.subscribe(
      `/topic/conversation/${conversationId}`,
      (message) => {
        const parsed = JSON.parse(message.body);
        onMessage(parsed);
      }
    );
  };

  const unsubscribeFromConversation = () => {
    if (subscriptionRef.current) {
      subscriptionRef.current.unsubscribe();
      subscriptionRef.current = null;
    } 
  };

  const sendMessage = (message, destination = "/app/sendMessage") => {
    if (!clientRef.current || !clientRef.current.connected) return;

    clientRef.current.publish({
      destination,
      body: JSON.stringify(message),
    });
  };

  return { subscribeToConversation, sendMessage, unsubscribeFromConversation, subscribeToNotifications };
};

export default useWebSocket;