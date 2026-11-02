import CaseStudyDetails from "@/app/components/CaseStudy-details";
import { Metadata } from "next";
type Data = {
  caseStudy: {
    metaTitle: string;
    metaDescription: string;
  };
};
import { getCaseStudyOrPortfolio } from "@/app/actions/getCaseStudy";




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

  return <CaseStudyDetails data={data} />;
};

export default page;
