const Category = require("../models/Category");

// Export the model and the function to create a course
exports.createCategory = async (req, res) => {
        try {
            const category = await Category.create(req.body);
            res.status(200).json({
                status: "success",
                category
            });
        } catch (err) {
            res.status(400).json({
                status: "error",
                error: err.message // Returning only the error message
            });
        }
};