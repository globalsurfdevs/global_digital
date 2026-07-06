"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { useForm, SubmitHandler } from "react-hook-form";
import { toast } from "sonner";
import Image from "next/image";
import Label from "@/app/components/Label/Label";
import { generateSlugForBlog } from "@/app/helpers/generateSlug";
import { generateAndUploadImage } from "@/app/helpers/generateAndUploadImage";
import { handleImageChange } from "@/app/helpers/handleImageChange";

interface AuthorFormInputs {
  name: string;
  slug: string;
  designation: string;
  linkedin: string;
  description: string;
  about: string;
}

const AdminAuthorForm = ({ editMode }: { editMode?: boolean }) => {
  const router = useRouter();
  const { authorId } = useParams();

  const [isSubmitting, setIsSubmitting] = useState(false);

  const [detailImage, setDetailImage] = useState<File | null>(null);
  const [detailImagePreview, setDetailImagePreview] = useState<string | null>(
    null,
  );
  const [detailImageError, setDetailImageError] = useState<string | null>(
    null,
  );

  const [blogImage, setBlogImage] = useState<File | null>(null);
  const [blogImagePreview, setBlogImagePreview] = useState<string | null>(
    null,
  );
  const [blogImageError, setBlogImageError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<AuthorFormInputs>({
    defaultValues: {
      name: "",
      slug: "",
      designation: "",
      linkedin: "",
      description: "",
      about: "",
    },
  });

  // auto-slug from name
  useEffect(() => {
    const subscription = watch((value, { name }) => {
      if (name === "name") {
        setValue("slug", generateSlugForBlog(value.name ?? ""));
      }
    });
    return () => subscription.unsubscribe();
  }, [watch, setValue]);

  // fetch existing author in edit mode
  useEffect(() => {
    if (!editMode || !authorId) return;
    const fetch_ = async () => {
      try {
        const res = await fetch(`/api/authors?id=${authorId}`);
        const data = await res.json();
        const a = data.author ?? data.data;
        if (!a) return;

        setValue("name", a.name ?? "");
        setValue("slug", a.slug ?? "");
        setValue("designation", a.designation ?? "");
        setValue("linkedin", a.linkedin ?? "");
        setValue("description", a.description ?? "");
        setValue("about", a.about ?? "");

        if (a.imageBig) setDetailImagePreview(a.imageBig);
        if (a.imageSmall) setBlogImagePreview(a.imageSmall);
      } catch {
        toast.error("Failed to load author");
      }
    };
    fetch_();
  }, [editMode, authorId, setValue]);

  const onSubmit: SubmitHandler<AuthorFormInputs> = async (data) => {
    setIsSubmitting(true);
    try {
      let detailImageUrl: string = detailImagePreview ?? "";
      let blogImageUrl: string = blogImagePreview ?? "";

      if (detailImage) {
        detailImageUrl =
          (await generateAndUploadImage(detailImage)) || detailImageUrl;
      }
      if (blogImage) {
        blogImageUrl = (await generateAndUploadImage(blogImage)) || blogImageUrl;
      }

      const payload = {
        ...data,
        imageBig: detailImageUrl,
        imageSmall: blogImageUrl,
      };

      const url = editMode
        ? `/api/authors?id=${authorId}`
        : `/api/authors`;
      const method = editMode ? "PATCH" : "POST";

      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const result = await res.json();

      if (res.ok) {
        toast.success(result.message);
        router.push("/admin/authors");
      } else {
        toast.error(result.error ?? "Something went wrong");
      }
    } catch {
      toast.error("Failed to save author");
    } finally {
      setIsSubmitting(false);
    }
  };

  const inputClass =
    "rounded-md pl-4 w-full border-gray-300 border-[1px] py-1.5 text-black bg-transparent focus:outline-none dark:text-white dark:border-gray-600";
  const textareaClass =
    "rounded-md pl-4 pt-2 w-full border-gray-300 border-[1px] py-1.5 text-black bg-transparent focus:outline-none dark:text-white dark:border-gray-600 resize-none";

  const ImageUploadZone = ({
    preview,
    onClear,
    inputId,
    onChange,
    error,
  }: {
    preview: string | null;
    onClear: () => void;
    inputId: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    error: string | null;
  }) => (
    <div>
      <div
        className="flex h-60 w-full cursor-pointer flex-col items-center justify-center overflow-hidden rounded-lg border-2 border-dashed border-gray-300"
        onClick={() => document.getElementById(inputId)?.click()}
      >
        {preview ? (
          <div className="relative h-full w-full">
            <Image src={preview} alt="Preview" fill className="object-cover" />
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                onClear();
              }}
              className="absolute right-2 top-2 rounded-full bg-red-500 p-1 text-white"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 w-4"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                  clipRule="evenodd"
                />
              </svg>
            </button>
          </div>
        ) : (
          <p className="text-sm text-gray-400">Click or drag to upload</p>
        )}
        <input
          type="file"
          id={inputId}
          accept="image/*"
          className="hidden"
          onChange={onChange}
        />
      </div>
      {error && <p className="mt-1 text-sm text-red-600">{error}</p>}
    </div>
  );

  return (
    <form
      className="flex flex-col gap-6 pb-20"
      onSubmit={handleSubmit(onSubmit)}
    >
      <h1 className="text-2xl font-semibold text-gray-800 dark:text-white">
        {editMode ? "Edit Author" : "Add Author"}
      </h1>

      {/* DETAILS */}
      <section className="flex flex-col gap-4 rounded-lg border border-gray-200 p-5 dark:border-gray-700">
        <h2 className="font-semibold text-gray-700 dark:text-gray-300">
          Author Details
        </h2>
        <div className="flex flex-col gap-2">
          <Label content="Name" />
          <input
            {...register("name", { required: "Required" })}
            className={inputClass}
          />
          {errors.name && (
            <p className="text-sm text-red-500">{errors.name.message}</p>
          )}
        </div>
        <div className="flex flex-col gap-2">
          <Label content="Slug" />
          <input
            {...register("slug")}
            className={`${inputClass} cursor-not-allowed bg-gray-50`}
            readOnly
          />
        </div>
        <div className="flex flex-col gap-2">
          <Label content="Designation" />
          <input
            {...register("designation", { required: "Required" })}
            className={inputClass}
          />
          {errors.designation && (
            <p className="text-sm text-red-500">
              {errors.designation.message}
            </p>
          )}
        </div>
        <div className="flex flex-col gap-2">
          <Label content="LinkedIn URL" />
          <input
            {...register("linkedin")}
            placeholder="https://www.linkedin.com/in/..."
            className={inputClass}
          />
        </div>
        <div className="flex flex-col gap-2">
          <Label content="Description" />
          <textarea
            {...register("description")}
            rows={3}
            placeholder="Short description shown alongside the author's name"
            className={textareaClass}
          />
        </div>
        <div className="flex flex-col gap-2">
          <Label content="About" />
          <textarea
            {...register("about")}
            rows={6}
            placeholder="Longer bio shown on the author's page"
            className={textareaClass}
          />
        </div>
      </section>

      {/* IMAGES */}
      <section className="flex flex-col gap-4 rounded-lg border border-gray-200 p-5 dark:border-gray-700">
        <h2 className="font-semibold text-gray-700 dark:text-gray-300">
          Images
        </h2>
        <div className="grid grid-cols-2 gap-6">
          <div className="flex flex-col gap-2">
            <Label content="Detail Page Image" />
            <ImageUploadZone
              preview={detailImagePreview}
              onClear={() => {
                setDetailImagePreview(null);
                setDetailImage(null);
              }}
              inputId="detailImage"
              onChange={(e) =>
                handleImageChange({
                  e,
                  setImageError: setDetailImageError,
                  setImageFile: setDetailImage,
                  setPreviewImage: setDetailImagePreview,
                })
              }
              error={detailImageError}
            />
          </div>
          <div className="flex flex-col gap-2">
            <Label content="Blog Page Image" />
            <ImageUploadZone
              preview={blogImagePreview}
              onClear={() => {
                setBlogImagePreview(null);
                setBlogImage(null);
              }}
              inputId="blogImage"
              onChange={(e) =>
                handleImageChange({
                  e,
                  setImageError: setBlogImageError,
                  setImageFile: setBlogImage,
                  setPreviewImage: setBlogImagePreview,
                })
              }
              error={blogImageError}
            />
          </div>
        </div>
      </section>

      {/* SUBMIT */}
      <div className="z-9999 fixed bottom-5 right-20">
        <button
          type="submit"
          disabled={isSubmitting}
          className="rounded-full bg-black px-10 py-2 text-sm text-white hover:bg-opacity-80 disabled:opacity-60"
        >
          {isSubmitting ? "Saving..." : "Save"}
        </button>
      </div>
    </form>
  );
};

export default AdminAuthorForm;