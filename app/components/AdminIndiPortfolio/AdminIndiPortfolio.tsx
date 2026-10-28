"use client";

import React, { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { toast } from "sonner";
import Label from "../Label/Label";
import ReactQuill, { Quill } from "react-quill-new";
import "quill/dist/quill.snow.css";
import Image from "next/image";
import { IoIosClose } from "react-icons/io";
import { MdEdit } from "react-icons/md";
import { PortfolioHighlight } from "@/app/types/PortfolioHighlights";
import { FaPlus } from "react-icons/fa";
import { handleImageChange } from "@/app/helpers/handleImageChange";
import { v4 as uuidv4 } from "uuid";
import { generateAndUploadImage } from "@/app/helpers/generateAndUploadImage";
import { categories as importedCategories } from "@/app/data/categories";
import { MdOutlineSwapHorizontalCircle } from "react-icons/md";
import { checkLogoAndBanner } from "@/app/helpers/checkLogoAndBanner";
import RichEditor from "../RichEditor/RichEditor";
import { RxCross2 } from "react-icons/rx";
import { generateSlugForPortfolio } from "@/app/helpers/generateSlug";
import AdminIndiCaseStudy from "../AdminIndiCaseStudy/AdminIndiCaseStudy";
import { ImageUploader } from "@/components/ui/image-uploader";
import SeoFields from "@/app/components/common/SeoFields";
import { SeoFormValues } from "@/app/types/seo";
import { ArrowLeft } from "lucide-react";
import {
  AdminLinkButton,
  PageHeader,
  SectionCard,
  ViewLiveLink,
  adminButtonClass,
  portfolioLiveUrl,
} from "@/app/components/AdminUI";

type Inputs = {
  portfolioType: "legacy" | "modern";
  seo: SeoFormValues;
  companyName: string;
  industry: string;
  country: string;
  channelsUsed: { channelName?: string }[];
  story: string;
  goals: string;
  objectives: string;
  challenge: string;
  strategyApproach: string;
  socialMediaImages: string[];
  solutions: string;
  result: string;
  description: string;
  tag: string;
  slug: string;
  metaTitle: string;
  metaDescription: string;
  ogTitle: string;
  ogDescription: string;
  twitterTitle: string;
  twitterDescription: string;
  whatWeDeliveredTitle: string;
  whatWeDeliveredData: string;
  detailsCtaOneTitle: string;
  detailsCtaOneLinkText: string;
  detailsCtaTwoTitle: string;
  detailsCtaTwoButtonText: string;
  modernDetailsCtaOneLink: string;
  modernDetailsCtaTwoLink: string;
  relatedPortfoliosTitle: string;
  websiteLink: string;
  bannerTitle: string;
  video: string;
  videoTitle: string;
  featured: string;
} & {
  [key: `highlightNumber${string}`]: string;
} & {
  [key: `highlightText${string}`]: string;
};

type ModernDeliveredItem = {
  _id: number;
  title: string;
  icn: string;
  dec: string;
  urllink: string[];
};

type addingHighlights = {
  highlightText: string;
  highlightNumber: string;
  customId: string;
};

const AdminIndiPortfolio = ({ editMode }: { editMode?: boolean }) => {
  const { companyId } = useParams();
  const router = useRouter();
  const [imageError, setImageError] = useState<null | string>(null);
  const [imageFile, setImageFile] = useState<null | File>(null);
  const [previewImage, setPreviewImage] = useState<null | string>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  // Slug as last loaded from the database, so "View live" never points at an unsaved slug.
  const [savedSlug, setSavedSlug] = useState("");
  const [metaTitle, setMetaTitle] = useState("");
  const [metaDescription, setMetaDescription] = useState("");
  const [highlights, setHighlights] = useState<PortfolioHighlight[] | []>([]);
  const [addedHighlights, setAddedHighlights] = useState<addingHighlights[]>(
    [],
  );
  const [highlightNumber, setHighlightNumber] = useState("");
  const [highlightText, setHighlightText] = useState("");
  const [channelsAvailable, setChannelsAvailable] = useState<
    { channelName: string }[]
  >([]);

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
  const [section2Image1, setSection2Image1] = useState<null | File>(null);
  const [section2Image2, setSection2Image2] = useState<null | File>(null);
  const [section2Image1Preview, setSection2Image1Preview] = useState<
    null | string
  >(null);
  const [section2Image2Preview, setSection2Image2Preview] = useState<
    null | string
  >(null);
  const [section2Image1Error, setSection2Image1Error] = useState<null | string>(
    null,
  );
  const [section2Image2Error, setSection2Image2Error] = useState<null | string>(
    null,
  );

  const [section2BannerImage, setSection2BannerImage] = useState<null | File>(
    null,
  );
  const [section2BannerImagePreview, setSection2BannerImagePreview] = useState<
    null | string
  >(null);
  const [section2BannerImageError, setSection2BannerImageError] = useState<
    null | string
  >(null);

  const [resultImage1, setResultImage1] = useState<null | File>(null);
  const [resultImage2, setResultImage2] = useState<null | File>(null);
  const [resultImage1Preview, setResultImage1Preview] = useState<null | string>(
    null,
  );
  const [resultImage2Preview, setResultImage2Preview] = useState<null | string>(
    null,
  );
  const [resultImage1Error, setResultImage1Error] = useState<null | string>(
    null,
  );
  const [resultImage2Error, setResultImage2Error] = useState<null | string>(
    null,
  );

  const [videoThumbnail, setVideoThumbnail] = useState<null | File>(null);
  const [videoThumbnailPreview, setVideoThumbnailPreview] = useState<
    null | string
  >(null);
  const [videoThumbnailError, setVideoThumbnailError] = useState<null | string>(
    null,
  );

  const [categories, setCategories] = useState<
    { _id: string; name: string; zone: string; link?: string }[]
  >([]);
  const [logoFile, setLogoFile] = useState<File | null>(null);
  const [previewLogo, setPreviewLogo] = useState<null | string>(null);
  const [logoError, setLogoError] = useState<string | null>(null);

  const [selectedSection, setSelectedSection] = useState("portfolio");
  const [industriesList, setIndustriesList] = useState<
    { _id: string; name: string }[]
  >([]);
  const [previewImages, setPreviewImages] = useState<string[]>([]);
  const [modernDeliveredItems, setModernDeliveredItems] = useState<
    ModernDeliveredItem[]
  >([]);
  const [relatedPortfolioIds, setRelatedPortfolioIds] = useState<string[]>([]);
  const [relatedPortfolioSearch, setRelatedPortfolioSearch] = useState("");
  const [portfolioOptions, setPortfolioOptions] = useState<
    { _id: string; companyName: string; slug?: string }[]
  >([]);

  useEffect(() => {
    const fetchIndustries = async () => {
      const res = await fetch("/api/industries");
      const data = await res.json();
      if (!data.error) {
        // flatten all sub-categories from all categories
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
    watch,
    formState: { errors },
  } = useForm<Inputs>({
    defaultValues: {
      channelsUsed: [{ channelName: "" }],
      portfolioType: "legacy",
      seo: {
        metaTitle: "",
        metaDescription: "",
        ogTitle: "",
        ogDescription: "",
        ogImage: "",
        twitterTitle: "",
        twitterDescription: "",
        twitterImage: "",
        schema: "",
      },
    },
  });

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    // console.log("data:",data)
    let whatWeDeliveredData: unknown[] = [];
    if (data.portfolioType !== "modern" && data.whatWeDeliveredData?.trim()) {
      try {
        const parsedData: unknown = JSON.parse(data.whatWeDeliveredData);
        if (!Array.isArray(parsedData)) {
          throw new Error("What We Delivered data must be a JSON array.");
        }
        whatWeDeliveredData = parsedData;
      } catch (error) {
        toast.error(
          error instanceof Error
            ? error.message
            : "What We Delivered data must be valid JSON.",
        );
        return;
      }
    }

    setIsSubmitting(true);
    const formData = new FormData();
    formData.append("companyName", data.companyName);
    formData.append("portfolioType", data.portfolioType || "legacy");
    formData.append("seo", JSON.stringify(data.seo || {}));
    formData.append(
      "previewImages",
      JSON.stringify(previewImages.filter(Boolean)),
    );
    formData.append(
      "whatWeDeliveredItems",
      JSON.stringify(modernDeliveredItems),
    );
    formData.append("detailsCtaOneText", data.detailsCtaOneLinkText || "");
    formData.append("detailsCtaOneLink", data.modernDetailsCtaOneLink || "");
    formData.append("detailsCtaTwoText", data.detailsCtaTwoButtonText || "");
    formData.append("detailsCtaTwoLink", data.modernDetailsCtaTwoLink || "");
    formData.append("relatedPortfolioIds", JSON.stringify(relatedPortfolioIds));
    formData.append(
      "relatedPortfoliosTitle",
      data.relatedPortfoliosTitle || "",
    );
    formData.append("channelsUsedList", JSON.stringify([]));
    formData.append("industry", data.industry);
    formData.append(
      "channels",
      JSON.stringify(data.portfolioType === "modern" ? [] : data.channelsUsed),
    );
    formData.append("country", data.country);
    formData.append("story", data.story);
    formData.append("metadataTitle", metaTitle);
    formData.append("metadataDesc", metaDescription);
    formData.append("goals", data.goals);
    formData.append("objectives", data.objectives);
    formData.append("challenge", data.challenge);
    formData.append("strategyApproach", data.strategyApproach);
    formData.append(
      "socialMediaImages",
      JSON.stringify(data.socialMediaImages),
    );
    formData.append("solutions", data.solutions);
    formData.append("result", data.result);
    formData.append("slug", data.slug);
    formData.append("websiteLink", data.websiteLink);
    formData.append("bannerTitle", data.bannerTitle);
    formData.append("video", data.video);
    formData.append("videoTitle", data.videoTitle);
    formData.append("featured", data.featured);

    const hightLightIds: string[] = [];

    highlights.forEach((highlight: PortfolioHighlight) => {
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
    formData.append("metaTitle", data.metaTitle || "");
    formData.append("metaDescription", data.metaDescription || "");
    formData.append("ogTitle", data.ogTitle || "");
    formData.append("ogDescription", data.ogDescription || "");
    formData.append("twitterTitle", data.twitterTitle || "");
    formData.append("twitterDescription", data.twitterDescription || "");
    formData.append("whatWeDeliveredTitle", data.whatWeDeliveredTitle || "");
    formData.append("whatWeDeliveredData", JSON.stringify(whatWeDeliveredData));
    formData.append("detailsCtaOneTitle", data.detailsCtaOneTitle || "");
    formData.append("detailsCtaOneLinkText", data.detailsCtaOneLinkText || "");
    formData.append("detailsCtaTwoTitle", data.detailsCtaTwoTitle || "");
    formData.append(
      "detailsCtaTwoButtonText",
      data.detailsCtaTwoButtonText || "",
    );
    formData.append("section", selectedSection);

    if (!previewImage || !previewLogo) {
      const check = checkLogoAndBanner(
        imageFile,
        setImageError,
        logoFile,
        setLogoError,
      );
      if (!check) {
        setIsSubmitting(false);
        return;
      }
    }

    if (logoFile) {
      const image = await generateAndUploadImage(logoFile);
      if (image) {
        formData.append("logo", image);
      }
    }

    if (imageFile) {
      const image = await generateAndUploadImage(imageFile);
      if (image) {
        formData.append("image", image);
      }
    }

    if (section2Image1) {
      const image = await generateAndUploadImage(section2Image1);
      if (image) {
        formData.append("section2Image1", image);
      }
    }

    if (section2Image2) {
      const image = await generateAndUploadImage(section2Image2);
      if (image) {
        formData.append("section2Image2", image);
      }
    }

    if (section2BannerImage) {
      const image = await generateAndUploadImage(section2BannerImage);
      if (image) {
        formData.append("section2BannerImage", image);
      }
    }

    if (resultImage1) {
      formData.append("resultImage1", resultImage1);
    }

    if (resultImage2) {
      formData.append("resultImage2", resultImage2);
    }

    if (videoThumbnail) {
      formData.append("videoThumbnail", videoThumbnail);
    }

    formData.forEach((value, key) => {
      // console.log(`${key}:`, value);
    });

    try {
      const url = editMode
        ? `/api/portfolio?id=${companyId}`
        : `/api/portfolio`;
      const method = "POST";

      const response = await fetch(url, {
        method: method,
        body: formData,
      });
      const data = await response.json();

      if (!data.error) {
        toast.success(data.message);
        router.push("/admin/portfolio");
      } else {
        toast.error(data.error);
      }
      // Redirect to news list page
    } catch (error) {
      console.error("Error updating about:", error);
      toast.error("Failed to update about. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  useEffect(() => {
    const fetchChannels = async () => {
      try {
        const response = await fetch(`/api/portfolio/channels`);
        const data = await response.json();

        setChannelsAvailable(data.data);
      } catch (error) {
        console.error("Error fetching channels:", error);
      }
    };
    fetchChannels();
  }, []);

  useEffect(() => {
    const fetchPortfolioOptions = async () => {
      try {
        const response = await fetch("/api/portfolio");
        const data = await response.json();
        if (!response.ok || data.error) {
          throw new Error(data.error || "Failed to fetch portfolios.");
        }
        setPortfolioOptions(
          (data.portfolio || []).map(
            (portfolio: {
              _id: string;
              companyName: string;
              slug?: string;
            }) => ({
              _id: portfolio._id,
              companyName: portfolio.companyName,
              slug: portfolio.slug,
            }),
          ),
        );
      } catch (error) {
        console.error("Error fetching related portfolio options:", error);
        toast.error(
          "Failed to load portfolios for related portfolio selection.",
        );
      }
    };

    fetchPortfolioOptions();
  }, []);

  useEffect(() => {
    const fetchPortfolioData = async () => {
      try {
        const response = await fetch(`/api/portfolio?id=${companyId}`);
        if (response.ok) {
          const data = await response.json();

          if (data.portfolio) {
            setValue("companyName", data.portfolio.companyName);
            const inferredPortfolioType =
              data.portfolio.portfolioType ||
              (["innovo-group", "sobha-constructions-v2"].includes(
                data.portfolio.slug,
              )
                ? "modern"
                : "legacy");
            setValue("portfolioType", inferredPortfolioType);
            const seo = data.portfolio.seo || {};
            setValue(
              "seo.metaTitle",
              seo.metaTitle || data.portfolio.metaTitle || "",
            );
            setValue(
              "seo.metaDescription",
              seo.metaDescription || data.portfolio.metaDescription || "",
            );
            setValue(
              "seo.ogTitle",
              seo.ogTitle || data.portfolio.ogTitle || "",
            );
            setValue(
              "seo.ogDescription",
              seo.ogDescription || data.portfolio.ogDescription || "",
            );
            setValue("seo.ogImage", seo.ogImage || "");
            setValue(
              "seo.twitterTitle",
              seo.twitterTitle || data.portfolio.twitterTitle || "",
            );
            setValue(
              "seo.twitterDescription",
              seo.twitterDescription || data.portfolio.twitterDescription || "",
            );
            setValue("seo.twitterImage", seo.twitterImage || "");
            setValue("seo.schema", seo.schema || "");
            setPreviewImages(data.portfolio.previewImage?.images || []);
            const deliveredItems =
              data.portfolio.whatWeDeliveredSec?.data?.length > 0
                ? data.portfolio.whatWeDeliveredSec.data
                : data.portfolio.whatWeDeliveredData || [];
            setModernDeliveredItems(
              Array.isArray(deliveredItems)
                ? deliveredItems.map((item, index) => ({
                    _id: Number(item._id ?? item.id ?? index + 1),
                    title: item.title || "",
                    icn: item.icn || "",
                    dec: item.dec || "",
                    urllink: Array.isArray(item.urllink)
                      ? item.urllink
                      : item.urllink
                        ? [item.urllink]
                        : [],
                  }))
                : [],
            );
            const relatedPortfolios =
              data.portfolio.relatedPortfolios?.portfolio || [];
            setRelatedPortfolioIds(
              relatedPortfolios.map((portfolio: string | { _id?: string }) =>
                String(
                  typeof portfolio === "string"
                    ? portfolio
                    : (portfolio._id ?? portfolio),
                ),
              ),
            );
            setValue(
              "relatedPortfoliosTitle",
              data.portfolio.relatedPortfolios?.title || "",
            );
            setValue("industry", data.portfolio.industry);
            setValue("country", data.portfolio.country);
            if (data.portfolio.channels) {
              setValue("channelsUsed", data.portfolio.channels);
              setChannelsUsed(data.portfolio.channels);
            }

            setValue("story", data.portfolio.story);
            setValue("goals", data.portfolio.goals);
            setValue("objectives", data.portfolio.objectives);
            setValue("challenge", data.portfolio.challenge);
            setValue("solutions", data.portfolio.solutions);
            setValue("strategyApproach", data.portfolio.strategyApproach);

            setValue("result", data.portfolio.result);
            setValue("description", data.portfolio.description);
            setValue("tag", data.portfolio.tag);
            setValue("slug", data.portfolio.slug);
            setSavedSlug(data.portfolio.slug || "");
            setValue("metaTitle", data.portfolio.metaTitle);
            setValue("metaDescription", data.portfolio.metaDescription);
            setValue("ogTitle", data.portfolio.ogTitle || "");
            setValue("ogDescription", data.portfolio.ogDescription || "");
            setValue("twitterTitle", data.portfolio.twitterTitle || "");
            setValue(
              "twitterDescription",
              data.portfolio.twitterDescription || "",
            );
            setValue(
              "whatWeDeliveredTitle",
              data.portfolio.whatWeDeliveredSec?.title ||
                data.portfolio.whatWeDeliveredTitle ||
                "",
            );
            setValue(
              "whatWeDeliveredData",
              data.portfolio.whatWeDeliveredData
                ? JSON.stringify(data.portfolio.whatWeDeliveredData, null, 2)
                : "",
            );
            setValue(
              "detailsCtaOneTitle",
              data.portfolio.detailsCtaOne?.title ||
                data.portfolio.detailsCtaOneTitle ||
                "",
            );
            setValue(
              "detailsCtaOneLinkText",
              data.portfolio.detailsCtaOne?.ctaText ||
                data.portfolio.detailsCtaOneLinkText ||
                "",
            );
            setValue(
              "modernDetailsCtaOneLink",
              data.portfolio.detailsCtaOne?.ctaLink || "",
            );
            setValue(
              "detailsCtaTwoTitle",
              data.portfolio.detailsCtaTwo?.title ||
                data.portfolio.detailsCtaTwoTitle ||
                "",
            );
            setValue(
              "detailsCtaTwoButtonText",
              data.portfolio.detailsCtaTwo?.ctaText ||
                data.portfolio.detailsCtaTwoButtonText ||
                "",
            );
            setValue(
              "modernDetailsCtaTwoLink",
              data.portfolio.detailsCtaTwo?.ctaLink || "",
            );
            setValue("bannerTitle", data.portfolio.bannerTitle);
            setValue("websiteLink", data.portfolio.websiteLink);
            setValue("video", data.portfolio.video);
            setValue("videoTitle", data.portfolio.videoTitle);
            setImageUrls(data.portfolio.socialMediaImages || []);
            setValue("socialMediaImages", data.portfolio.socialMediaImages);
            setValue("featured", data.portfolio.featured?.toString());

            if (data.portfolio.section == "portfolio") {
              setSelectedSection("portfolio");
            } else if (data.portfolio.section == "case study") {
              setSelectedSection("case study");
            } else if (data.portfolio.section == "case study new") {
              setSelectedSection("case study new");
            }

            if (data.portfolio.categories) {
              setAddedCategories(data.portfolio.categories);
            }

            if (data.portfolio.bannerImage) {
              setPreviewImage(data.portfolio.bannerImage as string);
            }

            if (data.portfolio.section2Image1) {
              setSection2Image1Preview(data.portfolio.section2Image1 as string);
            }

            if (data.portfolio.section2Image2) {
              setSection2Image2Preview(data.portfolio.section2Image2 as string);
            }

            if (data.portfolio.section2BannerImage) {
              setSection2BannerImagePreview(
                data.portfolio.section2BannerImage as string,
              );
            }

            if (data.portfolio.resultImage1) {
              setResultImage1Preview(data.portfolio.resultImage1 as string);
            }

            if (data.portfolio.resultImage2) {
              setResultImage2Preview(data.portfolio.resultImage2 as string);
            }

            if (data.portfolio.videoThumbnail) {
              setVideoThumbnailPreview(data.portfolio.videoThumbnail as string);
            }

            if (data.portfolio.logo) {
              setPreviewLogo(data.portfolio.logo as string);
            }
          }

          if (data.portfolioHighlights) {
            setHighlights(data.portfolioHighlights);
            data.portfolioHighlights.forEach((item: PortfolioHighlight) => {
              setValue(`highlightText${item.customId}`, item.text);
              setValue(`highlightNumber${item.customId}`, item.number);
            });
          }
        } else {
          console.error("Failed to fetch portfolio data");
        }
      } catch (error) {
        console.error("Error fetching portfolio data:", error);
      }
    };

    if (editMode) {
      fetchPortfolioData();
    }
  }, [refetch]);

  useEffect(() => {
    setValue("slug", generateSlugForPortfolio(watch("companyName")));
  }, [watch("companyName")]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const url = `/api/categories`;

        const response = await fetch(url);
        const data = await response.json();
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

  const [addedCategories, setAddedCategories] = useState<
    { _id: string; name: string; zone: string; link?: string }[]
  >([]);

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

  const [channelsUsed, setChannelsUsed] = useState<{ channelName: string }[]>(
    [],
  );
  const handleChangeInChannel = (index: number) => {
    const channel = channelsAvailable[index];

    const alreadyExists = channelsUsed.find(
      (item: { channelName: string }) =>
        item.channelName === channel.channelName,
    );

    if (alreadyExists) {
      const updated = channelsUsed.filter(
        (item: { channelName: string }) =>
          item.channelName !== channel.channelName,
      );
      setChannelsUsed(updated);
      setValue("channelsUsed", updated); // ✅ use updated
    } else {
      const updated = [...channelsUsed, channel];
      setChannelsUsed(updated);
      setValue("channelsUsed", updated); // ✅ use updated
    }
  };

  const [imageUrls, setImageUrls] = useState<string[]>([]);
  const handleImageUpload = (uploadedUrl: string) => {
    setImageUrls((prev) => {
      const updated = [...prev, uploadedUrl];
      setValue("socialMediaImages", updated);
      return updated;
    });
  };

  const handleRemoveImage = (indexToRemove: number) => {
    setImageUrls((prev) => {
      const updated = prev.filter((_, index) => index !== indexToRemove);
      setValue("socialMediaImages", updated);
      return updated;
    });
  };

  if (selectedSection == "portfolio" || selectedSection == "case study new") {
    return (
      <div className="flex flex-col gap-6">
        <PageHeader
          title={`${editMode ? "Edit" : "Add"} ${selectedSection === "case study new" ? "Case Study" : "Portfolio"}`}
          description={
            editMode
              ? watch("companyName")
              : "Fill in the sections below, then click Save."
          }
          actions={
            <>
              <AdminLinkButton
                href="/admin/portfolio"
                variant="secondary"
                icon={<ArrowLeft className="size-4" />}
              >
                Back to list
              </AdminLinkButton>
              {editMode && savedSlug && (
                <ViewLiveLink
                  showLabel
                  href={portfolioLiveUrl({
                    section: selectedSection,
                    slug: savedSlug,
                  })}
                  className="h-10 border border-slate-300 px-4 text-sm"
                />
              )}
            </>
          }
        />
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex h-full flex-col gap-6"
        >
          {(!editMode || selectedSection === "portfolio") && (
            <SectionCard
              title="Page setup"
              description="Content type and page design."
            >
              <div className="flex flex-col gap-5 sm:flex-row">
                {!editMode && (
                  <div>
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

                {selectedSection === "portfolio" && (
                  <div className="max-w-sm">
                    <Label content="Portfolio page design" />
                    <select
                      {...register("portfolioType")}
                      className="w-full rounded-md border-[1px] border-gray-300 bg-transparent py-2 pl-3 text-black focus:outline-none"
                    >
                      <option value="legacy">Legacy portfolio page</option>
                      <option value="modern">Modern portfolio page</option>
                    </select>
                  </div>
                )}
              </div>
            </SectionCard>
          )}

          <SectionCard title="Banner & company details">
            <div className="grid grid-cols-2 gap-10">
              <div className="flex flex-col gap-2">
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
                      {
                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            setPreviewImage(null); // Clear the preview image
                            setImageFile(null);
                            const inputElement = document.getElementById(
                              "image",
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
                    id="image"
                    accept="image/*"
                    className="hidden"
                    onChange={(e) =>
                      handleImageChange({
                        e,
                        setImageError,
                        setImageFile,
                        setPreviewImage,
                      })
                    }
                  />
                  {imageError && (
                    <p className="mt-1 text-sm text-red-600">{imageError}</p>
                  )}
                </div>

                <div>
                  <div className="flex w-full flex-col gap-2">
                    <Label content="Banner Title" />
                    <input
                      type="text"
                      {...register("bannerTitle")}
                      className={
                        "w-full rounded-md border-[1px] border-gray-300 bg-transparent py-1 pl-4 text-black focus:outline-none"
                      }
                    />
                    {/* {errors.bannerTitle && <p className='mt-1 text-sm text-red'>{errors.bannerTitle.message}</p>} */}
                  </div>
                </div>

                <div>
                  <div className="flex w-full flex-col gap-2">
                    <Label content="Webiste Link" />
                    <input
                      type="text"
                      {...register("websiteLink")}
                      className={
                        "w-full rounded-md border-[1px] border-gray-300 bg-transparent py-1 pl-4 text-black focus:outline-none"
                      }
                    />
                    {/* {errors.websiteLink && <p className='mt-1 text-sm text-red'>{errors.websiteLink.message}</p>} */}
                  </div>
                </div>
              </div>

              <div>
                <div className="flex flex-col gap-2">
                  <div className="flex w-full flex-col gap-2">
                    <Label content="Company Name" />
                    <input
                      type="text"
                      {...register("companyName", {
                        required:
                          watch("portfolioType") === "modern"
                            ? false
                            : "Company name is required",
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

                  <div className="flex w-full flex-col gap-2">
                    <Label content="Industry" />
                    <select
                      {...register("industry", {
                        required:
                          watch("portfolioType") === "modern"
                            ? false
                            : "Industry is required",
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
                      {...register("country", {
                        required:
                          watch("portfolioType") === "modern"
                            ? false
                            : "Country is required",
                      })}
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

                  {/* <div className='w-full flex flex-col gap-2'>
                                    <Label content='Channels Used' />
                                    <input type="text" {...register("channelsUsed", { required: "Channels used is required" })} className={'rounded-md pl-4 w-full border-gray-300 border-[1px] py-1 text-black bg-transparent focus:outline-none'} />
                                    {errors.channelsUsed && <p className='mt-1 text-sm text-red'>{errors.channelsUsed.message}</p>}
                                </div> */}

                  {watch("portfolioType") !== "modern" && (
                    <div className="mt-1 flex w-full flex-col gap-1">
                      <Label content="Channels Used" />
                      <div className="flex h-[300px] flex-wrap gap-2 overflow-y-auto border p-5">
                        {channelsAvailable.map((channel, index) => (
                          <div key={index} className="relative">
                            <div
                              className={`absolute -top-2 right-1 h-4 w-4 cursor-pointer rounded-full border-2 ${channelsUsed.find((item) => item.channelName === channel.channelName) ? "bg-green-500" : "bg-gray-300"}`}
                              onClick={() => handleChangeInChannel(index)}
                            ></div>
                            <span className="rounded-md border border-gray-300 px-6 py-3">
                              {channel.channelName}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </SectionCard>

          <SectionCard title="Story & highlights">
            <div className="grid grid-cols-2 gap-10">
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
                    <RichEditor
                      control={control}
                      name="story"
                      required={watch("portfolioType") !== "modern"}
                    />
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
                  <h3>Highlights</h3>
                  <div className="flex size-5 items-center justify-center rounded-full bg-green-500">
                    <FaPlus
                      className="text-sm"
                      onClick={() => setModalOpen(true)}
                    />
                  </div>
                </div>

                <div className="flex h-64 flex-col gap-2 overflow-y-scroll p-1">
                  {highlights.length > 0 ? (
                    highlights.map((item: PortfolioHighlight) =>
                      item.customId.length == 36 ? (
                        <div
                          className="relative grid grid-cols-2 gap-5 rounded-xl bg-gray-400 p-3 text-white"
                          key={item.customId}
                        >
                          <div className="absolute right-2 top-1 flex gap-2">
                            {/* <div className='w-5 h-5 bg-yellow-200 rounded-full text-black flex items-center justify-center'>
                            <MdEdit />
                        </div> */}
                            <div
                              className="flex h-5 w-5 items-center justify-center rounded-full bg-red-500 text-black"
                              onClick={() =>
                                handleDeleteHighlight(item.customId)
                              }
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
                              onChange={(e) =>
                                setHighlightNumber(e.target.value)
                              }
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
                              className={
                                "w-full rounded-xl border pl-2 text-black"
                              }
                            />
                          </div>

                          <div className="w-full">
                            <label>Category Link</label>
                            <input
                              type="text"
                              value={categoryLink}
                              onChange={(e) => setCategoryLink(e.target.value)}
                              className={
                                "w-full rounded-xl border pl-2 text-black"
                              }
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
          </SectionCard>

          <SectionCard
            title="Section 2"
            description="Images, goals, objectives and banner."
          >
            <div className="flex flex-col gap-6">
              <div className="grid grid-cols-2 gap-5">
                <div className="flex flex-col gap-2">
                  <div>Section 2 - Image 1</div>
                  <div
                    className="flex h-96 w-full cursor-pointer flex-col items-center justify-center overflow-hidden rounded-lg border-2 border-dashed border-gray-300"
                    onDragOver={(e) => e.preventDefault()}
                    onClick={() => document?.getElementById("image1")?.click()}
                  >
                    {section2Image1Preview ? (
                      <div className="relative h-full w-full">
                        <Image
                          src={section2Image1Preview}
                          alt="Preview"
                          layout="fill"
                          objectFit="cover"
                        />
                        {
                          <button
                            type="button"
                            onClick={(e) => {
                              e.stopPropagation();
                              setSection2Image1Preview(null); // Clear the preview image
                              setSection2Image1(null);
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
                          setImageError: setSection2Image1Error,
                          setImageFile: setSection2Image1,
                          setPreviewImage: setSection2Image1Preview,
                        })
                      }
                    />
                  </div>
                  {section2Image1Error && (
                    <p className="mt-1 text-sm text-red-600">{imageError}</p>
                  )}
                </div>

                <div className="flex flex-col gap-2">
                  <div>Section 2 - Image 2</div>
                  <div
                    className="flex h-96 w-full cursor-pointer flex-col items-center justify-center overflow-hidden rounded-lg border-2 border-dashed border-gray-300"
                    onDragOver={(e) => e.preventDefault()}
                    onClick={() => document?.getElementById("image2")?.click()}
                  >
                    {section2Image2Preview ? (
                      <div className="relative h-full w-full">
                        <Image
                          src={section2Image2Preview}
                          alt="Preview"
                          layout="fill"
                          objectFit="cover"
                        />
                        {
                          <button
                            type="button"
                            onClick={(e) => {
                              e.stopPropagation();
                              setSection2Image2Preview(null); // Clear the preview image
                              setSection2Image2(null);
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
                          setImageError: setSection2Image2Error,
                          setImageFile: setSection2Image2,
                          setPreviewImage: setSection2Image2Preview,
                        })
                      }
                    />
                  </div>
                  {section2Image2Error && (
                    <p className="mt-1 text-sm text-red-600">
                      {section2Image2Error}
                    </p>
                  )}
                </div>
              </div>

              <div className="grid grid-cols-2 gap-5">
                <div className="flex flex-col gap-2">
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

                <div className="flex flex-col gap-2">
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
              </div>

              <div className="mt-4">
                <div className="flex flex-col gap-2">
                  <div>Section 2 - Banner Image</div>
                  <div
                    className="flex h-96 w-full cursor-pointer flex-col items-center justify-center overflow-hidden rounded-lg border-2 border-dashed border-gray-300"
                    onDragOver={(e) => e.preventDefault()}
                    onClick={() => document?.getElementById("banner")?.click()}
                  >
                    {section2BannerImagePreview ? (
                      <div className="relative h-full w-full">
                        <Image
                          src={section2BannerImagePreview}
                          alt="Preview"
                          layout="fill"
                          objectFit="cover"
                        />
                        {
                          <button
                            type="button"
                            onClick={(e) => {
                              e.stopPropagation();
                              setSection2BannerImagePreview(null); // Clear the preview image
                              setSection2BannerImage(null);
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
                      id="banner"
                      accept="image/*"
                      className="hidden"
                      onChange={(e) =>
                        handleImageChange({
                          e,
                          setImageError: setSection2BannerImageError,
                          setImageFile: setSection2BannerImage,
                          setPreviewImage: setSection2BannerImagePreview,
                        })
                      }
                    />
                  </div>
                  {section2BannerImageError && (
                    <p className="mt-1 text-sm text-red-600">
                      {section2BannerImageError}
                    </p>
                  )}
                </div>
              </div>
            </div>
          </SectionCard>

          <SectionCard title="Challenge, solutions & strategy">
            <div className="grid grid-cols-2 gap-5">
              <div className="h-full">
                <div className="flex h-full w-full flex-col gap-2">
                  <Label content="Challenge" />
                  <div className="h-full">
                    {/* <Controller
                                        name="challenge"
                                        control={control}
    
                                        render={({ field }) => (
                                            <ReactQuill theme="snow" value={field.value == "<p>undefined</p>" ? "" : field.value} onChange={field.onChange} className="h-full" />
                                        )}
                                    /> */}
                    <RichEditor control={control} name="challenge" />
                  </div>
                </div>
              </div>

              <div className="h-full">
                <div className="flex h-full w-full flex-col gap-2">
                  <Label content="Solutions" />
                  <div className="h-full">
                    {/* <Controller
                                        name="solutions"
                                        control={control}
    
                                        render={({ field }) => (
                                            <ReactQuill theme="snow" value={field.value == "<p>undefined</p>" ? "" : field.value} onChange={field.onChange} className="h-full" />
                                        )}
                                    /> */}
                    <RichEditor control={control} name="solutions" />
                  </div>
                </div>
              </div>

              {selectedSection === "case study new" && (
                <div className="my-12 h-full">
                  <div className="flex h-full w-full flex-col gap-2">
                    <Label content="Strategy & Approach" />
                    <div className="h-full">
                      {/* <Controller
                                        name="solutions"
                                        control={control}
    
                                        render={({ field }) => (
                                            <ReactQuill theme="snow" value={field.value == "<p>undefined</p>" ? "" : field.value} onChange={field.onChange} className="h-full" />
                                        )}
                                    /> */}
                      <RichEditor control={control} name="strategyApproach" />
                    </div>
                  </div>
                </div>
              )}
            </div>
          </SectionCard>

          {selectedSection === "case study new" && (
            <SectionCard title="Social media">
              <div>
                <div className="flex items-center justify-between">
                  <Label content="Social Media" />
                </div>
                <div className="mt-2">
                  <ImageUploader
                    onChange={handleImageUpload}
                    deleteAfterUpload={true}
                    multiple={true}
                  />
                </div>

                <div className="mt-4 grid grid-cols-3 gap-4">
                  {imageUrls.map((url, index) => (
                    <div key={index} className="relative h-40">
                      <Image
                        src={url}
                        alt={`Uploaded image ${index + 1}`}
                        className="h-full w-full rounded-lg object-cover"
                        width={100}
                        height={100}
                      />
                      <button
                        type="button"
                        onClick={() => handleRemoveImage(index)}
                        className="absolute right-2 top-2 rounded-full bg-red-500 p-1 text-white hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500"
                      >
                        ×
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </SectionCard>
          )}

          <SectionCard title="Video">
            <div className="flex flex-col gap-3">
              <div className="flex w-full flex-col gap-2">
                <Label content="Video" />
                <input
                  type="text"
                  {...register("video")}
                  className={
                    "w-full rounded-md border-[1px] border-gray-300 bg-transparent py-1 pl-4 text-black focus:outline-none"
                  }
                />
                {/* {errors.bannerTitle && <p className='mt-1 text-sm text-red'>{errors.bannerTitle.message}</p>} */}
              </div>
              <div className="flex w-full flex-col gap-2">
                <Label content="Video Title" />
                <input
                  type="text"
                  {...register("videoTitle")}
                  className={
                    "w-full rounded-md border-[1px] border-gray-300 bg-transparent py-1 pl-4 text-black focus:outline-none"
                  }
                />
                {/* {errors.bannerTitle && <p className='mt-1 text-sm text-red'>{errors.bannerTitle.message}</p>} */}
              </div>
              <div>
                <Label content="Video Thumbnail" />
                <div
                  className="mt-2 flex h-[300px] w-full cursor-pointer flex-col items-center justify-center overflow-hidden rounded-lg border-2 border-dashed border-gray-300"
                  onDragOver={(e) => e.preventDefault()}
                  onClick={() =>
                    document?.getElementById("videothumbnail")?.click()
                  }
                >
                  {videoThumbnailPreview ? (
                    <div className="relative h-full w-full">
                      <Image
                        src={videoThumbnailPreview}
                        alt="Preview"
                        layout="fill"
                        objectFit="cover"
                      />
                      {
                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            setVideoThumbnailPreview(null); // Clear the preview image
                            setVideoThumbnail(null);
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
                    id="videothumbnail"
                    accept="image/*"
                    className="hidden"
                    onChange={(e) =>
                      handleImageChange({
                        e,
                        setImageError: setVideoThumbnailError,
                        setImageFile: setVideoThumbnail,
                        setPreviewImage: setVideoThumbnailPreview,
                      })
                    }
                  />
                </div>
                {videoThumbnailError && (
                  <p className="mt-1 text-sm text-red-600">
                    {videoThumbnailError}
                  </p>
                )}
              </div>
            </div>
          </SectionCard>

          <SectionCard title="Results">
            <div className="grid h-96 grid-cols-3 gap-5">
              <div className="">
                <div className="flex h-full w-full flex-col gap-2">
                  <Label content="Result" />
                  <div className="h-full">
                    {/* <Controller
                                        name="result"
                                        control={control}
    
                                        render={({ field }) => (
                                            <ReactQuill theme="snow" value={field.value == "<p>undefined</p>" ? "" : field.value} onChange={field.onChange} className="h-full" />
                                        )}
                                    /> */}
                    <RichEditor control={control} name="result" />
                  </div>
                </div>
              </div>

              <div>
                <Label content="Result-Image1" />
                <div
                  className="mt-2 flex h-full w-full cursor-pointer flex-col items-center justify-center overflow-hidden rounded-lg border-2 border-dashed border-gray-300"
                  onDragOver={(e) => e.preventDefault()}
                  onClick={() =>
                    document?.getElementById("resultimage1")?.click()
                  }
                >
                  {resultImage1Preview ? (
                    <div className="relative h-full w-full">
                      <Image
                        src={resultImage1Preview}
                        alt="Preview"
                        layout="fill"
                        objectFit="cover"
                      />
                      {
                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            setResultImage1Preview(null); // Clear the preview image
                            setResultImage1(null);
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
                    id="resultimage1"
                    accept="image/*"
                    className="hidden"
                    onChange={(e) =>
                      handleImageChange({
                        e,
                        setImageError: setResultImage1Error,
                        setImageFile: setResultImage1,
                        setPreviewImage: setResultImage1Preview,
                      })
                    }
                  />
                </div>
                {resultImage1Error && (
                  <p className="mt-1 text-sm text-red-600">
                    {resultImage1Error}
                  </p>
                )}
              </div>

              <div>
                <Label content="Result-Image2" />
                <div
                  className="mt-2 flex h-full w-full cursor-pointer flex-col items-center justify-center overflow-hidden rounded-lg border-2 border-dashed border-gray-300"
                  onDragOver={(e) => e.preventDefault()}
                  onClick={() =>
                    document?.getElementById("resultimage2")?.click()
                  }
                >
                  {resultImage2Preview ? (
                    <div className="relative h-full w-full">
                      <Image
                        src={resultImage2Preview}
                        alt="Preview"
                        layout="fill"
                        objectFit="cover"
                      />
                      {
                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            setResultImage2Preview(null); // Clear the preview image
                            setResultImage2(null);
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
                    id="resultimage2"
                    accept="image/*"
                    className="hidden"
                    onChange={(e) =>
                      handleImageChange({
                        e,
                        setImageError: setResultImage2Error,
                        setImageFile: setResultImage2,
                        setPreviewImage: setResultImage2Preview,
                      })
                    }
                  />
                </div>
                {resultImage2Error && (
                  <p className="mt-1 text-sm text-red-600">
                    {resultImage2Error}
                  </p>
                )}
              </div>
            </div>
          </SectionCard>

          <SectionCard title="Description & tag">
            <div className="grid grid-cols-2 gap-5">
              <div className="flex w-full flex-col gap-2">
                <div className="flex flex-col gap-2">
                  <Label content="Description" />
                  <input
                    type="text"
                    {...register("description", {
                      required:
                        watch("portfolioType") === "modern"
                          ? false
                          : "Description is required",
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
                  {...register("tag", {
                    required:
                      watch("portfolioType") === "modern"
                        ? false
                        : "Tag is required",
                  })}
                  className={
                    "w-full rounded-md border-[1px] border-gray-300 bg-transparent py-1 pl-4 text-black focus:outline-none"
                  }
                />
                {errors.tag && (
                  <p className="text-red mt-1 text-sm">{errors.tag.message}</p>
                )}
              </div>
            </div>
          </SectionCard>

          {/* <DndContext collisionDetection={closestCorners} onDragEnd={handleDragEnd}>
                                <Droppable categories={categories}/>
                    </DndContext> */}

          <SectionCard title="Categories & logo">
            <div className="grid grid-cols-2 gap-5">
              <div className="flex flex-col gap-2">
                <Label content="Added Categories" className="" />
                <div className="flex h-full w-full flex-wrap items-start gap-1 rounded-md border p-4">
                  {addedCategories.map((item) => (
                    <>
                      <div className="group relative h-fit w-fit cursor-pointer rounded-full border bg-blue-950 px-2 py-1 text-white">
                        <span className="group-hover:opacity-50">
                          {item.name}
                        </span>
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
                                link: item.link ?? "",
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

              <div className="flex flex-col gap-2">
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
                      <div className="group relative flex h-fit w-fit min-w-20 cursor-pointer justify-center rounded-full border bg-blue-950 px-2 py-1 text-white">
                        <span className="group-hover:opacity-50">
                          {item.name}
                        </span>
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
                                link: item.link ?? "",
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
            <div className="mt-6 flex h-36 w-1/3 flex-col gap-2">
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
          </SectionCard>

          <SectionCard
            title="URL & visibility"
            description="The slug sets the live page address. Featured controls highlighting on the site."
          >
            <div className="flex flex-col gap-4">
              <div className="flex w-full flex-col gap-2">
                <div className="flex flex-col gap-2">
                  <Label content="slug" />
                  <input
                    type="text"
                    {...register("slug")}
                    readOnly
                    className={
                      "w-full rounded-md border-[1px] border-gray-300 bg-transparent py-1 pl-4 text-black focus:outline-none"
                    }
                  />
                </div>
              </div>

              <div className="flex w-full flex-col gap-2">
                <Label content="Featured Project" />
                <select
                  {...register("featured")}
                  className="w-full rounded-md border-[1px] border-gray-300 bg-transparent py-1 pl-3 text-black focus:outline-none"
                >
                  <option value="">Select Featured</option>
                  <option value={"true"}>Yes</option>
                  <option value={"false"}>No</option>
                </select>
              </div>
            </div>
          </SectionCard>

          {selectedSection !== "portfolio" ||
          watch("portfolioType") !== "modern" ? (
            <>
              <SectionCard
                title="SEO metadata"
                description="Search engine title and description for this page."
              >
                <div className="grid grid-cols-2 gap-5">
                  <div className="flex flex-col gap-2">
                    <Label content="meta-title" />
                    <input
                      type="text"
                      {...register("metaTitle")}
                      className="w-full rounded-md border-[1px] border-gray-300 bg-transparent py-1 pl-4 text-black focus:outline-none"
                    />
                  </div>

                  <div className="flex flex-col gap-2">
                    <Label content="meta-description" />
                    <input
                      type="text"
                      {...register("metaDescription")}
                      className="w-full rounded-md border-[1px] border-gray-300 bg-transparent py-1 pl-4 text-black focus:outline-none"
                    />
                  </div>
                </div>
              </SectionCard>

              <section className="space-y-5 rounded-xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-700 dark:bg-slate-800">
                <h2 className="text-base font-semibold text-slate-900 dark:text-white">
                  Social sharing metadata
                </h2>
                <div className="grid grid-cols-2 gap-5">
                  <div className="flex flex-col gap-2">
                    <Label content="Open Graph title" />
                    <input
                      type="text"
                      {...register("ogTitle")}
                      className="w-full rounded-md border-[1px] border-gray-300 bg-transparent py-1 pl-4 text-black focus:outline-none"
                    />
                  </div>
                  <div className="flex flex-col gap-2">
                    <Label content="Open Graph description" />
                    <textarea
                      {...register("ogDescription")}
                      className="w-full rounded-md border-[1px] border-gray-300 bg-transparent py-1 pl-4 text-black focus:outline-none"
                    />
                  </div>
                  <div className="flex flex-col gap-2">
                    <Label content="Twitter title" />
                    <input
                      type="text"
                      {...register("twitterTitle")}
                      className="w-full rounded-md border-[1px] border-gray-300 bg-transparent py-1 pl-4 text-black focus:outline-none"
                    />
                  </div>
                  <div className="flex flex-col gap-2">
                    <Label content="Twitter description" />
                    <textarea
                      {...register("twitterDescription")}
                      className="w-full rounded-md border-[1px] border-gray-300 bg-transparent py-1 pl-4 text-black focus:outline-none"
                    />
                  </div>
                </div>
              </section>
            </>
          ) : null}

          {selectedSection === "portfolio" &&
            watch("portfolioType") === "modern" && (
              <section className="space-y-6 rounded-xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-700 dark:bg-slate-800">
                <h2 className="text-base font-semibold text-slate-900 dark:text-white">
                  Modern portfolio content
                </h2>

                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <h3 className="text-lg font-medium">Preview images</h3>
                    <button
                      type="button"
                      onClick={() =>
                        setPreviewImages((images) => [...images, ""])
                      }
                      className="rounded bg-black px-3 py-2 text-sm text-white"
                    >
                      Add preview image
                    </button>
                  </div>
                  <p className="text-sm text-gray-600">
                    Add images showing the work or services delivered for this
                    portfolio.
                  </p>
                  <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
                    {previewImages.map((imageUrl, index) => (
                      <div
                        key={`preview-${index}`}
                        className="w-full max-w-[220px] rounded-md border border-gray-200 p-2"
                      >
                        <ImageUploader
                          value={imageUrl}
                          onChange={(url) =>
                            setPreviewImages((images) =>
                              images.map((image, imageIndex) =>
                                imageIndex === index ? url : image,
                              ),
                            )
                          }
                        />
                        <button
                          type="button"
                          onClick={() =>
                            setPreviewImages((images) =>
                              images.filter(
                                (_, imageIndex) => imageIndex !== index,
                              ),
                            )
                          }
                          className="mt-2 text-sm text-red-600"
                        >
                          Remove image
                        </button>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="space-y-4 border-t border-gray-200 pt-5">
                  <div className="flex items-center justify-between">
                    <h3 className="text-lg font-medium">What We Delivered</h3>
                    <button
                      type="button"
                      onClick={() =>
                        setModernDeliveredItems((items) => [
                          ...items,
                          {
                            _id:
                              items.reduce(
                                (highestId, item) =>
                                  Math.max(highestId, item._id),
                                0,
                              ) + 1,
                            title: "",
                            icn: "",
                            dec: "",
                            urllink: [],
                          },
                        ])
                      }
                      className="rounded bg-black px-3 py-2 text-sm text-white"
                    >
                      Add delivery item
                    </button>
                  </div>
                  <div className="flex flex-col gap-2">
                    <Label content="Section title" />
                    <input
                      type="text"
                      {...register("whatWeDeliveredTitle")}
                      className="w-full rounded-md border border-gray-300 bg-transparent py-2 pl-3 text-black focus:outline-none"
                    />
                  </div>
                  {modernDeliveredItems.map((item, itemIndex) => (
                    <div
                      key={item._id}
                      className="space-y-3 rounded-md border border-gray-200 p-4"
                    >
                      <div className="flex items-center justify-between">
                        <h4 className="font-medium">
                          Delivery item {itemIndex + 1}
                        </h4>
                        <button
                          type="button"
                          onClick={() =>
                            setModernDeliveredItems((items) =>
                              items.filter((_, index) => index !== itemIndex),
                            )
                          }
                          className="text-sm text-red-600"
                        >
                          Remove item
                        </button>
                      </div>
                      <div className="grid gap-3 md:grid-cols-2">
                        <label className="flex flex-col gap-1">
                          <span>Title</span>
                          <input
                            value={item.title}
                            onChange={(event) =>
                              setModernDeliveredItems((items) =>
                                items.map((entry, index) =>
                                  index === itemIndex
                                    ? { ...entry, title: event.target.value }
                                    : entry,
                                ),
                              )
                            }
                            className="rounded-md border border-gray-300 bg-transparent px-3 py-2 text-black"
                          />
                        </label>
                        <label className="flex flex-col gap-1">
                          <span>Description</span>
                          <textarea
                            value={item.dec}
                            onChange={(event) =>
                              setModernDeliveredItems((items) =>
                                items.map((entry, index) =>
                                  index === itemIndex
                                    ? { ...entry, dec: event.target.value }
                                    : entry,
                                ),
                              )
                            }
                            className="rounded-md border border-gray-300 bg-transparent px-3 py-2 text-black"
                          />
                        </label>
                      </div>
                      <div>
                        <Label content="Icon image" />
                        <ImageUploader
                          value={item.icn}
                          className="max-w-[120px]"
                          onChange={(url) =>
                            setModernDeliveredItems((items) =>
                              items.map((entry, index) =>
                                index === itemIndex
                                  ? { ...entry, icn: url }
                                  : entry,
                              ),
                            )
                          }
                        />
                      </div>
                      <div className="space-y-2">
                        <div className="flex items-center justify-between">
                          <span>Links</span>
                          <button
                            type="button"
                            onClick={() =>
                              setModernDeliveredItems((items) =>
                                items.map((entry, index) =>
                                  index === itemIndex
                                    ? {
                                        ...entry,
                                        urllink: [...entry.urllink, ""],
                                      }
                                    : entry,
                                ),
                              )
                            }
                            className="text-sm text-blue-700"
                          >
                            Add link
                          </button>
                        </div>
                        {item.urllink.map((url, linkIndex) => (
                          <div key={linkIndex} className="flex gap-2">
                            <input
                              type="text"
                              value={url}
                              onChange={(event) =>
                                setModernDeliveredItems((items) =>
                                  items.map((entry, index) =>
                                    index === itemIndex
                                      ? {
                                          ...entry,
                                          urllink: entry.urllink.map(
                                            (entryUrl, currentLinkIndex) =>
                                              currentLinkIndex === linkIndex
                                                ? event.target.value
                                                : entryUrl,
                                          ),
                                        }
                                      : entry,
                                  ),
                                )
                              }
                              className="w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-black"
                              placeholder="https://"
                            />
                            <button
                              type="button"
                              onClick={() =>
                                setModernDeliveredItems((items) =>
                                  items.map((entry, index) =>
                                    index === itemIndex
                                      ? {
                                          ...entry,
                                          urllink: entry.urllink.filter(
                                            (_, currentLinkIndex) =>
                                              currentLinkIndex !== linkIndex,
                                          ),
                                        }
                                      : entry,
                                  ),
                                )
                              }
                              className="text-sm text-red-600"
                            >
                              Remove
                            </button>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>

                <div className="space-y-4 border-t border-gray-200 pt-5">
                  <h3 className="text-lg font-medium">Calls to action</h3>
                  <div className="grid gap-4 lg:grid-cols-2">
                    <div className="space-y-3 rounded-md border border-gray-200 p-4">
                      <h4 className="font-medium">First CTA</h4>
                      <label className="flex flex-col gap-1">
                        <span>Title</span>
                        <input
                          {...register("detailsCtaOneTitle")}
                          className="rounded-md border border-gray-300 bg-transparent px-3 py-2 text-black"
                        />
                      </label>
                      <label className="flex flex-col gap-1">
                        <span>Button text</span>
                        <input
                          {...register("detailsCtaOneLinkText")}
                          className="rounded-md border border-gray-300 bg-transparent px-3 py-2 text-black"
                        />
                      </label>
                      <label className="flex flex-col gap-1">
                        <span>Link</span>
                        <input
                          type="text"
                          {...register("modernDetailsCtaOneLink")}
                          className="rounded-md border border-gray-300 bg-transparent px-3 py-2 text-black"
                          placeholder="https://"
                        />
                      </label>
                    </div>
                    <div className="space-y-3 rounded-md border border-gray-200 p-4">
                      <h4 className="font-medium">Second CTA</h4>
                      <label className="flex flex-col gap-1">
                        <span>Title</span>
                        <input
                          {...register("detailsCtaTwoTitle")}
                          className="rounded-md border border-gray-300 bg-transparent px-3 py-2 text-black"
                        />
                      </label>
                      <label className="flex flex-col gap-1">
                        <span>Button text</span>
                        <input
                          {...register("detailsCtaTwoButtonText")}
                          className="rounded-md border border-gray-300 bg-transparent px-3 py-2 text-black"
                        />
                      </label>
                      <label className="flex flex-col gap-1">
                        <span>Link</span>
                        <input
                          type="text"
                          {...register("modernDetailsCtaTwoLink")}
                          className="rounded-md border border-gray-300 bg-transparent px-3 py-2 text-black"
                          placeholder="https://"
                        />
                      </label>
                    </div>
                  </div>
                </div>

                <div className="space-y-4 border-t border-gray-200 pt-5">
                  <h3 className="text-lg font-medium">Related portfolios</h3>
                  <label className="flex flex-col gap-1">
                    <span>Section title</span>
                    <input
                      {...register("relatedPortfoliosTitle")}
                      className="rounded-md border border-gray-300 bg-transparent px-3 py-2 text-black"
                    />
                  </label>
                  <input
                    type="search"
                    value={relatedPortfolioSearch}
                    onChange={(event) =>
                      setRelatedPortfolioSearch(event.target.value)
                    }
                    placeholder="Search portfolios by name or slug"
                    className="w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-black"
                  />
                  <div className="max-h-64 space-y-2 overflow-y-auto rounded-md border border-gray-200 p-3">
                    {portfolioOptions
                      .filter(
                        (portfolio) =>
                          portfolio._id !== String(companyId) &&
                          `${portfolio.companyName} ${portfolio.slug || ""}`
                            .toLowerCase()
                            .includes(relatedPortfolioSearch.toLowerCase()),
                      )
                      .map((portfolio) => (
                        <label
                          key={portfolio._id}
                          className="flex items-center gap-2"
                        >
                          <input
                            type="checkbox"
                            checked={relatedPortfolioIds.includes(
                              portfolio._id,
                            )}
                            onChange={(event) =>
                              setRelatedPortfolioIds((selectedIds) =>
                                event.target.checked
                                  ? [...selectedIds, portfolio._id]
                                  : selectedIds.filter(
                                      (selectedId) =>
                                        selectedId !== portfolio._id,
                                    ),
                              )
                            }
                          />
                          <span>
                            {portfolio.companyName}
                            {portfolio.slug ? ` (${portfolio.slug})` : ""}
                          </span>
                        </label>
                      ))}
                    {portfolioOptions.length === 0 && (
                      <p className="text-sm text-gray-600">
                        No portfolios are available to select.
                      </p>
                    )}
                  </div>
                  <p className="text-sm text-gray-600">
                    {relatedPortfolioIds.length} related portfolio(s) selected.
                  </p>
                </div>

                <div className="border-t border-gray-200 pt-5">
                  <SeoFields<Inputs>
                    control={control}
                    register={register}
                    errors={errors}
                  />
                </div>
              </section>
            )}

          {selectedSection !== "portfolio" ||
          watch("portfolioType") !== "modern" ? (
            <section className="space-y-5 rounded-xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-700 dark:bg-slate-800">
              <h2 className="text-base font-semibold text-slate-900 dark:text-white">
                Portfolio detail sections
              </h2>
              <p className="text-sm text-slate-500">
                Leave these fields empty to keep the current page defaults. For
                custom delivery items, enter a JSON array with id, title, dec,
                icn (image URL), and urllink fields.
              </p>
              <div className="grid grid-cols-2 gap-5">
                <div className="flex flex-col gap-2">
                  <Label content="What We Delivered title" />
                  <input
                    type="text"
                    {...register("whatWeDeliveredTitle")}
                    className="w-full rounded-md border-[1px] border-gray-300 bg-transparent py-1 pl-4 text-black focus:outline-none"
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <Label content="What We Delivered items (JSON)" />
                  <textarea
                    rows={8}
                    placeholder={
                      '[{"id":1,"title":"Example","dec":"","icn":"","urllink":""}]'
                    }
                    {...register("whatWeDeliveredData")}
                    className="w-full rounded-md border-[1px] border-gray-300 bg-transparent py-1 pl-4 font-mono text-sm text-black focus:outline-none"
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <Label content="First CTA heading" />
                  <input
                    type="text"
                    {...register("detailsCtaOneTitle")}
                    className="w-full rounded-md border-[1px] border-gray-300 bg-transparent py-1 pl-4 text-black focus:outline-none"
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <Label content="First CTA link label" />
                  <input
                    type="text"
                    {...register("detailsCtaOneLinkText")}
                    className="w-full rounded-md border-[1px] border-gray-300 bg-transparent py-1 pl-4 text-black focus:outline-none"
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <Label content="Second CTA heading" />
                  <input
                    type="text"
                    {...register("detailsCtaTwoTitle")}
                    className="w-full rounded-md border-[1px] border-gray-300 bg-transparent py-1 pl-4 text-black focus:outline-none"
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <Label content="Second CTA button label" />
                  <input
                    type="text"
                    {...register("detailsCtaTwoButtonText")}
                    className="w-full rounded-md border-[1px] border-gray-300 bg-transparent py-1 pl-4 text-black focus:outline-none"
                  />
                </div>
              </div>
            </section>
          ) : null}

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
  } else if (selectedSection == "case study") {
    return (
      <AdminIndiCaseStudy
        selectedSection={selectedSection}
        setSelectedSection={setSelectedSection}
      />
    );
  }
};

export default AdminIndiPortfolio;
