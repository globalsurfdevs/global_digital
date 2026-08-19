"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { IoIosClose } from "react-icons/io";
import { toast } from "sonner";
import { CaseStudy } from "@/app/types/CaseStudy";

const AdminCaseStudy = () => {
  const [caseStudies, setCaseStudies] = useState([]);
  const [refetch, setRefetch] = useState(false);

  useEffect(() => {
    const fetchCaseStudyData = async () => {
      try {
        const response = await fetch(`/api/case-study`);
        if (response.ok) {
          const data = await response.json();
          console.log(data.caseStudy);
          setCaseStudies(data.caseStudy);
        } else {
          console.error("Failed to fetch case study data");
        }
      } catch (error) {
        console.error("Error fetching case study data:", error);
      }
    };

    fetchCaseStudyData();
  }, [refetch]);

  const handleCaseStudyDelete = async (id: number) => {
    try {
      const response = await fetch(`/api/case-study?id=${id}`, {
        method: "DELETE",
      });
      if (response.ok) {
        const data = await response.json();
        toast.success(data.message);
        setRefetch((prev) => !prev);
      } else {
        console.error("Failed to remove portfolio data");
      }
    } catch (error) {
      console.error("Error deleting portfolio:", error);
    }
  };

  return (
    <div className="flex flex-col gap-5">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl">List of companies</h1>
        <Link href={"/admin/case-study/add"}>
          <button className="rounded-xl bg-blue-950 p-2 text-white">
            Add a new case study
          </button>
        </Link>
      </div>
      <div className="flex flex-col gap-3">
        {caseStudies.length > 0 ? (
          caseStudies.map((item: CaseStudy) => (
            <div className="relative w-full" key={item.id}>
              <Link
                href={`/admin/case-study/${item.id}`}
                className="flex h-32 w-full flex-col items-center justify-between rounded-lg border border-gray-200 bg-white shadow hover:bg-gray-100 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700 md:flex-row"
              >
                <div className="flex h-full">
                  <img
                    className="h-full w-full rounded-t-lg object-cover md:h-full md:w-48 md:rounded-none md:rounded-s-lg"
                    src={item.coverImage}
                    alt=""
                  />
                  <div className="flex flex-col items-center justify-between p-4 leading-normal">
                    <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                      {item.heading}
                    </h5>
                  </div>
                </div>
              </Link>

              <div className="absolute right-5 top-5 flex h-full justify-start p-2">
                <div
                  className="flex size-5 items-center justify-center rounded-full bg-red-600 text-xl text-white"
                  onClick={() => handleCaseStudyDelete(item.id)}
                >
                  <IoIosClose />
                </div>
              </div>
            </div>
          ))
        ) : (
          <div>No case studies available</div>
        )}
      </div>
    </div>
  );
};

export default AdminCaseStudy;
