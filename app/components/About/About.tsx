"use client"

import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import React, { useEffect, useState } from 'react'

import { useForm, useFieldArray, Controller } from "react-hook-form";
import { Button } from '@/components/ui/button'
import { ImageUploader } from '@/components/ui/image-uploader'
import { RiDeleteBinLine } from "react-icons/ri";
import { FiChevronDown } from "react-icons/fi";
import AdminItemContainer from '@/app/components/common/AdminItemContainer';
import SeoFields from '@/app/components/common/SeoFields';
import { SeoFormValues } from '@/app/types/seo';
import { GiConfirmed } from 'react-icons/gi';
import { TbReorder } from "react-icons/tb";
import { RxDragHandleDots2 } from "react-icons/rx";
import { closestCorners, DndContext, DragEndEvent } from '@dnd-kit/core'
import { SortableContext, verticalListSortingStrategy, useSortable } from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'

export interface AboutFormProps {
    seo: SeoFormValues
    teamSection: {
        title: string;
        items: {
            image: string;
            imageAlt: string;
            name: string;
            designation: string;
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
            <Label main><div className='flex justify-between w-full'>
                <div>{title}</div>
                <button
                type="button"
                onClick={() => setOpenSection(isOpen ? null : sectionKey)}
                className="flex items-center justify-between pr-5"
            >
                <FiChevronDown
                    className={`text-xl transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}
                />
            </button>
            </div>
            </Label>


            {isOpen && (
                <div className="pt-3">
                    {children}
                </div>
            )}
        </AdminItemContainer>
    );
};

const SortableTeamItem = ({
    id,
    reorderMode,
    children,
}: {
    id: string;
    reorderMode: boolean;
    children: React.ReactNode;
}) => {
    const { attributes, listeners, setNodeRef, transform, transition } = useSortable({ id });

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
                className='flex items-center gap-2 bg-white border border-black/20 rounded-md px-3 py-2 cursor-grab touch-none'
            >
                <RxDragHandleDots2 className='text-xl text-gray-500 flex-shrink-0' />
                {children}
            </div>
        );
    }

    return (
        <div
            ref={setNodeRef}
            style={style}
            className='grid grid-cols-2 gap-2 relative border-b border-black/20 pb-5 last:border-b-0 bg-white'
        >
            {children}
        </div>
    );
};

const AboutPage = () => {

    const { register, handleSubmit, setValue, watch, control, formState: { errors } } = useForm<AboutFormProps>();

    const {
        fields: teamSectionItems,
        append: teamSectionAppend,
        remove: teamSectionRemove,
        move: teamSectionMove,
    } = useFieldArray({
        control,
        name: "teamSection.items"
    });

    const [reorderMode, setReorderMode] = useState(false);

    // Which top-level section accordion is open. Default to team section open.
    const [openSection, setOpenSection] = useState<string | null>("teamSection");

    const handleAddAbout = async (data: AboutFormProps) => {
        try {
            const response = await fetch(`/api/about`, {
                method: "PATCH",
                body: JSON.stringify(data),
            });
            if (response.ok) {
                const data = await response.json();
                alert(data.message);
                // router.push("/admin/commitment");
            }
        } catch (error) {
            console.log("Error in adding about", error);
        }
    }

    const fetchAboutData = async () => {
        try {
            const response = await fetch(`/api/about`);
            if (response.ok) {
                const data = await response.json();
                setValue("seo", data.data?.seo);
                setValue("teamSection", data.data?.teamSection ?? { items: [] });
                setValue("teamSection.items", data.data?.teamSection?.items ?? []);
            } else {
                const data = await response.json();
                alert(data.message);
            }
        } catch (error) {
            console.log("Error in fetching about data", error);
        }
    }

    const handleDragEnd = (event: DragEndEvent) => {
        const { active, over } = event;

        if (!over || active.id === over.id) return;

        const oldIndex = teamSectionItems.findIndex((item) => item.id === active.id);
        const newIndex = teamSectionItems.findIndex((item) => item.id === over.id);

        if (oldIndex === -1 || newIndex === -1) return;
        teamSectionMove(oldIndex, newIndex);
    };

    useEffect(() => {
        fetchAboutData();
    }, []);


    return (
        <div className='flex flex-col gap-5'>
            <form className='flex flex-col gap-5' onSubmit={handleSubmit(handleAddAbout)}>

                <AccordionSection
                    title="Team Section"
                    sectionKey="teamSection"
                    openSection={openSection}
                    setOpenSection={setOpenSection}
                >
                    <div className='p-5 rounded-md flex flex-col gap-2'>
                        <div className='flex flex-col gap-2'>
                            <div className='flex flex-col gap-2'>
                                <Label className='font-bold'>Title</Label>
                                <Input type='text' placeholder='Title' {...register(`teamSection.title`, {
                                    required: "Value is required"
                                })} />
                                {errors.teamSection?.title && <p className='text-red-500'>{errors.teamSection?.title.message}</p>}
                            </div>
                        </div>
                        <div>
                            <div className='flex justify-between mb-3'>
                                <Label className='font-bold'>Items</Label>
                                {<Button className="bg-green-600 text-white" type="button" onClick={() => setReorderMode(!reorderMode)}>{reorderMode ? <GiConfirmed /> : <TbReorder />}</Button>}
                            </div>
                            <div className='border border-black/20 p-2 rounded-md flex flex-col gap-5'>

                                <DndContext collisionDetection={closestCorners} onDragEnd={handleDragEnd}>
                                    <SortableContext
                                        items={teamSectionItems.map((field) => field.id)}
                                        strategy={verticalListSortingStrategy}
                                    >
                                        {teamSectionItems.map((field, index) => (
                                            <SortableTeamItem key={field.id} id={field.id} reorderMode={reorderMode}>
                                                {reorderMode ? (
                                                    <span className='font-medium'>
                                                        {watch(`teamSection.items.${index}.name`) || `Member ${index + 1}`}
                                                    </span>
                                                ) : (
                                                    <>
                                                        <div className='absolute top-2 right-2'>
                                                            <RiDeleteBinLine onClick={() => teamSectionRemove(index)} className='cursor-pointer text-red-600' />
                                                        </div>

                                                        <div className='flex flex-col gap-2'>
                                                            <div className='flex flex-col gap-2'>
                                                                <Label className='font-bold'>Image</Label>
                                                                <Controller
                                                                    name={`teamSection.items.${index}.image`}
                                                                    control={control}
                                                                    rules={{ required: "Image is required" }}
                                                                    render={({ field }) => (
                                                                        <ImageUploader
                                                                            value={field.value}
                                                                            onChange={field.onChange}
                                                                            className='w-[200px] h-[200px]'
                                                                        />
                                                                    )}
                                                                />
                                                                {errors.teamSection?.items?.[index]?.image && (
                                                                    <p className="text-red-500">{errors.teamSection?.items?.[index]?.image.message}</p>
                                                                )}
                                                            </div>

                                                            <div className='flex flex-col gap-2'>
                                                                <Label className='font-bold'>Alt Tag</Label>
                                                                <Input type='text' placeholder='Alt Tag' {...register(`teamSection.items.${index}.imageAlt`, {
                                                                    required: "Alt Tag is required"
                                                                })} />
                                                                {errors.teamSection?.items?.[index]?.imageAlt && <p className='text-red-500'>{errors.teamSection?.items?.[index]?.imageAlt.message}</p>}
                                                            </div>
                                                        </div>

                                                        <div className='flex flex-col gap-2'>
                                                            <div className='flex flex-col gap-2'>
                                                                <Label className='font-bold'>Name</Label>
                                                                <Input type='text' placeholder='Name' {...register(`teamSection.items.${index}.name`, {
                                                                    required: "Name is required"
                                                                })} />
                                                                {errors.teamSection?.items?.[index]?.name && <p className='text-red-500'>{errors.teamSection?.items?.[index]?.name.message}</p>}
                                                            </div>

                                                            <div className='flex flex-col gap-2'>
                                                                <Label className='font-bold'>Designation</Label>
                                                                <Input type='text' placeholder='Designation' {...register(`teamSection.items.${index}.designation`, {
                                                                    required: "Designation is required"
                                                                })} />
                                                                {errors.teamSection?.items?.[index]?.designation && <p className='text-red-500'>{errors.teamSection?.items?.[index]?.designation.message}</p>}
                                                            </div>
                                                        </div>
                                                    </>
                                                )}
                                            </SortableTeamItem>
                                        ))}
                                    </SortableContext>
                                </DndContext>

                            </div>
                            <div className='flex justify-end mt-2'>
                                <Button type='button' addItem onClick={() => teamSectionAppend({ image: "", imageAlt: "", name: "", designation: "" })}>Add Item</Button>
                            </div>
                        </div>

                    </div>
                </AccordionSection>

                {/* When you add future sections, wrap each in its own AccordionSection with a unique sectionKey, e.g.:
                <AccordionSection title="Hero Section" sectionKey="heroSection" openSection={openSection} setOpenSection={setOpenSection}>
                    ... hero section fields ...
                </AccordionSection>
                */}

                <SeoFields<AboutFormProps> control={control} register={register} errors={errors} />

                <div className='flex'>
                    <Button type='submit' className="cursor-pointer text-white text-[16px] w-full">Submit</Button>
                </div>

            </form>
        </div>
    )
}

export default AboutPage