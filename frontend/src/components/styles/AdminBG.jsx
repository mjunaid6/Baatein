const AdminBG = () => {
    return (
        <>
            <div className="absolute -z-1 bg-blue-100 w-full h-full"></div>
            <div className="absolute top-20 left-15 w-50 h-50 rotate-12 rounded-2xl inset-shadow-sm inset-shadow-indigo-500 bg-blue-400 opacity-30"></div>

            <div className="absolute bottom-10 left-100 w-30 h-30 rounded-full inset-shadow-sm inset-shadow-red-500 bg-red-300 opacity-30"></div>
            
            <div className="absolute -bottom-15 right-15 w-50 h-50 rotate-12 rounded-2xl inset-shadow-sm inset-shadow-purple-500 bg-purple-400 opacity-50"></div>
            
            <div className="absolute top-10 right-100 w-50 h-50 rounded-full inset-shadow-sm inset-shadow-green-500 bg-green-300"></div>
        </>
    )
}

export default AdminBG;