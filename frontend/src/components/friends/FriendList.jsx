import { useState } from "react";
import '../../index.css';
import FriendListCard from './FriendListCard'
import { arr } from "../../utils/arrays";
import SearchBar from "./SearchBar";
import EndBar from "./EndBar";

const FriendList = ({sideBar, setSideBar, setCurrFriend}) => {
    const [friends, setFriends] = useState(arr);
    return(
        <div 
            className={`
                absolute top-0 left-0
                w-full h-full 
                transition-transform duration-300 
                ${sideBar ? "translate-x-0" : "-translate-x-full"} 
                flex flex-col border-r-2 border-purple-300
            `}
        >
            <SearchBar setSideBar={setSideBar} />
            
            <div className="overflow-y-scroll hide-scroll-bar p-1 flex-1">
                {friends.map(friend => (
                    <FriendListCard 
                        key={friend.id} 
                        onSelect={() => setCurrFriend(friend)}
                        imgUrl={friend.imageUrl} 
                        name={friend.name}
                    />
                ))}
            </div>

            <EndBar/>
        </div>
    )
}


export default FriendList;