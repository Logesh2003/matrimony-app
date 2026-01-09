import { useEffect, useState } from "react";
import api from "../services/axios";
import { useNavigate } from "react-router-dom";

export default function ProfilePhoto() {
    const [file, setFile] = useState(null);
    const [preview, setPreview] = useState(null);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    // 🔹 Fetch existing profile photo
    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const res = await api.get("/users/me");

                if (res.data.photos && res.data.photos.length > 0) {
                    setPreview(res.data.photos[0].url);
                }
            } catch (err) {
                console.error(err);
            }
        };

        fetchProfile();
    }, []);

    const handleFileChange = (e) => {
        const selected = e.target.files[0];
        if (!selected) return;

        setFile(selected);
        setPreview(URL.createObjectURL(selected));
    };

    const handleUpload = async () => {
        if (!file) {
            alert("Please select a photo");
            return;
        }

        const formData = new FormData();
        formData.append("photo", file);

        try {
            setLoading(true);
            await api.post("/users/profile/photo", formData);

            alert("Profile photo updated successfully");
            navigate("/dashboard");
        } catch (err) {
            alert(err.response?.data?.message || "Upload failed");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
            <div className="bg-white w-full max-w-md rounded-2xl shadow p-6 text-center">
                <h2 className="text-xl font-bold text-purple-700 mb-4">
                    Upload Profile Photo
                </h2>

                <div className="w-32 h-32 mx-auto rounded-full border-2 border-purple-400 overflow-hidden mb-4">
                    {preview ? (
                        <img
                            src={preview}
                            alt="Profile"
                            className="w-full h-full object-cover"
                        />
                    ) : (
                        <div className="w-full h-full flex items-center justify-center text-gray-400">
                            No Photo
                        </div>
                    )}
                </div>

                <input
                    type="file"
                    accept="image/*"
                    onChange={handleFileChange}
                    className="mb-4"
                />

                <button
                    onClick={handleUpload}
                    disabled={loading}
                    className="w-full bg-purple-600 text-white py-2 rounded-lg hover:bg-purple-700 disabled:opacity-50"
                >
                    {loading ? "Uploading..." : "Update Photo"}
                </button>

                <button
                    onClick={() => navigate("/dashboard")}
                    className="mt-3 text-sm text-gray-500 hover:underline"
                >
                    Back to Dashboard
                </button>
            </div>
        </div>
    );
}
