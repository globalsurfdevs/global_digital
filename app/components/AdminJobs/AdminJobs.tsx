"use client";

import { JobInputType } from "@/app/types/JobInputType";
import { JobType } from "@/app/types/JobType";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { BiTrash } from "react-icons/bi";
import { toast } from "sonner";
import {
  AdminLinkButton,
  ConfirmDialog,
  EmptyState,
  LoadingState,
  PageHeader,
  SearchInput,
  SectionCard,
  ViewLiveLink,
  matchesQuery,
} from "@/app/components/AdminUI";
import { Pencil, Plus } from "lucide-react";

const AdminJobs = () => {
  const [jobs, setJobs] = useState<JobType[] | []>([]);
  const [refetch, setRefetch] = useState(false);
  const [pendingDelete, setPendingDelete] = useState<JobType | null>(null);
  const [query, setQuery] = useState("");
  // True until the first load finishes, so the empty message never shows while data is loading.
  const [listLoading, setListLoading] = useState(true);

  useEffect(() => {
    const fetchJobsData = async () => {
      try {
        const response = await fetch(`/api/jobs`);
        if (response.ok) {
          const data = await response.json();
          setJobs(data.jobs);
        } else {
          console.error("Failed to fetch job data");
        }
      } catch (error) {
        console.error("Error fetching job data:", error);
      }
    };

    fetchJobsData().finally(() => setListLoading(false));
  }, [refetch]);

  const visibleJobs = jobs.filter((item) =>
    matchesQuery(query, item.jobTitle, item.team, item.slug),
  );

  const handleDeleteJob = async (id: string, e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    try {
      const response = await fetch(`/api/jobs?id=${id}`, {
        method: "DELETE",
      });
      if (response.ok) {
        const data = await response.json();
        toast.success(data.message);
        setRefetch((prev) => !prev);
      } else {
        console.error("Failed to remove job data");
      }
    } catch (error) {
      console.error("Error deleting job:", error);
    }
  };

  return (
    <div className="flex flex-col gap-6">
      <PageHeader
        title="Jobs"
        description="Open roles listed on the careers page."
        actions={
          <AdminLinkButton
            href={"/admin/jobs/add"}
            variant="dark"
            icon={<Plus className="size-4" />}
          >
            Add a new job
          </AdminLinkButton>
        }
      />

      <SectionCard
        title={
          <span className="flex items-center gap-3">
            Available jobs
            {!listLoading && (
              <span className="rounded-full bg-slate-100 px-2.5 py-0.5 text-xs font-medium text-slate-600">
                {jobs.length}
              </span>
            )}
          </span>
        }
        actions={
          <SearchInput
            value={query}
            onChange={setQuery}
            placeholder="Search by title or team"
          />
        }
        bodyClassName={visibleJobs.length > 0 ? "p-0" : undefined}
      >
        {visibleJobs.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm text-slate-700">
              <thead className="border-b border-slate-200 bg-slate-50 text-xs uppercase tracking-wide text-slate-500">
                <tr>
                  <th scope="col" className="px-5 py-3">
                    Job Title
                  </th>
                  <th scope="col" className="px-5 py-3">
                    Team
                  </th>
                  <th scope="col" className="px-5 py-3 text-right">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody>
                {visibleJobs.map((item) => (
                  <tr
                    key={item._id}
                    className="border-b border-slate-100 last:border-0 hover:bg-slate-50"
                  >
                    <td className="px-5 py-3.5">
                      <Link
                        href={`/admin/jobs/${item._id}`}
                        className="font-medium text-slate-900 hover:underline"
                      >
                        {item.jobTitle}
                      </Link>
                    </td>
                    <td className="px-5 py-3.5 text-slate-600">{item.team}</td>
                    <td className="px-5 py-3.5">
                      <div className="flex items-center justify-end gap-1">
                        {/* Public careers page links jobs as /careers/{slug} (app/components/Careers/index.tsx). */}
                        <ViewLiveLink
                          href={item.slug ? `/careers/${item.slug}` : null}
                        />
                        <Link
                          href={`/admin/jobs/${item._id}`}
                          title="Edit"
                          aria-label="Edit job"
                          className="inline-flex size-8 items-center justify-center rounded-lg text-slate-500 transition-colors hover:bg-slate-100 hover:text-slate-900"
                        >
                          <Pencil className="size-4" />
                        </Link>
                        <span className="mx-1 h-5 w-px bg-slate-200" />
                        <button
                          onClick={(e) => {
                            e.preventDefault();
                            e.stopPropagation();
                            setPendingDelete(item);
                          }}
                          className="inline-flex size-8 items-center justify-center rounded-lg text-slate-400 transition-colors hover:bg-red-50 hover:text-red-600"
                          aria-label="Delete job"
                          title="Delete"
                        >
                          <BiTrash className="size-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : listLoading ? (
          <LoadingState />
        ) : jobs.length > 0 ? (
          <EmptyState
            title={`No results for "${query}"`}
            description="Try a different title, or clear the search."
          />
        ) : (
          <EmptyState title="No jobs available" />
        )}
      </SectionCard>

      <ConfirmDialog
        open={!!pendingDelete}
        onOpenChange={(open) => !open && setPendingDelete(null)}
        title={`Delete "${pendingDelete?.jobTitle || "this job"}"?`}
        description="This permanently removes the job from the CMS and the careers page on the live website. This action cannot be undone."
        onConfirm={async (e) => {
          if (pendingDelete) await handleDeleteJob(pendingDelete._id, e);
        }}
      />
    </div>
  );
};

export default AdminJobs;
