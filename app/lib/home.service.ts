// lib/actions/getPortfolio.ts
import connectDB from "@/lib/mongodb";
import { unstable_cache } from "next/cache";
import Home from "../models/Home";

export const getHome = unstable_cache(
  async () => {
    await connectDB();

    const home = await Home.findOne({})
      .lean();

    return JSON.parse(JSON.stringify(home));
  },
  ["home"],
  {
    tags: ["home"],
    revalidate: 60, // same as your fetch
  }
);