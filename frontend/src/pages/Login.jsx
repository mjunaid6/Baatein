import { useNavigate } from "react-router-dom";
import api from "../auth/api";
import {useAuth} from "../auth/AuthContext";
import BG from "../components/styles/BG";
import { useState } from "react";
import { setToken } from "../auth/authToken";

const Login = () => {

    const { setAccessToken, setRole } = useAuth();
    const navigate = useNavigate();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const validateInput = () => {
        return email.trim() !== "" && password.trim() !== "";
    };

    const handleLogin = async (e) => {
        e.preventDefault();
        if(!validateInput()) {
            alert("Please fill in all fields.");
            return;
        }
        try{
            const resp = await api.post("/auth/login", {
                "email": email,
                "password": password
            })

            setAccessToken(resp.data.accessToken);
            setToken(resp.data.accessToken);
            setRole(resp.data.role);
            
            navigate("/chat")
        } catch (err) {
            alert("Login failed. Please check your credentials and try again.");
        }
    }


    return (
        <div className="relative bg-gray-300 w-screen h-screen flex justify-center items-center overflow-hidden">
             <BG/>

             <form 
                onSubmit={handleLogin}
                className="w-100 h-100 bg-white/20 backdrop-blur-md rounded-2xl p-5 pb-3 flex flex-col justify-around items-center">
                <h1 className="text-center text-3xl font-bold underline text-gray-50 mb-5">Login</h1>
                <input 
                    onChange={(e) => setEmail(e.target.value)}
                    type="text" 
                    value={email}
                    placeholder="E-mail..." 
                    className="border-2 border-gray-200 rounded-md h-12 w-full p-2 outline-gray-300"/>
                <input 
                    onChange={(e) => setPassword(e.target.value)}
                    type="password" 
                    value={password}
                    placeholder="Password..." 
                    className="border-2 border-gray-200 rounded-md h-12 w-full p-2 outline-gray-300 mb-5"/>
                
                <button 
                    type="submit"
                    className="bg-purple-300 px-3 py-1 text-lg text-white rounded-xl cursor-pointer hover:bg-purple-400"
                >Login</button>
                
                <a href="#">Forgot Password?</a>
                <a href="/register">Not a User? <span className="text-green-500">Register<i className="ri-arrow-right-up-line"></i></span></a>
             </form>
        </div>
    )
}

export default Login;