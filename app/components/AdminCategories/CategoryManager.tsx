"use client";

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
      className={`flex items-center gap-3 rounded-lg border border-gray-200 bg-white px-4 py-3 ${
        isDragging ? "opacity-50 shadow-lg" : ""
      }`}
    >
      {/* Drag handle */}
      <button
        {...attributes}
        {...listeners}
        className="cursor-grab text-gray-400 hover:text-gray-600 active:cursor-grabbing"
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

      <span className="flex-1 text-sm font-medium text-gray-800">
        {category.name}
      </span>
      <span className="text-xs text-gray-400">{category.link}</span>
    </div>
  );
}

export default function CategoryManager() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [original, setOriginal] = useState<Category[]>([]);
  const [reorderMode, setReorderMode] = useState(false);
  const [saving, setSaving] = useState(false);

  const sensors = useSensors(useSensor(PointerSensor));

  useEffect(() => {
    fetch("/api/categories")
      .then((r) => r.json())
      .then((data) => {
        const sorted = [...(data.categories ?? [])].sort(
          (a, b) => a.sortOrder - b.sortOrder,
        );
        setCategories(sorted);
        setOriginal(sorted);
      });
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
    <div className="rounded-xl border border-gray-200 bg-gray-50 p-5">
      <div className="mb-4 flex items-center justify-between">
        <h2 className="text-lg font-semibold text-gray-900">Categories</h2>

        <div className="flex gap-2">
          {reorderMode ? (
            <>
              <button
                onClick={handleCancel}
                className="rounded-full border border-gray-300 px-4 py-1.5 text-sm text-gray-600 hover:bg-gray-100"
              >
                Cancel
              </button>
              <button
                onClick={handleConfirm}
                disabled={saving}
                className="rounded-full bg-black px-4 py-1.5 text-sm text-white disabled:opacity-50"
              >
                {saving ? "Saving…" : "Confirm Order"}
              </button>
            </>
          ) : (
            <button
              onClick={() => setReorderMode(true)}
              className="rounded-full bg-primary px-4 py-1.5 text-sm text-white"
            >
              Reorder
            </button>
          )}
        </div>
      </div>

      {categories.length === 0 ? (
        <p className="text-sm text-gray-400">No categories found.</p>
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
              className="flex items-center gap-3 rounded-lg border border-gray-200 bg-white px-4 py-3"
            >
              <span className="w-5 text-center text-xs text-gray-400">
                {i + 1}
              </span>
              <span className="flex-1 text-sm font-medium text-gray-800">
                {cat.name}
              </span>
              <span className="text-xs text-gray-400">{cat.link}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
