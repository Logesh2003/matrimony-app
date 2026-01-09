import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "../features/auth/authSlice";

export default function Login() {
    const dispatch = useDispatch();
    const { loading, error } = useSelector((state) => state.auth);

    const [form, setForm] = useState({
        email: "",
        password: "",
    });

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(loginUser(form));
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-pink-100 to-purple-200">
            <div className="bg-white w-full max-w-md rounded-2xl shadow-xl p-8">

                <h2 className="text-2xl font-bold text-center text-purple-700">
                    Matrimony Login
                </h2>
                <p className="text-center text-gray-500 text-sm mt-1">
                    Find your perfect life partner
                </p>

                <form onSubmit={handleSubmit} className="mt-6 space-y-4">

                    <div>
                        <label className="text-sm font-medium text-gray-600">
                            Email
                        </label>
                        <input
                            type="email"
                            name="email"
                            required
                            onChange={handleChange}
                            placeholder="Enter your email"
                            className="w-full mt-1 px-4 py-2 border rounded-lg focus:ring-2 focus:ring-purple-400 outline-none"
                        />
                    </div>

                    <div>
                        <label className="text-sm font-medium text-gray-600">
                            Password
                        </label>
                        <input
                            type="password"
                            name="password"
                            required
                            onChange={handleChange}
                            placeholder="Enter your password"
                            className="w-full mt-1 px-4 py-2 border rounded-lg focus:ring-2 focus:ring-purple-400 outline-none"
                        />
                    </div>

                    {error && (
                        <p className="text-red-500 text-sm text-center">{error}</p>
                    )}

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full bg-purple-600 text-white py-2 rounded-lg font-semibold hover:bg-purple-700 transition"
                    >
                        {loading ? "Logging in..." : "Login"}
                    </button>
                </form>

                <p className="text-center text-sm text-gray-600 mt-4">
                    Don’t have an account?
                    <a href="/register" className="text-purple-600 font-medium ml-1">
                        Register
                    </a>
                </p>
            </div>
        </div>
    );
}
