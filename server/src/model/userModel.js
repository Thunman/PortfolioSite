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

    gameState: {
        score: { type: Number, default: 0 },
        timeLeft: { type: Number, default: 0 },
        circles: [
          {
            color: { type: String, default: "" },
            id: { type: Number, default: 0 },
            top: { type: String, default: "" },
            left: { type: String, default: "" },
          },
        ],
      },
    },
    
}, {timestamps: true});

const User = mongoose.model("user", userSchema);

export default User;