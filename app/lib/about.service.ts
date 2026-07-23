// lib/actions/getPortfolio.ts
import connectDB from "@/lib/mongodb";
import { unstable_cache } from "next/cache";
import About from "../models/About";

export const getAbout = unstable_cache(
  async () => {
    await connectDB();

    const about = await About.findOne({})
      .lean();

    return JSON.parse(JSON.stringify(about));
  },
  ["about"],
  {
    tags: ["about"],
    revalidate: 60, // same as your fetch
  }
);