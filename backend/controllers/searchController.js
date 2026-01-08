const User = require("../models/User");

exports.searchProfiles = async (req, res) => {
    try {
        const {
            minAge,
            maxAge,
            religion,
            caste,
            location,
            gender,
            page = 1,
            limit = 10,
            sort = "recent"
        } = req.query;

        const query = {
            isBlocked: false,
            _id: { $ne: req.user } // exclude self
        };

        if (minAge || maxAge) {
            query.age = {};
            if (minAge) query.age.$gte = Number(minAge);
            if (maxAge) query.age.$lte = Number(maxAge);
        }

        if (religion) query.religion = religion;
        if (caste) query.caste = caste;
        if (location) query.location = location;
        if (gender) query.gender = gender;

        let sortOption = { createdAt: -1 };
        if (sort === "age_asc") sortOption = { age: 1 };
        if (sort === "age_desc") sortOption = { age: -1 };

        const skip = (page - 1) * limit;

        const profiles = await User.find(query)
            .select("-password")
            .sort(sortOption)
            .skip(skip)
            .limit(Number(limit));

        const total = await User.countDocuments(query);

        res.json({
            total,
            page: Number(page),
            pages: Math.ceil(total / limit),
            profiles
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
