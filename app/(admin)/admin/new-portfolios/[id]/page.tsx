import NewPortfolioEditor from "@/app/components/AdminNewPortfolio/NewPortfolioEditor";

export default async function EditNewPortfolioPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  return <NewPortfolioEditor id={id} />;
}
