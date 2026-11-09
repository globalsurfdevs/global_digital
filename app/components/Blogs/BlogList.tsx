"use client";

import { formatLinkForBlog } from "@/app/helpers/formatLink";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";

const PortfolioList = ({
  BlogData,
  dbBlogs,
}: {
  BlogData: any[];
  dbBlogs: any[];
}) => {
  const stripHtml = (html: string = ""): string => {
    return html
      .replace(/<br\s*\/?>/gi, " ")
      .replace(/<[^>]*>/g, " ")
      .replace(/&nbsp;/gi, " ")
      .replace(/&amp;/gi, "&")
      .replace(/&quot;/gi, '"')
      .replace(/&#39;|&apos;/gi, "'")
      .replace(/&lt;/gi, "<")
      .replace(/&gt;/gi, ">")
      .replace(/\s+/g, " ")
      .trim();
  };

  const allBlogs = [
    ...dbBlogs
      .filter((b: any) => !b.isHidden)
      .map((b: any) => ({
        id: b._id,
        feature_thumb: b.thumbnail,
        category: b.category ?? "",
        list_heading: stripHtml(b.heading),
        slug: b.slug,
      })),

    // ...[...BlogData].sort((a, b) => b.id - a.id).map((b: any) => ({ ...b })),
    // ...BlogData,
  ];

  return (
    <>
      <div className="container mx-auto py-4">
        <motion.div
        // initial="hidden"
        // whileInView="visible"
        // viewport={{ once: true, amount: 0.1 }}
        // variants={{
        //   hidden: { opacity: 0, y: 50 },
        //   visible: {
        //     opacity: 1,
        //     y: 0,
        //     transition: { duration: 1.3, ease: "easeOut" },
        //   },
        // }}
        >
          <div className="portfolio pb-[50px] pt-[60px]">
            <div className="flex flex-col items-center gap-8 lg:grid lg:grid-cols-2 lg:gap-8 lg:gap-y-12">
              {allBlogs.map((item, index) => (
                <motion.div
                  key={item.id}
                  className="h-full w-full"
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, amount: 0.1 }}
                  variants={{
                    hidden: { opacity: 0, y: 30 },
                    visible: {
                      opacity: 1,
                      y: 0,
                      transition: {
                        duration: 0.6,
                        ease: "easeOut",
                        // stagger by column so a row animates together, not randomly
                        delay: (index % 2) * 0.1,
                      },
                    },
                  }}
                >
                  <div className="portfolio-card group relative flex h-full flex-col">
                    <div className="card-img relative aspect-[16/10] w-full overflow-hidden rounded-md">
                      <Image
                        src={item.feature_thumb}
                        alt={item.list_heading}
                        className="h-full w-full object-cover"
                        fill
                        sizes="(min-width: 1024px) 50vw, 100vw"
                      />
                      <div className="absolute left-3 top-3 cursor-pointer rounded-3xl bg-gray1 px-4 py-2 duration-300 ease-in-out group-hover:z-[1] group-hover:translate-x-[3px] group-hover:bg-primary group-hover:shadow-lg md:left-5 md:top-5">
                        <p className="text-font14 uppercase text-white">
                          {item.category}
                        </p>
                      </div>
                    </div>

                    <div className="mt-3 md:mt-4">
                      <h3 className="text-30 mb-1 line-clamp-3 duration-200 ease-in-out group-hover:text-primary md:mb-2">
                        {item.list_heading}
                      </h3>
                    </div>

                    <Link
                      href={`/blogs/${formatLinkForBlog(item.slug)}`}
                      className="absolute inset-0 z-[1]"
                    />
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </>
  );
};

export default PortfolioList;
