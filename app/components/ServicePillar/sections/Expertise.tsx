"use client";
import { toSentenceCase } from "@/app/helpers/maintainProperWordings";
import { motion } from "framer-motion";
import Image from "next/image";

// Accepts both lucide-react icons and the custom BrowserCodeIcon below —
// both accept size/className, which is all this component uses.
type IconComponent = React.ComponentType<{
  size?: number;
  strokeWidth?: number;
  className?: string;
}>;

export interface FrameworkItem {
  id: number;
  title: string;
  icon: string;
  dec: string;
  urllink?: string;
}

interface InfoGridProps {
  title: string; // small uppercase eyebrow label, e.g. "Area of expertise"
  subTitle: string; // big headline, e.g. "Four disciplines, one in-house team"
  description?: string; // supporting line under the headline
  data: FrameworkItem[];
  colcount?: number; // columns at xl breakpoint, defaults to 4
}

// Browser-window-with-code icon, drawn to match the reference set exactly —
// lucide doesn't ship this exact "web app" glyph so it's a custom outline icon
// sized/stroked to sit flush alongside the lucide icons used for the other cards.
export const BrowserCodeIcon: IconComponent = ({ size = 20, className }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
  >
    <rect
      x="2.5"
      y="3.5"
      width="19"
      height="17"
      rx="2.5"
      stroke="currentColor"
      strokeWidth="1.75"
    />
    <circle cx="6.5" cy="7.25" r="0.9" fill="currentColor" />
    <path
      d="M9.5 12.75L7.5 14.5L9.5 16.25"
      stroke="currentColor"
      strokeWidth="1.75"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M14.5 12.75L16.5 14.5L14.5 16.25"
      stroke="currentColor"
      strokeWidth="1.75"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

// Tailwind's compiler only picks up class names it can find literally in the
// source. A template-built class like `xl:grid-cols-${n}` never gets
// generated, so we look the class up from a static map instead — every
// possible value is spelled out here so Tailwind can see it.
const XL_COL_CLASS: Record<number, string> = {
  1: "xl:grid-cols-1",
  2: "xl:grid-cols-2",
  3: "xl:grid-cols-3",
  4: "xl:grid-cols-4",
  5: "xl:grid-cols-5",
  6: "xl:grid-cols-6",
};

const InfoGrid: React.FC<InfoGridProps> = ({
  title,
  subTitle,
  description,
  data,
  colcount,
}) => {
  const xlColClass = XL_COL_CLASS[colcount || 4] || XL_COL_CLASS[4];

  return (
    <div className="bg-white py-120">
      <div className="container mx-auto">
        <div className="pd-cus flex flex-col">
          {/* Eyebrow */}
          <div className="mb-4 flex items-center gap-3 md:mb-6 xl:mb-8">
            <p className="text-18 uppercase leading-[1.5] text-[#A3A3A3]">
              {title}
            </p>
            <div className="h-4 w-4 bg-primary" />
          </div>

          {/* Headline + description */}
          <div className="flex flex-col gap-4">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.3 }}
              variants={{
                hidden: { opacity: 0, y: 40 },
                visible: {
                  opacity: 1,
                  y: 0,
                  transition: { duration: 0.8, ease: "easeOut" },
                },
              }}
            >
              <h2 className="title-60 text-[length:var(--text-60-sm)] font-normal leading-[1.15] text-black">
                {subTitle}
              </h2>
            </motion.div>

            {description && (
              <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.3 }}
                variants={{
                  hidden: { opacity: 0, y: 40 },
                  visible: {
                    opacity: 1,
                    y: 0,
                    transition: {
                      duration: 0.8,
                      ease: "easeOut",
                      delay: 0.1,
                    },
                  },
                }}
              >
                <p className="fnt-lexend text-[length:var(--text-18-sm)] leading-[1.6] text-[#8C8C8C]">
                  {description}
                </p>
              </motion.div>
            )}
          </div>

          {/* Grid — a single responsive grid, no manual row-chunking or
              window-width JS. CSS wraps items on its own. */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            variants={{
              hidden: {},
              visible: { transition: { staggerChildren: 0.08 } },
            }}
            className={`mt-10 grid grid-cols-1 gap-y-6 md:grid-cols-2 gap-x-[68px] xl:mt-[60px] border-b ${xlColClass}`}
          >
            {data.map((item, index) => {
              return (
                <motion.div
                  key={item.id}
                  variants={{
                    hidden: { opacity: 0, y: 24 },
                    visible: {
                      opacity: 1,
                      y: 0,
                      transition: { duration: 0.6, ease: "easeOut" },
                    },
                  }}
                  className="group relative flex h-full flex-col pb-[40px]"
                >
                  {/* Default divider — spans the full cell so it touches the
                      next card's line with no visible gap. */}
                  {/* <span className="pointer-events-none absolute inset-x-0 bottom-0 h-px bg-black/10" /> */}
                  {/* Hover/active fill — stops short by the same amount as
                      pr-10 (2.5rem) so it only covers the content width, not
                      the gutter reserved for spacing between cards. */}
                  <span
                    className={`pointer-events-none absolute bottom-[-1px] left-0 right-0  h-px bg-[#E63E31] transition-all duration-300 opacity-0 group-hover:opacity-100 scale-x-0 group-hover:scale-x-100 origin-left`}
                  />
                  <div className="border-[#E63E31]/12 relative mb-[20px] lg:mb-[40px] h-[80px] w-[80px] rounded-lg border bg-[#E63E31]/5 px-[12px] py-[15px]">
                    <div className="relative h-full w-full">
                      <Image
                        src={item.icon}
                        alt={item.title}
                        fill
                        className="object-contain"
                      />
                    </div>
                  </div>

                  <h3 className="lg:mb-6 text-28 leading-[1.214285714285714] text-black min-h-[68px] max-w-[14ch]">
                    {item.title}
                  </h3> 

                  <p className="fnt-lexend text-[length:var(--text-18-sm)] leading-[1.6] text-[#8C8C8C] mb-[30px] lg:mb-[50px]">
                    {toSentenceCase(item.dec)}
                  </p>

                  <Image
                    src="/images/service-pillar/arrow.svg"
                    alt=""
                    width={20}
                    height={20}
                    className={`mt-auto transition-all duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5`}
                  />

                  {/* {item.urllink && (
                    <Link
                      href={item.urllink}
                      className="absolute inset-0"
                      aria-label={item.title}
                    />
                  )} */}
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default InfoGrid;