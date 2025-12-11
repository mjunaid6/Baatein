const InputArea = () => {
    return (
        <form className="sticky bottom-0 w-full h-16 px-3 py-2 flex items-center gap-2 bg-white/20 backdrop-blur-2xl">
            <div className="text-2xl right-0 text-purple-400 hover:text-purple-600 cursor-pointer">
                <i class="ri-emotion-fill" ></i>
            </div>
            
            <input type="text" placeholder="Type a message..." className="flex-1 h-10 outline-none border border-white/30 placeholder-white/70  p-2 rounded-xl text-white bg-white/10 backdrop-blur-lg"/>
            
            <button type="submit" className="text-2xl right-0 text-purple-400 hover:text-purple-600 cursor-pointer">
                <i class="ri-send-plane-2-fill"></i>
            </button>
        </form>
    )
}

export default InputArea;