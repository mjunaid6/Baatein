import { useState } from "react";
import '../index.css';
import FriendListCard from "./FriendListCard.";
import { arr } from "../utils/arrays";
import SearchBar from "./SearchBar";
import EndBar from "./EndBar";

const FriendList = () => {
    const [friends, setFriends] = useState(arr);
    return(
        <div className="border-r-2 border-purple-300 w-[25vw] h-screen flex flex-col">
            <SearchBar/>
            <div className="overflow-y-scroll hide-scroll-bar p-1 flex-1">
                {
                    friends.map(friend => (
                        <FriendListCard key={friend.id} imgUrl={friend.imageUrl} name={friend.name}/>
                    ))
                }
            </div>
            <EndBar/>
        </div>
    )
}

export default FriendList;