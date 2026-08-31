import connectDB from "@/lib/mongodb";
import { unstable_cache } from "next/cache";
import ServicePillar from "../models/ServicePiller";
import ServiceIndustry from "../models/ServiceIndustry";
import Industries from "../models/Industries";


export const getServicePillar = async (slug: string) => {
  return unstable_cache(
    async () => {
      await connectDB();

      const item = await ServicePillar.findOne({ slug })
        .populate(
          "ninthSection.serviceIndustries",
          "image imageAlt title page"
        )
        .lean() as any;

      if (!item) return null;

   
      const industriesData = await Industries.find().lean() as any;

    
      const industries = industriesData.flatMap((industry:any) => industry.items);

     
      if (item.ninthSection?.serviceIndustries) {
        item.ninthSection.serviceIndustries =
          item.ninthSection.serviceIndustries.map((serviceIndustry: any) => {
            const industry = industries.find(
              (industry: any) =>
                industry._id.toString() === serviceIndustry.page?.toString()
            );

            return {
              ...serviceIndustry,
              page: industry?.slug || null,
            };
          });
      }

    //   console.log("service pillar:", item);

      return JSON.parse(JSON.stringify(item));
    },
    [`service-pillar-${slug}`],
    {
      tags: ["service-pillar"],
    }
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