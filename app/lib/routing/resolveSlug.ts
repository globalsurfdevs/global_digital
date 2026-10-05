// lib/resolveSlug.ts
import { getService } from "@/app/lib/services/services.service";
import { getServicePillar } from "@/app/lib/services/servicePillar.service";
import { ServiceItem } from "@/app/(user)/[slug]/type";
import { ServicePillarData } from "@/app/components/ServicePillar/type";
// import NotFound from "../not-found";
import { SubServiceData } from "@/app/(user)/[slug]/type"; // Import SubServiceData
import { getSubService } from "@/app/lib/services/subService.service"; // Import getSubService

export type ResolvedSlug =
  | { type: "service"; data: ServiceItem }
  | { type: "service-pillar"; data: ServicePillarData }
  | { type: "sub-service"; data: SubServiceData };

export async function resolveSlug(slug: string): Promise<ResolvedSlug | null> {
  const [service, servicePillar, subService] = await Promise.all([
    getService(slug),
    getServicePillar(slug),
    getSubService(slug),
  ]);
  if (servicePillar) return { type: "service-pillar", data: servicePillar };
  if (service) return { type: "service", data: service };
  if (subService) return { type: "sub-service", data: subService };
  return null;
}
