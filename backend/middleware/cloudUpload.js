const multer = require("multer");
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const cloudinary = require("../config/cloudinary");

const storage = new CloudinaryStorage({
    cloudinary,
    params: {
        folder: "matrimony/profiles",
        allowed_formats: ["jpg", "jpeg", "png"],
        public_id: (req) => `${req.user}-${Date.now()}`,
    },
});

const upload = multer({
    storage,
    limits: { fileSize: 2 * 1024 * 1024 },
});

module.exports = upload;
