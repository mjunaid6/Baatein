import { useState } from "react";

const FriendListCard = ({imgUrl, name}) => {
    const [deleteButton,setDeleteButton] = useState(true);
    return(
        <div className="relative flex w-full h-16 gap-2 items-center mb-2 border-2 border-purple-300 rounded-md cursor-alias hover:bg-purple-100 shadow-xl">
            <div className="w-16 h-full p-2">
                <img src={imgUrl} alt={name} className="w-full h-full rounded-full object-cover"/>
            </div>
            <h2 className="font-bold text-[20px] text-gray-600 w-[70%]">{name}</h2>
            
            <i onClick={() => setDeleteButton(!deleteButton)} className="ri-arrow-drop-down-line hover:bg-purple-400 rounded-full w-4 h-4 text-center flex items-center cursor-pointer"></i>
            <div onClick={() => setDeleteButton(true)} className={`absolute -bottom-[15%] right-[5%] w-20 h-8 bg-red-400 rounded-lg ${deleteButton ? 'hidden' : ''} flex justify-center items-center text-white cursor-pointer hover:shadow-xl/20 hover:bg-red-500`}>Remove</div>
        </div>
    )
}

export default FriendListCard;