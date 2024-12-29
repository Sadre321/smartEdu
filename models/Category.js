const mongoose = require("mongoose");
const slugify = require("slugify");

// Define the Category schema
const CategorySchema = new mongoose.Schema({
    name: {
        type: String,
        unique: true,
        required: [true, 'Category name is required'],
        trim: true
    },
    slug: {
        type: String,
        unique: true
    }
});

// Pre-save hook to generate a slug from the Category name
CategorySchema.pre("save", function(next) {
        this.slug = slugify(this.name, {
            lower: true,
            strict: true
        });
    next();
});

// Create the Category model
const Category = mongoose.model("Category", CategorySchema);

module.exports = Category;