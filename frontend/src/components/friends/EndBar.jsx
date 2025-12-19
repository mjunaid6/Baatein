import { useState } from "react";

const EndBar = () => {
    const [openSettings, setOpenSettings] = useState(false);
    return(
        <div className="w-full h-fit flex flex-col justify-center items-center bg-purple-200 border-t-3 border-purple-300 rounded-t-2xl">
            <div className="w-full h-12 flex justify-center items-center p-2 gap-2 ">
                <img 
                className="w-[10%] aspect-square object-cover rounded-full outline-2 outline-purple-500"
                src="https://images.unsplash.com/photo-1622519407650-3df9883f76a5?q=80&w=764&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" 
                alt="dp" />
                <h2 className="w-[80%] text-lg">Mohammad Junaid</h2>
                <i 
                onClick={() => setOpenSettings(!openSettings)}
                className={`ri-${openSettings? "arrow-drop-up-line" : "settings-line"} text-xl cursor-pointer hover:text-purple-600 hover:rotate-180 transition-all duration-1000`} ></i>
            </div>

            {openSettings &&
                <div className="w-full h-fit flex flex-col justify-center items-baseline p-2 gap-2">
                    <div className="flex justify-between items-center w-full p-2">
                        <h2>Change profile picture</h2>
                        <button className="flex justify-around py-1 px-2 cursor-pointer rounded-xl bg-purple-300 hover:bg-purple-400 hover:shadow-2xs ">
                            Change <i className="ri-arrow-drop-down-line"></i></button>
                    </div>
                </div>
            }
        </div>
    )
}

export default EndBar;