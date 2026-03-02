import { useEffect, useState } from "react";
import { getConversations, getFriendRequests, getFriends, getProfile } from "../utils/data/data";
import ConversationList from "./conversation/ConversationList";
import FriendRequest from "./friendRequest/FriendRequest";
import FriendList from "./friends/FriendList";
import NavBar from "./NavBar";
import Profile from "./Profile";
import SearchBar from "./SearchBar";

const SideBar = ({ sideBar, setSideBar, currConversation, setCurrConversation, profile, setProfile }) => {
    const [friends, setFriends] = useState([]);
    const [conversations, setConversations] = useState([]);
    const [requests, setRequests] = useState([]);
    const [activeTab, setActiveTab] = useState("conversations");

    useEffect(() => {
        fetchAllData();
    }, []);

    const fetchAllData = async () => {
        const [friendsRes, convRes, reqRes] = await Promise.all([
            getFriends(),
            getConversations(),
            getFriendRequests(),
        ]);

        setFriends(friendsRes);
        setConversations(convRes);
        setRequests(reqRes);
    };

    const showSearch = activeTab !== "profile";

    return (
        <div className="w-full h-full flex flex-col bg-purple-100">

            <NavBar activeTab={activeTab} setActiveTab={setActiveTab} />

            {showSearch && <SearchBar setSideBar={setSideBar} />}

            <div className="flex-1 overflow-y-auto hide-scroll-bar p-2">
                {activeTab === "conversations" && (
                    <ConversationList conversations={conversations} setConversations={setConversations} currConversation={currConversation} setCurrConversation={setCurrConversation}/>
                )}

                {activeTab === "friends" && (
                    <FriendList friends={friends} setFriends={setFriends} sideBar={sideBar} setSideBar={setSideBar} currConversation={currConversation} setCurrConversation={setCurrConversation}/>
                )}

                {activeTab === "requests" && (
                    <FriendRequest requests={requests} setRequests={setRequests} sideBar={sideBar} setSideBar={setSideBar}/>
                )}

                {activeTab === "profile" && (
                    <Profile profile={profile} setProfile={setProfile} />
                )}
            </div>

        </div>
    )
}

export default SideBar;