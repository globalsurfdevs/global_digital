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

type Enquiry = {
  _id: string;
  name: string;
  email: string;
  company: string;
  phone: string;
  budget: string;
  service: string;
  message: string;
  page_url: string;
  created_at: string;
};

const AdminEnquiry = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();
  const pageFromUrl = Number(searchParams.get("page")) || 1;

  const [enquiries, setEnquiries] = useState<Enquiry[] | []>([]);
  const [refetch, setRefetch] = useState(false);
  const [page, setPage] = useState(pageFromUrl);
  const [totalPages, setTotalPages] = useState(1);
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [selectedEnquiry, setSelectedEnquiry] = useState<Enquiry | null>(null);
  const [isLoading, setIsLoading] = useState(true);
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
    const fetchEnquiriesData = async () => {
      setIsLoading(true);
      try {
        const query = new URLSearchParams({
          page: String(page),
          limit: "10",
          ...(fromDate && { from: fromDate }),
          ...(toDate && { to: toDate }),
        });

        const response = await fetch(`/api/enquiry?${query.toString()}`);

        if (response.ok) {
          const data = await response.json();
          setEnquiries(data.data);
          setTotalPages(data.totalPages);
        }
      } catch (error) {
        console.error("Error fetching enquiries:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchEnquiriesData();
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
      const response = await fetch(`/api/enquiry/bulk-delete`, {
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

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-6">
        <PageHeader
          title="Enquiries"
          description="Contact form submissions from the website. Filter by date or select rows to delete."
          actions={
            <>
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
            </>
          }
        />
        <SectionCard title="All enquiries" bodyClassName="p-0">
          {isLoading ? (
            <div className="flex min-h-[200px] items-center justify-center p-5">
              <div className="loader text-sm text-slate-500 dark:text-slate-400">
                Enquires Loading...
              </div>
            </div>
          ) : enquiries && enquiries.length > 0 ? (
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
                      Company
                    </th>
                    <th scope="col" className="px-4 py-3">
                      Phone
                    </th>
                    <th scope="col" className="px-4 py-3">
                      Service
                    </th>
                    <th scope="col" className="px-4 py-3">
                      Date
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
                      <td className="px-4 py-3">{item.company}</td>
                      <td className="px-4 py-3">{item.phone}</td>
                      <td className="px-4 py-3">{item.service}</td>
                      <td className="px-4 py-3">
                        {item.created_at
                          ? new Date(item.created_at).toLocaleDateString()
                          : "—"}
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
              <EmptyState title="No enquiries available" />
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

            <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
              <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
                <div className="relative flex transform flex-col gap-5 overflow-hidden rounded-xl border border-slate-200 bg-white p-6 text-left shadow-xl transition-all dark:border-slate-700 dark:bg-slate-800 sm:my-8 sm:w-full sm:max-w-lg">
                  <h3 className="border-b border-slate-200 pb-4 text-base font-semibold text-slate-900 dark:border-slate-700 dark:text-white">
                    Enquiry details
                  </h3>
                  <div className="grid grid-cols-1 gap-4 text-sm">
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
                        Company
                      </label>
                      <span className="text-slate-900 dark:text-white">
                        {selectedEnquiry.company}
                      </span>
                    </div>
                    <div className="flex flex-col gap-1">
                      <label className="text-xs font-medium uppercase tracking-wide text-slate-500 dark:text-slate-400">
                        Phone
                      </label>
                      <span className="text-slate-900 dark:text-white">
                        {selectedEnquiry.phone}
                      </span>
                    </div>
                    <div className="flex flex-col gap-1">
                      <label className="text-xs font-medium uppercase tracking-wide text-slate-500 dark:text-slate-400">
                        Budget
                      </label>
                      <span className="text-slate-900 dark:text-white">
                        {selectedEnquiry.budget}
                      </span>
                    </div>
                    <div className="flex flex-col gap-1">
                      <label className="text-xs font-medium uppercase tracking-wide text-slate-500 dark:text-slate-400">
                        Service
                      </label>
                      <span className="text-slate-900 dark:text-white">
                        {selectedEnquiry.service}
                      </span>
                    </div>
                    <div className="flex flex-col gap-1">
                      <label className="text-xs font-medium uppercase tracking-wide text-slate-500 dark:text-slate-400">
                        Page URL
                      </label>
                      <span className="break-all text-slate-900 dark:text-white">
                        {selectedEnquiry.page_url}
                      </span>
                    </div>
                    <div className="flex flex-col gap-1">
                      <label className="text-xs font-medium uppercase tracking-wide text-slate-500 dark:text-slate-400">
                        Message
                      </label>
                      <p className="whitespace-pre-line text-slate-900 dark:text-white">
                        {selectedEnquiry.message}
                      </p>
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
