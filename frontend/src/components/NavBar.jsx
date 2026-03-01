const NavBar = ({ activeTab, setActiveTab }) => {

    const tabs = [
        { key: "conversations", label: "Conversations", icon: "ri-chat-3-line" },
        { key: "friends", label: "Friends", icon: "ri-group-line" },
        { key: "requests", label: "Requests", icon: "ri-user-add-line" },
        { key: "profile", label: "Profile", icon: "ri-user-line" }
    ];

    return (
        <div className="w-full flex justify-around items-center 
                        h-14 bg-purple-200 border-b-2 border-purple-300">

            {tabs.map(tab => (
                <button
                    key={tab.key}
                    onClick={() => setActiveTab(tab.key)}
                    className={`flex flex-col items-center justify-center text-xs 
                                transition-all duration-200 cursor-pointer
                                ${activeTab === tab.key 
                                    ? "text-purple-700 font-bold scale-105" 
                                    : "text-gray-600 hover:text-purple-600"}`}
                >
                    <i className={`${tab.icon} text-lg`}></i>
                    {tab.label}
                </button>
            ))}
        </div>
    )
}

export default NavBar;