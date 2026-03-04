import mongoose from "mongoose";

const ChannelsSchema = new mongoose.Schema({
    createdAt: {
        type: Date,
        default: Date.now()
    },
    channelName: {
        type: String
    },
    channelLink: {
        type: String
    },
});

export default mongoose.models?.channel || mongoose.model("channel", ChannelsSchema);
