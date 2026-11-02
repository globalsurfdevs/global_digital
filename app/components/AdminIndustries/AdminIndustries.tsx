"use client";

import { LoadingState } from "@/app/components/AdminUI";
import React, { useState, useEffect } from "react";
import { toast } from "sonner";
import SmartPagination from "./Pagination";
import { useSearchParams, useRouter, usePathname } from "next/navigation";
import { MdDelete, MdEdit, MdDragIndicator } from "react-icons/md";
import { IoIosClose } from "react-icons/io";
import { FaBookOpen } from "react-icons/fa";
import { ImageUploader } from "@/components/ui/image-uploader";
import { closestCorners, DndContext, DragEndEvent } from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  useSortable,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { ArrowUpDown, Check, Plus } from "lucide-react";
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
const modalTextareaClass =
  "rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900 focus:border-slate-500 focus:outline-none focus:ring-2 focus:ring-slate-200 dark:border-slate-600 dark:bg-slate-900 dark:text-white dark:focus:ring-slate-700";

type IndustryListItem = {
  _id: string;
  name: string;
  slug: string;
  image?: string;
  imageAlt?: string;
  shortDescription?: string;
  createdAt?: string;
  order?: number;
};

const slugify = (value: string) =>
  value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-");

// Sortable row wrapper - drag handle lives in the first cell,
// rest of the row (name/slug/edit cells) is passed in as children.
const SortableIndustryRow = ({
  item,
  children,
}: {
  item: IndustryListItem;
  children: React.ReactNode;
}) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: item._id });

  const style: React.CSSProperties = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.6 : 1,
  };

  return (
    <tr
      ref={setNodeRef}
      style={style}
      className="border-b border-slate-100 bg-white dark:border-slate-700 dark:bg-slate-800"
    >
      <td
        className="w-12 cursor-grab px-5 py-3 active:cursor-grabbing"
        {...attributes}
        {...listeners}
      >
        <MdDragIndicator className="text-lg text-slate-400" />
      </td>
      {children}
    </tr>
  );
};

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
  const [reorderMode, setReorderMode] = useState(false);

  // Create modal state
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [newIndustryName, setNewIndustryName] = useState("");
  const [newIndustrySlug, setNewIndustrySlug] = useState("");
  const [newIndustryImage, setNewIndustryImage] = useState("");
  const [newIndustryImageAlt, setNewIndustryImageAlt] = useState("");
  const [newIndustryShortDescription, setNewIndustryShortDescription] =
    useState("");
  const [slugManuallyEdited, setSlugManuallyEdited] = useState(false);
  const [creating, setCreating] = useState(false);

  // Edit modal state
  const [showEditModal, setShowEditModal] = useState(false);
  const [editingIndustry, setEditingIndustry] =
    useState<IndustryListItem | null>(null);
  const [editName, setEditName] = useState("");
  const [editSlug, setEditSlug] = useState("");
  const [editImage, setEditImage] = useState("");
  const [editImageAlt, setEditImageAlt] = useState("");
  const [editShortDescription, setEditShortDescription] = useState("");
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
    setNewIndustryImage("");
    setNewIndustryImageAlt("");
    setNewIndustryShortDescription("");
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
    setEditImage(industry.image ?? "");
    setEditImageAlt(industry.imageAlt ?? "");
    setEditShortDescription(industry.shortDescription ?? "");
    setEditSlugManuallyEdited(false);
    setShowEditModal(true);
  };

  const resetEditForm = () => {
    setEditingIndustry(null);
    setEditName("");
    setEditSlug("");
    setEditImage("");
    setEditImageAlt("");
    setEditShortDescription("");
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

  // True until the first load finishes, so the empty message never shows while data is loading.
  const [listLoading, setListLoading] = useState(true);
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

    fetchIndustriesData().finally(() => setListLoading(false));
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
          image: newIndustryImage,
          imageAlt: newIndustryImageAlt.trim(),
          shortDescription: newIndustryShortDescription.trim(),
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
          image: editImage,
          imageAlt: editImageAlt.trim(),
          shortDescription: editShortDescription.trim(),
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

  // --- Reorder logic ---
  const getIndustryPos = (id: string) =>
    industries.findIndex((item) => item._id === id);

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    if (!over || active.id === over.id) return;

    setIndustries((industries) => {
      const originalPos = getIndustryPos(active.id as string);
      const newPos = getIndustryPos(over.id as string);
      return arrayMove(industries, originalPos, newPos);
    });
  };

  const startReorder = () => {
    setSelectedIds([]);
    setReorderMode(true);
  };

  const confirmReorder = async () => {
    setReorderMode(false);

    try {
      const response = await fetch("/api/industry/reorder", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          industries: industries.map((industry) => ({ _id: industry._id })),
        }),
      });

      const data = await response.json();

      if (response.ok) {
        toast.success(data.message ?? "Order updated");
      } else {
        toast.error(data.message ?? "Failed to update order");
        setRefetch((prev) => !prev);
      }
    } catch (error) {
      console.error(error);
      toast.error("Failed to update order");
      setRefetch((prev) => !prev);
    }
  };

  return (
    <div className="flex flex-col gap-6">
      <div className="flex min-h-[calc(100vh-200px)] flex-col gap-6">
        <PageHeader
          title="Industries"
          description={
            reorderMode
              ? "Drag rows using the handle, then click Confirm to save the new order."
              : "Manage industry names, slugs and landing-page details. Open an industry to edit its page content."
          }
          actions={
            <>
              {!reorderMode && selectedIds.length > 0 && (
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
                className={adminButtonClass(
                  reorderMode ? "primary" : "secondary",
                )}
                onClick={reorderMode ? confirmReorder : startReorder}
              >
                {reorderMode ? (
                  <Check className="size-4" />
                ) : (
                  <ArrowUpDown className="size-4" />
                )}
                {!reorderMode ? "Reorder" : "Confirm"}
              </button>

              {!reorderMode && (
                <button
                  onClick={() => setShowCreateModal(true)}
                  className={adminButtonClass("dark")}
                >
                  <Plus className="size-4" />
                  Create Industry
                </button>
              )}
            </>
          }
        />

        <SectionCard
          title="All industries"
          description={
            reorderMode
              ? "Reorder mode: changes are saved only when you click Confirm."
              : "Use the icons to edit details, open the page editor, or view the live page."
          }
          bodyClassName={
            industries && industries.length > 0 ? "p-0" : undefined
          }
        >
          {industries && industries.length > 0 ? (
            <div className="min-h-[600px] overflow-x-auto">
              <table className="w-full text-left text-sm text-slate-700 dark:text-slate-300">
                <thead className="border-b border-slate-200 bg-slate-50 text-xs uppercase text-slate-500 dark:border-slate-700 dark:bg-slate-900/40 dark:text-slate-400">
                  <tr>
                    <th scope="col" className="w-12 px-5 py-3">
                      {reorderMode ? (
                        ""
                      ) : (
                        <input
                          type="checkbox"
                          checked={selectedIds.length === industries.length}
                          onChange={toggleSelectAll}
                        />
                      )}
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

                {reorderMode ? (
                  <DndContext
                    collisionDetection={closestCorners}
                    onDragEnd={handleDragEnd}
                  >
                    <SortableContext
                      items={industries.map((item) => item._id)}
                      strategy={verticalListSortingStrategy}
                    >
                      <tbody>
                        {industries.map((item) => (
                          <SortableIndustryRow item={item} key={item._id}>
                            <td className="px-5 py-3 font-medium text-slate-900 dark:text-white">
                              {item.name}
                            </td>
                            <td className="px-5 py-3 font-mono text-xs text-slate-500 dark:text-slate-400">
                              {item.slug}
                            </td>
                            <td className="px-5 py-3 text-center text-slate-400">
                              —
                            </td>
                          </SortableIndustryRow>
                        ))}
                      </tbody>
                    </SortableContext>
                  </DndContext>
                ) : (
                  <tbody>
                    {industries.map((item, i) => (
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
                              onClick={() => handleOpenIndustryPage(item.slug)}
                              title="Edit page content"
                              aria-label="Edit page content"
                              className={iconButtonClass}
                            >
                              <FaBookOpen className="text-base" />
                            </button>
                            {/* Industries are served at /industries/{slug}:
                                app/(user)/industries/[slug]/page.tsx (canonical
                                `https://www.globalsurf.ae/industries/${industry.slug}`), and the
                                public site links them as `/industries/${item.slug}`
                                (app/components/EngineeringInfrastructure/IndustriesSec.tsx). */}
                            <ViewLiveLink
                              href={
                                item.slug ? `/industries/${item.slug}` : null
                              }
                            />
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                )}
              </table>
            </div>
          ) : listLoading ? (
            <LoadingState />
          ) : (
            <EmptyState title="No industries available" />
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
                      Create New Industry
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
                    <label className={modalLabelClass}>Industry Name</label>
                    <input
                      type="text"
                      value={newIndustryName}
                      onChange={(e) => handleNameChange(e.target.value)}
                      placeholder="e.g. Healthcare"
                      className={modalInputClass}
                    />
                  </div>

                  <div className="flex flex-col gap-2 text-left">
                    <label className={modalLabelClass}>Slug</label>
                    <input
                      type="text"
                      value={newIndustrySlug}
                      onChange={(e) => handleSlugChange(e.target.value)}
                      placeholder="e.g. healthcare"
                      className={`${modalInputClass} font-mono`}
                    />
                    <p className="text-xs text-slate-500 dark:text-slate-400">
                      Auto-filled from the name, but you can edit it directly.
                      This becomes part of the page URL, e.g. /industries/
                      {newIndustrySlug || "your-slug"}
                    </p>
                  </div>

                  <div className="flex flex-col gap-2 text-left">
                    <label className={modalLabelClass}>Image</label>
                    <ImageUploader
                      value={newIndustryImage}
                      onChange={setNewIndustryImage}
                      className="h-fit w-[200px]"
                    />
                  </div>

                  <div className="flex flex-col gap-2 text-left">
                    <label className={modalLabelClass}>Image Alt Tag</label>
                    <input
                      type="text"
                      value={newIndustryImageAlt}
                      onChange={(e) => setNewIndustryImageAlt(e.target.value)}
                      placeholder="e.g. Engineers reviewing construction plans"
                      className={modalInputClass}
                    />
                  </div>

                  <div className="flex flex-col gap-2 text-left">
                    <label className={modalLabelClass}>Short Description</label>
                    <textarea
                      value={newIndustryShortDescription}
                      onChange={(e) =>
                        setNewIndustryShortDescription(e.target.value)
                      }
                      placeholder="One or two sentences shown on the industry landing page"
                      rows={3}
                      className={modalTextareaClass}
                    />
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
                      onClick={handleCreateIndustry}
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
                      Edit Industry
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
                    <label className={modalLabelClass}>Industry Name</label>
                    <input
                      type="text"
                      value={editName}
                      onChange={(e) => handleEditNameChange(e.target.value)}
                      placeholder="e.g. Healthcare"
                      className={modalInputClass}
                    />
                  </div>

                  <div className="flex flex-col gap-2 text-left">
                    <label className={modalLabelClass}>Slug</label>
                    <input
                      type="text"
                      value={editSlug}
                      onChange={(e) => handleEditSlugChange(e.target.value)}
                      placeholder="e.g. healthcare"
                      className={`${modalInputClass} font-mono`}
                    />
                    <p className="text-xs text-slate-500 dark:text-slate-400">
                      This becomes part of the page URL, e.g. /industries/
                      {editSlug || "your-slug"}
                    </p>
                  </div>

                  <div className="flex flex-col gap-2 text-left">
                    <label className={modalLabelClass}>Image</label>
                    <ImageUploader
                      value={editImage}
                      onChange={setEditImage}
                      className="h-fit w-[200px]"
                    />
                  </div>

                  <div className="flex flex-col gap-2 text-left">
                    <label className={modalLabelClass}>Image Alt Tag</label>
                    <input
                      type="text"
                      value={editImageAlt}
                      onChange={(e) => setEditImageAlt(e.target.value)}
                      placeholder="e.g. Engineers reviewing construction plans"
                      className={modalInputClass}
                    />
                  </div>

                  <div className="flex flex-col gap-2 text-left">
                    <label className={modalLabelClass}>Short Description</label>
                    <textarea
                      value={editShortDescription}
                      onChange={(e) => setEditShortDescription(e.target.value)}
                      placeholder="One or two sentences shown on the industry landing page"
                      rows={3}
                      className={modalTextareaClass}
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
                      onClick={handleUpdateIndustry}
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

        {!reorderMode && industries && industries.length > 0 && (
          <div className="mb-10">
            <SmartPagination
              page={page}
              totalPages={totalPages}
              setPage={changePage}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminIndustryList;
