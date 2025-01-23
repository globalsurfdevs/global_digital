"use client";

import React, { useEffect, useState } from "react";

import { notFound, useParams, useRouter } from "next/navigation";
import { motion } from "framer-motion";

import Image from "next/image";
import { BlogInputTypes } from "@/app/types/BlogInputs";
import parse from 'html-react-parser'
import { BlogData } from "@/app/data/BlogData";
import { formatLinkForBlog } from "@/app/helpers/formatLink";

const BlogDetails = () => {
  // const router = useRouter();
  const { heading } = useParams();
  const router = useRouter()

  console.log(heading)

  // Find the blog by ID
  // const blog = BlogData.find((b) => b.slug === (heading as string));

  type StaticBlogPost = {
    id: number;
    slug: string;
    titles: string;
    title: string;
    list_heading: string;
    meta_title: string;
    description: string;
    post_date: string;
    read_time: string;
    feature_thumb: string;
    thumb: string;
    large_thumb: string;
    category: string;
    format: string;
    views: string;
    excerpt: string;
    body: string[];
    features_img: string[];
    author_name: string;
    author_avatar: string;
    author_para: string;
    social: SocialLinks[];
  };
  
  type SocialLinks = {
    facebook?: string;
    twitter?: string;
    instagram?: string;
    linkedin?: string;
    vimeo?: string;
    pinterest?: string;
    dribbble?: string;
    behance?: string;
  };
  

  const [data, setData] = useState<BlogInputTypes[] | null>(null)
  const [staticBlog,setStaticBlog] = useState<StaticBlogPost | null>(null)
  const [loading,setLoading]  = useState(true)

  useEffect(() => {


    const blogFoundFromStatic = BlogData.find((item)=>item.slug == heading)

    console.log(blogFoundFromStatic)

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

    if(blogFoundFromStatic){
      console.log("from static")
      setStaticBlog(blogFoundFromStatic)
      setLoading(false)
    }else{
      console.log("dynamic")
      fetchBlogData()
    }
    


  }, [heading])



  if(loading){
    return null
  }

  else if (!staticBlog && !data || data?.length == 0) {
    router.push('/404')
     // Or show a "Not Found" message
  }
  else{
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
                <h1 className="title-65">{staticBlog ? staticBlog.list_heading : data ? data[0].heading : null}</h1>
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
                src={staticBlog ? staticBlog.feature_thumb : data ? data[0].thumbnail : ""}
                className="brd-50 w-100 mb-4 h-auto w-full rounded-[50px] object-cover lg:h-[600px] "
                alt={data && data[0].heading || ""}
                width={1000}
                height={400}
              />
  
              <div
                className="mn-dv-blg prose lg:prose-lg"
                // dangerouslySetInnerHTML={{ __html: data && data[0].content || "" }}
                
              >{staticBlog ? parse(staticBlog.body[0]) : parse(data && data[0].content || "")}</div>
            </div>
          </motion.div>
        </div>
      </>
    );
  }

 
};

export default BlogDetails;
