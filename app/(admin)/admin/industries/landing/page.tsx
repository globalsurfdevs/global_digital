"use client";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import React, { useEffect, useState } from "react";

import { useForm, useFieldArray, Controller } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { ImageUploader } from "@/components/ui/image-uploader";
import { FiChevronDown } from "react-icons/fi";
import { RiDeleteBinLine } from "react-icons/ri";
import { GiConfirmed } from "react-icons/gi";
import { TbReorder } from "react-icons/tb";
import { RxDragHandleDots2 } from "react-icons/rx";
import { closestCorners, DndContext, DragEndEvent } from "@dnd-kit/core";
import {
  SortableContext,
  verticalListSortingStrategy,
  useSortable,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import AdminItemContainer from "@/app/components/common/AdminItemContainer";
import SeoFields from "@/app/components/common/SeoFields";
import { SeoFormValues } from "@/app/types/seo";
import { Textarea } from "@/components/ui/textarea";
import { Portfolio } from "@/app/types/Portfolio";
import { ServicePillarData } from "@/app/components/ServicePillar/type";
import { ServicePillarListItem } from "@/app/components/AdminServicePillars/ServicePillarList";

type Service = {
  _id: string;
  name: string;
  image?: string;
  imageAlt?: string;
};

export interface IndustryLandingFormProps {
  seo: SeoFormValues;
  firstSection: {
    title: string;
    description: string;
    image: string;
    imageAlt: string;
  };
  secondSection: {
    title: string;
    subTitle: string;
    description: string;
    buttonText: string;
    buttonLink: string;
  };
  thirdSection: {
    title: string;
    subTitle: string;
    description: string;
    lastCardTitle: string;
    lastCardDescription: string;
  };
  caseStudySection: {
    title: string;
    subTitle: string;
    items: {
      title: string;
      project: string;
      description: string;
      image: string;
      imageAlt: string;
    }[];
  };
  servicesSection: {
    title: string;
    subTitle: string;
    items: {
      _id?: string;
      service: string;
      title: string;
      description: string;
      // image: string;
      // imageAlt: string;
    }[];
  };
  ctaSection: {
    titleRed: string;
    title: string;
    description: string;
    buttonText: string;
    buttonLink: string;
  };
  faqSection: {
    title: string;
    items: {
      question: string;
      answer: string;
    }[];
  };
}

// --- Reusable accordion wrapper for top-level admin sections ---
const AccordionSection = ({
  title,
  sectionKey,
  openSection,
  setOpenSection,
  children,
}: {
  title: string;
  sectionKey: string;
  openSection: string | null;
  setOpenSection: (key: string | null) => void;
  children: React.ReactNode;
}) => {
  const isOpen = openSection === sectionKey;

  return (
    <AdminItemContainer>
      <Label main isOpen={isOpen ? "open" : ""}>
        <div className="flex w-full justify-between">
          <div>{title}</div>
          <button
            type="button"
            onClick={() => setOpenSection(isOpen ? null : sectionKey)}
            className="flex items-center justify-between pr-5"
          >
            <FiChevronDown
              className={`text-xl transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`}
            />
          </button>
        </div>
      </Label>

      {isOpen && <div className="pt-3">{children}</div>}
    </AdminItemContainer>
  );
};

// --- Reusable sortable item wrapper, used by repeatable-item sections ---
const SortableItem = ({
  id,
  reorderMode,
  children,
}: {
  id: string;
  reorderMode: boolean;
  children: React.ReactNode;
}) => {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  if (reorderMode) {
    return (
      <div
        ref={setNodeRef}
        style={style}
        {...attributes}
        {...listeners}
        className="flex cursor-grab touch-none items-center gap-2 rounded-md border border-black/20 bg-white px-3 py-2"
      >
        <RxDragHandleDots2 className="flex-shrink-0 text-xl text-gray-500" />
        {children}
      </div>
    );
  }

  return (
    <div
      ref={setNodeRef}
      style={style}
      className="relative grid grid-cols-2 gap-2 border-b border-black/20 bg-white pb-5 last:border-b-0"
    >
      {children}
    </div>
  );
};

const IndustryLandingPage = () => {
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    control,
    formState: { errors },
  } = useForm<IndustryLandingFormProps>();

  const {
    fields: caseStudySectionItems,
    append: caseStudySectionAppend,
    remove: caseStudySectionRemove,
    move: caseStudySectionMove,
  } = useFieldArray({
    control,
    name: "caseStudySection.items",
  });

  const {
    fields: servicesSectionItems,
    append: servicesSectionAppend,
    remove: servicesSectionRemove,
    move: servicesSectionMove,
  } = useFieldArray({
    control,
    name: "servicesSection.items",
  });

  const {
    fields: faqSectionItems,
    append: faqSectionAppend,
    remove: faqSectionRemove,
    move: faqSectionMove,
  } = useFieldArray({
    control,
    name: "faqSection.items",
  });

  // Which top-level section accordion is open.
  const [openSection, setOpenSection] = useState<string | null>("");
  const [reorderMode, setReorderMode] = useState(false);
  const [portfolios, setPortfolios] = useState<Portfolio[]>([]);
  const [servicesPillars, setServicesPillars] = useState<
    ServicePillarListItem[]
  >([]);

  const handleAddIndustryLanding = async (data: IndustryLandingFormProps) => {
    try {
      const response = await fetch(`/api/industry-landing`, {
        method: "PATCH",
        body: JSON.stringify(data),
      });
      if (response.ok) {
        const data = await response.json();
        alert(data.message);
        // router.push("/admin/industry-landing");
      }
    } catch (error) {
      console.log("Error in adding industry landing page", error);
    }
  };

  const fetchIndustryLandingData = async () => {
    try {
      const response = await fetch(`/api/industry-landing`);
      if (response.ok) {
        const data = await response.json();
        setValue("seo", data.data?.seo);
        setValue("firstSection", data.data?.firstSection);
        setValue("secondSection", data.data?.secondSection);
        setValue("thirdSection", data.data?.thirdSection);
        setValue("caseStudySection", data.data?.caseStudySection);
        setValue(
          "caseStudySection.items",
          (data.data?.caseStudySection?.items ?? []).map((item: any) => ({
            ...item,
            project:
              typeof item.project === "object" && item.project !== null
                ? item.project._id
                : item.project,
          })),
        );
        setValue("servicesSection", data.data?.servicesSection);
        setValue(
          "servicesSection.items",
          (data.data?.servicesSection?.items ?? []).map((item: any) => ({
            ...item,
            service:
              typeof item.service === "object" && item.service !== null
                ? item.service._id
                : item.service,
          })),
        );
        setValue("ctaSection", data.data?.ctaSection);
        setValue("faqSection", data.data?.faqSection);
        setValue("faqSection.items", data.data?.faqSection?.items ?? []);
      } else {
        const data = await response.json();
        alert(data.message);
      }
    } catch (error) {
      console.log("Error in fetching industry landing data", error);
    }
  };

  const fetchPortfolios = async () => {
    try {
      const response = await fetch(`/api/portfolio`, {
        headers: {
          "x-auth-type": "admin",
        },
      });
      if (response.ok) {
        const data = await response.json();
        setPortfolios(data.portfolio);
      } else {
        console.error("Failed to fetch portfolio data");
      }
    } catch (error) {
      console.error("Error fetching portfolio data:", error);
    }
  };

  const fetchServices = async () => {
    try {
      const response = await fetch(`/api/service-pillar`);
      if (response.ok) {
        const data = await response.json();
        console.log("data:", data);
        setServicesPillars(data.data);
      } else {
        console.error("Failed to fetch services");
      }
    } catch (error) {
      console.error("Error fetching services:", error);
    }
  };

  // Factory for drag end handlers, reused across all field arrays
  const createDragEndHandler =
    (fields: { id: string }[], move: (from: number, to: number) => void) =>
    (event: DragEndEvent) => {
      const { active, over } = event;

      if (!over || active.id === over.id) return;

      const oldIndex = fields.findIndex((item) => item.id === active.id);
      const newIndex = fields.findIndex((item) => item.id === over.id);

      if (oldIndex === -1 || newIndex === -1) return;
      move(oldIndex, newIndex);
    };

  useEffect(() => {
    Promise.all([fetchPortfolios(), fetchServices()]).then(() =>
      fetchIndustryLandingData(),
    );
  }, []);

  return (
    <div className="flex flex-col gap-5 pb-5">
      <form
        className="flex flex-col gap-5"
        onSubmit={handleSubmit(handleAddIndustryLanding)}
      >
        <AccordionSection
          title="First Section"
          sectionKey="firstSection"
          openSection={openSection}
          setOpenSection={setOpenSection}
        >
          <div className="flex flex-col gap-2 rounded-md p-5">
            <div className="flex flex-col gap-2">
              <div className="flex flex-col gap-2">
                <Label className="font-bold">Title</Label>
                <Input
                  type="text"
                  placeholder="Title"
                  {...register(`firstSection.title`, {
                    required: "Value is required",
                  })}
                />
                {errors.firstSection?.title && (
                  <p className="text-red-500">
                    {errors.firstSection?.title.message}
                  </p>
                )}
              </div>

              <div className="flex flex-col gap-1">
                <Label className=" font-bold">Description</Label>
                <Textarea
                  placeholder="Description"
                  {...register("firstSection.description", {
                    required: "Description is required",
                  })}
                />
                {errors.firstSection?.description && (
                  <p className="text-red-500">
                    {errors.firstSection?.description.message}
                  </p>
                )}
              </div>

              <div className="flex flex-col gap-2">
                <Label className="font-bold">Image</Label>
                <Controller
                  name={`firstSection.image`}
                  control={control}
                  rules={{ required: "Image is required" }}
                  render={({ field }) => (
                    <ImageUploader
                      value={field.value}
                      onChange={field.onChange}
                      className="h-fit w-[300px]"
                    />
                  )}
                />
                {errors.firstSection?.image && (
                  <p className="text-red-500">
                    {errors.firstSection?.image.message}
                  </p>
                )}
              </div>

              <div className="flex flex-col gap-2">
                <Label className="font-bold">Alt Tag</Label>
                <Input
                  type="text"
                  placeholder="Alt Tag"
                  {...register(`firstSection.imageAlt`, {
                    required: "Alt Tag is required",
                  })}
                />
                {errors.firstSection?.imageAlt && (
                  <p className="text-red-500">
                    {errors.firstSection?.imageAlt.message}
                  </p>
                )}
              </div>
            </div>
          </div>
        </AccordionSection>

        {/* ---------------- Second Section (new) ---------------- */}
        <AccordionSection
          title="Second Section"
          sectionKey="secondSection"
          openSection={openSection}
          setOpenSection={setOpenSection}
        >
          <div className="flex flex-col gap-2 rounded-md p-5">
            <div className="flex flex-col gap-2">
              <div className="flex flex-col gap-2">
                <Label className="font-bold">Title</Label>
                <Input
                  type="text"
                  placeholder="Title"
                  {...register(`secondSection.title`, {
                    required: "Value is required",
                  })}
                />
                {errors.secondSection?.title && (
                  <p className="text-red-500">
                    {errors.secondSection?.title.message}
                  </p>
                )}
              </div>

              <div className="flex flex-col gap-2">
                <Label className="font-bold">Sub Title</Label>
                <Input
                  type="text"
                  placeholder="Sub Title"
                  {...register(`secondSection.subTitle`, {
                    required: "Sub Title is required",
                  })}
                />
                {errors.secondSection?.subTitle && (
                  <p className="text-red-500">
                    {errors.secondSection?.subTitle.message}
                  </p>
                )}
              </div>

              <div className="flex flex-col gap-1">
                <Label className=" font-bold">Description</Label>
                <Textarea
                  placeholder="Description"
                  {...register("secondSection.description", {
                    required: "Description is required",
                  })}
                />
                {errors.secondSection?.description && (
                  <p className="text-red-500">
                    {errors.secondSection?.description.message}
                  </p>
                )}
              </div>

              <div className="flex flex-col gap-1">
                <Label className=" font-bold">Button Text</Label>
                <Input
                  type="text"
                  placeholder="Button Text"
                  {...register("secondSection.buttonText")}
                />
              </div>

              <div className="flex flex-col gap-1">
                <Label className=" font-bold">Button Link</Label>
                <Input
                  type="text"
                  placeholder="Button Link"
                  {...register("secondSection.buttonLink")}
                />
              </div>
            </div>
          </div>
        </AccordionSection>

        {/* ---------------- Third Section (formerly Second Section) ---------------- */}
        <AccordionSection
          title="Third Section"
          sectionKey="thirdSection"
          openSection={openSection}
          setOpenSection={setOpenSection}
        >
          <div className="flex flex-col gap-2 rounded-md p-5">
            <div className="flex flex-col gap-2">
              <div className="flex flex-col gap-2">
                <Label className="font-bold">Title</Label>
                <Input
                  type="text"
                  placeholder="Title"
                  {...register(`thirdSection.title`, {
                    required: "Value is required",
                  })}
                />
                {errors.thirdSection?.title && (
                  <p className="text-red-500">
                    {errors.thirdSection?.title.message}
                  </p>
                )}
              </div>

              <div className="flex flex-col gap-2">
                <Label className="font-bold">Sub Title</Label>
                <Input
                  type="text"
                  placeholder="Sub Title"
                  {...register(`thirdSection.subTitle`, {
                    required: "Sub Title is required",
                  })}
                />
                {errors.thirdSection?.subTitle && (
                  <p className="text-red-500">
                    {errors.thirdSection?.subTitle.message}
                  </p>
                )}
              </div>

              <div className="flex flex-col gap-1">
                <Label className=" font-bold">Description</Label>
                <Textarea
                  placeholder="Description"
                  {...register("thirdSection.description", {
                    required: "Description is required",
                  })}
                />
                {errors.thirdSection?.description && (
                  <p className="text-red-500">
                    {errors.thirdSection?.description.message}
                  </p>
                )}
              </div>

              <div className="flex flex-col gap-2">
                <Label className="font-bold">Last Card Title</Label>
                <Input
                  type="text"
                  placeholder="Last Card Title"
                  {...register(`thirdSection.lastCardTitle`, {
                    required: "Last Card Title is required",
                  })}
                />
                {errors.thirdSection?.lastCardTitle && (
                  <p className="text-red-500">
                    {errors.thirdSection?.lastCardTitle.message}
                  </p>
                )}
              </div>

              <div className="flex flex-col gap-1">
                <Label className=" font-bold">Last Card Description</Label>
                <Textarea
                  placeholder="Last Card Description"
                  {...register("thirdSection.lastCardDescription", {
                    required: "Last Card Description is required",
                  })}
                />
                {errors.thirdSection?.lastCardDescription && (
                  <p className="text-red-500">
                    {errors.thirdSection?.lastCardDescription.message}
                  </p>
                )}
              </div>
            </div>
          </div>
        </AccordionSection>

        {/* ---------------- Case Study Section ---------------- */}
        <AccordionSection
          title="Case Study Section"
          sectionKey="caseStudySection"
          openSection={openSection}
          setOpenSection={setOpenSection}
        >
          <div className="flex flex-col gap-2 rounded-md p-5">
            <div className="flex flex-col gap-2">
              <div className="flex flex-col gap-2">
                <Label className="font-bold">Title</Label>
                <Input
                  type="text"
                  placeholder="Title"
                  {...register(`caseStudySection.title`)}
                />
              </div>

              <div className="flex flex-col gap-2">
                <Label className="font-bold">Sub Title</Label>
                <Input
                  type="text"
                  placeholder="Sub Title"
                  {...register(`caseStudySection.subTitle`)}
                />
              </div>
            </div>
            <div>
              <div className="mb-3 flex justify-between">
                <Label className="font-bold">Items</Label>
                {
                  <Button
                    className="bg-green-600 text-white"
                    type="button"
                    onClick={() => setReorderMode(!reorderMode)}
                  >
                    {reorderMode ? <GiConfirmed /> : <TbReorder />}
                  </Button>
                }
              </div>
              <div className="flex flex-col gap-5 rounded-md border border-black/20 p-2">
                <DndContext
                  collisionDetection={closestCorners}
                  onDragEnd={createDragEndHandler(
                    caseStudySectionItems,
                    caseStudySectionMove,
                  )}
                >
                  <SortableContext
                    items={caseStudySectionItems.map((field) => field.id)}
                    strategy={verticalListSortingStrategy}
                  >
                    {caseStudySectionItems.map((field, index) => (
                      <SortableItem
                        key={field.id}
                        id={field.id}
                        reorderMode={reorderMode}
                      >
                        {reorderMode ? (
                          <span className="font-medium">
                            {watch(`caseStudySection.items.${index}.title`) ||
                              `Item ${index + 1}`}
                          </span>
                        ) : (
                          <>
                            <div className="absolute right-2 top-2">
                              <RiDeleteBinLine
                                onClick={() => caseStudySectionRemove(index)}
                                className="cursor-pointer text-red-600"
                              />
                            </div>

                            <div className="flex flex-col gap-2">
                              <Label className="font-bold">Project</Label>
                              <Controller
                                control={control}
                                name={`caseStudySection.items.${index}.project`}
                                render={({ field }) => (
                                  <select
                                    className="rounded-md border p-2"
                                    {...field}
                                  >
                                    <option value="">Select a project</option>
                                    {portfolios.map((portfolio) => (
                                      <option
                                        key={portfolio._id}
                                        value={portfolio._id}
                                      >
                                        {portfolio.companyName}
                                      </option>
                                    ))}
                                  </select>
                                )}
                              />
                            </div>

                            <div className="flex flex-col gap-2">
                              <Label className="font-bold">Title</Label>
                              <Input
                                type="text"
                                placeholder="Title"
                                {...register(
                                  `caseStudySection.items.${index}.title`,
                                )}
                              />
                            </div>

                            <div className="flex flex-col gap-2">
                              <Label className="font-bold">Description</Label>
                              <Textarea
                                placeholder="Description"
                                {...register(
                                  `caseStudySection.items.${index}.description`,
                                )}
                              />
                            </div>

                            <div className="flex flex-col gap-2">
                              <div className="flex flex-col gap-2">
                                <Label className="font-bold">Image</Label>
                                <Controller
                                  name={`caseStudySection.items.${index}.image`}
                                  control={control}
                                  render={({ field }) => (
                                    <ImageUploader
                                      value={field.value}
                                      onChange={field.onChange}
                                      className=""
                                      isLogo
                                    />
                                  )}
                                />
                              </div>

                              <div className="flex flex-col gap-2">
                                <Label className="font-bold">Alt Tag</Label>
                                <Input
                                  type="text"
                                  placeholder="Alt Tag"
                                  {...register(
                                    `caseStudySection.items.${index}.imageAlt`,
                                  )}
                                />
                              </div>
                            </div>
                          </>
                        )}
                      </SortableItem>
                    ))}
                  </SortableContext>
                </DndContext>
              </div>
              <div className="mt-2 flex justify-end">
                <Button
                  type="button"
                  addItem
                  onClick={() =>
                    caseStudySectionAppend({
                      title: "",
                      description: "",
                      project: "",
                      image: "",
                      imageAlt: "",
                    })
                  }
                >
                  Add Item
                </Button>
              </div>
            </div>
          </div>
        </AccordionSection>

        {/* ---------------- Services Section ---------------- */}
        <AccordionSection
          title="Services Section"
          sectionKey="servicesSection"
          openSection={openSection}
          setOpenSection={setOpenSection}
        >
          <div className="flex flex-col gap-2 rounded-md p-5">
            <div className="flex flex-col gap-2">
              <div className="flex flex-col gap-2">
                <Label className="font-bold">Title</Label>
                <Input
                  type="text"
                  placeholder="Title"
                  {...register(`servicesSection.title`)}
                />
              </div>

              <div className="flex flex-col gap-2">
                <Label className="font-bold">Sub Title</Label>
                <Input
                  type="text"
                  placeholder="Sub Title"
                  {...register(`servicesSection.subTitle`)}
                />
              </div>
            </div>
            <div>
              <div className="mb-3 flex justify-between">
                <Label className="font-bold">Items</Label>
                {
                  <Button
                    className="bg-green-600 text-white"
                    type="button"
                    onClick={() => setReorderMode(!reorderMode)}
                  >
                    {reorderMode ? <GiConfirmed /> : <TbReorder />}
                  </Button>
                }
              </div>
              <div className="flex flex-col gap-5 rounded-md border border-black/20 p-2">
                <DndContext
                  collisionDetection={closestCorners}
                  onDragEnd={createDragEndHandler(
                    servicesSectionItems,
                    servicesSectionMove,
                  )}
                >
                  <SortableContext
                    items={servicesSectionItems.map((field) => field.id)}
                    strategy={verticalListSortingStrategy}
                  >
                    {servicesSectionItems.map((field, index) => {
                      const selectedServiceId = watch(
                        `servicesSection.items.${index}.service`,
                      );

                      const selectedService = servicesPillars.find(
                        (service) => service._id === selectedServiceId,
                      );

                      return (
                        <SortableItem
                          key={field.id}
                          id={field.id}
                          reorderMode={reorderMode}
                        >
                          {reorderMode ? (
                            <span className="font-medium">
                              {selectedService?.name || `Item ${index + 1}`}
                            </span>
                          ) : (
                            <>
                              <div className="absolute right-2 top-2">
                                <RiDeleteBinLine
                                  onClick={() => servicesSectionRemove(index)}
                                  className="cursor-pointer text-red-600"
                                />
                              </div>

                              {/* Service */}
                              <div className="flex flex-col gap-2">
                                <Label className="font-bold">Service</Label>

                                <Controller
                                  control={control}
                                  name={`servicesSection.items.${index}.service`}
                                  render={({ field }) => (
                                    <select
                                      className="rounded-md border p-2"
                                      {...field}
                                    >
                                      <option value="">Select a service</option>

                                      {servicesPillars.map((service) => (
                                        <option
                                          key={service._id}
                                          value={service._id}
                                        >
                                          {service.name}
                                        </option>
                                      ))}
                                    </select>
                                  )}
                                />
                              </div>

                              {/* Title */}
                              <div className="flex flex-col gap-2">
                                <Label className="font-bold">Title</Label>

                                <Input
                                  type="text"
                                  value={selectedService?.name || ""}
                                  disabled
                                  placeholder="Title"
                                  className="bg-gray-100"
                                />
                              </div>

                              {/* Description */}
                              <div className="flex flex-col gap-2">
                                <Label className="font-bold">Description</Label>

                                <Textarea
                                  placeholder="Description"
                                  {...register(
                                    `servicesSection.items.${index}.description`,
                                  )}
                                />
                              </div>
                            </>
                          )}
                        </SortableItem>
                      );
                    })}
                  </SortableContext>
                </DndContext>
              </div>
              <div className="mt-2 flex justify-end">
                <Button
                  type="button"
                  addItem
                  onClick={() =>
                    servicesSectionAppend({
                      service: "",
                      title: "",
                      description: "",
                    })
                  }
                >
                  Add Item
                </Button>
              </div>
            </div>
          </div>
        </AccordionSection>

        {/* ---------------- CTA Section ---------------- */}
        <AccordionSection
          title="CTA Section"
          sectionKey="ctaSection"
          openSection={openSection}
          setOpenSection={setOpenSection}
        >
          <div className="flex flex-col gap-2 rounded-md p-5">
            <div className="flex flex-col gap-2">
              <div className="flex flex-col gap-2">
                <Label className="font-bold">Title Red</Label>
                <Input
                  type="text"
                  placeholder="Title Red"
                  {...register(`ctaSection.titleRed`)}
                />
              </div>

              <div className="flex flex-col gap-2">
                <Label className="font-bold">Title</Label>
                <Input
                  type="text"
                  placeholder="Title"
                  {...register(`ctaSection.title`)}
                />
              </div>

              <div className="flex flex-col gap-1">
                <Label className=" font-bold">Description</Label>
                <Textarea
                  placeholder="Description"
                  {...register("ctaSection.description")}
                />
              </div>

              <div className="flex flex-col gap-1">
                <Label className=" font-bold">Button Text</Label>
                <Input
                  type="text"
                  placeholder="Button Text"
                  {...register("ctaSection.buttonText")}
                />
              </div>

              <div className="flex flex-col gap-1">
                <Label className=" font-bold">Button Link</Label>
                <Input
                  type="text"
                  placeholder="Button Link"
                  {...register("ctaSection.buttonLink")}
                />
              </div>
            </div>
          </div>
        </AccordionSection>

        {/* ---------------- FAQ Section ---------------- */}
        <AccordionSection
          title="FAQ Section"
          sectionKey="faqSection"
          openSection={openSection}
          setOpenSection={setOpenSection}
        >
          <div className="flex flex-col gap-2 rounded-md p-5">
            <div className="flex flex-col gap-2">
              <div className="flex flex-col gap-2">
                <Label className="font-bold">Title</Label>
                <Input
                  type="text"
                  placeholder="Title"
                  {...register(`faqSection.title`)}
                />
              </div>
            </div>
            <div>
              <div className="mb-3 flex justify-between">
                <Label className="font-bold">Items</Label>
                {
                  <Button
                    className="bg-green-600 text-white"
                    type="button"
                    onClick={() => setReorderMode(!reorderMode)}
                  >
                    {reorderMode ? <GiConfirmed /> : <TbReorder />}
                  </Button>
                }
              </div>
              <div className="flex flex-col gap-5 rounded-md border border-black/20 p-2">
                <DndContext
                  collisionDetection={closestCorners}
                  onDragEnd={createDragEndHandler(
                    faqSectionItems,
                    faqSectionMove,
                  )}
                >
                  <SortableContext
                    items={faqSectionItems.map((field) => field.id)}
                    strategy={verticalListSortingStrategy}
                  >
                    {faqSectionItems.map((field, index) => (
                      <SortableItem
                        key={field.id}
                        id={field.id}
                        reorderMode={reorderMode}
                      >
                        {reorderMode ? (
                          <span className="font-medium">
                            {watch(`faqSection.items.${index}.question`) ||
                              `FAQ ${index + 1}`}
                          </span>
                        ) : (
                          <>
                            <div className="absolute right-2 top-2">
                              <RiDeleteBinLine
                                onClick={() => faqSectionRemove(index)}
                                className="cursor-pointer text-red-600"
                              />
                            </div>

                            <div className="col-span-2 flex flex-col gap-2">
                              <Label className="font-bold">Question</Label>
                              <Input
                                type="text"
                                placeholder="Question"
                                {...register(
                                  `faqSection.items.${index}.question`,
                                )}
                              />
                            </div>

                            <div className="col-span-2 flex flex-col gap-2">
                              <Label className="font-bold">Answer</Label>
                              <Textarea
                                placeholder="Answer"
                                {...register(
                                  `faqSection.items.${index}.answer`,
                                )}
                              />
                            </div>
                          </>
                        )}
                      </SortableItem>
                    ))}
                  </SortableContext>
                </DndContext>
              </div>
              <div className="mt-2 flex justify-end">
                <Button
                  type="button"
                  addItem
                  onClick={() => faqSectionAppend({ question: "", answer: "" })}
                >
                  Add Item
                </Button>
              </div>
            </div>
          </div>
        </AccordionSection>

        {/* Further sections (e.g. cards grid, team) will be added here as accordions,
                    following the same AccordionSection pattern, once specced out. */}

        <SeoFields<IndustryLandingFormProps>
          control={control}
          register={register}
          errors={errors}
        />

        <div className="flex">
          <Button
            type="submit"
            className="w-full cursor-pointer text-[16px] text-white"
          >
            Submit
          </Button>
        </div>
      </form>
    </div>
  );
};

export default IndustryLandingPage;
