import { Portfolio } from "@/app/types/Portfolio";
import Link from "next/link";
import React, { Dispatch, SetStateAction, useState } from "react";
import { toast } from "sonner";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { MdDragIndicator, MdDelete, MdEdit } from "react-icons/md";
import { ConfirmDialog, ViewLiveLink, portfolioLiveUrl } from "../AdminUI";

const PortfolioCard = ({
  item,
  setRefetch,
  id,
  reorderMode,
}: {
  item: Portfolio;
  setRefetch: Dispatch<SetStateAction<boolean>>;
  id: number;
  reorderMode?: boolean;
}) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id });
  const [confirmOpen, setConfirmOpen] = useState(false);

  const style = {
    transition,
    transform: CSS.Transform.toString(transform),
  };

  const handlePortfolioDelete = async (e: React.MouseEvent, id: string) => {
    e.preventDefault();
    e.stopPropagation();

    try {
      const response = await fetch(`/api/portfolio?id=${id}`, {
        method: "DELETE",
      });
      if (response.ok) {
        const data = await response.json();
        toast.success(data.message);
        setRefetch((prev) => !prev);
      } else {
        toast.error("Failed to remove portfolio data");
      }
    } catch (error) {
      console.error("Error deleting portfolio:", error);
      toast.error("Something went wrong");
    }
  };

  const title =
    item.section === "portfolio" || item.section === "case study new"
      ? item.companyName
      : item.heading;

  const href = !reorderMode
    ? item.section === "portfolio" || item.section === "case study new"
      ? `/admin/portfolio/${item._id}`
      : item.section === "case study"
        ? `/admin/case-study/${item._id}`
        : "#"
    : "#";

  const liveUrl = portfolioLiveUrl(item);

  return (
    <div
      ref={setNodeRef}
      style={style}
      className={`group relative w-full rounded-xl border border-slate-200 bg-white transition-all dark:border-slate-700 dark:bg-slate-800 ${
        isDragging
          ? "z-10 scale-[1.02] opacity-90 shadow-lg"
          : "hover:border-slate-300 hover:shadow-md"
      }`}
    >
      <div className="flex h-28 items-stretch">
        {reorderMode && (
          <button
            {...attributes}
            {...listeners}
            type="button"
            aria-label="Drag to reorder"
            className="flex w-10 shrink-0 cursor-grab items-center justify-center rounded-l-xl border-r border-slate-200 bg-slate-50 text-slate-400 transition-colors hover:bg-slate-100 hover:text-slate-600 active:cursor-grabbing dark:border-slate-700 dark:bg-slate-700/50 dark:hover:bg-slate-700"
          >
            <MdDragIndicator className="text-xl" />
          </button>
        )}

        <Link
          href={href}
          className={`flex min-w-0 flex-1 items-center overflow-hidden rounded-xl ${reorderMode ? "rounded-l-none" : ""} ${
            reorderMode ? "pointer-events-none" : ""
          }`}
        >
          <div className="h-full w-32 shrink-0 overflow-hidden bg-slate-100 dark:bg-slate-700 md:w-44">
            <img
              className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
              src={item.bannerImage ?? item.coverImage}
              alt={title ?? "Portfolio image"}
            />
          </div>

          <div className="flex min-w-0 flex-1 flex-col justify-center gap-2 px-5 py-4">
            <h5 className="truncate text-base font-semibold text-slate-900 dark:text-white">
              {title}
            </h5>
            <div className="flex min-w-0 flex-wrap items-center gap-2">
              <span className="inline-flex w-fit items-center rounded-full bg-blue-50 px-2.5 py-0.5 text-xs font-medium capitalize text-blue-700 dark:bg-blue-500/10 dark:text-blue-400">
                {item.section}
              </span>
              {liveUrl && (
                <span className="truncate text-xs text-slate-400">
                  {liveUrl}
                </span>
              )}
            </div>
          </div>
        </Link>

        {!reorderMode && (
          <div className="flex shrink-0 items-center gap-1 border-l border-slate-200 px-3 dark:border-slate-700">
            <ViewLiveLink href={liveUrl} />
            {href !== "#" && (
              <Link
                href={href}
                title="Edit"
                aria-label="Edit"
                className="inline-flex size-8 items-center justify-center rounded-lg text-slate-500 transition-colors hover:bg-slate-100 hover:text-slate-900 dark:text-slate-400 dark:hover:bg-slate-700 dark:hover:text-white"
              >
                <MdEdit className="text-base" />
              </Link>
            )}
            <span className="mx-1 h-5 w-px bg-slate-200 dark:bg-slate-700" />
            <button
              type="button"
              title="Delete"
              aria-label="Delete"
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                setConfirmOpen(true);
              }}
              className="inline-flex size-8 items-center justify-center rounded-lg text-slate-400 transition-colors hover:bg-red-50 hover:text-red-600 dark:hover:bg-red-500/10"
            >
              <MdDelete className="text-base" />
            </button>
          </div>
        )}
      </div>

      <ConfirmDialog
        open={confirmOpen}
        onOpenChange={setConfirmOpen}
        title={`Delete "${title || "this item"}"?`}
        description="This permanently removes it from the CMS and the live website. This action cannot be undone."
        onConfirm={(e) => handlePortfolioDelete(e, item._id)}
      />
    </div>
  );
};

export default PortfolioCard;
