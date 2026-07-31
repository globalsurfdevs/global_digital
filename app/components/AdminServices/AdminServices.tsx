"use client"

import React, { useEffect, useState } from 'react'
import { toast } from 'sonner'
import SmartPagination from "./Pagination";
import { useSearchParams, useRouter, usePathname } from "next/navigation";
import { MdDelete, MdEdit } from "react-icons/md";
import { IoIosClose } from 'react-icons/io'

type ServiceListItem = {
    _id: string;
    name: string;
    slug: string;
    createdAt?: string;
}

const AdminServiceList = () => {

    const searchParams = useSearchParams();
    const pageFromUrl = Number(searchParams.get("page")) || 1;
    const [services, setServices] = useState<ServiceListItem[] | []>([])
    const [refetch, setRefetch] = useState(false)
    const [page, setPage] = useState(pageFromUrl);
    const [totalPages, setTotalPages] = useState(1);
    const router = useRouter();
    const pathname = usePathname();
    const [selectedIds, setSelectedIds] = useState<string[]>([]);

    const [showCreateModal, setShowCreateModal] = useState(false);
    const [newServiceName, setNewServiceName] = useState("");
    const [newServiceSlug, setNewServiceSlug] = useState("");
    const [slugManuallyEdited, setSlugManuallyEdited] = useState(false);
    const [creating, setCreating] = useState(false);

    const slugify = (value: string) =>
        value
            .toLowerCase()
            .trim()
            .replace(/[^a-z0-9\s-]/g, "")
            .replace(/\s+/g, "-")
            .replace(/-+/g, "-");

    const handleNameChange = (value: string) => {
        setNewServiceName(value);
        if (!slugManuallyEdited) {
            setNewServiceSlug(slugify(value));
        }
    };

    const handleSlugChange = (value: string) => {
        setSlugManuallyEdited(true);
        setNewServiceSlug(slugify(value));
    };

    const resetCreateForm = () => {
        setNewServiceName("");
        setNewServiceSlug("");
        setSlugManuallyEdited(false);
    };

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
        const fetchServicesData = async () => {
            try {
                const query = new URLSearchParams({
                    page: String(page),
                    limit: "10",
                });

                const response = await fetch(`/api/service?${query.toString()}`);

                if (response.ok) {
                    const data = await response.json();
                    setServices(data.data);
                    setTotalPages(data.totalPages);
                }
            } catch (error) {
                console.error("Error fetching services:", error);
            }
        };

        fetchServicesData()
    }, [page, refetch])

    const toggleSelectAll = () => {
        if (selectedIds.length === services.length) {
            setSelectedIds([]);
        } else {
            setSelectedIds(services.map((item) => item._id));
        }
    };

    const handleBulkDelete = async () => {
        if (selectedIds.length === 0) {
            toast.error("No services selected");
            return;
        }

        try {
            const response = await fetch(`/api/service/bulk-delete`, {
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
                toast.error(data.message);
            }
        } catch (error) {
            console.error(error);
        }
    };

    const handleCreateService = async () => {
        if (!newServiceName.trim()) {
            toast.error("Service name is required");
            return;
        }

        if (!newServiceSlug.trim()) {
            toast.error("Slug is required");
            return;
        }

        setCreating(true);
        try {
            const response = await fetch(`/api/service`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ name: newServiceName.trim(), slug: newServiceSlug.trim() }),
            });

            const data = await response.json();

            if (response.ok) {
                toast.success(data.message ?? "Service created");
                resetCreateForm();
                setShowCreateModal(false);
                setRefetch((prev) => !prev);
            } else {
                toast.error(data.message ?? "Failed to create service");
            }
        } catch (error) {
            console.error(error);
            toast.error("Failed to create service");
        } finally {
            setCreating(false);
        }
    };

    const handleEdit = (slug: string) => {
        router.push(`/admin/services/${slug}`);
    };

    return (
        <div className='flex flex-col gap-5'>

            <div className='flex flex-col gap-3 min-h-[calc(100vh-200px)]'>
                <div className="flex items-center gap-10 justify-between px-1">
                    <div className='flex justify-between items-center'>
                        <h1 className='text-xl'>Services</h1>
                    </div>
                    <div className='flex gap-10 items-center'>
                    <div>
                        {selectedIds.length > 0 && (
                            <div className="relative inline-flex">
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

                    <button
                        onClick={() => setShowCreateModal(true)}
                        className="px-4 py-2 bg-black text-white rounded"
                    >
                        + Create Service
                    </button>
                    </div>
                </div>

                {services && services.length > 0 ? (
                    <div className="overflow-x-auto rounded-lg border border-gray-200 shadow dark:border-gray-700">
                        <table className="w-full text-left text-sm text-gray-700 dark:text-gray-300">
                            <thead className="bg-gray-100 text-xs uppercase text-gray-700 dark:bg-gray-800 dark:text-gray-300">
                                <tr>
                                    <th scope="col" className="px-4 py-3">
                                        <input
                                            type="checkbox"
                                            checked={selectedIds.length === services.length}
                                            onChange={toggleSelectAll}
                                        />
                                    </th>
                                    <th scope="col" className="px-4 py-3">Name</th>
                                    <th scope="col" className="px-4 py-3">Slug</th>
                                    <th scope="col" className="px-4 py-3 text-center">Edit</th>
                                </tr>
                            </thead>
                            <tbody>
                                {services.map((item, i) => (
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
                                        <td className="px-4 py-3">{item.slug}</td>
                                        <td className="px-4 py-3 text-center">
                                            <button onClick={() => handleEdit(item.slug)}>
                                                <MdEdit className="mx-auto text-lg" />
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                ) : (
                    <div>No services available</div>
                )}

                {showCreateModal && (
                    <div className="relative z-10" aria-labelledby="modal-title" role="dialog" aria-modal="true">
                        <div className="fixed inset-0 bg-gray-500/75 transition-opacity" aria-hidden="true"></div>

                        <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
                            <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
                                <div className="p-5 flex flex-col gap-5 relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
                                    <div className='flex justify-between items-center'>
                                        <h2 className='text-lg font-semibold'>Create New Service</h2>
                                        <IoIosClose
                                            className='text-2xl cursor-pointer'
                                            onClick={() => {
                                                setShowCreateModal(false);
                                                resetCreateForm();
                                            }}
                                        />
                                    </div>

                                    <div className='flex flex-col gap-2 text-left'>
                                        <label className='font-semibold text-gray-600 text-sm'>Service Name</label>
                                        <input
                                            type='text'
                                            value={newServiceName}
                                            onChange={(e) => handleNameChange(e.target.value)}
                                            placeholder='e.g. Web Development'
                                            className='border px-3 py-2 rounded'
                                        />
                                    </div>

                                    <div className='flex flex-col gap-2 text-left'>
                                        <label className='font-semibold text-gray-600 text-sm'>Slug</label>
                                        <input
                                            type='text'
                                            value={newServiceSlug}
                                            onChange={(e) => handleSlugChange(e.target.value)}
                                            placeholder='e.g. web-development'
                                            className='border px-3 py-2 rounded font-mono text-sm'
                                        />
                                        <p className='text-xs text-gray-500'>
                                            Auto-filled from the name, but you can edit it directly. This becomes part of the page URL, e.g. /services/{newServiceSlug || "your-slug"}
                                        </p>
                                    </div>

                                    <div className="sm:flex sm:flex-row-reverse gap-2">
                                        <button
                                            type="button"
                                            disabled={creating}
                                            className="inline-flex w-full justify-center rounded-md bg-black px-3 py-2 text-sm font-semibold text-white shadow-xs hover:bg-gray-800 disabled:opacity-50 sm:w-auto"
                                            onClick={handleCreateService}
                                        >
                                            {creating ? "Creating..." : "Create"}
                                        </button>
                                        <button
                                            type="button"
                                            className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-xs ring-1 ring-gray-300 ring-inset hover:bg-gray-50 sm:mt-0 sm:w-auto"
                                            onClick={() => {
                                                setShowCreateModal(false);
                                                resetCreateForm();
                                            }}
                                        >
                                            Cancel
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>

            {services && services.length > 0 && (
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

export default AdminServiceList