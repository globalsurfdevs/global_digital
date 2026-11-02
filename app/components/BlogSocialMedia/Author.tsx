"use client";
import React from "react";
import Image from "next/image";
import Link from "next/link";
import { StaticImageData } from "next/image";

interface AuthorData {
  name: string;
  role: string;
  description: string;
  profileImage: StaticImageData;
  linkedinIcon: StaticImageData;
  linkedinUrl?: string;
}

interface AuthorProps {
  data: AuthorData | AuthorData[];
}

const Author: React.FC<AuthorProps> = ({ data }) => {
  const authors = Array.isArray(data) ? data : [data]; // ensure always an array

  return (
    <section>
      <div className="container mx-auto py-[50px] lg:py-[100px]">
        <div className="border-dark mb-[40px] mt-[40px] border-b lg:mt-0"></div>
        {authors.map((author, idx) => (
          <div key={idx} className="mb-10 grid">
            <div className="col-span-2 mb-5 xl:mb-0"></div>
            <div className="col-span-5">
              <div className="flex items-center gap-[30px]">
                <div>
                  <Image
                    src={author.profileImage}
                    width={78}
                    height={100}
                    alt={author.name}
                    className="w-full object-cover lg:h-full"
                  />
                </div>
                <div>
                  <a
                    href={author.linkedinUrl || "#"}
                    target="_blank"
                    rel="nofollow"
                  >
                    <h3 className="text-30 mb-[14px]">{author.name}</h3>
                  </a>
                  <p className="m-0 text-font16 text-[#77787B]">
                    {author.role}
                  </p>
                </div>
              </div>

              <p className="my-5 text-font19 text-[#77787B]">
                {author.description}
              </p>

              <a
                href={author.linkedinUrl || "#"}
                target="_blank"
                rel="nofollow"
              >
                <div className="flex h-[50px] w-[50px] items-center justify-center rounded-[14px] bg-[#C1C1C1]/30 p-[16px]">
                  <Image
                    src={author.linkedinIcon}
                    alt="LinkedIn"
                    className="h-full w-full object-cover"
                  />
                </div>
              </a>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Author;
