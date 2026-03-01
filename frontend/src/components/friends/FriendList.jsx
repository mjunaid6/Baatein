import { useEffect, useState } from "react";
import { getFriends } from "../../utils/data/data";
import FriendListCard from "./FriendListCard";

const FriendList = ({ setCurrFriend }) => {
    const [friends, setFriends] = useState([]);

    useEffect(() => {
        const fetchFriends = async () => {
            try {
                const data = await getFriends();
                setFriends(data || []);
            } catch (err) {
                console.error("Failed to load friends", err);
            }
        };

        fetchFriends();
    }, []);

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