"use client";

import React, { useState } from "react";

type Props = {
  data?: {
    portfolio?: {
      video?: string;
      videoTitle?: string;
      videoThumbnail?: string;
    };
  } | null;
  video?: string;
  videoId?: string;
  title?: string;
  thumbnail?: string;
  className?: string;
};

// Same clean logic from GuidedVision
function extractYouTubeId(input?: string): string | null {
  if (!input) return null;
  const regExp =
    /(?:youtube\.com\/(?:watch\?v=|embed\/)|youtu\.be\/)([a-zA-Z0-9_-]{11})/;
  const match = input.match(regExp);
  return match ? match[1] : null;
}

const getEmbedUrl = (url?: string) => {
  const id = extractYouTubeId(url);
  return id
    ? `https://www.youtube-nocookie.com/embed/${id}?autoplay=1&controls=1&modestbranding=1&rel=0&fs=1`
    : "";
};

export default function YtVideo({
  data,
  video,
  videoId,
  title,
  thumbnail,
  className,
}: Props) {
  const [playing, setPlaying] = useState(false);

  // 🎯 Pick data from API or direct props
  const videoUrl = video ?? videoId ?? data?.portfolio?.video ?? "";
  const heading = title ?? data?.portfolio?.videoTitle ?? "Testimonials";
  const thumb =
    thumbnail ??
    data?.portfolio?.videoThumbnail ??
    `https://i.ytimg.com/vi/${extractYouTubeId(videoUrl)}/maxresdefault.jpg`;

  const embedUrl = getEmbedUrl(videoUrl);
  if (!embedUrl) return null;

  return (
    <>
      <div className="container mx-auto mb-12 lg:mb-[150px]">
        <h2 className="title-65 mb-3 lg:mb-[30px]">{heading}</h2>

        <div className="">
          <div className="relative mb-12 aspect-video h-[220px] w-full overflow-hidden md:h-[350px] lg:mb-0 lg:h-[450px] xl:h-[800px]">
            {/* <div className="relative w-full aspect-video bg-gray-100"> */}
            {!playing ? (
              <button
                type="button"
                onClick={() => setPlaying(true)}
                aria-label="Play video"
                className="group absolute inset-0 flex items-center justify-center"
              >
                <img
                  src={thumb}
                  alt={heading}
                  className="h-full w-full object-cover"
                  loading="lazy"
                />

                {/* <span className="absolute inset-0 bg-black/40 transition-opacity group-hover:bg-black/30" /> */}

                <span className="absolute z-10 flex items-center justify-center">
                  <span className="flex h-20 w-20 items-center justify-center rounded-full bg-white/20 backdrop-blur-md">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                      className="h-10 w-10 text-white"
                    >
                      <path d="M8 5v14l11-7z" />
                    </svg>
                  </span>
                </span>
              </button>
            ) : (
              <iframe
                src={embedUrl}
                allow="autoplay; fullscreen"
                className="absolute inset-0 h-full w-full "
                frameBorder={0}
                allowFullScreen
              />
            )}
            {/* </div> */}
          </div>
        </div>
      </div>
    </>
  );
}
