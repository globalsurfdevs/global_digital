import mongoose from "mongoose";

const PortfolioSchema = new mongoose.Schema({
    companyName: {
        type: String
    },
    industry: {
        type: String
    },
    country: {
        type: String
    },
    channelsUsed: [{
        type: String
    }],
    bannerImage: {
        type: String
    },
    story: {
        type: String
    },
    section2Image1: {
        type: String
    },
    section2Image2: {
        type: String
    },
    goals: {
        type: String
    },
    objectives: {
        type: String
    },
    section2BannerImage: {
        type: String
    },
    challenge: {
        type: String
    },
    solutions: {
        type: String
    },
    result: {
        type: String
    },
    resultImage1: {
        type: String
    },
    resultImage2: {
        type: String
    },
    categories: [{
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "category",
    },],
    tag: {
        type: String
    },
    description: {
        type: String
    },
    logo: {
        type: String
    },
    slug: {
        type: String
    },
    metaTitle: {
        type: String
    },
    metaDescription: {
        type: String
    },
    section: {
        type: String
    },
    customId: {
        type: String
    },
    index: {
        type: Number
    },
    websiteLink: {
        type: String
    },
    bannerTitle: {
        type: String
    },
    channels: [{
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "channel",
    }],
    video: {
        type: String
    },
    videoTitle: {
        type: String
    },
    strategyApproach: {
        type: String
    },
    socialMediaImages: []
});

export default mongoose.models.portfolio || mongoose.model("portfolio", PortfolioSchema);
