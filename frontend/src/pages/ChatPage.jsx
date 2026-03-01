import { useState } from "react";
import ChatArea from "../components/chatting/ChatArea";
import BG from "../components/styles/BG";
import SideBar from "../components/SideBar";

const ChatPage = () => {
    const [sideBar, setSideBar] = useState(true);
    const [currFriend, setCurrFriend] = useState(null);
    const [activeTab, setActiveTab] = useState("conversations");

    return (
        <div className="relative w-screen h-screen overflow-hidden flex">
            <BG/>
            <div className="w-[25vw] h-screen relative overflow-hidden">
                <SideBar 
                    sideBar={sideBar}
                    setSideBar={setSideBar}
                    activeTab={activeTab}
                    setActiveTab={setActiveTab}
                    currFriend={currFriend}
                    setCurrFriend={setCurrFriend}
                />
            </div>
            <ChatArea currFriend={currFriend} setCurrFriend={setCurrFriend}/>
        </div>
    )
}

export default ChatPage;