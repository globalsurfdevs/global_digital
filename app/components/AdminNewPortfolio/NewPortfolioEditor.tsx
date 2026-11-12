"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import type { NewPortfolio } from "@/app/types/NewPortfolio";
import { PageHeader, SectionCard, AdminButton, AdminLinkButton, ViewLiveLink } from "@/app/components/AdminUI";
import { ImageUploader } from "@/components/ui/image-uploader";

const emptyPortfolio: NewPortfolio = {
  company: {}, brand: { banner: {} }, highlights: [], previewImages: [],
  whatWeDelivered: { items: [] }, callsToAction: { primary: {}, secondary: {} },
  relatedPortfolios: { items: [] }, seo: {}, isPublished: false, featured: false, isListed: true,
};

function Field({ label, value, onChange, multiline = false }: { label: string; value?: string; onChange: (value: string) => void; multiline?: boolean }) {
  const className = "w-full rounded-md border border-slate-300 bg-transparent px-3 py-2 text-sm text-slate-900";
  return <label className="flex flex-col gap-1 text-sm"><span>{label}</span>{multiline ? <textarea value={value || ""} onChange={(event) => onChange(event.target.value)} className={`${className} min-h-24`} /> : <input value={value || ""} onChange={(event) => onChange(event.target.value)} className={className} />}</label>;
}

export default function NewPortfolioEditor({ id }: { id?: string }) {
  const router = useRouter();
  const [portfolio, setPortfolio] = useState<NewPortfolio>(emptyPortfolio);
  const [relatedChoices, setRelatedChoices] = useState<NewPortfolio[]>([]);
  const [categories, setCategories] = useState<{ _id: string; name: string }[]>([]);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    let active = true;
    const load = async () => {
      try {
        const [recordResponse, listResponse, categoriesResponse] = await Promise.all([
          id ? fetch(`/api/new-portfolios?id=${id}`) : Promise.resolve(null),
          fetch("/api/new-portfolios", { cache: "no-store" }),
          fetch("/api/categories"),
        ]);
        const listData = await listResponse.json();
        if (!listResponse.ok) throw new Error(listData.error || "Could not load portfolios.");
        if (active) setRelatedChoices((listData.portfolios || []).filter((item: NewPortfolio) => item._id !== id));
        const categoryData = await categoriesResponse.json();
        if (!categoriesResponse.ok) throw new Error(categoryData.error || "Could not load categories.");
        if (active) setCategories(categoryData.categories || []);
        if (recordResponse) {
          const recordData = await recordResponse.json();
          if (!recordResponse.ok) throw new Error(recordData.error || "Could not load portfolio.");
          if (active) setPortfolio({ ...emptyPortfolio, ...recordData.portfolio, categories: (recordData.portfolio.categories || []).map((category: string | { _id: string }) => typeof category === "string" ? category : category._id) });
        }
      } catch (error) {
        toast.error(error instanceof Error ? error.message : "Could not load portfolio.");
      }
    };
    void load();
    return () => { active = false; };
  }, [id]);

  const updateGroup = (group: "company" | "brand", key: string, value: string) => {
    setPortfolio((current) => ({ ...current, [group]: { ...current[group], [key]: value } }));
  };
  const updateBanner = (key: "image" | "title", value: string) => {
    setPortfolio((current) => ({ ...current, brand: { ...current.brand, banner: { ...current.brand?.banner, [key]: value } } }));
  };
  const updateSeo = (key: keyof NonNullable<NewPortfolio["seo"]>, value: string) => {
    setPortfolio((current) => ({ ...current, seo: { ...current.seo, [key]: value } }));
  };

  const save = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSaving(true);
    try {
      const response = await fetch(id ? `/api/new-portfolios?id=${id}` : "/api/new-portfolios", {
        method: id ? "PUT" : "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(portfolio),
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.error || "Could not save portfolio.");
      toast.success(data.message);
      router.push("/admin/new-portfolios");
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Could not save portfolio.");
    } finally { setSaving(false); }
  };

  return <div className="flex flex-col gap-6">
    <PageHeader title={id ? "Edit new portfolio" : "Add new portfolio"} actions={<div className="flex flex-wrap items-center gap-2"><AdminLinkButton variant="secondary" href="/admin/new-portfolios">Back to list</AdminLinkButton>{id && portfolio.slug && <><ViewLiveLink showLabel label="Live page" href={`/portfolio/${portfolio.slug}`} className="h-10 border border-slate-300 px-4 text-sm" /><span className="px-1 text-xs text-slate-500">Preview: /portfolio/v2/{portfolio.slug}</span><ViewLiveLink showLabel label="Preview V2" href={`/portfolio/v2/${portfolio.slug}`} className="h-10 border border-slate-300 px-4 text-sm" /></>}</div>} />
    <form onSubmit={save} className="flex flex-col gap-5">
      <SectionCard title="Company and URL"><div className="grid gap-4 md:grid-cols-2">
        <Field label="Company name" value={portfolio.company?.name} onChange={(v) => updateGroup("company", "name", v)} />
        <Field label="Industry" value={portfolio.company?.industry} onChange={(v) => updateGroup("company", "industry", v)} />
        <Field label="Country" value={portfolio.company?.country} onChange={(v) => updateGroup("company", "country", v)} />
        <Field label="Slug" value={portfolio.slug} onChange={(slug) => setPortfolio((p) => ({ ...p, slug }))} />
        <Field label="Website link" value={portfolio.brand?.websiteLink} onChange={(v) => updateGroup("brand", "websiteLink", v)} />
      </div></SectionCard>
      <SectionCard title="Brand and banner"><div className="grid gap-5 md:grid-cols-2">
        <div><p className="mb-2 text-sm">Optional logo</p><ImageUploader isLogo value={portfolio.brand?.logo} onChange={(logo) => updateGroup("brand", "logo", logo)} /></div>
        <div><p className="mb-2 text-sm">Optional banner image</p><ImageUploader value={portfolio.brand?.banner?.image} onChange={(image) => updateBanner("image", image)} /></div>
        <Field label="Banner title" value={portfolio.brand?.banner?.title} onChange={(v) => updateBanner("title", v)} />
        <Field label="One-line brand context" value={portfolio.brand?.oneLineContext} onChange={(v) => updateGroup("brand", "oneLineContext", v)} multiline />
      </div></SectionCard>
      <SectionCard title="Highlights"><div className="space-y-3">{(portfolio.highlights || []).map((item, i) => <div key={i} className="grid gap-3 md:grid-cols-[1fr_2fr_auto]"><Field label="Number" value={item.number} onChange={(v) => setPortfolio((p) => ({ ...p, highlights: (p.highlights || []).map((x, n) => n === i ? { ...x, number: v } : x) }))} /><Field label="Text" value={item.text} onChange={(v) => setPortfolio((p) => ({ ...p, highlights: (p.highlights || []).map((x, n) => n === i ? { ...x, text: v } : x) }))} /><AdminButton variant="secondary" onClick={() => setPortfolio((p) => ({ ...p, highlights: (p.highlights || []).filter((_, n) => n !== i) }))}>Remove</AdminButton></div>)}<AdminButton variant="secondary" onClick={() => setPortfolio((p) => ({ ...p, highlights: [...(p.highlights || []), {}] }))}>Add highlight</AdminButton></div></SectionCard>
      <SectionCard title="Preview images"><div className="grid gap-4 md:grid-cols-3">{(portfolio.previewImages || []).map((image, i) => <div key={i}><ImageUploader value={image} onChange={(v) => setPortfolio((p) => ({ ...p, previewImages: (p.previewImages || []).map((x, n) => n === i ? v : x) }))} /><AdminButton variant="secondary" onClick={() => setPortfolio((p) => ({ ...p, previewImages: (p.previewImages || []).filter((_, n) => n !== i) }))}>Remove</AdminButton></div>)}<AdminButton variant="secondary" onClick={() => setPortfolio((p) => ({ ...p, previewImages: [...(p.previewImages || []), ""] }))}>Add image</AdminButton></div></SectionCard>
      <SectionCard title="What We Delivered"><Field label="Section title" value={portfolio.whatWeDelivered?.title} onChange={(title) => setPortfolio((p) => ({ ...p, whatWeDelivered: { ...p.whatWeDelivered, title } }))} /><div className="mt-4 space-y-4">{(portfolio.whatWeDelivered?.items || []).map((item, i) => <div key={item._id || i} className="grid gap-3 rounded border p-3 md:grid-cols-2"><Field label="Item title" value={item.title} onChange={(title) => setPortfolio((p) => ({ ...p, whatWeDelivered: { ...p.whatWeDelivered, items: (p.whatWeDelivered?.items || []).map((x, n) => n === i ? { ...x, title } : x) } }))} /><div><p className="mb-2 text-sm">Icon</p><ImageUploader isLogo value={item.icon} onChange={(icon) => setPortfolio((p) => ({ ...p, whatWeDelivered: { ...p.whatWeDelivered, items: (p.whatWeDelivered?.items || []).map((x, n) => n === i ? { ...x, icon } : x) } }))} /></div><AdminButton variant="secondary" onClick={() => setPortfolio((p) => ({ ...p, whatWeDelivered: { ...p.whatWeDelivered, items: (p.whatWeDelivered?.items || []).filter((_, n) => n !== i) } }))}>Remove item</AdminButton></div>)}<AdminButton variant="secondary" onClick={() => setPortfolio((p) => ({ ...p, whatWeDelivered: { ...p.whatWeDelivered, items: [...(p.whatWeDelivered?.items || []), {}] } }))}>Add item</AdminButton></div></SectionCard>
      <SectionCard title="Calls to action"><div className="grid gap-5 md:grid-cols-2">{(["primary", "secondary"] as const).map((key) => <div key={key} className="space-y-3"><h3 className="font-medium">{key === "primary" ? "First CTA" : "Second CTA"}</h3>{(["title", "buttonText", "link"] as const).map((field) => <Field key={field} label={field} value={portfolio.callsToAction?.[key]?.[field]} onChange={(value) => setPortfolio((p) => ({ ...p, callsToAction: { ...p.callsToAction, [key]: { ...p.callsToAction?.[key], [field]: value } } }))} />)}</div>)}</div></SectionCard>
      <SectionCard title="Related new portfolios"><Field label="Section title" value={portfolio.relatedPortfolios?.title} onChange={(title) => setPortfolio((p) => ({ ...p, relatedPortfolios: { ...p.relatedPortfolios, title } }))} /><div className="mt-3 max-h-56 space-y-2 overflow-y-auto">{relatedChoices.map((choice) => <label key={choice._id} className="flex gap-2"><input type="checkbox" checked={(portfolio.relatedPortfolios?.items || []).includes(choice._id || "")} onChange={(e) => setPortfolio((p) => ({ ...p, relatedPortfolios: { ...p.relatedPortfolios, items: e.target.checked ? [...(p.relatedPortfolios?.items || []), choice._id! ] : (p.relatedPortfolios?.items || []).filter((item) => item !== choice._id) } }))} />{choice.company?.name || choice.slug || "Untitled"}</label>)}</div></SectionCard>
      <SectionCard title="Categories"><div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-3">{categories.map((category) => <label key={category._id} className="flex items-center gap-2 rounded border border-slate-200 p-2"><input type="checkbox" checked={(portfolio.categories || []).includes(category._id)} onChange={(event) => setPortfolio((p) => ({ ...p, categories: event.target.checked ? [...(p.categories || []), category._id] : (p.categories || []).filter((id) => id !== category._id) }))} />{category.name}</label>)}</div></SectionCard>
      <SectionCard title="SEO"><div className="grid gap-4 md:grid-cols-2">{(["metaTitle", "metaDescription", "ogTitle", "ogDescription", "twitterTitle", "twitterDescription", "schema"] as const).map((key) => <Field key={key} label={key} value={portfolio.seo?.[key]} onChange={(v) => updateSeo(key, v)} multiline={key.toLowerCase().includes("description") || key === "schema"} />)}<div><p className="mb-2 text-sm">Open Graph image</p><ImageUploader value={portfolio.seo?.ogImage} onChange={(url) => updateSeo("ogImage", url)} /></div><div><p className="mb-2 text-sm">Twitter image</p><ImageUploader value={portfolio.seo?.twitterImage} onChange={(url) => updateSeo("twitterImage", url)} /></div></div></SectionCard>
      <SectionCard title="Publishing and listing"><div className="flex flex-wrap gap-6"><label className="flex gap-2"><input type="checkbox" checked={portfolio.isPublished === true} onChange={(e) => setPortfolio((p) => ({ ...p, isPublished: e.target.checked }))} />Use new page on live URL</label><label className="flex gap-2"><input type="checkbox" checked={portfolio.featured === true} onChange={(e) => setPortfolio((p) => ({ ...p, featured: e.target.checked }))} />Featured</label><label className="flex gap-2"><input type="checkbox" checked={portfolio.isListed !== false} onChange={(e) => setPortfolio((p) => ({ ...p, isListed: e.target.checked }))} />Listed</label></div></SectionCard>
      <div className="sticky bottom-4 flex justify-end rounded-xl border bg-white p-3 shadow"><AdminButton type="submit" disabled={saving}>{saving ? "Saving…" : "Save new portfolio"}</AdminButton></div>
    </form>
  </div>;
}
