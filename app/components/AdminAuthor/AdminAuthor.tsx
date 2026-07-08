"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { IoMdCloseCircle } from "react-icons/io";
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
  slug:string;
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
    <div>
      <div className="flex justify-end mt-5">
        <button
          type="button"
          className="bg-blue-950 text-white px-5 py-2 rounded-xl"
          onClick={() => router.push("/admin/authors/add")}
        >
          Add Author
        </button>
      </div>

      <div className="flex flex-col gap-3 mt-5">
        {authors.map((author, index) => (
          <div
            key={index}
            className="relative flex items-center gap-4 w-full border p-4 border-dashed rounded-xl"
          >
            {author.imageSmall ? (
              <img
                src={author.imageSmall}
                alt={author.name}
                className="w-12 h-12 rounded-full object-cover border flex-shrink-0"
              />
            ) : (
              <div className="w-12 h-12 rounded-full bg-gray-200 flex-shrink-0" />
            )}

            <div className="flex flex-col">
              <span className="font-semibold">{author.name}</span>
              <span className="text-sm text-gray-500">{author.designation}</span>
            </div>

            <div className="ml-auto flex gap-5 items-center">
              <Link href={`/author/${author.slug}`} target="_blank"><FaRegEye className="text-xl cursor-pointer"/></Link>
              <MdEdit
                className="text-black cursor-pointer text-xl"
                onClick={() =>
                  router.push(`/admin/authors/edit/${author.id || author._id}`)
                }
              />
              <IoMdCloseCircle
                className="text-red-500 cursor-pointer text-xl"
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