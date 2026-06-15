// "use client";

// import { motion } from "framer-motion";
// import Image from "next/image";
// import { useEffect, useRef, useState } from "react";
// import Link from "next/link";
// import {
//   formatLinkForCaseStudy,
// } from "@/app/helpers/formatLink";
// import { CaseStudy } from "@/app/types/CaseStudy";
// import { createPortal } from "react-dom";

// const CaseStudyList = ({
//   data,
//   industries,
// }: {
//   data: CaseStudy[];
//   industries: { _id: string; name: string; subCategories: string[] }[];
// }) => {
//   const [caseStudies, setCaseStudies] = useState<CaseStudy[]>(data);
//   const [filter, setFilter] = useState("all");
//   const [selectedIndustry, setSelectedIndustry] = useState<string | null>(null);
//   const [industryOpen, setIndustryOpen] = useState(false);
//   const [dropdownPos, setDropdownPos] = useState({ top: 0, left: 0, width: 0 });

//   const dropdownRef = useRef<HTMLDivElement>(null);
//   const triggerRef = useRef<HTMLButtonElement>(null);
//   const portalRef = useRef<HTMLDivElement>(null);
//   const tabsRef = useRef<HTMLDivElement>(null);

//   const [originalCaseStudy, setOriginalCaseStudy] = useState<CaseStudy[]>([]);

//   useEffect(() => {
//     if (originalCaseStudy.length === 0 && data.length > 0) {
//       setOriginalCaseStudy(data);
//     }
//   }, [data]);

//   // Drag-to-scroll on tabs
//   useEffect(() => {
//     const el = tabsRef.current;
//     if (!el) return;

//     let isDown = false;
//     let startX = 0;
//     let scrollLeft = 0;

//     const onMouseDown = (e: MouseEvent) => {
//       isDown = true;
//       el.style.cursor = "grabbing";
//       startX = e.pageX - el.offsetLeft;
//       scrollLeft = el.scrollLeft;
//     };
//     const onMouseLeave = () => { isDown = false; el.style.cursor = "grab"; };
//     const onMouseUp = () => { isDown = false; el.style.cursor = "grab"; };
//     const onMouseMove = (e: MouseEvent) => {
//       if (!isDown) return;
//       e.preventDefault();
//       const x = e.pageX - el.offsetLeft;
//       const walk = (x - startX) * 1.5;
//       el.scrollLeft = scrollLeft - walk;
//     };

//     el.addEventListener("mousedown", onMouseDown);
//     el.addEventListener("mouseleave", onMouseLeave);
//     el.addEventListener("mouseup", onMouseUp);
//     el.addEventListener("mousemove", onMouseMove);

//     return () => {
//       el.removeEventListener("mousedown", onMouseDown);
//       el.removeEventListener("mouseleave", onMouseLeave);
//       el.removeEventListener("mouseup", onMouseUp);
//       el.removeEventListener("mousemove", onMouseMove);
//     };
//   }, []);

//   // Close dropdown on outside click
//   useEffect(() => {
//     const handleClickOutside = (e: MouseEvent) => {
//       if (
//         dropdownRef.current &&
//         !dropdownRef.current.contains(e.target as Node) &&
//         portalRef.current &&
//         !portalRef.current.contains(e.target as Node)
//       ) {
//         setIndustryOpen(false);
//       }
//     };
//     document.addEventListener("mousedown", handleClickOutside);
//     return () => document.removeEventListener("mousedown", handleClickOutside);
//   }, []);

//   const handleDropdownToggle = () => {
//     if (!industryOpen && triggerRef.current) {
//       const rect = triggerRef.current.getBoundingClientRect();
//       setDropdownPos({
//         top: rect.bottom + window.scrollY + 8,
//         left: rect.left + window.scrollX,
//         width: rect.width,
//       });
//     }
//     setIndustryOpen((prev) => !prev);
//   };

//   const applyFilters = (category: string, industry: string | null) => {
//     let filtered = data;

//     if (category !== "all") {
//       filtered = filtered.filter((p: CaseStudy) =>
//         p.categories.some((c) => c.name === category),
//       );
//     }

//     if (industry) {
//       const selectedCat = industries.find((i) => i.name === industry);
//       const subNames = selectedCat?.subCategories ?? [];
//       filtered = filtered.filter((p: CaseStudy) =>
//         subNames.includes(p.industry),
//       );
//     }

//     setCaseStudies(filtered);
//   };

//   const handleFiltering = (filterValue: string) => {
//     setFilter(filterValue);
//     applyFilters(filterValue, selectedIndustry);
//   };

//   const handleIndustrySelect = (industryName: string | null) => {
//     setSelectedIndustry(industryName);
//     setIndustryOpen(false);
//     applyFilters(filter, industryName);
//   };

//   const [newFilterTags, setNewFilterTags] = useState<string[]>([]);

//   useEffect(() => {
//     if (newFilterTags.length > 0) return;
//     const allExistingCategories = data.map((item) =>
//       item.categories.map((category) => category.name),
//     );
//     if (allExistingCategories) {
//       setNewFilterTags([...new Set(allExistingCategories.flat())]);
//     }
//   }, [data]);

//   return (
//     <>
//       <div className="container mx-auto py-4">
//         <div>
//           <div className="portfolio pb-[50px] pt-[50px] lg:pb-[130px] lg:pt-[130px]">
//             {/* Filter Tabs */}
//             <motion.div
//               initial={{ opacity: 0, y: 50 }}
//               whileInView={{ opacity: 1, y: 0 }}
//               transition={{ duration: 1.5, delay: 0.2 }}
//               viewport={{ once: true }}
//               className="filterbtn no-scrollbar mb-[30px] flex flex-wrap items-center justify-between gap-y-[15px] overflow-visible border-b pb-[20px] md:mb-[50px] md:flex-nowrap"
//             >
//               {/* Left: Tab Filters */}
//               <div
//                 ref={tabsRef}
//                 className="filter-tabs flex min-w-0 cursor-grab gap-[20px] overflow-x-auto [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
//               >
//                 <button
//                   onClick={() => handleFiltering("all")}
//                   className={`whitespace-nowrap rounded-[57px] px-[20px] py-[11.5px] text-[16px] leading-[1.5] transition-colors ${
//                     filter === "all"
//                       ? "bg-[#1A1A1A] text-white"
//                       : "bg-[#F2F2F2] text-[#77787B]"
//                   }`}
//                 >
//                   View All
//                 </button>

//                 {newFilterTags.map((item, index) => (
//                   <button
//                     key={index}
//                     onClick={() => handleFiltering(item)}
//                     className={`whitespace-nowrap rounded-[57px] px-[20px] py-[11.5px] text-[16px] leading-[1.5] transition-colors ${
//                       filter === item
//                         ? "bg-[#1A1A1A] text-white"
//                         : "bg-[#F2F2F2] text-[#77787B]"
//                     }`}
//                   >
//                     {item}
//                   </button>
//                 ))}
//               </div>

//               {/* Right: Industries Dropdown */}
//               <div
//                 className="relative ml-auto shrink-0 md:ml-[20px]"
//                 ref={dropdownRef}
//               >
//                 <button
//                   ref={triggerRef}
//                   onClick={handleDropdownToggle}
//                   className="flex w-[247px] max-w-[247px] items-center gap-[10px] rounded-[57px] border border-[#77787B] px-[20px] py-[11.5px] text-[16px] leading-[1.5] text-[#77787B]"
//                 >
//                   <span className="flex-1 truncate text-left">
//                     {selectedIndustry ?? "Industries"}
//                   </span>
//                   <img
//                     src="/assets/drop-down-arrow.svg"
//                     alt="dropdown icon"
//                     className={`h-[8px] w-auto shrink-0 transition-transform duration-200 ${
//                       industryOpen ? "rotate-180" : ""
//                     }`}
//                   />
//                 </button>

//                 {industryOpen &&
//                   typeof window !== "undefined" &&
//                   createPortal(
//                     <div
//                       ref={portalRef}
//                       style={{
//                         position: "absolute",
//                         top: dropdownPos.top,
//                         left: dropdownPos.left,
//                         width: dropdownPos.width,
//                         zIndex: 9999,
//                       }}
//                       className="max-h-[220px] overflow-y-auto rounded-2xl border border-[#E5E5E5] bg-white shadow-lg md:max-h-[300px]"
//                     >
//                       <button
//                         onClick={() => handleIndustrySelect(null)}
//                         className={`w-full px-[20px] py-[11.5px] text-left text-[16px] leading-[1.5] transition-colors hover:bg-[#F2F2F2] ${
//                           selectedIndustry === null
//                             ? "font-medium text-black"
//                             : "text-[#77787B]"
//                         }`}
//                       >
//                         All Industries
//                       </button>
//                       {industries.map((item) => (
//                         <button
//                           key={item._id}
//                           onClick={() => handleIndustrySelect(item.name)}
//                           className={`w-full px-[20px] py-[11.5px] text-left text-[16px] leading-[1.5] transition-colors hover:bg-[#F2F2F2] ${
//                             selectedIndustry === item.name
//                               ? "font-medium text-black"
//                               : "text-[#77787B]"
//                           }`}
//                         >
//                           {item.name}
//                         </button>
//                       ))}
//                     </div>,
//                     document.body,
//                   )}
//               </div>
//             </motion.div>

//             {/* Case Study Items */}
//             <div className="flex flex-col items-center gap-8 lg:grid lg:grid-cols-2 lg:gap-8 lg:gap-y-12">
//               {caseStudies.length > 0 &&
//                 caseStudies.map((item, index) => (
//                   <motion.div
//                     key={index}
//                     className="w-full"
//                     initial="hidden"
//                     whileInView="visible"
//                     viewport={{ once: true, amount: 0.1 }}
//                     variants={{
//                       hidden: { opacity: 0, y: 50 },
//                       visible: {
//                         opacity: 1,
//                         y: 0,
//                         transition: { duration: 1.3, ease: "easeOut" },
//                       },
//                     }}
//                   >
//                     <div className="portfolio-card group relative col-span-1">
//                       <div className="card-img group relative h-[300px] overflow-hidden rounded-md md:h-[500px]">
//                         <Image
//                           src={item.coverImage || item.bannerImage}
//                           alt="image"
//                           className="h-full w-full object-cover"
//                           fill
//                         />
//                         <div className="absolute left-3 top-3 cursor-pointer rounded-3xl bg-gray1 px-4 py-2 duration-200 duration-300 ease-in-out ease-in-out group-hover:z-[1] group-hover:-translate-x-[-3px] group-hover:bg-primary group-hover:shadow-lg md:left-5 md:top-5">
//                           <div className="uppercase text-white">
//                             <p className="text-font14 text-white">
//                               {item.industry}
//                             </p>
//                           </div>
//                         </div>
//                         <div className="absolute bottom-0 z-[1] mt-3 p-5 md:mt-4">
//                           <h3 className="text-30 mb-1 text-white duration-200 duration-200 duration-300 ease-in-out ease-in-out ease-in-out md:mb-2">
//                             {item.companyName}
//                           </h3>
//                           <div className="flex gap-1">
//                             {item?.channels?.map((channel, index) => (
//                               <p
//                                 key={index}
//                                 className="text-19 text-gray1 text-white duration-200 ease-in-out group-hover:-translate-x-[-3px] group-hover:text-primary"
//                               >
//                                 {index == item.channels.length - 1
//                                   ? channel.channelName
//                                   : channel.channelName + ", "}
//                               </p>
//                             ))}
//                           </div>
//                           {!item?.channels && (
//                             <p className="text-19 text-gray1 text-white duration-200 ease-in-out group-hover:-translate-x-[-3px] group-hover:text-primary">
//                               {item.channelsUsed}
//                             </p>
//                           )}
//                         </div>
//                       </div>

//                       <Link
//                         href={`/case-study/${formatLinkForCaseStudy(item.companyName)}`}
//                         className="absolute top-0 z-[1] h-full w-full"
//                       ></Link>
//                     </div>
//                   </motion.div>
//                 ))}
//             </div>
//           </div>
//         </div>
//       </div>
//     </>
//   );
// };

// export default CaseStudyList;






"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { formatLinkForCaseStudy } from "@/app/helpers/formatLink";
import { CaseStudy } from "@/app/types/CaseStudy";
import { createPortal } from "react-dom";

const CaseStudyList = ({
  data,
  industries,
}: {
  data: CaseStudy[];
  industries: { _id: string; name: string; subCategories: string[] }[];
}) => {
  const caseStudies = data;

  return (
    <>
      <div className="container mx-auto py-4">
        <div>
          <div className="portfolio pb-[50px] pt-[50px] lg:pb-[130px] lg:pt-[130px]">
            {/* Filter Tabs */}
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.5, delay: 0.2 }}
              viewport={{ once: true }}
              className="border-b pb-[20px] md:mb-[50px]"
            >
            </motion.div>

            {/* Case Study Items */}
            <div className="flex flex-col items-center gap-8 lg:grid lg:grid-cols-2 lg:gap-8 lg:gap-y-12">
              {caseStudies.length > 0 &&
                caseStudies.map((item, index) => (
                  <motion.div
                    key={index}
                    className="w-full"
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.1 }}
                    variants={{
                      hidden: { opacity: 0, y: 50 },
                      visible: {
                        opacity: 1,
                        y: 0,
                        transition: { duration: 1.3, ease: "easeOut" },
                      },
                    }}
                  >
                    <div className="portfolio-card group relative col-span-1">
                      <div className="card-img group relative h-[300px] overflow-hidden rounded-md md:h-[500px]">
                        <Image
                          src={item.coverImage || item.bannerImage}
                          alt="image"
                          className="h-full w-full object-cover"
                          fill
                        />
                        <div className="absolute left-3 top-3 cursor-pointer rounded-3xl bg-gray1 px-4 py-2 duration-200 duration-300 ease-in-out ease-in-out group-hover:z-[1] group-hover:-translate-x-[-3px] group-hover:bg-primary group-hover:shadow-lg md:left-5 md:top-5">
                          <div className="uppercase text-white">
                            <p className="text-font14 text-white">
                              {item.industry}
                            </p>
                          </div>
                        </div>
                        <div className="absolute bottom-0 z-[1] mt-3 p-5 md:mt-4">
                          <h3 className="text-30 mb-1 text-white duration-200 duration-200 duration-300 ease-in-out ease-in-out ease-in-out md:mb-2">
                            {item.companyName}
                          </h3>

                          <div className="flex flex-wrap gap-x-1">
                            {item?.categories?.map((category, index) => (
                              <p
                                key={index}
                                className="text-19 text-white duration-300 ease-in-out group-hover:-translate-x-[-3px] group-hover:text-primary"
                              >
                                {category.name}
                                {index < item.categories.length - 1 ? "," : ""}
                              </p>
                            ))}
                          </div>
                        </div>
                      </div>

                      <Link
                        href={`/case-study/${formatLinkForCaseStudy(item.companyName)}`}
                        className="absolute top-0 z-[1] h-full w-full"
                      ></Link>
                    </div>
                  </motion.div>
                ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CaseStudyList;
