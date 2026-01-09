import { useEffect, useState } from "react";
import api from "../services/axios";
import { useNavigate } from "react-router-dom";

export default function EditProfile() {
    const [formData, setFormData] = useState({
        name: "",
        gender: "",
        dob: "",
        religion: "",
        caste: "",
        location: "",
        education: "",
        occupation: "",
    });

    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const res = await api.get("/users/me");
                setFormData({
                    ...res.data,
                    dob: res.data.dob?.slice(0, 10),
                });
            } catch {
                navigate("/login");
            }
        };
        fetchProfile();
    }, []);

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            await api.put("/users/profile", formData);
            navigate("/dashboard");
        } catch (err) {
            alert(err.response?.data?.message || "Update failed");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
            <div className="bg-white w-full max-w-3xl rounded-2xl shadow p-6">
                <h2 className="text-2xl font-bold text-purple-700 mb-6">
                    Edit Profile
                </h2>

                <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">

                    <Input label="Name" name="name" value={formData.name} onChange={handleChange} />
                    <Input label="Gender" name="gender" value={formData.gender} onChange={handleChange} />
                    <Input label="Date of Birth" name="dob" type="date" value={formData.dob} onChange={handleChange} />
                    <Input label="Religion" name="religion" value={formData.religion} onChange={handleChange} />
                    <Input label="Caste" name="caste" value={formData.caste} onChange={handleChange} />
                    <Input label="Location" name="location" value={formData.location} onChange={handleChange} />
                    <Input label="Education" name="education" value={formData.education} onChange={handleChange} />
                    <Input label="Occupation" name="occupation" value={formData.occupation} onChange={handleChange} />

                    <div className="md:col-span-2 flex justify-end gap-3 mt-4">
                        <button
                            type="button"
                            onClick={() => navigate("/dashboard")}
                            className="px-6 py-2 rounded-lg border border-gray-300"
                        >
                            Cancel
                        </button>

                        <button
                            type="submit"
                            disabled={loading}
                            className="px-6 py-2 rounded-lg bg-purple-600 text-white hover:bg-purple-700 disabled:opacity-50"
                        >
                            {loading ? "Saving..." : "Save Changes"}
                        </button>
                    </div>

                </form>
            </div>
        </div>
    );
}

const Input = ({ label, ...props }) => (
    <div>
        <label className="block text-sm font-medium text-gray-600 mb-1">
            {label}
        </label>
        <input
            {...props}
            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
        />
    </div>
);
