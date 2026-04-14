"use server";

import connectDB from "@/lib/mongodb";
import Portfolio from "@/app/models/Portfolio";
import PortfolioHighlight from "@/app/models/PortfolioHighlight";
import mongoose from "mongoose";
import { unstable_cache } from "next/cache";
import '@/app/models/Category'
import '@/app/models/Channel'

// ✅ Get all case studies
export const getCaseStudies = unstable_cache(
  async () => {
    await connectDB();

    const caseStudy = await Portfolio.find({
      section: { $in: ["case study", "case study new"] },
    })
      .populate("categories")
      .populate("channels")
      .lean();

    return JSON.parse(JSON.stringify(caseStudy));
  },
  ["caseStudies"],
  {
    tags: ["caseStudies"],
    revalidate: 60,
  }
);