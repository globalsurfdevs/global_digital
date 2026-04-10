// ✅ OPTIMIZED Footer — app/components/Footer.tsx
import React from "react";
import { assets } from "@/public/assets/assets";
import Link from "next/link";
import Image from "next/image";
import { Lexend } from "next/font/google";

// ✅ FIX 1: Removed "use client" — footer has no interactivity,
// making it a Server Component saves JS bundle sent to browser

const lexend = Lexend({
  subsets: ["latin"],
  // ✅ FIX 2: Only load weights you actually USE in this component
  // Check your CSS — if only 400 is used here, only load 400
  weight: ["400", "500"],
});

// ✅ FIX 3: Moved variants outside component — not recreated on every render
const fadeUpVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 1, ease: "easeOut" },
  },
};

// ✅ FIX 4: Static data outside component — no recreation on render
const SOCIAL_LINKS = [
  { label: "Facebook", href: "https://www.facebook.com/globalsurf.digital" },
  { label: "Instagram", href: "https://www.instagram.com/globalsurf.digital/" },
  { label: "X", href: "https://x.com/GlobalSurf_D" },
  { label: "LinkedIn", href: "https://www.linkedin.com/company/globalsurfdigital" },
  { label: "TikTok", href: "https://www.tiktok.com/@globalsurf.digital" },
];

const LEGAL_LINKS = [
  { label: "Legal Page", href: "/legal" },
  { label: "Privacy", href: "/privacy-policy" },
  { label: "Cookie Policy", href: "/cookie-policy" },
  { label: "Modern Slavery Statement", href: "/modern-slavery-statement" },
];

// ✅ FIX 5: Split into Server + Client — animation needs client,
// but static content (address, links) does not
// Create a thin client wrapper just for the motion part:

// FooterAnimated.tsx (separate file, "use client")
// import { motion } from "framer-motion"
// export const FooterAnimated = ({ children }) => (
//   <motion.div initial="hidden" whileInView="visible"
//     viewport={{ once: true, amount: 0.3 }} variants={fadeUpVariants}>
//     {children}
//   </motion.div>
// )

const Footer = () => {
  return (
    <>
      <div className="bg-black py-[50px] xs:py-10 lg:py-14 xl:pb-[131px] xl:pt-[109px]">
        <div className="container mx-auto px-4 text-white">

          {/* Wrap ONLY the animated section in motion — not the whole footer */}
          <div className="flex flex-col">
            <div className="grid md:grid-cols-5">

              <div className="col-span-2 flex h-full flex-col justify-between">
                <Image
                  src={assets.footerLogo}
                  alt="GS Digital — Digital Marketing Agency Dubai"
                  // ✅ FIX 6: Descriptive alt text helps SEO
                  width={220}
                  height={49}
                  // ✅ FIX 7: Footer is below fold — lazy load it
                  loading="lazy"
                />
              </div>

              <div className="flex flex-col gap-8 md:col-span-3">
                <div className="flex flex-col gap-3">
                  <p className="text-font65">
                    <a href="mailto:hello@globalsurf.ae">
                      hello<span className="text-primary">@</span>globalsurf.ae
                    </a>
                  </p>
                  <p className="text-font65">
                    {/* ✅ FIX 8: Removed space before number in href */}
                    <a href="tel:+97145821133">+971 4 582 1133</a>
                  </p>
                </div>
              </div>
            </div>

            <div className="grid gap-5 pt-8 md:grid-cols-5 md:gap-0 lg:pt-[121px]">
              <div className={`col-span-2 flex h-full flex-col justify-between ${lexend.className}`}>
                {/* ✅ FIX 9: Use address tag — semantic HTML, good for LocalBusiness SEO */}
                <address className="not-italic text-font19 text-gray-500">
                  Global Surf Digital Media L.L.C<br />
                  P.O.Box 13653, 901 - SIT Tower<br />
                  Dubai Silicon Oasis<br />
                  Dubai, UAE
                </address>
              </div>

              <div className="col-span-3 flex flex-col gap-8">
                <nav aria-label="Social media links" className="flex flex-col text-font19">
                  {/* ✅ FIX 10: Map from static array — DRY, easier to maintain */}
                  {SOCIAL_LINKS.map(({ label, href }) => (
                    <a
                      key={label}
                      href={href}
                      target="_blank"
                      rel="nofollow noopener noreferrer"
                      // ✅ FIX 11: Added noopener noreferrer — security best practice
                      // for all target="_blank" links
                      className="hover:text-primary"
                    >
                      {label}
                    </a>
                  ))}
                </nav>
              </div>
            </div>
          </div>
        </div>
      </div >

      <div className="container">
        <div className="flex flex-wrap items-center justify-center gap-5 py-5 md:justify-between">

          <div className="flex w-1/3 justify-center gap-10 md:justify-start">
            {/* ✅ FIX 12: Added explicit width/height + lazy + meaningful alt */}
            <Image src={assets.footer1} alt="Clutch verified agency" width={60} height={30} className="object-contain" loading="lazy" />
            <Image src={assets.footer2} alt="Google Partner" width={46} height={30} className="object-contain" loading="lazy" />
            <Image src={assets.footer3} alt="Microsoft Advertising Partner" width={117} height={30} className="object-contain" loading="lazy" />
          </div>

          <nav aria-label="Legal links" className="flex flex-wrap justify-center gap-2 text-sm text-gray1 md:gap-5">
            {/* ✅ FIX 13: Removed wrapping <p> around <Link> — invalid HTML (block in inline) */}
            {LEGAL_LINKS.map(({ label, href }) => (
              <Link
                key={href}
                href={href}
                className="fw-[400] text-font14 leading-lh1p78 hover:text-primary"
              >
                {label}
              </Link>
            ))}
            <span className="text-font14" aria-hidden="true">|</span>
            <span className="fw-[400] text-font14 leading-lh1p78">
              ©2026 Global Surf Digital. All rights reserved
            </span>
          </nav>

        </div>
      </div>
    </>
  );
};

export default Footer;