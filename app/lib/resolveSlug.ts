// lib/resolveSlug.ts
import { getService } from "@/app/lib/services.service";
import { getServicePillar } from "@/app/lib/servicePillar.service";
import { ServiceItem } from "@/app/(user)/[slug]/type";
import { ServicePillarData } from "../(user)/service-pillar/[slug]/page";  // wherever it lives
import NotFound from "../not-found";
import { SubServiceData } from "../(user)/[slug]/type"; // Import SubServiceData
import { getSubService } from "./subService.service";

export type ResolvedSlug =
  | { type: "service"; data: ServiceItem }
  | { type: "service-pillar"; data: ServicePillarData }
  | { type: "sub-service"; data: SubServiceData }

export async function resolveSlug(slug: string): Promise<ResolvedSlug|null> {
  const [service, servicePillar,subService] = await Promise.all([
    getService(slug),
    getServicePillar(slug),
    getSubService(slug),  
  ]);
  if (servicePillar) return { type: "service-pillar", data: servicePillar };
  if (service) return { type: "service", data: service };
  if (subService) return { type: "sub-service", data: subService };
  return null;
}