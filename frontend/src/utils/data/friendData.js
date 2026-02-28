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