// Importing mongoose for database operations
import mongoose from "mongoose";

// Defining the schema for User
const userSchema = new mongoose.Schema({
    // The username field is required
    username: { type: String, required: true },

    // The email field is required and must be unique
    email: { type: String, required: true, unique: true },

    // The password field is required
    password: { type: String, required: true },

    // The profilePicture field has a default value
    profilePicture: { type: String, default: 'https://i.pravatar.cc/300' },

    // The myList field is an array with a default empty value
    myList: { type: Array, default: [] }
}, {
    // Enabling timestamps to record createdAt and updatedAt fields
    timestamps: true
});

// Creating the User model from the schema
const User = mongoose.model("User", userSchema);

// Exporting the User model
export default User;