// Outgoing events (client → server)
export const WS_SEND_MESSAGE = 'send-message';
export const WS_FRIEND_REQUEST = 'friend-request';
export const WS_FRIEND_ACCEPT = 'friend-accept';

// Incoming events (server → client)
export const WS_MESSAGE = 'message';
export const WS_FRIEND_REQUEST_IN = 'friend-request';
export const WS_FRIEND_ACCEPTED_IN = 'friend-accepted';

// Internal WebSocket lifecycle events
export const WS_OPEN = 'ws:open';
export const WS_CLOSE = 'ws:close';
export const WS_ERROR = 'ws:error';
export const WS_GENERIC_MESSAGE = 'ws:message';
