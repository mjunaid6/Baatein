import { useNavigate } from "react-router-dom";
import { defaultProfilePictureUrl } from "../utils/data/data";
import { logout } from "../utils/authAPICalls";
import { setToken } from "../auth/authToken";
import { useAuth } from "../auth/AuthContext";

const Profile = ({ profile, setProfile }) => {

    if (!profile) return null;

    const navigate = useNavigate(); 

    const {setAccessToken} = useAuth();

    const handleLogout = async () => {
        try{
            logout();
            setAccessToken(null);
            setToken(null);
            navigate("/login");
        } catch (err) {
            console.error("Logout failed:", err);
        }
    }

    return (
        <div className="flex flex-col h-full items-center gap-4 p-6">
            <img
                src={profile.imgUrl || defaultProfilePictureUrl}
                alt="dp"
                className="w-24 h-24 rounded-full object-cover 
                           outline-4 outline-purple-400"
            />

            <div className="text-center">
                <h2 className="text-xl font-bold text-gray-700">
                    {profile.email} 
                </h2>
                <p className="text-sm text-purple-600 font-mono">
                    Friend Code:<span className="uppercase">{profile.userId}</span>
                </p>
            </div>

            <button
            onClick={handleLogout}
            className="mt-auto w-full px-4 py-2 rounded-xl text-lg
                        bg-linear-to-r from-purple-500/80 via-purple-500 to-purple-700/60 
                        text-white font-semibold shadow-lg shadow-purple-900/30
                        hover:from-purple-600 hover:to-purple-700/80 transition
                        cursor-pointer"
            >
            Logout
            </button>
        </div>
    );
};

export default Profile;