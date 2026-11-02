"use client";

import { LoadingState } from "@/app/components/AdminUI";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { IoMdTrash } from "react-icons/io";
import { MdEdit } from "react-icons/md";
import { toast } from "sonner";
import { FaRegEye } from "react-icons/fa";
import Link from "next/link";
import { Plus } from "lucide-react";
import {
  AdminButton,
  EmptyState,
  SearchInput,
  matchesQuery,
  PageHeader,
  SectionCard,
} from "@/app/components/AdminUI";

interface Author {
  _id: string;
  id?: string;
  name: string;
  designation: string;
  linkedin: string;
  imageSmall: string;
  imageBig: string;
  description: string;
  about: string;
  slug: string;
}

const AdminPortfolioAuthor = () => {
  const router = useRouter();
  const [authors, setAuthors] = useState<Author[]>([]);
  const [query, setQuery] = useState("");
  const [refetch, setRefetch] = useState(false);

  // True until the first load finishes, so the empty message never shows while data is loading.
  const [listLoading, setListLoading] = useState(true);
  useEffect(() => {
    const fetchAuthors = async () => {
      try {
        const response = await fetch(`/api/authors`);
        const data = await response.json();
        setAuthors(data.data);
      } catch (error) {
        console.error("Error fetching authors:", error);
      }
    };
    fetchAuthors().finally(() => setListLoading(false));
  }, [refetch]);

  const handleDeleteAuthor = async (id: string) => {
    try {
      const response = await fetch(`/api/authors?id=${id}`, {
        method: "DELETE",
      });
      if (response.ok) {
        const data = await response.json();
        toast.success(data.message);
        setRefetch(!refetch);
      } else {
        console.error("Failed to delete author data");
      }
    } catch (error) {
      console.error("Error deleting author:", error);
    }
  };

  const visibleAuthors = authors.filter((author) =>
    matchesQuery(query, author.name, author.designation, author.slug),
  );
  return (
    <div className="flex flex-col gap-6 pb-5">
      <PageHeader
        title="Authors"
        count={authors.length}
        description="Blog authors shown on articles and their public author pages."
        actions={
          <AdminButton
            type="button"
            variant="dark"
            icon={<Plus className="size-4" />}
            onClick={() => router.push("/admin/authors/add")}
          >
            Add Author
          </AdminButton>
        }
      />

      <SectionCard
        title="List of authors"
        actions={
          <SearchInput
            value={query}
            onChange={setQuery}
            placeholder="Search by name or designation"
          />
        }
      >
        {authors.length === 0 &&
          (listLoading ? (
            <LoadingState />
          ) : (
            <EmptyState title="No authors yet" />
          ))}
        {authors.length > 0 && visibleAuthors.length === 0 && (
          <EmptyState
            title={`No results for "${query}"`}
            description="Try a different name, or clear the search."
          />
        )}
        <div className="flex flex-col gap-3">
          {visibleAuthors.map((author, index) => (
            <div
              key={index}
              className="relative flex w-full items-center gap-4 rounded-xl border border-slate-200 bg-white p-4 transition-all hover:border-slate-300 hover:shadow-md dark:border-slate-700 dark:bg-slate-800"
            >
              {author.imageSmall ? (
                <img
                  src={author.imageSmall}
                  alt={author.name}
                  className="h-12 w-12 flex-shrink-0 rounded-full border border-slate-200 object-cover dark:border-slate-600"
                />
              ) : (
                <div className="h-12 w-12 flex-shrink-0 rounded-full bg-slate-200 dark:bg-slate-700" />
              )}

              <div className="flex min-w-0 flex-col">
                <span className="font-semibold text-slate-900 dark:text-white">
                  {author.name}
                </span>
                <span className="text-sm text-slate-500 dark:text-slate-400">
                  {author.designation}
                </span>
              </div>

              <div className="ml-auto flex items-center gap-1">
                {/* Same URL the public site uses: app/components/Blog-details/AuthorBioCard.tsx -> `/author/${slug}` (app/(user)/author/[slug]). */}
                <Link
                  href={`/author/${author.slug}`}
                  target="_blank"
                  title="View live page"
                  className="inline-flex size-8 items-center justify-center rounded-lg text-slate-500 transition-colors hover:bg-blue-50 hover:text-blue-600 dark:text-slate-400 dark:hover:bg-blue-500/10 dark:hover:text-blue-400"
                >
                  <FaRegEye className="cursor-pointer text-lg" />
                </Link>
                <MdEdit
                  title="Edit"
                  className="size-8 cursor-pointer rounded-lg p-1.5 text-slate-600 transition-colors hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-700"
                  onClick={() =>
                    router.push(
                      `/admin/authors/edit/${author.id || author._id}`,
                    )
                  }
                />
                <IoMdTrash
                  title="Delete"
                  className="size-8 cursor-pointer rounded-lg p-1.5 text-red-500 transition-colors hover:bg-red-50 dark:hover:bg-red-500/10"
                  onClick={() => handleDeleteAuthor(author._id || "")}
                />
              </div>
            </div>
          ))}
        </div>
      </SectionCard>
    </div>
  );
};

export default AdminPortfolioAuthor;
