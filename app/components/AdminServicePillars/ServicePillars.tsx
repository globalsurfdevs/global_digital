"use client";

import type { ReactNode } from "react";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { Controller, useFieldArray, useForm } from "react-hook-form";
import { closestCorners, DndContext } from "@dnd-kit/core";
import {
  SortableContext,
  verticalListSortingStrategy,
  useSortable,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { FiChevronDown } from "react-icons/fi";
import { RiDeleteBinLine } from "react-icons/ri";
import { RxDragHandleDots2 } from "react-icons/rx";
import { Button } from "@/components/ui/button";
import { ImageUploader } from "@/components/ui/image-uploader";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import AdminItemContainer from "@/app/components/common/AdminItemContainer";
import SeoFields from "@/app/components/common/SeoFields";
import { ServicePillarData } from "../ServicePillar/type";

export interface ServicePillarProps extends ServicePillarData {}

type FieldName = string;
type Register = ReturnType<typeof useForm<ServicePillarProps>>["register"];
type Control = ReturnType<typeof useForm<ServicePillarProps>>["control"];

type SectionProps = {
  title: string;
  sectionKey: string;
  openSection: string | null;
  setOpenSection: (key: string | null) => void;
  children: ReactNode;
};

const AccordionSection = ({
  title,
  sectionKey,
  openSection,
  setOpenSection,
  children,
}: SectionProps) => {
  const isOpen = openSection === sectionKey;

  return (
    <AdminItemContainer>
      <Label main isOpen={isOpen ? "open" : ""}>
        <div className="flex w-full justify-between">
          <span>{title}</span>
          <button
            type="button"
            onClick={() => setOpenSection(isOpen ? null : sectionKey)}
            className="pr-5"
            aria-label={`Toggle ${title}`}
          >
            <FiChevronDown
              className={`text-xl transition-transform ${isOpen ? "rotate-180" : ""}`}
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
  children,
}: {
  id: string;
  children: ReactNode;
}) => {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id });

  return (
    <div
      ref={setNodeRef}
      style={{
        transform: CSS.Transform.toString(transform),
        transition,
      }}
      className="relative grid gap-3 border-b border-black/20 bg-white pb-4 last:border-0"
    >
      <button
        type="button"
        {...attributes}
        {...listeners}
        className="absolute left-0 top-0 cursor-grab text-gray-500 active:cursor-grabbing"
        aria-label="Drag to reorder"
      >
        <RxDragHandleDots2 />
      </button>
      <div className="pl-6">{children}</div>
    </div>
  );
};

const TextField = ({
  label,
  name,
  register,
  multiline = false,
}: {
  label: string;
  name: FieldName;
  register: Register;
  multiline?: boolean;
}) => (
  <div className="flex flex-col gap-2">
    <Label className="font-bold">{label}</Label>
    {multiline ? (
      <Textarea {...register(name as never)} />
    ) : (
      <Input type="text" {...register(name as never)} />
    )}
  </div>
);

const ImageField = ({
  label,
  name,
  control,
}: {
  label: string;
  name: FieldName;
  control: Control;
}) => (
  <div className="flex flex-col gap-2">
    <Label className="font-bold">{label}</Label>
    <Controller
      name={name as never}
      control={control}
      render={({ field }) => (
        <ImageUploader
          value={field.value ?? ""}
          onChange={field.onChange}
          className="h-fit w-[300px]"
        />
      )}
    />
  </div>
);

const AdminServicePillarPage = () => {
  const params = useParams<{ id?: string }>();
  const slug = params?.id || "service-pillar";
  const [openSection, setOpenSection] = useState<string | null>("firstSection");
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");
  const [mounted, setMounted] = useState(false);

  const {
    register,
    handleSubmit,
    setValue,
    control,
    formState: { errors },
  } = useForm<ServicePillarProps>();

  const fifthSection = useFieldArray({ control, name: "fifthSection.items" });
  const sixthSection = useFieldArray({ control, name: "sixthSection.items" });
  const seventhSection = useFieldArray({
    control,
    name: "seventhSection.items",
  });
  const eighthSection = useFieldArray({ control, name: "eighthSection.items" });
  const ninthSection = useFieldArray({
    control,
    name: "ninthSection.serviceIndustries",
  });
  const tenthSection = useFieldArray({ control, name: "tenthSection.items" });
  const eleventhSection = useFieldArray({
    control,
    name: "eleventhSection.items",
  });
  const faqSection = useFieldArray({ control, name: "faqSection.data" });

  useEffect(() => {
    setMounted(true);

    const load = async () => {
      try {
        const response = await fetch(
          `/api/service-pillar?slug=${encodeURIComponent(slug)}`,
        );
        if (!response.ok) throw new Error("Unable to load Service Pillar");
        const result = await response.json();
        const data = result.data as ServicePillarProps;

        Object.entries(data).forEach(([key, value]) =>
          setValue(key as never, value as never),
        );
        setValue("fifthSection.items", data.fifthSection?.items ?? []);
        setValue("sixthSection.items", data.sixthSection?.items ?? []);
        setValue("seventhSection.items", data.seventhSection?.items ?? []);
        setValue("eighthSection.items", data.eighthSection?.items ?? []);
        setValue(
          "ninthSection.serviceIndustries",
          data.ninthSection?.serviceIndustries ?? [],
        );
        setValue("tenthSection.items", data.tenthSection?.items ?? []);
        setValue("eleventhSection.items", data.eleventhSection?.items ?? []);
        setValue("faqSection.data", data.faqSection?.data ?? []);
      } catch (error) {
        setMessage(
          error instanceof Error
            ? error.message
            : "Unable to load Service Pillar",
        );
      }
    };
    load();
  }, [setValue, slug]);

  if (!mounted) {
    return <div className="p-5">Loading Service Pillar...</div>;
  }

  const save = async (data: ServicePillarProps) => {
    setSaving(true);
    setMessage("");
    try {
      const response = await fetch(
        `/api/service-pillar?slug=${encodeURIComponent(slug)}`,
        {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(data),
        },
      );
      const result = await response.json();
      if (!response.ok)
        throw new Error(result.message || "Unable to save Service Pillar");
      setMessage(result.message || "Service Pillar saved successfully");
    } catch (error) {
      setMessage(
        error instanceof Error
          ? error.message
          : "Unable to save Service Pillar",
      );
    } finally {
      setSaving(false);
    }
  };

  const itemEditor = (
    fields: any[],
    path: string,
    append: (value: Record<string, string>) => void,
    remove: (index: number) => void,
    move: (from: number, to: number) => void,
    empty: Record<string, string>,
    image = false,
  ) => (
    <div className="flex flex-col gap-3 rounded-md border border-black/20 p-3">
      <DndContext
        collisionDetection={closestCorners}
        onDragEnd={({ active, over }) => {
          if (!over || active.id === over.id) return;
          const oldIndex = fields.findIndex((field) => field.id === active.id);
          const newIndex = fields.findIndex((field) => field.id === over.id);
          if (oldIndex !== -1 && newIndex !== -1) move(oldIndex, newIndex);
        }}
      >
        <SortableContext
          items={fields.map((field) => field.id)}
          strategy={verticalListSortingStrategy}
        >
          {fields.map((field, index) => (
            <SortableItem key={field.id} id={field.id}>
              <button
                type="button"
                onClick={() => remove(index)}
                className="absolute right-0 top-0 z-10 text-red-600"
                aria-label="Remove item"
              >
                <RiDeleteBinLine />
              </button>
              {image && (
                <ImageField
                  label="Image"
                  name={`${path}.${index}.image`}
                  control={control}
                />
              )}
              {image && (
                <TextField
                  label="Image alt text"
                  name={`${path}.${index}.imageAlt`}
                  register={register}
                />
              )}
              {empty.icon !== undefined && (
                <ImageField
                  label="Icon"
                  name={`${path}.${index}.icon`}
                  control={control}
                />
              )}
              {empty.id !== undefined && (
                <TextField
                  label="ID"
                  name={`${path}.${index}.id`}
                  register={register}
                />
              )}
              {empty._id !== undefined && (
                <TextField
                  label="ID"
                  name={`${path}.${index}._id`}
                  register={register}
                />
              )}
              {empty.title !== undefined && (
                <TextField
                  label="Title"
                  name={`${path}.${index}.title`}
                  register={register}
                />
              )}
              {empty.description !== undefined && (
                <TextField
                  label="Description"
                  name={`${path}.${index}.description`}
                  register={register}
                  multiline
                />
              )}
              {empty.link !== undefined && (
                <TextField
                  label="Link"
                  name={`${path}.${index}.link`}
                  register={register}
                />
              )}
              {empty.page !== undefined && (
                <TextField
                  label="Page"
                  name={`${path}.${index}.page`}
                  register={register}
                />
              )}
              {empty.value !== undefined && (
                <TextField
                  label="Value"
                  name={`${path}.${index}.value`}
                  register={register}
                />
              )}
              {empty.label !== undefined && (
                <TextField
                  label="Label"
                  name={`${path}.${index}.label`}
                  register={register}
                />
              )}
            </SortableItem>
          ))}
        </SortableContext>
      </DndContext>
      <Button type="button" addItem onClick={() => append(empty)}>
        Add item
      </Button>
    </div>
  );

  const repeatable = (
    title: string,
    sectionKey: string,
    fields: { label: string; name: string; multiline?: boolean }[],
    array: any,
    path: string,
    empty: Record<string, string>,
    image = false,
  ) => (
    <AccordionSection
      title={title}
      sectionKey={sectionKey}
      openSection={openSection}
      setOpenSection={setOpenSection}
    >
      <div className="flex flex-col gap-3 rounded-md p-5">
        {fields.map((field) => (
          <TextField key={field.name} {...field} register={register} />
        ))}
        {itemEditor(
          array.fields,
          path,
          array.append,
          array.remove,
          array.move,
          empty,
          image,
        )}
      </div>
    </AccordionSection>
  );

  return (
    <div className="flex flex-col gap-5 pb-5">
      <form className="flex flex-col gap-5" onSubmit={handleSubmit(save)}>

        <AccordionSection
          title="First section"
          sectionKey="firstSection"
          openSection={openSection}
          setOpenSection={setOpenSection}
        >
          <div className="flex flex-col gap-3 rounded-md p-5">
            <ImageField
              label="Image"
              name="firstSection.image"
              control={control}
            />
            <TextField
              label="Image alt text"
              name="firstSection.imageAlt"
              register={register}
            />
            <TextField
              label="Title"
              name="firstSection.title"
              register={register}
            />
            <TextField
              label="Description"
              name="firstSection.description"
              register={register}
              multiline
            />
          </div>
        </AccordionSection>

        <AccordionSection
          title="Second section"
          sectionKey="secondSection"
          openSection={openSection}
          setOpenSection={setOpenSection}
        >
          <div className="flex flex-col gap-3 rounded-md p-5">
            <TextField
              label="Title"
              name="secondSection.title"
              register={register}
            />
            <TextField
              label="Description"
              name="secondSection.description"
              register={register}
              multiline
            />
          </div>
        </AccordionSection>

        <AccordionSection
          title="Third section"
          sectionKey="thirdSection"
          openSection={openSection}
          setOpenSection={setOpenSection}
        >
          <div className="flex flex-col gap-3 rounded-md p-5">
            <TextField
              label="Title"
              name="thirdSection.title"
              register={register}
            />
            <TextField
              label="Subtitle"
              name="thirdSection.subTitle"
              register={register}
            />
            <TextField
              label="Description"
              name="thirdSection.description"
              register={register}
              multiline
            />
            <ImageField
              label="Image"
              name="thirdSection.image"
              control={control}
            />
            <TextField
              label="Image alt text"
              name="thirdSection.imageAlt"
              register={register}
            />
            <TextField
              label="Button text"
              name="thirdSection.buttonText"
              register={register}
            />
            <TextField
              label="Button link"
              name="thirdSection.buttonLink"
              register={register}
            />
          </div>
        </AccordionSection>

        <AccordionSection
          title="Fourth section"
          sectionKey="fourthSection"
          openSection={openSection}
          setOpenSection={setOpenSection}
        >
          <div className="flex flex-col gap-3 rounded-md p-5">
            <TextField
              label="Title"
              name="fourthSection.title"
              register={register}
            />
            <TextField
              label="Subtitle"
              name="fourthSection.subTitle"
              register={register}
            />
            <TextField
              label="Description"
              name="fourthSection.description"
              register={register}
              multiline
            />
          </div>
        </AccordionSection>

        {repeatable(
          "Fifth section",
          "fifthSection",
          [{ label: "Title", name: "fifthSection.title" }],
          fifthSection,
          "fifthSection.items",
          { _id: "", image: "", imageAlt: "", title: "", description: "" },
          true,
        )}
        {repeatable(
          "Sixth section",
          "sixthSection",
          [
            { label: "Title", name: "sixthSection.title" },
            { label: "Subtitle", name: "sixthSection.subTitle" },
          ],
          sixthSection,
          "sixthSection.items",
          { id: "", title: "", image: "", imageAlt: "", link: "" },
          true,
        )}
        {repeatable(
          "Seventh section",
          "seventhSection",
          [
            { label: "Title", name: "seventhSection.title" },
            { label: "Subtitle", name: "seventhSection.subTitle" },
          ],
          seventhSection,
          "seventhSection.items",
          { _id: "", title: "", description: "" },
        )}
        {repeatable(
          "Eighth section",
          "eighthSection",
          [
            { label: "Title", name: "eighthSection.title" },
            { label: "Subtitle", name: "eighthSection.subTitle" },
          ],
          eighthSection,
          "eighthSection.items",
          { _id: "", title: "", description: "" },
        )}
        {repeatable(
          "Ninth section: industries",
          "ninthSection",
          [{ label: "Title", name: "ninthSection.title" }],
          ninthSection,
          "ninthSection.serviceIndustries",
          { _id: "", image: "", imageAlt: "", title: "", page: "" },
          true,
        )}
        {repeatable(
          "Tenth section",
          "tenthSection",
          [
            { label: "Title", name: "tenthSection.title" },
            { label: "Subtitle", name: "tenthSection.subTitle" },
            {
              label: "Description",
              name: "tenthSection.description",
              multiline: true,
            },
          ],
          tenthSection,
          "tenthSection.items",
          { id: "", value: "", label: "" },
        )}
        {repeatable(
          "Eleventh section",
          "eleventhSection",
          [{ label: "Title", name: "eleventhSection.title" }],
          eleventhSection,
          "eleventhSection.items",
          { id: "", title: "", description: "", icon: "", link: "" },
        )}

        <AccordionSection
          title="CTA section"
          sectionKey="ctaSection"
          openSection={openSection}
          setOpenSection={setOpenSection}
        >
          <div className="flex flex-col gap-3 rounded-md p-5">
            <TextField
              label="Red title"
              name="ctaSection.titleRed"
              register={register}
            />
            <TextField
              label="Title"
              name="ctaSection.title"
              register={register}
            />
            <TextField
              label="Description"
              name="ctaSection.description"
              register={register}
              multiline
            />
            <TextField
              label="Button text"
              name="ctaSection.buttonText"
              register={register}
            />
            <TextField
              label="Button link"
              name="ctaSection.buttonLink"
              register={register}
            />
          </div>
        </AccordionSection>

        {repeatable(
          "FAQ section",
          "faqSection",
          [{ label: "Title", name: "faqSection.title" }],
          faqSection,
          "faqSection.data",
          { id: "", title: "", description: "" },
        )}

        <SeoFields<ServicePillarProps>
          control={control}
          register={register}
          errors={errors}
        />
        {message && <p className="text-sm text-gray-700">{message}</p>}
        <Button type="submit" disabled={saving} className="w-full text-white">
          {saving ? "Saving..." : "Save Service Pillar"}
        </Button>
      </form>
    </div>
  );
};

export default AdminServicePillarPage;
