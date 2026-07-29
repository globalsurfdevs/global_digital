// app/models/Sitemap.ts
import mongoose, { Schema, Document, Model } from 'mongoose';

export interface ISitemap extends Document {
    content: string;
    createdAt: Date;
    updatedAt: Date;
}

const SitemapSchema = new Schema<ISitemap>(
    {
        content: { type: String, required: true },
    },
    { timestamps: true }
);

const Sitemap: Model<ISitemap> =
    mongoose.models.Sitemap || mongoose.model<ISitemap>('Sitemap', SitemapSchema);

export default Sitemap;