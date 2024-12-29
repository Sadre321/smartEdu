const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

// Define the User schema
const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'User name is required'],
        trim: true
    },
    email:{
        type:String,
        unique: true,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    role:{
        type: String,
        enum:["student", "teacher", "admin"],
        default: "student"
    },
    courses:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Course"
    }]
});

// Pre-save hook to generate a slug from the User name
UserSchema.pre("save", function(next) {
    const user = this;
    bcrypt.hash(user.password,10,(error,hash)=>{
        user.password = hash;
        next();
    })
});

// Create the User model
const User = mongoose.model("User", UserSchema);

module.exports = User;