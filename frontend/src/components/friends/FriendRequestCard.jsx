

const FriendRequestCard = ({id, name, imageUrl}) => {

    const handleAddFriend = (id) => {
        
    } 

    return(
        <div className="relative flex w-full h-16 gap-2 items-center mb-2 border-2 border-purple-300 rounded-md cursor-alias hover:bg-purple-100 shadow-xl">
            <div className="w-16 h-full p-2">
                <img src={imageUrl} alt={name} className="w-full h-full rounded-full object-cover"/>
            </div>
            <h2 className="font-bold text-[20px] text-gray-600 w-[70%]">{name}</h2>
            <i onClick={() => handleAddFriend(id)} className="ri-user-add-fill cursor-pointer hover:text-green-500"></i>
        </div>
    )
}

export default FriendRequestCard;