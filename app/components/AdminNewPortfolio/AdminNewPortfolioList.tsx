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
  Pencil,
  Search,
  X,
} from "lucide-react";
import { toast } from "sonner";
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
  moveAction,
  onArchive,
}: {
  portfolio: NewPortfolio;
  moveAction?: ReactNode;
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
      {moveAction ? (
        <div className="flex gap-2">{moveAction}</div>
      ) : (
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
  const [moveSourceId, setMoveSourceId] = useState<string | null>(null);
  const [targetSearch, setTargetSearch] = useState("");
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
  const visiblePortfolios = reorderMode ? draftPortfolios : scopePortfolios;
  const filteredPortfolios = visiblePortfolios.filter((portfolio) => {
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
    setMoveSourceId(null);
    setTargetSearch("");
    setReorderMode(true);
  };

  const cancelReordering = () => {
    setOrderDraft([]);
    setMoveSourceId(null);
    setTargetSearch("");
    setReorderMode(false);
  };

  const movePortfolio = (targetId: string, placement: "before" | "after") => {
    if (!moveSourceId || moveSourceId === targetId) return;
    setOrderDraft((current) => {
      const next = current.filter((id) => id !== moveSourceId);
      const targetIndex = next.indexOf(targetId);
      if (targetIndex < 0) return current;
      next.splice(targetIndex + (placement === "after" ? 1 : 0), 0, moveSourceId);
      return next;
    });
    setMoveSourceId(null);
    setTargetSearch("");
    setSearch("");
    setPage(1);
  };

  const selectedMoveSource = draftPortfolios.find(
    (portfolio) => portfolio._id === moveSourceId,
  );
  const normalizedTargetSearch = targetSearch.trim().toLowerCase();
  const targetPortfolios = draftPortfolios.filter((portfolio) => {
    if (portfolio._id === moveSourceId) return false;
    if (!normalizedTargetSearch) return true;
    return [
      portfolio.company?.name,
      portfolio.slug,
      portfolio.company?.industry,
    ].some((value) => value?.toLowerCase().includes(normalizedTargetSearch));
  });

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
      setMoveSourceId(null);
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
            <label className="relative block w-full sm:w-72">
              <Search className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-slate-400" />
              <input
                value={search}
                onChange={(event) => {
                  setSearch(event.target.value);
                  setPage(1);
                }}
                placeholder={
                  reorderMode ? "Search for a portfolio to move" : "Search portfolios"
                }
                aria-label={
                  reorderMode ? "Search for a portfolio to move" : "Search portfolios"
                }
                className="h-10 w-full rounded-lg border border-slate-300 bg-white pl-9 pr-3 text-sm text-slate-900 outline-none focus:border-slate-500"
              />
            </label>
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
                <ArrowUpDown className="size-4" /> Move portfolios
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
              ? `Search for a portfolio, choose Move, then place it before or after another portfolio.`
              : selectedIndustry
                ? `This order controls the ${selectedIndustry.name} industry filter.`
                : "This order controls View All and provides the starting order for industry lists."}
          </p>
        </div>

        {reorderMode && (
          <div className="mb-4 rounded-lg border border-slate-200 bg-slate-50 p-4">
            {selectedMoveSource ? (
              <>
                <div className="mb-3 flex flex-wrap items-center justify-between gap-2">
                  <p className="text-sm font-medium text-slate-800">
                    Choose where to place <strong>{selectedMoveSource.company?.name}</strong>
                  </p>
                  <AdminButton
                    variant="secondary"
                    size="sm"
                    onClick={() => {
                      setMoveSourceId(null);
                      setTargetSearch("");
                    }}
                  >
                    Cancel move
                  </AdminButton>
                </div>
                <label className="relative mb-3 block max-w-lg">
                  <Search className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-slate-400" />
                  <input
                    value={targetSearch}
                    onChange={(event) => setTargetSearch(event.target.value)}
                    placeholder="Search for the portfolio to move it next to"
                    aria-label="Search for a portfolio position"
                    className="h-10 w-full rounded-lg border border-slate-300 bg-white pl-9 pr-3 text-sm text-slate-900 outline-none focus:border-slate-500"
                  />
                </label>
                <div className="flex max-h-72 flex-col gap-2 overflow-y-auto">
                  {targetPortfolios.length > 0 ? (
                    targetPortfolios.map((portfolio) => (
                      <div
                        key={portfolio._id}
                        className="flex flex-wrap items-center justify-between gap-2 rounded-md border border-slate-200 bg-white px-3 py-2"
                      >
                        <span className="text-sm text-slate-800">
                          {portfolio.company?.name || "Untitled portfolio"}
                        </span>
                        <div className="flex gap-2">
                          <AdminButton
                            variant="secondary"
                            size="sm"
                            onClick={() => movePortfolio(portfolio._id!, "before")}
                          >
                            Before
                          </AdminButton>
                          <AdminButton
                            variant="secondary"
                            size="sm"
                            onClick={() => movePortfolio(portfolio._id!, "after")}
                          >
                            After
                          </AdminButton>
                        </div>
                      </div>
                    ))
                  ) : (
                    <p className="py-2 text-sm text-slate-500">
                      No matching destination portfolios.
                    </p>
                  )}
                </div>
              </>
            ) : (
              <p className="text-sm text-slate-600">
                Search for the portfolio you want to move, then click its Move button.
              </p>
            )}
          </div>
        )}

        {loading ? (
          <p className="text-sm text-slate-500">Loading…</p>
        ) : portfolios.length === 0 ? (
          <p className="text-sm text-slate-500">No new portfolios yet.</p>
        ) : (
          <>
            <div className="divide-y divide-slate-200">
              {paginatedPortfolios.map((portfolio) => (
                <PortfolioRow
                  key={portfolio._id}
                  portfolio={portfolio}
                  onArchive={(id) => void archive(id)}
                  moveAction={
                    reorderMode ? (
                      <AdminButton
                        variant={portfolio._id === moveSourceId ? "primary" : "secondary"}
                        size="sm"
                        onClick={() => {
                          setMoveSourceId(portfolio._id || null);
                          setTargetSearch("");
                        }}
                        disabled={portfolio._id === moveSourceId}
                      >
                        {portfolio._id === moveSourceId ? "Selected" : "Move"}
                      </AdminButton>
                    ) : undefined
                  }
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
