import api from "../../auth/api";

export const getFriends = async () => {
    try {
        const resp = await api.get("/friend/getFriendList");
        return resp.data.friends || [];
    } catch (error) {
        console.error("Error fetching friends:", error);
        return [];
    }
};

export const getFriendRequests = async () => {
    try {
        const resp = await api.get("/friend/getFriendRequests");
        return resp.data.friendRequests || [];
    } catch (error) {
        console.error("Error fetching friend requests:", error);
        return [];
    }
};

export const getConversations = async () => {
    try {
        const resp = await api.get("/conversation/getConversations");
        return resp.data.conversations || [];
    } catch (error) {
        console.error("Error fetching conversations:", error);
        return [];
    }
};

export const getProfile = async () => {
    try {
        const resp = await api.get("/user/getProfile");
        return resp.data || {};
    } catch (error) {
        console.error("Error fetching profile:", error);
        return {};
    }
};

export const getMessages = async (id) => {
    try {
        const res = await api.get(`/chat/${id}/messages`);
        return res.data.messages;
    } catch (err) {
        console.error("Fetching messages failed:", err);
        throw err;
    }
};

export const defaultProfilePictureUrl = "/pictures/default_profile_pic.png"