import CaseStudyDetails from '@/app/components/CaseStudy-details'

type Data = {
  caseStudy: {
    metaTitle: string;
    metaDescription: string;
  }
}

// export async function generateMetadata(
//   props: {
//     params: Promise<{
//       companyName: string
//     }>
//   }
// ): Promise<Metadata> {
//   const params = await props.params;
//   const slug = formatLinkForCaseStudy(params.companyName)

//   const data: Data = await apiService.get(`/api/case-study?slug=${slug}`)

//   const metadataTitle = data.caseStudy.metaTitle == "null" || !data.caseStudy.metaTitle ? "Global Surf Digital" : data.caseStudy.metaTitle;
//   const metadataDescription = data.caseStudy.metaDescription == "null" || !data.caseStudy.metaDescription ? "Global Surf Digital" : data.caseStudy.metaDescription;
//   const canonicalUrl = `https://www.globalsurf.ae/case-study/${slug}`

//   return {
//     title: metadataTitle,
//     description: metadataDescription,
//     alternates: {
//       canonical: canonicalUrl,
//     },
//   };
// }

const page = async ({ params }: { params: Promise<{ companyName: string }> }) => {
  const companyName = (await params).companyName;
  const response = await fetch(
    `${process.env.BASE_URL}/api/case-study?slug=${companyName}`,
    { next: { revalidate: 60 } }
  );

  console.log(process.env.BASE_URL);


  const data = await response.json();
  console.log(data)
  return (
    <>
      <CaseStudyDetails data={data} />
    </>
  )
}

export default page