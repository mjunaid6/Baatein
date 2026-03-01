import { useState, useEffect } from "react";
import api from "../../auth/api";

const EndBar = () => {
  const [openSettings, setOpenSettings] = useState(false);
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const resp = await api.get("/user/getProfile");
        setProfile(resp.data);
      } catch (err) {
        console.error("Failed to load profile:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

  if (loading) {
    return (
      <div className="w-full h-16 flex justify-center items-center bg-purple-200">
        Loading...
      </div>
    );
  }

  if (!profile) return null;

  return (
    <div className="w-full h-fit flex flex-col justify-center items-center bg-purple-200 border-t-3 border-purple-300 rounded-t-2xl">
      <div className="w-full h-12 flex justify-center items-center p-2 gap-2">
        
        <img
          className="w-[10%] aspect-square object-cover rounded-full outline-2 outline-purple-500"
          src={profile.imgUrl || "/default-avatar.png"}
          alt="dp"
        />

        <h2 className="w-[80%] text-lg truncate">
          {profile.email}
        </h2>

        <i
          onClick={() => setOpenSettings(!openSettings)}
          className={`ri-${openSettings ? "arrow-drop-up-line" : "settings-line"} 
                      text-xl cursor-pointer hover:text-purple-600 
                      transition-all duration-300`}
        ></i>
      </div>

      {openSettings && (
        <div
            className={`w-full overflow-hidden transition-all duration-300 ease-in-out
                        ${openSettings ? "max-h-40 opacity-100 mt-2" : "max-h-0 opacity-0"}`}
            >
            <div className="w-full flex flex-col p-3 gap-3 border-t border-purple-300">

                <div className="flex justify-between items-center w-full">
                <h2 className="text-sm font-semibold text-gray-700">
                    Your Friend Code
                </h2>
                <span className="text-purple-700 font-mono text-sm bg-purple-100 px-2 py-1 rounded">
                    {profile.userId}
                </span>
                </div>

                <div className="flex justify-between items-center w-full">
                <h2 className="text-sm font-semibold text-gray-700">
                    Change Profile Picture
                </h2>
                <button className="py-1 px-2 rounded-xl bg-purple-300 hover:bg-purple-400 transition">
                    Change
                </button>
                </div>

            </div>
        </div>
      )}
    </div>
  );
};

export default EndBar;