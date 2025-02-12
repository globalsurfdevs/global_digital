"use client";
import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import { career } from "../../../data/career";
import Link from "next/link";
import Button from "@/app/components/Button/Button";
import { notFound } from 'next/navigation';
import { ClientPageRoot } from "next/dist/client/components/client-page";

export default function CareerDetailsPage() {
  const params = useParams(); // Use the custom useParams hook
  const { url } = params; // Extract the 'url' parameter

  // Find the item based on the 'url' parameter
  // const item = career.find((b) => b.url === url);
  const [jobs, setJobs] = useState<{jobTitle:string}[]|null>(null);

  useEffect(() => {
  const fetchJobsData = async () => {
    try {
      const response = await fetch(`/api/jobs?slug=${url}`);
      console.log(response)
      if (response.ok) {

          const data = await response.json();
          // console.log("data",data)
            setJobs(data.job)

        } else {
            console.error("Failed to fetch job data");
        }
    } catch (error) {
        console.error("Error fetching job data:", error);
    }
}

    fetchJobsData()

          }, []); // Runs when 'item' changes

  // useEffect(() => {

  //   if (!jobs) {
  //     // return <p>Item not found!</p>;
  //     notFound()
  //   }
  // }, []);

  const [file, setFile] = useState<File | null>(null);
  const [error, setError] = useState('');
  const [fileName, setFileName] = useState('');  // This will hold the file name if you're using a file input.

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files ? e.target.files[0] : null; // Safely access files

    if (selectedFile) {
      setFile(selectedFile);
      setError("");
    }
  };
  return (
    <div className="container mx-auto py-4">
      <div className="pt-[30px] lg:pt-[100px] ">
        <h1 className="title-65 mb-5 border-b pb-5 md:mb-[50px] md:pb-[25px] ">
        Looking for <br></br>{jobs && jobs[0]?.jobTitle}
        </h1>
        <p className="text-19 text-gray1">  Our Team will get in touch with you.</p>
        <div className="  pt-[15px] lg:pt-[50px] pb-[40px] lg:pb-[50px]">
           <form action='https://forms.zohopublic.com/Globalsurf/form/GlobalsurfCareerForm1/formperma/9ItYPvjmFDbF9ve90H81K2Yp-Ht-6Xpx7-2f49b7ook/htmlRecords/submit' name='form' id='form' method='POST' acceptCharset='UTF-8' encType='multipart/form-data'>
            <input type="hidden" name="zf_referrer_name" value="" />
            <input type="hidden" name="zf_redirect_url" value="" />
            <input type="hidden" name="zc_gad" value="" />
            <div className="mb-[30px]">
                <input
                  type="text"
                  name="SingleLine1"
                  required
                  maxLength={255}
                  className="w-full rounded-lg border border-gray-300 p-3 focus:border-dgray focus:outline-none focus:ring-1 focus:ring-dgray"
                  placeholder=""
                defaultValue={jobs && jobs[0]?.jobTitle || ""}
                readOnly
                />
              </div>
            <div className="md:grid md:grid-cols-2 md:gap-5">
              <div className="mb-[30px]">
                <input
                  type="text"
                  name="SingleLine"
                  maxLength={255}
                  className="w-full rounded-lg border border-gray-300 p-3 focus:border-dgray focus:outline-none focus:ring-1 focus:ring-dgray"
                  placeholder="Name"
                  required
                />
              </div>
              <div className="mb-[30px]">
                <input
                  type="number"
                  name="SingleLine2"
                  maxLength={255}
                  className="w-full rounded-lg border border-gray-300 p-3 focus:border-dgray focus:outline-none focus:ring-1 focus:ring-dgray"
                  placeholder="Experience in Years"
                  required
                />
              </div>
            </div>
            <div className="md:grid md:grid-cols-2 md:gap-5">
              <div className="mb-[30px]">
                <input
                  type="text"
                  name="SingleLine3"
                  maxLength={255}
                  className="w-full rounded-lg border border-gray-300 p-3 focus:border-dgray focus:outline-none focus:ring-1 focus:ring-dgray"
                  placeholder="Current Salary"
                  required
                />
              </div>
              <div className="mb-[30px]">
                <input
                  type="text"
                  name="SingleLine4"
                  maxLength={255}
                  className="w-full rounded-lg border border-gray-300 p-3 focus:border-dgray focus:outline-none focus:ring-1 focus:ring-dgray"
                  placeholder="Expected Salary"
                  required
                />
              </div>
            </div>
            <div className="md:grid md:grid-cols-2 md:gap-5">
              <div className="mb-[30px]">
                <input
                  type="text"
                  name="SingleLine5"
                  maxLength={255}
                  className="w-full rounded-lg border border-gray-300 p-3 focus:border-dgray focus:outline-none focus:ring-1 focus:ring-dgray"
                  placeholder="Notice Period"
                  required
                />
              </div>
              <div className="mb-[30px]">
                <input
                  type="number"
                  name="PhoneNumber_countrycode"
                  id="international_PhoneNumber_countrycode"
                  maxLength={20}
                  className="w-full rounded-lg border border-gray-300 p-3 focus:border-dgray focus:outline-none focus:ring-1 focus:ring-dgray"
                  placeholder="Contact Number"
                  required
                />
              </div>
            </div>
            <div className="md:grid md:grid-cols-2 md:gap-5">
              <div className="mb-[30px]">
                <input
                  type="email"
                  name="Email"
                  required
                  maxLength={255}
                  className="w-full rounded-lg border border-gray-300 p-3 focus:border-dgray focus:outline-none focus:ring-1 focus:ring-dgray"
                  placeholder="Email"
                />
              </div>
              <div className="mb-[30px] flex items-center">
              <input
                  type="file"
                  name="FileUpload"
                  onChange={handleFileChange}
                  required
                accept="image/*,application/pdf" // Accept specific file types
              />
              </div>
            </div>



            <button
              type="submit"
              className="w-fit rounded-[55px] bg-primary md:px-[40px] md:py-[10px]  px-[40px] py-[10px] font-medium text-white transition duration-300 ease-in-out hover:bg-dgray  hover:text-primary "
            >
              Submit
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
