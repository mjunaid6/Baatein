import api from "../auth/api";

export const acceptFriendRequest = (id) => {
    api.post(`/friend/${id}/accept`);
}