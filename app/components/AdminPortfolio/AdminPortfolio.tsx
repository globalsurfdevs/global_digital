"use client";

import { LoadingState } from "@/app/components/AdminUI";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import { Portfolio } from "@/app/types/Portfolio";
import { IoIosClose } from "react-icons/io";
import { toast } from "sonner";
import { closestCorners, DndContext } from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { useSortable } from "@dnd-kit/sortable";
import PortfolioCard from "./PortfolioCard";
import IndustryManager from "../AdminIndsutries/IndustriesManager";
import CategoryManager from "../AdminCategories/CategoryManager";
import { ArrowUpDown, Check, Plus } from "lucide-react";
import {
  AdminButton,
  AdminLinkButton,
  EmptyState,
  SectionCard,
  SearchInput,
  matchesQuery,
} from "../AdminUI";
import AdminTabs from "../AdminUI/AdminTabs";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

const TAB_KEYS = ["list", "industries", "categories"] as const;
type TabKey = (typeof TAB_KEYS)[number];

const AdminPortfolio = () => {
  const [portfolios, setPortfolios] = useState<Portfolio[]>([]);
  const [refetch, setRefetch] = useState(false);
  const [reorderMode, setReorderMode] = useState(false);
  const [query, setQuery] = useState("");

  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const tabParam = searchParams.get("tab");
  const activeTab: TabKey = TAB_KEYS.includes(tabParam as TabKey)
    ? (tabParam as TabKey)
    : "list";

  // Keep the active tab in the URL so reloads and shared links reopen it.
  const setActiveTab = (key: string) => {
    const params = new URLSearchParams(searchParams.toString());
    if (key === "list") params.delete("tab");
    else params.set("tab", key);
    const query = params.toString();
    router.replace(query ? `${pathname}?${query}` : pathname, {
      scroll: false,
    });
  };

  // True until the first load finishes, so the empty message never shows while data is loading.
  const [listLoading, setListLoading] = useState(true);
  useEffect(() => {
    const fetchPortfolios = async () => {
      try {
        const response = await fetch(`/api/portfolio`, {
          headers: {
            "x-auth-type": "admin",
          },
        });
        if (response.ok) {
          const data = await response.json();
          // console.log(data.portfolio)
          setPortfolios(data.portfolio);
        } else {
          console.error("Failed to fetch portfolio data");
        }
      } catch (error) {
        console.error("Error fetching portfolio data:", error);
      }
    };

    fetchPortfolios().finally(() => setListLoading(false));
  }, [refetch]);

  const visiblePortfolios = portfolios.filter((item) =>
    matchesQuery(
      query,
      item.companyName,
      item.heading,
      item.section,
      item.slug,
    ),
  );

  const getTaskPos = (id: number) =>
    portfolios.findIndex((item: { id: number }) => item.id == id);

  const handleDragEnd = (event: { active: any; over: any }) => {
    const { active, over } = event;

    console.log(active.id, over.id);

    if (active.id == over.id) return;
    setPortfolios((portfolios) => {
      const originalPos = getTaskPos(active.id);
      const newPos = getTaskPos(over.id);
      return arrayMove(portfolios, originalPos, newPos);
    });

    console.log(portfolios);
  };

  const confirmPosition = async () => {
    setReorderMode(!reorderMode);

    const updatedPortfolios = portfolios.map((portfolio, index) => ({
      ...portfolio,
      index: index + 1,
    }));

    // setPortfolios((portfolios) =>
    //     portfolios.map((portfolio, index) => ({
    //         ...portfolio,
    //         index: index + 1,
    //     }))
    // );

    setPortfolios(updatedPortfolios);

    const formData = new FormData();
    formData.append("portfolios", JSON.stringify(updatedPortfolios));
    const response = await fetch("/api/portfolio/reorder", {
      method: "POST",
      body: formData,
    });
  };

  return (
    <div className="flex flex-col gap-5">
      <AdminTabs
        tabs={[
          {
            key: "list",
            label: "List",
            count: listLoading ? undefined : portfolios.length,
          },
          { key: "industries", label: "Industries" },
          { key: "categories", label: "Categories" },
        ]}
        active={activeTab}
        onChange={setActiveTab}
      />

      {/* All panels stay mounted (only hidden) so switching tabs never discards unsaved input. */}
      <div hidden={activeTab !== "industries"}>
        <IndustryManager />
      </div>

      <div hidden={activeTab !== "categories"}>
        <CategoryManager />
      </div>

      <div hidden={activeTab !== "list"}>
        <SectionCard
          title={
            <span className="flex items-center gap-3">
              List of companies
              {!listLoading && (
                <span className="rounded-full bg-slate-100 px-2.5 py-0.5 text-xs font-medium text-slate-600 dark:bg-slate-700 dark:text-slate-300">
                  {portfolios.length}
                </span>
              )}
            </span>
          }
          description={
            reorderMode
              ? "Drag items using the handle, then click Confirm to save the new order."
              : "Portfolios and case studies. Click an item to edit it, or use the icon to open its live page."
          }
          actions={
            <>
              <AdminButton
                variant={reorderMode ? "primary" : "secondary"}
                icon={
                  reorderMode ? (
                    <Check className="size-4" />
                  ) : (
                    <ArrowUpDown className="size-4" />
                  )
                }
                onClick={confirmPosition}
              >
                {!reorderMode ? "Reorder" : "Confirm"}
              </AdminButton>
              <AdminLinkButton
                href={"/admin/portfolio/add"}
                variant="dark"
                icon={<Plus className="size-4" />}
              >
                Add new content
              </AdminLinkButton>
            </>
          }
        >
          {/* Search is display-only and is disabled while reordering, which always uses the full list. */}
          <div className="mb-4">
            <SearchInput
              value={query}
              onChange={setQuery}
              disabled={reorderMode}
              placeholder="Search by company, heading or slug"
            />
          </div>
          {reorderMode ? (
            <DndContext
              collisionDetection={closestCorners}
              onDragEnd={handleDragEnd}
            >
              <div className="flex flex-col gap-3">
                <SortableContext
                  items={portfolios}
                  strategy={verticalListSortingStrategy}
                >
                  {portfolios.length > 0 ? (
                    portfolios.map((item: Portfolio) => (
                      <PortfolioCard
                        item={item}
                        setRefetch={setRefetch}
                        id={item.id}
                        reorderMode={reorderMode}
                        key={item.customId}
                      />
                    ))
                  ) : listLoading ? (
                    <LoadingState />
                  ) : (
                    <EmptyState title="No portfolios available" />
                  )}
                </SortableContext>
              </div>
            </DndContext>
          ) : (
            <div className="flex flex-col gap-3">
              {visiblePortfolios.length > 0 ? (
                visiblePortfolios.map((item: Portfolio) => (
                  <PortfolioCard
                    item={item}
                    setRefetch={setRefetch}
                    id={item.id}
                    key={item.customId}
                  />
                ))
              ) : listLoading ? (
                <LoadingState />
              ) : portfolios.length > 0 ? (
                <EmptyState
                  title={`No results for "${query}"`}
                  description="Try a different name, or clear the search."
                />
              ) : (
                <EmptyState title="No portfolios available" />
              )}
            </div>
          )}
        </SectionCard>
      </div>
    </div>
  );
};

export default AdminPortfolio;
