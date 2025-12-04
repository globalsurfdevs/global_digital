'use client'
import React from 'react';
import Image, { StaticImageData } from 'next/image';

export interface ScrollSectionCta {
  label?: string;       // <-- made optional
  href?: string;
  onClick?: () => void;
}

export interface ScrollSectionProps {
  title: string;
  paragraphs?: string[];
  image?: StaticImageData;
  imageAlt?: string;
  cta?: ScrollSectionCta;
}

const ScrollSection: React.FC<ScrollSectionProps> = ({
  title,
  paragraphs = [],
  image,
  imageAlt = '',
  cta,
}) => {
  const showButton = cta?.label && cta.label.trim() !== '';

  return (
    <section>
      <div className="container mx-auto pt-[50px] lg:pt-[140px]">
        <div className="grid grid-cols-1 xl:grid-cols-7">
          <div className="col-span-2 mb-5 xl:mb-0" />
          <div className="col-span-5 w-full">
            <div className="flex flex-col lg:flex-row gap-6 lg:gap-12 items-start lg:items-center">
              <div className="flex-1">
                <h2 className="title-65 mb-[40px]">{title}</h2>

                {paragraphs.map((p, idx) => (
                  <p key={idx} className="text-[#77787B] mb-2 text-font19" dangerouslySetInnerHTML={{ __html: p }} />
                ))}

                {showButton && (
                  <button
                    onClick={cta?.onClick}
                    className="z-2 z-1 group relative flex w-fit items-center gap-3 border border-l-0 border-r-0 border-t-0 border-transparent p-0 pb-3 
                               before:absolute before:bottom-0 before:left-0 before:h-[1px] before:w-full before:bg-black before:transition-all 
                               before:duration-300 before:ease-in-out 
                               after:absolute after:bottom-0 after:right-0 after:h-[1px] after:w-full after:bg-orange-500 after:transition-all 
                               after:duration-300 after:ease-in-out 
                               hover:border-b-white hover:after:w-0 lg:mt-[30px] mt-3"
                  >
                    <div className="relative">
                      <p className="duration-200 text-sm font-medium uppercase ease-in-out group-hover:text-primary md:text-[16px]">
                        {cta.label}
                      </p>
                    </div>

                    <svg
                      width="10"
                      height="10"
                      viewBox="0 0 20 20"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                      className="duration-200 ease-in-out group-hover:scale-125"
                    >
                      <g clipPath="url(#clip0_65_58)">
                        <path
                          d="M18.7892 1.2749L0.699219 19.0149"
                          stroke="#E53F30"
                          strokeWidth="3"
                          strokeMiterlimit="10"
                          className="group-hover:stroke-black"
                        ></path>
                        <path
                          d="M0.699219 1.2749H18.7892V18.6649"
                          stroke="#E53F30"
                          strokeWidth="3"
                          strokeMiterlimit="10"
                          className="group-hover:stroke-black"
                        ></path>
                      </g>
                      <defs>
                        <clipPath id="clip0_65_58">
                          <rect
                            width="19.79"
                            height="19.45"
                            fill="white"
                            transform="translate(0 0.274902)"
                          ></rect>
                        </clipPath>
                      </defs>
                    </svg>
                  </button>
                )}
              </div>

              {image && (
                <div className="flex-1 lg:h-[553px]">
                  <Image
                    src={image}
                    alt={imageAlt}
                    className="w-full h-[300px] md:h-[500px] lg:h-full object-cover"
                  />
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ScrollSection;
