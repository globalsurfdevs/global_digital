"use client";

import { useEffect, useMemo, useState } from "react";
import { Bell, CalendarDays, Clock3, Plus, Trash2 } from "lucide-react";

type Enquiry = {
  _id: string;
  name: string;
  email: string;
  service: string;
  created_at: string;
};

type Reminder = {
  id: string;
  enquiryId: string;
  name: string;
  dueDate: string;
  note: string;
};

type Period = "week" | "month" | "year" | "custom";
const STORAGE_KEY = "admin-enquiry-reminders";

const toDateParam = (date: Date) => {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
};

const getPeriodRange = (period: Period, customRange: { from: string; to: string } | null) => {
  if (period === "custom" && customRange) return customRange;
  const today = startOfDay(new Date());
  const from = new Date(today);
  if (period === "week") {
    const weekday = (today.getDay() + 6) % 7;
    from.setDate(today.getDate() - weekday);
  } else if (period === "month") {
    from.setDate(1);
  } else {
    from.setMonth(0, 1);
  }
  return { from: toDateParam(from), to: toDateParam(today) };
};

const startOfDay = (date: Date) => {
  const result = new Date(date);
  result.setHours(0, 0, 0, 0);
  return result;
};

export default function EnquiryDashboard() {
  const [period, setPeriod] = useState<Period>("week");
  const [customFrom, setCustomFrom] = useState("");
  const [customTo, setCustomTo] = useState("");
  const [appliedCustomRange, setAppliedCustomRange] = useState<{ from: string; to: string } | null>(null);
  const [enquiries, setEnquiries] = useState<Enquiry[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [loadError, setLoadError] = useState("");
  const [reminders, setReminders] = useState<Reminder[]>([]);
  const [selectedId, setSelectedId] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [note, setNote] = useState("");

  useEffect(() => {
    try {
      const saved = window.localStorage.getItem(STORAGE_KEY);
      if (saved) setReminders(JSON.parse(saved));
    } catch {
      setReminders([]);
    }
  }, []);

  useEffect(() => {
    const controller = new AbortController();
    const loadPeriodEnquiries = async () => {
      if (period === "custom" && !appliedCustomRange) {
        setEnquiries([]);
        setLoadError("");
        setIsLoading(false);
        return;
      }
      setIsLoading(true);
      setLoadError("");
      try {
        const range = getPeriodRange(period, appliedCustomRange);
        const params = new URLSearchParams({ ...range, page: "1", limit: "250" });
        const firstResponse = await fetch(`/api/enquiry?${params}`, { signal: controller.signal });
        if (!firstResponse.ok) throw new Error("Could not load enquiries.");
        const firstPage = await firstResponse.json();
        const allEnquiries: Enquiry[] = firstPage.data ?? [];

        for (let page = 2; page <= (firstPage.totalPages ?? 1); page += 1) {
          const pageParams = new URLSearchParams({ ...range, page: String(page), limit: "250" });
          const response = await fetch(`/api/enquiry?${pageParams}`, { signal: controller.signal });
          if (!response.ok) throw new Error("Could not load all enquiries for this period.");
          const result = await response.json();
          allEnquiries.push(...(result.data ?? []));
        }

        setEnquiries(allEnquiries);
      } catch (error) {
        if (error instanceof Error && error.name === "AbortError") return;
        setLoadError("Unable to load enquiry activity. Please try again.");
        setEnquiries([]);
      } finally {
        if (!controller.signal.aborted) setIsLoading(false);
      }
    };

    loadPeriodEnquiries();
    return () => controller.abort();
  }, [period, appliedCustomRange]);

  const saveReminders = (next: Reminder[]) => {
    setReminders(next);
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
  };

  const chart = useMemo(() => {
    const today = startOfDay(new Date());
    const buckets: { label: string; start: Date; end: Date; count: number }[] = [];

    if (period === "custom") {
      if (appliedCustomRange) {
        const startRange = new Date(`${appliedCustomRange.from}T00:00:00`);
        const endRange = new Date(`${appliedCustomRange.to}T00:00:00`);
        endRange.setDate(endRange.getDate() + 1);
        const days = Math.ceil((endRange.getTime() - startRange.getTime()) / 86400000);
        const bucketDays = days <= 31 ? 1 : days <= 180 ? 7 : 30;
        for (let cursor = new Date(startRange); cursor < endRange;) {
          const start = new Date(cursor);
          const end = new Date(cursor);
          end.setDate(end.getDate() + bucketDays);
          const label = bucketDays === 30
            ? start.toLocaleDateString("en", { month: "short", year: "2-digit" })
            : start.toLocaleDateString("en", { day: "numeric", month: "short" });
          buckets.push({ label, start, end, count: 0 });
          cursor = end;
        }
      }
    } else if (period === "week") {
      const monday = new Date(today);
      monday.setDate(today.getDate() - ((today.getDay() + 6) % 7));
      for (let offset = 0; offset < 7; offset += 1) {
        const start = new Date(monday);
        start.setDate(monday.getDate() + offset);
        const end = new Date(start);
        end.setDate(start.getDate() + 1);
        buckets.push({ label: start.toLocaleDateString("en", { weekday: "short" }), start, end, count: 0 });
      }
    } else if (period === "month") {
      const monthStart = new Date(today.getFullYear(), today.getMonth(), 1);
      for (let week = 0; week < 5; week += 1) {
        const start = new Date(monthStart);
        start.setDate(1 + week * 7);
        const end = new Date(start);
        end.setDate(start.getDate() + 7);
        buckets.push({ label: `Week ${week + 1}`, start, end, count: 0 });
      }
    } else {
      for (let month = 0; month < 12; month += 1) {
        const start = new Date(today.getFullYear(), month, 1);
        const end = new Date(today.getFullYear(), month + 1, 1);
        buckets.push({ label: start.toLocaleDateString("en", { month: "short" }), start, end, count: 0 });
      }
    }

    enquiries.forEach((enquiry) => {
      const created = new Date(enquiry.created_at);
      if (Number.isNaN(created.getTime())) return;
      const bucket = buckets.find(({ start, end }) => created >= start && created < end);
      if (bucket) bucket.count += 1;
    });

    return buckets;
  }, [enquiries, period, appliedCustomRange]);

  const maxCount = Math.max(1, ...chart.map((bucket) => bucket.count));
  const serviceCounts = useMemo(() => {
    const counts = new Map<string, number>();
    enquiries.forEach((enquiry) => {
      const service = enquiry.service?.trim() || "Other / not specified";
      counts.set(service, (counts.get(service) ?? 0) + 1);
    });
    return [...counts.entries()].sort((a, b) => b[1] - a[1]);
  }, [enquiries]);
  const maxServiceCount = Math.max(1, ...serviceCounts.map(([, count]) => count));
  const today = startOfDay(new Date());
  const overdueCount = reminders.filter((reminder) => startOfDay(new Date(`${reminder.dueDate}T00:00:00`)) < today).length;

  const addReminder = () => {
    const enquiry = enquiries.find((item) => item._id === selectedId);
    if (!enquiry || !dueDate) return;
    saveReminders([
      ...reminders,
      { id: crypto.randomUUID(), enquiryId: enquiry._id, name: enquiry.name, dueDate, note: note.trim() },
    ]);
    setSelectedId("");
    setDueDate("");
    setNote("");
  };

  return (
    <section className="flex flex-col xl:flex-row gap-5">
      <div className="rounded-xl lg:min-w-[60%] border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-700 dark:bg-slate-800">
        <div className="mb-5 flex flex-wrap items-start justify-between gap-3">
          <div>
            <h2 className="text-base font-semibold text-slate-900 dark:text-white">Enquiry activity</h2>
            <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">
              {isLoading
                ? `Loading ${period === "custom" ? "custom range" : period} enquiries…`
                : `${enquiries.length.toLocaleString()} enquiries from the selected ${period === "custom" ? "custom range" : period}.`}
            </p>
          </div>
          <div className="flex rounded-lg bg-slate-100 p-1 dark:bg-slate-900">
            {(["week", "month", "year", "custom"] as Period[]).map((item) => (
              <button key={item} type="button" onClick={() => setPeriod(item)} className={`rounded-md px-3 py-1.5 text-xs font-medium capitalize ${period === item ? "bg-white text-[#ef4035] shadow-sm dark:bg-slate-700 dark:text-white" : "text-slate-500 dark:text-slate-400"}`}>
                {item === "custom" ? "Custom" : item}
              </button>
            ))}
          </div>
        </div>
        {period === "custom" && (
          <div className="mb-4 flex flex-wrap items-end gap-3 rounded-lg bg-slate-50 p-3 dark:bg-slate-900/60">
            <label className="flex flex-col gap-1 text-xs font-medium text-slate-600 dark:text-slate-300">
              From
              <input type="date" value={customFrom} max={customTo || undefined} onChange={(event) => setCustomFrom(event.target.value)} className="h-10 rounded-lg border border-slate-200 bg-white px-3 text-sm font-normal text-slate-700 dark:border-slate-600 dark:bg-slate-800 dark:text-slate-200" />
            </label>
            <label className="flex flex-col gap-1 text-xs font-medium text-slate-600 dark:text-slate-300">
              To
              <input type="date" value={customTo} min={customFrom || undefined} onChange={(event) => setCustomTo(event.target.value)} className="h-10 rounded-lg border border-slate-200 bg-white px-3 text-sm font-normal text-slate-700 dark:border-slate-600 dark:bg-slate-800 dark:text-slate-200" />
            </label>
            <button type="button" disabled={!customFrom || !customTo || customFrom > customTo} onClick={() => setAppliedCustomRange({ from: customFrom, to: customTo })} className="h-10 rounded-lg bg-[#ef4035] px-4 text-sm font-medium text-white hover:bg-[#d9342a] disabled:cursor-not-allowed disabled:opacity-40">Apply</button>
          </div>
        )}
        {isLoading ? (
          <div className="flex h-44 items-center justify-center text-sm text-slate-500">Loading filtered enquiry data…</div>
        ) : loadError ? (
          <div className="flex h-44 items-center justify-center text-sm text-red-600">{loadError}</div>
        ) : (
        <div className="flex h-44 items-end gap-2 border-b border-slate-100 px-1 dark:border-slate-700 sm:gap-3">
          {chart.map((bucket) => (
            <div key={bucket.label} className="flex h-full min-w-0 flex-1 flex-col items-center justify-end gap-2">
              <span className="text-[10px] font-medium text-slate-500 dark:text-slate-400">{bucket.count || ""}</span>
              <div className="flex h-32 w-full items-end">
                <div title={`${bucket.label}: ${bucket.count} enquiries`} className="w-full rounded-t-md bg-[#ef4035] transition-all" style={{ height: `${Math.max(bucket.count ? 10 : 3, (bucket.count / maxCount) * 100)}%`, opacity: bucket.count ? 1 : 0.16 }} />
              </div>
              <span className="truncate text-[10px] text-slate-500 dark:text-slate-400">{bucket.label}</span>
            </div>
          ))}
        </div>
        )}
        <div className="mt-4 flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400">
          <span className="size-2 rounded-full bg-[#ef4035]" /> Enquiries received
        </div>
      </div>

      {/* <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-700 dark:bg-slate-800">
        <div className="mb-4 flex items-start justify-between">
          <div>
            <h2 className="text-base font-semibold text-slate-900 dark:text-white">Follow-up reminders</h2>
            <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">Saved only in this browser.</p>
          </div>
          <div className="flex items-center gap-1 rounded-full bg-amber-50 px-2.5 py-1 text-xs font-medium text-amber-700 dark:bg-amber-500/10 dark:text-amber-300">
            <Bell className="size-3.5" /> {overdueCount} overdue
          </div>
        </div>
        <div className="grid gap-2 sm:grid-cols-[1fr_auto]">
          <select value={selectedId} onChange={(event) => setSelectedId(event.target.value)} className="h-10 min-w-0 rounded-lg border border-slate-200 bg-white px-3 text-sm text-slate-700 dark:border-slate-600 dark:bg-slate-900 dark:text-slate-200">
            <option value="">Choose an enquiry</option>
            {enquiries.map((item) => <option key={item._id} value={item._id}>{item.name}</option>)}
          </select>
          <input aria-label="Reminder date" type="date" value={dueDate} onChange={(event) => setDueDate(event.target.value)} className="h-10 rounded-lg border border-slate-200 bg-white px-2 text-sm text-slate-700 dark:border-slate-600 dark:bg-slate-900 dark:text-slate-200" />
        </div>
        <div className="mt-2 flex gap-2">
          <input value={note} onChange={(event) => setNote(event.target.value)} placeholder="Note (optional)" className="h-10 min-w-0 flex-1 rounded-lg border border-slate-200 bg-white px-3 text-sm text-slate-700 placeholder:text-slate-400 dark:border-slate-600 dark:bg-slate-900 dark:text-slate-200" />
          <button type="button" onClick={addReminder} disabled={!selectedId || !dueDate} className="inline-flex h-10 items-center gap-1.5 rounded-lg bg-[#ef4035] px-3 text-sm font-medium text-white hover:bg-[#d9342a] disabled:cursor-not-allowed disabled:opacity-40"><Plus className="size-4" /> Add</button>
        </div>
        <div className="mt-4 max-h-40 space-y-2 overflow-y-auto">
          {reminders.length ? reminders.map((reminder) => {
            const overdue = startOfDay(new Date(`${reminder.dueDate}T00:00:00`)) < today;
            return <div key={reminder.id} className="flex items-center gap-3 rounded-lg bg-slate-50 px-3 py-2.5 dark:bg-slate-900/60">
              <div className={`flex size-8 shrink-0 items-center justify-center rounded-full ${overdue ? "bg-amber-100 text-amber-700 dark:bg-amber-500/10 dark:text-amber-300" : "bg-blue-50 text-blue-700 dark:bg-blue-500/10 dark:text-blue-300"}`}><CalendarDays className="size-4" /></div>
              <div className="min-w-0 flex-1">
                <p className="truncate text-sm font-medium text-slate-800 dark:text-slate-100">{reminder.name}</p>
                <p className="truncate text-xs text-slate-500 dark:text-slate-400">{reminder.note || (overdue ? "Follow-up overdue" : "Follow up")} · {new Date(`${reminder.dueDate}T00:00:00`).toLocaleDateString()}</p>
              </div>
              <button type="button" title="Remove reminder" onClick={() => saveReminders(reminders.filter((item) => item.id !== reminder.id))} className="rounded-md p-1.5 text-slate-400 hover:bg-red-50 hover:text-red-600 dark:hover:bg-red-500/10"><Trash2 className="size-4" /></button>
            </div>;
          }) : <div className="flex items-center gap-2 py-3 text-sm text-slate-400"><Clock3 className="size-4" /> No reminders yet.</div>}
        </div>
      </div> */}

      <div className="rounded-xl w-full border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-700 dark:bg-slate-800 ">
        <div className="mb-4">
          <h2 className="text-base font-semibold text-slate-900 dark:text-white">Enquiries by service</h2>
          <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">Breakdown from the service selected on each contact enquiry.</p>
        </div>
        {serviceCounts.length ? (
          <div className="grid gap-x-8 gap-y-4 md:grid-cols-2">
            {serviceCounts.map(([service, count]) => (
              <div key={service}>
                <div className="mb-1.5 flex items-center justify-between gap-3 text-sm">
                  <span className="truncate text-slate-700 dark:text-slate-200">{service}</span>
                  <span className="shrink-0 font-semibold text-slate-900 dark:text-white">{count}</span>
                </div>
                <div className="h-2 overflow-hidden rounded-full bg-slate-100 dark:bg-slate-700">
                  <div className="h-full rounded-full bg-[#ef4035]" style={{ width: `${(count / maxServiceCount) * 100}%` }} />
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="py-4 text-sm text-slate-400">{isLoading ? "Loading service breakdown…" : loadError || "No enquiries found for this period."}</p>
        )}
      </div>
    </section>
  );
}
