const mongoose = require("mongoose");
const slugify = require("slugify");

// Define the Course schema
const CourseSchema = new mongoose.Schema({
    name: {
        type: String,
        unique: true,
        required: [true, 'Course name is required'],
        trim: true
    },
    description: {
        type: String,
        required: [true, 'Course description is required'],
        trim: true
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
    slug: {
        type: String,
        unique: true
    },
    category:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Category"
    },
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User"
    }
});

// Pre-save hook to generate a slug from the course name
CourseSchema.pre("save", function(next) {
        this.slug = slugify(this.name, {
            lower: true,
            strict: true
        });
    next();
});

// Create the Course model
const Course = mongoose.model("Course", CourseSchema);

module.exports = Course;