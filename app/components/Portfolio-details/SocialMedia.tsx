"use client";

import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import "swiper/css";
import { workSvgs } from "../../data/works";
import Link from "next/link";
import { motion } from "framer-motion";
import { Portfolio } from "@/app/types/Portfolio";
import Image from "next/image";
import { useRef, useState, useEffect } from "react";
import type { InstagramPost } from "@/app/lib/integrations/instagram/instagram";

const PLACEHOLDER_COUNT = 8;

// Same box as a real slide: a pulsing grey block shows until the image has
// downloaded, then the image fades in over it.
const SlideImage = ({ src, alt }: { src: string; alt: string }) => {
  const [loaded, setLoaded] = useState(false);

  return (
    <div
      className={`relative aspect-[4/5] w-full overflow-hidden bg-gray-200 ${
        loaded ? "" : "animate-pulse"
      }`}
    >
      <Image
        src={src}
        alt={alt}
        fill
        sizes="(max-width: 768px) 50vw, 25vw"
        // An image that finished loading before hydration never fires onLoad.
        ref={(img) => {
          if (img?.complete) setLoaded(true);
        }}
        onLoad={() => setLoaded(true)}
        className={`object-cover transition-opacity duration-300 ease-linear ${
          loaded ? "opacity-100" : "opacity-0"
        }`}
      />
    </div>
  );
};

const SocialMedia = ({
  data,
  instagramPosts: serverPosts,
}: {
  data: { portfolio: Portfolio };
  // Passed by pages that fetch the feed on the server. When undefined (e.g.
  // case studies), the feed is loaded in the browser instead.
  instagramPosts?: InstagramPost[];
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [leftOffset, setLeftOffset] = useState(0);

  const [fetchedPosts, setFetchedPosts] = useState<InstagramPost[]>([]);
  const portfolioId = data?.portfolio?._id;
  // Only the browser-fetch path has a loading phase; server-fed pages don't.
  const [feedLoading, setFeedLoading] = useState(
    serverPosts === undefined && !!portfolioId,
  );

  useEffect(() => {
    if (serverPosts !== undefined || !portfolioId) return;
    let cancelled = false;
    fetch(`/api/instagram/${portfolioId}`)
      .then((res) => (res.ok ? res.json() : { posts: [] }))
      .then((json) => {
        if (!cancelled) setFetchedPosts(json.posts ?? []);
      })
      .catch(() => {})
      .finally(() => {
        if (!cancelled) setFeedLoading(false);
      });
    return () => {
      cancelled = true;
    };
  }, [serverPosts, portfolioId]);

  const instagramPosts = serverPosts ?? fetchedPosts;

  // While the feed is still loading, show placeholders rather than the uploaded
  // images, which would flash and then be replaced by the Instagram posts.
  // Live Instagram posts when the client is connected; uploaded images otherwise.
  const slides: {
    src: string;
    alt: string;
    href?: string;
    placeholder?: boolean;
  }[] = feedLoading
    ? Array.from({ length: PLACEHOLDER_COUNT }, () => ({
        src: "",
        alt: "",
        placeholder: true,
      }))
    : instagramPosts.length > 0
      ? instagramPosts.map((post) => ({
          src: post.image,
          alt: post.caption?.slice(0, 100) || "Instagram post",
          href: post.permalink,
        }))
      : (data?.portfolio.socialMediaImages ?? []).map((src) => ({
          src,
          alt: src,
        }));

  useEffect(() => {
    const updateOffset = () => {
      if (containerRef.current) {
        const rect = containerRef.current.getBoundingClientRect();
        console.log(containerRef.current.getBoundingClientRect());
        setLeftOffset(rect.left + 15);
      }
    };
    updateOffset();
    window.addEventListener("resize", updateOffset);
    return () => window.removeEventListener("resize", updateOffset);
  }, []);

  return (
    <div className="overflow-hidden">
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
        <div
          ref={containerRef}
          className="invisible container pointer-events-none"
        />
        <div
          className="overflow-hidden max-lg:py-5 xl:pb-[140px]"
          style={{ marginLeft: `${leftOffset}px` }}
        >
          <div className="flex flex-col gap-6 xl:gap-[60px]">
            <motion.h2 className="text-font65 leading-lh1p07">
              Social Media
            </motion.h2>
            <div className="">
              <Swiper
                className="!overflow-visible"
                modules={[Autoplay]}
                autoplay={{
                  delay: 0,
                  disableOnInteraction: false,
                  pauseOnMouseEnter: true,
                }}
                freeMode={true}
                speed={5000} // Slide transition duration (500ms)
                slidesPerView="auto"
                loop={true} // Enable infinite looping
                breakpoints={{
                  320: { slidesPerView: 2, spaceBetween: 10 },
                  400: { slidesPerView: 2, spaceBetween: 10 },
                  640: { slidesPerView: 3, spaceBetween: 10 },
                  768: { slidesPerView: 3, spaceBetween: 15 },
                  1024: { slidesPerView: 4, spaceBetween: 25 },
                  1600: { slidesPerView: 4, spaceBetween: 30 },
                }}
              >
                {slides.map((item, index) => {
                  // Fixed ratio + cover keeps every slide the same height
                  // regardless of the source image's own proportions.
                  const image = item.placeholder ? (
                    <div className="aspect-[4/5] w-full animate-pulse bg-gray-200" />
                  ) : (
                    <SlideImage src={item.src} alt={item.alt} />
                  );
                  return (
                    <SwiperSlide key={item.href ?? index}>
                      <div className="flex min-h-[30px] min-w-[30px] bg-[#F2F2F2] p-5 duration-200 ease-linear lg:min-h-[50px] lg:min-w-[50px] xl:p-[40px]">
                        <div className="h-full w-full">
                          {item.href ? (
                            <a
                              href={item.href}
                              target="_blank"
                              rel="noopener noreferrer"
                            >
                              {image}
                            </a>
                          ) : (
                            image
                          )}
                        </div>
                      </div>
                    </SwiperSlide>
                  );
                })}
              </Swiper>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default SocialMedia;
