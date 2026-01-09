import { NavLink } from "react-router-dom";
import {
    User,
    LayoutDashboard,
    Heart,
    MessageCircle,
    Bell,
    Settings,
    LogOut
} from "lucide-react";

export default function Sidebar({ onLogout }) {
    const linkClass = ({ isActive }) =>
        `flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition
     ${isActive
            ? "bg-purple-100 text-purple-700"
            : "text-gray-600 hover:bg-gray-100"}`;

    return (
        <aside className="w-64 bg-white h-screen shadow-sm fixed left-0 top-0">
            {/* Logo */}
            <div className="px-6 py-5 border-b">
                <h1 className="text-xl font-bold text-purple-700">
                    Matrimony
                </h1>
            </div>

            {/* Navigation */}
            <nav className="p-4 space-y-1">
                <NavLink to="/dashboard" className={linkClass}>
                    <LayoutDashboard size={18} />
                    Dashboard
                </NavLink>

                <NavLink to="/profile" className={linkClass}>
                    <User size={18} />
                    My Profile
                </NavLink>

                <NavLink to="/matches" className={linkClass}>
                    <Heart size={18} />
                    Matches
                </NavLink>

                <NavLink to="/messages" className={linkClass}>
                    <MessageCircle size={18} />
                    Messages
                </NavLink>

                <NavLink to="/notifications" className={linkClass}>
                    <Bell size={18} />
                    Notifications
                </NavLink>

                <NavLink to="/settings" className={linkClass}>
                    <Settings size={18} />
                    Settings
                </NavLink>
            </nav>

            {/* Logout */}
            <div className="absolute bottom-4 w-full px-4">
                <button
                    onClick={onLogout}
                    className="flex items-center gap-3 w-full px-4 py-3 text-sm font-medium text-red-600 hover:bg-red-50 rounded-lg"
                >
                    <LogOut size={18} />
                    Logout
                </button>
            </div>
        </aside>
    );
}
