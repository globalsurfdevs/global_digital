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
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    isAdmin: {
        type: Boolean
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
});

export default mongoose.models?.user || mongoose.model("user", UserSchema);
