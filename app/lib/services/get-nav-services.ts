import { unstable_cache } from "next/cache";
import connectDB from "@/lib/mongodb";
import Service from "@/app/models/Service";
import ServicePillar from "@/app/models/ServicePiller";
import { staticHeaderNavigation } from "@/app/data/header-navigation-static";

export type HeaderNavigationService = {
  id: string;
  title: string;
  slug: string;
  url: string;
  text: string;
};

export type HeaderNavigationPillar = {
  id: string;
  title: string;
  slug: string;
  url: string;
  categoryText: string;
  services: HeaderNavigationService[];
};

export const getNavServices = unstable_cache(
  async (): Promise<HeaderNavigationPillar[]> => {
    if (process.env.HEADER_NAV_SOURCE === "static") {
      return staticHeaderNavigation;
    }

    await connectDB();

    const [pillars, serviceDocument] = await Promise.all([
      ServicePillar.find({}, { name: 1, slug: 1, firstSection: 1 })
        .sort({ createdAt: 1 })
        .lean(),
      Service.findOne({}, { items: 1 }).lean(),
    ]);

    const services = ((serviceDocument as any)?.items ?? []) as any[];
    const servicesByPillar = new Map<string, typeof services>();

    for (const service of services) {
      if (!service.servicePillarId) continue;

      const pillarId = String(service.servicePillarId);
      const pillarServices = servicesByPillar.get(pillarId) ?? [];
      pillarServices.push(service);
      servicesByPillar.set(pillarId, pillarServices);
    }

    const databaseNavigation = pillars
      .map((pillar) => ({
        id: String(pillar._id),
        title: pillar.name,
        slug: pillar.slug,
        url: `/${pillar.slug}`,
        categoryText:
          pillar.firstSection?.title || pillar.firstSection?.description || "",
        services: (servicesByPillar.get(String(pillar._id)) ?? []).map(
          (service) => ({
            id: String(service._id),
            title: service.name,
            slug: service.slug,
            url: `/${service.slug}`,
            text:
              service.firstSection?.title ||
              service.firstSection?.description ||
              "",
          }),
        ),
      }))
      .sort((firstPillar, secondPillar) => {
        return secondPillar.services.length - firstPillar.services.length;
      });

    // const databaseNavigationIsComplete =
    //   databaseNavigation.length > 0 &&
    //   databaseNavigation.every((pillar) => pillar.services.length > 0);

    // return databaseNavigationIsComplete
    //   ? databaseNavigation
    //   : staticHeaderNavigation;
    return  staticHeaderNavigation;
  },
  ["header-navigation-services"],
  {
    revalidate: 300,
    tags: ["header-navigation-services"],
  },
);
