"use client";

import React, { useEffect, useState } from "react";
import { toast } from "sonner";
import { LuMessageSquareShare } from "react-icons/lu";
import SmartPagination from "./Pagination";
import { useSearchParams, useRouter, usePathname } from "next/navigation";
import { MdDelete } from "react-icons/md";

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
    <div className="flex flex-col gap-5">
      <div className="flex min-h-[calc(100vh-200px)] flex-col gap-3">
        <div className="flex items-center justify-between gap-10 px-1">
          <div className="flex items-center justify-between">
            <h1 className="text-xl">LinkedIn Submissions</h1>
          </div>
          <div className="flex items-center gap-5">
            <div>
              {selectedIds.length > 0 && (
                <div className="relative inline-flex">
                  <MdDelete
                    className="cursor-pointer text-2xl text-red-600"
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
                className="rounded border px-2 py-1"
              />
              <input
                type="date"
                value={toDate}
                onChange={(e) => setToDate(e.target.value)}
                className="rounded border px-2 py-1"
              />
              <button
                onClick={() => {
                  setPage(1);
                  setRefetch((prev) => !prev);
                }}
                className="rounded bg-black px-3 py-1 text-white"
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
                className="rounded border px-3 py-1"
              >
                Reset
              </button>
            </div>
          </div>
        </div>

        {loading ? (
          <div>Loading submissions...</div>
        ) : submissions.length > 0 ? (
          <div className="overflow-x-auto rounded-lg border border-gray-200 shadow dark:border-gray-700">
            <table className="w-full text-left text-sm text-gray-700 dark:text-gray-300">
              <thead className="bg-gray-100 text-xs uppercase text-gray-700 dark:bg-gray-800 dark:text-gray-300">
                <tr>
                  <th scope="col" className="px-4 py-3">
                    <input
                      type="checkbox"
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
                    className="border-b border-gray-200 bg-white hover:bg-gray-50 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700"
                  >
                    <td className="px-4 py-3">
                      <input
                        type="checkbox"
                        checked={selectedIds.includes(item._id)}
                        onChange={() => toggleSelect(item._id)}
                      />
                    </td>
                    <td className="break-all px-4 py-3 font-medium text-gray-900 dark:text-white">
                      <a
                        href={item.linkedinUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-600 hover:underline"
                      >
                        {item.linkedinUrl}
                      </a>
                    </td>
                    <td className="px-4 py-3">{item.agreed ? "Yes" : "No"}</td>
                    <td className="px-4 py-3">
                      {new Date(item.createdAt).toLocaleDateString()}
                    </td>
                    <td className="px-4 py-3 text-center">
                      <button onClick={() => setSelectedSubmission(item)}>
                        <LuMessageSquareShare className="mx-auto text-lg" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div>No submissions available</div>
        )}

        {selectedSubmission && (
          <div
            className="relative z-10"
            aria-labelledby="modal-title"
            role="dialog"
            aria-modal="true"
          >
            <div
              className="fixed inset-0 bg-gray-500/75 transition-opacity"
              aria-hidden="true"
            ></div>

            <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
              <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
                <div className="relative flex transform flex-col gap-5 overflow-hidden rounded-lg bg-white p-5 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
                  <div className="grid grid-cols-1 gap-4 text-sm">
                    <div className="flex flex-col">
                      <label className="font-semibold text-gray-600">
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
                    <div className="flex flex-col">
                      <label className="font-semibold text-gray-600">
                        Agreed to screening
                      </label>
                      <span className="text-gray-900">
                        {selectedSubmission.agreed ? "Yes" : "No"}
                      </span>
                    </div>
                    <div className="flex flex-col">
                      <label className="font-semibold text-gray-600">
                        Submitted on
                      </label>
                      <span className="text-gray-900">
                        {new Date(
                          selectedSubmission.createdAt,
                        ).toLocaleString()}
                      </span>
                    </div>
                  </div>
                  <div className="px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                    <button
                      type="button"
                      className="shadow-xs mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto"
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
        <div className="mb-10">
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
