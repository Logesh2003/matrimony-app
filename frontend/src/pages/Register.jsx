import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { registerUser } from "../features/auth/authSlice";
import { Link, useNavigate } from "react-router-dom";

export default function Register() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { loading, error, user } = useSelector((state) => state.auth);

    const [form, setForm] = useState({
        name: "",
        email: "",
        password: "",
        gender: "",
        dob: "",
        religion: "",
        caste: "",
        location: "",
        education: "",
        occupation: "",
    });

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(registerUser(form));
    };

    // Redirect to login after successful registration
    useEffect(() => {
        if (user) {
            navigate("/login");
        }
    }, [user, navigate]);

    return (
        <div className="min-h-screen bg-gradient-to-br from-purple-100 to-pink-200 flex items-center justify-center px-4">
            <div className="bg-white w-full max-w-2xl rounded-2xl shadow-xl p-8">
                <h2 className="text-2xl font-bold text-center text-purple-700">
                    Create Your Matrimony Profile
                </h2>
                <p className="text-center text-gray-500 text-sm mt-1">
                    Begin your journey to find your life partner
                </p>

                <form
                    onSubmit={handleSubmit}
                    className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4"
                >
                    <input
                        name="name"
                        placeholder="Full Name"
                        onChange={handleChange}
                        required
                        className="input"
                    />

                    <input
                        type="email"
                        name="email"
                        placeholder="Email Address"
                        onChange={handleChange}
                        required
                        className="input"
                    />

                    <input
                        type="password"
                        name="password"
                        placeholder="Password"
                        onChange={handleChange}
                        required
                        className="input"
                    />

                    <select
                        name="gender"
                        onChange={handleChange}
                        required
                        className="input"
                    >
                        <option value="">Select Gender</option>
                        <option>Male</option>
                        <option>Female</option>
                    </select>

                    <input
                        type="date"
                        name="dob"
                        onChange={handleChange}
                        required
                        className="input"
                    />

                    <input
                        name="religion"
                        placeholder="Religion"
                        onChange={handleChange}
                        className="input"
                    />

                    <input
                        name="caste"
                        placeholder="Caste"
                        onChange={handleChange}
                        className="input"
                    />

                    <input
                        name="location"
                        placeholder="Location"
                        onChange={handleChange}
                        className="input"
                    />

                    <input
                        name="education"
                        placeholder="Education"
                        onChange={handleChange}
                        className="input"
                    />

                    <input
                        name="occupation"
                        placeholder="Occupation"
                        onChange={handleChange}
                        className="input"
                    />

                    {/* Optional: Add a full-width placeholder div for spacing */}
                    <div></div>
                </form>

                {error && (
                    <p className="text-red-500 text-sm text-center mt-4">{error}</p>
                )}

                <button
                    type="submit"
                    onClick={handleSubmit}
                    disabled={loading}
                    className="w-full mt-6 bg-purple-600 text-white py-2 rounded-lg font-semibold hover:bg-purple-700 transition"
                >
                    {loading ? "Creating profile..." : "Register"}
                </button>

                <p className="text-center text-sm text-gray-600 mt-4">
                    Already have an account?
                    <Link to="/login" className="text-purple-600 font-medium ml-1">
                        Login
                    </Link>
                </p>
            </div>
        </div>
    );
}
