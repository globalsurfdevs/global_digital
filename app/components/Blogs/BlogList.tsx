"use client";

import { formatLinkForBlog } from "@/app/helpers/formatLink";
import { BlogInputTypes } from "@/app/types/BlogInputs";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { BlogData } from "@/app/data/BlogData";



  const PortfolioList = ({ BlogData }: { BlogData: any[] }) => {

          const [data, setData] = useState< BlogInputTypes[] | null>(null)
      
          useEffect(() => {
              
              const fetchBlogData = async () => {
                  const response = await fetch(`/api/blogs`);
                  console.log(response)
                  if (response.ok) {
                      const data = await response.json();
                      console.log(data)
                      setData(data.blog)
                  }
              }
      
              fetchBlogData()
      
          }, [])
          
  return (
    <>
      <div className="container mx-auto py-4">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          variants={{
            hidden: { opacity: 0, y: 50 },
            visible: {
              opacity: 1,
              y: 0,
              transition: { duration: 1.3, ease: "easeOut" },
            },
          }}
        >
          <div className="portfolio pb-[50px] pt-[50px] lg:pb-[130px] lg:pt-[130px] ">
            <div className="flex flex-col items-center gap-8  lg:grid  lg:grid-cols-2 lg:gap-8 lg:gap-y-12 ">


            {BlogData.map((item)=>(
                <motion.div
                key={item.id}
                className="w-full"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.1 }}
                variants={{
                  hidden: { opacity: 0, y: 50 },
                  visible: {
                    opacity: 1,
                    y: 0,
                    transition: { duration: 1.3, ease: "easeOut" },
                  },
                }}
              >
                <div className="portfolio-card group relative col-span-1">
                  <div className="card-img relative h-[300px] overflow-hidden rounded-md md:h-[500px]">
                    <Image
                      src={ item.feature_thumb }
                      alt="image"
                      className="h-full w-full object-cover"
                      fill
                    />
                    <div className="absolute left-3 top-3 cursor-pointer rounded-3xl bg-gray1 px-4 py-2 duration-200 duration-300 ease-in-out ease-in-out   group-hover:z-[1] group-hover:-translate-x-[-3px] group-hover:bg-primary  group-hover:shadow-lg  md:left-5 md:top-5">
                      <div className="uppercase text-white">
                        <p className="text-font14 text-white">{item.category}</p>
                      </div>
                    </div>
                  </div>
                  <div className="mt-3 md:mt-4">
                    <h3 className="text-30 mb-1 duration-200 ease-in-out group-hover:text-primary md:mb-2">
                      {item.list_heading}
                    </h3>
                    {/* <p className="text-19 text-gray1">{Blog.list_heading}</p> */}
                  </div>
                  <Link href={`/blogs/${formatLinkForBlog(item.slug)}`}
                className="absolute top-0 z-[1] h-full w-full"
              ></Link>
                </div>
              </motion.div>
              ))}

              
            {data && data.map((item,index)=>(
                <motion.div
                key={index}
                className="w-full"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.1 }}
                variants={{
                  hidden: { opacity: 0, y: 50 },
                  visible: {
                    opacity: 1,
                    y: 0,
                    transition: { duration: 1.3, ease: "easeOut" },
                  },
                }}
              >
                <div className="portfolio-card group relative col-span-1">
                  <div className="card-img relative h-[300px] overflow-hidden rounded-md md:h-[500px]">
                    <Image
                      src={ item.thumbnail }
                      alt="image"
                      className="h-full w-full object-cover"
                      fill
                    />
                    <div className="absolute left-3 top-3 cursor-pointer rounded-3xl bg-gray1 px-4 py-2 duration-200 duration-300 ease-in-out ease-in-out   group-hover:z-[1] group-hover:-translate-x-[-3px] group-hover:bg-primary  group-hover:shadow-lg  md:left-5 md:top-5">
                      <div className="uppercase text-white">
                        <p className="text-font14 text-white">{item.category}</p>
                      </div>
                    </div>
                  </div>
                  <div className="mt-3 md:mt-4">
                    <h3 className="text-30 mb-1 duration-200 ease-in-out group-hover:text-primary md:mb-2">
                      {item.heading}
                    </h3>
                    {/* <p className="text-19 text-gray1">{Blog.list_heading}</p> */}
                  </div>
                  <Link href={`/blogs/${formatLinkForBlog(item.slug)}`}
                className="absolute top-0 z-[1] h-full w-full"
              ></Link>
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
