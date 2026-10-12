"use client";

import { motion } from "framer-motion";
import React, { useEffect, useRef, useState } from "react";
import SocialShare from "../../components/BlogSocialMedia/SocialShare";
import Image from "next/image";

interface BlogDetailHeroProps {
  title: string;
  image: string;
  heroAlt?: string;
  publishedon?: string;
  updatedon?: string;
  readtime?: string | number;
  category?: string;
  isArticleContent?: boolean;
}

const BlogDetailHero = ({
  title,
  image,
  heroAlt,
  publishedon,
  updatedon,
  readtime,
  category,
  isArticleContent,
}: BlogDetailHeroProps) => {
  const [isSmallScreen, setIsSmallScreen] = useState(false);
  const [divWidth, setDivWidth] = useState("100%");
  const nextContainerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const update = () => {
      setIsSmallScreen(window.innerWidth < 992);

      if (nextContainerRef.current) {
        const rect = nextContainerRef.current.getBoundingClientRect();
        const marginLeft = parseFloat(
          window.getComputedStyle(nextContainerRef.current).marginLeft,
        );
        setDivWidth(`${rect.width + marginLeft - 15}px`);
      }
    };

    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  return (
    <>
      <div className="container mx-auto py-2" ref={nextContainerRef}>
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1, ease: "easeOut" }}
        >
          <div className="mb-[20px] border-b pt-[20px] sm:mb-[40px] sm:pt-[50px] lg:mb-[60px] lg:pt-[130px]">
            <div className="flex justify-between">
              <div className="flex items-center gap-2">
                <p className="text-[10px] text-[#77787B] sm:text-font14 lg:text-font19">
                  {category}
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
        {isArticleContent ? (
          <div
            style={{ width: isSmallScreen ? "" : divWidth }}
            className={`${
              isSmallScreen ? "container mx-auto py-2" : ""
            } custom-class`}
          >
            <div className="w-full bg-black">
              <Image
                src={image}
                className="w-full"
                alt={heroAlt || title || "Banner image"}
                width={1500}
                height={700}
              />
            </div>
          </div>
        ) : (
          <Image
            src={image}
            alt={heroAlt || title}
            width={1500}
            height={700}
            className="mx-auto w-full object-cover"
          />
        )}
      </motion.div>
    </>
  );
};

export default BlogDetailHero;