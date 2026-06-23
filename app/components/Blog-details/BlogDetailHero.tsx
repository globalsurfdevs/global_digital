"use client";

import { motion } from "framer-motion";
import React from "react";
import SocialShare from "../../components/BlogSocialMedia/SocialShare";
import Image from "next/image";

interface BlogDetailHeroProps {
  title: string;
  image: string;
  heroAlt?: string;
  publishedon?: string;
  updatedon?: string;
  readtime?: string | number;
}

const BlogDetailHero = ({
  title,
  image,
  heroAlt,
  publishedon,
  updatedon,
  readtime,
}: BlogDetailHeroProps) => {
  return (
    <>
      <div className="container mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1, ease: "easeOut" }}
        >
          <div className="border-b pt-[20px] sm:pt-[50px] lg:pt-[130px]">
            <div className="flex justify-between">
              <div className="flex items-center gap-2">
                <p className="text-[10px] text-[#77787B] sm:text-font14 lg:text-font19">
                Blog
                </p>
                <div className="h-[14px] w-[14px] bg-primary" />
                <p className="text-[10px] text-[#77787B] sm:text-font14 lg:text-font19">
                {readtime || 0} Minutes Read
                </p>
              </div>
              <p className="text-[10px] text-[#77787B] sm:text-font14 lg:text-font19">
                Published on {publishedon} | Updated on {updatedon}
              </p>
            </div>

            <div className="py-[50px] lg:py-[150px]">
              <h1 className="title-80">{title}</h1>

              <div className="mt-6">
                <SocialShare />
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 1.3, ease: "easeOut" }}
      >
        <Image
          src={image}
          alt={heroAlt || title}
          width={1500}
          height={700}
          className="w-full object-cover"
        />
      </motion.div>
    </>
  );
};

export default BlogDetailHero;