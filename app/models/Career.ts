import mongoose from "mongoose";

const CareerSchema = new mongoose.Schema({
    name: {
        type: String
    },
    email: {
        type: String
    },
    jobTitle: {
        type: String
    },
    experience: {
        type: String
    },
    currentSalary: {
        type: String
    },
    expectedSalary: {
        type: String
    },
    noticePeriod: {
        type: String
    },
    phone: {
        type: String
    },
    resume: {
        type: String
    }
});

export default mongoose.models?.career || mongoose.model("career", CareerSchema);
