import { useState } from "react";
import ChatArea from "../components/chatting/ChatArea";
import FriendList from "../components/friends/FriendList";
import FriendRequest from "../components/friends/FriendRequest";
import BG from "../components/styles/BG";

const ChatPage = () => {
    const [sideBar, setSideBar] = useState(true);
    const [currFriend, setCurrFriend] = useState(null);

    return (
        <div className="relative w-screen h-screen overflow-hidden flex">
            <BG/>
            <div className="w-[25vw] h-screen relative overflow-hidden">
                <FriendList sideBar={sideBar} setSideBar={setSideBar} setCurrFriend={setCurrFriend}/>
                <FriendRequest sideBar={sideBar} setSideBar={setSideBar}/>
            </div>
            <ChatArea currFriend={currFriend} setCurrFriend={setCurrFriend}/>
        </div>
    )
}

export default ChatPage;