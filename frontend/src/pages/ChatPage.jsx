import { useEffect, useState } from "react";
import ChatArea from "../components/chatting/ChatArea";
import BG from "../components/styles/BG";
import SideBar from "../components/SideBar";
import { getProfile } from "../utils/data/data";

const ChatPage = () => {
    const [sideBar, setSideBar] = useState(true);
    const [currConversation, setCurrConversation] = useState(null);
    const [profile, setProfile] = useState(null);

    useEffect(() => {
        fetchProfile();
    }, [])

    const fetchProfile = async () => {
        const data = await getProfile();
        setProfile(data);
    }

    return (
        <div className="relative w-screen h-screen overflow-hidden flex">
            <BG/>
            <div className="w-[25vw] h-screen relative overflow-hidden">
                <SideBar 
                    sideBar={sideBar}
                    setSideBar={setSideBar}
                    currConversation={currConversation}
                    setCurrConversation={setCurrConversation}
                    profile={profile}
                    setProfile={setProfile}
                />
            </div>
            <ChatArea currConversation={currConversation} setCurrConversation={setCurrConversation} profile={profile}/>
        </div>
    )
}

export default ChatPage;