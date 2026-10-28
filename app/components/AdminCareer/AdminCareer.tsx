"use client";

import { LoadingState } from "@/app/components/AdminUI";
import React, { useEffect, useState } from "react";
import { toast } from "sonner";
import { LuMessageSquareShare } from "react-icons/lu";
import SmartPagination from "../AdminEnquiry/Pagination";
import { useSearchParams, useRouter, usePathname } from "next/navigation";
import { MdDelete } from "react-icons/md";
import { FaFilePdf } from "react-icons/fa6";
import Link from "next/link";
import {
  EmptyState,
  PageHeader,
  SectionCard,
  adminButtonClass,
} from "@/app/components/AdminUI";

type Enquiry = {
  _id: string;
  name: string;
  email: string;
  jobTitle: string;
  experience: string;
  currentSalary: string;
  expectedSalary: string;
  noticePeriod: string;
  phone: string;
  resume: string;
};

const AdminEnquiry = () => {
  const searchParams = useSearchParams();
  const pageFromUrl = Number(searchParams.get("page")) || 1;
  const [enquiries, setEnquiries] = useState<Enquiry[] | []>([]);
  const [refetch, setRefetch] = useState(false);
  const [page, setPage] = useState(pageFromUrl);
  const [totalPages, setTotalPages] = useState(1);
  const router = useRouter();
  const pathname = usePathname();
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [selectedEnquiry, setSelectedEnquiry] = useState<Enquiry | null>(null);

  const toggleSelect = (id: string) => {
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id],
    );
  };

  const changePage = (newPage: number) => {
    setPage(newPage);
    router.push(`${pathname}?page=${newPage}`);
  };

  // True until the first load finishes, so the empty message never shows while data is loading.
  const [listLoading, setListLoading] = useState(true);
  useEffect(() => {
    const fetchEnquiriesData = async () => {
      try {
        const response = await fetch(`/api/career?page=${page}&limit=10`);

        if (response.ok) {
          const data = await response.json();
          setEnquiries(data.data);
          setTotalPages(data.totalPages);
        }
      } catch (error) {
        console.error("Error fetching enquiries:", error);
      }
    };

    fetchEnquiriesData().finally(() => setListLoading(false));
  }, [page, refetch]);

  const toggleSelectAll = () => {
    if (selectedIds.length === enquiries.length) {
      setSelectedIds([]);
    } else {
      setSelectedIds(enquiries.map((item) => item._id));
    }
  };

  const handleBulkDelete = async () => {
    if (selectedIds.length === 0) {
      toast.error("No enquiries selected");
      return;
    }

    try {
      const response = await fetch(`/api/career/bulk-delete`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ ids: selectedIds }),
      });

      const data = await response.json();

      if (response.ok) {
        toast.success(data.message);
        setSelectedIds([]);
        setRefetch((prev) => !prev);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const exportToCSV = () => {
    if (!enquiries.length) {
      toast.error("No data to export");
      return;
    }

    const headers = [
      "Name",
      "Email",
      "Job Title",
      "Experience",
      "Current Salary",
      "Expected Salary",
      "Notice Period",
      "Phone",
      "Resume",
    ];

    const rows = enquiries.map((item) => [
      item.name,
      item.email,
      item.jobTitle,
      item.experience,
      item.currentSalary,
      item.expectedSalary,
      item.noticePeriod,
      item.phone,
      item.resume,
    ]);

    const csvContent = [headers, ...rows]
      .map((row) => row.map((val) => `"${val}"`).join(","))
      .join("\n");

    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });

    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");

    link.href = url;
    link.download = "career-enquiries.csv";
    link.click();
  };

  return (
    <div className="flex flex-col gap-6">
      <PageHeader
        title="Career Applications"
        description="Job applications submitted from the careers page. Select rows to delete, or export the current page to CSV."
        actions={
          <button onClick={exportToCSV} className={adminButtonClass("dark")}>
            Export CSV
          </button>
        }
      />

      <div className="flex flex-col gap-6">
        <SectionCard
          title="All applications"
          bodyClassName="p-0"
          actions={
            selectedIds.length > 0 && (
              <div className="relative inline-flex size-10 items-center justify-center rounded-lg border border-red-200 bg-red-50 dark:border-red-500/30 dark:bg-red-500/10">
                <MdDelete
                  className="cursor-pointer text-2xl text-red-600"
                  title="Delete selected"
                  onClick={handleBulkDelete}
                />
                <span className="absolute -right-2 -top-2 flex h-[15px] w-[15px] items-center justify-center rounded-full bg-red-600 text-[10px] text-white">
                  {selectedIds.length}
                </span>
              </div>
            )
          }
        >
          {enquiries && enquiries.length > 0 ? (
            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm text-slate-700 dark:text-slate-300">
                <thead className="border-b border-slate-200 bg-slate-50 text-xs uppercase tracking-wide text-slate-500 dark:border-slate-700 dark:bg-slate-900/40 dark:text-slate-400">
                  <tr>
                    <th scope="col" className="px-4 py-3">
                      <input
                        type="checkbox"
                        className="size-4 cursor-pointer accent-slate-900 dark:accent-slate-200"
                        checked={selectedIds.length === enquiries.length}
                        onChange={toggleSelectAll}
                      />
                    </th>
                    <th scope="col" className="px-4 py-3">
                      Name
                    </th>
                    <th scope="col" className="px-4 py-3">
                      Email
                    </th>
                    <th scope="col" className="px-4 py-3">
                      Job Title
                    </th>
                    <th scope="col" className="px-4 py-3">
                      Experience
                    </th>
                    <th scope="col" className="px-4 py-3">
                      Phone
                    </th>
                    <th scope="col" className="px-4 py-3 text-center">
                      Resume
                    </th>
                    <th scope="col" className="px-4 py-3 text-center">
                      View
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {enquiries.map((item, i) => (
                    <tr
                      key={item._id ?? i}
                      className="border-b border-slate-100 transition-colors last:border-b-0 hover:bg-slate-50 dark:border-slate-700 dark:hover:bg-slate-700/40"
                    >
                      <td className="px-4 py-3">
                        <input
                          type="checkbox"
                          className="size-4 cursor-pointer accent-slate-900 dark:accent-slate-200"
                          checked={selectedIds.includes(item._id)}
                          onChange={() => toggleSelect(item._id)}
                        />
                      </td>
                      <td className="px-4 py-3 font-medium text-slate-900 dark:text-white">
                        {item.name}
                      </td>
                      <td className="px-4 py-3">{item.email}</td>
                      <td className="px-4 py-3">{item.jobTitle}</td>
                      <td className="px-4 py-3">{item.experience}</td>
                      <td className="px-4 py-3">{item.phone}</td>
                      <td className="px-4 py-3 text-center">
                        {item.resume ? (
                          <Link href={item.resume} target="_blank">
                            <FaFilePdf className="mx-auto text-lg text-red-600" />
                          </Link>
                        ) : (
                          "—"
                        )}
                      </td>
                      <td className="px-4 py-3 text-center">
                        <button
                          onClick={() => setSelectedEnquiry(item)}
                          title="View details"
                          className="inline-flex size-8 items-center justify-center rounded-lg text-slate-500 transition-colors hover:bg-slate-100 hover:text-slate-900 dark:text-slate-400 dark:hover:bg-slate-700 dark:hover:text-white"
                        >
                          <LuMessageSquareShare className="text-lg" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="p-5">
              {listLoading ? (
                <LoadingState />
              ) : (
                <EmptyState title="No enquiries available" />
              )}
            </div>
          )}
        </SectionCard>

        {selectedEnquiry && (
          <div
            className="relative z-10"
            aria-labelledby="modal-title"
            role="dialog"
            aria-modal="true"
          >
            <div
              className="fixed inset-0 bg-slate-900/50 transition-opacity"
              aria-hidden="true"
            ></div>

            <div className="fixed inset-0 z-10 mt-20 w-screen overflow-y-auto">
              <div className="flex items-end justify-center p-4 text-center sm:items-center sm:p-0">
                <div className="relative flex transform flex-col gap-5 overflow-hidden rounded-xl border border-slate-200 bg-white p-6 text-left shadow-xl transition-all dark:border-slate-700 dark:bg-slate-800 sm:my-8 sm:w-full sm:max-w-lg">
                  <h3 className="border-b border-slate-200 pb-4 text-base font-semibold text-slate-900 dark:border-slate-700 dark:text-white">
                    Application details
                  </h3>
                  <div className="grid h-[300px] grid-cols-1 gap-4 overflow-auto text-sm">
                    <div className="flex flex-col gap-1">
                      <label className="text-xs font-medium uppercase tracking-wide text-slate-500 dark:text-slate-400">
                        Full Name
                      </label>
                      <span className="text-slate-900 dark:text-white">
                        {selectedEnquiry.name}
                      </span>
                    </div>
                    <div className="flex flex-col gap-1">
                      <label className="text-xs font-medium uppercase tracking-wide text-slate-500 dark:text-slate-400">
                        Email
                      </label>
                      <span className="text-slate-900 dark:text-white">
                        {selectedEnquiry.email}
                      </span>
                    </div>
                    <div className="flex flex-col gap-1">
                      <label className="text-xs font-medium uppercase tracking-wide text-slate-500 dark:text-slate-400">
                        Job Title
                      </label>
                      <span className="text-slate-900 dark:text-white">
                        {selectedEnquiry.jobTitle}
                      </span>
                    </div>
                    <div className="flex flex-col gap-1">
                      <label className="text-xs font-medium uppercase tracking-wide text-slate-500 dark:text-slate-400">
                        Experience
                      </label>
                      <span className="text-slate-900 dark:text-white">
                        {selectedEnquiry.experience}
                      </span>
                    </div>
                    <div className="flex flex-col gap-1">
                      <label className="text-xs font-medium uppercase tracking-wide text-slate-500 dark:text-slate-400">
                        Current Salary
                      </label>
                      <span className="text-slate-900 dark:text-white">
                        {selectedEnquiry.currentSalary}
                      </span>
                    </div>
                    <div className="flex flex-col gap-1">
                      <label className="text-xs font-medium uppercase tracking-wide text-slate-500 dark:text-slate-400">
                        Expected Salary
                      </label>
                      <span className="text-slate-900 dark:text-white">
                        {selectedEnquiry.expectedSalary}
                      </span>
                    </div>
                    <div className="flex flex-col gap-1">
                      <label className="text-xs font-medium uppercase tracking-wide text-slate-500 dark:text-slate-400">
                        Notice Period
                      </label>
                      <span className="break-all text-slate-900 dark:text-white">
                        {selectedEnquiry.noticePeriod}
                      </span>
                    </div>
                    <div className="flex flex-col gap-1">
                      <label className="text-xs font-medium uppercase tracking-wide text-slate-500 dark:text-slate-400">
                        Phone
                      </label>
                      <span className="break-all text-slate-900 dark:text-white">
                        {selectedEnquiry.phone}
                      </span>
                    </div>
                    <div className="flex flex-col gap-1">
                      <label className="text-xs font-medium uppercase tracking-wide text-slate-500 dark:text-slate-400">
                        Resume
                      </label>
                      <Link href={selectedEnquiry.resume} target="_blank">
                        <FaFilePdf />
                      </Link>
                    </div>
                  </div>
                  <div className="flex justify-end border-t border-slate-200 pt-4 dark:border-slate-700">
                    <button
                      type="button"
                      className={adminButtonClass("secondary")}
                      onClick={() => setSelectedEnquiry(null)}
                    >
                      Close
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {enquiries && enquiries.length > 0 && (
        <div className="flex justify-center pb-4">
          <SmartPagination
            page={page}
            totalPages={totalPages}
            setPage={changePage}
          />
        </div>
      )}
    </div>
  );
};

export default AdminEnquiry;
