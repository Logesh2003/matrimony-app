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
            } catch {
                dispatch(logout());
                navigate("/login");
            }
        };
        fetchProfile();
    }, []);

    if (!profile) {
        return (
            <div className="min-h-screen flex items-center justify-center text-gray-500">
                Loading dashboard...
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-100">

            {/* Header */}
            <header className="bg-white shadow-sm px-6 py-4 flex justify-between items-center">
                <h1 className="text-xl font-bold text-purple-700">Matrimony Dashboard</h1>
                <button
                    onClick={() => {
                        dispatch(logout());
                        navigate("/login");
                    }}
                    className="bg-red-500 text-white px-4 py-2 rounded-lg text-sm hover:bg-red-600"
                >
                    Logout
                </button>
            </header>

            {/* Main */}
            <main className="max-w-6xl mx-auto p-6 grid grid-cols-1 lg:grid-cols-3 gap-6">

                {/* Profile Card */}
                <section className="bg-white rounded-2xl shadow p-6 text-center">
                    <div className="w-28 h-28 mx-auto rounded-full border-4 border-purple-500 overflow-hidden">
                        {profile.photos?.length > 0 ? (
                            <img
                                src={profile.photos[0].url}
                                alt="Profile"
                                className="w-full h-full object-cover"
                            />
                        ) : (
                            <div className="w-full h-full bg-purple-100 flex items-center justify-center text-4xl font-bold text-purple-700">
                                {profile.name.charAt(0)}
                            </div>
                        )}
                    </div>

                    <h2 className="mt-4 text-xl font-semibold">{profile.name}</h2>
                    <p className="text-gray-500 text-sm">
                        {profile.age} yrs • {profile.location}
                    </p>

                    <div className="mt-4 space-y-2">
                        <button
                            onClick={() => navigate("/edit-profile")}
                            className="w-full bg-purple-600 text-white py-2 rounded-lg hover:bg-purple-700"
                        >
                            Edit Profile
                        </button>

                        <button
                            onClick={() => navigate("/upload-photo")}
                            className="w-full border border-purple-600 text-purple-600 py-2 rounded-lg hover:bg-purple-50"
                        >
                            Change Photo
                        </button>
                    </div>
                </section>

                {/* Stats + Details */}
                <section className="lg:col-span-2 space-y-6">

                    {/* Stats */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <StatCard title="Matches" value={profile.matches?.length || 0} />
                        <StatCard title="Interests Sent" value={profile.interestsSent?.length || 0} />
                        <StatCard title="Interests Received" value={profile.interestsReceived?.length || 0} />
                    </div>

                    {/* Profile Details */}
                    <div className="bg-white rounded-2xl shadow p-6">
                        <h3 className="text-lg font-semibold text-gray-700 mb-4">
                            Profile Information
                        </h3>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                            <Info label="Gender" value={profile.gender} />
                            <Info label="Religion" value={profile.religion} />
                            <Info label="Caste" value={profile.caste} />
                            <Info label="Education" value={profile.education} />
                            <Info label="Occupation" value={profile.occupation} />
                            <Info label="Location" value={profile.location} />
                        </div>
                    </div>
                </section>
            </main>
        </div>
    );
}

/* Components */
const StatCard = ({ title, value }) => (
    <div className="bg-white rounded-xl shadow p-4 text-center">
        <p className="text-gray-500 text-sm">{title}</p>
        <p className="text-2xl font-bold text-purple-700">{value}</p>
    </div>
);

const Info = ({ label, value }) => (
    <p>
        <span className="font-medium text-gray-600">{label}: </span>
        <span className="text-gray-800">{value || "—"}</span>
    </p>
);
