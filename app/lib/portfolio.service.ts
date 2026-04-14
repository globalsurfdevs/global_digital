// lib/actions/getPortfolio.ts
import connectDB from "@/lib/mongodb";
import Portfolio from "@/app/models/Portfolio";
import { unstable_cache } from "next/cache";
import '@/app/models/Category'
import '@/app/models/Channel'

export const getPortfolio = unstable_cache(
  async () => {
    await connectDB();

    const portfolio = await Portfolio.find({})
      .sort({ index: "ascending" })
      .populate("categories")
      .populate("channels")
      .lean();

    return JSON.parse(JSON.stringify(portfolio));
  },
  ["portfolio"],
  {
    tags: ["portfolio"],
    revalidate: 60, // same as your fetch
  }
);