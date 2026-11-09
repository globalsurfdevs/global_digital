import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
    select: false,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  isAdmin: {
    type: Boolean,
  },
  otp: {
    type: String,
    default: null,
  },
  role: {
    type: String,
    enum: ["admin", "hr", "user"],
    default: "user",
  },
  isActive: {
    type: Boolean,
    default: true,
  },
});

export default mongoose.models?.user || mongoose.model("user", UserSchema);
