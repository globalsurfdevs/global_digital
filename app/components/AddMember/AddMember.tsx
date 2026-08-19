"use client";

import React, { useEffect, useState } from "react";
import Label from "../Label/Label";
import { useRouter } from "next/navigation";
import { SubmitHandler, useForm } from "react-hook-form";
import Image from "next/image";
import { useParams } from "next/navigation";
import { toast } from "sonner";
import MetaDataSection from "../MetaData/MetaDataSection";

type Inputs = {
  name: string;
  position: string;
  email: string;
  description: string;
};

const AddMember = ({ editMode }: { editMode?: boolean }) => {
  const [imageError, setImageError] = useState<null | string>(null);
  const [imageFile, setImageFile] = useState<null | File>(null);
  const [previewImage, setPreviewImage] = useState<null | string>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [metaTitle, setMetaTitle] = useState("");
  const [metaDescription, setMetaDescription] = useState("");

  const router = useRouter();

  const { id } = useParams();

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    control,
    formState: { errors },
  } = useForm<Inputs>();

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    setIsSubmitting(true);
    const formData = new FormData();
    formData.append("name", data.name);
    formData.append("position", data.position);
    formData.append("email", data.position);
    formData.append("description", data.description);
    formData.append("metadataTitle", metaTitle);
    formData.append("metadataDesc", metaDescription);

    if (imageFile) {
      formData.append("image", imageFile);
    }

    try {
      const url = editMode ? `/api/team?id=${id}` : `/api/team`;
      const method = "POST";
      const response = await fetch(url, {
        method: method,
        body: formData,
      });
      const data = await response.json();
      console.log(data);

      if (!data.error) {
        toast.success(data.message);
        router.push("/admin/team");
      } else {
        toast.error(data.error);
      }
      // Redirect to news list page
    } catch (error) {
      console.error("Error adding team member:", error);
      toast.error("Failed to add member. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  useEffect(() => {
    const fetchTeamMemberData = async () => {
      try {
        const response = await fetch(`/api/team?id=${id}`);
        if (response.ok) {
          const data = await response.json();
          console.log(data.team[0]);
          if (data.team) {
            setValue("name", data.team[0].name);
            setValue("position", data.team[0].position);
            setValue("email", data.team[0].email);
            setValue("description", data.team[0].description);
            setMetaTitle(data.team[0].metadataTitle);
            setMetaDescription(data.team[0].metadataDesc);

            if (data.team[0].image) {
              setPreviewImage(data.team[0].image as string);
            }
          }
        } else {
          console.error("Failed to about data");
        }
      } catch (error) {
        console.error("Error fetching about data:", error);
      }
    };

    fetchTeamMemberData();
  }, [id]);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];

    if (file) {
      // Validate the image file type
      const validImageTypes = [
        "image/jpeg",
        "image/png",
        "image/gif",
        "image/webp",
      ];
      if (!validImageTypes.includes(file.type)) {
        setImageError("Please select an image file (JPEG, PNG, or GIF)");
        return;
      }

      // Validate the image file size
      const maxSize = 10 * 1024 * 1024; // 10MB
      if (file.size > maxSize) {
        setImageError("Image file size must not exceed 10MB");
        return;
      }

      setImageFile(file);

      setImageError(null); // Reset error message if there was one

      // Generate the preview image
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    } else {
      setPreviewImage(null);
      setImageFile(null);
    }
  };

  return (
    <div className="py-5">
      <div className="lg:gap-x-15 mt-5 grid h-full w-full grid-cols-1 lg:flex lg:h-[500px]">
        <form
          className="col-span-1 flex-col gap-y-5 lg:flex lg:w-3/4"
          onSubmit={handleSubmit(onSubmit)}
        >
          <div className="flex w-full flex-col gap-2">
            <Label content="Name" />
            <input
              type="text"
              {...register("name", { required: "Title is required" })}
              className={
                "w-full rounded-md border-[1px] border-gray-300 bg-transparent py-3 pl-4 text-black focus:outline-none"
              }
            />
            {errors.name && (
              <p className="text-red mt-1 text-sm">{errors.name.message}</p>
            )}
          </div>
          <div className="flex w-full flex-col gap-2">
            <Label content="Position" />
            <input
              type="text"
              {...register("position", { required: "Title is required" })}
              className={
                "w-full rounded-md border-[1px] border-gray-300 bg-transparent py-3 pl-4 text-black focus:outline-none"
              }
            />
            {errors.position && (
              <p className="text-red mt-1 text-sm">{errors.position.message}</p>
            )}
          </div>
          <div className="flex w-full flex-col gap-2">
            <Label content="Email" />
            <input
              type="text"
              {...register("email", { required: "Title is required" })}
              className={
                "w-full rounded-md border-[1px] border-gray-300 bg-transparent py-3 pl-4 text-black focus:outline-none"
              }
            />
            {errors.email && (
              <p className="text-red mt-1 text-sm">{errors.email.message}</p>
            )}
          </div>
          <div className="flex w-full flex-col gap-2">
            <Label content="Descrition" />
            <textarea
              className="w-full rounded-md border-[1px] border-gray-300 bg-transparent py-3 pl-4 text-black focus:outline-none"
              {...register("description", {
                required: "Description is required",
              })}
            ></textarea>
            {errors.description && (
              <p className="text-red mt-1 text-sm">
                {errors.description.message}
              </p>
            )}
          </div>

          <div>
            {
              <button
                type="submit"
                className="inline-flex w-[15%] items-center justify-center rounded-full bg-black px-10 py-2 text-center font-medium text-white hover:bg-opacity-90 lg:px-8 xl:px-10"
              >
                <button type="submit" disabled={isSubmitting}>
                  {isSubmitting ? "Saving" : "Save"}
                </button>
              </button>
            }
          </div>
        </form>

        <div className="col-span-1 items-center justify-center text-center lg:flex lg:h-1/2 lg:w-1/4">
          <div
            className="flex h-full w-full cursor-pointer flex-col items-center justify-center overflow-hidden rounded-lg border-2 border-dashed border-gray-300"
            onDragOver={(e) => e.preventDefault()}
            onClick={() => document?.getElementById("image")?.click()}
          >
            {previewImage ? (
              <div className="relative h-full w-full">
                <Image
                  src={previewImage}
                  alt="Preview"
                  layout="fill"
                  objectFit="cover"
                />
                {editMode && (
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      setPreviewImage(null); // Clear the preview image
                      setImageFile(null);
                    }}
                    className="absolute right-2 top-2 rounded-full bg-red-500 p-1 text-white"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5"
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
                )}
              </div>
            ) : (
              <>
                <svg
                  className="mx-auto h-12 w-12 text-gray-400"
                  stroke="currentColor"
                  fill="none"
                  viewBox="0 0 48 48"
                  aria-hidden="true"
                >
                  <path
                    d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
                <p className="mt-1 text-sm text-gray-600">
                  Drag and drop an image here, or click to select a file
                </p>
              </>
            )}
            <input
              type="file"
              id="image"
              accept="image/*"
              className="hidden"
              onChange={handleImageChange}
            />
          </div>
          {imageError && (
            <p className="mt-1 text-sm text-red-600">{imageError}</p>
          )}
        </div>
      </div>
      <MetaDataSection
        editMode={editMode}
        metaTitle={metaTitle}
        metaDescription={metaDescription}
        setMetaTitle={setMetaTitle}
        setMetaDescription={setMetaDescription}
      />
    </div>
  );
};

export default AddMember;
