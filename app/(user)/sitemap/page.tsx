import SitemapList  from "@/app/components/Sitemap/SitemapList";
interface Canonicals {
  canonical: string;
}

type Metadata = {
  title: string;
  description: string;
  alternates: Canonicals;
  robots: string;
};

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: "Sitemap | Global Surf",
    description:
      "Welcome to Global Surf. Click here to visit our website's sitemap! Learn more about our Web Development and Digital Marketing Solutions.",
    alternates: {
      canonical: "https://www.globalsurf.ae/sitemap",
    },
    robots: "index, follow",
  };
}
export default function Page() {
  return (
    <>
      <SitemapList />
    </>
  );
}