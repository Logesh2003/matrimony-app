import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import api from "../services/axios";
import { logout } from "../features/auth/authSlice";
import { useNavigate } from "react-router-dom";
import Sidebar from "../components/Sidebar";

export default function Dashboard() {
    const [profile, setProfile] = useState(null);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const calculateProfileCompletion = (profile) => {
        if (!profile) return 0;

        let completed = 0;
        const total = 9;

        if (profile.name) completed++;
        if (profile.gender) completed++;
        if (profile.dob) completed++;
        if (profile.religion) completed++;
        if (profile.caste) completed++;
        if (profile.location) completed++;
        if (profile.education) completed++;
        if (profile.occupation) completed++;
        if (profile.photos && profile.photos.length > 0) completed++;

        return Math.round((completed / total) * 100);
    };

    const completion = calculateProfileCompletion(profile);

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
            <div className="flex items-center justify-center min-h-screen">
                <p className="text-gray-500">Loading dashboard...</p>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-100 flex">
            {/* Sidebar */}
            <Sidebar
                onLogout={() => {
                    dispatch(logout());
                    navigate("/login");
                }}
            />

            {/* Main Content */}
            <div className="flex-1 ml-64">
                {/* Header */}
                <header className="fixed top-0 left-64 right-0 z-40 bg-white border-b shadow-sm">
                    <div className="flex justify-between items-center px-6 py-4">

                        {/* Title */}
                        <h1 className="text-lg font-bold text-purple-700">
                            Matrimony Dashboard
                        </h1>

                        {/* Actions */}
                        <div className="flex items-center gap-5">

                            {/* Matches */}
                            <button
                                onClick={() => navigate("/matches")}
                                className="text-gray-600 hover:text-purple-600"
                                title="Matches"
                            >
                                ❤️
                            </button>

                            {/* Interests */}
                            <button
                                onClick={() => navigate("/interests")}
                                className="text-gray-600 hover:text-purple-600"
                                title="Interests"
                            >
                                💌
                            </button>

                            {/* Notifications */}
                            <button
                                onClick={() => navigate("/notifications")}
                                className="relative text-gray-600 hover:text-purple-600"
                            >
                                🔔
                                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-[10px] px-1 rounded-full">
                                    3
                                </span>
                            </button>

                            {/* Profile */}
                            <div className="flex items-center gap-2 cursor-pointer">
                                <div className="w-9 h-9 rounded-full overflow-hidden border">
                                    {profile?.photos?.[0] ? (
                                        <img
                                            src={profile.photos[0].url}
                                            alt="profile"
                                            className="w-full h-full object-cover"
                                        />
                                    ) : (
                                        <div className="w-full h-full bg-purple-100 flex items-center justify-center font-bold text-purple-700">
                                            {profile?.name?.charAt(0)}
                                        </div>
                                    )}
                                </div>
                            </div>

                        </div>
                    </div>
                </header>

                {/* Page Content */}
                <main className="p-6">
                    <div className="min-h-screen bg-gray-100">
                        {/* Main */}
                        <main className="max-w-7xl mx-auto pt-20 p-6 grid grid-cols-1 lg:grid-cols-4 gap-6">
                            {/* Profile Card */}
                            <section className="bg-white rounded-2xl shadow p-6 text-center lg:col-span-1">
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

                                {/* Profile Completion */}
                                <div className="flex flex-col items-center bg-white rounded-2xl shadow p-6 mt-6">
                                    <h3 className="text-sm font-semibold text-gray-700 mb-4">
                                        Profile Completion
                                    </h3>

                                    {/* Circle Wrapper */}
                                    <div className="relative w-32 h-32">
                                        <svg className="w-32 h-32 transform -rotate-90">
                                            {/* Background */}
                                            <circle
                                                cx="64"
                                                cy="64"
                                                r="48"
                                                fill="transparent"
                                                stroke="currentColor"
                                                strokeWidth="8"
                                                className="text-gray-200"
                                            />

                                            {/* Progress */}
                                            <circle
                                                cx="64"
                                                cy="64"
                                                r="48"
                                                fill="transparent"
                                                stroke="currentColor"
                                                strokeWidth="8"
                                                strokeLinecap="round"
                                                className="text-purple-600 transition-all duration-700"
                                                strokeDasharray={2 * Math.PI * 48}
                                                strokeDashoffset={2 * Math.PI * 48 * (1 - completion / 100)}
                                            />
                                        </svg>

                                        {/* CENTER ONLY THE % */}
                                        <div className="absolute inset-0 flex items-center justify-center">
                                            <span className="text-2xl font-bold text-purple-700">
                                                {completion}%
                                            </span>
                                        </div>
                                    </div>

                                    {/* TEXT OUTSIDE THE CIRCLE */}
                                    <p className="text-xs text-gray-500 mt-2 text-center">
                                        {completion < 100 ? "Complete your profile" : "Profile Complete!"}
                                    </p>
                                </div>


                            </section>

                            {/* Stats + More Info */}
                            <section className="lg:col-span-3 space-y-6">
                                {/* Stats */}
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                    <StatCard title="Matches" value={profile.matches?.length || 0} />
                                    <StatCard title="Interests Sent" value={profile.interestsSent?.length || 0} />
                                    <StatCard title="Interests Received" value={profile.interestsReceived?.length || 0} />
                                </div>

                                {/* Profile Details */}
                                <div className="bg-white rounded-2xl shadow p-6 grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <Info label="Gender" value={profile.gender} />
                                    <Info label="Religion" value={profile.religion} />
                                    <Info label="Caste" value={profile.caste} />
                                    <Info label="Education" value={profile.education} />
                                    <Info label="Occupation" value={profile.occupation} />
                                    <Info label="Location" value={profile.location} />
                                    <Info label="Height" value={profile.height} />
                                    <Info label="Marital Status" value={profile.maritalStatus} />
                                    <Info label="Mother Tongue" value={profile.motherTongue} />
                                    <Info label="Lifestyle" value={profile.lifestyle} />
                                </div>

                                {/* New Matches Nearby */}
                                <div className="bg-white rounded-2xl shadow p-6">
                                    <h3 className="text-lg font-semibold text-gray-700 mb-4">New Matches Near You</h3>
                                    <div className="flex space-x-4 overflow-x-auto py-2">
                                        {profile.newMatches?.length > 0 ? (
                                            profile.newMatches.map((match) => (
                                                <div key={match.id} className="flex-shrink-0 w-20 text-center">
                                                    <div className="w-20 h-20 rounded-full overflow-hidden border-2 border-purple-500 mb-2">
                                                        <img
                                                            src={match.photo || "/default-avatar.png"}
                                                            alt={match.name}
                                                            className="w-full h-full object-cover"
                                                        />
                                                    </div>
                                                    <p className="text-xs font-medium">{match.name}</p>
                                                </div>
                                            ))
                                        ) : (
                                            <p className="text-gray-500 text-sm">No new matches nearby</p>
                                        )}
                                    </div>
                                </div>

                                {/* Recent Activity */}
                                <div className="bg-white rounded-2xl shadow p-6">
                                    <h3 className="text-lg font-semibold text-gray-700 mb-4">Recent Activity</h3>
                                    <ul className="space-y-2 text-sm text-gray-600">
                                        {profile.recentActivity?.length > 0 ? (
                                            profile.recentActivity.map((act, idx) => (
                                                <li key={idx} className="flex justify-between border-b pb-1">
                                                    <span>{act.type}</span>
                                                    <span className="text-gray-400">{act.date}</span>
                                                </li>
                                            ))
                                        ) : (
                                            <p className="text-gray-500 text-sm">No recent activity</p>
                                        )}
                                    </ul>
                                </div>
                            </section>
                        </main>
                    </div>
                </main>
            </div>
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
