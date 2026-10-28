"use client";

import { LoadingState } from "@/app/components/AdminUI";
import React, { useEffect, useState } from "react";
import { toast } from "sonner";
import { MdDelete, MdEdit } from "react-icons/md";
import { IoIosClose } from "react-icons/io";
import { ImageUploader } from "@/components/ui/image-uploader";
import { Plus } from "lucide-react";
import {
  AdminButton,
  EmptyState,
  SectionCard,
  adminButtonClass,
} from "../AdminUI";

// Presentation-only class names shared by the table actions and the modal fields.
const iconButtonClass =
  "inline-flex size-8 items-center justify-center rounded-lg text-slate-500 transition-colors hover:bg-slate-100 hover:text-slate-900 dark:text-slate-400 dark:hover:bg-slate-700 dark:hover:text-white";
const dangerIconButtonClass =
  "inline-flex size-8 items-center justify-center rounded-lg text-red-500 transition-colors hover:bg-red-50 hover:text-red-600 dark:hover:bg-red-500/10";
const modalLabelClass =
  "text-sm font-medium text-slate-700 dark:text-slate-200";
const modalInputClass =
  "h-10 rounded-lg border border-slate-300 bg-white px-3 text-sm text-slate-900 focus:border-slate-500 focus:outline-none focus:ring-2 focus:ring-slate-200 dark:border-slate-600 dark:bg-slate-900 dark:text-white dark:focus:ring-slate-700";

type ServiceIndustryItem = {
  _id: string;
  image: string;
  imageAlt: string;
  title: string;
  page?: string; // linked page's _id
  pageLink?: string; // linked page's slug, saved for convenience
};

// Adjust the shape here if your /api/page response differs
type PageListItem = {
  _id: string;
  title: string; // change to `name` if that's what your Page model uses
  slug: string;
  name: string;
};

const AdminServiceIndustryList = () => {
  const [industries, setIndustries] = useState<ServiceIndustryItem[]>([]);
  const [refetch, setRefetch] = useState(false);

  const [pages, setPages] = useState<PageListItem[]>([]);

  const [showModal, setShowModal] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [image, setImage] = useState("");
  const [imageAlt, setImageAlt] = useState("");
  const [title, setTitle] = useState("");
  const [pageId, setPageId] = useState("");
  const [saving, setSaving] = useState(false);

  const resetForm = () => {
    setEditingId(null);
    setImage("");
    setImageAlt("");
    setTitle("");
    setPageId("");
  };

  // True until the first load finishes, so the empty message never shows while data is loading.
  const [listLoading, setListLoading] = useState(true);
  useEffect(() => {
    const fetchIndustries = async () => {
      try {
        const response = await fetch(`/api/service-industry`);
        if (response.ok) {
          const data = await response.json();
          setIndustries(data.data);
        }
      } catch (error) {
        console.error("Error fetching service industries:", error);
      }
    };
    fetchIndustries().finally(() => setListLoading(false));
  }, [refetch]);

  // Fetch pages once, for the linked-page selector
  useEffect(() => {
    const fetchPages = async () => {
      try {
        const response = await fetch(`/api/industry`); // adjust endpoint if needed
        if (response.ok) {
          const data = await response.json();
          setPages(data.data ?? data);
        }
      } catch (error) {
        console.error("Error fetching pages:", error);
      }
    };
    fetchPages();
  }, []);

  const openCreateModal = () => {
    resetForm();
    setShowModal(true);
  };

  const openEditModal = (item: ServiceIndustryItem) => {
    setEditingId(item._id);
    setImage(item.image);
    setImageAlt(item.imageAlt);
    setTitle(item.title);
    setPageId(item.page ?? "");
    setShowModal(true);
  };

  const handleSave = async () => {
    if (!image.trim()) return toast.error("Image is required");
    if (!imageAlt.trim()) return toast.error("Alt tag is required");
    if (!title.trim()) return toast.error("Title is required");

    const selectedPage = pages.find((p) => p._id === pageId);

    setSaving(true);
    try {
      const url = editingId
        ? `/api/service-industry/${editingId}`
        : `/api/service-industry`;
      const method = editingId ? "PATCH" : "POST";

      const response = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          image,
          imageAlt,
          title,
          page: pageId || null,
          // pageLink: selectedPage?.slug ?? null,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        toast.success(data.message);
        setShowModal(false);
        resetForm();
        setRefetch((prev) => !prev);
      } else {
        toast.error(data.message ?? "Failed to save");
      }
    } catch (error) {
      console.error(error);
      toast.error("Failed to save service industry");
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Delete this industry?")) return;

    try {
      const response = await fetch(`/api/service-industry/${id}`, {
        method: "DELETE",
      });
      const data = await response.json();

      if (response.ok) {
        toast.success(data.message);
        setRefetch((prev) => !prev);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.error(error);
      toast.error("Failed to delete");
    }
  };

  return (
    <div className="flex flex-col gap-6">
      <SectionCard
        title={
          <span className="flex items-center gap-3">
            Service Industries
            <span className="rounded-full bg-slate-100 px-2.5 py-0.5 text-xs font-medium text-slate-600 dark:bg-slate-700 dark:text-slate-300">
              {industries.length}
            </span>
          </span>
        }
        description="Industry tiles shown on service pages, each optionally linked to an industry page."
        actions={
          <AdminButton
            variant="dark"
            icon={<Plus className="size-4" />}
            onClick={openCreateModal}
          >
            Add Industry
          </AdminButton>
        }
        bodyClassName={industries.length > 0 ? "p-0" : undefined}
      >
        {industries.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm text-slate-700 dark:text-slate-300">
              <thead className="border-b border-slate-200 bg-slate-50 text-xs uppercase text-slate-500 dark:border-slate-700 dark:bg-slate-900/40 dark:text-slate-400">
                <tr>
                  <th className="px-5 py-3 font-medium">Image</th>
                  <th className="px-5 py-3 font-medium">Title</th>
                  <th className="px-5 py-3 text-center font-medium">Edit</th>
                  <th className="px-5 py-3 text-center font-medium">Delete</th>
                </tr>
              </thead>
              <tbody>
                {industries.map((item) => (
                  <tr
                    key={item._id}
                    className="border-b border-slate-100 last:border-b-0 hover:bg-slate-50 dark:border-slate-700 dark:hover:bg-slate-700/40"
                  >
                    <td className="px-5 py-3">
                      {item.image && (
                        // eslint-disable-next-line @next/next/no-img-element
                        <img
                          src={item.image}
                          alt={item.imageAlt}
                          className="h-10 w-10 rounded-lg border border-slate-200 object-cover dark:border-slate-700"
                        />
                      )}
                    </td>
                    <td className="px-5 py-3 font-medium text-slate-900 dark:text-white">
                      {item.title}
                    </td>
                    <td className="px-5 py-3 text-center">
                      <button
                        onClick={() => openEditModal(item)}
                        title="Edit"
                        aria-label="Edit"
                        className={iconButtonClass}
                      >
                        <MdEdit className="text-base" />
                      </button>
                    </td>
                    <td className="px-5 py-3 text-center">
                      <button
                        onClick={() => handleDelete(item._id)}
                        title="Delete"
                        aria-label="Delete"
                        className={dangerIconButtonClass}
                      >
                        <MdDelete className="text-base" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : listLoading ? (
          <LoadingState />
        ) : (
          <EmptyState title="No industries available" />
        )}
      </SectionCard>

      {showModal && (
        <div className="relative z-10" role="dialog" aria-modal="true">
          <div className="fixed inset-0 bg-slate-900/50" aria-hidden="true" />
          <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
            <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
              <div className="relative flex transform flex-col gap-5 overflow-hidden rounded-xl border border-slate-200 bg-white p-6 text-left shadow-xl dark:border-slate-700 dark:bg-slate-800 sm:my-8 sm:w-full sm:max-w-lg">
                <div className="flex items-center justify-between border-b border-slate-200 pb-4 dark:border-slate-700">
                  <h2 className="text-lg font-semibold text-slate-900 dark:text-white">
                    {editingId ? "Edit Industry" : "Add Industry"}
                  </h2>
                  <IoIosClose
                    className="cursor-pointer text-2xl text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white"
                    onClick={() => {
                      setShowModal(false);
                      resetForm();
                    }}
                  />
                </div>

                <div className="flex flex-col gap-2 text-left">
                  <label className={modalLabelClass}>Image</label>
                  <ImageUploader
                    value={image}
                    onChange={setImage}
                    className="h-fit w-[200px]"
                  />
                </div>

                <div className="flex flex-col gap-2 text-left">
                  <label className={modalLabelClass}>Image Alt Tag</label>
                  <input
                    type="text"
                    value={imageAlt}
                    onChange={(e) => setImageAlt(e.target.value)}
                    placeholder="Alt tag"
                    className={modalInputClass}
                  />
                </div>

                <div className="flex flex-col gap-2 text-left">
                  <label className={modalLabelClass}>Title</label>
                  <input
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="e.g. Healthcare"
                    className={modalInputClass}
                  />
                </div>

                <div className="flex flex-col gap-2 text-left">
                  <label className={modalLabelClass}>Linked Page</label>
                  <select
                    value={pageId}
                    onChange={(e) => setPageId(e.target.value)}
                    className={modalInputClass}
                  >
                    <option value="">— No page —</option>
                    {pages.map((p) => (
                      <option key={p._id} value={p._id}>
                        {p.name}
                      </option>
                    ))}
                  </select>
                  <p className="text-xs text-slate-500 dark:text-slate-400">
                    Choose which page this industry should link to.
                  </p>
                </div>

                <div className="gap-2 border-t border-slate-200 pt-4 dark:border-slate-700 sm:flex sm:flex-row-reverse">
                  <button
                    type="button"
                    disabled={saving}
                    className={adminButtonClass(
                      "dark",
                      "md",
                      "w-full sm:w-auto",
                    )}
                    onClick={handleSave}
                  >
                    {saving ? "Saving..." : "Save"}
                  </button>
                  <button
                    type="button"
                    className={adminButtonClass(
                      "secondary",
                      "md",
                      "mt-3 w-full sm:mt-0 sm:w-auto",
                    )}
                    onClick={() => {
                      setShowModal(false);
                      resetForm();
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
  );
};

export default AdminServiceIndustryList;
