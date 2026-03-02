import FriendListCard from "./FriendListCard";

const FriendList = ({ friends, setFriends, setCurrFriend }) => {

    const handleSelect = (friend) => {
        setCurrFriend(friend);
    };

    const onDelete = (id) => {
        setCurrFriend(null);
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
                    onSelect={() => handleSelect(friend)}
                    onDelete={onDelete}
                />
            ))}
        </div>
    );
};

export default FriendList;