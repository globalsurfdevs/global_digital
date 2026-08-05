import connectDB from "@/lib/mongodb";
import { unstable_cache } from "next/cache";
import Service from "../models/Service";
import '@/app/models/Portfolio'
import '@/app/models/ServiceIndustry'

export const getService = unstable_cache(
    async (slug) => {
        await connectDB();

        const doc = await Service.findOne(
            { "items.slug": slug },
            { "items.$": 1 }
        )
            .populate("items.caseStudySection.items.project", "companyName slug logo")
            .populate("items.tenthSection.serviceIndustries", "image imageAlt title");

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