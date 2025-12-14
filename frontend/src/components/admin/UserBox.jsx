const UserBox = ({user}) => {
    return(
        <div className="w-full h-16 flex items-center gap-3 bg-blue-300 hover:bg-blue-400 cursor-alias rounded-2xl">
            <img src={user.imageUrl} alt={user.name} className="w-10 h-10 object-cover rounded-full"/>
            <h2>{user.name}</h2>
            <div 
            className={`w-4 h-4 rounded-full p-1 text-xs flex items-center text-transparent hover:w-fit transition-all duration-400 cursor-pointer
                ${user.online ? "bg-green-500 hover:text-green-500 hover:bg-transparent" : "bg-red-500 hover:text-red-500 hover:bg-transparent" } 
            `}>{user.online ? "Online" : "Offline"}</div>
        </div>
    )
}

export default UserBox;