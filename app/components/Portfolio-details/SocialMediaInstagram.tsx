"use client";

import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import "swiper/css";
import { motion } from "framer-motion";
import { Portfolio } from "@/app/types/Portfolio";
import Image from "next/image";
import { useRef, useState, useEffect } from "react";
import type { InstagramPost } from "@/app/lib/integrations/instagram/instagram";
import InstagramPostModal from "./InstagramPostModal";

// The Social Media section for the /v2 pages. It shows the client's Instagram
// posts, opening each in a modal, and falls back to the uploaded images when
// none are available. The original section (SocialMedia.tsx) is untouched and
// still used by the existing pages.

type Badge = "video" | "carousel";

const BadgeIcon = ({ badge }: { badge: Badge }) => (
  <svg
    viewBox="0 0 24 24"
    width="16"
    height="16"
    fill="currentColor"
    aria-hidden="true"
  >
    {badge === "video" ? (
      <path d="M8 5v14l11-7z" />
    ) : (
      <path d="M4 7h12v14H4zM8 3h12v14h-2V5H8z" />
    )}
  </svg>
);

// A pulsing grey block shows until the image has downloaded, then the image
// fades in over it. A fixed 4:5 box keeps every slide the same height whatever
// the source image's proportions.
const SlideImage = ({
  src,
  alt,
  badge,
}: {
  src: string;
  alt: string;
  badge?: Badge;
}) => {
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
      {badge && (
        <span className="pointer-events-none absolute right-2 top-2 z-10 flex h-7 w-7 items-center justify-center rounded-full bg-black/55 text-white">
          <BadgeIcon badge={badge} />
        </span>
      )}
    </div>
  );
};

const badgeFor = (post: InstagramPost): Badge | undefined => {
  if (post.mediaType === "VIDEO") return "video";
  if (post.mediaType === "CAROUSEL_ALBUM" && (post.children?.length ?? 0) > 1) {
    return "carousel";
  }
  return undefined;
};

const SocialMediaInstagram = ({
  data,
  instagramPosts,
  flush = false,
}: {
  data: { portfolio: Portfolio };
  instagramPosts: InstagramPost[];
  /** Show each post edge to edge, without the padded grey frame around it. */
  flush?: boolean;
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [leftOffset, setLeftOffset] = useState(0);
  const [activePost, setActivePost] = useState<InstagramPost | null>(null);

  // Live Instagram posts when the client is connected; uploaded images otherwise.
  const slides: {
    src: string;
    alt: string;
    post?: InstagramPost;
    badge?: Badge;
  }[] =
    instagramPosts.length > 0
      ? instagramPosts.map((post) => ({
          src: post.image,
          alt: post.caption?.slice(0, 100) || "Instagram post",
          post,
          badge: badgeFor(post),
        }))
      : (data?.portfolio.socialMediaImages ?? []).map((src) => ({
          src,
          alt: src,
        }));

  useEffect(() => {
    const updateOffset = () => {
      if (containerRef.current) {
        const rect = containerRef.current.getBoundingClientRect();
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
        viewport={{ once: true, amount: 0.3 }} // Trigger animation once when 30% visible
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
                speed={5000} // Slide transition duration
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
                  const image = (
                    <SlideImage src={item.src} alt={item.alt} badge={item.badge} />
                  );
                  const post = item.post;
                  return (
                    <SwiperSlide key={post?.id ?? index}>
                      <div
                        className={`flex min-h-[30px] min-w-[30px] duration-200 ease-linear lg:min-h-[50px] lg:min-w-[50px] ${
                          flush ? "" : "bg-[#F2F2F2] p-5 xl:p-[40px]"
                        }`}
                      >
                        <div className="h-full w-full">
                          {post ? (
                            // Opens the post in a modal instead of leaving the site.
                            <button
                              type="button"
                              onClick={() => setActivePost(post)}
                              aria-label={`Open Instagram post${
                                post.caption
                                  ? `: ${post.caption.slice(0, 60)}`
                                  : ""
                              }`}
                              className="block w-full cursor-pointer text-left"
                            >
                              {image}
                            </button>
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

      {activePost && (
        <InstagramPostModal
          key={activePost.id}
          post={activePost}
          onClose={() => setActivePost(null)}
        />
      )}
    </div>
  );
};

export default SocialMediaInstagram;
