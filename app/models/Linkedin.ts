// app/models/LinkedinSubmission.ts
import mongoose from "mongoose";

const LinkedinSubmissionSchema = new mongoose.Schema(
  {
    linkedinUrl: {
      type: String,
      required: true,
    },
    agreed: {
      type: Boolean,
      required: true,
      default: false,
    },
  },
  { timestamps: true }, // adds createdAt / updatedAt automatically
);

export default mongoose.models?.linkedinSubmission ||
  mongoose.model("linkedinSubmission", LinkedinSubmissionSchema);
