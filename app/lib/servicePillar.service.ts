import connectDB from "@/lib/mongodb";
import { unstable_cache } from "next/cache";
import ServicePillar from "../models/ServicePiller";
import ServiceIndustry from "../models/ServiceIndustry";
import Industry from "../models/Industry";

export const getServicePillar = async (slug: string) => {
  return unstable_cache(
    async () => {
      await connectDB();

      const item = (await ServicePillar.findOne({ slug })
        .populate(
          "ninthSection.serviceIndustries",
          "image imageAlt title page",
        )
        .lean()) as any;

      if (!item) {
        return null;
      }

      const serviceIndustries = item.ninthSection?.serviceIndustries;
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

        item.ninthSection.serviceIndustries = serviceIndustries.map(
          (si: any) => ({
            image: si.image,
            imageAlt: si.imageAlt,
            title: si.title,
            page: si.page ? (slugById.get(String(si.page)) ?? null) : null,
          }),
        );
      }

      return JSON.parse(JSON.stringify(item));
    },
    [`service-pillar-${slug}`],
    {
      tags: ["service-pillar"],
    },
  )();
};

export const getIndustriesData = unstable_cache(
  async () => {
    await connectDB();
    const doc = await ServiceIndustry.find().sort({ createdAt: -1 });

    if (!doc) return null;

    return JSON.parse(JSON.stringify(doc));
  },
  ["service-pillar"],
  {
    tags: ["service-pillar"],
  },
);