"use client";

import React, { useEffect, useState } from "react";
import { toast } from "sonner";
import { MdDelete, MdEdit } from "react-icons/md";
import { IoIosClose } from "react-icons/io";
import { ImageUploader } from "@/components/ui/image-uploader";

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
    fetchIndustries();
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
    <div className="flex flex-col gap-5">
      <div className="flex items-center justify-between px-1">
        <h1 className="text-xl">Service Industries</h1>
        <button
          onClick={openCreateModal}
          className="rounded bg-black px-4 py-2 text-white"
        >
          + Add Industry
        </button>
      </div>

      {industries.length > 0 ? (
        <div className="overflow-x-auto rounded-lg border border-gray-200 shadow dark:border-gray-700">
          <table className="w-full text-left text-sm text-gray-700 dark:text-gray-300">
            <thead className="bg-gray-100 text-xs uppercase text-gray-700 dark:bg-gray-800 dark:text-gray-300">
              <tr>
                <th className="px-4 py-3">Image</th>
                <th className="px-4 py-3">Title</th>
                <th className="px-4 py-3 text-center">Edit</th>
                <th className="px-4 py-3 text-center">Delete</th>
              </tr>
            </thead>
            <tbody>
              {industries.map((item) => (
                <tr
                  key={item._id}
                  className="border-b border-gray-200 bg-white hover:bg-gray-50 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700"
                >
                  <td className="px-4 py-3">
                    {item.image && (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img
                        src={item.image}
                        alt={item.imageAlt}
                        className="h-10 w-10 rounded object-cover"
                      />
                    )}
                  </td>
                  <td className="px-4 py-3 font-medium text-gray-900 dark:text-white">
                    {item.title}
                  </td>
                  <td className="px-4 py-3 text-center">
                    <button onClick={() => openEditModal(item)}>
                      <MdEdit className="mx-auto text-lg" />
                    </button>
                  </td>
                  <td className="px-4 py-3 text-center">
                    <button onClick={() => handleDelete(item._id)}>
                      <MdDelete className="mx-auto text-lg text-red-600" />
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

      {showModal && (
        <div className="relative z-10" role="dialog" aria-modal="true">
          <div className="fixed inset-0 bg-gray-500/75" aria-hidden="true" />
          <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
            <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
              <div className="relative flex transform flex-col gap-5 overflow-hidden rounded-lg bg-white p-5 text-left shadow-xl sm:my-8 sm:w-full sm:max-w-lg">
                <div className="flex items-center justify-between">
                  <h2 className="text-lg font-semibold">
                    {editingId ? "Edit Industry" : "Add Industry"}
                  </h2>
                  <IoIosClose
                    className="cursor-pointer text-2xl"
                    onClick={() => {
                      setShowModal(false);
                      resetForm();
                    }}
                  />
                </div>

                <div className="flex flex-col gap-2 text-left">
                  <label className="text-sm font-semibold text-gray-600">
                    Image
                  </label>
                  <ImageUploader
                    value={image}
                    onChange={setImage}
                    className="h-fit w-[200px]"
                  />
                </div>

                <div className="flex flex-col gap-2 text-left">
                  <label className="text-sm font-semibold text-gray-600">
                    Image Alt Tag
                  </label>
                  <input
                    type="text"
                    value={imageAlt}
                    onChange={(e) => setImageAlt(e.target.value)}
                    placeholder="Alt tag"
                    className="rounded border px-3 py-2"
                  />
                </div>

                <div className="flex flex-col gap-2 text-left">
                  <label className="text-sm font-semibold text-gray-600">
                    Title
                  </label>
                  <input
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="e.g. Healthcare"
                    className="rounded border px-3 py-2"
                  />
                </div>

                <div className="flex flex-col gap-2 text-left">
                  <label className="text-sm font-semibold text-gray-600">
                    Linked Page
                  </label>
                  <select
                    value={pageId}
                    onChange={(e) => setPageId(e.target.value)}
                    className="rounded border px-3 py-2"
                  >
                    <option value="">— No page —</option>
                    {pages.map((p) => (
                      <option key={p._id} value={p._id}>
                        {p.name}
                      </option>
                    ))}
                  </select>
                  <p className="text-xs text-gray-500">
                    Choose which page this industry should link to.
                  </p>
                </div>

                <div className="gap-2 sm:flex sm:flex-row-reverse">
                  <button
                    type="button"
                    disabled={saving}
                    className="shadow-xs inline-flex w-full justify-center rounded-md bg-black px-3 py-2 text-sm font-semibold text-white hover:bg-gray-800 disabled:opacity-50 sm:w-auto"
                    onClick={handleSave}
                  >
                    {saving ? "Saving..." : "Save"}
                  </button>
                  <button
                    type="button"
                    className="shadow-xs mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto"
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
