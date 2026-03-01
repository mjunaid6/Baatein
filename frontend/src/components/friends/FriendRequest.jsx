import { useEffect, useState } from "react";
import { getFriendRequests } from "../../utils/data/friendData";
import FriendRequestCard from "./FriendRequestCard";
import "../../index.css";
import FriendRequestForm from "./FriendRequestForm";

const FriendRequest = ({sideBar, setSideBar}) => {
    const [reqsts, setRqsts] = useState([]);
    const [friendRequestForm, setFriendRequestForm] = useState(false);

    useEffect(() => {
        const fetchFriendRequests = async () => {
            const data = await getFriendRequests();
            setRqsts(data);
        };

        fetchFriendRequests();
    }, []);

    const handleAccepted = (id) => {
        setRqsts(prev => prev.filter(req => req.friendshipCode !== id));
    };

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
            <button 
                onClick={() => setFriendRequestForm(true)}
                className="flex justify-center items-center text-xl font-bold gap-2 px-2 py-1 w-full h-12 rounded-2xl backdrop-blur-2xl bg-red-300/60 hover:bg-red-300 cursor-pointer"
            >
                <i className="ri-user-add-line"></i>
                Add new friend
            </button>
            <FriendRequestForm friendRequestForm={friendRequestForm} setFriendRequestForm={setFriendRequestForm}/>

            {reqsts.map(rqst => (
                <FriendRequestCard 
                    key={rqst.friendshipCode} 
                    id={rqst.friendshipCode} 
                    name={rqst.friendName} 
                    imageUrl={rqst.imgUrl}
                    handleAccepted={handleAccepted}
                />
            ))}
        </div>
    )
}


export default FriendRequest;