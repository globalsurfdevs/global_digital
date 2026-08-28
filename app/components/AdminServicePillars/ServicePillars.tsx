"use client";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import React, { useEffect, useState } from "react";

import { useForm, useFieldArray, Controller } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { ImageUploader } from "@/components/ui/image-uploader";
import { RiDeleteBinLine } from "react-icons/ri";
import { FiChevronDown } from "react-icons/fi";
import AdminItemContainer from "@/app/components/common/AdminItemContainer";
import SeoFields from "@/app/components/common/SeoFields";
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
import { Textarea } from "@/components/ui/textarea";
import { useParams } from "next/navigation";

// NOTE: adjust this import path to wherever ServicePillarData actually lives
import { ServicePillarData } from "../ServicePillar/type";

type ServiceIndustryOption = {
  _id: string;
  image: string;
  imageAlt: string;
  title: string;
};

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

const ServicePillarPage = () => {
  const params = useParams<{ id: string }>();
  const slug = params?.id;

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    control,
    formState: { errors },
  } = useForm<ServicePillarData>();

  const {
    fields: fifthSectionItems,
    append: fifthSectionAppend,
    remove: fifthSectionRemove,
    move: fifthSectionMove,
  } = useFieldArray({
    control,
    name: "fifthSection.items",
  });

  const {
    fields: sixthSectionItems,
    append: sixthSectionAppend,
    remove: sixthSectionRemove,
    move: sixthSectionMove,
  } = useFieldArray({
    control,
    name: "sixthSection.items",
  });

  const {
    fields: seventhSectionItems,
    append: seventhSectionAppend,
    remove: seventhSectionRemove,
    move: seventhSectionMove,
  } = useFieldArray({
    control,
    name: "seventhSection.items",
  });

  const {
    fields: eighthSectionItems,
    append: eighthSectionAppend,
    remove: eighthSectionRemove,
    move: eighthSectionMove,
  } = useFieldArray({
    control,
    name: "eighthSection.items",
  });

  const {
    fields: tenthSectionItems,
    append: tenthSectionAppend,
    remove: tenthSectionRemove,
    move: tenthSectionMove,
  } = useFieldArray({
    control,
    name: "tenthSection.items",
  });

  const {
    fields: faqSectionItems,
    append: faqSectionAppend,
    remove: faqSectionRemove,
    move: faqSectionMove,
  } = useFieldArray({
    control,
    name: "faqSection.data",
  });

  const [reorderMode, setReorderMode] = useState(false);
  const [serviceIndustries, setServiceIndustries] = useState<
    ServiceIndustryOption[]
  >([]);

  // Which top-level section accordion is open.
  const [openSection, setOpenSection] = useState<string | null>("");

  const handleSave = async (data: ServicePillarData) => {
    // console.log('service pillar',data)
    try {
      const response = await fetch(
        `/api/service-pillar/${encodeURIComponent(slug)}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        },
      );

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.message || "Failed to save Service Pillar");
      }

      alert(result.message || "Service Pillar updated successfully");
    } catch (error) {
      console.error("Error in saving Service Pillar page:", error);
      alert(
        error instanceof Error
          ? error.message
          : "Failed to save Service Pillar",
      );
    }
  };

  const fetchServicePillarData = async () => {
    try {
      const response = await fetch(`/api/service-pillar?slug=${slug}`);
      if (response.ok) {
        const data = await response.json();
        setValue("seo", data.data?.seo);
        setValue("firstSection", data.data?.firstSection);
        setValue("secondSection", data.data?.secondSection);
        setValue("thirdSection", data.data?.thirdSection);
        setValue("fourthSection", data.data?.fourthSection);
        setValue("fifthSection", data.data?.fifthSection);
        setValue("fifthSection.items", data.data?.fifthSection?.items ?? []);
        setValue("sixthSection", data.data?.sixthSection);
        setValue("sixthSection.items", data.data?.sixthSection?.items ?? []);
        setValue("seventhSection", data.data?.seventhSection);
        setValue(
          "seventhSection.items",
          data.data?.seventhSection?.items ?? [],
        );
        setValue("eighthSection", data.data?.eighthSection);
        setValue("eighthSection.items", data.data?.eighthSection?.items ?? []);
        setValue("ninthSection", data.data?.ninthSection);
        setValue(
          "ninthSection.serviceIndustries",
          (data.data?.ninthSection?.serviceIndustries ?? []).map(
            (item: any) =>
              typeof item === "object" && item !== null ? item._id : item,
          ),
        );
        setValue("tenthSection", data.data?.tenthSection);
        setValue("tenthSection.items", data.data?.tenthSection?.items ?? []);
        setValue("eleventhSection", data.data?.eleventhSection);
        setValue(
          "eleventhSection.items",
          data.data?.eleventhSection?.items ?? {
            id: "",
            title: "",
            description: "",
            image: "",
            imageAlt: "",
            link: "",
          },
        );
        setValue("ctaSection", data.data?.ctaSection);
        setValue("faqSection", data.data?.faqSection);
        setValue("faqSection.data", data.data?.faqSection?.data ?? []);
      } else {
        const data = await response.json();
        alert(data.message);
      }
    } catch (error) {
      console.log("Error in fetching service pillar data", error);
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

  const fetchServiceIndustries = async () => {
    try {
      const response = await fetch(`/api/service-industry`);
      if (response.ok) {
        const data = await response.json();
        setServiceIndustries(data.data);
      } else {
        console.error("Failed to fetch service industries");
      }
    } catch (error) {
      console.error("Error fetching service industries:", error);
    }
  };

  useEffect(() => {
    fetchServiceIndustries().then(() => fetchServicePillarData());
  }, []);

  return (
    <div className="flex flex-col gap-5 pb-5">
      <form className="flex flex-col gap-5" onSubmit={handleSubmit(handleSave)}>
        {/* ---------------- First Section ---------------- */}
        <AccordionSection
          title="First Section"
          sectionKey="firstSection"
          openSection={openSection}
          setOpenSection={setOpenSection}
        >
          <div className="flex flex-col gap-2 rounded-md p-5">
            <div className="flex flex-col gap-2">
              <Label className="font-bold">Image</Label>
              <Controller
                name="firstSection.image"
                control={control}
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
              <Label className="font-bold">Image Alt Tag</Label>
              <Input
                type="text"
                placeholder="Alt Tag"
                {...register("firstSection.imageAlt")}
              />
            </div>

            <div className="flex flex-col gap-2">
              <Label className="font-bold">Title</Label>
              <Input
                type="text"
                placeholder="Title"
                {...register("firstSection.title")}
              />
            </div>

            <div className="flex flex-col gap-1">
              <Label className="font-bold">Description</Label>
              <Textarea
                placeholder="Description"
                {...register("firstSection.description")}
              />
            </div>
          </div>
        </AccordionSection>

        {/* ---------------- Second Section ---------------- */}
        <AccordionSection
          title="Second Section"
          sectionKey="secondSection"
          openSection={openSection}
          setOpenSection={setOpenSection}
        >
          <div className="flex flex-col gap-2 rounded-md p-5">
            <div className="flex flex-col gap-2">
              <Label className="font-bold">Title</Label>
              <Input
                type="text"
                placeholder="Title"
                {...register("secondSection.title")}
              />
            </div>

            <div className="flex flex-col gap-1">
              <Label className="font-bold">Description</Label>
              <Textarea
                placeholder="Description"
                {...register("secondSection.description")}
              />
            </div>
          </div>
        </AccordionSection>

        {/* ---------------- Third Section ---------------- */}
        <AccordionSection
          title="Third Section"
          sectionKey="thirdSection"
          openSection={openSection}
          setOpenSection={setOpenSection}
        >
          <div className="flex flex-col gap-2 rounded-md p-5">
            <div className="flex flex-col gap-2">
              <Label className="font-bold">Title</Label>
              <Input
                type="text"
                placeholder="Title"
                {...register("thirdSection.title")}
              />
            </div>

            <div className="flex flex-col gap-2">
              <Label className="font-bold">Sub Title</Label>
              <Input
                type="text"
                placeholder="Sub Title"
                {...register("thirdSection.subTitle")}
              />
            </div>

            <div className="flex flex-col gap-1">
              <Label className="font-bold">Description</Label>
              <Textarea
                placeholder="Description"
                {...register("thirdSection.description")}
              />
            </div>

            <div className="flex flex-col gap-2">
              <Label className="font-bold">Image</Label>
              <Controller
                name="thirdSection.image"
                control={control}
                render={({ field }) => (
                  <ImageUploader
                    value={field.value}
                    onChange={field.onChange}
                    className="h-fit w-[300px]"
                  />
                )}
              />
            </div>

            <div className="flex flex-col gap-2">
              <Label className="font-bold">Image Alt Tag</Label>
              <Input
                type="text"
                placeholder="Alt Tag"
                {...register("thirdSection.imageAlt")}
              />
            </div>

            <div className="flex flex-col gap-2">
              <Label className="font-bold">Button Text</Label>
              <Input
                type="text"
                placeholder="Button Text"
                {...register("thirdSection.buttonText")}
              />
            </div>

            <div className="flex flex-col gap-2">
              <Label className="font-bold">Button Link</Label>
              <Input
                type="text"
                placeholder="Button Link"
                {...register("thirdSection.buttonLink")}
              />
            </div>
          </div>
        </AccordionSection>

        {/* ---------------- Fourth Section ---------------- */}
        <AccordionSection
          title="Fourth Section"
          sectionKey="fourthSection"
          openSection={openSection}
          setOpenSection={setOpenSection}
        >
          <div className="flex flex-col gap-2 rounded-md p-5">
            <div className="flex flex-col gap-2">
              <Label className="font-bold">Title</Label>
              <Input
                type="text"
                placeholder="Title"
                {...register("fourthSection.title")}
              />
            </div>

            <div className="flex flex-col gap-2">
              <Label className="font-bold">Sub Title</Label>
              <Input
                type="text"
                placeholder="Sub Title"
                {...register("fourthSection.subTitle")}
              />
            </div>

            <div className="flex flex-col gap-1">
              <Label className="font-bold">Description</Label>
              <Textarea
                placeholder="Description"
                {...register("fourthSection.description")}
              />
            </div>
          </div>
        </AccordionSection>

        {/* ---------------- Fifth Section ---------------- */}
        <AccordionSection
          title="Fifth Section"
          sectionKey="fifthSection"
          openSection={openSection}
          setOpenSection={setOpenSection}
        >
          <div className="flex flex-col gap-2 rounded-md p-5">
            <div className="flex flex-col gap-2">
              <Label className="font-bold">Title</Label>
              <Input
                type="text"
                placeholder="Title"
                {...register("fifthSection.title")}
              />
            </div>
            <div className="flex flex-col gap-2">
              <Label className="font-bold">Sub Title</Label>
              <Input
                type="text"
                placeholder="Sub Title"
                {...register("fifthSection.subTitle")}
              />
            </div>
            <div className="flex flex-col gap-1">
              <Label className="font-bold">Description</Label>
              <Textarea
                placeholder="Description"
                {...register("fifthSection.description")}
              />
            </div>
            <div>
              <div className="mb-3 flex justify-between">
                <Label className="font-bold">Items</Label>
                <Button
                  className="bg-green-600 text-white"
                  type="button"
                  onClick={() => setReorderMode(!reorderMode)}
                >
                  {reorderMode ? <GiConfirmed /> : <TbReorder />}
                </Button>
              </div>
              <div className="flex flex-col gap-5 rounded-md border border-black/20 p-2">
                <DndContext
                  collisionDetection={closestCorners}
                  onDragEnd={createDragEndHandler(
                    fifthSectionItems,
                    fifthSectionMove,
                  )}
                >
                  <SortableContext
                    items={fifthSectionItems.map((field) => field.id)}
                    strategy={verticalListSortingStrategy}
                  >
                    {fifthSectionItems.map((field, index) => (
                      <SortableItem
                        key={field.id}
                        id={field.id}
                        reorderMode={reorderMode}
                      >
                        {reorderMode ? (
                          <span className="font-medium">
                            {watch(`fifthSection.items.${index}.title`) ||
                              `Item ${index + 1}`}
                          </span>
                        ) : (
                          <>
                            <div className="absolute right-2 top-2">
                              <RiDeleteBinLine
                                onClick={() => fifthSectionRemove(index)}
                                className="cursor-pointer text-red-600"
                              />
                            </div>

                            <div className="flex flex-col gap-2">
                              <Label className="font-bold">Image</Label>
                              <Controller
                                name={`fifthSection.items.${index}.image`}
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
                                  `fifthSection.items.${index}.imageAlt`,
                                )}
                              />
                            </div>

                            <div className="flex flex-col gap-2">
                              <Label className="font-bold">Title</Label>
                              <Input
                                type="text"
                                placeholder="Title"
                                {...register(
                                  `fifthSection.items.${index}.title`,
                                )}
                              />
                            </div>
                            <div className="flex flex-col gap-2">
                              <Label className="font-bold">Link</Label>
                              <Input
                                type="text"
                                placeholder="Link"
                                {...register(
                                  `fifthSection.items.${index}.link`,
                                )}
                              />
                            </div>

                            <div className="flex flex-col gap-2">
                              <Label className="font-bold">Description</Label>
                              <Textarea
                                placeholder="Description"
                                {...register(
                                  `fifthSection.items.${index}.description`,
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
                  onClick={() =>
                    fifthSectionAppend({
                      _id: "",
                      image: "",
                      imageAlt: "",
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

        {/* ---------------- Sixth Section ---------------- */}
        <AccordionSection
          title="Sixth Section"
          sectionKey="sixthSection"
          openSection={openSection}
          setOpenSection={setOpenSection}
        >
          <div className="flex flex-col gap-2 rounded-md p-5">
            <div className="flex flex-col gap-2">
              <Label className="font-bold">Title</Label>
              <Input
                type="text"
                placeholder="Title"
                {...register("sixthSection.title")}
              />
            </div>

            <div>
              <div className="mb-3 flex justify-between">
                <Label className="font-bold">Items</Label>
                <Button
                  className="bg-green-600 text-white"
                  type="button"
                  onClick={() => setReorderMode(!reorderMode)}
                >
                  {reorderMode ? <GiConfirmed /> : <TbReorder />}
                </Button>
              </div>
              <div className="flex flex-col gap-5 rounded-md border border-black/20 p-2">
                <DndContext
                  collisionDetection={closestCorners}
                  onDragEnd={createDragEndHandler(
                    sixthSectionItems,
                    sixthSectionMove,
                  )}
                >
                  <SortableContext
                    items={sixthSectionItems.map((field) => field.id)}
                    strategy={verticalListSortingStrategy}
                  >
                    {sixthSectionItems.map((field, index) => (
                      <SortableItem
                        key={field.id}
                        id={field.id}
                        reorderMode={reorderMode}
                      >
                        {reorderMode ? (
                          <span className="font-medium">
                            {watch(`sixthSection.items.${index}.title`) ||
                              `Item ${index + 1}`}
                          </span>
                        ) : (
                          <>
                            <div className="absolute right-2 top-2">
                              <RiDeleteBinLine
                                onClick={() => sixthSectionRemove(index)}
                                className="cursor-pointer text-red-600"
                              />
                            </div>

                            <div className="flex flex-col gap-2">
                              <Label className="font-bold">Image</Label>
                              <Controller
                                name={`sixthSection.items.${index}.image`}
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
                                  `sixthSection.items.${index}.imageAlt`,
                                )}
                              />
                            </div>

                            <div className="flex flex-col gap-2">
                              <Label className="font-bold">Title</Label>
                              <Input
                                type="text"
                                placeholder="Title"
                                {...register(
                                  `sixthSection.items.${index}.title`,
                                )}
                              />
                            </div>

                            <div className="flex flex-col gap-2">
                              <Label className="font-bold">Description</Label>
                              <Textarea
                                placeholder="Description"
                                {...register(
                                  `sixthSection.items.${index}.description`,
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
                  onClick={() =>
                    sixthSectionAppend({
                      id: "",
                      title: "",
                      image: "",
                      imageAlt: "",
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

        {/* ---------------- Seventh Section ---------------- */}
        <AccordionSection
          title="Seventh Section"
          sectionKey="seventhSection"
          openSection={openSection}
          setOpenSection={setOpenSection}
        >
          <div className="flex flex-col gap-2 rounded-md p-5">
            <div className="flex flex-col gap-2">
              <Label className="font-bold">Title</Label>
              <Input
                type="text"
                placeholder="Title"
                {...register("seventhSection.title")}
              />
            </div>

            <div className="flex flex-col gap-2">
              <Label className="font-bold">Sub Title</Label>
              <Input
                type="text"
                placeholder="Sub Title"
                {...register("seventhSection.subTitle")}
              />
            </div>

            <div>
              <div className="mb-3 flex justify-between">
                <Label className="font-bold">Items</Label>
                <Button
                  className="bg-green-600 text-white"
                  type="button"
                  onClick={() => setReorderMode(!reorderMode)}
                >
                  {reorderMode ? <GiConfirmed /> : <TbReorder />}
                </Button>
              </div>
              <div className="flex flex-col gap-5 rounded-md border border-black/20 p-2">
                <DndContext
                  collisionDetection={closestCorners}
                  onDragEnd={createDragEndHandler(
                    seventhSectionItems,
                    seventhSectionMove,
                  )}
                >
                  <SortableContext
                    items={seventhSectionItems.map((field) => field.id)}
                    strategy={verticalListSortingStrategy}
                  >
                    {seventhSectionItems.map((field, index) => (
                      <SortableItem
                        key={field.id}
                        id={field.id}
                        reorderMode={reorderMode}
                      >
                        {reorderMode ? (
                          <span className="font-medium">
                            {watch(`seventhSection.items.${index}.title`) ||
                              `Item ${index + 1}`}
                          </span>
                        ) : (
                          <>
                            <div className="absolute right-2 top-2">
                              <RiDeleteBinLine
                                onClick={() => seventhSectionRemove(index)}
                                className="cursor-pointer text-red-600"
                              />
                            </div>

                            <div className="col-span-2 flex flex-col gap-2">
                              <Label className="font-bold">Title</Label>
                              <Input
                                type="text"
                                placeholder="Title"
                                {...register(
                                  `seventhSection.items.${index}.title`,
                                )}
                              />
                            </div>

                            <div className="flex flex-col gap-2">
                              <Label className="font-bold">Image</Label>
                              <Controller
                                name={`seventhSection.items.${index}.image`}
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
                                  `seventhSection.items.${index}.imageAlt`,
                                )}
                              />
                            </div>

                            <div className="flex flex-col gap-2">
                              <Label className="font-bold">Link</Label>
                              <Input
                                type="text"
                                placeholder="Alt Tag"
                                {...register(
                                  `seventhSection.items.${index}.link`,
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
                  onClick={() =>
                    seventhSectionAppend({
                      _id: "",
                      title: "",
                      image: "",
                      imageAlt: "",
                      link: "",
                    })
                  }
                >
                  Add Item
                </Button>
              </div>
            </div>
          </div>
        </AccordionSection>

        {/* ---------------- Eighth Section ---------------- */}
        <AccordionSection
          title="Eighth Section"
          sectionKey="eighthSection"
          openSection={openSection}
          setOpenSection={setOpenSection}
        >
          <div className="flex flex-col gap-2 rounded-md p-5">
            <div className="flex flex-col gap-2">
              <Label className="font-bold">Title</Label>
              <Input
                type="text"
                placeholder="Title"
                {...register("eighthSection.title")}
              />
            </div>

            <div className="flex flex-col gap-2">
              <Label className="font-bold">Sub Title</Label>
              <Input
                type="text"
                placeholder="Sub Title"
                {...register("eighthSection.subTitle")}
              />
            </div>

            <div>
              <div className="mb-3 flex justify-between">
                <Label className="font-bold">Items</Label>
                <Button
                  className="bg-green-600 text-white"
                  type="button"
                  onClick={() => setReorderMode(!reorderMode)}
                >
                  {reorderMode ? <GiConfirmed /> : <TbReorder />}
                </Button>
              </div>
              <div className="flex flex-col gap-5 rounded-md border border-black/20 p-2">
                <DndContext
                  collisionDetection={closestCorners}
                  onDragEnd={createDragEndHandler(
                    eighthSectionItems,
                    eighthSectionMove,
                  )}
                >
                  <SortableContext
                    items={eighthSectionItems.map((field) => field.id)}
                    strategy={verticalListSortingStrategy}
                  >
                    {eighthSectionItems.map((field, index) => (
                      <SortableItem
                        key={field.id}
                        id={field.id}
                        reorderMode={reorderMode}
                      >
                        {reorderMode ? (
                          <span className="font-medium">
                            {watch(`eighthSection.items.${index}.title`) ||
                              `Item ${index + 1}`}
                          </span>
                        ) : (
                          <>
                            <div className="absolute right-2 top-2">
                              <RiDeleteBinLine
                                onClick={() => eighthSectionRemove(index)}
                                className="cursor-pointer text-red-600"
                              />
                            </div>

                            <div className="col-span-2 flex flex-col gap-2">
                              <Label className="font-bold">Title</Label>
                              <Input
                                type="text"
                                placeholder="Title"
                                {...register(
                                  `eighthSection.items.${index}.title`,
                                )}
                              />
                            </div>

                            <div className="col-span-2 flex flex-col gap-2">
                              <Label className="font-bold">Description</Label>
                              <Textarea
                                placeholder="Description"
                                {...register(
                                  `eighthSection.items.${index}.description`,
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
                  onClick={() =>
                    eighthSectionAppend({
                      _id: "",
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
        {/* ---------------- ninth Section ---------------- */}
        <AccordionSection
          title="Ninth Section"
          sectionKey="ninthSection"
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
                  {...register(`ninthSection.title`)}
                />
                {/* {errors.ninthSection?.title && <p className='text-red-500'>{errors.tenthSection?.title.message}</p>} */}
              </div>
            </div>

            <div>
              <Label className="font-bold">Industries</Label>
              <Controller
                name="ninthSection.serviceIndustries"
                control={control}
                render={({ field }) => (
                  <div className="mt-2 grid grid-cols-2 gap-3 rounded-md border border-black/20 p-3">
                    {serviceIndustries.map((ind) => (
                      <label
                        key={ind._id}
                        className="flex cursor-pointer items-center gap-2"
                      >
                        <input
                          type="checkbox"
                          checked={field.value?.includes(ind._id) ?? false}
                          onChange={() => {
                            const current = field.value ?? [];
                            const next = current.includes(ind._id)
                              ? current.filter((id: string) => id !== ind._id)
                              : [...current, ind._id];
                            field.onChange(next);
                          }}
                        />
                        {ind.image && (
                          // eslint-disable-next-line @next/next/no-img-element
                          <img
                            src={ind.image}
                            alt={ind.imageAlt}
                            className="h-6 w-6 rounded object-cover"
                          />
                        )}
                        <span>{ind.title}</span>
                      </label>
                    ))}
                  </div>
                )}
              />
            </div>
          </div>
        </AccordionSection>

        {/* ---------------- Tenth Section ---------------- */}
        <AccordionSection
          title="Tenth Section"
          sectionKey="tenthSection"
          openSection={openSection}
          setOpenSection={setOpenSection}
        >
          <div className="flex flex-col gap-2 rounded-md p-5">
            <div className="flex flex-col gap-2">
              <Label className="font-bold">Title</Label>
              <Input
                type="text"
                placeholder="Title"
                {...register("tenthSection.tag")}
              />
            </div>

            <div className="flex flex-col gap-2">
              <Label className="font-bold">Sub Title</Label>
              <Input
                type="text"
                placeholder="Sub Title"
                {...register("tenthSection.title")}
              />
            </div>

            <div className="flex flex-col gap-1">
              <Label className="font-bold">Description</Label>
              <Textarea
                placeholder="Description"
                {...register("tenthSection.description")}
              />
            </div>

            <div>
              <div className="mb-3 flex justify-between">
                <Label className="font-bold">Items</Label>
                <Button
                  className="bg-green-600 text-white"
                  type="button"
                  onClick={() => setReorderMode(!reorderMode)}
                >
                  {reorderMode ? <GiConfirmed /> : <TbReorder />}
                </Button>
              </div>
              <div className="flex flex-col gap-5 rounded-md border border-black/20 p-2">
                <DndContext
                  collisionDetection={closestCorners}
                  onDragEnd={createDragEndHandler(
                    tenthSectionItems,
                    tenthSectionMove,
                  )}
                >
                  <SortableContext
                    items={tenthSectionItems.map((field) => field.id)}
                    strategy={verticalListSortingStrategy}
                  >
                    {tenthSectionItems.map((field, index) => (
                      <SortableItem
                        key={field.id}
                        id={field.id}
                        reorderMode={reorderMode}
                      >
                        {reorderMode ? (
                          <span className="font-medium">
                            {watch(`tenthSection.items.${index}.label`) ||
                              `Item ${index + 1}`}
                          </span>
                        ) : (
                          <>
                            <div className="absolute right-2 top-2">
                              <RiDeleteBinLine
                                onClick={() => tenthSectionRemove(index)}
                                className="cursor-pointer text-red-600"
                              />
                            </div>

                            <div className="flex flex-col gap-2">
                              <Label className="font-bold">Value</Label>
                              <Input
                                type="text"
                                placeholder="Value"
                                {...register(
                                  `tenthSection.items.${index}.value`,
                                )}
                              />
                            </div>

                            <div className="flex flex-col gap-2">
                              <Label className="font-bold">Label</Label>
                              <Input
                                type="text"
                                placeholder="Label"
                                {...register(
                                  `tenthSection.items.${index}.label`,
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
                  onClick={() =>
                    tenthSectionAppend({
                      id: Date.now(),
                      value: "",
                      label: "",
                    })
                  }
                >
                  Add Item
                </Button>
              </div>
            </div>
          </div>
        </AccordionSection>

        {/* ---------------- Eleventh Section ---------------- */}
        <AccordionSection
          title="Eleventh Section"
          sectionKey="eleventhSection"
          openSection={openSection}
          setOpenSection={setOpenSection}
        >
          <div className="flex flex-col gap-5 rounded-md p-5">
            {/* Section Title */}
            <div className="flex flex-col gap-2">
              <Label className="font-bold">Title</Label>
              <Input
                type="text"
                placeholder="Title"
                {...register("eleventhSection.title")}
              />
            </div>

            {/* Section Description */}
            <div className="flex flex-col gap-1">
              <Label className="font-bold">Description</Label>
              <Textarea
                placeholder="Description"
                {...register("eleventhSection.description")}
              />
            </div>

            {/* Item */}
            <div className="rounded-md border border-black/20 p-4">
              <div className="flex flex-col gap-5">
                {/* Item Title */}
                <div className="flex flex-col gap-2">
                  <Label className="font-bold">Item Title</Label>
                  <Input
                    type="text"
                    placeholder="Item Title"
                    {...register("eleventhSection.items.title")}
                  />
                </div>

                {/* Item Description */}
                <div className="flex flex-col gap-2">
                  <Label className="font-bold">Item Description</Label>
                  <Textarea
                    placeholder="Item Description"
                    {...register("eleventhSection.items.description")}
                  />
                </div>

                {/* Image */}
                <div className="flex flex-col gap-2">
                  <Label className="font-bold">Image</Label>

                  <Controller
                    name="eleventhSection.items.image"
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

                {/* Alt Tag */}
                <div className="flex flex-col gap-2">
                  <Label className="font-bold">Alt Tag</Label>
                  <Input
                    type="text"
                    placeholder="Alt Tag"
                    {...register("eleventhSection.items.imageAlt")}
                  />
                </div>

                {/* Link */}
                <div className="flex flex-col gap-2">
                  <Label className="font-bold">Link</Label>
                  <Input
                    type="text"
                    placeholder="Link"
                    {...register("eleventhSection.items.link")}
                  />
                </div>
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
              <Label className="font-bold">Title Red</Label>
              <Input
                type="text"
                placeholder="Title Red"
                {...register("ctaSection.titleRed")}
              />
            </div>

            <div className="flex flex-col gap-2">
              <Label className="font-bold">Title</Label>
              <Input
                type="text"
                placeholder="Title"
                {...register("ctaSection.title")}
              />
            </div>

            <div className="flex flex-col gap-1">
              <Label className="font-bold">Description</Label>
              <Textarea
                placeholder="Description"
                {...register("ctaSection.description")}
              />
            </div>

            <div className="flex flex-col gap-1">
              <Label className="font-bold">Button Text</Label>
              <Input
                type="text"
                placeholder="Button Text"
                {...register("ctaSection.buttonText")}
              />
            </div>

            <div className="flex flex-col gap-1">
              <Label className="font-bold">Button Link</Label>
              <Input
                type="text"
                placeholder="Button Link"
                {...register("ctaSection.buttonLink")}
              />
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
              <Label className="font-bold">Title</Label>
              <Input
                type="text"
                placeholder="Title"
                {...register("faqSection.title")}
              />
            </div>

            <div>
              <div className="mb-3 flex justify-between">
                <Label className="font-bold">Items</Label>
                <Button
                  className="bg-green-600 text-white"
                  type="button"
                  onClick={() => setReorderMode(!reorderMode)}
                >
                  {reorderMode ? <GiConfirmed /> : <TbReorder />}
                </Button>
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
                            {watch(`faqSection.data.${index}.title`) ||
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
                              <Label className="font-bold">Title</Label>
                              <Input
                                type="text"
                                placeholder="Title"
                                {...register(`faqSection.data.${index}.title`)}
                              />
                            </div>

                            <div className="col-span-2 flex flex-col gap-2">
                              <Label className="font-bold">Description</Label>
                              <Textarea
                                placeholder="Description"
                                {...register(
                                  `faqSection.data.${index}.description`,
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
                  onClick={() =>
                    faqSectionAppend({ id: "", title: "", description: "" })
                  }
                >
                  Add Item
                </Button>
              </div>
            </div>
          </div>
        </AccordionSection>

        <SeoFields<ServicePillarData>
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

export default ServicePillarPage;
