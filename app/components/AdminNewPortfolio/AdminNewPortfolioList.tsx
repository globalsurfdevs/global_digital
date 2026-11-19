"use client";

import { useCallback, useEffect, useMemo, useState, type ReactNode } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  ArrowUpDown,
  Check,
  ChevronLeft,
  ChevronRight,
  ExternalLink,
  Eye,
  GripVertical,
  Pencil,
  Search,
  X,
} from "lucide-react";
import { toast } from "sonner";
import { DndContext, closestCorners, type DragEndEvent } from "@dnd-kit/core";
import {
  SortableContext,
  arrayMove,
  useSortable,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import type { NewPortfolio } from "@/app/types/NewPortfolio";
import {
  AdminButton,
  AdminLinkButton,
  PageHeader,
  SectionCard,
} from "@/app/components/AdminUI";
import NewPortfolioCategoryManager from "@/app/components/AdminNewPortfolio/NewPortfolioCategoryManager";
import IndustryManager from "@/app/components/AdminIndsutries/IndustriesManager";

type Industry = {
  _id: string;
  name: string;
  subCategories: { _id?: string; name: string }[];
};

function portfolioTimestamp(portfolio: NewPortfolio) {
  const timestamp = portfolio.updatedAt
    ? new Date(portfolio.updatedAt).getTime()
    : 0;
  return Number.isFinite(timestamp) ? timestamp : 0;
}

function PortfolioRow({
  portfolio,
  dragHandle,
  onArchive,
}: {
  portfolio: NewPortfolio;
  dragHandle?: ReactNode;
  onArchive?: (id?: string) => void;
}) {
  return (
    <div
      className={`flex flex-wrap items-center justify-between gap-3 rounded-md px-3 py-4 ${
        portfolio.isPublished
          ? "bg-green-50"
          : portfolio.isListed === false
            ? "bg-red-50"
            : "bg-white"
      }`}
    >
      <div className="flex min-w-0 items-center gap-4">
        {dragHandle}
        <div className="relative size-20 shrink-0 overflow-hidden rounded-md border border-slate-200 bg-slate-100">
          {portfolio.brand?.banner?.image ? (
            <Image
              src={portfolio.brand.banner.image}
              alt={`${portfolio.company?.name || "Portfolio"} banner`}
              fill
              unoptimized
              className="object-cover"
            />
          ) : (
            <span className="flex h-full items-center justify-center text-xs text-slate-500">
              No banner
            </span>
          )}
        </div>
        <div>
          <Link
            className="font-medium text-slate-900 hover:underline"
            href={`/admin/new-portfolios/${portfolio._id}`}
          >
            {portfolio.company?.name || "Untitled portfolio"}
          </Link>
          <p className="text-sm text-slate-500">
            {portfolio.slug || "No slug"} · {portfolio.isPublished ? "Published" : "Preview"} ·{" "}
            {portfolio.isListed === false ? "Archived" : "Listed"}
          </p>
        </div>
      </div>
      {!dragHandle && (
        <div className="flex gap-2">
          <Link
            href={`/portfolio/${portfolio.slug}`}
            target="_blank"
            rel="noopener noreferrer"
            title="View live page"
            aria-label="View live page"
            className="inline-flex size-9 items-center justify-center rounded-md border border-slate-300 text-slate-600 hover:bg-slate-100"
          >
            <ExternalLink className="size-4" />
          </Link>
          <Link
            href={`/portfolio/v2/${portfolio.slug}`}
            target="_blank"
            rel="noopener noreferrer"
            title="Preview V2 page"
            aria-label="Preview V2 page"
            className="inline-flex size-9 items-center justify-center rounded-md border border-slate-300 text-slate-600 hover:bg-slate-100"
          >
            <Eye className="size-4" />
          </Link>
          <AdminLinkButton
            variant="secondary"
            size="sm"
            href={`/admin/new-portfolios/${portfolio._id}`}
          >
            <Pencil className="size-4" />
            <span className="sr-only">Edit</span>
          </AdminLinkButton>
          {portfolio.isListed !== false && onArchive && (
            <AdminButton
              variant="secondary"
              onClick={() => onArchive(portfolio._id)}
            >
              Archive
            </AdminButton>
          )}
        </div>
      )}
    </div>
  );
}

function SortablePortfolioRow({ portfolio }: { portfolio: NewPortfolio }) {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } =
    useSortable({ id: portfolio._id! });
  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    zIndex: isDragging ? 1 : undefined,
  };

  return (
    <div ref={setNodeRef} style={style} className={isDragging ? "opacity-70" : ""}>
      <PortfolioRow
        portfolio={portfolio}
        dragHandle={
          <button
            type="button"
            {...attributes}
            {...listeners}
            aria-label={`Drag ${portfolio.company?.name || "portfolio"} to reorder`}
            className="flex size-9 shrink-0 cursor-grab items-center justify-center rounded-md border border-slate-300 text-slate-500 hover:bg-slate-100 active:cursor-grabbing"
          >
            <GripVertical className="size-4" />
          </button>
        }
      />
    </div>
  );
}

export default function AdminNewPortfolioList() {
  const [portfolios, setPortfolios] = useState<NewPortfolio[]>([]);
  const [industries, setIndustries] = useState<Industry[]>([]);
  const [loading, setLoading] = useState(true);
  const [savingOrder, setSavingOrder] = useState(false);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [orderScope, setOrderScope] = useState("all");
  const [reorderMode, setReorderMode] = useState(false);
  const [orderDraft, setOrderDraft] = useState<string[]>([]);
  const pageSize = 12;

  const loadPortfolios = useCallback(async () => {
    try {
      const [portfolioResponse, industryResponse] = await Promise.all([
        fetch("/api/new-portfolios", { cache: "no-store" }),
        fetch("/api/industries", { cache: "no-store" }),
      ]);
      const data = await portfolioResponse.json();
      const industryData = await industryResponse.json();
      if (!portfolioResponse.ok) {
        throw new Error(data.error || "Could not load new portfolios.");
      }
      if (!industryResponse.ok) {
        throw new Error(industryData.error || "Could not load industries.");
      }
      setPortfolios(data.portfolios || []);
      setIndustries(
        (industryData.categories || []).map((industry: Industry) => ({
          ...industry,
          subCategories: (industry.subCategories || []).map((item: any) =>
            typeof item === "string" ? { name: item } : item,
          ),
        })),
      );
    } catch (error) {
      toast.error(
        error instanceof Error ? error.message : "Could not load new portfolios.",
      );
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    void loadPortfolios();
  }, [loadPortfolios]);

  const selectedIndustry = industries.find((industry) => industry._id === orderScope);
  const scopePortfolios = useMemo(() => {
    const originalPosition = new Map<string | undefined, number>(
      portfolios.map((portfolio, index) => [portfolio._id, index] as const),
    );
    const scoped = selectedIndustry
      ? portfolios.filter((portfolio) =>
          selectedIndustry.subCategories.some(
            (subCategory) => subCategory.name === portfolio.company?.industry,
          ),
        )
      : [...portfolios];

    return scoped.sort((left, right) => {
      if (selectedIndustry) {
        const leftOrder = left.industryOrders?.find(
          (order) => order.industryId === selectedIndustry._id,
        )?.index;
        const rightOrder = right.industryOrders?.find(
          (order) => order.industryId === selectedIndustry._id,
        )?.index;
        const leftHasOrder = typeof leftOrder === "number";
        const rightHasOrder = typeof rightOrder === "number";
        if (leftHasOrder && rightHasOrder) {
          return leftOrder! - rightOrder!;
        }
        if (leftHasOrder !== rightHasOrder) return leftHasOrder ? -1 : 1;
      } else {
        if (
          typeof left.index === "number" &&
          typeof right.index === "number" &&
          left.index !== right.index
        ) {
          return left.index - right.index;
        }
      }

      const positionDifference =
        (originalPosition.get(left._id) ?? 0) -
        (originalPosition.get(right._id) ?? 0);
      return positionDifference || portfolioTimestamp(right) - portfolioTimestamp(left);
    });
  }, [industries, orderScope, portfolios, selectedIndustry]);

  const draftPortfolios = useMemo(() => {
    const byId = new Map<string | undefined, NewPortfolio>(
      portfolios.map((portfolio) => [portfolio._id, portfolio] as const),
    );
    return orderDraft
      .map((id) => byId.get(id))
      .filter((portfolio): portfolio is NewPortfolio => Boolean(portfolio));
  }, [orderDraft, portfolios]);

  const normalizedSearch = search.trim().toLowerCase();
  const filteredPortfolios = scopePortfolios.filter((portfolio) => {
    const searchableValues = [
      portfolio.company?.name,
      portfolio.slug,
      portfolio.company?.industry,
      portfolio.company?.country,
      ...(portfolio.categories ?? []).map((category) =>
        typeof category === "string" ? category : category.name,
      ),
    ];
    return searchableValues.some((value) =>
      value?.toLowerCase().includes(normalizedSearch),
    );
  });
  const pageCount = Math.ceil(filteredPortfolios.length / pageSize);
  const paginatedPortfolios = filteredPortfolios.slice(
    (page - 1) * pageSize,
    page * pageSize,
  );

  const startReordering = () => {
    setSearch("");
    setPage(1);
    setOrderDraft(scopePortfolios.map((portfolio) => portfolio._id!));
    setReorderMode(true);
  };

  const cancelReordering = () => {
    setOrderDraft([]);
    setReorderMode(false);
  };

  const handleDragEnd = ({ active, over }: DragEndEvent) => {
    if (!over || active.id === over.id) return;
    setOrderDraft((current) => {
      const oldIndex = current.indexOf(String(active.id));
      const newIndex = current.indexOf(String(over.id));
      return oldIndex < 0 || newIndex < 0
        ? current
        : arrayMove(current, oldIndex, newIndex);
    });
  };

  const saveOrder = async () => {
    setSavingOrder(true);
    try {
      const response = await fetch("/api/new-portfolios/reorder", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          scope: selectedIndustry ? "industry" : "all",
          industryId: selectedIndustry?._id,
          portfolioIds: orderDraft,
        }),
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.error || "Could not save the order.");

      setPortfolios((current) => {
        const positions = new Map<string, number>(
          orderDraft.map((id, index) => [id, index + 1] as const),
        );
        return current.map((portfolio) => {
          const position = positions.get(portfolio._id!);
          if (position === undefined) return portfolio;
          return selectedIndustry
            ? {
                ...portfolio,
                industryOrders: [
                  ...(portfolio.industryOrders || []).filter(
                    (order) => order.industryId !== selectedIndustry._id,
                  ),
                  { industryId: selectedIndustry._id, index: position },
                ],
              }
            : { ...portfolio, index: position };
        });
      });
      toast.success(data.message || "Portfolio order saved.");
      setOrderDraft([]);
      setReorderMode(false);
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Could not save the order.");
    } finally {
      setSavingOrder(false);
    }
  };

  const archive = async (id?: string) => {
    if (!id) return;
    const response = await fetch(`/api/new-portfolios?id=${id}`, { method: "PATCH" });
    const data = await response.json();
    if (!response.ok) return toast.error(data.error || "Could not archive portfolio.");
    toast.success(data.message);
    void loadPortfolios();
  };

  return (
    <div className="flex flex-col gap-6">
      <PageHeader
        title="New portfolios"
        description="Manage and order portfolios stored in the new portfolio collection."
        actions={
          <AdminLinkButton href="/admin/new-portfolios/add">
            Add new portfolio
          </AdminLinkButton>
        }
      />
      <div className="grid grid-cols-1 items-start gap-6 lg:grid-cols-2">
        <NewPortfolioCategoryManager />
        <IndustryManager />
      </div>
      <SectionCard
        title={`${selectedIndustry?.name || "All new portfolios"} (${scopePortfolios.length})`}
        actions={
          <div className="flex flex-wrap items-center gap-2">
            {!reorderMode && (
              <label className="relative block w-full sm:w-72">
                <Search className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-slate-400" />
                <input
                  value={search}
                  onChange={(event) => {
                    setSearch(event.target.value);
                    setPage(1);
                  }}
                  placeholder="Search portfolios"
                  aria-label="Search portfolios"
                  className="h-10 w-full rounded-lg border border-slate-300 bg-white pl-9 pr-3 text-sm text-slate-900 outline-none focus:border-slate-500"
                />
              </label>
            )}
            {reorderMode ? (
              <>
                <AdminButton
                  variant="secondary"
                  onClick={cancelReordering}
                  disabled={savingOrder}
                >
                  <X className="size-4" /> Cancel
                </AdminButton>
                <AdminButton
                  variant="primary"
                  onClick={() => void saveOrder()}
                  disabled={savingOrder || orderDraft.length < 2}
                >
                  <Check className="size-4" />
                  {savingOrder ? "Saving..." : "Save order"}
                </AdminButton>
              </>
            ) : (
              <AdminButton
                variant="secondary"
                onClick={startReordering}
                disabled={loading || scopePortfolios.length < 2}
              >
                <ArrowUpDown className="size-4" /> Reorder
              </AdminButton>
            )}
          </div>
        }
      >
        <div className="mb-4 flex flex-wrap items-center gap-3">
          <label className="flex items-center gap-2 text-sm font-medium text-slate-700">
            Order list
            <select
              value={orderScope}
              disabled={reorderMode}
              onChange={(event) => {
                setOrderScope(event.target.value);
                setPage(1);
              }}
              className="h-10 rounded-lg border border-slate-300 bg-white px-3 text-sm text-slate-900 disabled:bg-slate-100"
            >
              <option value="all">View All</option>
              {industries.map((industry) => (
                <option key={industry._id} value={industry._id}>
                  {industry.name}
                </option>
              ))}
            </select>
          </label>
          <p className="text-sm text-slate-500">
            {reorderMode
              ? `Drag to set the ${selectedIndustry ? selectedIndustry.name : "View All"} order, then save.`
              : selectedIndustry
                ? `This order controls the ${selectedIndustry.name} industry filter.`
                : "This order controls View All and provides the starting order for industry lists."}
          </p>
        </div>

        {loading ? (
          <p className="text-sm text-slate-500">Loading…</p>
        ) : portfolios.length === 0 ? (
          <p className="text-sm text-slate-500">No new portfolios yet.</p>
        ) : reorderMode ? (
          draftPortfolios.length === 0 ? (
            <p className="text-sm text-slate-500">
              No portfolios assigned to this industry.
            </p>
          ) : (
            <DndContext
              collisionDetection={closestCorners}
              onDragEnd={handleDragEnd}
            >
              <SortableContext
                items={orderDraft}
                strategy={verticalListSortingStrategy}
              >
                <div className="flex flex-col gap-2">
                  {draftPortfolios.map((portfolio) => (
                    <SortablePortfolioRow
                      key={portfolio._id}
                      portfolio={portfolio}
                    />
                  ))}
                </div>
              </SortableContext>
            </DndContext>
          )
        ) : (
          <>
            <div className="divide-y divide-slate-200">
              {paginatedPortfolios.map((portfolio) => (
                <PortfolioRow
                  key={portfolio._id}
                  portfolio={portfolio}
                  onArchive={(id) => void archive(id)}
                />
              ))}
              {filteredPortfolios.length === 0 && (
                <p className="py-4 text-sm text-slate-500">
                  No portfolios match “{search}”.
                </p>
              )}
            </div>
            {filteredPortfolios.length > 0 && (
              <div className="mt-4 flex flex-wrap items-center justify-between gap-3 border-t border-slate-200 pt-4">
                <p className="text-sm text-slate-500">
                  Showing {(page - 1) * pageSize + 1}–
                  {Math.min(page * pageSize, filteredPortfolios.length)} of{" "}
                  {filteredPortfolios.length} matching portfolios
                  {normalizedSearch && ` (${portfolios.length} total)`}
                </p>
                {pageCount > 1 && (
                  <nav
                    aria-label="Portfolio list pagination"
                    className="flex items-center gap-2"
                  >
                    <AdminButton
                      variant="secondary"
                      size="sm"
                      disabled={page === 1}
                      onClick={() => setPage((current) => Math.max(1, current - 1))}
                    >
                      <ChevronLeft className="size-4" /> Previous
                    </AdminButton>
                    <span className="text-sm text-slate-600">
                      Page {page} of {pageCount}
                    </span>
                    <AdminButton
                      variant="secondary"
                      size="sm"
                      disabled={page === pageCount}
                      onClick={() =>
                        setPage((current) => Math.min(pageCount, current + 1))
                      }
                    >
                      Next <ChevronRight className="size-4" />
                    </AdminButton>
                  </nav>
                )}
              </div>
            )}
          </>
        )}
      </SectionCard>
    </div>
  );
}
