import { useEffect, useState } from "react";
import {getFriendRequests} from "../../utils/data/data";
import FriendRequestCard from "./FriendRequestCard";
import FriendRequestForm from "./FriendRequestForm";

const FriendRequest = () => {
    const [requests, setRequests] = useState([]);
    const [friendRequestForm, setFriendRequestForm] = useState(false);

    useEffect(() => {
        const fetchRequests = async () => {
            try {
                const data = await getFriendRequests();
                setRequests(data);
            } catch (err) {
                console.error("Failed to load requests", err);
            }
        };

        fetchRequests();
    }, []);

    const handleAccepted = (id) => {
        setRequests(prev =>
            prev.filter(req => req.friendshipCode !== id)
        );
    };

    return (
        <div className="flex flex-col h-full gap-2 relative">

            <button
                onClick={() => setFriendRequestForm(true)}
                className="w-full h-12 rounded-2xl 
                           bg-red-300/70 hover:bg-red-400 
                           text-lg font-semibold flex 
                           justify-center items-center gap-2 
                           transition outline-none"
            >
                <i className="ri-user-add-line"></i>
                Add Friend
            </button>

            <FriendRequestForm
                friendRequestForm={friendRequestForm}
                setFriendRequestForm={setFriendRequestForm}
            />

            {requests.map(req => (
                <FriendRequestCard
                    key={req.friendshipId}
                    id={req.friendshipId}
                    name={req.friendName}
                    imageUrl={req.imgUrl}
                    handleAccepted={handleAccepted}
                />
            ))}
        </div>
    );
};

export default FriendRequest;