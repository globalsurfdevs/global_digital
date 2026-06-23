"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { useForm, SubmitHandler } from "react-hook-form";
import { BlogListItem, BlogPageFormInputs } from "@/app/types/blog";
import { FiEdit2, FiTrash2, FiEye, FiEyeOff } from "react-icons/fi";
import Label from "@/app/components/Label/Label";

const AdminBlogList = () => {
  const [blogs, setBlogs] = useState<BlogListItem[]>([]);
  const [refetch, setRefetch] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { register, handleSubmit, setValue } = useForm<BlogPageFormInputs>();

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const res = await fetch("/api/blogs");
        if (res.ok) {
          const data = await res.json();
          setBlogs(data.blogs);
        }
      } catch {
        toast.error("Failed to fetch blogs");
      }
    };
    fetchBlogs();
  }, [refetch]);

  useEffect(() => {
    const fetchPageConfig = async () => {
      try {
        const res = await fetch("/api/blogs/page-config");
        if (res.ok) {
          const data = await res.json();
          const c = data.config;
          if (!c) return;
          setValue("metaTitle", c.metaTitle ?? "");
          setValue("metaDescription", c.metaDescription ?? "");
          setValue("pageTitle", c.pageTitle ?? "");
          setValue("pageDescription", c.pageDescription ?? "");
        }
      } catch {
        toast.error("Failed to load page config");
      }
    };
    fetchPageConfig();
  }, []);

  const onPageConfigSubmit: SubmitHandler<BlogPageFormInputs> = async (data) => {
    setIsSubmitting(true);
    try {
      const res = await fetch("/api/blogs/page-config", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      const result = await res.json();
      if (res.ok) {
        toast.success(result.message);
      } else {
        toast.error(result.error ?? "Something went wrong");
      }
    } catch {
      toast.error("Failed to save");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Delete this blog?")) return;
    try {
      const res = await fetch(`/api/blogs?id=${id}`, { method: "DELETE" });
      const data = await res.json();
      if (res.ok) {
        toast.success(data.message);
        setRefetch((p) => !p);
      } else {
        toast.error(data.error);
      }
    } catch {
      toast.error("Failed to delete");
    }
  };

  const handleToggleVisibility = async (id: string) => {
    try {
      const res = await fetch(`/api/blogs/toggle-visibility?id=${id}`, {
        method: "PATCH",
      });
      const data = await res.json();
      if (res.ok) {
        toast.success(data.message);
        setRefetch((p) => !p);
      } else {
        toast.error(data.error);
      }
    } catch {
      toast.error("Failed to toggle visibility");
    }
  };

  const formatDate = (iso: string) =>
    new Date(iso).toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });

  const inputClass =
    "rounded-md pl-4 w-full border-gray-300 border-[1px] py-1.5 text-black bg-transparent focus:outline-none dark:text-white dark:border-gray-600";
  const textareaClass =
    "rounded-md pl-4 pt-2 w-full border-gray-300 border-[1px] py-1.5 text-black bg-transparent focus:outline-none dark:text-white dark:border-gray-600 resize-none";

  return (
    <div className="flex flex-col gap-6">
      {/* PAGE CONFIG */}
      <form
        onSubmit={handleSubmit(onPageConfigSubmit)}
        className="flex flex-col gap-4 rounded-lg border border-gray-200 p-5 dark:border-gray-700"
      >
        <h2 className="font-semibold text-gray-700 dark:text-gray-300">
          Blog Page Settings
        </h2>
        <div className="grid grid-cols-2 gap-4">
          <div className="flex flex-col gap-2">
            <Label content="Meta Title" />
            <input {...register("metaTitle")} className={inputClass} />
          </div>
          <div className="flex flex-col gap-2">
            <Label content="Page Title" />
            <input {...register("pageTitle")} className={inputClass} />
          </div>
          <div className="flex flex-col gap-2">
            <Label content="Meta Description" />
            <textarea {...register("metaDescription")} rows={3} className={textareaClass} />
          </div>
          <div className="flex flex-col gap-2">
            <Label content="Page Description" />
            <textarea {...register("pageDescription")} rows={3} className={textareaClass} />
          </div>
        </div>
        <div>
          <button
            type="submit"
            disabled={isSubmitting}
            className="rounded-full bg-black px-8 py-2 text-sm text-white hover:bg-opacity-80 disabled:opacity-60"
          >
            {isSubmitting ? "Saving..." : "Save"}
          </button>
        </div>
      </form>

      {/* BLOG LIST */}
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold text-gray-800 dark:text-white">
          Blogs
        </h1>
        <Link
          href="/admin/blogs/add"
          className="rounded-lg bg-blue-950 px-4 py-2 text-sm text-white hover:bg-blue-900"
        >
          Add Blog
        </Link>
      </div>

      {blogs.length === 0 ? (
        <p className="text-gray-500">No blogs found.</p>
      ) : (
        <div className="flex flex-col gap-3">
          {blogs.map((blog) => (
            <div
              key={blog._id}
              className="flex items-center justify-between rounded-lg border border-gray-200 bg-white p-4 shadow-sm dark:border-gray-700 dark:bg-gray-800"
            >
              <div className="flex items-center gap-4">
                {blog.thumbnail && (
                  <img
                    src={blog.thumbnail}
                    alt={blog.heading}
                    className="h-16 w-24 rounded-md object-cover"
                  />
                )}
                <div className="flex flex-col gap-1">
                  <span className="font-semibold text-gray-900 dark:text-white">
                    {blog.heading}
                  </span>
                  <span className="text-xs text-gray-400">{blog.slug}</span>
                  <div className="flex gap-4 text-xs text-gray-400">
                    <span>Published: {formatDate(blog.publishedAt ?? blog.createdAt)}</span>
                    <span>Updated: {formatDate(blog.updatedAt)}</span>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <button
                  onClick={() => handleToggleVisibility(blog._id)}
                  title={blog.isHidden ? "Show" : "Hide"}
                  className="text-gray-500 hover:text-blue-600"
                >
                  {blog.isHidden ? <FiEyeOff size={18} /> : <FiEye size={18} />}
                </button>
                <Link href={`/admin/blogs/${blog._id}`} title="Edit">
                  <FiEdit2 size={18} className="text-gray-500 hover:text-green-600" />
                </Link>
                <button
                  onClick={() => handleDelete(blog._id)}
                  title="Delete"
                  className="text-gray-500 hover:text-red-600"
                >
                  <FiTrash2 size={18} />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AdminBlogList;