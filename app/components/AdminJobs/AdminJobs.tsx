"use client";

import { JobInputType } from "@/app/types/JobInputType";
import { JobType } from "@/app/types/JobType";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { BiTrash } from "react-icons/bi";
import { IoIosClose } from "react-icons/io";
import { toast } from "sonner";

const AdminJobs = () => {
  const [jobs, setJobs] = useState<JobType[] | []>([]);
  const [refetch, setRefetch] = useState(false);

  useEffect(() => {
    const fetchJobsData = async () => {
      try {
        const response = await fetch(`/api/jobs`);
        if (response.ok) {
          const data = await response.json();
          setJobs(data.jobs);
        } else {
          console.error("Failed to fetch job data");
        }
      } catch (error) {
        console.error("Error fetching job data:", error);
      }
    };

    fetchJobsData();
  }, [refetch]);

  const handleDeleteJob = async (id: string, e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    try {
      const response = await fetch(`/api/jobs?id=${id}`, {
        method: "DELETE",
      });
      if (response.ok) {
        const data = await response.json();
        toast.success(data.message);
        setRefetch((prev) => !prev);
      } else {
        console.error("Failed to remove job data");
      }
    } catch (error) {
      console.error("Error deleting job:", error);
    }
  };

  return (
    <div className="flex flex-col gap-5">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl">Available jobs</h1>
        <Link href={"/admin/jobs/add"}>
          <button className="rounded-xl bg-blue-950 p-2 text-white">
            Add a new job
          </button>
        </Link>
      </div>

      <div className="relative overflow-x-auto rounded-lg border border-gray-200 shadow-md dark:border-gray-700">
        <table className="w-full text-left text-sm text-gray-700 dark:text-gray-300">
          <thead className="bg-gray-50 text-xs uppercase text-gray-500 dark:bg-gray-800 dark:text-gray-400">
            <tr>
              <th scope="col" className="px-6 py-3">
                Job Title
              </th>
              <th scope="col" className="px-6 py-3">
                Team
              </th>
              <th scope="col" className="px-6 py-3 text-right">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {jobs && jobs.length > 0 ? (
              jobs.map((item) => (
                <tr
                  key={item._id}
                  className="border-b bg-white hover:bg-gray-50 dark:border-gray-700 dark:bg-gray-900 dark:hover:bg-gray-800"
                >
                  <td className="px-6 py-4">
                    <Link
                      href={`/admin/jobs/${item._id}`}
                      className="font-semibold text-gray-900 hover:underline dark:text-white"
                    >
                      {item.jobTitle}
                    </Link>
                  </td>
                  <td className="px-6 py-4">{item.team}</td>
                  <td className="px-6 py-4 text-right">
                    <button
                      onClick={(e) => handleDeleteJob(item._id, e)}
                      className="ml-auto flex size-6 items-center justify-center rounded-full bg-red-600 text-lg text-white transition-colors hover:bg-red-700"
                      aria-label="Delete job"
                    >
                      <BiTrash />
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={3} className="px-6 py-4 text-center text-gray-500">
                  No jobs available
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminJobs;
