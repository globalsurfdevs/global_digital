"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import AdminItemContainer from "@/app/components/common/AdminItemContainer";

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
    <div className="flex flex-col gap-5 pb-5">
      <AdminItemContainer>
        <Label main>Sitemap</Label>
        <div className="flex flex-col gap-4 p-5">
          <p className="text-sm text-gray-600">
            The generated sitemap remains primary. This uploaded XML is used
            only if dynamic generation fails; any priority values in it are
            preserved.
          </p>
          <a
            href="/sitemap.xml"
            target="_blank"
            rel="noopener noreferrer"
            className="w-fit text-sm text-blue-600 underline"
          >
            View live sitemap
          </a>

          {loading ? (
            <p className="text-sm text-gray-500">Loading backup status...</p>
          ) : backup ? (
            <div className="flex flex-col gap-3 rounded-md border border-black/20 p-4">
              <div className="text-sm">
                <p className="font-semibold">{backup.fileName}</p>
                <p className="text-gray-500">
                  {backup.urlCount} URLs · {backup.priorityCount} priority
                  values · Updated {new Date(backup.updatedAt).toLocaleString()}
                </p>
              </div>
              <div className="flex flex-wrap gap-3">
                <a
                  href="/api/sitemap/backup?download=1"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-blue-600 underline"
                >
                  View backup XML
                </a>
                <button
                  type="button"
                  onClick={removeBackup}
                  disabled={busy}
                  className="text-sm text-red-600 underline disabled:opacity-50"
                >
                  Remove backup
                </button>
              </div>
            </div>
          ) : (
            <p className="text-sm text-gray-600">No XML backup uploaded.</p>
          )}

          <div className="flex flex-col items-start gap-3 rounded-md border border-dashed border-black/20 p-4">
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
              className="w-fit text-white"
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
      </AdminItemContainer>
    </div>
  );
};

export default SitemapPage;
