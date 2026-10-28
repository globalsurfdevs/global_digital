"use client";

import { LoadingState } from "@/app/components/AdminUI";
import { useEffect, useState } from "react";
import {
  DndContext,
  closestCorners,
  DragEndEvent,
  PointerSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import {
  SortableContext,
  verticalListSortingStrategy,
  arrayMove,
  useSortable,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { toast } from "sonner";
import { ArrowUpDown, Check } from "lucide-react";
import {
  EmptyState,
  SectionCard,
  adminButtonClass,
} from "@/app/components/AdminUI";

interface Category {
  _id: string;
  name: string;
  link: string;
  sortOrder: number;
}

function CategoryRow({ category }: { category: Category }) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: category._id });

  return (
    <div
      ref={setNodeRef}
      style={{ transform: CSS.Transform.toString(transform), transition }}
      className={`flex items-center gap-3 rounded-lg border border-slate-200 bg-white px-4 py-3 dark:border-slate-700 dark:bg-slate-800 ${
        isDragging ? "opacity-50 shadow-lg" : ""
      }`}
    >
      {/* Drag handle */}
      <button
        {...attributes}
        {...listeners}
        className="cursor-grab text-slate-400 hover:text-slate-600 active:cursor-grabbing dark:hover:text-slate-200"
      >
        <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
          <circle cx="5" cy="4" r="1.5" />
          <circle cx="11" cy="4" r="1.5" />
          <circle cx="5" cy="8" r="1.5" />
          <circle cx="11" cy="8" r="1.5" />
          <circle cx="5" cy="12" r="1.5" />
          <circle cx="11" cy="12" r="1.5" />
        </svg>
      </button>

      <span className="flex-1 text-sm font-medium text-slate-800 dark:text-slate-100">
        {category.name}
      </span>
      <span className="text-xs text-slate-400">{category.link}</span>
    </div>
  );
}

export default function CategoryManager() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [original, setOriginal] = useState<Category[]>([]);
  const [reorderMode, setReorderMode] = useState(false);
  const [saving, setSaving] = useState(false);

  const sensors = useSensors(useSensor(PointerSensor));

  // True until the first load finishes, so the empty message never shows while data is loading.
  const [listLoading, setListLoading] = useState(true);
  useEffect(() => {
    fetch("/api/categories")
      .then((r) => r.json())
      .then((data) => {
        const sorted = [...(data.categories ?? [])].sort(
          (a, b) => a.sortOrder - b.sortOrder,
        );
        setCategories(sorted);
        setOriginal(sorted);
      })
      .finally(() => setListLoading(false));
  }, []);

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    if (!over || active.id === over.id) return;

    setCategories((prev) => {
      const oldIndex = prev.findIndex((c) => c._id === active.id);
      const newIndex = prev.findIndex((c) => c._id === over.id);
      return arrayMove(prev, oldIndex, newIndex);
    });
  };

  const handleConfirm = async () => {
    setSaving(true);
    try {
      const ordered = categories.map((c, i) => ({
        _id: c._id,
        sortOrder: i + 1,
      }));
      const res = await fetch("/api/categories/reorder", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ categories: ordered }),
      });

      if (!res.ok) throw new Error("Reorder failed");

      setOriginal(categories);
      setReorderMode(false);
      toast.success("Category order saved");
    } catch {
      toast.error("Failed to save order — no changes were made");
      setCategories(original); // restore on failure
    } finally {
      setSaving(false);
    }
  };

  const handleCancel = () => {
    setCategories(original);
    setReorderMode(false);
  };

  return (
    <SectionCard
      title={
        <span className="flex items-center gap-3">
          Categories
          <span className="rounded-full bg-slate-100 px-2.5 py-0.5 text-xs font-medium text-slate-600 dark:bg-slate-700 dark:text-slate-300">
            {categories.length}
          </span>
        </span>
      }
      description={
        reorderMode
          ? "Drag items using the handle, then click Confirm Order to save."
          : "Portfolio categories, in display order."
      }
      actions={
        reorderMode ? (
          <>
            <button
              onClick={handleCancel}
              className={adminButtonClass("secondary")}
            >
              Cancel
            </button>
            <button
              onClick={handleConfirm}
              disabled={saving}
              className={adminButtonClass("dark")}
            >
              <Check className="size-4" />
              {saving ? "Saving…" : "Confirm Order"}
            </button>
          </>
        ) : (
          <button
            onClick={() => setReorderMode(true)}
            className={adminButtonClass("secondary")}
          >
            <ArrowUpDown className="size-4" />
            Reorder
          </button>
        )
      }
    >
      {categories.length === 0 ? (
        listLoading ? (
          <LoadingState />
        ) : (
          <EmptyState title="No categories found." />
        )
      ) : reorderMode ? (
        <DndContext
          sensors={sensors}
          collisionDetection={closestCorners}
          onDragEnd={handleDragEnd}
        >
          <SortableContext
            items={categories.map((c) => c._id)}
            strategy={verticalListSortingStrategy}
          >
            <div className="flex flex-col gap-2">
              {categories.map((cat) => (
                <CategoryRow key={cat._id} category={cat} />
              ))}
            </div>
          </SortableContext>
        </DndContext>
      ) : (
        <div className="flex flex-col gap-2">
          {categories.map((cat, i) => (
            <div
              key={cat._id}
              className="flex items-center gap-3 rounded-lg border border-slate-200 bg-white px-4 py-3 transition-colors hover:border-slate-300 dark:border-slate-700 dark:bg-slate-800"
            >
              <span className="w-5 text-center text-xs text-slate-400">
                {i + 1}
              </span>
              <span className="flex-1 text-sm font-medium text-slate-800 dark:text-slate-100">
                {cat.name}
              </span>
              <span className="text-xs text-slate-400">{cat.link}</span>
            </div>
          ))}
        </div>
      )}
    </SectionCard>
  );
}
