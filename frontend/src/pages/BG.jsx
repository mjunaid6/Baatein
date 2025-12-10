const BG = () => {
    return(
        <>
            <div className="absolute -top-20 -left-20 w-96 h-96 bg-green-500 rounded-full blur-xl opacity-30 -z-1"></div>

             <div className="absolute -bottom-10 left-50 w-96 h-96 bg-purple-500 rounded-full blur-xl opacity-30 -z-1"></div>
            
             <div className="absolute -top-10 right-110 w-96 h-96 bg-red-500 rounded-full blur-xl opacity-30 -z-1"></div>

             <div className="absolute bottom-0 right-0 w-96 h-96 bg-blue-500 rounded-full blur-2xl opacity-30 -z-1"></div>
        </>
    )
}

export default BG;