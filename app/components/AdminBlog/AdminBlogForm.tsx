"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { useForm, useFieldArray, SubmitHandler } from "react-hook-form";
import { toast } from "sonner";
import Image from "next/image";
import { BlogFormInputs } from "@/app/types/blog";
import Label from "@/app/components/Label/Label";
import TinyEditor from "@/app/components/TinyMce/TinyEditor";
import { generateSlugForBlog } from "@/app/helpers/generateSlug";
import { generateAndUploadImage } from "@/app/helpers/generateAndUploadImage";
import { handleImageChange } from "@/app/helpers/handleImageChange";
import { uploadImagesFromEditor } from "@/app/helpers/uploadImagesFromEditor";
import { FiPlus, FiTrash2 } from "react-icons/fi";

const AdminBlogForm = ({ editMode }: { editMode?: boolean }) => {
  const router = useRouter();
  const { blogId } = useParams();

  const [isSubmitting, setIsSubmitting] = useState(false);

  const [thumbnail, setThumbnail] = useState<File | null>(null);
  const [thumbnailPreview, setThumbnailPreview] = useState<string | null>(null);
  const [thumbnailError, setThumbnailError] = useState<string | null>(null);

  const [featuredImage, setFeaturedImage] = useState<File | null>(null);
  const [featuredImagePreview, setFeaturedImagePreview] = useState<
    string | null
  >(null);
  const [featuredImageError, setFeaturedImageError] = useState<string | null>(
    null,
  );

  // per-item editor content stored outside RHF (TinyEditor pattern)
  const [itemContents, setItemContents] = useState<string[]>([]);
  const [faqAnswers, setFaqAnswers] = useState<string[]>([]);
  const [content, setContent] = useState("");
  const [schemaError, setSchemaError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    control,
    setValue,
    watch,
    formState: { errors },
  } = useForm<BlogFormInputs>({
    defaultValues: {
      items: [],
      faqItems: [],
      schemaScript: "",
    },
  });

  const {
    fields: itemFields,
    append: appendItem,
    remove: removeItem,
  } = useFieldArray({ control, name: "items" });

  const {
    fields: faqFields,
    append: appendFaq,
    remove: removeFaq,
  } = useFieldArray({ control, name: "faqItems" });

  // auto-slug from heading
  useEffect(() => {
    const subscription = watch((value, { name }) => {
      if (name === "heading") {
        setValue("slug", generateSlugForBlog(value.heading ?? ""));
      }
    });
    return () => subscription.unsubscribe();
  }, [watch, setValue]);

  // fetch existing blog in edit mode
  useEffect(() => {
    if (!editMode || !blogId) return;
    const fetch_ = async () => {
      try {
        const res = await fetch(`/api/blogs?id=${blogId}`);
        const data = await res.json();
        const b = data.blog;
        if (!b) return;

        setValue("metaTitle", b.metaTitle ?? "");
        setValue("metaDescription", b.metaDescription ?? "");
        setValue("category", b.category ?? "");
        setValue("heading", b.heading ?? "");
        setValue("slug", b.slug ?? "");
        setValue("thumbnailAlt", b.thumbnailAlt ?? "");
        setValue("featuredImageAlt", b.featuredImageAlt ?? "");
        setValue("faqTitle", b.faqTitle ?? "");
        setValue("ctaTitle", b.ctaTitle ?? "");
        setValue("ctaDescription", b.ctaDescription ?? "");
        setValue("ctaButtonText", b.ctaButtonText ?? "");
        setValue("ctaButtonLink", b.ctaButtonLink ?? "");
        setValue("content", b.content ?? "");
        setValue("schemaScript", b.schemaScript ?? "");
        setContent(b.content ?? "");

        if (b.thumbnail) setThumbnailPreview(b.thumbnail);
        if (b.featuredImage) setFeaturedImagePreview(b.featuredImage);

        if (b.items?.length) {
          setValue("items", b.items);
          setItemContents(
            b.items.map((i: { content: string }) => i.content ?? ""),
          );
        }
        if (b.faqItems?.length) {
          setValue("faqItems", b.faqItems);
          setFaqAnswers(
            b.faqItems.map((f: { answer: string }) => f.answer ?? ""),
          );
        }
      } catch {
        toast.error("Failed to load blog");
      }
    };
    fetch_();
  }, [editMode, blogId]);

  useEffect(() => {
    if (editMode) return; // don't override slug in edit mode
    const subscription = watch((value, { name }) => {
      if (name === "heading") {
        setValue("slug", generateSlugForBlog(value.heading ?? ""));
      }
    });
    return () => subscription.unsubscribe();
  }, [watch, setValue, editMode]);

  const onSubmit: SubmitHandler<BlogFormInputs> = async (data) => {
    if (data.schemaScript?.trim()) {
      try {
        JSON.parse(data.schemaScript);
        setSchemaError(null);
      } catch {
        setSchemaError("Invalid JSON — please check the schema script.");
        setIsSubmitting(false);
        return;
      }
    }
    setIsSubmitting(true);
    try {
      // process item contents through uploadImagesFromEditor
      const processedItems = await Promise.all(
        itemContents.map(async (content, i) => ({
          title: data.items[i]?.title ?? "",
          content: (await uploadImagesFromEditor(content)) ?? content,
        })),
      );

      const processedFaqItems = data.faqItems.map((faq) => ({
        question: faq.question ?? "",
        answer: faq.answer ?? "",
      }));

      let thumbnailUrl: string = thumbnailPreview ?? "";
      let featuredImageUrl: string = featuredImagePreview ?? "";

      if (thumbnail) {
        thumbnailUrl =
          (await generateAndUploadImage(thumbnail)) || thumbnailUrl;
      }
      if (featuredImage) {
        featuredImageUrl =
          (await generateAndUploadImage(featuredImage)) || featuredImageUrl;
      }

      const payload = {
        ...data,
        content: await uploadImagesFromEditor(content),
        thumbnail: thumbnailUrl,
        featuredImage: featuredImageUrl,
        items: processedItems,
        faqItems: processedFaqItems,
        schemaScript: data.schemaScript?.trim() ?? "",
      };

      const url = editMode ? `/api/blogs?id=${blogId}` : `/api/blogs`;
      const method = editMode ? "PUT" : "POST";

      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const result = await res.json();

      if (res.ok) {
        toast.success(result.message);
        router.push("/admin/blogs");
      } else {
        toast.error(result.error ?? "Something went wrong");
      }
    } catch {
      toast.error("Failed to save blog");
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
        {editMode ? "Edit Blog" : "Add Blog"}
      </h1>

      {/* META */}
      <section className="flex flex-col gap-4 rounded-lg border border-gray-200 p-5 dark:border-gray-700">
        <h2 className="font-semibold text-gray-700 dark:text-gray-300">
          SEO / Meta
        </h2>
        <div className="flex flex-col gap-2">
          <Label content="Meta Title" />
          <input {...register("metaTitle")} className={inputClass} />
        </div>
        <div className="flex flex-col gap-2">
          <Label content="Meta Description" />
          <input {...register("metaDescription")} className={inputClass} />
        </div>
        <div className="flex flex-col gap-2">
          <Label content="Schema Script (JSON)" />
          <textarea
            {...register("schemaScript")}
            rows={8}
            placeholder={`{\n  "@context": "https://schema.org",\n  "@type": "Article",\n  ...\n}`}
            className={`${textareaClass} font-mono text-sm`}
            onChange={() => setSchemaError(null)} // clear error on edit
          />
          {schemaError && <p className="text-sm text-red-500">{schemaError}</p>}
          <p className="text-xs text-gray-400">
            Paste the raw JSON object provided by the SEO team. Do not wrap it
            in{" "}
            <code className="bg-gray-100 px-1 dark:bg-gray-800">
              &lt;script&gt;
            </code>{" "}
            tags.
          </p>
        </div>
      </section>

      {/* MAIN */}
      <section className="flex flex-col gap-4 rounded-lg border border-gray-200 p-5 dark:border-gray-700">
        <h2 className="font-semibold text-gray-700 dark:text-gray-300">
          Post Details
        </h2>
        <div className="flex flex-col gap-2">
          <Label content="Heading" />
          <input
            {...register("heading", { required: "Required" })}
            className={inputClass}
          />
          {errors.heading && (
            <p className="text-sm text-red-500">{errors.heading.message}</p>
          )}
        </div>
        <div className="flex flex-col gap-2">
          <Label content="Slug" />
          <input
            {...register("slug")}
            className={`${inputClass} cursor-not-allowed bg-gray-50`}
          />
        </div>
        <div className="flex flex-col gap-2">
          <Label content="Category" />
          <input
            {...register("category")}
            className={inputClass}
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
            <Label content="Thumbnail" />
            <ImageUploadZone
              preview={thumbnailPreview}
              onClear={() => {
                setThumbnailPreview(null);
                setThumbnail(null);
              }}
              inputId="thumbnail"
              onChange={(e) =>
                handleImageChange({
                  e,
                  setImageError: setThumbnailError,
                  setImageFile: setThumbnail,
                  setPreviewImage: setThumbnailPreview,
                })
              }
              error={thumbnailError}
            />
            <input
              {...register("thumbnailAlt")}
              placeholder="Thumbnail alt text"
              className={inputClass}
            />
          </div>
          <div className="flex flex-col gap-2">
            <Label content="Featured Image" />
            <ImageUploadZone
              preview={featuredImagePreview}
              onClear={() => {
                setFeaturedImagePreview(null);
                setFeaturedImage(null);
              }}
              inputId="featuredImage"
              onChange={(e) =>
                handleImageChange({
                  e,
                  setImageError: setFeaturedImageError,
                  setImageFile: setFeaturedImage,
                  setPreviewImage: setFeaturedImagePreview,
                })
              }
              error={featuredImageError}
            />
            <input
              {...register("featuredImageAlt")}
              placeholder="Featured image alt text"
              className={inputClass}
            />
          </div>
        </div>
      </section>

      {/* ITEMS */}
      <section className="flex flex-col gap-4 rounded-lg border border-gray-200 p-5 dark:border-gray-700">
        <div className="flex flex-col gap-2">
          <Label content="Content under Table of Contents" />
          <TinyEditor setBlogContent={setContent} blogContent={content} />
        </div>
        <div className="flex items-center justify-between">
          <h2 className="font-semibold text-gray-700 dark:text-gray-300">
            Content Items
          </h2>
          <button
            type="button"
            onClick={() => {
              appendItem({ title: "", content: "" });
              setItemContents((prev) => [...prev, ""]);
            }}
            className="flex items-center gap-1 rounded-md bg-blue-950 px-3 py-1.5 text-sm text-white hover:bg-blue-900"
          >
            <FiPlus size={14} /> Add Item
          </button>
        </div>

        {itemFields.map((field, i) => (
          <div
            key={field.id}
            className="flex flex-col gap-3 rounded-md border border-gray-200 p-4 dark:border-gray-700"
          >
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-gray-600 dark:text-gray-400">
                Item {i + 1}
              </span>
              <button
                type="button"
                onClick={() => {
                  removeItem(i);
                  setItemContents((prev) => prev.filter((_, idx) => idx !== i));
                }}
                className="text-red-500 hover:text-red-700"
              >
                <FiTrash2 size={16} />
              </button>
            </div>
            <div className="flex flex-col gap-2">
              <Label content="Title" />
              <input {...register(`items.${i}.title`)} className={inputClass} />
            </div>
            <div className="flex flex-col gap-2">
              <Label content="Content" />
              <TinyEditor
                setBlogContent={(val) => {
                  setItemContents((prev) => {
                    const next = [...prev];
                    next[i] =
                      typeof val === "function" ? val(prev[i] ?? "") : val;
                    return next;
                  });
                }}
                blogContent={editMode ? itemContents[i] : undefined}
              />
            </div>
          </div>
        ))}
      </section>

      {/* FAQ */}
      <section className="flex flex-col gap-4 rounded-lg border border-gray-200 p-5 dark:border-gray-700">
        <div className="flex items-center justify-between">
          <h2 className="font-semibold text-gray-700 dark:text-gray-300">
            FAQ
          </h2>
          <button
            type="button"
            onClick={() => {
              appendFaq({ question: "", answer: "" });
              setFaqAnswers((prev) => [...prev, ""]);
            }}
            className="flex items-center gap-1 rounded-md bg-blue-950 px-3 py-1.5 text-sm text-white hover:bg-blue-900"
          >
            <FiPlus size={14} /> Add FAQ
          </button>
        </div>
        <div className="flex flex-col gap-2">
          <Label content="FAQ Section Title" />
          <input {...register("faqTitle")} className={inputClass} />
        </div>

        {faqFields.map((field, i) => (
          <div
            key={field.id}
            className="flex flex-col gap-3 rounded-md border border-gray-200 p-4 dark:border-gray-700"
          >
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-gray-600 dark:text-gray-400">
                FAQ {i + 1}
              </span>
              <button
                type="button"
                onClick={() => {
                  removeFaq(i);
                  setFaqAnswers((prev) => prev.filter((_, idx) => idx !== i));
                }}
                className="text-red-500 hover:text-red-700"
              >
                <FiTrash2 size={16} />
              </button>
            </div>
            <div className="flex flex-col gap-2">
              <Label content="Question" />
              <input
                {...register(`faqItems.${i}.question`)}
                className={inputClass}
              />
            </div>
            <div className="flex flex-col gap-2">
              <Label content="Answer" />
              <input
                {...register(`faqItems.${i}.answer`)}
                className={inputClass}
              />
            </div>
          </div>
        ))}
      </section>

      <section className="mt-10 flex flex-col gap-6 rounded-md border border-gray-200 p-6 dark:border-gray-700">
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
          CTA Section
        </h2>

        <div className="flex flex-col gap-2">
          <Label content="CTA Title" />
          <input {...register("ctaTitle")} className={inputClass} />
        </div>

        <div className="flex flex-col gap-2">
          <Label content="CTA Description" />
          <input {...register("ctaDescription")} className={inputClass} />
        </div>

        <div className="flex flex-col gap-2">
          <Label content="CTA Button Text" />
          <input {...register("ctaButtonText")} className={inputClass} />
        </div>

        <div className="flex flex-col gap-2">
          <Label content="CTA Button Link" />
          <input {...register("ctaButtonLink")} className={inputClass} />
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

export default AdminBlogForm;
