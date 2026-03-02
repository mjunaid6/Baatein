import api from "../auth/api";

export const acceptFriendRequest = (id) => {
    api.post(`/friend/${id}/accept`);
}

export const rejectFriendRequest = (id) => {
    api.post(`/friend/${id}/reject`);
}

export const deleteFriend = (id) => {
    api.delete(`/friend/${id}/delete`);
}

export const blockFriend = (id) => {
    api.post(`/friend/${id}/block`);
}


export const unblockFriend = (id) => {
    api.post(`/friend/${id}/unblock`);
}