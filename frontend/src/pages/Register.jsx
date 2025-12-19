import BG from "./BG";

const Register = () => {
    return (
        <div className="relative bg-gray-300 w-screen h-screen flex justify-center items-center overflow-hidden">
             <div className="absolute -top-20 -left-20 w-96 h-96 bg-green-500 rounded-full blur-xl opacity-30"></div>

             <div className="absolute -bottom-10 left-50 w-96 h-96 bg-purple-500 rounded-full blur-xl opacity-30"></div>
            
             <div className="absolute -top-10 right-110 w-96 h-96 bg-red-500 rounded-full blur-xl opacity-30"></div>

             <div className="absolute bottom-0 right-0 w-96 h-96 bg-blue-500 rounded-full blur-2xl opacity-30"></div>

             <form className="w-100 h-100 bg-white/20 backdrop-blur-md rounded-2xl p-5 pb-3 flex flex-col justify-around items-center">
                <h1 className="text-center text-3xl font-bold underline text-gray-50 mb-5">Register</h1>
                <input type="text" placeholder="Username..." className="border-2 border-gray-200 rounded-md h-12 w-full p-2 outline-gray-300"/>
                <input type="text" placeholder="E-mail..." className="border-2 border-gray-200 rounded-md h-12 w-full p-2 outline-gray-300"/>
                <input type="password" placeholder="Password..." className="border-2 border-gray-200 rounded-md h-12 w-full p-2 outline-gray-300 mb-5"/>
                
                <button className="bg-purple-300 px-3 py-1 text-lg text-white rounded-xl cursor-pointer hover:bg-purple-400">Register</button>
                
                <a href="#">Already Registered? <span className="text-green-500">Login<i class="ri-arrow-right-up-line"></i></span></a>
             </form>
        </div>
    )
}

export default Register;