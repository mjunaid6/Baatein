const SearchBar = ({setSideBar}) => {
    return(
        <div className="w-full h-16 p-1 flex justify-center items-center gap-2 sticky top-0 bg-purple-100 border-b-2 border-purple-300 rounded-b-2xl shadow-purple-200 shadow-xl">
            <input type="text" placeholder="Search" className="w-[85%] h-[80%] p-1 border-2 border-purple-300 rounded-lg outline-0" />
            <button onClick={() => setSideBar(false)} 
            className="p-1 h-[80%] aspect-square bg-purple-300 hover:bg-purple-400 rounded-lg cursor-pointer hover:text-white"><i className="ri-user-add-line"></i></button>
        </div>
    )
}

export default SearchBar;