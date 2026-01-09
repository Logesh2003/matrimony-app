import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { registerUser } from "../features/auth/authSlice";
import { Link } from "react-router-dom";

export default function Register() {
    const dispatch = useDispatch();
    const { loading, error } = useSelector((state) => state.auth);

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

    const [errors, setErrors] = useState({});

    const validate = () => {
        const errs = {};

        if (form.name.trim().length < 3) {
            errs.name = "Name must be at least 3 characters";
        }

        if (!/\S+@\S+\.\S+/.test(form.email)) {
            errs.email = "Invalid email address";
        }

        if (form.password.length < 6) {
            errs.password = "Password must be at least 6 characters";
        }

        if (!form.gender) {
            errs.gender = "Please select gender";
        }

        if (!form.dob) {
            errs.dob = "Date of birth is required";
        } else {
            const age =
                Math.floor((Date.now() - new Date(form.dob)) / (365.25 * 24 * 60 * 60 * 1000));
            if (age < 18) {
                errs.dob = "You must be at least 18 years old";
            }
        }

        if (!form.location) {
            errs.location = "Location is required";
        }

        setErrors(errs);
        return Object.keys(errs).length === 0;
    };

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
        setErrors({ ...errors, [e.target.name]: "" });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!validate()) return;
        dispatch(registerUser(form));
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-purple-100 to-pink-200 flex items-center justify-center px-4">
            <div className="bg-white w-full max-w-2xl rounded-2xl shadow-xl p-8">

                <h2 className="text-2xl font-bold text-center text-purple-700">
                    Create Your Matrimony Profile
                </h2>

                <form onSubmit={handleSubmit} className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">

                    {/* Name */}
                    <div>
                        <input name="name" placeholder="Full Name" onChange={handleChange} className="input" />
                        {errors.name && <p className="error">{errors.name}</p>}
                    </div>

                    {/* Email */}
                    <div>
                        <input name="email" placeholder="Email" onChange={handleChange} className="input" />
                        {errors.email && <p className="error">{errors.email}</p>}
                    </div>

                    {/* Password */}
                    <div>
                        <input type="password" name="password" placeholder="Password" onChange={handleChange} className="input" />
                        {errors.password && <p className="error">{errors.password}</p>}
                    </div>

                    {/* Gender */}
                    <div>
                        <select name="gender" onChange={handleChange} className="input">
                            <option value="">Select Gender</option>
                            <option>Male</option>
                            <option>Female</option>
                        </select>
                        {errors.gender && <p className="error">{errors.gender}</p>}
                    </div>

                    {/* DOB */}
                    <div>
                        <input type="date" name="dob" onChange={handleChange} className="input" />
                        {errors.dob && <p className="error">{errors.dob}</p>}
                    </div>

                    {/* Location */}
                    <div>
                        <input name="location" placeholder="Location" onChange={handleChange} className="input" />
                        {errors.location && <p className="error">{errors.location}</p>}
                    </div>

                    <input name="religion" placeholder="Religion" onChange={handleChange} className="input" />
                    <input name="caste" placeholder="Caste" onChange={handleChange} className="input" />
                    <input name="education" placeholder="Education" onChange={handleChange} className="input" />
                    <input name="occupation" placeholder="Occupation" onChange={handleChange} className="input" />

                </form>

                {error && <p className="text-red-500 text-sm text-center mt-3">{error}</p>}

                <button
                    onClick={handleSubmit}
                    disabled={loading}
                    className="w-full mt-6 bg-purple-600 text-white py-2 rounded-lg font-semibold hover:bg-purple-700 transition"
                >
                    {loading ? "Creating profile..." : "Register"}
                </button>

                <p className="text-center text-sm text-gray-600 mt-4">
                    Already have an account?
                    <Link to="/login" className="text-purple-600 ml-1">Login</Link>
                </p>

            </div>
        </div>
    );
}
