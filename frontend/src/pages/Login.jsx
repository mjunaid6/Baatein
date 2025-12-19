import BG from "./BG";

const Login = () => {
    return (
        <div className="relative bg-gray-300 w-screen h-screen flex justify-center items-center overflow-hidden">
             <BG/>

             <form className="w-100 h-100 bg-white/20 backdrop-blur-md rounded-2xl p-5 pb-3 flex flex-col justify-around items-center">
                <h1 className="text-center text-3xl font-bold underline text-gray-50 mb-5">Login</h1>
                <input type="text" placeholder="E-mail..." className="border-2 border-gray-200 rounded-md h-12 w-full p-2 outline-gray-300"/>
                <input type="password" placeholder="Password..." className="border-2 border-gray-200 rounded-md h-12 w-full p-2 outline-gray-300 mb-5"/>
                
                <button className="bg-purple-300 px-3 py-1 text-lg text-white rounded-xl cursor-pointer hover:bg-purple-400">Login</button>
                
                <a href="#">Forgot Password?</a>
                <a href="/register">Not a User? <span className="text-green-500">Register<i class="ri-arrow-right-up-line"></i></span></a>
             </form>
        </div>
    )
}

export default Login;