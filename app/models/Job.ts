import mongoose from "mongoose";

const JobSchema = new mongoose.Schema({
    jobTitle: {
        type: String
    },
    team: {
        type: String
    },
    description: {
        type: String
    },
    slug: {
        type: String
    },
});

export default mongoose.models?.job || mongoose.model("job", JobSchema);
