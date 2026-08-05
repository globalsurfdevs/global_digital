"use client";

import React, { useState, useEffect } from "react";
import { toast } from "sonner";
import SmartPagination from "./Pagination";
import { useSearchParams, useRouter, usePathname } from "next/navigation";
import { MdDelete, MdEdit } from "react-icons/md";
import { IoIosClose } from "react-icons/io";
import { FaBookOpen } from "react-icons/fa";

type IndustryListItem = {
    _id: string;
    name: string;
    slug: string;
    createdAt?: string;
};

const slugify = (value: string) =>
    value
        .toLowerCase()
        .trim()
        .replace(/[^a-z0-9\s-]/g, "")
        .replace(/\s+/g, "-")
        .replace(/-+/g, "-");

const AdminIndustryList = () => {
    const searchParams = useSearchParams();
    const pageFromUrl = Number(searchParams.get("page")) || 1;
    const [industries, setIndustries] = useState<IndustryListItem[]>([]);
    const [refetch, setRefetch] = useState(false);
    const [page, setPage] = useState(pageFromUrl);
    const [totalPages, setTotalPages] = useState(1);
    const router = useRouter();
    const pathname = usePathname();
    const [selectedIds, setSelectedIds] = useState<string[]>([]);

    // Create modal state
    const [showCreateModal, setShowCreateModal] = useState(false);
    const [newIndustryName, setNewIndustryName] = useState("");
    const [newIndustrySlug, setNewIndustrySlug] = useState("");
    const [slugManuallyEdited, setSlugManuallyEdited] = useState(false);
    const [creating, setCreating] = useState(false);

    // Edit modal state
    const [showEditModal, setShowEditModal] = useState(false);
    const [editingIndustry, setEditingIndustry] = useState<IndustryListItem | null>(null);
    const [editName, setEditName] = useState("");
    const [editSlug, setEditSlug] = useState("");
    const [editSlugManuallyEdited, setEditSlugManuallyEdited] = useState(false);
    const [updating, setUpdating] = useState(false);

    const handleNameChange = (value: string) => {
        setNewIndustryName(value);
        if (!slugManuallyEdited) {
            setNewIndustrySlug(slugify(value));
        }
    };

    const handleSlugChange = (value: string) => {
        setSlugManuallyEdited(true);
        setNewIndustrySlug(slugify(value));
    };

    const resetCreateForm = () => {
        setNewIndustryName("");
        setNewIndustrySlug("");
        setSlugManuallyEdited(false);
    };

    const handleEditNameChange = (value: string) => {
        setEditName(value);
        if (!editSlugManuallyEdited) {
            setEditSlug(slugify(value));
        }
    };

    const handleEditSlugChange = (value: string) => {
        setEditSlugManuallyEdited(true);
        setEditSlug(slugify(value));
    };

    const openEditModal = (industry: IndustryListItem) => {
        setEditingIndustry(industry);
        setEditName(industry.name);
        setEditSlug(industry.slug);
        setEditSlugManuallyEdited(false);
        setShowEditModal(true);
    };

    const resetEditForm = () => {
        setEditingIndustry(null);
        setEditName("");
        setEditSlug("");
        setEditSlugManuallyEdited(false);
    };

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
        const fetchIndustriesData = async () => {
            try {
                const query = new URLSearchParams({
                    page: String(page),
                    limit: "10",
                });

                const response = await fetch(`/api/industry?${query.toString()}`);

                if (response.ok) {
                    const data = await response.json();
                    setIndustries(data.data);
                    setTotalPages(data.totalPages);
                }
            } catch (error) {
                console.error("Error fetching industries:", error);
            }
        };

        fetchIndustriesData();
    }, [page, refetch]);

    const toggleSelectAll = () => {
        if (selectedIds.length === industries.length) {
            setSelectedIds([]);
        } else {
            setSelectedIds(industries.map((item) => item._id));
        }
    };

    const handleBulkDelete = async () => {
        if (selectedIds.length === 0) {
            toast.error("No industries selected");
            return;
        }

        try {
            const response = await fetch(`/api/industry/bulk-delete`, {
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

    const handleCreateIndustry = async () => {
        if (!newIndustryName.trim()) {
            toast.error("Industry name is required");
            return;
        }

        if (!newIndustrySlug.trim()) {
            toast.error("Slug is required");
            return;
        }

        setCreating(true);
        try {
            const response = await fetch(`/api/industry`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    name: newIndustryName.trim(),
                    slug: newIndustrySlug.trim(),
                }),
            });

            const data = await response.json();

            if (response.ok) {
                toast.success(data.message ?? "Industry created");
                resetCreateForm();
                setShowCreateModal(false);
                setRefetch((prev) => !prev);
            } else {
                toast.error(data.message ?? "Failed to create industry");
            }
        } catch (error) {
            console.error(error);
            toast.error("Failed to create industry");
        } finally {
            setCreating(false);
        }
    };

    const handleUpdateIndustry = async () => {
        if (!editingIndustry) return;

        if (!editName.trim()) {
            toast.error("Industry name is required");
            return;
        }

        if (!editSlug.trim()) {
            toast.error("Slug is required");
            return;
        }

        setUpdating(true);
        try {
            const response = await fetch(`/api/industry`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    _id: editingIndustry._id,
                    name: editName.trim(),
                    slug: editSlug.trim(),
                }),
            });

            const data = await response.json();

            if (response.ok) {
                toast.success(data.message ?? "Industry updated");
                resetEditForm();
                setShowEditModal(false);
                setRefetch((prev) => !prev);
            } else {
                toast.error(data.message ?? "Failed to update industry");
            }
        } catch (error) {
            console.error(error);
            toast.error("Failed to update industry");
        } finally {
            setUpdating(false);
        }
    };

    // Navigates to the full industry detail/edit page (separate purpose from the modal above)
    const handleOpenIndustryPage = (slug: string) => {
        router.push(`/admin/industries/${slug}`);
    };

    return (
        <div className="flex flex-col gap-5">
            <div className="flex min-h-[calc(100vh-200px)] flex-col gap-3">
                <div className="flex items-center justify-between gap-10">
                    <div className="flex items-center gap-10">
                        <div
                            className={`text-xl`}
                        >
                            Industries
                        </div>
                    </div>
                    <div className="flex items-center gap-10">

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

                        <button
                            onClick={() => setShowCreateModal(true)}
                            className="rounded bg-black px-4 py-2 text-white"
                        >
                            + Create Industry
                        </button>
                    </div>
                </div>

                {industries && industries.length > 0 ? (
                    <div className="overflow-x-auto rounded-lg border border-gray-200 shadow dark:border-gray-700">
                        <table className="w-full text-left text-sm text-gray-700 dark:text-gray-300">
                            <thead className="bg-gray-100 text-xs uppercase text-gray-700 dark:bg-gray-800 dark:text-gray-300">
                                <tr>
                                    <th scope="col" className="px-4 py-3">
                                        <input
                                            type="checkbox"
                                            checked={selectedIds.length === industries.length}
                                            onChange={toggleSelectAll}
                                        />
                                    </th>
                                    <th scope="col" className="px-4 py-3">
                                        Name
                                    </th>
                                    <th scope="col" className="px-4 py-3">
                                        Slug
                                    </th>
                                    <th scope="col" className="px-4 py-3 text-center">
                                        Edit
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                {industries.map((item, i) => (
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
                                        <td className="flex justify-center gap-5 py-3 text-center">
                                            <button onClick={() => openEditModal(item)}>
                                                <MdEdit className="mx-auto text-lg" />
                                            </button>
                                            <button onClick={() => handleOpenIndustryPage(item.slug)}>
                                                <FaBookOpen className="mx-auto text-lg" />
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                ) : (
                    <div>No industries available</div>
                )}

                {showCreateModal && (
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
                                    <div className="flex items-center justify-between">
                                        <h2 className="text-lg font-semibold">Create New Industry</h2>
                                        <IoIosClose
                                            className="cursor-pointer text-2xl"
                                            onClick={() => {
                                                setShowCreateModal(false);
                                                resetCreateForm();
                                            }}
                                        />
                                    </div>

                                    <div className="flex flex-col gap-2 text-left">
                                        <label className="text-sm font-semibold text-gray-600">
                                            Industry Name
                                        </label>
                                        <input
                                            type="text"
                                            value={newIndustryName}
                                            onChange={(e) => handleNameChange(e.target.value)}
                                            placeholder="e.g. Healthcare"
                                            className="rounded border px-3 py-2"
                                        />
                                    </div>

                                    <div className="flex flex-col gap-2 text-left">
                                        <label className="text-sm font-semibold text-gray-600">
                                            Slug
                                        </label>
                                        <input
                                            type="text"
                                            value={newIndustrySlug}
                                            onChange={(e) => handleSlugChange(e.target.value)}
                                            placeholder="e.g. healthcare"
                                            className="rounded border px-3 py-2 font-mono text-sm"
                                        />
                                        <p className="text-xs text-gray-500">
                                            Auto-filled from the name, but you can edit it directly.
                                            This becomes part of the page URL, e.g. /industries/
                                            {newIndustrySlug || "your-slug"}
                                        </p>
                                    </div>

                                    <div className="gap-2 sm:flex sm:flex-row-reverse">
                                        <button
                                            type="button"
                                            disabled={creating}
                                            className="shadow-xs inline-flex w-full justify-center rounded-md bg-black px-3 py-2 text-sm font-semibold text-white hover:bg-gray-800 disabled:opacity-50 sm:w-auto"
                                            onClick={handleCreateIndustry}
                                        >
                                            {creating ? "Creating..." : "Create"}
                                        </button>
                                        <button
                                            type="button"
                                            className="shadow-xs mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto"
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

                {showEditModal && (
                    <div
                        className="relative z-10"
                        aria-labelledby="edit-modal-title"
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
                                    <div className="flex items-center justify-between">
                                        <h2 className="text-lg font-semibold">Edit Industry</h2>
                                        <IoIosClose
                                            className="cursor-pointer text-2xl"
                                            onClick={() => {
                                                setShowEditModal(false);
                                                resetEditForm();
                                            }}
                                        />
                                    </div>

                                    <div className="flex flex-col gap-2 text-left">
                                        <label className="text-sm font-semibold text-gray-600">
                                            Industry Name
                                        </label>
                                        <input
                                            type="text"
                                            value={editName}
                                            onChange={(e) => handleEditNameChange(e.target.value)}
                                            placeholder="e.g. Healthcare"
                                            className="rounded border px-3 py-2"
                                        />
                                    </div>

                                    <div className="flex flex-col gap-2 text-left">
                                        <label className="text-sm font-semibold text-gray-600">
                                            Slug
                                        </label>
                                        <input
                                            type="text"
                                            value={editSlug}
                                            onChange={(e) => handleEditSlugChange(e.target.value)}
                                            placeholder="e.g. healthcare"
                                            className="rounded border px-3 py-2 font-mono text-sm"
                                        />
                                        <p className="text-xs text-gray-500">
                                            This becomes part of the page URL, e.g. /industries/
                                            {editSlug || "your-slug"}
                                        </p>
                                    </div>

                                    <div className="gap-2 sm:flex sm:flex-row-reverse">
                                        <button
                                            type="button"
                                            disabled={updating}
                                            className="shadow-xs inline-flex w-full justify-center rounded-md bg-black px-3 py-2 text-sm font-semibold text-white hover:bg-gray-800 disabled:opacity-50 sm:w-auto"
                                            onClick={handleUpdateIndustry}
                                        >
                                            {updating ? "Saving..." : "Save Changes"}
                                        </button>
                                        <button
                                            type="button"
                                            className="shadow-xs mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto"
                                            onClick={() => {
                                                setShowEditModal(false);
                                                resetEditForm();
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

                {industries && industries.length > 0 && (
                    <div className="mb-10">
                        <SmartPagination page={page} totalPages={totalPages} setPage={changePage} />
                    </div>
                )}
            </div>
        </div>
    );
};

export default AdminIndustryList;