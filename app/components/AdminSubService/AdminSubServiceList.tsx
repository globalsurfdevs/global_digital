"use client";

import { LoadingState } from "@/app/components/AdminUI";
import React, { useState } from "react";
import { toast } from "sonner";
import SmartPagination from "../AdminEnquiry/Pagination";
import { useSearchParams, useRouter, usePathname } from "next/navigation";
import { MdDelete, MdEdit } from "react-icons/md";
import { IoIosClose } from "react-icons/io";
import { useEffect } from "react";
import { FaBookOpen } from "react-icons/fa";
import { ImageUploader } from "@/components/ui/image-uploader";
import { adminRoutes } from "@/app/const/routes/admin.routes";
import { Plus } from "lucide-react";
import {
  EmptyState,
  PageHeader,
  SectionCard,
  ViewLiveLink,
  adminButtonClass,
} from "../AdminUI";
// Presentation-only class names (table actions, tabs and modal fields).
const iconButtonClass =
  "inline-flex size-8 items-center justify-center rounded-lg text-slate-500 transition-colors hover:bg-slate-100 hover:text-slate-900 dark:text-slate-400 dark:hover:bg-slate-700 dark:hover:text-white";
const modalPanelClass =
  "relative flex transform flex-col gap-5 overflow-hidden rounded-xl border border-slate-200 bg-white p-6 text-left shadow-xl transition-all dark:border-slate-700 dark:bg-slate-800 sm:my-8 sm:w-full sm:max-w-lg";
const modalHeaderClass =
  "flex items-center justify-between border-b border-slate-200 pb-4 dark:border-slate-700";
const modalCloseClass =
  "cursor-pointer text-2xl text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white";
const modalFooterClass =
  "gap-2 border-t border-slate-200 pt-4 dark:border-slate-700 sm:flex sm:flex-row-reverse";
const modalLabelClass =
  "text-sm font-medium text-slate-700 dark:text-slate-200";
const modalInputClass =
  "h-10 rounded-lg border border-slate-300 bg-white px-3 text-sm text-slate-900 focus:border-slate-500 focus:outline-none focus:ring-2 focus:ring-slate-200 dark:border-slate-600 dark:bg-slate-900 dark:text-white dark:focus:ring-slate-700";

export type ServicePillarListItem = {
  _id: string;
  name: string;
  slug: string;
  icon?: string;
  createdAt?: string;
};

const AdminSubServiceList = () => {
  const searchParams = useSearchParams();
  const pageFromUrl = Number(searchParams.get("page")) || 1;
  const [servicePillars, setServicePillars] = useState<ServicePillarListItem[]>(
    [],
  );
  const [refetch, setRefetch] = useState(false);
  const [page, setPage] = useState(pageFromUrl);
  const [totalPages, setTotalPages] = useState(1);
  const router = useRouter();
  const pathname = usePathname();
  const [selectedIds, setSelectedIds] = useState<string[]>([]);

  // Create modal state
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [newServiceName, setNewServiceName] = useState("");
  const [newServiceSlug, setNewServiceSlug] = useState("");
  const [autoSlug, setAutoSlug] = useState(true);
  const [slugManuallyEdited, setSlugManuallyEdited] = useState(false);
  const [creating, setCreating] = useState(false);
  const [editAutoSlug, setEditAutoSlug] = useState(false);

  // Edit modal state
  const [showEditModal, setShowEditModal] = useState(false);
  const [editingService, setEditingService] =
    useState<ServicePillarListItem | null>(null);

  const [editName, setEditName] = useState("");
  const [editSlug, setEditSlug] = useState("");
  //   const [editSlugManuallyEdited, setEditSlugManuallyEdited] = useState(false);
  const [editIcon, setEditIcon] = useState("");
  const [updating, setUpdating] = useState(false);

  const slugify = (value: string) =>
    value
      .toLowerCase()
      .trim()
      .replace(/[^a-z0-9\s-]/g, "")
      .replace(/\s+/g, "-")
      .replace(/-+/g, "-");

  const handleNameChange = (value: string) => {
    setNewServiceName(value);

    if (autoSlug && !slugManuallyEdited) {
      setNewServiceSlug(slugify(value));
    }
  };

  const handleSlugChange = (value: string) => {
    setSlugManuallyEdited(true);
    setAutoSlug(false);
    setNewServiceSlug(slugify(value));
  };

  const handleEditNameChange = (value: string) => {
    setEditName(value);

    if (editAutoSlug) {
      setEditSlug(slugify(value));
    }
  };

  const handleEditSlugChange = (value: string) => {
    setEditSlug(slugify(value));
  };

  const resetCreateForm = () => {
    setNewServiceName("");
    setNewServiceSlug("");
    setSlugManuallyEdited(false);
    setAutoSlug(true);
  };

  //   const handleEditNameChange = (value: string) => {
  //     setEditName(value);
  //     if (!editSlugManuallyEdited) {
  //       setEditSlug(slugify(value));
  //     }
  //   };

  //   const handleEditSlugChange = (value: string) => {
  //     setEditSlugManuallyEdited(true);
  //     setEditSlug(slugify(value));
  //   };

  const openEditModal = (service: ServicePillarListItem) => {
    setEditingService(service);
    setEditName(service.name);
    setEditSlug(service.slug);
    setEditIcon(service.icon || "");
    setEditAutoSlug(false);
    setShowEditModal(true);
  };

  const resetEditForm = () => {
    setEditingService(null);
    setEditName("");
    setEditSlug("");
    setEditIcon("");
    setEditAutoSlug(false);
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

  // True until the first load finishes, so the empty message never shows while data is loading.
  const [listLoading, setListLoading] = useState(true);
  useEffect(() => {
    const fetchServicesData = async () => {
      try {
        const query = new URLSearchParams({
          page: String(page),
          limit: "10",
        });

        const response = await fetch(`/api/sub-service?${query.toString()}`);

        if (response.ok) {
          const data = await response.json();

          setServicePillars(data.data);
          setTotalPages(data.totalPages);
        }
      } catch (error) {
        console.error("Error fetching services:", error);
      }
    };

    fetchServicesData().finally(() => setListLoading(false));
  }, [page, refetch]);

  const toggleSelectAll = () => {
    if (selectedIds.length === servicePillars.length) {
      setSelectedIds([]);
    } else {
      setSelectedIds(servicePillars.map((item) => item._id));
    }
  };

  const handleBulkDelete = async () => {
    if (selectedIds.length === 0) {
      toast.error("No services selected");
      return;
    }

    try {
      const response = await fetch(`/api/service-pillar/bulk-delete`, {
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
      const response = await fetch(`/api/sub-service`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: newServiceName.trim(),
          slug: newServiceSlug.trim(),
        }),
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

  const handleUpdateService = async () => {
    if (!editingService) return;

    if (!editName.trim()) {
      toast.error("Service name is required");
      return;
    }

    if (!editSlug.trim()) {
      toast.error("Slug is required");
      return;
    }

    setUpdating(true);
    try {
      const response = await fetch(`/api/sub-service`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          _id: editingService._id,
          name: editName.trim(),
          slug: editSlug.trim(),
          icon: editIcon,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        toast.success(data.message ?? "Service updated");
        resetEditForm();
        setShowEditModal(false);
        setRefetch((prev) => !prev);
      } else {
        toast.error(data.message ?? "Failed to update service");
      }
    } catch (error) {
      console.error(error);
      toast.error("Failed to update service");
    } finally {
      setUpdating(false);
    }
  };

  // Retained for its existing purpose elsewhere in the app
  const handleEdit = (slug: string) => {
    router.push(adminRoutes.subServices.edit(slug));
  };
  const handleEditAutoSlugToggle = (enabled: boolean) => {
    setEditAutoSlug(enabled);

    if (enabled) {
      setEditSlug(slugify(editName));
    }
  };
  return (
    <div className="flex flex-col gap-6">
      <div className="flex min-h-[calc(100vh-200px)] flex-col gap-6">
        <PageHeader
          title="Sub Services"
          description="Manage sub-service names, slugs and icons. Open a sub-service to edit its page content."
          actions={
            <>
              {selectedIds.length > 0 && (
                <span
                  className="relative inline-flex size-10 items-center justify-center rounded-lg border border-red-200 bg-red-50 dark:border-red-500/30 dark:bg-red-500/10"
                  title="Delete selected"
                >
                  <MdDelete
                    className="cursor-pointer text-xl text-red-600"
                    onClick={handleBulkDelete}
                  />
                  <span className="absolute -right-1.5 -top-1.5 flex h-[18px] min-w-[18px] items-center justify-center rounded-full bg-red-600 px-1 text-[10px] font-medium text-white">
                    {selectedIds.length}
                  </span>
                </span>
              )}

              <button
                onClick={() => setShowCreateModal(true)}
                className={adminButtonClass("dark")}
              >
                <Plus className="size-4" />
                Create Sub Service
              </button>
            </>
          }
        />

        <>
          <SectionCard
            title="All sub services"
            description="Use the icons to edit details, open the page editor, or view the live page."
            bodyClassName={
              servicePillars && servicePillars.length > 0 ? "p-0" : undefined
            }
          >
            {servicePillars && servicePillars.length > 0 ? (
              <div className="overflow-x-auto">
                <table className="w-full text-left text-sm text-slate-700 dark:text-slate-300">
                  <thead className="border-b border-slate-200 bg-slate-50 text-xs uppercase text-slate-500 dark:border-slate-700 dark:bg-slate-900/40 dark:text-slate-400">
                    <tr>
                      <th scope="col" className="w-12 px-5 py-3">
                        <input
                          type="checkbox"
                          checked={selectedIds.length === servicePillars.length}
                          onChange={toggleSelectAll}
                        />
                      </th>
                      <th scope="col" className="px-5 py-3 font-medium">
                        Name
                      </th>
                      <th scope="col" className="px-5 py-3 font-medium">
                        Slug
                      </th>
                      <th
                        scope="col"
                        className="px-5 py-3 text-center font-medium"
                      >
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {servicePillars.map((item, i) => (
                      <tr
                        key={item._id ?? i}
                        className="border-b border-slate-100 last:border-b-0 hover:bg-slate-50 dark:border-slate-700 dark:hover:bg-slate-700/40"
                      >
                        <td className="px-5 py-3">
                          <input
                            type="checkbox"
                            checked={selectedIds.includes(item._id)}
                            onChange={() => toggleSelect(item._id)}
                          />
                        </td>
                        <td className="px-5 py-3 font-medium text-slate-900 dark:text-white">
                          {item.name}
                        </td>
                        <td className="px-5 py-3 font-mono text-xs text-slate-500 dark:text-slate-400">
                          {item.slug}
                        </td>
                        {/* <td className="px-4 py-3 text-center">
                                            <button onClick={() => openEditModal(item)}>
                                                <MdEdit className="mx-auto text-lg" />
                                            </button>
                                        </td> */}
                        <td className="px-5 py-3">
                          <div className="flex items-center justify-center gap-1">
                            <button
                              onClick={() => openEditModal(item)}
                              title="Edit details"
                              aria-label="Edit details"
                              className={iconButtonClass}
                            >
                              <MdEdit className="text-base" />
                            </button>
                            <button
                              onClick={() => handleEdit(item.slug)}
                              title="Edit page content"
                              aria-label="Edit page content"
                              className={iconButtonClass}
                            >
                              <FaBookOpen className="text-base" />
                            </button>
                            {/* Sub-services are served at /{slug}: app/(user)/[slug]/page.tsx
                                resolves it via app/lib/routing/resolveSlug.ts (getSubService
                                looks up by `slug`), canonical `https://www.globalsurf.ae/${slug}`
                                (app/lib/metadata/buildServiceMetadata.ts). */}
                            <ViewLiveLink
                              href={item.slug ? `/${item.slug}` : null}
                            />
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : listLoading ? (
              <LoadingState />
            ) : (
              <EmptyState title="No services available" />
            )}
          </SectionCard>

          {showCreateModal && (
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
                  <div className={modalPanelClass}>
                    <div className={modalHeaderClass}>
                      <h2 className="text-lg font-semibold text-slate-900 dark:text-white">
                        Create New Sub-Service
                      </h2>
                      <IoIosClose
                        className={modalCloseClass}
                        onClick={() => {
                          setShowCreateModal(false);
                          resetCreateForm();
                        }}
                      />
                    </div>

                    <div className="flex flex-col gap-2 text-left">
                      <label className={modalLabelClass}>
                        Sub-Service Name
                      </label>
                      <input
                        type="text"
                        value={newServiceName}
                        onChange={(e) => handleNameChange(e.target.value)}
                        placeholder="e.g. Web Development"
                        className={modalInputClass}
                      />
                    </div>

                    <div className="flex flex-col gap-2 text-left">
                      <label className={modalLabelClass}>Slug</label>
                      <input
                        type="text"
                        value={newServiceSlug}
                        onChange={(e) => handleSlugChange(e.target.value)}
                        placeholder="e.g. web-development"
                        className={`${modalInputClass} font-mono`}
                      />
                      <p className="text-xs text-slate-500 dark:text-slate-400">
                        Auto-filled from the name, but you can edit it directly.
                        This becomes part of the page URL, e.g. /services/
                        {newServiceSlug || "your-slug"}
                      </p>
                    </div>

                    <div className={modalFooterClass}>
                      <button
                        type="button"
                        disabled={creating}
                        className={adminButtonClass(
                          "dark",
                          "md",
                          "w-full sm:w-auto",
                        )}
                        onClick={handleCreateService}
                      >
                        {creating ? "Creating..." : "Create"}
                      </button>
                      <button
                        type="button"
                        className={adminButtonClass(
                          "secondary",
                          "md",
                          "mt-3 w-full sm:mt-0 sm:w-auto",
                        )}
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
                className="fixed inset-0 bg-slate-900/50 transition-opacity"
                aria-hidden="true"
              ></div>

              <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
                <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
                  <div className={modalPanelClass}>
                    <div className={modalHeaderClass}>
                      <h2 className="text-lg font-semibold text-slate-900 dark:text-white">
                        Edit Service
                      </h2>
                      <IoIosClose
                        className={modalCloseClass}
                        onClick={() => {
                          setShowEditModal(false);
                          resetEditForm();
                        }}
                      />
                    </div>

                    <div className="flex flex-col gap-2 text-left">
                      <div className="flex items-center justify-between">
                        <label className={modalLabelClass}>Service Name</label>

                        <div className="flex items-center gap-2">
                          <span className="text-xs text-slate-500 dark:text-slate-400">
                            Auto Slug :
                          </span>

                          <button
                            type="button"
                            onClick={() =>
                              handleEditAutoSlugToggle(!editAutoSlug)
                            }
                            className={`relative h-6 w-14 overflow-hidden rounded-full transition-colors duration-300 ${
                              editAutoSlug ? "bg-green-500" : "bg-gray-300"
                            }`}
                          >
                            <span
                              className={`absolute inset-0 flex items-center text-[10px] font-semibold text-white transition-all duration-300 ${
                                editAutoSlug
                                  ? "justify-start pl-3"
                                  : "justify-end pr-3"
                              }`}
                            >
                              {editAutoSlug ? "ON" : "OFF"}
                            </span>

                            <span
                              className={`absolute left-1 top-1 h-4 w-4 rounded-full bg-white shadow-md transition-transform duration-300 ease-in-out ${
                                editAutoSlug ? "translate-x-8" : "translate-x-0"
                              }`}
                            />
                          </button>
                        </div>
                      </div>

                      <input
                        type="text"
                        value={editName}
                        onChange={(e) => handleEditNameChange(e.target.value)}
                        placeholder="e.g. Web Development"
                        className={modalInputClass}
                      />
                    </div>

                    <div className="flex flex-col gap-2 text-left">
                      <label className={modalLabelClass}>Slug</label>

                      <input
                        type="text"
                        value={editSlug}
                        onChange={(e) => handleEditSlugChange(e.target.value)}
                        placeholder="e.g. web-development"
                        className={`${modalInputClass} font-mono`}
                      />

                      <p className="text-xs text-slate-500 dark:text-slate-400">
                        This becomes part of the page URL, e.g. /services/
                        {editSlug || "your-slug"}
                      </p>
                    </div>

                    <div className="flex flex-col gap-2 text-left">
                      <label className={modalLabelClass}>Add Icon</label>
                      <ImageUploader
                        value={editIcon}
                        onChange={setEditIcon}
                        className=""
                        isLogo
                      />
                    </div>

                    <div className={modalFooterClass}>
                      <button
                        type="button"
                        disabled={updating}
                        className={adminButtonClass(
                          "dark",
                          "md",
                          "w-full sm:w-auto",
                        )}
                        onClick={handleUpdateService}
                      >
                        {updating ? "Saving..." : "Save Changes"}
                      </button>
                      <button
                        type="button"
                        className={adminButtonClass(
                          "secondary",
                          "md",
                          "mt-3 w-full sm:mt-0 sm:w-auto",
                        )}
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

          {servicePillars && servicePillars.length > 0 && (
            <div className="mb-10">
              <SmartPagination
                page={page}
                totalPages={totalPages}
                setPage={changePage}
              />
            </div>
          )}
        </>
      </div>
    </div>
  );
};

export default AdminSubServiceList;
