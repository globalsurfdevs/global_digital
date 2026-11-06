"use client";

import React, { useCallback, useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import type {
  InstagramMediaItem,
  InstagramPost,
} from "@/app/lib/integrations/instagram/instagram";

/**
 * What the modal can show or play itself, in order. Null when it can't: a
 * single video whose file Instagram withheld (it does so for other accounts'
 * videos and reels). Those use Instagram's own embedded player instead, which
 * has its own controls.
 */
function playableItems(post: InstagramPost): InstagramMediaItem[] | null {
  if (post.mediaType === "CAROUSEL_ALBUM" && post.children?.length) {
    return post.children;
  }
  if (post.mediaType === "VIDEO") {
    return post.videoUrl
      ? [{ image: post.image, videoUrl: post.videoUrl }]
      : null;
  }
  return [{ image: post.image }];
}

/** Instagram's embeddable player for a post, or null if the link isn't Instagram's. */
function embedUrl(permalink: string): string | null {
  try {
    const url = new URL(permalink);
    if (url.protocol !== "https:" || !/(^|\.)instagram\.com$/.test(url.hostname)) {
      return null;
    }
    return `https://www.instagram.com${url.pathname.replace(/\/?$/, "/")}embed/`;
  } catch {
    return null;
  }
}

const FOCUSABLE =
  'a[href], button:not([disabled]), video[controls], iframe, [tabindex]:not([tabindex="-1"])';

const ChevronIcon = ({ direction }: { direction: "left" | "right" }) => (
  <svg
    viewBox="0 0 24 24"
    width="20"
    height="20"
    fill="none"
    stroke="currentColor"
    strokeWidth="2.5"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    <path d={direction === "left" ? "M15 5l-7 7 7 7" : "M9 5l7 7-7 7"} />
  </svg>
);

const InstagramPostModal = ({
  post,
  onClose,
}: {
  post: InstagramPost;
  onClose: () => void;
}) => {
  const items = playableItems(post);
  const embed = items ? null : embedUrl(post.permalink);
  const count = items?.length ?? 1;
  const [index, setIndex] = useState(0);
  const dialogRef = useRef<HTMLDivElement>(null);

  const go = useCallback(
    (step: number) => setIndex((i) => (i + step + count) % count),
    [count],
  );

  // Lock page scroll while open, and hand focus back to the clicked slide after.
  useEffect(() => {
    const previouslyFocused = document.activeElement as HTMLElement | null;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    dialogRef.current?.focus();
    return () => {
      document.body.style.overflow = previousOverflow;
      previouslyFocused?.focus();
    };
  }, []);

  // Escape closes, arrows move through a multi-image post, Tab stays inside.
  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      const typingInVideo = (event.target as HTMLElement)?.tagName === "VIDEO";

      if (event.key === "Escape") {
        onClose();
      } else if (event.key === "ArrowLeft" && count > 1 && !typingInVideo) {
        go(-1);
      } else if (event.key === "ArrowRight" && count > 1 && !typingInVideo) {
        go(1);
      } else if (event.key === "Tab" && dialogRef.current) {
        const nodes = Array.from(
          dialogRef.current.querySelectorAll<HTMLElement>(FOCUSABLE),
        );
        if (nodes.length === 0) return;
        const first = nodes[0];
        const last = nodes[nodes.length - 1];
        const active = document.activeElement;
        if (event.shiftKey && (active === first || active === dialogRef.current)) {
          event.preventDefault();
          last.focus();
        } else if (!event.shiftKey && active === last) {
          event.preventDefault();
          first.focus();
        }
      }
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [count, go, onClose]);

  const current = items?.[index];
  const alt = post.caption?.slice(0, 100) || "Instagram post";

  // Which piece of media is on screen, so the spinner starts afresh each time
  // the picture, video or post changes.
  const mediaKey = current
    ? `${index}:${current.videoUrl ?? current.image}`
    : `embed:${embed ?? post.image}`;
  const [loadedKey, setLoadedKey] = useState<string | null>(null);
  const [failedKey, setFailedKey] = useState<string | null>(null);
  const loaded = loadedKey === mediaKey;
  const failed = failedKey === mediaKey;
  const markLoaded = () => setLoadedKey(mediaKey);
  const markFailed = () => setFailedKey(mediaKey);

  // The media fills the fixed-size box, so the modal never changes size between
  // pictures of different shapes or while something loads.
  const mediaClass = "h-full w-full object-contain";
  const fadeIn = `transition-opacity duration-200 ${
    loaded ? "opacity-100" : "opacity-0"
  }`;

  // A cached image can finish loading before React attaches onLoad.
  const imageRef = (img: HTMLImageElement | null) => {
    if (img?.complete && img.naturalWidth > 0) setLoadedKey(mediaKey);
  };

  return createPortal(
    <div
      className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/80 p-3 md:p-6"
      onClick={(event) => {
        if (event.target === event.currentTarget) onClose();
      }}
    >
      <div
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        aria-label="Instagram post"
        tabIndex={-1}
        className="relative flex h-[85vh] max-h-[820px] w-full max-w-3xl items-center justify-center overflow-hidden bg-black outline-none"
      >
        <button
          type="button"
          onClick={onClose}
          aria-label="Close"
          className="absolute right-2 top-2 z-20 flex h-9 w-9 items-center justify-center rounded-full bg-black/60 text-2xl leading-none text-white hover:bg-black/80"
        >
          ×
        </button>

        <div className="relative flex h-full w-full items-center justify-center bg-black">
          {current ? (
            current.videoUrl ? (
              <video
                key={mediaKey}
                src={current.videoUrl}
                poster={current.image || undefined}
                controls
                playsInline
                preload="metadata"
                onLoadedData={markLoaded}
                onError={markFailed}
                className={mediaClass}
              />
            ) : (
              // A plain img keeps each picture's own proportions at any size.
              // eslint-disable-next-line @next/next/no-img-element
              <img
                key={mediaKey}
                ref={imageRef}
                src={current.image}
                alt={alt}
                onLoad={markLoaded}
                onError={markFailed}
                className={`${mediaClass} ${fadeIn}`}
              />
            )
          ) : embed ? (
            <div className="flex h-full w-full justify-center">
              <iframe
                key={mediaKey}
                src={embed}
                title="Instagram video"
                allow="encrypted-media; fullscreen; picture-in-picture"
                allowFullScreen
                onLoad={markLoaded}
                className="h-full w-full max-w-[540px] border-0"
              />
            </div>
          ) : (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              key={mediaKey}
              ref={imageRef}
              src={post.image}
              alt={alt}
              onLoad={markLoaded}
              onError={markFailed}
              className={`${mediaClass} ${fadeIn}`}
            />
          )}

          {!loaded && !failed && (
            <div
              role="status"
              aria-label="Loading"
              className="pointer-events-none absolute inset-0 z-10 flex items-center justify-center"
            >
              <div className="h-10 w-10 animate-spin rounded-full border-4 border-white/25 border-t-white" />
            </div>
          )}
          {failed && (
            <p className="absolute inset-0 z-10 flex items-center justify-center px-6 text-center text-sm text-white/80">
              This couldn&apos;t be loaded.
            </p>
          )}

          {count > 1 && (
            <>
              <button
                type="button"
                onClick={() => go(-1)}
                aria-label="Previous"
                className="absolute left-2 top-1/2 z-10 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-white/85 text-black hover:bg-white"
              >
                <ChevronIcon direction="left" />
              </button>
              <button
                type="button"
                onClick={() => go(1)}
                aria-label="Next"
                className="absolute right-2 top-1/2 z-10 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-white/85 text-black hover:bg-white"
              >
                <ChevronIcon direction="right" />
              </button>
              <div className="absolute bottom-3 left-1/2 z-10 flex -translate-x-1/2 gap-1.5">
                {items?.map((_, i) => (
                  <span
                    key={i}
                    className={`h-1.5 w-1.5 rounded-full ${
                      i === index ? "bg-white" : "bg-white/40"
                    }`}
                  />
                ))}
              </div>
            </>
          )}
        </div>
      </div>
    </div>,
    document.body,
  );
};

export default InstagramPostModal;
