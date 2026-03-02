import { useState } from "react";
import FriendRequestCard from "./FriendRequestCard";
import FriendRequestForm from "./FriendRequestForm";

const FriendRequest = ({ requests, setRequests }) => {
    const [friendRequestForm, setFriendRequestForm] = useState(false);

    const handleAcceptedOrRejected = (id) => {
        setRequests(prev =>
            prev.filter(req => req.friendshipId !== id)
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
                    handleAcceptedOrRejected={handleAcceptedOrRejected}
                />
            ))}
        </div>
    );
};

export default FriendRequest;