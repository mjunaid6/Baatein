import UserBox from "./UserBox";
import "../../index.css";

const AdminSideBar = ({users}) => {
    return(
        <div className="flex flex-col gap-3 w-[25vw] h-screen border-r-2 border-blue-400 p-2 bg-white/80 backdrop-blur-2xl">
            <button 
                onClick={() => setSideBar(true)}
                className="flex justify-center items-center text-xl font-bold border-2 border-white/50 text-white gap-2 px-2 py-1 bg-blue-400 w-full h-12 rounded-2xl hover:bg-blue-500 backdrop-blur-lg cursor-pointer"
            >
                <i className="ri-arrow-go-back-fill"></i>
                Back
            </button>
            <div className="flex flex-col items-center gap-3 overflow-y-scroll hide-scroll-bar">
                {
                    users.map(user => (
                        <UserBox key={user.id} user={user}/>
                    ))
                }
            </div>
            
        </div> 
    )
}

export default AdminSideBar;