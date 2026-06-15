"use client";

import React, { Dispatch, useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { Control, Controller, SubmitHandler, useForm } from "react-hook-form";
import { toast } from "sonner";
import Label from "../Label/Label";
import ReactQuill, { Quill } from "react-quill-new";
import "quill/dist/quill.snow.css";
import Image from "next/image";
import { IoIosClose } from "react-icons/io";
import { PortfolioHighlight } from "@/app/types/PortfolioHighlights";
import { FaPlus } from "react-icons/fa";
import { handleImageChange } from "@/app/helpers/handleImageChange";
import { v4 as uuidv4 } from "uuid";
import { generateAndUploadImage } from "@/app/helpers/generateAndUploadImage";
import { categories as importedCategories } from "@/app/data/categories";
import { MdOutlineSwapHorizontalCircle, MdEdit } from "react-icons/md";
import { checkLogoAndBanner } from "@/app/helpers/checkLogoAndBanner";
import RichEditor from "../RichEditor/RichEditor";
import { CaseStudyInputs } from "@/app/types/CaseStudyInputs";
import { CaseStudyHighlights } from "@/app/types/CaseStudyHighlights";
import { RxCross2 } from "react-icons/rx";
import { generateSlugForCaseStudy } from "@/app/helpers/generateSlug";

type addingHighlights = {
  highlightText: string;
  highlightNumber: string;
  customId: string;
};

const AdminIndiCaseStudy = ({
  editMode,
  selectedSection,
  setSelectedSection,
}: {
  editMode?: boolean;
  selectedSection?: string;
  setSelectedSection?: Dispatch<React.SetStateAction<string>>;
}) => {
  const { companyId } = useParams();
  const router = useRouter();

  const [coverImageError, setCoverImageError] = useState<null | string>(null);
  const [coverImageFile, setCoverImageFile] = useState<null | File>(null);
  const [previewCoverImage, setPreviewCoverImage] = useState<null | string>(
    null,
  );
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [metaTitle, setMetaTitle] = useState("");
  const [metaDescription, setMetaDescription] = useState("");
  const [highlights, setHighlights] = useState<PortfolioHighlight[] | []>([]);
  const [addedHighlights, setAddedHighlights] = useState<addingHighlights[]>(
    [],
  );
  const [highlightNumber, setHighlightNumber] = useState("");
  const [highlightText, setHighlightText] = useState("");

  const [editModal, setEditModal] = useState(false);
  const [editingCategory, setEditingCategory] = useState<{
    _id: string;
    name: string;
    link: string;
  } | null>(null);
  const [pendingDeleteId, setPendingDeleteId] = useState<string | null>(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [categoryModal, setCategoryModal] = useState(false);
  const [category, setCategory] = useState("");
  const [categoryLink, setCategoryLink] = useState("");
  const [refetch, setRefetch] = useState(false);
  const [refetchCategorySection, setRefetchCategorySection] = useState(false);
  const [image1, setImage1] = useState<null | File>(null);
  const [image2, setImage2] = useState<null | File>(null);
  const [image1Preview, setImage1Preview] = useState<null | string>(null);
  const [image2Preview, setImage2Preview] = useState<null | string>(null);
  const [image1Error, setImage1Error] = useState<null | string>(null);
  const [image2Error, setImage2Error] = useState<null | string>(null);
  const [homeImage, setHomeImage] = useState<null | File>(null);
  const [homeImagePreview, setHomeImagePreview] = useState<null | string>(null);
  const [homeImageError, setHomeImageError] = useState<null | string>(null);

  const [logoFile, setLogoFile] = useState<File | null>(null);
  const [previewLogo, setPreviewLogo] = useState<null | string>(null);
  const [logoError, setLogoError] = useState<string | null>(null);

  const [addedCategories, setAddedCategories] = useState<
    { _id: string; name: string; zone: string; link?: string }[]
  >([]);
  const [categories, setCategories] = useState<
    { _id: string; name: string; zone: string; link?: string }[]
  >([]);
  const [selectedHighlightForHome, setSelectedHighlightForHome] = useState<
    string | null
  >(null);
  const [industriesList, setIndustriesList] = useState<
    { _id: string; name: string }[]
  >([]);

  useEffect(() => {
    const fetchIndustries = async () => {
      const res = await fetch("/api/industries");
      const data = await res.json();
      if (!data.error) {
        const allSubs = data.categories.flatMap(
          (cat: {
            name: string;
            subCategories: { _id: string; name: string }[];
          }) =>
            cat.subCategories.map((sub) => ({ _id: sub._id, name: sub.name })),
        );
        setIndustriesList(allSubs);
      }
    };
    fetchIndustries();
  }, []);

  const {
    register,
    handleSubmit,
    setValue,
    control,
    formState: { errors },
    setError,
    watch,
  } = useForm<CaseStudyInputs>();

  const onSubmit: SubmitHandler<CaseStudyInputs> = async (data) => {
    setIsSubmitting(true);
    const formData = new FormData();
    formData.append("heading", data.heading);
    formData.append("sHeading", data.sHeading);
    formData.append("channelsUsed", JSON.stringify(data.channelsUsed));
    formData.append("country", data.country);
    formData.append("story", data.story);
    // formData.append("metadataTitle", metaTitle);
    // formData.append("metadataDesc", metaDescription);
    formData.append("goals", data.goals);
    formData.append("objectives", data.objectives);
    formData.append("challenge", data.challenge);
    formData.append("overcomingChallenges", data.overcomingChallenges);
    formData.append("achievements", data.achievements);
    formData.append("industry", data.industry);
    formData.append("companyName", data.companyName);
    formData.append("slug", data.slug);
    formData.append("metaTitle", data.metaTitle);
    formData.append("metaDescription", data.metaDescription);
    formData.append("section", "case study");
    formData.append("selectedHighlightForHome", selectedHighlightForHome || "");
    formData.append("homeTitle", data.homeTitle);
    formData.append("homeSubTitle", data.homeSubTitle);

    const hightLightIds: string[] = [];
    console.log(highlights);

    highlights.forEach((highlight: PortfolioHighlight) => {
      console.log("id of highlight", highlight.customId);
      formData.append(
        `highlightId${highlight.customId}`,
        highlight.customId.toString(),
      );
      formData.append(`highlightNumber${highlight.customId}`, highlight.number);
      formData.append(`highlightText${highlight.customId}`, highlight.text);

      hightLightIds.push(highlight.customId);
    });

    formData.append("highlightIds", JSON.stringify(hightLightIds));

    formData.append("addedCategories", JSON.stringify(addedCategories));
    formData.append("description", data.description);
    formData.append("tag", data.tag);

    if (!previewCoverImage || !previewLogo) {
      const check = checkLogoAndBanner(
        coverImageFile,
        setCoverImageError,
        logoFile,
        setLogoError,
      );
      if (!check) {
        setIsSubmitting(false);
        return;
      }
    }

    if (data.story == "<p><br></p>" || data.story == "<p>undefined</p>") {
      setError("story", {
        type: "manual",
        message: "Story is required",
      });
      setIsSubmitting(false);
      return;
    }

    if (logoFile) {
      const image = await generateAndUploadImage(logoFile);
      if (image) {
        formData.append("logo", image);
      }
    }

    if (coverImageFile) {
      const image = await generateAndUploadImage(coverImageFile);
      if (image) {
        formData.append("coverImage", image);
      }
    }

    if (image1) {
      const image = await generateAndUploadImage(image1);
      if (image) {
        formData.append("image1", image);
      }
    }

    if (image2) {
      const image = await generateAndUploadImage(image2);
      if (image) {
        formData.append("image2", image);
      }
    }

    if (homeImage) {
      const image = await generateAndUploadImage(homeImage);
      if (image) {
        formData.append("homeImage", image);
      }
    }

    formData.forEach((value, key) => {
      console.log(`${key}:`, value);
    });

    try {
      const url = editMode
        ? `/api/portfolio?id=${companyId}`
        : `/api/portfolio`;
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
        router.push("/admin/portfolio");
      } else {
        toast.error(data.error);
      }
      // Redirect to news list page
    } catch (error) {
      console.error("Error updating case study:", error);
      toast.error("Failed to update case study. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  useEffect(() => {
    const fetchCaseStudyData = async () => {
      try {
        const response = await fetch(`/api/portfolio?id=${companyId}`);
        if (response.ok) {
          const data = await response.json();
          console.log(data.portfolio[0]);
          if (data.portfolio) {
            setValue("heading", data.portfolio.heading);
            setValue("sHeading", data.portfolio.sHeading);
            setValue("industry", data.portfolio.industry);
            setValue("country", data.portfolio.country);
            setValue("channelsUsed", data.portfolio.channelsUsed);
            setValue("story", data.portfolio.story);
            setValue("goals", data.portfolio.goals);
            setValue("objectives", data.portfolio.objectives);
            setValue("challenge", data.portfolio.challenge);
            setValue(
              "overcomingChallenges",
              data.portfolio.overcomingChallenges,
            );
            setValue("achievements", data.portfolio.achievements);
            setValue("description", data.portfolio.description);
            setValue("tag", data.portfolio.tag);
            setValue("companyName", data.portfolio.companyName);
            setValue("slug", data.portfolio.slug);
            setValue("metaTitle", data.portfolio.metaTitle);
            setValue("metaDescription", data.portfolio.metaDescription);
            setValue("homeTitle", data.portfolio.homeTitle);
            setValue("homeSubTitle", data.portfolio.homeSubTitle);

            if (data.portfolio.categories) {
              setAddedCategories(data.portfolio.categories);
            }

            // if (data.caseStudy[0].categories) {

            //     setAddedCategories(data.caseStudy[0].categories)
            // }

            console.log(data.portfolio.coverImage);

            if (data.portfolio.coverImage) {
              setPreviewCoverImage(data.portfolio.coverImage as string);
            }

            if (data.portfolio.image1) {
              setImage1Preview(data.portfolio.image1 as string);
            }

            if (data.portfolio.image2) {
              setImage2Preview(data.portfolio.image2 as string);
            }

            if (data.portfolio.homeImage) {
              setHomeImagePreview(data.portfolio.homeImage as string);
            }

            // if (data.portfolio[0].section2BannerImage) {
            //     setSection2BannerImagePreview(data.portfolio[0].section2BannerImage as string);
            // }

            // if (data.portfolio[0].resultImage1) {
            //     setResultImage1Preview(data.portfolio[0].resultImage1 as string);
            // }

            // if (data.portfolio[0].resultImage2) {
            //     setResultImage2Preview(data.portfolio[0].resultImage2 as string);
            // }

            if (data.portfolio.logo) {
              setPreviewLogo(data.portfolio.logo as string);
            }
          }

          if (data.portfolioHighlights) {
            setHighlights(data.portfolioHighlights);
            data.portfolioHighlights.forEach((item: PortfolioHighlight) => {
              setValue(`highlightText${item.customId}`, item.text);
              setValue(`highlightNumber${item.customId}`, item.number);
              if (item.showInHome) {
                setSelectedHighlightForHome(item.customId);
              }
            });
          }
        } else {
          console.error("Failed to fetch case study data");
        }
      } catch (error) {
        console.error("Error fetching case study data:", error);
      }
    };

    if (editMode) {
      fetchCaseStudyData();
    }
  }, [refetch]);

  // useEffect(() => {
  //     setCategories(importedCategories)
  // }, [])

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const url = `/api/categories`;
        console.log("Here");
        const response = await fetch(url);
        const data = await response.json();
        console.log(data);
        if (!data.error) {
          setCategories(data.categories);
        } else {
          toast.error(data.error);
        }
        // Redirect to news list page
      } catch (error) {
        console.error("Error fetching categories:", error);
        toast.error("Failed to fetch categories. Please try again.");
      }
    };

    fetchCategories();
  }, [refetchCategorySection]);

  const handleInputChange = (
    customId: string,
    field: string,
    value: string,
  ) => {
    setHighlights((prev) =>
      prev.map((item) =>
        item.customId === customId ? { ...item, [field]: value } : item,
      ),
    );
  };

  const handleAddHighlight = async () => {
    try {
      if (highlights.length > 3) {
        toast.error("Maximum of 4 highlights only allowed");
        return;
      }

      setHighlights((prev) => [
        ...prev,
        {
          number: highlightNumber,
          text: highlightText,
          customId: uuidv4(),
          showInHome: false,
          companyId: 0,
        },
      ]);
      setModalOpen(false);
      setHighlightNumber("");
      setHighlightText("");
    } catch (error) {
      console.error("Error adding highlight data:", error);
    }
  };

  const handleDeleteHighlight = async (id?: number | string) => {
    try {
      console.log(id);
      // if (editMode) {
      //     const response = await fetch(`/api/portfolio/highlight?id=${id}`, {
      //         method: "DELETE",
      //     });

      //     if (response.ok) {
      //         const data = await response.json();
      //         if (data.message) {
      //             toast.success(data.message)
      //             setRefetch((prev) => !prev)
      //         }

      //     } else {
      //         console.error("Failed to remove highlight data");
      //     }
      // } else {
      //     setHighlights(highlights.filter((item) => item.customId !== id))

      // }

      // setHighlights(highlights.filter((item) => item.customId !== id))

      setHighlights((highlights) =>
        highlights.map((item) =>
          item.customId === id
            ? { ...item, customId: item.customId + "DELETE" }
            : item,
        ),
      );
    } catch (error) {
      console.error("Error removing highlight data:", error);
    }
  };

  // const [addedCategories, setAddedCategories] = useState<{ id: number; name: string; zone: string; }[]>([])

  const handleSwapItem = (id: string) => {
    const itemInCategory = categories.find((item) => item._id === id);
    const itemInAddedCategory = addedCategories.find((item) => item._id === id);

    if (itemInCategory) {
      setAddedCategories((prev) => [...prev, itemInCategory]);
      setCategories((categories) =>
        categories.filter((item) => item._id !== itemInCategory._id),
      );
    }

    if (itemInAddedCategory) {
      setCategories((prev) => [...prev, itemInAddedCategory]);
      setAddedCategories((addedCategories) =>
        addedCategories.filter((item) => item._id !== itemInAddedCategory._id),
      );
    }
  };

  const handleAddCategory = async () => {
    try {
      if (category.trim() == "" || !category || category == undefined) {
        toast.error("Please provide a category");
        return;
      }

      const formData = new FormData();
      formData.append("category", category);
      formData.append("categoryLink", categoryLink);

      const response = await fetch("/api/categories", {
        method: "POST",
        body: formData,
      });
      if (response.ok) {
        setRefetchCategorySection((prev) => !prev);
        setCategory("");
        setCategoryLink("");
        setCategoryModal(false);
      } else {
        toast.error("Adding category failed");
      }
    } catch (error) {
      console.log("Adding category failed:", error);
    }
  };

  const handleDeleteCategory = (id: string) => {
    setPendingDeleteId(id);
  };

  const confirmDeleteCategory = async () => {
    if (!pendingDeleteId) return;
    try {
      const formData = new FormData();
      formData.append("id", pendingDeleteId);

      const response = await fetch("/api/categories", {
        method: "DELETE",
        body: formData,
      });
      if (response.ok) {
        const data = await response.json();
        toast.success(data.message);
        setRefetchCategorySection((prev) => !prev);
      } else {
        toast.error("Removing category failed");
      }
    } catch (error) {
      console.log("Removing category failed:", error);
    } finally {
      setPendingDeleteId(null);
    }
  };

  const handleEditCategory = async () => {
    try {
      if (!editingCategory || editingCategory.name.trim() === "") {
        toast.error("Please provide a category name");
        return;
      }

      const formData = new FormData();
      formData.append("id", editingCategory._id);
      formData.append("name", editingCategory.name);
      formData.append("link", editingCategory.link);

      const response = await fetch("/api/categories", {
        method: "PATCH",
        body: formData,
      });

      if (response.ok) {
        toast.success("Category updated successfully");
        setRefetchCategorySection((prev) => !prev);
        setEditModal(false);
        setEditingCategory(null);
      } else {
        toast.error("Updating category failed");
      }
    } catch (error) {
      console.log("Updating category failed:", error);
    }
  };

  useEffect(() => {
    setValue("slug", generateSlugForCaseStudy(watch("companyName")));
  }, [watch("companyName")]);

  const modules = {
    htmlEditButton: {
      msg: "Edit the content in HTML format", //Custom message to display in the editor, default: Edit HTML here, when you click "OK" the quill editor's contents will be replaced
      okText: "Ok", // Text to display in the OK button, default: Ok,
      cancelText: "Cancel", // Text to display in the cancel button, default: Cancel
      buttonHTML: "HTML", // Text to display in the toolbar button, default: <>
      buttonTitle: "Show HTML source", // Text to display as the tooltip for the toolbar button, default: Show HTML source
      syntax: false, // Show the HTML with syntax highlighting. Requires highlightjs on window.hljs (similar to Quill itself), default: false
      prependSelector: "div#myelement", // a string used to select where you want to insert the overlayContainer, default: null (appends to body),
      editorModules: {}, // The default mod
    },
  };

  return (
    <div>
      <h1 className="text-3xl">{`${editMode ? "Edit" : "Add"} Case Study Content`}</h1>
      <form onSubmit={handleSubmit(onSubmit)} className="h-full">
        {!editMode && setSelectedSection && (
          <div className="mt-5">
            <div className="w-full min-w-[200px] max-w-sm">
              <div className="relative">
                <select
                  value={selectedSection}
                  onChange={(e) => setSelectedSection(e.target.value)}
                  className="ease w-full cursor-pointer appearance-none rounded border border-slate-200 bg-transparent py-2 pl-3 pr-8 text-sm text-slate-700 shadow-sm transition duration-300 placeholder:text-slate-400 hover:border-slate-400 focus:border-slate-400 focus:shadow-md focus:outline-none"
                >
                  <option value="portfolio">Portfolio</option>
                  <option value="case study">Case Study</option>
                  <option value="case study new">Case Study New</option>
                </select>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.2"
                  stroke="currentColor"
                  className="absolute right-2.5 top-2.5 ml-1 h-5 w-5 text-slate-700"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M8.25 15 12 18.75 15.75 15m-7.5-6L12 5.25 15.75 9"
                  />
                </svg>
              </div>
            </div>
          </div>
        )}

        <div className="mt-5 grid grid-cols-2 gap-10">
          <div
            className="flex h-full w-full cursor-pointer flex-col items-center justify-center overflow-hidden rounded-lg border-2 border-dashed border-gray-300"
            onDragOver={(e) => e.preventDefault()}
            onClick={() => document?.getElementById("coverImage")?.click()}
          >
            {previewCoverImage ? (
              <div className="relative h-full w-full">
                <Image
                  src={previewCoverImage}
                  alt="Preview"
                  layout="fill"
                  objectFit="cover"
                />
                {
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      setPreviewCoverImage(null); // Clear the preview image
                      setCoverImageFile(null);
                      const inputElement = document.getElementById(
                        "coverImage",
                      ) as HTMLInputElement;
                      if (inputElement) {
                        inputElement.value = ""; // Reset the input value
                      }
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
                }
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
              id="coverImage"
              accept="image/*"
              className="hidden"
              onChange={(e) =>
                handleImageChange({
                  e,
                  setImageError: setCoverImageError,
                  setImageFile: setCoverImageFile,
                  setPreviewImage: setPreviewCoverImage,
                })
              }
            />
            {coverImageError && (
              <p className="mt-1 text-sm text-red-600">{coverImageError}</p>
            )}
          </div>

          <div>
            <div className="flex flex-col">
              <div className="flex w-full flex-col gap-2">
                <Label content="Heading" />
                <input
                  type="text"
                  {...register("heading", { required: "Heading is required" })}
                  className={
                    "w-full rounded-md border-[1px] border-gray-300 bg-transparent py-1 pl-4 text-black focus:outline-none"
                  }
                />
                {errors.heading && (
                  <p className="text-red mt-1 text-sm">
                    {errors.heading.message}
                  </p>
                )}
              </div>

              <div className="flex w-full flex-col gap-2">
                <Label content="Sub heading" />
                <input
                  type="text"
                  {...register("sHeading", {
                    required: "Sub heading is required",
                  })}
                  className={
                    "w-full rounded-md border-[1px] border-gray-300 bg-transparent py-1 pl-4 text-black focus:outline-none"
                  }
                />
                {errors.sHeading && (
                  <p className="text-red mt-1 text-sm">
                    {errors.sHeading.message}
                  </p>
                )}
              </div>

              <div className="flex w-full flex-col gap-2">
                <Label content="Industry" />
                <select
                  {...register("industry", {
                    required: "Industry is required",
                  })}
                  className="w-full rounded-md border-[1px] border-gray-300 bg-transparent py-1 pl-4 text-black focus:outline-none"
                >
                  <option value="">Select Industry</option>
                  {industriesList.map((item) => (
                    <option key={item._id} value={item.name}>
                      {item.name}
                    </option>
                  ))}
                </select>
                {/* <input type="text" {...register("industry", { required: "Industry is required" })} className={'rounded-md pl-4 w-full border-gray-300 border-[1px] py-1 text-black bg-transparent focus:outline-none'} /> */}
                {errors.industry && (
                  <p className="text-red mt-1 text-sm">
                    {errors.industry.message}
                  </p>
                )}
              </div>

              <div className="flex w-full flex-col gap-2">
                <Label content="Country" />
                <input
                  type="text"
                  {...register("country", { required: "Country is required" })}
                  className={
                    "w-full rounded-md border-[1px] border-gray-300 bg-transparent py-1 pl-4 text-black focus:outline-none"
                  }
                />
                {errors.country && (
                  <p className="text-red mt-1 text-sm">
                    {errors.country.message}
                  </p>
                )}
              </div>

              <div className="flex w-full flex-col gap-2">
                <Label content="Channels Used" />
                <input
                  type="text"
                  {...register("channelsUsed", {
                    required: "Channels used is required",
                  })}
                  className={
                    "w-full rounded-md border-[1px] border-gray-300 bg-transparent py-1 pl-4 text-black focus:outline-none"
                  }
                />
                {errors.channelsUsed && (
                  <p className="text-red mt-1 text-sm">
                    {errors.channelsUsed.message}
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>

        <div className="mt-5 grid grid-cols-2 gap-10">
          <div className="h-full">
            <div className="flex h-full w-full flex-col gap-2">
              <Label content="Story" />
              <div className="h-full">
                {/* <Controller
                                    name="story"
                                    control={control}
                                    rules={{ required: "Story is required" }}
                                    render={({ field }) => (
                                        <ReactQuill theme="snow" value={field.value} onChange={field.onChange} className="h-full" modules={modules}/>
                                    )}
                                /> */}
                <RichEditor control={control} name="story" />
              </div>
              {errors.story && (
                <p className="mt-1 text-sm text-red-600">
                  {errors.story.message}
                </p>
              )}
            </div>
          </div>

          <div className="h-full">
            <div className="flex items-center gap-2">
              <h3>Highligths</h3>
              <div className="flex size-5 items-center justify-center rounded-full bg-green-500">
                <FaPlus
                  className="text-sm"
                  onClick={() => setModalOpen(true)}
                />
              </div>
            </div>

            <div className="flex h-64 flex-col gap-2 overflow-y-scroll p-1">
              {highlights.length > 0 ? (
                highlights.map((item: CaseStudyHighlights) =>
                  item.customId.length == 36 ? (
                    <div
                      className="relative grid grid-cols-2 gap-5 rounded-xl bg-gray-400 p-3 text-white"
                      key={item.customId}
                    >
                      <div className="absolute right-2 top-1 flex gap-2">
                        {/* <div className='w-5 h-5 bg-yellow-200 rounded-full text-black flex items-center justify-center'>
                        <MdEdit />
                    </div> */}{" "}
                        <div className="flex h-5 w-5 items-center justify-center rounded-full text-black">
                          <input
                            type="checkbox"
                            checked={item.customId == selectedHighlightForHome}
                            name=""
                            id=""
                            className="rounded-full text-red-600"
                            onChange={() =>
                              setSelectedHighlightForHome((prev) =>
                                prev === item.customId ? null : item.customId,
                              )
                            }
                          />
                        </div>
                        <div
                          className="flex h-5 w-5 items-center justify-center rounded-full bg-red-500 text-black"
                          onClick={() => handleDeleteHighlight(item.customId)}
                        >
                          <IoIosClose />
                        </div>
                      </div>

                      <div className="w-full">
                        <label>Number</label>
                        <input
                          type="text"
                          value={item.number}
                          onChange={(e) =>
                            handleInputChange(
                              item.customId,
                              "number",
                              e.target.value,
                            )
                          }
                          className={"w-full rounded-xl pl-2 text-black"}
                        />
                      </div>

                      <div className="w-full">
                        <label>Text</label>
                        <input
                          type="text"
                          value={item.text}
                          onChange={(e) =>
                            handleInputChange(
                              item.customId,
                              "text",
                              e.target.value,
                            )
                          }
                          className="w-full rounded-xl pl-2 text-black"
                        ></input>
                      </div>
                    </div>
                  ) : null,
                )
              ) : (
                <div>No highlights available</div>
              )}
            </div>

            <div className="flex flex-col gap-5">
              <div className="flex w-full flex-col gap-2">
                <Label content="Title for home" />
                <input
                  type="text"
                  {...register("homeTitle", {
                    required: "Home title is required",
                  })}
                  className={
                    "w-full rounded-md border-[1px] border-gray-300 bg-transparent py-1 pl-4 text-black focus:outline-none"
                  }
                />
                {errors.homeTitle && (
                  <p className="text-red mt-1 text-sm">
                    {errors.homeTitle.message}
                  </p>
                )}
              </div>
              <div className="flex w-full flex-col gap-2">
                <Label content="Sub title for home" />
                <input
                  type="text"
                  {...register("homeSubTitle", {
                    required: "Home sub title is required",
                  })}
                  className={
                    "w-full rounded-md border-[1px] border-gray-300 bg-transparent py-1 pl-4 text-black focus:outline-none"
                  }
                />
                {errors.homeTitle && (
                  <p className="text-red mt-1 text-sm">
                    {errors.homeTitle.message}
                  </p>
                )}
              </div>
              <div>
                <div>Image for home</div>
                <div
                  className="flex h-96 w-full cursor-pointer flex-col items-center justify-center overflow-hidden rounded-lg border-2 border-dashed border-gray-300"
                  onDragOver={(e) => e.preventDefault()}
                  onClick={() => document?.getElementById("image1")?.click()}
                >
                  {homeImagePreview ? (
                    <div className="relative h-full w-full">
                      <Image
                        src={homeImagePreview}
                        alt="Preview"
                        layout="fill"
                        objectFit="cover"
                      />
                      {
                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            setHomeImagePreview(null); // Clear the preview image
                            setHomeImage(null);
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
                      }
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
                    id="image1"
                    accept="image/*"
                    className="hidden"
                    onChange={(e) =>
                      handleImageChange({
                        e,
                        setImageError: setHomeImageError,
                        setImageFile: setHomeImage,
                        setPreviewImage: setHomeImagePreview,
                      })
                    }
                  />
                </div>
                {homeImageError && (
                  <p className="mt-1 text-sm text-red-600">{homeImageError}</p>
                )}
              </div>
            </div>
          </div>

          {modalOpen && (
            <div
              className="relative z-10"
              aria-labelledby="modal-title"
              role="dialog"
              aria-modal="true"
            >
              <div
                className="fixed inset-0 bg-gray-500/75 transition-opacity"
                aria-hidden="true"
              ></div>

              <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
                <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
                  <div className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
                    <div className="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
                      {/* <div className="sm:flex sm:items-start">
                                            <div className="mx-auto flex size-12 shrink-0 items-center justify-center rounded-full bg-red-100 sm:mx-0 sm:size-10">
                                                <svg className="size-6 text-red-600" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" aria-hidden="true" data-slot="icon">
                                                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126ZM12 15.75h.007v.008H12v-.008Z" />
                                                </svg>
                                            </div>
                                            <div className="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left">
                                                <h3 className="text-base font-semibold text-gray-900" id="modal-title">Deactivate account</h3>
                                                <div className="mt-2">
                                                    <p className="text-sm text-gray-500">Are you sure you want to deactivate your account? All of your data will be permanently removed. This action cannot be undone.</p>
                                                </div>
                                            </div>
                                        </div> */}

                      <div className="w-full">
                        <label>Number</label>
                        <input
                          type="text"
                          value={highlightNumber}
                          onChange={(e) => setHighlightNumber(e.target.value)}
                          className={"w-full rounded-xl pl-2 text-black"}
                        />
                      </div>

                      <div className="w-full">
                        <label>Text</label>
                        <input
                          type="text"
                          value={highlightText}
                          onChange={(e) => setHighlightText(e.target.value)}
                          className="w-full rounded-xl pl-2 text-black"
                        ></input>
                      </div>
                    </div>
                    <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                      <button
                        type="button"
                        className="inline-flex w-full justify-center rounded-md bg-red-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-500 sm:ml-3 sm:w-auto"
                        onClick={handleAddHighlight}
                      >
                        Submit
                      </button>
                      <button
                        type="button"
                        className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto"
                        onClick={() => setModalOpen(false)}
                      >
                        Cancel
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {categoryModal && (
            <div
              className="relative z-10"
              aria-labelledby="modal-title"
              role="dialog"
              aria-modal="true"
            >
              <div
                className="fixed inset-0 bg-gray-500/75 transition-opacity"
                aria-hidden="true"
              ></div>

              <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
                <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
                  <div className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
                    <div className="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
                      <div className="w-full">
                        <label>Category Name</label>
                        <input
                          type="text"
                          value={category}
                          onChange={(e) => setCategory(e.target.value)}
                          className={"w-full rounded-xl border pl-2 text-black"}
                        />
                      </div>
                      <div className="mt-3 w-full">
                        <label>Category Link</label>
                        <input
                          type="text"
                          value={categoryLink}
                          onChange={(e) => setCategoryLink(e.target.value)}
                          className={"w-full rounded-xl border pl-2 text-black"}
                        />
                      </div>
                    </div>
                    <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                      <button
                        type="button"
                        className="inline-flex w-full justify-center rounded-md bg-red-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-500 sm:ml-3 sm:w-auto"
                        onClick={handleAddCategory}
                      >
                        Submit
                      </button>
                      <button
                        type="button"
                        className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto"
                        onClick={() => setCategoryModal(false)}
                      >
                        Cancel
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {editModal && editingCategory && (
            <div
              className="relative z-10"
              aria-labelledby="modal-title"
              role="dialog"
              aria-modal="true"
            >
              <div
                className="fixed inset-0 bg-gray-500/75 transition-opacity"
                aria-hidden="true"
              ></div>
              <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
                <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
                  <div className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
                    <div className="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
                      <div className="w-full">
                        <label>Category Name</label>
                        <input
                          type="text"
                          value={editingCategory.name}
                          onChange={(e) =>
                            setEditingCategory({
                              ...editingCategory,
                              name: e.target.value,
                            })
                          }
                          className="w-full rounded-xl border pl-2 text-black"
                        />
                      </div>
                      <div className="mt-3 w-full">
                        <label>Category Link</label>
                        <input
                          type="text"
                          value={editingCategory.link}
                          onChange={(e) =>
                            setEditingCategory({
                              ...editingCategory,
                              link: e.target.value,
                            })
                          }
                          className="w-full rounded-xl border pl-2 text-black"
                        />
                      </div>
                    </div>
                    <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                      <button
                        type="button"
                        className="inline-flex w-full justify-center rounded-md bg-blue-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-blue-500 sm:ml-3 sm:w-auto"
                        onClick={handleEditCategory}
                      >
                        Update
                      </button>
                      <button
                        type="button"
                        className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto"
                        onClick={() => {
                          setEditModal(false);
                          setEditingCategory(null);
                        }}
                      >
                        Cancel
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {pendingDeleteId && (
            <div className="relative z-10" role="dialog" aria-modal="true">
              <div
                className="fixed inset-0 bg-gray-500/75 transition-opacity"
                aria-hidden="true"
              ></div>
              <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
                <div className="flex min-h-full items-center justify-center p-4">
                  <div className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:w-full sm:max-w-sm">
                    <div className="bg-white px-6 py-5">
                      <h3 className="text-base font-semibold text-gray-900">
                        Delete Category
                      </h3>
                      <p className="mt-2 text-sm text-gray-500">
                        Are you sure you want to delete this category? This
                        action cannot be undone.
                      </p>
                    </div>
                    <div className="flex justify-end gap-3 bg-gray-50 px-4 py-3">
                      <button
                        type="button"
                        className="rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
                        onClick={() => setPendingDeleteId(null)}
                      >
                        Cancel
                      </button>
                      <button
                        type="button"
                        className="rounded-md bg-red-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-500"
                        onClick={confirmDeleteCategory}
                      >
                        Yes, Delete
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        <div className="mt-15 flex flex-col gap-6 border-t pt-5">
          {/* <h3 className='text-3xl'>Section 2</h3> */}

          <div className="grid grid-cols-2 gap-5">
            <div>
              <div>Image 1</div>
              <div
                className="flex h-96 w-full cursor-pointer flex-col items-center justify-center overflow-hidden rounded-lg border-2 border-dashed border-gray-300"
                onDragOver={(e) => e.preventDefault()}
                onClick={() => document?.getElementById("image1")?.click()}
              >
                {image1Preview ? (
                  <div className="relative h-full w-full">
                    <Image
                      src={image1Preview}
                      alt="Preview"
                      layout="fill"
                      objectFit="cover"
                    />
                    {
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          setImage1Preview(null); // Clear the preview image
                          setImage1(null);
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
                    }
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
                  id="image1"
                  accept="image/*"
                  className="hidden"
                  onChange={(e) =>
                    handleImageChange({
                      e,
                      setImageError: setImage1Error,
                      setImageFile: setImage1,
                      setPreviewImage: setImage1Preview,
                    })
                  }
                />
              </div>
              {image1Error && (
                <p className="mt-1 text-sm text-red-600">{image1Error}</p>
              )}
            </div>

            <div>
              <div>Image 2</div>
              <div
                className="flex h-96 w-full cursor-pointer flex-col items-center justify-center overflow-hidden rounded-lg border-2 border-dashed border-gray-300"
                onDragOver={(e) => e.preventDefault()}
                onClick={() => document?.getElementById("image2")?.click()}
              >
                {image2Preview ? (
                  <div className="relative h-full w-full">
                    <Image
                      src={image2Preview}
                      alt="Preview"
                      layout="fill"
                      objectFit="cover"
                    />
                    {
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          setImage2Preview(null); // Clear the preview image
                          setImage2(null);
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
                    }
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
                  id="image2"
                  accept="image/*"
                  className="hidden"
                  onChange={(e) =>
                    handleImageChange({
                      e,
                      setImageError: setImage2Error,
                      setImageFile: setImage2,
                      setPreviewImage: setImage2Preview,
                    })
                  }
                />
              </div>
              {image2Error && (
                <p className="mt-1 text-sm text-red-600">{image2Error}</p>
              )}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-5">
            <div>
              <Label content="Goals" />
              <div className="h-full">
                {/* <Controller
                                    name="goals"
                                    control={control}

                                    render={({ field }) => (
                                        <ReactQuill theme="snow" value={field.value == "<p>undefined</p>" ? "" : field.value} onChange={field.onChange} formats={['html']} className="h-full" />
                                    )}
                                /> */}
                <RichEditor control={control} name="goals" />
              </div>
            </div>

            <div>
              <Label content="Objectives" />
              <div className="h-full">
                {/* <Controller
                                    name="objectives"
                                    control={control}

                                    render={({ field }) => (
                                        <ReactQuill theme="snow" value={field.value == "<p>undefined</p>" ? "" : field.value} onChange={field.onChange} className="h-full" />
                                    )}
                                /> */}
                <RichEditor control={control} name="objectives" />
              </div>
            </div>

            <div className="mt-15">
              <Label content="Challenge" />
              <div className="h-full">
                {/* <Controller
                                    name="objectives"
                                    control={control}

                                    render={({ field }) => (
                                        <ReactQuill theme="snow" value={field.value == "<p>undefined</p>" ? "" : field.value} onChange={field.onChange} className="h-full" />
                                    )}
                                /> */}
                <RichEditor control={control} name="challenge" />
              </div>
            </div>
          </div>
        </div>

        <div className="mt-20 grid grid-cols-2 gap-5">
          <div className="h-full">
            <div className="flex h-full w-full flex-col gap-2">
              <Label content="Solutions" />
              <div className="h-full">
                {/* <Controller
                                    name="challenge"
                                    control={control}

                                    render={({ field }) => (
                                        <ReactQuill theme="snow" value={field.value == "<p>undefined</p>" ? "" : field.value} onChange={field.onChange} className="h-full" />
                                    )}
                                /> */}
                <RichEditor control={control} name="overcomingChallenges" />
              </div>
            </div>
          </div>

          <div className="h-full">
            <div className="flex h-full w-full flex-col gap-2">
              <Label content="Result" />
              <div className="h-full">
                {/* <Controller
                                    name="solutions"
                                    control={control}

                                    render={({ field }) => (
                                        <ReactQuill theme="snow" value={field.value == "<p>undefined</p>" ? "" : field.value} onChange={field.onChange} className="h-full" />
                                    )}
                                /> */}
                <RichEditor control={control} name="achievements" />
              </div>
            </div>
          </div>
        </div>

        <div className="mt-15 grid grid-cols-2 gap-5">
          <div className="flex w-full flex-col gap-2">
            <div>
              <Label content="Description" />
              <input
                type="text"
                {...register("description", {
                  required: "Description is required",
                })}
                className={
                  "w-full rounded-md border-[1px] border-gray-300 bg-transparent py-1 pl-4 text-black focus:outline-none"
                }
              />
              {errors.description && (
                <p className="text-red mt-1 text-sm">
                  {errors.description.message}
                </p>
              )}
            </div>
          </div>

          <div className="flex w-full flex-col gap-2">
            <Label content="Tag" />
            <input
              type="text"
              {...register("tag", { required: "Tag is required" })}
              className={
                "w-full rounded-md border-[1px] border-gray-300 bg-transparent py-1 pl-4 text-black focus:outline-none"
              }
            />
            {errors.tag && (
              <p className="text-red mt-1 text-sm">{errors.tag.message}</p>
            )}
          </div>

          <div className="flex w-full flex-col gap-2">
            <Label content="Company Name" />
            <input
              type="text"
              {...register("companyName", {
                required: "Company name is required",
              })}
              className={
                "w-full rounded-md border-[1px] border-gray-300 bg-transparent py-1 pl-4 text-black focus:outline-none"
              }
            />
            {errors.companyName && (
              <p className="text-red mt-1 text-sm">
                {errors.companyName.message}
              </p>
            )}
          </div>
        </div>

        {/* <DndContext collisionDetection={closestCorners} onDragEnd={handleDragEnd}>
                            <Droppable categories={categories}/>
                </DndContext> */}

        <div className="mt-14 grid grid-cols-2 gap-5">
          <div>
            <Label content="Added Categories" className="" />
            <div className="flex h-full w-full flex-wrap items-start gap-1 rounded-md border p-4">
              {addedCategories.map((item) => (
                <>
                  <div
                    className="group relative h-fit w-fit cursor-pointer rounded-full border bg-blue-950 px-2 py-1 text-white"
                    onClick={() => handleSwapItem(item._id)}
                  >
                    <span className="group-hover:opacity-50">{item.name}</span>
                    <div className="absolute left-0 top-0 flex h-full w-full items-center justify-center gap-2 rounded-full bg-transparent text-xl opacity-0 group-hover:opacity-100">
                      <MdOutlineSwapHorizontalCircle
                        onClick={() => handleSwapItem(item._id)}
                      />
                      <MdEdit
                        className="text-yellow-400"
                        onClick={(e) => {
                          e.stopPropagation();
                          setEditingCategory({
                            _id: item._id,
                            name: item.name,
                            link: item.link || "",
                          });
                          setEditModal(true);
                        }}
                      />
                    </div>
                  </div>
                </>
              ))}
            </div>
          </div>

          <div>
            <div className="flex items-center gap-1">
              <Label content="Available Categories" className="" />
              <div className="flex size-5 items-center justify-center rounded-full bg-green-500">
                <FaPlus
                  className="text-sm"
                  onClick={() => setCategoryModal(true)}
                />
              </div>
            </div>
            <div className="flex h-full w-full flex-wrap items-start gap-1 rounded-md border p-4">
              {categories
                .filter(
                  (item) =>
                    !addedCategories.some(
                      (addedItem) => addedItem._id === item._id,
                    ),
                )
                .map((item) => (
                  <div
                    key={item._id}
                    className="group relative flex h-fit w-fit min-w-20 cursor-pointer justify-center rounded-full border bg-blue-950 px-2 py-1 text-white"
                  >
                    <span className="group-hover:opacity-50">{item.name}</span>
                    <div className="absolute left-0 top-0 flex h-full w-full items-center justify-center gap-2 rounded-full bg-transparent text-xl opacity-0 group-hover:opacity-100">
                      <MdOutlineSwapHorizontalCircle
                        onClick={() => handleSwapItem(item._id)}
                      />
                      <MdEdit
                        className="text-yellow-400"
                        onClick={() => {
                          setEditingCategory({
                            _id: item._id,
                            name: item.name,
                            link: item.link || "",
                          });
                          setEditModal(true);
                        }}
                      />
                      <RxCross2
                        className="text-red-400"
                        onClick={() => handleDeleteCategory(item._id)}
                      />
                    </div>
                  </div>
                ))}
            </div>
          </div>
        </div>

        <div className="mt-15 h-36 w-1/3">
          <Label content="Logo" />
          <div
            className="flex h-full w-full cursor-pointer flex-col items-center justify-center overflow-hidden rounded-lg border-2 border-dashed border-gray-300"
            onDragOver={(e) => e.preventDefault()}
            onClick={() => document?.getElementById("logo")?.click()}
          >
            {previewLogo ? (
              <div className="relative h-full w-full">
                <img
                  src={previewLogo}
                  alt="Preview"
                  className="h-full w-full object-cover"
                />
                {
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      setPreviewLogo(null); // Clear the preview image
                      setLogoFile(null);
                      const inputElement = document.getElementById(
                        "logo",
                      ) as HTMLInputElement;
                      if (inputElement) {
                        inputElement.value = ""; // Reset the input value
                      }
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
                }
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
              id="logo"
              accept="image/*"
              className="hidden"
              onChange={(e) =>
                handleImageChange({
                  e,
                  setImageError: setLogoError,
                  setImageFile: setLogoFile,
                  setPreviewImage: setPreviewLogo,
                })
              }
            />
          </div>
          {logoError && (
            <p className="mt-1 text-sm text-red-600">{logoError}</p>
          )}
        </div>

        <div className="mt-15 flex w-full flex-col gap-2">
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

        <div className="mt-5 grid grid-cols-2 gap-5">
          <div className="flex w-full flex-col gap-2">
            <Label content="meta-title" />
            <input
              type="text"
              {...register("metaTitle")}
              className={
                "w-full rounded-md border-[1px] border-gray-300 bg-transparent py-1 pl-4 text-black focus:outline-none"
              }
            />
          </div>

          <div className="flex w-full flex-col gap-2">
            <Label content="meta-description" />
            <input
              type="text"
              {...register("metaDescription")}
              className={
                "w-full rounded-md border-[1px] border-gray-300 bg-transparent py-1 pl-4 text-black focus:outline-none"
              }
            />
          </div>
        </div>

        <div className="mt-25 pb-5">
          <div className="inline-flex w-[15%] items-center justify-center rounded-full bg-black px-10 py-2 text-center font-medium text-white hover:bg-opacity-90 lg:px-8 xl:px-10">
            <button type="submit" disabled={isSubmitting}>
              {isSubmitting ? "Saving" : "Save"}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default AdminIndiCaseStudy;
