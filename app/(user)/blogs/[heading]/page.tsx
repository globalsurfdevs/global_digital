// import BlogDetails from "@/app/components/Blog-details";
// import { BlogData } from "@/app/data/BlogData";
// import { Metadata } from "next";

// type Props = {
//   params: Promise<{ heading: string }>;
// };

// // ✅ META TAGS
// export async function generateMetadata({ params }: Props): Promise<Metadata> {
//   const { heading } = await params;

//   const blog = BlogData.find((b) => b.slug === heading);
//   const canonicalUrl = `https://www.globalsurf.ae/blogs/${heading}`;

//   if (!blog) {
//     return {
//       title: "Blog Not Found",
//     };
//   }

//   return {
//     title: blog.meta_title,
//     description: blog.description,
//     alternates: {
//       canonical: canonicalUrl,
//     },
//     openGraph: {
//       title: blog.meta_title,
//       description: blog.description,
//       images: [
//         `https://www.globalsurf.ae${blog.feature_thumb}`,
//       ],
//     },
//   };
// }

// // ✅ PAGE RENDER
// export default async function Page({ params }: Props) {
//   const { heading } = await params;

//   const blog = BlogData.find((b) => b.slug === heading);

//   if (!blog) return null;

//   const schema = {
//     "@context": "https://schema.org",
//     "@type": "Article",
//     mainEntityOfPage: {
//       "@type": "WebPage",
//       "@id": `https://www.globalsurf.ae/blogs/${blog.slug}`,
//     },
//     headline: blog.list_heading,
//     image: `https://www.globalsurf.ae${blog.feature_thumb}`,
//     author: {
//       "@type": "Organization",
//       name: "GS Digital",
//     },
//     publisher: {
//       "@type": "Organization",
//       name: "GS Digital",
//       logo: {
//         "@type": "ImageObject",
//         url: "https://www.globalsurf.ae/gs-digital-logo.svg",
//       },
//     },
//     datePublished: blog.post_date || "",
//     description: blog.description || "",
//   };

//   return (
//     <>
//       <script
//         type="application/ld+json"
//         dangerouslySetInnerHTML={{
//           __html: JSON.stringify(schema),
//         }}
//       />

//       <BlogDetails />
//     </>
//   );
// }



import { notFound } from "next/navigation";
import { Metadata } from "next";
import { getBlogBySlug } from "@/app/lib/blog.service";
import BlogDetails from "@/app/components/Blog-details";

type Props = {
  params: Promise<{ heading: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { heading } = await params;

  const dbBlog = await getBlogBySlug(heading);

  const title = dbBlog?.metaTitle ?? "Blog";
  const description = dbBlog?.metaDescription ?? "";
  const image = dbBlog?.thumbnail ?? "";
  const canonicalUrl = `https://www.globalsurf.ae/blogs/${heading}`;

  return {
    title,
    description,
    alternates: { canonical: canonicalUrl },
    robots: "index, follow",
    openGraph: {
      title,
      description,
      images: [
        image.startsWith("http") ? image : `https://www.globalsurf.ae${image}`,
      ],
    },
  };
}

export default async function Page({ params }: Props) {
  const { heading } = await params;

  const dbBlog = await getBlogBySlug(heading);

  if (!dbBlog) notFound();

  let schemaJson: string;

  if (dbBlog.schemaScript?.trim()) {
    // SEO team provided a custom schema — use it directly
    schemaJson = dbBlog.schemaScript.trim();
  } else {
    // Fallback: auto-generate a basic Article schema
    const fallback = {
      "@context": "https://schema.org",
      "@type": "Article",
      mainEntityOfPage: {
        "@type": "WebPage",
        "@id": `https://www.globalsurf.ae/blogs/${heading}`,
      },
      headline: dbBlog.heading ?? "",
      image: dbBlog.thumbnail ?? "",
      author: { "@type": "Organization", name: "GS Digital" },
      publisher: {
        "@type": "Organization",
        name: "GS Digital",
        logo: {
          "@type": "ImageObject",
          url: "https://www.globalsurf.ae/gs-digital-logo.svg",
        },
      },
      datePublished: dbBlog.publishedAt ?? "",
      description: dbBlog.metaDescription ?? "",
    };
    schemaJson = JSON.stringify(fallback);
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: schemaJson }}
      />
      <BlogDetails dbBlog={dbBlog} />
    </>
  );
}
