import connectDB from "@/lib/mongodb";
import { unstable_cache } from "next/cache";
import Service from "../models/Service";
import Industry from "@/app/models/Industries";
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
            .populate("items.tenthSection.serviceIndustries", "image imageAlt title page")
            .lean() as any;

        const item = doc?.items?.[0];

        if (!item) {
            return null;
        }

        // `page` on ServiceIndustry only stores the industry item's ObjectId
        // (single source of truth lives in Industry_new). Resolve slugs here
        // at read time so they can never drift out of sync.
        const serviceIndustries = item.tenthSection?.serviceIndustries;
        if (serviceIndustries?.length) {
            const pageIds = serviceIndustries
                .map((si: any) => si.page)
                .filter(Boolean);

            const slugById = new Map<string, string>();

            if (pageIds.length) {
                const resolved = await Industry.aggregate([
                    { $unwind: "$items" },
                    { $match: { "items._id": { $in: pageIds } } },
                    { $project: { _id: "$items._id", slug: "$items.slug" } },
                ]);

                for (const r of resolved) {
                    slugById.set(String(r._id), r.slug);
                }
            }

            item.tenthSection.serviceIndustries = serviceIndustries.map((si: any) => ({
                image: si.image,
                imageAlt: si.imageAlt,
                title: si.title,
                page: si.page ? (slugById.get(String(si.page)) ?? null) : null,
            }));
        }

        return JSON.parse(JSON.stringify(item));
    },
    ["service"],
    {
        tags: ["service"],
        revalidate: 60, // same as your fetch
    }
);