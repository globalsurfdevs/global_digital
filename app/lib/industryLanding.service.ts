import connectDB from "@/lib/mongodb";
import { unstable_cache } from "next/cache";
import IndustryLandingPage from "../models/IndustryLanding";
import Service from "../models/Service";
import '@/app/models/Portfolio'

export const getIndustryLandingPage = unstable_cache(
    async () => {
        await connectDB();

        const doc = await IndustryLandingPage.findOne({})
            .populate("caseStudySection.items.project", "companyName slug logo")
            .lean() as any;

        if (!doc) {
            return null;
        }

        // servicesSection.items.service points at subdocuments inside Service.items[],
        // not top-level Service documents, so populate() can't resolve it directly.
        // Resolve manually here instead.
        const serviceItems = doc.servicesSection?.items;
        if (serviceItems?.length) {
            const serviceIds = serviceItems
                .map((si: any) => si.service)
                .filter(Boolean);

            const serviceById = new Map<string, any>();

            if (serviceIds.length) {
                const resolved = await Service.aggregate([
                    { $unwind: "$items" },
                    { $match: { "items._id": { $in: serviceIds } } },
                    {
                        $project: {
                            _id: "$items._id",
                            name: "$items.name",
                            slug: "$items.slug",
                            image: "$items.image",
                            imageAlt: "$items.imageAlt",
                        },
                    },
                ]);

                for (const r of resolved) {
                    serviceById.set(String(r._id), r);
                }
            }

            doc.servicesSection.items = serviceItems.map((si: any) => ({
                ...si,
                service: si.service ? (serviceById.get(String(si.service)) ?? null) : null,
            }));
        }

        return JSON.parse(JSON.stringify(doc));
    },
    ["industry-landing"],
    {
        tags: ["industry-landing"],
        revalidate: 60,
    }
);