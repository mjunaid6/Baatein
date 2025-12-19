import { useState } from "react";
import { requests } from "../../utils/arrays";
import FriendRequestCard from "./FriendRequestCard";
import "../../index.css";

const FriendRequest = ({sideBar, setSideBar}) => {
    const [reqsts, setRqsts] = useState(requests);
    return(
        <div 
            className={`
                absolute top-0 left-0
                w-full h-full 
                transition-transform duration-300 
                ${sideBar ? "translate-x-full" : "translate-x-0"} 
                flex flex-col gap-2 p-2 hide-scroll-bar
            `}
        >
            <button 
                onClick={() => setSideBar(true)}
                className="flex justify-center items-center text-xl font-bold gap-2 px-2 py-1 w-full h-12 rounded-2xl backdrop-blur-2xl bg-purple-300/60 hover:bg-purple-300 cursor-pointer"
            >
                <i className="ri-arrow-go-back-fill"></i>
                Back
            </button>

            {reqsts.map(rqst => (
                <FriendRequestCard 
                    key={rqst.id} 
                    id={rqst.id} 
                    name={rqst.name} 
                    imageUrl={rqst.imageUrl}
                />
            ))}
        </div>
    )
}


export default FriendRequest;