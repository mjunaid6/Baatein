const UserBox = ({user}) => {
    return(
        <div className="w-full h-16 flex items-center bg-white/20 backdrop-blur-2xl">
            <img src={user.imgUrl} alt={user.name} />
            <h2>{user.name}</h2>
            <div className={`w-3 h-3 rounded-full ${user.online ? "bg-green-500" : bg-red-500 }`}></div>
        </div>
    )
}

export default UserBox;