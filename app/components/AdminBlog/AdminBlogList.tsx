"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { useForm, SubmitHandler } from "react-hook-form";
import { BlogListItem, BlogPageFormInputs } from "@/app/types/blog";
import { FiEdit2, FiTrash2, FiEye, FiEyeOff } from "react-icons/fi";
import Label from "@/app/components/Label/Label";
import {
  AdminLinkButton,
  AdminTabs,
  ConfirmDialog,
  LoadingState,
  SearchInput,
  matchesQuery,
  EmptyState,
  PageHeader,
  SectionCard,
  ViewLiveLink,
  adminButtonClass,
} from "@/app/components/AdminUI";
import { formatLinkForBlog } from "@/app/helpers/formatLink";
import { Plus } from "lucide-react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

const TAB_KEYS = ["list", "page"] as const;
type TabKey = (typeof TAB_KEYS)[number];

const AdminBlogList = () => {
  const [blogs, setBlogs] = useState<BlogListItem[]>([]);
  const [refetch, setRefetch] = useState(false);
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
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [pendingDelete, setPendingDelete] = useState<BlogListItem | null>(null);

  const { register, handleSubmit, setValue } = useForm<BlogPageFormInputs>();

  // True until the first load finishes, so the empty message never shows while data is loading.
  const [listLoading, setListLoading] = useState(true);
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
    fetchBlogs().finally(() => setListLoading(false));
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

  const onPageConfigSubmit: SubmitHandler<BlogPageFormInputs> = async (
    data,
  ) => {
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

  // Headings may contain HTML (e.g. <h1>, <br>, &nbsp;) authored for the public page.
  const headingText = (html?: string) =>
    (html ?? "")
      .replace(/<br\s*\/?>/gi, " ")
      .replace(/<[^>]*>/g, "")
      .replace(/&nbsp;/g, " ")
      .replace(/\s+/g, " ")
      .trim();

  const visibleBlogs = blogs.filter((blog) =>
    matchesQuery(query, blog.heading, blog.slug),
  );

  const formatDate = (iso: string) =>
    new Date(iso).toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });

  const inputClass =
    "rounded-lg pl-4 w-full border-slate-300 border-[1px] py-2 text-sm text-slate-900 bg-white focus:outline-none focus:border-slate-500 dark:text-white dark:bg-slate-800 dark:border-slate-600";
  const textareaClass =
    "rounded-lg pl-4 pt-2 w-full border-slate-300 border-[1px] py-2 text-sm text-slate-900 bg-white focus:outline-none focus:border-slate-500 dark:text-white dark:bg-slate-800 dark:border-slate-600 resize-none";

  return (
    <div className="flex flex-col gap-6">
      <PageHeader
        title="Blogs"
        description="Manage the blog listing page settings and individual blog posts."
        actions={
          <AdminLinkButton
            href="/admin/blogs/add"
            variant="dark"
            icon={<Plus className="size-4" />}
          >
            Add Blog
          </AdminLinkButton>
        }
      />

      <AdminTabs
        tabs={[
          {
            key: "list",
            label: "List",
            count: listLoading ? undefined : blogs.length,
          },
          { key: "page", label: "Page" },
        ]}
        active={activeTab}
        onChange={setActiveTab}
      />

      {/* Both panels stay mounted (only hidden) so switching tabs never discards unsaved input. */}
      {/* PAGE CONFIG */}
      <div hidden={activeTab !== "page"}>
        <SectionCard
          title="Blog Page Settings"
          description="Meta and heading content for the blog listing page."
          actions={<ViewLiveLink href="/blogs" showLabel />}
        >
          <form
            onSubmit={handleSubmit(onPageConfigSubmit)}
            className="flex flex-col gap-4"
          >
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
                <textarea
                  {...register("metaDescription")}
                  rows={3}
                  className={textareaClass}
                />
              </div>
              <div className="flex flex-col gap-2">
                <Label content="Page Description" />
                <textarea
                  {...register("pageDescription")}
                  rows={3}
                  className={textareaClass}
                />
              </div>
            </div>
            <div className="flex justify-end border-t border-slate-200 pt-4 dark:border-slate-700">
              <button
                type="submit"
                disabled={isSubmitting}
                className={adminButtonClass("dark", "md", "min-w-28")}
              >
                {isSubmitting ? "Saving..." : "Save"}
              </button>
            </div>
          </form>
        </SectionCard>
      </div>

      {/* BLOG LIST */}
      <div hidden={activeTab !== "list"}>
        <SectionCard
          title={
            <span className="flex items-center gap-3">
              All blogs
              {!listLoading && (
                <span className="rounded-full bg-slate-100 px-2.5 py-0.5 text-xs font-medium text-slate-600 dark:bg-slate-700 dark:text-slate-300">
                  {blogs.length}
                </span>
              )}
            </span>
          }
          description="Use the icons to open the live page, show/hide, edit or delete a blog."
        >
          <div className="mb-4">
            <SearchInput
              value={query}
              onChange={setQuery}
              placeholder="Search by title or slug"
            />
          </div>
          {visibleBlogs.length === 0 ? (
            listLoading ? (
              <LoadingState />
            ) : blogs.length > 0 ? (
              <EmptyState
                title={`No results for "${query}"`}
                description="Try a different title, or clear the search."
              />
            ) : (
              <EmptyState title="No blogs found." />
            )
          ) : (
            <div className="flex flex-col gap-3">
              {visibleBlogs.map((blog) => (
                <div
                  key={blog._id}
                  className="flex items-center justify-between gap-4 rounded-lg border border-slate-200 bg-white p-4 transition-colors hover:bg-slate-50 dark:border-slate-700 dark:bg-slate-800 dark:hover:bg-slate-700/40"
                >
                  <div className="flex items-center gap-4">
                    {blog.thumbnail && (
                      <img
                        src={blog.thumbnail}
                        alt={headingText(blog.heading)}
                        className="h-16 w-24 rounded-md object-cover"
                      />
                    )}
                    <div className="flex flex-col gap-1">
                      <span className="flex items-center gap-2 font-semibold text-slate-900 dark:text-white">
                        {/* Render the heading's HTML, but flatten every tag to inline body text so
                            stored <h1> markup can't enlarge the row; <br> becomes a space. */}
                        <span
                          className="[&_*]:!m-0 [&_*]:!inline [&_*]:!font-[inherit] [&_*]:!text-[length:inherit]"
                          dangerouslySetInnerHTML={{
                            __html: (blog.heading ?? "").replace(
                              /<br\s*\/?>/gi,
                              " ",
                            ),
                          }}
                        />
                        {blog.isHidden && (
                          <span className="rounded-full bg-slate-100 px-2 py-0.5 text-xs font-medium text-slate-500 dark:bg-slate-700 dark:text-slate-300">
                            Hidden
                          </span>
                        )}
                      </span>
                      <span className="text-xs text-slate-400">
                        {blog.slug}
                      </span>
                      <div className="flex gap-4 text-xs text-slate-500 dark:text-slate-400">
                        <span>
                          Published:{" "}
                          {formatDate(blog.publishedAt ?? blog.createdAt)}
                        </span>
                        <span>Updated: {formatDate(blog.updatedAt)}</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex shrink-0 items-center gap-1">
                    {/* Same URL the public blog listing builds: app/components/Blogs/BlogList.tsx (`/blogs/${formatLinkForBlog(item.slug)}`). Hidden blogs are not public. */}
                    {!blog.isHidden && (
                      <ViewLiveLink
                        href={`/blogs/${formatLinkForBlog(blog.slug)}`}
                      />
                    )}
                    <button
                      onClick={() => handleToggleVisibility(blog._id)}
                      title={blog.isHidden ? "Show" : "Hide"}
                      className="inline-flex size-8 items-center justify-center rounded-lg text-slate-500 transition-colors hover:bg-slate-100 hover:text-blue-600 dark:text-slate-400 dark:hover:bg-slate-700"
                    >
                      {blog.isHidden ? (
                        <FiEyeOff size={18} />
                      ) : (
                        <FiEye size={18} />
                      )}
                    </button>
                    <Link
                      href={`/admin/blogs/${blog._id}`}
                      title="Edit"
                      className="inline-flex size-8 items-center justify-center rounded-lg text-slate-500 transition-colors hover:bg-slate-100 hover:text-green-600 dark:text-slate-400 dark:hover:bg-slate-700"
                    >
                      <FiEdit2 size={18} />
                    </Link>
                    <button
                      onClick={() => setPendingDelete(blog)}
                      title="Delete"
                      className="inline-flex size-8 items-center justify-center rounded-lg text-slate-500 transition-colors hover:bg-red-50 hover:text-red-600 dark:text-slate-400 dark:hover:bg-red-500/10"
                    >
                      <FiTrash2 size={18} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </SectionCard>
      </div>

      <ConfirmDialog
        open={!!pendingDelete}
        onOpenChange={(open) => !open && setPendingDelete(null)}
        title={`Delete "${headingText(pendingDelete?.heading) || "this blog"}"?`}
        description="This permanently removes the blog from the CMS and the live website. This action cannot be undone."
        onConfirm={async () => {
          if (pendingDelete) await handleDelete(pendingDelete._id);
        }}
      />
    </div>
  );
};

export default AdminBlogList;
