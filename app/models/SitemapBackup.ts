import mongoose, { Document, Model, Schema } from "mongoose";

export interface ISitemapBackup extends Document {
  content: string;
  fileName: string;
  urlCount: number;
  priorityCount: number;
  createdAt: Date;
  updatedAt: Date;
}

const SitemapBackupSchema = new Schema<ISitemapBackup>(
  {
    content: { type: String, required: true },
    fileName: { type: String, required: true, default: "sitemap.xml" },
    urlCount: { type: Number, required: true, default: 0 },
    priorityCount: { type: Number, required: true, default: 0 },
  },
  { timestamps: true },
);

const SitemapBackup: Model<ISitemapBackup> =
  mongoose.models.SitemapBackup ||
  mongoose.model<ISitemapBackup>("SitemapBackup", SitemapBackupSchema);

export default SitemapBackup;
