const EndBar = () => {
    return(
        <div className="w-full h-12 flex justify-center items-center gap-2 bg-purple-200 p-2">
            <img 
            className="w-[10%] aspect-square object-cover rounded-full outline-2 outline-purple-500"
            src="https://images.unsplash.com/photo-1622519407650-3df9883f76a5?q=80&w=764&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" 
            alt="dp" />
            <h2 className="w-[80%] text-lg">Mohammad Junaid</h2>
            <i class="ri-settings-line text-xl cursor-pointer"></i>
        </div>
    )
}

export default EndBar;