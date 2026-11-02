"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useSession } from "next-auth/react";
import {
  ArrowRight,
  BriefcaseBusiness,
  ExternalLink,
  FileText,
  FolderKanban,
  Inbox,
  Linkedin,
  Plus,
  Target,
  UserRoundSearch,
} from "lucide-react";
import {
  PageHeader,
  SectionCard,
  adminButtonClass,
} from "@/app/components/AdminUI";

/**
 * Read-only overview. Every request here is a GET against existing admin APIs;
 * the dashboard never creates, edits or deletes anything.
 */

type Recent = {
  _id: string;
  name?: string;
  email?: string;
  service?: string;
  jobTitle?: string;
  created_at?: string;
};

const firstOfMonth = () => {
  const d = new Date();
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-01`;
};

// Paginated inbox APIs return totalPages = ceil(total / limit), so limit=1 gives the exact total.
const countFrom = async (url: string) => {
  const res = await fetch(url);
  if (!res.ok) return null;
  const data = await res.json();
  return typeof data.totalPages === "number" ? data.totalPages : null;
};

const recentFrom = async (url: string): Promise<Recent[]> => {
  const res = await fetch(url);
  if (!res.ok) return [];
  const data = await res.json();
  return Array.isArray(data.data) ? data.data : [];
};

// Career records have no created_at; the creation time is encoded in the Mongo ObjectId.
const dateOf = (item: Recent) =>
  item.created_at
    ? new Date(item.created_at)
    : new Date(parseInt(item._id.substring(0, 8), 16) * 1000);

const formatDate = (d: Date) =>
  isNaN(d.getTime())
    ? ""
    : d.toLocaleDateString("en-GB", {
        day: "2-digit",
        month: "short",
        year: "numeric",
      });

const greeting = () => {
  const h = new Date().getHours();
  return h < 12 ? "Good morning" : h < 17 ? "Good afternoon" : "Good evening";
};

const StatCard = ({
  href,
  label,
  value,
  sub,
  icon,
  tone,
}: {
  href: string;
  label: string;
  value: number | null | undefined;
  sub?: string;
  icon: React.ReactNode;
  tone: string;
}) => (
  <Link
    href={href}
    className="group flex flex-col gap-4 rounded-xl border border-slate-200 bg-white p-5 shadow-sm transition hover:border-slate-300 hover:shadow-md"
  >
    <div className="flex items-center justify-between">
      <span
        className={`flex size-10 items-center justify-center rounded-lg ${tone}`}
      >
        {icon}
      </span>
      <ArrowRight className="size-4 text-slate-300 transition group-hover:translate-x-0.5 group-hover:text-slate-600" />
    </div>
    <div>
      {value === undefined ? (
        <div className="h-8 w-16 animate-pulse rounded bg-slate-100" />
      ) : (
        <p className="text-3xl font-semibold tracking-tight text-slate-900">
          {value ?? "—"}
        </p>
      )}
      <p className="mt-1 text-sm font-medium text-slate-700">{label}</p>
      {sub && <p className="mt-0.5 text-xs text-slate-500">{sub}</p>}
    </div>
  </Link>
);

const RecentList = ({
  title,
  href,
  items,
  loading,
  primary,
  secondary,
  empty,
}: {
  title: string;
  href: string;
  items: Recent[];
  loading: boolean;
  primary: (i: Recent) => string | undefined;
  secondary: (i: Recent) => string | undefined;
  empty: string;
}) => (
  <SectionCard
    title={title}
    bodyClassName="p-0"
    actions={
      <Link
        href={href}
        className="inline-flex items-center gap-1 text-sm font-medium text-slate-600 hover:text-slate-900"
      >
        View all <ArrowRight className="size-3.5" />
      </Link>
    }
  >
    {loading ? (
      <ul className="divide-y divide-slate-100">
        {Array.from({ length: 4 }).map((_, i) => (
          <li key={i} className="flex items-center justify-between px-5 py-3.5">
            <div className="h-4 w-40 animate-pulse rounded bg-slate-100" />
            <div className="h-3 w-20 animate-pulse rounded bg-slate-100" />
          </li>
        ))}
      </ul>
    ) : items.length === 0 ? (
      <p className="px-5 py-10 text-center text-sm text-slate-500">{empty}</p>
    ) : (
      <ul className="divide-y divide-slate-100">
        {items.map((item) => (
          <li key={item._id}>
            <Link
              href={href}
              className="flex items-center justify-between gap-4 px-5 py-3.5 transition hover:bg-slate-50"
            >
              <div className="min-w-0">
                <p className="truncate text-sm font-medium text-slate-900">
                  {primary(item) || "—"}
                </p>
                <p className="truncate text-xs text-slate-500">
                  {secondary(item)}
                </p>
              </div>
              <span className="shrink-0 text-xs text-slate-500">
                {formatDate(dateOf(item))}
              </span>
            </Link>
          </li>
        ))}
      </ul>
    )}
  </SectionCard>
);

const AdminDashboard = () => {
  const { data: session, status } = useSession();
  const role = (session?.user as any)?.role;
  const isHr = role === "hr";

  // undefined = still loading, null = could not load
  const [counts, setCounts] = useState<
    Record<string, number | null | undefined>
  >({});
  const [recentEnquiries, setRecentEnquiries] = useState<Recent[]>([]);
  const [recentApplications, setRecentApplications] = useState<Recent[]>([]);
  const [recentLoading, setRecentLoading] = useState(true);

  useEffect(() => {
    if (status === "loading") return;
    const month = firstOfMonth();
    const set = (key: string, value: number | null) =>
      setCounts((c) => ({ ...c, [key]: value }));
    const safe = (key: string, p: Promise<number | null>) =>
      p.then((v) => set(key, v)).catch(() => set(key, null));

    // Careers data is available to both admin and HR.
    safe("career", countFrom("/api/career?page=1&limit=1"));
    safe("linkedin", countFrom("/api/linkedin?page=1&limit=1"));
    safe(
      "linkedinMonth",
      countFrom(`/api/linkedin?page=1&limit=1&from=${month}`),
    );
    safe(
      "jobs",
      fetch("/api/jobs")
        .then((r) => (r.ok ? r.json() : null))
        .then((d) => (Array.isArray(d?.jobs) ? d.jobs.length : null)),
    );

    const recent: Promise<unknown>[] = [
      recentFrom("/api/career?page=1&limit=5").then(setRecentApplications),
    ];

    if (!isHr) {
      safe("enquiry", countFrom("/api/enquiry?page=1&limit=1"));
      safe(
        "enquiryMonth",
        countFrom(`/api/enquiry?page=1&limit=1&from=${month}`),
      );
      safe("lead", countFrom("/api/lead?page=1&limit=1"));
      safe("leadMonth", countFrom(`/api/lead?page=1&limit=1&from=${month}`));
      safe(
        "portfolio",
        fetch("/api/portfolio", { headers: { "x-auth-type": "admin" } })
          .then((r) => (r.ok ? r.json() : null))
          .then((d) =>
            Array.isArray(d?.portfolio) ? d.portfolio.length : null,
          ),
      );
      safe(
        "blogs",
        fetch("/api/blogs")
          .then((r) => (r.ok ? r.json() : null))
          .then((d) => (Array.isArray(d?.blogs) ? d.blogs.length : null)),
      );
      recent.push(
        recentFrom("/api/enquiry?page=1&limit=5").then(setRecentEnquiries),
      );
    }

    Promise.allSettled(recent).finally(() => setRecentLoading(false));
  }, [status, isHr]);

  const monthSub = (key: string) =>
    typeof counts[key] === "number" ? `${counts[key]} this month` : undefined;

  const today = new Date().toLocaleDateString("en-GB", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  const quickActions = isHr
    ? [{ href: "/admin/jobs/add", label: "Add job" }]
    : [
        { href: "/admin/portfolio/add", label: "Add portfolio" },
        { href: "/admin/blogs/add", label: "Add blog" },
        { href: "/admin/jobs/add", label: "Add job" },
      ];

  return (
    <div className="flex flex-col gap-6">
      <PageHeader
        title={`${greeting()}${session?.user?.name ? `, ${session.user.name}` : ""}`}
        description={`${today} · Here is what is happening across the website.`}
        actions={
          <>
            {quickActions.map((a) => (
              <Link
                key={a.href}
                href={a.href}
                className={adminButtonClass("secondary")}
              >
                <Plus className="size-4" />
                {a.label}
              </Link>
            ))}
            <a
              href={isHr ? "/careers" : "/"}
              target="_blank"
              rel="noopener noreferrer"
              className={adminButtonClass("dark")}
            >
              <ExternalLink className="size-4" />
              {isHr ? "View careers page" : "View website"}
            </a>
          </>
        }
      />

      <section className="flex flex-col gap-3">
        <h2 className="text-sm font-semibold uppercase tracking-wide text-slate-500">
          Inbox
        </h2>
        <div
          className={`grid grid-cols-1 gap-4 sm:grid-cols-2 ${isHr ? "xl:grid-cols-3" : "xl:grid-cols-4"}`}
        >
          {!isHr && (
            <StatCard
              href="/admin/enquiry"
              label="Enquiries"
              value={counts.enquiry}
              sub={monthSub("enquiryMonth")}
              icon={<Inbox className="size-5" />}
              tone="bg-blue-50 text-blue-600"
            />
          )}
          {!isHr && (
            <StatCard
              href="/admin/lead"
              label="Leads"
              value={counts.lead}
              sub={monthSub("leadMonth")}
              icon={<Target className="size-5" />}
              tone="bg-emerald-50 text-emerald-600"
            />
          )}
          <StatCard
            href="/admin/career"
            label="Career applications"
            value={counts.career}
            icon={<UserRoundSearch className="size-5" />}
            tone="bg-amber-50 text-amber-600"
          />
          <StatCard
            href="/admin/career/linkedin"
            label="LinkedIn submissions"
            value={counts.linkedin}
            sub={monthSub("linkedinMonth")}
            icon={<Linkedin className="size-5" />}
            tone="bg-sky-50 text-sky-600"
          />
          {isHr && (
            <StatCard
              href="/admin/jobs"
              label="Open jobs"
              value={counts.jobs}
              icon={<BriefcaseBusiness className="size-5" />}
              tone="bg-violet-50 text-violet-600"
            />
          )}
        </div>
      </section>

      {!isHr && (
        <section className="flex flex-col gap-3">
          <h2 className="text-sm font-semibold uppercase tracking-wide text-slate-500">
            Content
          </h2>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
            <StatCard
              href="/admin/portfolio"
              label="Portfolios & case studies"
              value={counts.portfolio}
              icon={<FolderKanban className="size-5" />}
              tone="bg-rose-50 text-rose-600"
            />
            <StatCard
              href="/admin/blogs"
              label="Blog posts"
              value={counts.blogs}
              icon={<FileText className="size-5" />}
              tone="bg-indigo-50 text-indigo-600"
            />
            <StatCard
              href="/admin/jobs"
              label="Open jobs"
              value={counts.jobs}
              icon={<BriefcaseBusiness className="size-5" />}
              tone="bg-violet-50 text-violet-600"
            />
          </div>
        </section>
      )}

      <div className={`grid grid-cols-1 gap-6 ${isHr ? "" : "lg:grid-cols-2"}`}>
        {!isHr && (
          <RecentList
            title="Latest enquiries"
            href="/admin/enquiry"
            items={recentEnquiries}
            loading={recentLoading}
            primary={(i) => i.name}
            secondary={(i) => [i.service, i.email].filter(Boolean).join(" · ")}
            empty="No enquiries yet."
          />
        )}
        <RecentList
          title="Latest career applications"
          href="/admin/career"
          items={recentApplications}
          loading={recentLoading}
          primary={(i) => i.name}
          secondary={(i) => [i.jobTitle, i.email].filter(Boolean).join(" · ")}
          empty="No applications yet."
        />
      </div>
    </div>
  );
};

export default AdminDashboard;
