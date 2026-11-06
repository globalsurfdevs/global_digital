// Redirection centre
import { Metadata } from "next";
import { notFound } from "next/navigation";
import { resolveSlug } from "@/app/lib/routing/resolveSlug";
import { getTestimonials } from "@/app/lib/services/testimonials.service";
import { buildMetadata } from "@/app/lib/metadata/buildServiceMetadata";
import ServiceDetail from "@/app/components/ServicePages/ServiceDetails/ServiceDetail";
import SubService from "@/app/components/ServicePages/ServiceDetails/ServiceDetail";
import ServicePillarDetail from "@/app/components/ServicePages/ServicePillar/ServicePillar";
import { SubServiceData } from "./type";

interface PageProps {
  params: Promise<{ slug: string }>;
}

const noIndexSlugs = [
  // "b2b-seo-agency-dubai",
  // "ecommerce-seo-services-dubai",
];

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const resolved = await resolveSlug(slug);

  if (!resolved) {
    return {
      title: "Not Found",
      description: "",
      robots: {
        index: false,
        follow: false,
      },
      alternates: {
        canonical: "https://www.globalsurf.ae/",
      },
    };
  }

  return buildMetadata(resolved.data);
}

const Page = async ({ params }: PageProps) => {
  const { slug } = await params;
  const resolved = await resolveSlug(slug);

  if (!resolved) notFound();

  switch (resolved.type) {
    case "service":
      return <ServiceDetail service={resolved.data} slug={slug} />;
    case "service-pillar":
      return <ServicePillarDetail data={resolved.data} />;
    case "sub-service":
      return (
        <SubService service={resolved.data as SubServiceData} slug={slug} />
      );
  }
};

export default Page;


