"use client";

import { motion } from "framer-motion";
import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import SocialShare from "../../components/BlogSocialMedia/SocialShare";

interface BlogDetailHeroProps {
  title: string;
  image: string;
  heroAlt?: string;
  publishedon?: string;
  updatedon?: string;
  readtime?: string | number;
  category?: string;
  isArticleContent?: boolean;
  bannerlogp?: boolean;
}

const BlogDetailHero = ({
  title,
  image,
  heroAlt,
  publishedon,
  updatedon,
  bannerlogp,
  readtime,
  category,
  isArticleContent,
}: BlogDetailHeroProps) => {
  const [isSmallScreen, setIsSmallScreen] = useState(false);
  const [divWidth, setDivWidth] = useState("100%");
  const nextContainerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const updateLayout = () => {
      const smallScreen = window.innerWidth < 992;
      setIsSmallScreen(smallScreen);

      if (smallScreen) {
        setDivWidth("100%");
        return;
      }

      const container = nextContainerRef.current;

      if (container) {
        const rect = container.getBoundingClientRect();
        setDivWidth(`${window.innerWidth - rect.left}px`);
      }
    };

    updateLayout();

    window.addEventListener("resize", updateLayout);

    return () => {
      window.removeEventListener("resize", updateLayout);
    };
  }, []);

  return (
    <>
      {/* Blog heading and metadata */}
      <div
        className="container mx-auto w-full px-[28px] py-2 lg:px-[55px]"
        ref={nextContainerRef}
      >
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 1, ease: "easeOut" }}
        >
          <div className="mb-[20px] border-b pt-[20px] sm:mb-[40px] sm:pt-[50px] lg:mb-[60px] lg:pb-10 lg:pt-[130px]">
            {isArticleContent ? (
              /* Article metadata layout */
              <div
                className={`flex flex-col justify-between lg:flex-row ${
                  bannerlogp ? "items-start" : "items-end"
                }`}
              >
                {/* Category and reading time */}
                <div>
                  <nav className="mb-6 text-[20px] text-[#77787B] lg:mb-8">
                    <ul className="bredcbs flex items-center space-x-2">
                      <li>
                        <p className="text-[10px] text-[#77787B] sm:text-font14 lg:text-font19">
                          {category}
                        </p>
                      </li>

                      <li>
                        <div className="h-[14px] w-[14px] shrink-0 bg-primary" />
                      </li>

                      <li>
                        <span className="text-[10px] text-[#77787B] sm:text-font14 lg:text-font19">
                          {readtime || 0} Minutes Read
                        </span>
                      </li>
                    </ul>
                  </nav>
                </div>

                {/* Publication dates */}
                <div>
                  <p className="text-[10px] text-[#77787B] hover:underline sm:text-font14 lg:text-font19">
                    Published on {publishedon} | Updated on {updatedon}
                  </p>
                </div>
              </div>
            ) : (
              /* Existing non-article metadata layout */
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
            )}

            {/* Blog title and social sharing */}
            <div className="py-[50px] lg:py-[150px]">
              <h1 className="title-80">{title}</h1>

              <div className="mt-6">
                <SocialShare />
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Hero banner image */}
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 1.3, ease: "easeOut" }}
      >
        {isArticleContent ? (
          <div
            style={{
              width: isSmallScreen ? "100%" : divWidth,
            }}
            className={isSmallScreen ? "container mx-auto py-2" : ""}
          >
            <div className="w-full bg-black">
              <Image
                src={image}
                alt={heroAlt || title || "Blog banner image"}
                width={1500}
                height={700}
                sizes="100vw"
                className="block h-auto w-full"
                priority
              />
            </div>
          </div>
        ) : (
          <Image
            src={image}
            alt={heroAlt || title || "Blog banner image"}
            width={1500}
            height={700}
            sizes="100vw"
            className="mx-auto block h-auto w-full"
            priority
          />
        )}
      </motion.div>
    </>
  );
};

export default BlogDetailHero;