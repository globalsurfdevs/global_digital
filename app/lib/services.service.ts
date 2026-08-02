// lib/actions/getPortfolio.ts
import connectDB from "@/lib/mongodb";
import { unstable_cache } from "next/cache";
import Service from "../models/Service";
import '@/app/models/Portfolio'

export const getService = unstable_cache(
    async (slug) => {
        await connectDB();

        const doc = await Service.findOne(
            { "items.slug": slug },
            { "items.$": 1 }
        ).populate("items.caseStudySection.items.project", "companyName slug logo");

        const item = doc?.items?.[0];

        if (!item) {
            return null
        }

        return JSON.parse(JSON.stringify(item));
    },
    ["service"],
    {
        tags: ["service"],
        revalidate: 60, // same as your fetch
    }
);