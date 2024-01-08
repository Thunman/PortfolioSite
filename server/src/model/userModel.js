import mongoose from "mongoose";

const userSchema = new mongoose.Schema({

    userName: {
        type: String,
        required: true,
        unique: true,
    },
    email: {
        type: String,
        lowercase: true,
        unique: true,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    isAdmin: {type: Boolean, default: false},
    
}, {timestamps: true});

const User = mongoose.model("user", userSchema);

export default User;