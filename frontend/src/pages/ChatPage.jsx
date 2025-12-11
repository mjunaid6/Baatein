import ChatSideBar from "../components/ChatSideBar";
import FriendList from "../components/FriendList";
import BG from "./BG";

const ChatPage = () => {
    return (
        <div className="relative w-screen h-screen overflow-hidden flex">
            <BG/>
            <FriendList/>
            <ChatSideBar/>
        </div>
    )
}

export default ChatPage;