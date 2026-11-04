import CaseStudyDetails from "@/app/components/CaseStudy-details";
import { Metadata } from "next";
type Data = {
  caseStudy: {
    metaTitle: string;
    metaDescription: string;
  };
};
import { getCaseStudyOrPortfolio } from "@/app/actions/getCaseStudy";
import { getInstagramFeed } from "@/app/lib/integrations/instagram/getInstagramFeed";




export async function generateMetadata(props: {
  params: Promise<{ companyName: string }>;
}): Promise<Metadata> {
  const { companyName } = await props.params;

  const data = await getCaseStudyOrPortfolio(companyName, "case study");

  const metadataTitle =
    !data?.caseStudy?.metaTitle || data.caseStudy.metaTitle === "null"
      ? "Global Surf Digital"
      : data.caseStudy.metaTitle;

  const metadataDescription =
    !data?.caseStudy?.metaDescription ||
    data.caseStudy.metaDescription === "null"
      ? "Global Surf Digital"
      : data.caseStudy.metaDescription;

  const canonicalUrl = `https://www.globalsurf.ae/case-study/${companyName}`;

  return {
    title: metadataTitle,
    description: metadataDescription,
    alternates: {
      canonical: canonicalUrl,
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

  // Fetched on the server so the Instagram feed is in the first HTML (no flash
  // of the uploaded images). Empty when Instagram isn't connected.
  const instagramPosts = data.portfolio?._id
    ? await getInstagramFeed(String(data.portfolio._id))
    : [];

  return <CaseStudyDetails data={data} instagramPosts={instagramPosts} />;
};

export default page;
