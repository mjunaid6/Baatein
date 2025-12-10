const FriendListCard = ({imgUrl, name}) => {
    return(
        <div className="flex w-full h-16 gap-2 items-center mb-2 border-2 border-blue-300 rounded-xl">
            <div className="w-16 h-full p-2">
                <img src={imgUrl} alt={name} className="w-full h-full rounded-full object-cover"/>
            </div>
            <h2 className="font-bold text-[20px]">{name}</h2>
        </div>
    )
}

export default FriendListCard;