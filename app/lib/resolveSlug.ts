// lib/resolveSlug.ts
import { getService } from "@/app/lib/services.service";
import { getServicePillar } from "@/app/lib/servicePillar.service";
import { ServiceItem } from "@/app/(user)/[slug]/type";
import { ServicePillarData } from "../(user)/service-pillar/[slug]/page";  // wherever it lives

export type ResolvedSlug =
  | { type: "service"; data: ServiceItem }
  | { type: "service-pillar"; data: ServicePillarData };

export async function resolveSlug(slug: string): Promise<ResolvedSlug | null> {
  const [service, servicePillar] = await Promise.all([
    getService(slug),
    getServicePillar(slug),
  ]);

  if (service) return { type: "service", data: service };
  if (servicePillar) return { type: "service-pillar", data: servicePillar };
  return null;
}