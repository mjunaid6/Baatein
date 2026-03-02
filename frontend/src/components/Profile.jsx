const Profile = ({ profile, setProfile }) => {

    if (!profile) return null;

    return (
        <div className="flex flex-col items-center gap-4 p-6">
            <img
                src={profile.imgUrl}
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
        </div>
    );
};

export default Profile;