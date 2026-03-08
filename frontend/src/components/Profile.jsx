import { useNavigate } from "react-router-dom";
import { defaultProfilePictureUrl } from "../utils/data/data";
import { logout } from "../utils/authAPICalls";
import { setToken } from "../auth/authToken";
import { useAuth } from "../auth/AuthContext";
import {updateProfilePicture} from "../utils/apiCalls";
import { useState } from "react";

const Profile = ({ profile, setProfile }) => {

    if (!profile) return null;
    const [preview, setPreview] = useState(null);
    const [uploading, setUploading] = useState(false);
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

    const handleProfilePictureChange = async (e) => {
        try {
            const file = e.target.files[0];
            if (!file) return;

            const previewUrl = URL.createObjectURL(file);
            setPreview(previewUrl);

            setUploading(true);
            const newImgUrl = await updateProfilePicture(file);

            if(newImgUrl) {
                setProfile((prev) => ({
                    ...prev,
                    imgUrl: import.meta.env.VITE_BASE_IMAGE_URL + newImgUrl,
                }));
            }
            setPreview(null); 
        } catch (err) {
            console.error("Profile picture update failed:", err);
            setPreview(null);
        } finally {
            setUploading(false);
        }
    };

    const imageToShow = preview || profile.imgUrl || defaultProfilePictureUrl;

    return (
        <div className="flex flex-col h-full items-center gap-4 p-6">
            <div className="relative flex justify-center items-center">
                <img
                    src={profile.imgUrl || defaultProfilePictureUrl}
                    alt="dp"
                    className="w-24 h-24 rounded-full object-cover outline-4 outline-purple-400"
                />

                <label className="absolute bottom-0 right-0 bg-purple-500 text-white rounded-full p-2 hover:bg-purple-600 cursor-pointer">
                    <i className="ri-file-edit-fill"></i>

                    <input
                        type="file"
                        accept="image/*"
                        hidden
                        onChange={handleProfilePictureChange}
                    />
                </label>
            </div>

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