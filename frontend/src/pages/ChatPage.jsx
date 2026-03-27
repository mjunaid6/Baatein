import React, { useEffect, useState } from "react";
import ChatArea from "../components/chatting/ChatArea";
import BG from "../components/styles/BG";
import SideBar from "../components/SideBar";
import { getProfile } from "../utils/data/data";

const ChatPage = ({ useIsMobile }) => {
    const [sideBar, setSideBar] = useState(true);
    const [currConversation, setCurrConversation] = useState(null);
    const [profile, setProfile] = useState(null);

    useEffect(() => {
        fetchProfile();
    }, [])

    const isMobile = useIsMobile();
    
    useEffect(() => {
        if (isMobile) {
            setSideBar(currConversation === null);
        }
    }, [currConversation, isMobile]);

    const fetchProfile = async () => {
        const data = await getProfile();
        if(data.imgUrl != null) data.imgUrl = import.meta.env.VITE_BASE_IMAGE_URL + data.imgUrl;
        setProfile(data);
    }

    return (
        <div className="relative w-screen h-screen overflow-hidden flex">
            <BG />

            <div className={`w-screen xl:w-[25vw] h-screen relative overflow-hidden 
                            ${isMobile && !sideBar ? "hidden" : "block"}`}>
                <SideBar 
                    setSideBar={setSideBar}
                    currConversation={currConversation}
                    setCurrConversation={setCurrConversation}
                    profile={profile}
                    setProfile={setProfile}
                />
            </div>

            <div className={`flex-1 ${isMobile && sideBar ? "hidden" : "block"}`}>
                <ChatArea 
                    currConversation={currConversation} 
                    setCurrConversation={setCurrConversation} 
                    profile={profile}
                />
            </div>
        </div>
    )
}

export default ChatPage;