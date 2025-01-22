"use client";

import React, { useEffect, useState } from "react";

import { notFound, useParams, useRouter } from "next/navigation";
import { motion } from "framer-motion";

import Image from "next/image";
import { BlogInputTypes } from "@/app/types/BlogInputs";
import parse from 'html-react-parser'

const BlogDetails = () => {
  // const router = useRouter();
  const { heading } = useParams();
  const router = useRouter()

  console.log(heading)

  // Find the blog by ID
  // const blog = BlogData.find((b) => b.slug === (heading as string));

  const [data, setData] = useState<BlogInputTypes[] | null>(null)
  const [loading,setLoading]  = useState(true)

  useEffect(() => {

    const fetchBlogData = async () => {
      console.log(heading)
      const response = await fetch(`/api/blogs?slug=${heading}`);
      if (response.ok) {
        const data = await response.json();
        console.log(data)
        setData(data.blogs)
        setLoading(false)
      }
    }

    fetchBlogData()


  }, [heading])


  if(loading){
    return null
  }

  else if (!data || data.length == 0) {
    router.push('/404')
     // Or show a "Not Found" message
  }else{
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
                <h1 className="title-65">{data && data[0].heading}</h1>
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
                src={data && data[0].thumbnail || ""}
                className="brd-50 w-100 mb-4 h-auto w-full rounded-[50px] object-cover lg:h-[600px] "
                alt={data && data[0].heading || ""}
                width={1000}
                height={400}
              />
  
              <div
                className="mn-dv-blg prose lg:prose-lg"
                // dangerouslySetInnerHTML={{ __html: data && data[0].content || "" }}
                
              >{parse(data[0].content || "")}</div>
            </div>
          </motion.div>
        </div>
      </>
    );
  }

 
};

export default BlogDetails;
