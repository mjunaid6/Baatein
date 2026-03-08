import api from "../auth/api";

export const addFriend = async (id) => {
    try {
        const res = await api.put(`/friend/${id}/addFriend`);
        return res.data;
    } catch (err) {
        console.error("Add friend failed:", err);
        throw err;
    }
};

export const acceptFriendRequest = async (id) => {
    try {
        const res = await api.post(`/friend/${id}/accept`);
        return res.data;
    } catch (err) {
        console.error("Accept request failed:", err);
        throw err;
    }
};

export const rejectFriendRequest = async (id) => {
    try {
        const res = await api.post(`/friend/${id}/reject`);
        return res.data;
    } catch (err) {
        console.error("Reject request failed:", err);
        throw err;
    }
};

export const deleteFriend = async (id) => {
    try {
        const res = await api.delete(`/friend/${id}/delete`);
        return res.data;
    } catch (err) {
        console.error("Delete friend failed:", err);
        throw err;
    }
};

export const blockFriend = async (id) => {
    try {
        const res = await api.post(`/friend/${id}/block`);
        return res.data;
    } catch (err) {
        console.error("Block friend failed:", err);
        throw err;
    }
};

export const unblockFriend = async (id) => {
    try {
        const res = await api.post(`/friend/${id}/unblock`);
        return res.data;
    } catch (err) {
        console.error("Unblock friend failed:", err);
        throw err;
    }
};

export const sendMessage = async (id, content) => {
    try {
        const res = await api.put(`/chat/${id}/message`, {
            content: content
        });
        return res.data;
    } catch (err) {
        console.error("Sending message failed:", err);
        throw err;
    }
};

export const leaveConversation = async (id) => {
    try {
        const res = await api.post(`/conversation/${id}/leave`);
        return res.data;
    } catch (err) {
        console.error("Leaving conversation failed:", err);
        throw err;
    }
};

export const getConversationFromFriend = async (id) => {
    try {
        const res = await api.get(`/conversation/${id}/getConversation`);
        return res.data;
    } catch (err) {
        console.error("Getting conversation failed:", err);
        throw err;
    }
};

export const updateProfilePicture = async (file) => {
    try {
        const formData = new FormData();
        formData.append("image", file);
        const res = await api.post("/user/updateProfilePicture", formData, {
            headers: {
                "Content-Type": "multipart/form-data" 
            }
        });
        return res.data.imgUrl;
    } catch (err) {
        console.error("Updating profile picture failed:", err);
        throw err;
    }   
};