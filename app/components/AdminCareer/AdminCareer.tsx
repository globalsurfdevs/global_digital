"use client"

import React, { useEffect, useState } from 'react'
import { toast } from 'sonner'
import { LuMessageSquareShare } from "react-icons/lu";
import SmartPagination from "../AdminEnquiry/Pagination";
import { useSearchParams, useRouter, usePathname } from "next/navigation";
import { MdDelete } from "react-icons/md";
import { FaFilePdf } from "react-icons/fa6";
import Link from 'next/link';

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
}

const AdminEnquiry = () => {

    const searchParams = useSearchParams();
    const pageFromUrl = Number(searchParams.get("page")) || 1;
    const [enquiries, setEnquiries] = useState<Enquiry[] | []>([])
    const [refetch, setRefetch] = useState(false)
    const [page, setPage] = useState(pageFromUrl);
    const [totalPages, setTotalPages] = useState(1);
    const router = useRouter();
    const pathname = usePathname();
    const [selectedIds, setSelectedIds] = useState<string[]>([]);
    const [selectedEnquiry, setSelectedEnquiry] = useState<Enquiry | null>(null);

    const toggleSelect = (id: string) => {
        setSelectedIds((prev) =>
            prev.includes(id)
                ? prev.filter((item) => item !== id)
                : [...prev, id]
        );
    };

    const changePage = (newPage: number) => {
        setPage(newPage);
        router.push(`${pathname}?page=${newPage}`);
    };

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

        fetchEnquiriesData()
    }, [page, refetch])

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
            "Resume"
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
            item.resume
        ]);

        const csvContent =
            [headers, ...rows]
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
        <div className='flex flex-col gap-5'>
            <div className='flex justify-between items-center'>
                <h1 className='text-xl'>Enquiries</h1>
                <button
                    onClick={exportToCSV}
                    className="px-3 py-1 bg-blue-600 text-white rounded"
                >
                    Export CSV
                </button>
            </div>

            <div className='flex flex-col gap-3 min-h-[calc(100vh-200px)]'>
                <div className="flex items-center gap-4 justify-end px-1">
                    {selectedIds.length > 0 && (
                        <div className="relative">
                            <MdDelete
                                className="text-red-600 cursor-pointer text-2xl"
                                onClick={handleBulkDelete}
                            />
                            <span className="absolute -top-2 -right-2 bg-red-600 text-white flex items-center justify-center text-[10px] rounded-full h-[15px] w-[15px]">
                                {selectedIds.length}
                            </span>
                        </div>
                    )}
                </div>

                {enquiries && enquiries.length > 0 ? (
                    <div className="overflow-x-auto rounded-lg border border-gray-200 shadow dark:border-gray-700">
                        <table className="w-full text-left text-sm text-gray-700 dark:text-gray-300">
                            <thead className="bg-gray-100 text-xs uppercase text-gray-700 dark:bg-gray-800 dark:text-gray-300">
                                <tr>
                                    <th scope="col" className="px-4 py-3">
                                        <input
                                            type="checkbox"
                                            checked={selectedIds.length === enquiries.length}
                                            onChange={toggleSelectAll}
                                        />
                                    </th>
                                    <th scope="col" className="px-4 py-3">Name</th>
                                    <th scope="col" className="px-4 py-3">Email</th>
                                    <th scope="col" className="px-4 py-3">Job Title</th>
                                    <th scope="col" className="px-4 py-3">Experience</th>
                                    <th scope="col" className="px-4 py-3">Phone</th>
                                    <th scope="col" className="px-4 py-3 text-center">Resume</th>
                                    <th scope="col" className="px-4 py-3 text-center">View</th>
                                </tr>
                            </thead>
                            <tbody>
                                {enquiries.map((item, i) => (
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
                                        <td className="px-4 py-3 font-medium text-gray-900 dark:text-white">
                                            {item.name}
                                        </td>
                                        <td className="px-4 py-3">{item.email}</td>
                                        <td className="px-4 py-3">{item.jobTitle}</td>
                                        <td className="px-4 py-3">{item.experience}</td>
                                        <td className="px-4 py-3">{item.phone}</td>
                                        <td className="px-4 py-3 text-center">
                                            {item.resume ? (
                                                <Link href={item.resume} target="_blank">
                                                    <FaFilePdf className="mx-auto text-red-600" />
                                                </Link>
                                            ) : (
                                                "—"
                                            )}
                                        </td>
                                        <td className="px-4 py-3 text-center">
                                            <button onClick={() => setSelectedEnquiry(item)}>
                                                <LuMessageSquareShare className="mx-auto text-lg" />
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                ) : (
                    <div>No enquiries available</div>
                )}

                {selectedEnquiry && (
                    <div className="relative z-10" aria-labelledby="modal-title" role="dialog" aria-modal="true">
                        <div className="fixed inset-0 bg-gray-500/75 transition-opacity" aria-hidden="true"></div>

                        <div className="fixed inset-0 z-10 w-screen overflow-y-auto mt-20">
                            <div className="flex items-end justify-center p-4 text-center sm:items-center sm:p-0">
                                <div className="p-5 flex flex-col gap-5 relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
                                    <div className="grid grid-cols-1 gap-4 text-sm h-[300px] overflow-auto">
                                        <div className="flex flex-col">
                                            <label className="font-semibold text-gray-600">Full Name</label>
                                            <span className="text-gray-900">{selectedEnquiry.name}</span>
                                        </div>
                                        <div className="flex flex-col">
                                            <label className="font-semibold text-gray-600">Email</label>
                                            <span className="text-gray-900">{selectedEnquiry.email}</span>
                                        </div>
                                        <div className="flex flex-col">
                                            <label className="font-semibold text-gray-600">Job Title</label>
                                            <span className="text-gray-900">{selectedEnquiry.jobTitle}</span>
                                        </div>
                                        <div className="flex flex-col">
                                            <label className="font-semibold text-gray-600">Experience</label>
                                            <span className="text-gray-900">{selectedEnquiry.experience}</span>
                                        </div>
                                        <div className="flex flex-col">
                                            <label className="font-semibold text-gray-600">Current Salary</label>
                                            <span className="text-gray-900">{selectedEnquiry.currentSalary}</span>
                                        </div>
                                        <div className="flex flex-col">
                                            <label className="font-semibold text-gray-600">Expected Salary</label>
                                            <span className="text-gray-900">{selectedEnquiry.expectedSalary}</span>
                                        </div>
                                        <div className="flex flex-col">
                                            <label className="font-semibold text-gray-600">Notice Period</label>
                                            <span className="text-gray-900 break-all">{selectedEnquiry.noticePeriod}</span>
                                        </div>
                                        <div className="flex flex-col">
                                            <label className="font-semibold text-gray-600">Phone</label>
                                            <span className="text-gray-900 break-all">{selectedEnquiry.phone}</span>
                                        </div>
                                        <div className="flex flex-col">
                                            <label className="font-semibold text-gray-600">Resume</label>
                                            <Link href={selectedEnquiry.resume} target='_blank'><FaFilePdf /></Link>
                                        </div>
                                    </div>
                                    <div className="px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                                        <button
                                            type="button"
                                            className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-xs ring-1 ring-gray-300 ring-inset hover:bg-gray-50 sm:mt-0 sm:w-auto"
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
                <div className='mb-10'>
                    <SmartPagination
                        page={page}
                        totalPages={totalPages}
                        setPage={changePage}
                    />
                </div>
            )}
        </div>
    )
}

export default AdminEnquiry