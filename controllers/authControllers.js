const User = require("../models/User");
const bcrypt = require("bcrypt");
const Category = require("../models/Category");
const Course = require("../models/Course");

// Create a new user
exports.createUser = async (req, res) => {
    try {
        // Create user and return response
        const user = await User.create(req.body);
        res.status(201).redirect("/auth/login");
    } catch (err) {
        res.status(400).json({
            status: "error",
            error: err.message // Returning only the error message
        });
    }
};

// Login a user
exports.loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;
        
        // Find user by email
        const user = await User.findOne({ email });

        if (!user) {
            return res.status(404).send("User not found");
        }

        // Compare the provided password with the stored hashed password
        const isMatch = await bcrypt.compare(password, user.password);

        if (isMatch) {
            req.session.userID = user._id;
            return res.status(200).redirect("/");
        } else {
            return res.status(401).send("Invalid credentials");
        }
    } catch (err) {
        res.status(400).json({
            status: "error",
            error: err.message // Returning only the error message
        });
    }
};

// Logout user
exports.logoutUser = (req, res) => {
    req.session.destroy(err => {
        if (err) {
            return res.status(500).json({
                status: "error",
                error: "Failed to logout"
            });
        }
        res.redirect("/");
    });
};

// Get user dashboard
exports.getDashboard = async (req, res) => {
    try {
        // Ensure user is logged in
        if (!req.session.userID) {
            return res.redirect("/");
        }

        // Find user and categories
        const user = await User.findById(req.session.userID).populate("courses");
        const categories = await Category.find();
        const courses = await Course.find({user:req.session.userID}); 
        const users = await User.find(); 

        if (!user) {
            return res.status(404).json({
                status: "error",
                message: "User not found"
            });
        }

        // Render dashboard with user and categories
        res.status(200).render("dashboard", {
            page_name: 'dashboard',
            user,users,
            categories,
            courses
        });
    } catch (err) {
        res.status(500).json({
            status: "error",
            message: err.message // Returning only the error message
        });
    }
};

exports.deleteUser = async (req, res) => {
    try {
        // Remove the user
        await User.findByIdAndDelete(req.params.id);
        
        // Remove associated courses
        await Course.deleteMany({ user: req.params.id });

        // Redirect after deletion
        res.status(200).redirect('/auth/dashboard');
    } catch (error) {
        console.error(error); // Log the error for debugging
        res.status(400).json({
            status: 'fail',
            error: error.message || error, // Provide more useful error messages
        });
    }
};

