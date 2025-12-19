const AdminNavBar = () => {
    return (
        <div className="sticky top-0 z-1 w-[90vw] h-12 flex items-center justify-between p-3 mb-10">
            <h1 className="flex justify-center bg-linear-to-r from-purple-500 to-cyan-200 bg-clip-text text-transparent text-xl font-bold cursor-default">Baatein</h1>
            <div className="w-[50%] flex justify-between bg-gray-300/50 backdrop-blur-2xl px-3 py-2 rounded-3xl">
                <div>Home</div>
                <div>Users</div>
                <div>Admins</div>
                <div>Help</div>
            </div>
            <div className="h-10 w-10 flex justify-center items-center rounded-full overflow-hidden cursor-pointer">
                <img 
                src="https://randomuser.me/api/portraits/lego/2.jpg" 
                alt="admin" />
            </div>
        </div>
    )
}

export default AdminNavBar;