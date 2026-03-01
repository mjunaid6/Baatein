import ConversationList from "./conversation/ConversationList";
import FriendRequest from "./friendRequest/FriendRequest";
import FriendList from "./friends/FriendList";
import NavBar from "./NavBar";
import Profile from "./Profile";
import SearchBar from "./SearchBar";

const SideBar = ({ sideBar, setSideBar, activeTab, setActiveTab, currFriend, setCurrFriend }) => {

    const showSearch = activeTab !== "profile";

    return (
        <div className="w-full h-full flex flex-col bg-purple-100">

            <NavBar activeTab={activeTab} setActiveTab={setActiveTab} />

            {showSearch && <SearchBar setSideBar={setSideBar} />}

            <div className="flex-1 overflow-y-auto hide-scroll-bar p-2">
                {activeTab === "conversations" && (
                    <ConversationList currFriend={currFriend} setCurrFriend={setCurrFriend}/>
                )}

                {activeTab === "friends" && (
                    <FriendList sideBar={sideBar} setSideBar={setSideBar} setCurrFriend={setCurrFriend}/>
                )}

                {activeTab === "requests" && (
                    <FriendRequest sideBar={sideBar} setSideBar={setSideBar}/>
                )}

                {activeTab === "profile" && (
                    <Profile />
                )}
            </div>

        </div>
    )
}

export default SideBar;