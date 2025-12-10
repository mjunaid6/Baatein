const SearchBar = () => {
    return(
        <div className="w-full h-16 p-1 flex justify-center items-center gap-2 sticky top-0 bg-blue-100">
            <input type="text" placeholder="Search" className="w-[85%] h-[80%] p-1 border-2 border-blue-300 rounded-lg outline-0" />
            <button className="p-1 h-[80%] aspect-square bg-blue-300 hover:bg-blue-400 rounded-lg cursor-pointer"><i className="ri-user-add-line"></i></button>
        </div>
    )
}

export default SearchBar;