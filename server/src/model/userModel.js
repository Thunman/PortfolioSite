import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
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
  basicInfo: {
      name: { type: String },
      age: { type: String },
      userName: { type: String },
      location: { type: String },
  },
  about: {
      aboutText: { type: String },
      aboutHeader: { type: String },
  },

  showEmail: { type: Boolean, default: false },
  profilePic: { type: String },
}, { timestamps: true });

const User = mongoose.model("user", userSchema);

export {User};