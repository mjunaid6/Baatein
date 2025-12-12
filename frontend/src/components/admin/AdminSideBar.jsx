const AdminSideBar = () => {
    return(
        <div className="flex flex-col w-[25vw] h-screen">
            <button 
                onClick={() => setSideBar(true)}
                className="flex justify-center items-center text-xl font-bold border-2 border-white/50 text-white gap-2 px-2 py-1 bg-blue-400 w-full h-12 rounded-2xl hover:bg-blue-500 backdrop-blur-lg cursor-pointer"
            >
                <i className="ri-arrow-go-back-fill"></i>
                Back
            </button>
        
        </div> 
    )
}

export default AdminSideBar;