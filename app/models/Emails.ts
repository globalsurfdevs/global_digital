import mongoose from "mongoose";

const emailsSchema = new mongoose.Schema({
    toEmailCareer: String,
    toEmailContact: String,
})

const Email = mongoose.models.Email || mongoose.model("Email", emailsSchema);

export default Email;