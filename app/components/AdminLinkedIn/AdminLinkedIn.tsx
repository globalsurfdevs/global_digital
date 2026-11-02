"use client";

import React, { useEffect, useState } from "react";
import { toast } from "sonner";
import { LuMessageSquareShare } from "react-icons/lu";
import SmartPagination from "./Pagination";
import { useSearchParams, useRouter, usePathname } from "next/navigation";
import { MdDelete } from "react-icons/md";
import {
  EmptyState,
  PageHeader,
  SectionCard,
  adminButtonClass,
} from "@/app/components/AdminUI";

type LinkedinSubmission = {
  _id: string;
  linkedinUrl: string;
  agreed: boolean;
  createdAt: string;
};

const AdminLinkedIn = () => {
  const searchParams = useSearchParams();
  const pageFromUrl = Number(searchParams.get("page")) || 1;
  const [submissions, setSubmissions] = useState<LinkedinSubmission[]>([]);
  const [refetch, setRefetch] = useState(false);
  const [page, setPage] = useState(pageFromUrl);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const pathname = usePathname();
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [selectedSubmission, setSelectedSubmission] =
    useState<LinkedinSubmission | null>(null);

  const [fromDate, setFromDate] = useState<string>("");
  const [toDate, setToDate] = useState<string>("");

  const toggleSelect = (id: string) => {
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id],
    );
  };

  const changePage = (newPage: number) => {
    setPage(newPage);
    router.push(`${pathname}?page=${newPage}`);
  };

  useEffect(() => {
    const fetchSubmissions = async () => {
      setLoading(true);
      try {
        const query = new URLSearchParams({
          page: String(page),
          limit: "10",
          ...(fromDate && { from: fromDate }),
          ...(toDate && { to: toDate }),
        });

        const response = await fetch(`/api/linkedin?${query.toString()}`);

        if (response.ok) {
          const data = await response.json();
          setSubmissions(data.data);
          setTotalPages(data.totalPages);
        } else {
          toast.error("Failed to load submissions");
        }
      } catch (error) {
        console.error("Error fetching LinkedIn submissions:", error);
        toast.error("Failed to load submissions");
      } finally {
        setLoading(false);
      }
    };

    fetchSubmissions();
  }, [page, refetch]);

  const toggleSelectAll = () => {
    if (selectedIds.length === submissions.length) {
      setSelectedIds([]);
    } else {
      setSelectedIds(submissions.map((item) => item._id));
    }
  };

  const handleBulkDelete = async () => {
    if (selectedIds.length === 0) {
      toast.error("No submissions selected");
      return;
    }

    try {
      const response = await fetch(`/api/linkedin/bulk-delete`, {
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
      } else {
        toast.error(data.message ?? "Failed to delete submissions");
      }
    } catch (error) {
      console.error(error);
      toast.error("Failed to delete submissions");
    }
  };

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-6">
        <PageHeader
          title="LinkedIn Submissions"
          description="LinkedIn profile submissions. Filter by date or select rows to delete."
          actions={
            <div className="flex flex-wrap items-center gap-3">
              <div>
                {selectedIds.length > 0 && (
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
                )}
              </div>

              <div className="flex items-center gap-3">
                <input
                  type="date"
                  value={fromDate}
                  onChange={(e) => setFromDate(e.target.value)}
                  className="h-10 rounded-lg border border-slate-300 bg-white px-3 text-sm text-slate-700 dark:border-slate-600 dark:bg-slate-800 dark:text-slate-200"
                />
                <input
                  type="date"
                  value={toDate}
                  onChange={(e) => setToDate(e.target.value)}
                  className="h-10 rounded-lg border border-slate-300 bg-white px-3 text-sm text-slate-700 dark:border-slate-600 dark:bg-slate-800 dark:text-slate-200"
                />
                <button
                  onClick={() => {
                    setPage(1);
                    setRefetch((prev) => !prev);
                  }}
                  className={adminButtonClass("dark")}
                >
                  Apply
                </button>
                <button
                  onClick={() => {
                    setFromDate("");
                    setToDate("");
                    setPage(1);
                    setRefetch((prev) => !prev);
                  }}
                  className={adminButtonClass("secondary")}
                >
                  Reset
                </button>
              </div>
            </div>
          }
        />

        <SectionCard title="All submissions" bodyClassName="p-0">
          {loading ? (
            <div className="flex min-h-[200px] items-center justify-center p-5 text-sm text-slate-500 dark:text-slate-400">
              Loading submissions...
            </div>
          ) : submissions.length > 0 ? (
            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm text-slate-700 dark:text-slate-300">
                <thead className="border-b border-slate-200 bg-slate-50 text-xs uppercase tracking-wide text-slate-500 dark:border-slate-700 dark:bg-slate-900/40 dark:text-slate-400">
                  <tr>
                    <th scope="col" className="px-4 py-3">
                      <input
                        type="checkbox"
                        className="size-4 cursor-pointer accent-slate-900 dark:accent-slate-200"
                        checked={selectedIds.length === submissions.length}
                        onChange={toggleSelectAll}
                      />
                    </th>
                    <th scope="col" className="px-4 py-3">
                      LinkedIn URL
                    </th>
                    <th scope="col" className="px-4 py-3">
                      Agreed
                    </th>
                    <th scope="col" className="px-4 py-3">
                      Submitted
                    </th>
                    <th scope="col" className="px-4 py-3 text-center">
                      View
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {submissions.map((item, i) => (
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
                      <td className="break-all px-4 py-3 font-medium text-slate-900 dark:text-white">
                        <a
                          href={item.linkedinUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-blue-600 hover:underline"
                        >
                          {item.linkedinUrl}
                        </a>
                      </td>
                      <td className="px-4 py-3">
                        {item.agreed ? "Yes" : "No"}
                      </td>
                      <td className="px-4 py-3">
                        {new Date(item.createdAt).toLocaleDateString()}
                      </td>
                      <td className="px-4 py-3 text-center">
                        <button
                          onClick={() => setSelectedSubmission(item)}
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
              <EmptyState title="No submissions available" />
            </div>
          )}
        </SectionCard>

        {selectedSubmission && (
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

            <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
              <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
                <div className="relative flex transform flex-col gap-5 overflow-hidden rounded-xl border border-slate-200 bg-white p-6 text-left shadow-xl transition-all dark:border-slate-700 dark:bg-slate-800 sm:my-8 sm:w-full sm:max-w-lg">
                  <h3 className="border-b border-slate-200 pb-4 text-base font-semibold text-slate-900 dark:border-slate-700 dark:text-white">
                    Submission details
                  </h3>
                  <div className="grid grid-cols-1 gap-4 text-sm">
                    <div className="flex flex-col gap-1">
                      <label className="text-xs font-medium uppercase tracking-wide text-slate-500 dark:text-slate-400">
                        LinkedIn URL
                      </label>

                      <a
                        href={selectedSubmission.linkedinUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="break-all text-blue-600 hover:underline"
                      >
                        {selectedSubmission.linkedinUrl}
                      </a>
                    </div>
                    <div className="flex flex-col gap-1">
                      <label className="text-xs font-medium uppercase tracking-wide text-slate-500 dark:text-slate-400">
                        Agreed to screening
                      </label>
                      <span className="text-slate-900 dark:text-white">
                        {selectedSubmission.agreed ? "Yes" : "No"}
                      </span>
                    </div>
                    <div className="flex flex-col gap-1">
                      <label className="text-xs font-medium uppercase tracking-wide text-slate-500 dark:text-slate-400">
                        Submitted on
                      </label>
                      <span className="text-slate-900 dark:text-white">
                        {new Date(
                          selectedSubmission.createdAt,
                        ).toLocaleString()}
                      </span>
                    </div>
                  </div>
                  <div className="flex justify-end border-t border-slate-200 pt-4 dark:border-slate-700">
                    <button
                      type="button"
                      className={adminButtonClass("secondary")}
                      onClick={() => setSelectedSubmission(null)}
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

      {submissions.length > 0 && (
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

export default AdminLinkedIn;
