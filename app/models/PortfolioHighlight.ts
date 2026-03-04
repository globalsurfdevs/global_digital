import mongoose from "mongoose";

const PortfolioHighlightsSchema = new mongoose.Schema({
    createdAt: {
        type: Date,
        default: Date.now()
    },
    number: {
        type: String
    },
    text: {
        type: String
    },
    companyId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'portfolio'
    },
    customId: {
        type: String
    },
    showInHome: {
        type: Boolean
    }
});

export default mongoose.models?.portfoliohighlight || mongoose.model("portfoliohighlight", PortfolioHighlightsSchema);
