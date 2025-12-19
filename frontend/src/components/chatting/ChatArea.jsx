import InputArea from "./InputArea";
import { chats } from "../../utils/arrays";
import Chats from "./Chats";
import { useEffect, useRef, useState } from "react";

const ChatArea = ({ currFriend ,setCurrFriend}) => {
    const [messages, setMessages] = useState(chats);

    useEffect(() => {
        if(!currFriend) return;

        const handleKeyDown = (e) => {
            if(e.key === "Escape") setCurrFriend(null);
        }
        window.addEventListener("keydown",handleKeyDown);
        return () => {
            window.removeEventListener("keydown",handleKeyDown);
        }
    }, [currFriend])

    return (
        <div 
        className="relative flex flex-col flex-1 h-screen bg-linear-to-br from-purple-800/40 via-indigo-900/40 to-blue-900/40">
            <div className="absolute inset-0 bg-white/10 backdrop-blur-2xl border border-white/20"></div>

            <div className="absolute right-20 top-25 w-50 h-50 rounded-2xl bg-white/20 rotate-12 shadow-xl"></div>
            <div className="absolute left-20 bottom-25 w-50 h-50 rounded-full bg-white/20 rotate-12 shadow-xl"></div>

            {!currFriend ? (
                <div className={`relative z-10 flex flex-1 items-center justify-center text-2xl text-white/70 chat-fade-in `}>
                    Select a friend to start chatting
                </div>
            ) : (
                <>
                    <div 
                    className={`z-10 sticky top-0 w-full h-16 px-8 flex items-center gap-5 bg-white/20 backdrop-blur-2xl rounded-b-3xl chat-fade-in`}
                    
                    >
                        <img
                            src={currFriend.imageUrl}
                            className="h-12 w-12 rounded-full object-cover"
                            alt={currFriend.name}
                        />
                        <h2 className="text-xl text-white">
                            {currFriend.name}
                        </h2>

                        <button 
                        onClick={() => setCurrFriend(null)}
                        className="absolute right-8 px-3 py-1 h-8 rounded-2xl bg-purple-300 hover:bg-purple-400 border border-white/30 backdrop-blur-lg cursor-pointer">
                            Close
                        </button>
                    </div>

                    <div className={`relative z-10 flex-1 min-h-0 flex flex-col chat-fade-in`}>
                        <Chats chats={messages} sender={"U016"} />
                        <InputArea />
                    </div>
                </>
            )}
        </div>
    );
};


export default ChatArea;