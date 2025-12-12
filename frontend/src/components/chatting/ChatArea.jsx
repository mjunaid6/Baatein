import InputArea from "./InputArea";
import { chats } from "../../utils/arrays";
import Chats from "./Chats";
import { useState } from "react";

const ChatSideBar = () => {
    const [messages,setMessages] = useState(chats);
    return (
        <div className="relative flex flex-col flex-1 h-screen bg-linear-to-br from-purple-800/40 via-indigo-900/40 to-blue-900/40 ">
            <div className="absolute inset-0 bg-white/10 backdrop-blur-2xl border border-white/20"></div>

            <div className="absolute right-20 top-25 w-50 h-50 rounded-2xl bg-white/20 rotate-12 shadow-xl "></div>
            <div className="absolute left-20 bottom-25 w-50 h-50 rounded-full bg-white/20 rotate-12 shadow-xl"></div>

            <div className="sticky w-full h-16 px-8 flex items-center gap-5 bg-white/20 backdrop-blur-2xl">
                <img src="https://randomuser.me/api/portraits/men/32.jpg" 
                className="h-12 w-12 object-cover overflow-hidden rounded-full"
                alt="dp" 
                />
                <h2 className="text-xl">Aisha</h2>
                <button className="absolute right-8 px-3 py-1 w-fit h-8 flex items-center rounded-2xl bg-purple-300 cursor-pointer hover:bg-purple-400 hover:shadow-lg border border-white/30 backdrop-blur-lg">Close</button>
            </div>

            <div className="relative flex-1 min-h-0 flex flex-col">
                <Chats chats={messages} sender={"U016"} />

                <InputArea />   
            </div>
        </div>
    )
}

export default ChatSideBar;