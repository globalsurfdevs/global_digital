"use client";

import React from "react";

import { useParams } from "next/navigation";
import { BlogData } from "../../data/BlogData";
import { motion } from "framer-motion";

import Image from "next/image";

const BlogDetails = () => {
  // const router = useRouter();
  const { companyId } = useParams();

  // Find the blog by ID
  const blog = BlogData.find((b) => b.id === parseInt(companyId as string, 10));

  if (!blog) {
    return <p>Loading...</p>; // Or show a "Not Found" message
  }

  return (
    <>
      <div className="container mx-auto py-4">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }} // Trigger animation once when 50% visible
          variants={{
            hidden: { opacity: 0, y: 50 }, // Start below and invisible
            visible: {
              opacity: 1,
              y: 0,
              transition: { duration: 1, ease: "easeOut" },
            }, // Slide up and fade in
          }}
        >
          <div className="flex  flex-col items-center gap-4 border-b pb-[50px] pt-[20px] sm:pt-[50px] lg:pt-[130px] xl:grid">
            <div className="h-full   w-full text-font80">
              <h1 className="title-65">{blog.list_heading}</h1>
            </div>
          </div>
        </motion.div>
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0 }} // Trigger animation once when 50% visible
          variants={{
            hidden: { opacity: 0, y: 50 }, // Start below and invisible
            visible: {
              opacity: 1,
              y: 0,
              transition: { duration: 1, ease: "easeOut" },
            }, // Slide up and fade in
          }}
        >
          <div className=" class-blogdetails-mn  pb-[50px] pt-[50px] lg:pb-[130px] lg:pt-[130px] ">
            <Image
              src={blog.feature_thumb}
              className="brd-50 w-100 mb-4 h-auto w-full rounded-[50px] object-cover lg:h-[600px] "
              alt={blog.title}
              width={1000}
              height={400}
            />

            <div
              className="mn-dv-blg"
              dangerouslySetInnerHTML={{ __html: blog.body }}
            ></div>
          </div>
        </motion.div>
      </div>
    </>
  );
};

export default BlogDetails;
