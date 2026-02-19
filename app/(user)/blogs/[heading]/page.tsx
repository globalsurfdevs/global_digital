import BlogDetails from "@/app/components/Blog-details";
import { BlogData } from "@/app/data/BlogData";
import { Metadata } from "next";

type Props = {
  params: Promise<{ heading: string }>;
};

// ✅ META TAGS
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { heading } = await params;

  const blog = BlogData.find((b) => b.slug === heading);
  const canonicalUrl = `https://www.globalsurf.ae/blogs/${heading}`;

  if (!blog) {
    return {
      title: "Blog Not Found",
    };
  }

  return {
    title: blog.meta_title,
    description: blog.description,
    alternates: {
      canonical: canonicalUrl,
    },
    openGraph: {
      title: blog.meta_title,
      description: blog.description,
      images: [
        `https://www.globalsurf.ae${blog.feature_thumb}`,
      ],
    },
  };
}

// ✅ PAGE RENDER
export default async function Page({ params }: Props) {
  const { heading } = await params;

  const blog = BlogData.find((b) => b.slug === heading);

  if (!blog) return null;

  const schema = {
    "@context": "https://schema.org",
    "@type": "Article",
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `https://www.globalsurf.ae/blogs/${blog.slug}`,
    },
    headline: blog.list_heading,
    image: `https://www.globalsurf.ae${blog.feature_thumb}`,
    author: {
      "@type": "Organization",
      name: "Global Surf Digital",
    },
    publisher: {
      "@type": "Organization",
      name: "Global Surf Digital",
      logo: {
        "@type": "ImageObject",
        url: "https://www.globalsurf.ae/gs-digital-logo.svg",
      },
    },
    datePublished: blog.post_date || "",
    description: blog.description || "",
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(schema),
        }}
      />

      <BlogDetails />
    </>
  );
}
