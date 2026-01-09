import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import api from "../services/axios";
import { logout } from "../features/auth/authSlice";
import { useNavigate } from "react-router-dom";

export default function Dashboard() {
    const [profile, setProfile] = useState(null);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const res = await api.get("/users/me");
                setProfile(res.data);
            } catch (err) {
                dispatch(logout());
                navigate("/login");
            }
        };
        fetchProfile();
    }, []);

    if (!profile) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <p className="text-gray-500">Loading profile...</p>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-100">

            {/* Top Bar */}
            <div className="bg-white shadow-sm px-6 py-4 flex justify-between items-center">
                <h1 className="text-xl font-bold text-purple-700">Matrimony Dashboard</h1>
                <button
                    onClick={() => {
                        dispatch(logout());
                        navigate("/login");
                    }}
                    className="text-sm bg-red-500 text-white px-4 py-1.5 rounded-lg hover:bg-red-600"
                >
                    Logout
                </button>
            </div>

            {/* Content */}
            <div className="max-w-5xl mx-auto p-6 grid grid-cols-1 md:grid-cols-3 gap-6">

                {/* Profile Card */}
                <div className="bg-white rounded-2xl shadow p-6 text-center">
                    <div className="w-24 h-24 mx-auto rounded-full overflow-hidden border-2 border-purple-500">
                        {profile.photos && profile.photos.length > 0 ? (
                            <img
                                src={profile.photos[0].url}
                                alt="Profile"
                                className="w-full h-full object-cover"
                            />
                        ) : (
                            <div className="w-full h-full bg-purple-100 flex items-center justify-center text-3xl font-bold text-purple-700">
                                {profile.name.charAt(0)}
                            </div>
                        )}
                    </div>

                    <h2 className="mt-3 text-lg font-semibold">{profile.name}</h2>
                    <p className="text-sm text-gray-500">
                        {profile.age} yrs • {profile.location}
                    </p>

                    <button
                        className="mt-4 w-full bg-purple-600 text-white py-2 rounded-lg hover:bg-purple-700"
                    >
                        Edit Profile
                    </button>
                </div>

                {/* Profile Details */}
                <div className="md:col-span-2 bg-white rounded-2xl shadow p-6">
                    <h3 className="text-lg font-semibold text-gray-700 mb-4">
                        Profile Details
                    </h3>

                    <div className="grid grid-cols-2 gap-4 text-sm">
                        <p><b>Gender:</b> {profile.gender}</p>
                        <p><b>Religion:</b> {profile.religion}</p>
                        <p><b>Caste:</b> {profile.caste}</p>
                        <p><b>Education:</b> {profile.education}</p>
                        <p><b>Occupation:</b> {profile.occupation}</p>
                        <p><b>Location:</b> {profile.location}</p>
                    </div>
                </div>

            </div>
        </div>
    );
}
