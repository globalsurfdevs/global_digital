"use client"

import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import React, { useEffect, useState } from 'react'

import { useForm, useFieldArray, Controller, FieldError } from "react-hook-form";
import { Button } from '@/components/ui/button'
import { ImageUploader } from '@/components/ui/image-uploader'
import { RiDeleteBinLine } from "react-icons/ri";
import { FiChevronDown } from "react-icons/fi";
import AdminItemContainer from '@/app/components/common/AdminItemContainer';
import { GiConfirmed } from 'react-icons/gi';
import { TbReorder } from "react-icons/tb";
import { RxDragHandleDots2 } from "react-icons/rx";
import { closestCorners, DndContext, DragEndEvent } from '@dnd-kit/core'
import { SortableContext, verticalListSortingStrategy, useSortable } from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'
import { Textarea } from '@/components/ui/textarea';

export interface TestimonialsPageFormProps {
    testimonialSection: {
        title: string;
        starText: string;
        bottomText: string;
        items: {
            image: string;
            imageAlt: string;
            name: string;
            designation: string;
            message: string;
            companyLogo: string;
            companyLogoAlt: string;
            companyName: string;
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
            <Label main isOpen={isOpen ? "open" : ""}><div className='flex justify-between w-full'>
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

const SortableItem = ({
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

const TestimonialsPage = () => {

    const { register, handleSubmit, setValue, watch, control, formState: { errors } } = useForm<TestimonialsPageFormProps>();

    const {
        fields: testimonialSectionItems,
        append: testimonialSectionAppend,
        remove: testimonialSectionRemove,
        move: testimonialSectionMove,
    } = useFieldArray({
        control,
        name: "testimonialSection.items"
    });

    const [reorderMode, setReorderMode] = useState(false);

    // Which top-level section accordion is open.
    const [openSection, setOpenSection] = useState<string | null>("testimonialSection");

    const handleUpdateTestimonials = async (data: TestimonialsPageFormProps) => {
        try {
            const response = await fetch(`/api/testimonials`, {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(data),
            });
            const responseData = await response.json();
            if (response.ok) {
                alert(responseData.message);
            } else {
                alert(responseData.message);
            }
        } catch (error) {
            console.log("Error in updating testimonials", error);
        }
    }

    const fetchTestimonialsData = async () => {
        try {
            const response = await fetch(`/api/testimonials`);
            if (response.ok) {
                const data = await response.json();
                setValue("testimonialSection", data.data?.testimonialSection);
                setValue("testimonialSection.items", data.data?.testimonialSection?.items ?? []);
            } else {
                const data = await response.json();
                alert(data.message);
            }
        } catch (error) {
            console.log("Error in fetching testimonials data", error);
        }
    }

    // Factory for drag end handlers
    const createDragEndHandler = (
        fields: { id: string }[],
        move: (from: number, to: number) => void
    ) => (event: DragEndEvent) => {
        const { active, over } = event;

        if (!over || active.id === over.id) return;

        const oldIndex = fields.findIndex((item) => item.id === active.id);
        const newIndex = fields.findIndex((item) => item.id === over.id);

        if (oldIndex === -1 || newIndex === -1) return;
        move(oldIndex, newIndex);
    };

    useEffect(() => {
        fetchTestimonialsData();
    }, []);


    return (
        <div className='flex flex-col gap-5 pb-5'>
            <form className='flex flex-col gap-5' onSubmit={handleSubmit(handleUpdateTestimonials)}>

                {/* ---------------- Testimonial Section ---------------- */}
                <AccordionSection
                    title="Testimonial Section"
                    sectionKey="testimonialSection"
                    openSection={openSection}
                    setOpenSection={setOpenSection}
                >
                    <div className='p-5 rounded-md flex flex-col gap-2'>
                        <div className='flex flex-col gap-2'>
                            <div className='flex flex-col gap-2'>
                                <Label className='font-bold'>Title</Label>
                                <Input type='text' placeholder='Title' {...register(`testimonialSection.title`, {
                                    required: "Value is required"
                                })} />
                                {errors.testimonialSection?.title && <p className='text-red-500'>{errors.testimonialSection?.title.message}</p>}
                            </div>
                        </div>

                        <div className='flex flex-col gap-2'>
                            <div className='flex flex-col gap-2'>
                                <Label className='font-bold'>Star Text</Label>
                                <Input type='text' placeholder='Star Text' {...register(`testimonialSection.starText`, {
                                    required: "Star Text is required"
                                })} />
                                {errors.testimonialSection?.starText && <p className='text-red-500'>{errors.testimonialSection?.starText.message}</p>}
                            </div>
                        </div>

                        <div className='flex flex-col gap-2'>
                            <div className='flex flex-col gap-2'>
                                <Label className='font-bold'>Bottom Text</Label>
                                <Input type='text' placeholder='Bottom Text' {...register(`testimonialSection.bottomText`, {
                                    required: "Bottom Text is required"
                                })} />
                                {errors.testimonialSection?.bottomText && <p className='text-red-500'>{errors.testimonialSection?.bottomText.message}</p>}
                            </div>
                        </div>

                        <div>
                            <div className='flex justify-between mb-3'>
                                <Label className='font-bold'>Items</Label>
                                {<Button className="bg-green-600 text-white" type="button" onClick={() => setReorderMode(!reorderMode)}>{reorderMode ? <GiConfirmed /> : <TbReorder />}</Button>}
                            </div>
                            <div className='border border-black/20 p-2 rounded-md flex flex-col gap-5'>

                                <DndContext collisionDetection={closestCorners} onDragEnd={createDragEndHandler(testimonialSectionItems, testimonialSectionMove)}>
                                    <SortableContext
                                        items={testimonialSectionItems.map((field) => field.id)}
                                        strategy={verticalListSortingStrategy}
                                    >
                                        {testimonialSectionItems.map((field, index) => (
                                            <SortableItem key={field.id} id={field.id} reorderMode={reorderMode}>
                                                {reorderMode ? (
                                                    <span className='font-medium'>
                                                        {watch(`testimonialSection.items.${index}.name`) || `Testimonial ${index + 1}`}
                                                    </span>
                                                ) : (
                                                    <>
                                                        <div className='absolute top-2 right-2'>
                                                            <RiDeleteBinLine onClick={() => testimonialSectionRemove(index)} className='cursor-pointer text-red-600' />
                                                        </div>

                                                        {/* Person image */}
                                                        <div className='flex flex-col gap-2'>
                                                            <div className='flex flex-col gap-2'>
                                                                <Label className='font-bold'>Image</Label>
                                                                <Controller
                                                                    name={`testimonialSection.items.${index}.image`}
                                                                    control={control}
                                                                    rules={{ required: "Image is required" }}
                                                                    render={({ field }) => (
                                                                        <ImageUploader
                                                                            value={field.value}
                                                                            onChange={field.onChange}
                                                                            className=''
                                                                        />
                                                                    )}
                                                                />
                                                                {errors.testimonialSection?.items?.[index]?.image && (
                                                                    <p className="text-red-500">{errors.testimonialSection?.items?.[index]?.image.message}</p>
                                                                )}
                                                            </div>

                                                            <div className='flex flex-col gap-2'>
                                                                <Label className='font-bold'>Image Alt Tag</Label>
                                                                <Input type='text' placeholder='Alt Tag' {...register(`testimonialSection.items.${index}.imageAlt`, {
                                                                    required: "Alt Tag is required"
                                                                })} />
                                                                {errors.testimonialSection?.items?.[index]?.imageAlt && <p className='text-red-500'>{errors.testimonialSection?.items?.[index]?.imageAlt.message}</p>}
                                                            </div>
                                                        </div>

                                                        {/* Name / designation */}
                                                        <div className='flex flex-col gap-2'>
                                                            <div className='flex flex-col gap-2'>
                                                                <Label className='font-bold'>Name</Label>
                                                                <Input type='text' placeholder='Name' {...register(`testimonialSection.items.${index}.name`, {
                                                                    required: "Name is required"
                                                                })} />
                                                                {errors.testimonialSection?.items?.[index]?.name && <p className='text-red-500'>{errors.testimonialSection?.items?.[index]?.name.message}</p>}
                                                            </div>

                                                            <div className='flex flex-col gap-2'>
                                                                <Label className='font-bold'>Designation</Label>
                                                                <Input type='text' placeholder='Designation' {...register(`testimonialSection.items.${index}.designation`, {
                                                                    required: "Designation is required"
                                                                })} />
                                                                {errors.testimonialSection?.items?.[index]?.designation && <p className='text-red-500'>{errors.testimonialSection?.items?.[index]?.designation.message}</p>}
                                                            </div>
                                                        </div>

                                                        {/* Message spans full width */}
                                                        <div className='flex flex-col gap-2 col-span-2'>
                                                            <Label className='font-bold'>Message</Label>
                                                            <Textarea placeholder='Message' {...register(`testimonialSection.items.${index}.message`, {
                                                                required: "Message is required"
                                                            })} />
                                                            {(() => {
                                                                const messageError = errors.testimonialSection?.items?.[index]?.message as FieldError | undefined;
                                                                return messageError && <p className='text-red-500'>{messageError.message}</p>;
                                                            })()}
                                                        </div>

                                                        {/* Company logo */}
                                                        <div className='flex flex-col gap-2'>
                                                            <Label className='font-bold'>Company Logo</Label>
                                                            <Controller
                                                                name={`testimonialSection.items.${index}.companyLogo`}
                                                                control={control}
                                                                rules={{ required: "Company Logo is required" }}
                                                                render={({ field }) => (
                                                                    <ImageUploader
                                                                        value={field.value}
                                                                        onChange={field.onChange}
                                                                        className=''
                                                                        isLogo
                                                                    />
                                                                )}
                                                            />
                                                            {errors.testimonialSection?.items?.[index]?.companyLogo && (
                                                                <p className="text-red-500">{errors.testimonialSection?.items?.[index]?.companyLogo.message}</p>
                                                            )}
                                                        </div>

                                                        <div className='flex flex-col gap-2'>
                                                            <Label className='font-bold'>Company Logo Alt Tag</Label>
                                                            <Input type='text' placeholder='Company Logo Alt Tag' {...register(`testimonialSection.items.${index}.companyLogoAlt`, {
                                                                required: "Company Logo Alt Tag is required"
                                                            })} />
                                                            {errors.testimonialSection?.items?.[index]?.companyLogoAlt && <p className='text-red-500'>{errors.testimonialSection?.items?.[index]?.companyLogoAlt.message}</p>}
                                                        </div>

                                                        <div className='flex flex-col gap-2'>
                                                            <Label className='font-bold'>Company Name</Label>
                                                            <Input type='text' placeholder='Company Name' {...register(`testimonialSection.items.${index}.companyName`, {
                                                                required: "Company Name is required"
                                                            })} />
                                                            {errors.testimonialSection?.items?.[index]?.companyName && <p className='text-red-500'>{errors.testimonialSection?.items?.[index]?.companyName.message}</p>}
                                                        </div>
                                                    </>
                                                )}
                                            </SortableItem>
                                        ))}
                                    </SortableContext>
                                </DndContext>

                            </div>
                            <div className='flex justify-end mt-2'>
                                <Button type='button' addItem onClick={() => testimonialSectionAppend({
                                    image: "",
                                    imageAlt: "",
                                    name: "",
                                    designation: "",
                                    message: "",
                                    companyLogo: "",
                                    companyLogoAlt: "",
                                    companyName: ""
                                })}>Add Item</Button>
                            </div>
                        </div>
                    </div>
                </AccordionSection>

                {/* When you add future sections, wrap each in its own AccordionSection with a unique sectionKey, e.g.:
                <AccordionSection title="Hero Section" sectionKey="heroSection" openSection={openSection} setOpenSection={setOpenSection}>
                    ... hero section fields ...
                </AccordionSection>
                */}

                <div className='flex'>
                    <Button type='submit' className="cursor-pointer text-white text-[16px] w-full">Submit</Button>
                </div>

            </form>
        </div>
    )
}

export default TestimonialsPage