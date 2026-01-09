import React from "react";
import { useDispatch } from "react-redux";
import { logout } from "../features/auth/authSlice";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleLogout = () => {
        dispatch(logout());      // clear Redux auth state
        navigate("/login");      // redirect to login page
    };

    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-purple-100">
            <h1 className="text-3xl font-bold text-purple-700 mb-6">Dashboard</h1>

            <p className="mb-4 text-gray-700">Welcome to your dashboard!</p>

            <button
                onClick={handleLogout}
                className="bg-red-600 text-white px-6 py-2 rounded-lg font-semibold hover:bg-red-700 transition"
            >
                Logout
            </button>
        </div>
    );
};

export default Dashboard;
