import type { Metadata } from "next";
import CaseStudyDetails from "@/app/components/CaseStudy-details";
import { getCaseStudyOrPortfolio } from "@/app/actions/getCaseStudy";
import { getInstagramFeed } from "@/app/lib/integrations/instagram/getInstagramFeed";

// /case-study/<slug>/v2: the same page as /case-study/<slug>, with the Social
// Media section reading the client's live Instagram posts. The address without
// /v2 is untouched and keeps showing the uploaded images.

export async function generateMetadata(props: {
  params: Promise<{ companyName: string }>;
}): Promise<Metadata> {
  const { companyName } = await props.params;
  const data = await getCaseStudyOrPortfolio(companyName, "case study");
  const title = data?.caseStudy?.metaTitle;

  return {
    title: title && title !== "null" ? title : "Global Surf Digital",
    // A second copy of the page must not compete with the original in search.
    robots: { index: false, follow: false },
    alternates: {
      canonical: `https://www.globalsurf.ae/case-study/${companyName}`,
    },
  };
}

const page = async ({
  params,
}: {
  params: Promise<{ companyName: string }>;
}) => {
  const data = await getCaseStudyOrPortfolio(
    (await params).companyName,
    "case study",
  );

  if (!data) {
    return <div>Case study not found</div>;
  }

  // Fetched on the server, so the feed is in the first HTML. Empty when
  // Instagram isn't connected, in which case the uploaded images are shown.
  const instagramPosts = data.portfolio?._id
    ? await getInstagramFeed(String(data.portfolio._id))
    : [];

  return <CaseStudyDetails data={data} instagramPosts={instagramPosts} />;
};

export default page;
