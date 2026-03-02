import FriendListCard from "./FriendListCard";

const FriendList = ({ friends, setCurrFriend }) => {

    const handleSelect = (friend) => {
        setCurrFriend(friend);
    };

    return (
        <div className="flex flex-col gap-2">
            {friends.map(friend => (
                <FriendListCard
                    key={friend.friendId}
                    imgUrl={friend.imgUrl}
                    name={friend.friendName}
                    onSelect={() => handleSelect(friend)}
                />
            ))}
        </div>
    );
};

export default FriendList;