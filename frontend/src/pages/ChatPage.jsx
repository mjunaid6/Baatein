import FriendList from "../components/FriendList";
import BG from "./BG";

const ChatPage = () => {
    return (
        <div className="relative w-screen h-screen overflow-hidden">
            <BG/>
            <FriendList/>
        </div>
    )
}

export default ChatPage;