"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { IoMdTrash } from "react-icons/io";
import { MdEdit } from "react-icons/md";
import { toast } from "sonner";
import { FaRegEye } from "react-icons/fa";
import Link from "next/link";

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
  const [refetch, setRefetch] = useState(false);

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
    fetchAuthors();
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

  return (
    <div className="pb-5">
      <div className="my-5 flex justify-end">
        <button
          type="button"
          className="rounded-xl bg-blue-950 px-5 py-2 text-white"
          onClick={() => router.push("/admin/authors/add")}
        >
          Add Author
        </button>
      </div>

      <div className="flex flex-col gap-3">
        {authors.map((author, index) => (
          <div
            key={index}
            className="relative flex w-full items-center gap-4 rounded-xl border border-dashed p-4"
          >
            {author.imageSmall ? (
              <img
                src={author.imageSmall}
                alt={author.name}
                className="h-12 w-12 flex-shrink-0 rounded-full border object-cover"
              />
            ) : (
              <div className="h-12 w-12 flex-shrink-0 rounded-full bg-gray-200" />
            )}

            <div className="flex flex-col">
              <span className="font-semibold">{author.name}</span>
              <span className="text-sm text-gray-500">
                {author.designation}
              </span>
            </div>

            <div className="ml-auto flex items-center gap-5">
              <Link href={`/author/${author.slug}`} target="_blank">
                <FaRegEye className="cursor-pointer text-xl" />
              </Link>
              <MdEdit
                className="cursor-pointer text-xl text-black"
                onClick={() =>
                  router.push(`/admin/authors/edit/${author.id || author._id}`)
                }
              />
              <IoMdTrash
                className="cursor-pointer text-xl text-red-500"
                onClick={() => handleDeleteAuthor(author._id || "")}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminPortfolioAuthor;
