import mongoose from "mongoose";

const testimonialsPageSchema = new mongoose.Schema({
  testimonialSection: {
    title: {
      type: String,
    },
    starText: {
      type: String,
    },
    bottomText: {
      type: String,
    },
    items: [
      {
        image: { type: String, required: true },
        imageAlt: { type: String, required: true },
        name: { type: String, required: true },
        designation: { type: String, required: true },
        message: { type: String, required: true },
        companyLogo: { type: String, required: true },
        companyLogoAlt: { type: String, required: true },
        companyName: { type: String, required: true },
      },
    ],
  },
});

export default mongoose.models.Testimonials ||
  mongoose.model("Testimonials", testimonialsPageSchema);
