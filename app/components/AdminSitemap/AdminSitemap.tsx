"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { ExternalLink } from "lucide-react";
import {
  PageHeader,
  SectionCard,
  adminButtonClass,
} from "@/app/components/AdminUI";

interface SitemapBackupInfo {
  fileName: string;
  urlCount: number;
  priorityCount: number;
  updatedAt: string;
}

const SitemapPage = () => {
  const [file, setFile] = useState<File | null>(null);
  const [backup, setBackup] = useState<SitemapBackupInfo | null>(null);
  const [loading, setLoading] = useState(true);
  const [busy, setBusy] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const fetchBackup = async () => {
    setLoading(true);
    try {
      const response = await fetch("/api/sitemap/backup", {
        cache: "no-store",
      });
      const result = await response.json();
      if (!response.ok) throw new Error(result.message);
      setBackup(result.data ?? null);
    } catch (fetchError) {
      setError(
        fetchError instanceof Error
          ? fetchError.message
          : "Failed to load sitemap backup",
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    void fetchBackup();
  }, []);

  const uploadBackup = async () => {
    if (!file) return;

    setBusy(true);
    setMessage("");
    setError("");
    try {
      const formData = new FormData();
      formData.append("file", file);
      const response = await fetch("/api/sitemap/backup", {
        method: "POST",
        body: formData,
      });
      const result = await response.json();
      if (!response.ok) throw new Error(result.message);
      setMessage(result.message);
      setFile(null);
      await fetchBackup();
    } catch (uploadError) {
      setError(
        uploadError instanceof Error
          ? uploadError.message
          : "Failed to upload sitemap backup",
      );
    } finally {
      setBusy(false);
    }
  };

  const removeBackup = async () => {
    setBusy(true);
    setMessage("");
    setError("");
    try {
      const response = await fetch("/api/sitemap/backup", {
        method: "DELETE",
      });
      const result = await response.json();
      if (!response.ok) throw new Error(result.message);
      setBackup(null);
      setMessage(result.message);
    } catch (deleteError) {
      setError(
        deleteError instanceof Error
          ? deleteError.message
          : "Failed to remove sitemap backup",
      );
    } finally {
      setBusy(false);
    }
  };

  return (
    <div className="flex flex-col gap-6 pb-5">
      <PageHeader
        title="Sitemap"
        description="The generated sitemap remains primary. This uploaded XML is used only if dynamic generation fails; any priority values in it are preserved."
        actions={
          <a
            href="/sitemap.xml"
            target="_blank"
            rel="noopener noreferrer"
            className={adminButtonClass("secondary")}
          >
            <ExternalLink className="size-4" />
            View live sitemap
          </a>
        }
      />

      <SectionCard
        title="Current XML backup"
        description="Fallback file served when dynamic generation fails."
      >
        {loading ? (
          <p className="text-sm text-slate-500">Loading backup status...</p>
        ) : backup ? (
          <div className="flex flex-col gap-3 rounded-lg border border-slate-200 bg-slate-50 p-4 dark:border-slate-700 dark:bg-slate-900/40">
            <div className="text-sm">
              <p className="font-semibold text-slate-900 dark:text-white">
                {backup.fileName}
              </p>
              <p className="text-slate-500 dark:text-slate-400">
                {backup.urlCount} URLs · {backup.priorityCount} priority values
                · Updated {new Date(backup.updatedAt).toLocaleString()}
              </p>
            </div>
            <div className="flex flex-wrap gap-2">
              <a
                href="/api/sitemap/backup?download=1"
                target="_blank"
                rel="noopener noreferrer"
                className={adminButtonClass("secondary", "sm")}
              >
                View backup XML
              </a>
              <button
                type="button"
                onClick={removeBackup}
                disabled={busy}
                className={adminButtonClass("danger", "sm")}
              >
                Remove backup
              </button>
            </div>
          </div>
        ) : (
          <p className="text-sm text-slate-500 dark:text-slate-400">
            No XML backup uploaded.
          </p>
        )}
      </SectionCard>

      <SectionCard
        title={backup ? "Replace XML backup" : "Upload XML backup"}
        description="Choose a .xml sitemap file, then upload it."
      >
        <div className="flex flex-col gap-4">
          <div className="flex flex-col items-start gap-3 rounded-lg border border-dashed border-slate-300 p-4 dark:border-slate-600">
            <input
              type="file"
              accept=".xml,application/xml,text/xml"
              onChange={(event) => {
                setFile(event.target.files?.[0] ?? null);
                setMessage("");
                setError("");
              }}
              className="text-sm"
            />
            <Button
              type="button"
              disabled={!file || busy}
              onClick={uploadBackup}
              className={adminButtonClass("dark", "md", "w-fit")}
            >
              {busy
                ? "Saving..."
                : backup
                  ? "Replace XML backup"
                  : "Upload XML backup"}
            </Button>
          </div>

          {message && <p className="text-sm text-green-700">{message}</p>}
          {error && <p className="text-sm text-red-600">{error}</p>}
        </div>
      </SectionCard>
    </div>
  );
};

export default SitemapPage;
