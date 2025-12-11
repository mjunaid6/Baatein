import { useState } from "react";
import ChatSideBar from "../components/chatting/ChatArea";
import FriendList from "../components/friends/FriendList";
import FriendRequest from "../components/friends/FriendRequest";
import BG from "./BG";

const ChatPage = () => {
    const [sideBar, setSideBar] = useState(true);

    return (
        <div className="relative w-screen h-screen overflow-hidden flex">
            <BG/>
            <div className="w-[25vw] h-screen relative overflow-hidden">
                <FriendList sideBar={sideBar} setSideBar={setSideBar}/>
                <FriendRequest sideBar={sideBar} setSideBar={setSideBar}/>
            </div>
            <ChatSideBar/>
        </div>
    )
}

export default ChatPage;