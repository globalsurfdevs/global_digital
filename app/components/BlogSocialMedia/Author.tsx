'use client';
import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { StaticImageData } from 'next/image';

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
        <div className="container mx-auto py-[50px] lg:py-[140px]">
          <div className="border-b border-dark mb-[40px]"></div>
          {authors.map((author, idx) => (
            <div key={idx} className="grid grid-cols-1 xl:grid-cols-7 mb-10">
              <div className="col-span-2 mb-5 xl:mb-0"></div>
              <div className="col-span-5">
                <div className="flex items-center gap-[30px]">
                  <div>
                    <Image
                      src={author.profileImage}
                      width={78}
                      height={100}
                      alt={author.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div>
                    <h3 className="text-30 mb-[14px]">{author.name}</h3>
                    <p className="text-[#77787B] text-font16 m-0">{author.role}</p>
                  </div>
                </div>
                <p className="text-[#77787B] my-5 text-font19">{author.description}</p>
                <a href={author.linkedinUrl || '#'} target="_blank"   rel="nofollow">
                  <div className="p-[16px] bg-[#C1C1C1]/30 rounded-[14px] w-[50px] h-[50px] flex items-center justify-center">
                    <Image
                      src={author.linkedinIcon}
                      alt="LinkedIn"
                      className="w-full h-full object-cover"
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
