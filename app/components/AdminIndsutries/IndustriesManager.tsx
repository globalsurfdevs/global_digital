// "use client"

// import React, { useEffect, useState } from 'react'
// import { toast } from 'sonner'
// import { IoIosClose } from 'react-icons/io'

// type Industry = { _id: string; name: string }

// const IndustryManager = () => {
//     const [industries, setIndustries] = useState<Industry[]>([])
//     const [newIndustry, setNewIndustry] = useState("")
//     const [loading, setLoading] = useState(false)
//     const [refetch, setRefetch] = useState(false)

//     useEffect(() => {
//         const fetch_ = async () => {
//             const res = await fetch('/api/industries')
//             const data = await res.json()
//             if (!data.error) setIndustries(data.industries)
//         }
//         fetch_()
//     }, [refetch])

//     const handleAdd = async () => {
//         if (!newIndustry.trim()) return toast.error("Enter an industry name")
//         setLoading(true)
//         const formData = new FormData()
//         formData.append("name", newIndustry.trim())
//         const res = await fetch('/api/industries', { method: "POST", body: formData })
//         const data = await res.json()
//         if (data.error) toast.error(data.error)
//         else {
//             toast.success(data.message)
//             setNewIndustry("")
//             setRefetch(p => !p)
//         }
//         setLoading(false)
//     }

//     const handleDelete = async (id: string) => {
//         const res = await fetch(`/api/industries?id=${id}`, { method: "DELETE" })
//         const data = await res.json()
//         if (data.error) toast.error(data.error)
//         else {
//             toast.success(data.message)
//             setRefetch(p => !p)
//         }
//     }

//     return (
//         <div className="border rounded-xl p-5 flex flex-col gap-4">
//             <h2 className="text-xl font-semibold">Manage Industries</h2>

//             {/* Add */}
//             <div className="flex gap-2">
//                 <input
//                     type="text"
//                     value={newIndustry}
//                     onChange={e => setNewIndustry(e.target.value)}
//                     onKeyDown={e => e.key === "Enter" && handleAdd()}
//                     placeholder="e.g. Healthcare"
//                     className="rounded-md pl-4 border border-gray-300 py-1 flex-1 text-black bg-transparent focus:outline-none"
//                 />
//                 <button
//                     onClick={handleAdd}
//                     disabled={loading}
//                     className="bg-black text-white px-5 py-1 rounded-full text-sm"
//                 >
//                     {loading ? "Adding..." : "Add"}
//                 </button>
//             </div>

//             {/* List */}
//             <div className="flex flex-wrap gap-2">
//                 {industries.length === 0 && <p className="text-sm text-gray-400">No industries yet.</p>}
//                 {industries.map(item => (
//                     <div
//                         key={item._id}
//                         className="flex items-center gap-1 border rounded-full px-3 py-1 text-sm bg-gray-100"
//                     >
//                         <span>{item.name}</span>
//                         <button onClick={() => handleDelete(item._id)}>
//                             <IoIosClose className="text-lg text-red-500" />
//                         </button>
//                     </div>
//                 ))}
//             </div>
//         </div>
//     )
// }

// export default IndustryManager

"use client";

import { LoadingState } from "@/app/components/AdminUI";
import React, { useEffect, useState } from "react";
import { toast } from "sonner";
import { IoIosClose } from "react-icons/io";
import { IoChevronDown, IoChevronUp } from "react-icons/io5";
import {
  EmptyState,
  adminButtonClass,
} from "@/app/components/AdminUI";

type SubCategory = { _id: string; name: string };
type Category = { _id: string; name: string; subCategories: SubCategory[] };

const IndustryManager = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [newCategory, setNewCategory] = useState("");
  const [newSub, setNewSub] = useState<Record<string, string>>({});
  const [expanded, setExpanded] = useState<Record<string, boolean>>({});
  const [loading, setLoading] = useState(false);
  const [refetch, setRefetch] = useState(false);
  const [managerOpen, setManagerOpen] = useState(false);

  // True until the first load finishes, so the empty message never shows while data is loading.
  const [listLoading, setListLoading] = useState(true);
  useEffect(() => {
    if (!managerOpen) return;
    setListLoading(true);
    const load = async () => {
      try {
        const res = await fetch("/api/industries");
        const data = await res.json();
        if (!data.error) setCategories(data.categories ?? []);
      } catch (e) {
        console.error(e);
      }
    };
    load().finally(() => setListLoading(false));
  }, [refetch, managerOpen]);

  const refresh = () => setRefetch((p) => !p);

  const toggleExpand = (id: string) =>
    setExpanded((prev) => ({ ...prev, [id]: !prev[id] }));

  const handleAddCategory = async () => {
    if (!newCategory.trim()) return toast.error("Enter a category name");
    setLoading(true);
    const fd = new FormData();
    fd.append("action", "add_category");
    fd.append("name", newCategory.trim());
    const res = await fetch("/api/industries", { method: "POST", body: fd });
    const data = await res.json();
    if (data.error) toast.error(data.error);
    else {
      toast.success(data.message);
      setNewCategory("");
      refresh();
    }
    setLoading(false);
  };

  const handleAddSub = async (categoryId: string) => {
    const name = newSub[categoryId]?.trim();
    if (!name) return toast.error("Enter a sub-category name");
    const fd = new FormData();
    fd.append("action", "add_sub");
    fd.append("categoryId", categoryId);
    fd.append("name", name);
    const res = await fetch("/api/industries", { method: "POST", body: fd });
    const data = await res.json();
    if (data.error) toast.error(data.error);
    else {
      toast.success(data.message);
      setNewSub((prev) => ({ ...prev, [categoryId]: "" }));
      refresh();
    }
  };

  const handleDeleteCategory = async (categoryId: string) => {
    const res = await fetch(`/api/industries?categoryId=${categoryId}`, {
      method: "DELETE",
    });
    const data = await res.json();
    if (data.error) toast.error(data.error);
    else {
      toast.success(data.message);
      refresh();
    }
  };

  const handleDeleteSub = async (categoryId: string, subId: string) => {
    const res = await fetch(
      `/api/industries?categoryId=${categoryId}&subId=${subId}`,
      { method: "DELETE" },
    );
    const data = await res.json();
    if (data.error) toast.error(data.error);
    else {
      toast.success(data.message);
      refresh();
    }
  };

  const handleRename = async (action: "update_category" | "update_sub", categoryId: string, currentName: string, subId?: string) => {
    const name = window.prompt("Enter the new name:", currentName)?.trim();
    if (!name || name === currentName) return;
    const formData = new FormData();
    formData.append("action", action);
    formData.append("categoryId", categoryId);
    formData.append("name", name);
    if (subId) formData.append("subId", subId);
    const res = await fetch("/api/industries", { method: "PATCH", body: formData });
    const data = await res.json();
    if (!res.ok) toast.error(data.error || "Could not update industry.");
    else {
      toast.success(data.message || "Industry updated.");
      refresh();
    }
  };

  return (
    <section className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm dark:border-slate-700 dark:bg-slate-800">
      <button type="button" aria-expanded={managerOpen} onClick={() => setManagerOpen((value) => !value)} className="flex w-full items-center justify-between gap-3 px-5 py-4 text-left">
        <span><span className="block text-base font-semibold text-slate-900 dark:text-white">Portfolio industries</span><span className="mt-0.5 block text-sm text-slate-500 dark:text-slate-400">Manage industries and their sub-categories.</span></span>
        <span className="flex items-center gap-2 text-sm text-slate-500">{managerOpen ? categories.length : ""}{managerOpen ? <IoChevronUp /> : <IoChevronDown />}</span>
      </button>
      {managerOpen && <div className="flex flex-col gap-5 border-t border-slate-200 p-5 dark:border-slate-700">
      <div className="flex gap-2">
        <input
          type="text"
          value={newCategory}
          onChange={(e) => setNewCategory(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleAddCategory()}
          placeholder="e.g. Healthcare"
          className="h-10 flex-1 rounded-lg border border-slate-300 bg-transparent pl-4 text-sm text-black focus:border-slate-500 focus:outline-none dark:border-slate-600 dark:text-white"
        />
        <button
          onClick={handleAddCategory}
          disabled={loading}
          className={adminButtonClass("dark")}
        >
          {loading ? "Adding..." : "Add Industry"}
        </button>
      </div>

      <div className="flex flex-col gap-3">
        {categories.length === 0 &&
          (listLoading ? (
            <LoadingState />
          ) : (
            <EmptyState title="No categories yet." />
          ))}
        {categories.map((cat) => (
          <div
            key={cat._id}
            className="overflow-hidden rounded-xl border border-slate-200 dark:border-slate-700"
          >
            <div className="flex items-center justify-between bg-slate-50 px-4 py-3 dark:bg-slate-900/40">
              <button
                className="flex flex-1 items-center gap-2 text-left"
                onClick={() => toggleExpand(cat._id)}
              >
                <span className="text-sm font-medium text-slate-800 dark:text-slate-100">
                  {cat.name}
                </span>
                <span className="text-xs text-slate-400">
                  ({cat.subCategories?.length ?? 0})
                </span>
                {expanded[cat._id] ? (
                  <IoChevronUp className="ml-auto text-slate-400" />
                ) : (
                  <IoChevronDown className="ml-auto text-slate-400" />
                )}
              </button>
              <button
                type="button"
                onClick={() => void handleRename("update_category", cat._id, cat.name)}
                className="ml-2 text-xs text-slate-600 hover:underline dark:text-slate-300"
              >
                Rename
              </button>
              <button
                onClick={() => handleDeleteCategory(cat._id)}
                className="ml-3 rounded-lg text-red-500 transition-colors hover:bg-red-50 hover:text-red-700 dark:hover:bg-red-500/10"
              >
                <IoIosClose className="text-2xl" />
              </button>
            </div>

            {expanded[cat._id] && (
              <div className="flex flex-col gap-3 border-t border-slate-200 bg-white px-4 py-3 dark:border-slate-700 dark:bg-slate-800">
                <div className="flex flex-wrap gap-2">
                  {(cat.subCategories?.length ?? 0) === 0 && (
                    <p className="text-xs text-slate-400">
                      No sub-categories yet.
                    </p>
                  )}
                  {cat.subCategories?.map((sub) => (
                    <div
                      key={sub._id}
                      className="flex items-center gap-1 rounded-full border border-slate-200 bg-slate-100 px-3 py-1 text-xs text-slate-700 dark:border-slate-600 dark:bg-slate-700 dark:text-slate-200"
                    >
                      <span>{sub.name}</span>
                      <button
                        type="button"
                        aria-label={`Rename ${sub.name}`}
                        onClick={() => void handleRename("update_sub", cat._id, sub.name, sub._id)}
                        className="text-slate-500 hover:text-slate-800"
                      >
                        Edit
                      </button>
                      <button onClick={() => handleDeleteSub(cat._id, sub._id)}>
                        <IoIosClose className="text-base text-red-500" />
                      </button>
                    </div>
                  ))}
                </div>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={newSub[cat._id] ?? ""}
                    onChange={(e) =>
                      setNewSub((prev) => ({
                        ...prev,
                        [cat._id]: e.target.value,
                      }))
                    }
                    onKeyDown={(e) =>
                      e.key === "Enter" && handleAddSub(cat._id)
                    }
                    placeholder="Add sub-category..."
                    className="h-8 flex-1 rounded-lg border border-slate-300 bg-transparent pl-3 text-xs text-black focus:border-slate-500 focus:outline-none dark:border-slate-600 dark:text-white"
                  />
                  <button
                    onClick={() => handleAddSub(cat._id)}
                    className={adminButtonClass("dark", "sm")}
                  >
                    Add
                  </button>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
      </div>}
    </section>
  );
};

export default IndustryManager;
