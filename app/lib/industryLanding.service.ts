import connectDB from "@/lib/mongodb";
import { unstable_cache } from "next/cache";
import IndustryLandingPage from "../models/IndustryLanding";
import Service from "../models/Service";
import "@/app/models/Portfolio";
import ServicePillar from "../models/ServicePiller";

export const getIndustryLandingPage = unstable_cache(
  async () => {
    await connectDB();

    const doc = (await IndustryLandingPage.findOne({})
      .populate("caseStudySection.items.project", "companyName slug logo")
      .lean()) as any;

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
        const resolved = await ServicePillar.find(
          {
            _id: { $in: serviceIds },
          },
          {
            name: 1,
            slug: 1,
            icon: 1,
          },
        ).lean();

        for (const service of resolved) {
          serviceById.set(String(service._id), service);
        }
      }

      doc.servicesSection.items = serviceItems.map((si: any) => {
        const service = si.service ? serviceById.get(String(si.service)) : null;

        return {
          ...si,

          // Keep the original service ID if you need it
          service: service
            ? {
                _id: service._id,
                name: service.name,
                slug: service.slug,
                icon: service.icon,
              }
            : null,
        };
      });
    }
    return JSON.parse(JSON.stringify(doc));
  },
  ["industry-landing"],
  {
    tags: ["industry-landing"],
    revalidate: 60,
  },
);
