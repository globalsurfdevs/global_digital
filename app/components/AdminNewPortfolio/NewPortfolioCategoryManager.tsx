"use client";

import { useCallback, useEffect, useState } from "react";
import { toast } from "sonner";
import { ChevronDown } from "lucide-react";
import { adminButtonClass } from "@/app/components/AdminUI";

type Category = { _id: string; name: string; link?: string };

export default function NewPortfolioCategoryManager() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [name, setName] = useState("");
  const [link, setLink] = useState("");
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editName, setEditName] = useState("");
  const [editLink, setEditLink] = useState("");
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [open, setOpen] = useState(false);

  const load = useCallback(async () => {
    try {
      const response = await fetch("/api/categories", { cache: "no-store" });
      const data = await response.json();
      if (!response.ok) throw new Error(data.error || "Could not load categories.");
      setCategories(data.categories ?? []);
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Could not load categories.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { if (open) void load(); }, [load, open]);

  const addCategory = async () => {
    if (!name.trim()) return toast.error("Enter a category name.");
    setSaving(true);
    try {
      const form = new FormData();
      form.set("category", name.trim());
      form.set("categoryLink", link.trim());
      const response = await fetch("/api/categories", { method: "POST", body: form });
      const data = await response.json();
      if (!response.ok) throw new Error(data.error || "Could not add category.");
      toast.success(data.message || "Category added.");
      setName("");
      setLink("");
      await load();
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Could not add category.");
    } finally {
      setSaving(false);
    }
  };

  const saveCategory = async (id: string) => {
    if (!editName.trim()) return toast.error("Enter a category name.");
    setSaving(true);
    try {
      const form = new FormData();
      form.set("id", id);
      form.set("name", editName.trim());
      form.set("link", editLink.trim());
      const response = await fetch("/api/categories", { method: "PATCH", body: form });
      const data = await response.json();
      if (!response.ok) throw new Error(data.error || "Could not update category.");
      toast.success(data.message || "Category updated.");
      setEditingId(null);
      await load();
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Could not update category.");
    } finally {
      setSaving(false);
    }
  };

  const deleteCategory = async (id: string) => {
    if (!window.confirm("Delete this category? Existing portfolio records will not be changed.")) return;
    const form = new FormData();
    form.set("id", id);
    const response = await fetch("/api/categories", { method: "DELETE", body: form });
    const data = await response.json();
    if (!response.ok) return toast.error(data.error || "Could not delete category.");
    toast.success(data.message || "Category deleted.");
    await load();
  };

  const inputClass = "h-10 min-w-0 flex-1 rounded-lg border border-slate-300 bg-white px-3 text-sm text-slate-900";

  return (
    <section className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm dark:border-slate-700 dark:bg-slate-800">
      <button type="button" aria-expanded={open} onClick={() => setOpen((value) => !value)} className="flex w-full items-center justify-between gap-3 px-5 py-4 text-left">
        <span><span className="block text-base font-semibold text-slate-900 dark:text-white">Categories</span><span className="mt-0.5 block text-sm text-slate-500 dark:text-slate-400">Create and manage portfolio categories.</span></span>
        <span className="flex items-center gap-2 text-sm text-slate-500">{open ? categories.length : ""}<ChevronDown className={`size-4 transition-transform ${open ? "rotate-180" : ""}`} /></span>
      </button>
      {open && <div className="flex flex-col gap-4 border-t border-slate-200 p-5 dark:border-slate-700">
      <div className="flex flex-col gap-2 sm:flex-row">
        <input className={inputClass} value={name} onChange={(event) => setName(event.target.value)} placeholder="Category name" aria-label="New category name" />
        <input className={inputClass} value={link} onChange={(event) => setLink(event.target.value)} placeholder="Category link (optional)" aria-label="New category link" />
        <button type="button" className={adminButtonClass("dark")} disabled={saving} onClick={() => void addCategory()}>{saving ? "Saving…" : "Add category"}</button>
      </div>

      <div className="flex flex-col gap-2">
        {loading ? <p className="text-sm text-slate-500">Loading categories…</p> : categories.length === 0 ? <p className="text-sm text-slate-500">No categories yet.</p> : categories.map((category) => (
          <details key={category._id} className="group rounded-lg border border-slate-200 bg-white">
            <summary className="flex cursor-pointer list-none items-center justify-between gap-3 px-4 py-3 text-sm font-medium text-slate-800">
              <span className="truncate">{category.name}</span><span className="text-xs text-slate-500">Edit / manage</span>
            </summary>
            <div className="flex flex-col gap-3 border-t border-slate-200 p-4">
              {editingId === category._id ? (
                <>
                  <input className={inputClass} value={editName} onChange={(event) => setEditName(event.target.value)} aria-label="Category name" />
                  <input className={inputClass} value={editLink} onChange={(event) => setEditLink(event.target.value)} placeholder="Category link (optional)" aria-label="Category link" />
                  <div className="flex gap-2">
                    <button type="button" className={adminButtonClass("dark", "sm")} disabled={saving} onClick={() => void saveCategory(category._id)}>Save changes</button>
                    <button type="button" className={adminButtonClass("secondary", "sm")} onClick={() => setEditingId(null)}>Cancel</button>
                  </div>
                </>
              ) : (
                <>
                  {category.link && <p className="break-all text-xs text-slate-500">Link: {category.link}</p>}
                  <div className="flex gap-2">
                    <button type="button" className={adminButtonClass("secondary", "sm")} onClick={() => { setEditingId(category._id); setEditName(category.name); setEditLink(category.link ?? ""); }}>Edit</button>
                    <button type="button" className={adminButtonClass("danger", "sm")} onClick={() => void deleteCategory(category._id)}>Delete</button>
                  </div>
                </>
              )}
            </div>
          </details>
        ))}
      </div>
      </div>}
    </section>
  );
}
