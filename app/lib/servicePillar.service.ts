import connectDB from "@/lib/mongodb";
import { unstable_cache } from "next/cache";
import ServicePillar from "../models/ServicePiller";

export const getServicePillar = unstable_cache(
  async (slug) => {
    await connectDB();
    const doc = await ServicePillar.findOne({ slug }).lean();

    if (!doc) return null;

    return JSON.parse(JSON.stringify(doc));
  },
  ["service-pillar"],
  {
    tags: ["service-pillar"],
  },
);
