"use client";
import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { assets } from "../../../public/assets/assets";

const SocialShare = () => {
  const pathname = usePathname();
  const currentUrl = typeof window !== "undefined" ? window.location.origin + pathname : "";

  const [copied, setCopied] = useState(false);

  const shareLinks = {
    facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(currentUrl)}`,
    twitter: `https://twitter.com/intent/tweet?url=${encodeURIComponent(currentUrl)}`,
    linkedin: `https://www.linkedin.com/shareArticle?mini=true&url=${encodeURIComponent(currentUrl)}`,
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(currentUrl).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 1000);
    });
  };

  return (
    <div className="fixed top-[45%] left-[150px] xl:flex flex-col items-start gap-4 z-[1000] hidden">
      
      {/* Copy Link */}
      <div className="flex items-center gap-[10px] group">
  <div
    onClick={handleCopy}
    className="cursor-pointer p-[16px] bg-[#C1C1C1]/30 rounded-[14px] w-[50px] h-[50px] flex items-center justify-center transition-colors duration-500 ease-in-out group hover:bg-[#e63e31]"
    title="Copy Blog Link"
  >
    <Image
      src={assets.shareicon}
      alt="Copy Link"
      className="w-full h-full object-cover 
                 transition-transform transition-filter duration-500 ease-in-out 
                 group-hover:invert group-hover:scale-110"
    />
  </div>

  {copied && (
    <p className="text-dark text-[12px]">
      Link Copied!
    </p>
  )}
</div>

    {/* Facebook */}
<Link href={shareLinks.facebook} target="_blank" rel="noopener noreferrer">
  <div className="p-[16px] bg-[#C1C1C1]/30 rounded-[14px] w-[50px] h-[50px] flex items-center justify-center 
                  transition-colors duration-500 ease-in-out group hover:bg-[#e63e31]">
    <Image
      src={assets.facebbokicon}
      alt="Facebook"
      className="w-full h-full object-cover 
                 transition-transform transition-filter duration-500 ease-in-out 
                 group-hover:invert group-hover:scale-110"
    />
  </div>
</Link>

{/* Twitter */}
<Link href={shareLinks.twitter} target="_blank" rel="noopener noreferrer">
  <div className="p-[16px] bg-[#C1C1C1]/30 rounded-[14px] w-[50px] h-[50px] flex items-center justify-center 
                  transition-colors duration-500 ease-in-out group hover:bg-[#e63e31]">
    <Image
      src={assets.twittericon}
      alt="Twitter"
      className="w-full h-full object-cover 
                 transition-transform transition-filter duration-500 ease-in-out 
                 group-hover:invert group-hover:scale-110"
    />
  </div>
</Link>

{/* LinkedIn */}
<Link href={shareLinks.linkedin} target="_blank" rel="noopener noreferrer">
  <div className="p-[16px] bg-[#C1C1C1]/30 rounded-[14px] w-[50px] h-[50px] flex items-center justify-center 
                  transition-colors duration-500 ease-in-out group hover:bg-[#e63e31]">
    <Image
      src={assets.linkedinicon}
      alt="LinkedIn"
      className="w-full h-full object-cover 
                 transition-transform transition-filter duration-500 ease-in-out 
                 group-hover:invert group-hover:scale-110"
    />
  </div>
</Link>


    </div>
  );
};

export default SocialShare;
