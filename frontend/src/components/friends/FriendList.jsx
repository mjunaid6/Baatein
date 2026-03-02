import { getConversationFromFriend } from "../../utils/apiCalls";
import FriendListCard from "./FriendListCard";

const FriendList = ({ friends, setFriends, setCurrConversation }) => {

    const handleSelect = async (id) => {
        const conv = await getConversationFromFriend(id);
        setCurrConversation(conv);
    };

    const onDelete = (id) => {
        setCurrConversation(null);
        const updatedFriends = friends.filter(friend => friend.friendshipId !== id);
        setFriends(updatedFriends);
    }

    return (
        <div className="flex flex-col gap-2">
            {friends.map(friend => (
                <FriendListCard
                    key={friend.friendshipId}
                    id={friend.friendshipId}
                    imgUrl={friend.imgUrl}
                    name={friend.friendName}
                    isBlocked={friend.isBlocked}
                    onSelect={() => handleSelect(friend.friendshipId)}
                    onDelete={onDelete}
                />
            ))}
        </div>
    );
};

export default FriendList;