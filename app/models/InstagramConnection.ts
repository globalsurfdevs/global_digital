import mongoose, { Schema } from "mongoose";

import { MODEL_NAMES } from "../const/model-name/modelName";

// Kept out of the Portfolio model on purpose: /api/portfolio returns whole
// portfolio documents to the public, so the access token must live elsewhere.
const InstagramConnectionSchema = new Schema(
  {
    portfolio: {
      type: Schema.Types.ObjectId,
      ref: MODEL_NAMES.PORTFOLIO,
      required: true,
      unique: true,
    },
    accessToken: { type: String, required: true },
    // Set for Facebook Login tokens (graph.facebook.com); empty for Instagram Login.
    igUserId: { type: String },
    // Ordered Instagram media IDs to display. Empty means "latest posts".
    selectedPostIds: { type: [String], default: [] },
    tokenExpiresAt: { type: Date },
    lastRefreshedAt: { type: Date },
    username: { type: String },
  },
  { timestamps: true },
);

// In dev, hot reload keeps the first compiled model alive, so a schema change
// is silently ignored and new fields are dropped on save. Recompile instead.
if (process.env.NODE_ENV !== "production" && mongoose.models.InstagramConnection) {
  mongoose.deleteModel("InstagramConnection");
}

export default mongoose.models.InstagramConnection ||
  mongoose.model("InstagramConnection", InstagramConnectionSchema);
