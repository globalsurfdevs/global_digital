import type { Metadata } from "next";
import { notFound } from "next/navigation";
import CaseStudyDetails from "@/app/components/CaseStudy-details";
import { getCaseStudyOrPortfolio } from "@/app/actions/getCaseStudy";
import { getInstagramFeed } from "@/app/lib/integrations/instagram/getInstagramFeed";

// /case-study/<slug>/<variant>: the same page as /case-study/<slug>, with the
// Social Media section reading the client's live Instagram posts. The address
// without a suffix is untouched and keeps showing the uploaded images.
//
//   v2: posts inside the usual padded grey frame
//   v3: posts edge to edge, without the padding
const VARIANTS = ["v2", "v3"];

export async function generateMetadata(props: {
  params: Promise<{ companyName: string; variant: string }>;
}): Promise<Metadata> {
  const { companyName, variant } = await props.params;
  // A second copy of the page must not compete with the original in search.
  const robots = { index: false, follow: false };
  if (!VARIANTS.includes(variant)) return { robots };

  const data = await getCaseStudyOrPortfolio(companyName, "case study");
  const title = data?.caseStudy?.metaTitle;

  return {
    title: title && title !== "null" ? title : "Global Surf Digital",
    robots,
    alternates: {
      canonical: `https://www.globalsurf.ae/case-study/${companyName}`,
    },
  };
}

const page = async ({
  params,
}: {
  params: Promise<{ companyName: string; variant: string }>;
}) => {
  const { companyName, variant } = await params;
  if (!VARIANTS.includes(variant)) notFound();

  const data = await getCaseStudyOrPortfolio(companyName, "case study");

  if (!data) {
    return <div>Case study not found</div>;
  }

  // Fetched on the server, so the feed is in the first HTML. Empty when
  // Instagram isn't connected, in which case the uploaded images are shown.
  const instagramPosts = data.portfolio?._id
    ? await getInstagramFeed(String(data.portfolio._id))
    : [];

  return (
    <CaseStudyDetails
      data={data}
      instagramPosts={instagramPosts}
      instagramFlush={variant === "v3"}
    />
  );
};

export default page;
