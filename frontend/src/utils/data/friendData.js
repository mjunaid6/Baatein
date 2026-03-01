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

