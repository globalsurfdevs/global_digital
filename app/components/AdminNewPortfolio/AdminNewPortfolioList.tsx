"use client";

import { useCallback, useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { ExternalLink, Eye, Pencil } from "lucide-react";
import { toast } from "sonner";
import type { NewPortfolio } from "@/app/types/NewPortfolio";
import { AdminButton, AdminLinkButton, PageHeader, SectionCard } from "@/app/components/AdminUI";

export default function AdminNewPortfolioList() {
  const [portfolios, setPortfolios] = useState<NewPortfolio[]>([]);
  const [loading, setLoading] = useState(true);

  const loadPortfolios = useCallback(async () => {
    try {
      const response = await fetch("/api/new-portfolios", { cache: "no-store" });
      const data = await response.json();
      if (!response.ok) throw new Error(data.error || "Could not load new portfolios.");
      setPortfolios(data.portfolios || []);
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Could not load new portfolios.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { void loadPortfolios(); }, [loadPortfolios]);

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
      <PageHeader title="New portfolios" description="Manage portfolios stored in the new portfolio collection." actions={<AdminLinkButton href="/admin/new-portfolios/add">Add new portfolio</AdminLinkButton>} />
      <SectionCard title="All new portfolios">
        {loading ? <p className="text-sm text-slate-500">Loading…</p> : portfolios.length === 0 ? <p className="text-sm text-slate-500">No new portfolios yet.</p> : (
          <div className="divide-y divide-slate-200">
            {portfolios.map((portfolio) => (
              <div key={portfolio._id} className="flex flex-wrap items-center justify-between gap-3 py-4">
                <div className="flex min-w-0 items-center gap-4">
                  <div className="relative size-20 shrink-0 overflow-hidden rounded-md border border-slate-200 bg-slate-100">
                    {portfolio.brand?.banner?.image ? <Image src={portfolio.brand.banner.image} alt={`${portfolio.company?.name || "Portfolio"} banner`} fill unoptimized className="object-cover" /> : <span className="flex h-full items-center justify-center text-xs text-slate-500">No banner</span>}
                  </div>
                  <div>
                    <Link className="font-medium text-slate-900 hover:underline" href={`/admin/new-portfolios/${portfolio._id}`}>{portfolio.company?.name || "Untitled portfolio"}</Link>
                    <p className="text-sm text-slate-500">{portfolio.slug || "No slug"} · {portfolio.isPublished ? "Published" : "Preview"} · {portfolio.isListed === false ? "Archived" : "Listed"}</p>
                  </div>
                </div>
                <div className="flex gap-2">
                  <a href={`/portfolio/${portfolio.slug}`} target="_blank" rel="noopener noreferrer" title="View live page" aria-label="View live page" className="inline-flex size-9 items-center justify-center rounded-md border border-slate-300 text-slate-600 hover:bg-slate-100"><ExternalLink className="size-4" /></a>
                  <a href={`/portfolio/v2/${portfolio.slug}`} target="_blank" rel="noopener noreferrer" title="Preview V2 page" aria-label="Preview V2 page" className="inline-flex size-9 items-center justify-center rounded-md border border-slate-300 text-slate-600 hover:bg-slate-100"><Eye className="size-4" /></a>
                  <AdminLinkButton variant="secondary" size="sm" href={`/admin/new-portfolios/${portfolio._id}`}><Pencil className="size-4" /><span className="sr-only">Edit</span></AdminLinkButton>
                  {portfolio.isListed !== false && <AdminButton variant="secondary" onClick={() => void archive(portfolio._id)}>Archive</AdminButton>}
                </div>
              </div>
            ))}
          </div>
        )}
      </SectionCard>
    </div>
  );
}
