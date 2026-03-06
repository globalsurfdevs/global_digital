import mongoose from "mongoose";

const ContactSchema = new mongoose.Schema({
    name: {
        type: String
    },
    email: {
        type: String
    },
    company: {
        type: String
    },
    phone: {
        type: String
    },
    budget: {
        type: String
    },
    service: {
        type: String
    },
    message: {
        type: String
    },
    page_url: {
        type: String
    },
});

export default mongoose.models?.contact || mongoose.model("contact", ContactSchema);
