"use client";

import React, { useEffect, useState } from "react";
import Label from "../Label/Label";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

import { useParams } from "next/navigation";
import { JobInputType } from "@/app/types/JobInputType";
// import RichEditor from '../RichEditor/RichEditor'
// import "quill/dist/quill.snow.css";
// import dynamic from 'next/dynamic'
import { formatLinkForCareer } from "@/app/helpers/formatLink";
import { ArrowLeft } from "lucide-react";
import {
  AdminLinkButton,
  PageHeader,
  SectionCard,
  ViewLiveLink,
  adminButtonClass,
} from "@/app/components/AdminUI";

const AdminIndiJob = ({ editMode }: { editMode?: boolean }) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  // Slug as last loaded from the database, so "View live" never points at an unsaved slug.
  const [savedSlug, setSavedSlug] = useState("");

  const router = useRouter();
  const { jobId } = useParams();

  const {
    register,
    handleSubmit,
    setValue,
    control,
    formState: { errors },
    setError,
    watch,
  } = useForm<JobInputType>();

  const onSubmit: SubmitHandler<JobInputType> = async (data) => {
    setIsSubmitting(true);

    const formData = new FormData();
    formData.append("jobTitle", data.jobTitle);
    formData.append("team", data.team);
    formData.append("description", data.description);
    formData.append("slug", data.slug);

    try {
      const url = editMode ? `/api/jobs?id=${jobId}` : `/api/jobs`;
      const method = "POST";
      console.log("Here");
      const response = await fetch(url, {
        method: method,
        body: formData,
      });
      const data = await response.json();
      console.log(data);

      if (!data.error) {
        toast.success(data.message);
        router.push("/admin/jobs");
      } else {
        toast.error(data.error);
      }
    } catch (error) {
      console.error("Error updating jobs:", error);
      toast.error("Failed to update job data. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  useEffect(() => {
    const fetchJobData = async () => {
      try {
        const response = await fetch(`/api/jobs?id=${jobId}`);
        if (response.ok) {
          const data = await response.json();

          if (data.jobs) {
            setValue("jobTitle", data.jobs.jobTitle);
            setValue("team", data.jobs.team);
            setValue("description", data.jobs.description);
            setSavedSlug(data.jobs.slug || "");
          }
        } else {
          console.error("Failed to fetch job data");
        }
      } catch (error) {
        console.error("Error fetching job data:", error);
      }
    };

    if (editMode) {
      fetchJobData();
    }
  }, []);

  useEffect(() => {
    setValue("slug", formatLinkForCareer(watch("jobTitle")));
  }, [watch("jobTitle")]);

  return (
    <div className="flex flex-col gap-6">
      <PageHeader
        title={`${editMode ? "Edit" : "Add"} Job`}
        description={
          editMode
            ? watch("jobTitle")
            : "Fill in the job details below, then click Save."
        }
        actions={
          <>
            <AdminLinkButton
              href="/admin/jobs"
              variant="secondary"
              icon={<ArrowLeft className="size-4" />}
            >
              Back to list
            </AdminLinkButton>
            {/* Public careers page links jobs as /careers/${item.slug} (app/components/Careers/index.tsx:140) */}
            {editMode && savedSlug && (
              <ViewLiveLink
                showLabel
                href={`/careers/${savedSlug}`}
                className="h-10 border border-slate-300 px-4 text-sm"
              />
            )}
          </>
        }
      />
      <form className="flex flex-col gap-6" onSubmit={handleSubmit(onSubmit)}>
        <SectionCard
          title="Job details"
          description="The slug is generated automatically from the job title."
        >
          <div className="flex flex-col gap-4">
            <div className="flex w-full flex-col gap-2">
              <Label content="Job title" />
              <input
                type="text"
                {...register("jobTitle", { required: "Job Title is required" })}
                className={
                  "w-full rounded-md border-[1px] border-gray-300 bg-transparent py-1 pl-4 text-black focus:outline-none"
                }
              />
              {errors.jobTitle && (
                <p className="text-red mt-1 text-sm">
                  {errors.jobTitle.message}
                </p>
              )}
            </div>

            <div className="flex w-full flex-col gap-2">
              <Label content="Slug" />
              <input
                type="text"
                {...register("slug")}
                readOnly
                className={
                  "w-full rounded-md border-[1px] border-gray-300 bg-transparent py-1 pl-4 text-black focus:outline-none"
                }
              />
            </div>

            <div className="flex w-full flex-col gap-2">
              <Label content="Team" />
              <input
                type="text"
                {...register("team", { required: "Team is required" })}
                className={
                  "w-full rounded-md border-[1px] border-gray-300 bg-transparent py-1 pl-4 text-black focus:outline-none"
                }
              />
              {errors.team && (
                <p className="text-red mt-1 text-sm">{errors.team.message}</p>
              )}
            </div>

            <div className="flex w-full flex-col gap-2">
              <Label content="Description" />
              {/* <textarea {...register("description",{ required: "Description is required" })} className={'rounded-md pl-4 w-full border-gray-300 border-[1px] py-1 text-black bg-transparent focus:outline-none'} /> */}
              {/* <RichEditor control={control} name="description" /> */}
              {errors.description && (
                <p className="text-red mt-1 text-sm">
                  {errors.description.message}
                </p>
              )}
            </div>
          </div>
        </SectionCard>

        <div className="sticky bottom-4 flex items-center justify-between gap-4 rounded-xl border border-slate-200 bg-white px-5 py-3 shadow-lg dark:border-slate-700 dark:bg-slate-800">
          <p className="text-sm text-slate-500 dark:text-slate-400">
            Changes are saved only when you click Save.
          </p>
          <button
            type="submit"
            disabled={isSubmitting}
            className={adminButtonClass("dark", "md", "min-w-28")}
          >
            {isSubmitting ? "Saving" : "Save"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default AdminIndiJob;
