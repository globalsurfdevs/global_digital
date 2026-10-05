import connectDB from "@/lib/mongodb";
import { unstable_cache } from "next/cache";
import ServicePillar from "@/app/models/ServicePiller"; 
import ServiceIndustry from "@/app/models/ServiceIndustry"; 
import Industries from "@/app/models/Industries"; 
import SubService from "@/app/models/SubService"; 

export const getSubService = async (slug: string) => {
  return unstable_cache(
    async () => {
      await connectDB();

      const item = (await SubService.findOne({ slug })
        .populate("tenthSection.serviceIndustries", "image imageAlt title page")
        .lean()) as any;
  
     
      if (!item) return null;

      const industriesData = (await Industries.find().lean()) as any;

      const industries = industriesData.flatMap(
        (industry: any) => industry.items,
      );

      if (item.tenthSection?.serviceIndustries) {
        item.tenthSection.serviceIndustries =
          item.tenthSection.serviceIndustries.map((serviceIndustry: any) => {
            const industry = industries.find(
              (industry: any) =>
                industry._id.toString() === serviceIndustry.page?.toString(),
            );

            return {
              ...serviceIndustry,
              page: industry?.slug || null,
            };
          });
      }

        // console.log("service pillar:", item);

      return JSON.parse(JSON.stringify(item));
    },
    [`sub-service-${slug}`],
    {
      tags: ["sub-service"],
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
  ["sub-service"],
  {
    tags: ["sub-service"],
  },
);
