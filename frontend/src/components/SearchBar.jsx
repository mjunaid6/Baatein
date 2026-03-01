const SearchBar = () => {
    return(
        <div className="w-full h-16 p-1 flex justify-center items-center gap-2 sticky top-0 bg-purple-200 border-b-2 border-purple-300 rounded-b-2xl shadow-purple-200 shadow-xl">
            <input type="text" placeholder="Search" className="w-full h-[80%] p-1 border-2 border-purple-300 rounded-lg outline-0" />
        </div>
    )
}

export default SearchBar;