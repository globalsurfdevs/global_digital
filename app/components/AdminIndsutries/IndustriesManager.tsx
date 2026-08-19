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

import React, { useEffect, useState } from "react";
import { toast } from "sonner";
import { IoIosClose } from "react-icons/io";
import { IoChevronDown, IoChevronUp } from "react-icons/io5";

type SubCategory = { _id: string; name: string };
type Category = { _id: string; name: string; subCategories: SubCategory[] };

const IndustryManager = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [newCategory, setNewCategory] = useState("");
  const [newSub, setNewSub] = useState<Record<string, string>>({});
  const [expanded, setExpanded] = useState<Record<string, boolean>>({});
  const [loading, setLoading] = useState(false);
  const [refetch, setRefetch] = useState(false);

  useEffect(() => {
    const load = async () => {
      try {
        const res = await fetch("/api/industries");
        const data = await res.json();
        if (!data.error) setCategories(data.categories ?? []);
      } catch (e) {
        console.error(e);
      }
    };
    load();
  }, [refetch]);

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

  return (
    <div className="flex flex-col gap-5 rounded-xl border p-5">
      <h2 className="text-xl font-semibold">Manage Porfolio Industries</h2>

      <div className="flex gap-2">
        <input
          type="text"
          value={newCategory}
          onChange={(e) => setNewCategory(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleAddCategory()}
          placeholder="e.g. Healthcare"
          className="flex-1 rounded-md border border-gray-300 bg-transparent py-1.5 pl-4 text-sm text-black focus:outline-none"
        />
        <button
          onClick={handleAddCategory}
          disabled={loading}
          className="rounded-full bg-black px-5 py-1.5 text-sm text-white"
        >
          {loading ? "Adding..." : "Add Category"}
        </button>
      </div>

      <div className="flex flex-col gap-3">
        {categories.length === 0 && (
          <p className="text-sm text-gray-400">No categories yet.</p>
        )}
        {categories.map((cat) => (
          <div key={cat._id} className="overflow-hidden rounded-xl border">
            <div className="flex items-center justify-between bg-gray-50 px-4 py-3">
              <button
                className="flex flex-1 items-center gap-2 text-left"
                onClick={() => toggleExpand(cat._id)}
              >
                <span className="text-sm font-medium">{cat.name}</span>
                <span className="text-xs text-gray-400">
                  ({cat.subCategories?.length ?? 0})
                </span>
                {expanded[cat._id] ? (
                  <IoChevronUp className="ml-auto text-gray-400" />
                ) : (
                  <IoChevronDown className="ml-auto text-gray-400" />
                )}
              </button>
              <button
                onClick={() => handleDeleteCategory(cat._id)}
                className="ml-3 text-red-500 hover:text-red-700"
              >
                <IoIosClose className="text-2xl" />
              </button>
            </div>

            {expanded[cat._id] && (
              <div className="flex flex-col gap-3 bg-white px-4 py-3">
                <div className="flex flex-wrap gap-2">
                  {(cat.subCategories?.length ?? 0) === 0 && (
                    <p className="text-xs text-gray-400">
                      No sub-categories yet.
                    </p>
                  )}
                  {cat.subCategories?.map((sub) => (
                    <div
                      key={sub._id}
                      className="flex items-center gap-1 rounded-full border bg-gray-100 px-3 py-1 text-xs"
                    >
                      <span>{sub.name}</span>
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
                    className="flex-1 rounded-md border border-gray-300 bg-transparent py-1 pl-3 text-xs text-black focus:outline-none"
                  />
                  <button
                    onClick={() => handleAddSub(cat._id)}
                    className="rounded-full bg-black px-4 py-1 text-xs text-white"
                  >
                    Add
                  </button>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default IndustryManager;
