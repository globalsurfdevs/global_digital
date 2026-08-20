import connectDB from "@/lib/mongodb";
import { unstable_cache } from "next/cache";
import Industry from "../models/Industry";
import Industries from "../models/Industries";

export const getIndustry = unstable_cache(
  async (slug) => {
    await connectDB();

    const doc = await Industries.findOne(
      { "items.slug": slug },
      { "items.$": 1 },
    );

    const item = doc?.items?.[0];

    if (!item) {
      return null;
    }

    return JSON.parse(JSON.stringify(item));
  },
  ["industry"],
  {
    tags: ["industry"],
  },
);

export const getAllIndustry = unstable_cache(
  async () => {
    await connectDB();

    const doc = await Industries.findOne({});

    const item = doc?.items;

    if (!item) {
      return null;
    }

    return JSON.parse(JSON.stringify(item));
  },
  ["industry"],
  {
    tags: ["industry"],
  },
);
