"use client"

import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import React, { useEffect, useState } from 'react'

import { useForm, useFieldArray, Controller } from "react-hook-form";
import { Button } from '@/components/ui/button'
import { ImageUploader } from '@/components/ui/image-uploader'
import { RiAiGenerateText, RiDeleteBinLine } from "react-icons/ri";
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
import { Textarea } from '@/components/ui/textarea';
import { useParams } from 'next/navigation';
import { Portfolio } from '@/app/types/Portfolio';

export interface IndustryFormProps {
    seo: SeoFormValues
    firstSection: {
        image: string;
        imageAlt: string;
        logo: string;
        logoAlt: string;
        title: string;
        description: string;
        items: {
            title: string;
            link: string;
        }[];
    };
    secondSection: {
        title: string;
        subTitle: string;
        description: string;
    };
    thirdSection: {
        title: string;
        subTitle: string;
        items: {
            title: string;
            link: string;
            image: string;
            imageAlt: string;
            description: string;
        }[];
    };
    fourthSection: {
        title: string;
        subTitle: string;
        items: {
            title: string;
            description: string;
        }[];
    };
    fifthSection: {
        title: string;
        subTitle: string;
        description: string;
        items: {
            number: string;
            value: string;
        }[];
    };
    sixthSection: {
        title: string;
        items: {
            company: string;
            number: string;
            value: string;
            title: string;
            description: string;
            isPrimary: boolean;
        }[];
    };
    seventhSection: {
        title: string;
        subTitle: string;
        logo: string;
        logoAlt: string;
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

const IndiIndustryPage = () => {

    const params = useParams<{ id: string }>();
    const slug = params?.id;

    const { register, handleSubmit, setValue, watch, control, formState: { errors } } = useForm<IndustryFormProps>();

    const {
        fields: firstSectionItems,
        append: firstSectionAppend,
        remove: firstSectionRemove,
        move: firstSectionMove,
    } = useFieldArray({
        control,
        name: "firstSection.items"
    });

    const {
        fields: thirdSectionItems,
        append: thirdSectionAppend,
        remove: thirdSectionRemove,
        move: thirdSectionMove,
    } = useFieldArray({
        control,
        name: "thirdSection.items"
    });

    const {
        fields: sixthSectionItems,
        append: sixthSectionAppend,
        remove: sixthSectionRemove,
        move: sixthSectionMove,
        replace: sixthSectionReplace,
    } = useFieldArray({
        control,
        name: "sixthSection.items"
    });


    const {
        fields: fourthSectionItems,
        append: fourthSectionAppend,
        remove: fourthSectionRemove,
        move: fourthSectionMove,
    } = useFieldArray({
        control,
        name: "fourthSection.items"
    });



    const {
        fields: fifthSectionItems,
        append: fifthSectionAppend,
        remove: fifthSectionRemove,
        move: fifthSectionMove,
    } = useFieldArray({
        control,
        name: "fifthSection.items"
    });


    const {
        fields: faqSectionItems,
        append: faqSectionAppend,
        remove: faqSectionRemove,
        move: faqSectionMove,
    } = useFieldArray({
        control,
        name: "faqSection.items"
    });

    const [reorderMode, setReorderMode] = useState(false);

    // Which top-level section accordion is open.
    const [openSection, setOpenSection] = useState<string | null>("");

    const handleAddIndustry = async (data: IndustryFormProps) => {
        try {
            const response = await fetch(`/api/industry?slug=${slug}`, {
                method: "PATCH",
                body: JSON.stringify(data),
            });
            if (response.ok) {
                const data = await response.json();
                alert(data.message);
            }
        } catch (error) {
            console.log("Error in adding industry", error);
        }
    }

    const fetchIndustryData = async () => {
        try {
            const response = await fetch(`/api/industry?slug=${slug}`);
            if (response.ok) {
                const data = await response.json();
                setValue("seo", data.data?.seo);
                setValue("firstSection", data.data?.firstSection);
                setValue("firstSection.items", data.data?.firstSection?.items ?? []);
                setValue("secondSection", data.data?.secondSection);
                setValue("thirdSection", data.data?.thirdSection);
                setValue("thirdSection.items", data.data?.thirdSection?.items ?? []);
                setValue("fourthSection", data.data?.fourthSection);
                setValue("fourthSection.items", data.data?.fourthSection?.items ?? []);
                setValue("fifthSection", data.data?.fifthSection);
                setValue("fifthSection.items", data.data?.fifthSection?.items ?? []);
                setValue("sixthSection", data.data?.sixthSection);
                sixthSectionReplace(data.data?.sixthSection?.items ?? []);
                setValue("seventhSection", data.data?.seventhSection);
                setValue("ctaSection", data.data?.ctaSection);
                setValue("faqSection", data.data?.faqSection);
                setValue("faqSection.items", data.data?.faqSection?.items ?? []);
            } else {
                const data = await response.json();
                alert(data.message);
            }
        } catch (error) {
            console.log("Error in fetching industry data", error);
        }
    }

    // Factory for drag end handlers, reused across all field arrays
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
        fetchIndustryData()
    }, []);


    return (
        <div className='flex flex-col gap-5 pb-5'>
            <form className='flex flex-col gap-5' onSubmit={handleSubmit(handleAddIndustry)}>

                {/* ---------------- First Section ---------------- */}
                <AccordionSection
                    title="First Section"
                    sectionKey="firstSection"
                    openSection={openSection}
                    setOpenSection={setOpenSection}
                >
                    <div className='p-5 rounded-md flex flex-col gap-2'>
                        <div className='flex flex-col gap-2'>

                            <div className='grid grid-cols-2 gap-5'>

                                <div>
                                    <div className='flex flex-col gap-2'>
                                        <Label className='font-bold'>Image</Label>
                                        <Controller
                                            name={`firstSection.image`}
                                            control={control}
                                            render={({ field }) => (
                                                <ImageUploader
                                                    value={field.value}
                                                    onChange={field.onChange}
                                                    className='w-[300px] h-fit'
                                                />
                                            )}
                                        />
                                        {errors.firstSection?.image && (
                                            <p className="text-red-500">{errors.firstSection?.image.message}</p>
                                        )}
                                    </div>



                                    <div className='flex flex-col gap-2'>
                                        <Label className='font-bold'>Image Alt Tag</Label>
                                        <Input type='text' placeholder='Alt Tag' {...register(`firstSection.imageAlt`)} />
                                    </div>

                                </div>

                                {/* <div>
                                    <div className='flex flex-col gap-2'>
                                        <Label className='font-bold'>Logo</Label>
                                        <Controller
                                            name={`firstSection.logo`}
                                            control={control}
                                            render={({ field }) => (
                                                <ImageUploader
                                                    isLogo
                                                    value={field.value}
                                                    onChange={field.onChange}
                                                    className='w-[300px] h-fit'
                                                />
                                            )}
                                        />
                                        {errors.firstSection?.logo && (
                                            <p className="text-red-500">{errors.firstSection?.logo.message}</p>
                                        )}
                                    </div>



                                    <div className='flex flex-col gap-2'>
                                        <Label className='font-bold'>Logo Alt Tag</Label>
                                        <Input type='text' placeholder='Alt Tag' {...register(`firstSection.logoAlt`)} />
                                    </div>

                                </div> */}

                            </div>

                            <div className='flex flex-col gap-2'>
                                <Label className='font-bold'>Title</Label>
                                <Input type='text' placeholder='Title' {...register(`firstSection.title`)} />
                                {/* {errors.firstSection?.title && <p className='text-red-500'>{errors.firstSection?.title.message}</p>} */}
                            </div>



                            <div className='flex flex-col gap-1'>
                                <Label className=' font-bold'>Description</Label>
                                <Textarea placeholder='Description' {...register("firstSection.description")} />
                                {/* {errors.firstSection?.description && <p className='text-red-500'>{errors.firstSection?.description.message}</p>} */}
                            </div>
                        </div>

                        <div>
                            <div className='flex justify-between mb-3'>
                                <Label className='font-bold'>Items</Label>
                                {<Button className="bg-green-600 text-white" type="button" onClick={() => setReorderMode(!reorderMode)}>{reorderMode ? <GiConfirmed /> : <TbReorder />}</Button>}
                            </div>
                            <div className='border border-black/20 p-2 rounded-md flex flex-col gap-5'>

                                <DndContext collisionDetection={closestCorners} onDragEnd={createDragEndHandler(firstSectionItems, firstSectionMove)}>
                                    <SortableContext
                                        items={firstSectionItems.map((field) => field.id)}
                                        strategy={verticalListSortingStrategy}
                                    >
                                        {firstSectionItems.map((field, index) => (
                                            <SortableItem key={field.id} id={field.id} reorderMode={reorderMode}>
                                                {reorderMode ? (
                                                    <span className='font-medium'>
                                                        {watch(`firstSection.items.${index}.title`) || `Item ${index + 1}`}
                                                    </span>
                                                ) : (
                                                    <>
                                                        <div className='absolute top-2 right-2'>
                                                            <RiDeleteBinLine onClick={() => firstSectionRemove(index)} className='cursor-pointer text-red-600' />
                                                        </div>

                                                        <div className='flex flex-col gap-2'>
                                                            <Label className='font-bold'>Title</Label>
                                                            <Input type='text' placeholder='Title' {...register(`firstSection.items.${index}.title`)} />
                                                            {/* {errors.firstSection?.items?.[index]?.title && <p className='text-red-500'>{errors.firstSection?.items?.[index]?.title.message}</p>} */}
                                                        </div>

                                                        <div className='flex flex-col gap-2'>
                                                            <Label className='font-bold'>Link</Label>
                                                            <Input type='text' placeholder='Link' {...register(`firstSection.items.${index}.link`)} />
                                                            {/* {errors.firstSection?.items?.[index]?.link && <p className='text-red-500'>{errors.firstSection?.items?.[index]?.link.message}</p>} */}
                                                        </div>
                                                    </>
                                                )}
                                            </SortableItem>
                                        ))}
                                    </SortableContext>
                                </DndContext>

                            </div>
                            <div className='flex justify-end mt-2'>
                                <Button type='button' addItem onClick={() => firstSectionAppend({ title: "", link: "" })}>Add Item</Button>
                            </div>
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
                    <div className='p-5 rounded-md flex flex-col gap-2'>
                        <div className='flex flex-col gap-2'>
                            <div className='flex flex-col gap-2'>
                                <Label className='font-bold'>Title</Label>
                                <Input type='text' placeholder='Title' {...register(`secondSection.title`)} />
                                {/* {errors.secondSection?.title && <p className='text-red-500'>{errors.secondSection?.title.message}</p>} */}
                            </div>

                            <div className='flex flex-col gap-2'>
                                <Label className='font-bold'>Sub Title</Label>
                                <Input type='text' placeholder='Sub Title' {...register(`secondSection.subTitle`)} />
                                {/* {errors.secondSection?.subTitle && <p className='text-red-500'>{errors.secondSection?.subTitle.message}</p>} */}
                            </div>

                            <div className='flex flex-col gap-1'>
                                <Label className=' font-bold'>Description</Label>
                                <Textarea placeholder='Description' {...register("secondSection.description")} />
                                {/* {errors.secondSection?.description && <p className='text-red-500'>{errors.secondSection?.description.message}</p>} */}
                            </div>
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
                    <div className='p-5 rounded-md flex flex-col gap-2'>
                        <div className='flex flex-col gap-2'>
                            <div className='flex flex-col gap-2'>
                                <Label className='font-bold'>Title</Label>
                                <Input type='text' placeholder='Title' {...register(`thirdSection.title`)} />
                                {/* {errors.thirdSection?.title && <p className='text-red-500'>{errors.thirdSection?.title.message}</p>} */}
                            </div>

                            <div className='flex flex-col gap-2'>
                                <Label className='font-bold'>Sub Title</Label>
                                <Input type='text' placeholder='Sub Title' {...register(`thirdSection.subTitle`)} />
                                {/* {errors.thirdSection?.subTitle && <p className='text-red-500'>{errors.thirdSection?.subTitle.message}</p>} */}
                            </div>
                        </div>
                        <div>
                            <div className='flex justify-between mb-3'>
                                <Label className='font-bold'>Items</Label>
                                {<Button className="bg-green-600 text-white" type="button" onClick={() => setReorderMode(!reorderMode)}>{reorderMode ? <GiConfirmed /> : <TbReorder />}</Button>}
                            </div>
                            <div className='border border-black/20 p-2 rounded-md flex flex-col gap-5'>

                                <DndContext collisionDetection={closestCorners} onDragEnd={createDragEndHandler(thirdSectionItems, thirdSectionMove)}>
                                    <SortableContext
                                        items={thirdSectionItems.map((field) => field.id)}
                                        strategy={verticalListSortingStrategy}
                                    >
                                        {thirdSectionItems.map((field, index) => (
                                            <SortableItem key={field.id} id={field.id} reorderMode={reorderMode}>
                                                {reorderMode ? (
                                                    <span className='font-medium'>
                                                        {watch(`thirdSection.items.${index}.title`) || `Item ${index + 1}`}
                                                    </span>
                                                ) : (
                                                    <>
                                                        <div className='absolute top-2 right-2'>
                                                            <RiDeleteBinLine onClick={() => thirdSectionRemove(index)} className='cursor-pointer text-red-600' />
                                                        </div>

                                                        <div className='flex flex-col gap-2'>
                                                            <div className='flex flex-col gap-2'>
                                                                <Label className='font-bold'>Image</Label>
                                                                <Controller
                                                                    name={`thirdSection.items.${index}.image`}
                                                                    control={control}
                                                                    // rules={{ required: "Image is required" }}
                                                                    render={({ field }) => (
                                                                        <ImageUploader
                                                                            value={field.value}
                                                                            onChange={field.onChange}
                                                                            className=''
                                                                            isLogo
                                                                        />
                                                                    )}
                                                                />
                                                                {/* {errors.thirdSection?.items?.[index]?.image && (
                                                                    <p className="text-red-500">{errors.thirdSection?.items?.[index]?.image.message}</p>
                                                                )} */}
                                                            </div>

                                                            <div className='flex flex-col gap-2'>
                                                                <Label className='font-bold'>Alt Tag</Label>
                                                                <Input type='text' placeholder='Alt Tag' {...register(`thirdSection.items.${index}.imageAlt`)} />
                                                                {/* {errors.thirdSection?.items?.[index]?.imageAlt && <p className='text-red-500'>{errors.thirdSection?.items?.[index]?.imageAlt.message}</p>} */}
                                                            </div>
                                                        </div>

                                                        <div className='flex flex-col gap-2'>
                                                            <div className='flex flex-col gap-2'>
                                                                <Label className='font-bold'>Title</Label>
                                                                <Input type='text' placeholder='Title' {...register(`thirdSection.items.${index}.title`)} />
                                                                {/* {errors.thirdSection?.items?.[index]?.title && <p className='text-red-500'>{errors.thirdSection?.items?.[index]?.title.message}</p>} */}
                                                            </div>

                                                            <div className='flex flex-col gap-2'>
                                                                <Label className='font-bold'>Link</Label>
                                                                <Input type='text' placeholder='Link' {...register(`thirdSection.items.${index}.link`)} />
                                                                {/* {errors.thirdSection?.items?.[index]?.title && <p className='text-red-500'>{errors.thirdSection?.items?.[index]?.title.message}</p>} */}
                                                            </div>

                                                            <div className='flex flex-col gap-2'>
                                                                <Label className='font-bold'>Description</Label>
                                                                <Textarea placeholder='Description' {...register(`thirdSection.items.${index}.description`)} />
                                                                {/* {errors.thirdSection?.items?.[index]?.description && <p className='text-red-500'>{errors.thirdSection?.items?.[index]?.description.message}</p>} */}
                                                            </div>
                                                        </div>
                                                    </>
                                                )}
                                            </SortableItem>
                                        ))}
                                    </SortableContext>
                                </DndContext>

                            </div>
                            <div className='flex justify-end mt-2'>
                                <Button type='button' addItem onClick={() => thirdSectionAppend({ title: "", image: "", imageAlt: "", description: "", link: "" })}>Add Item</Button>
                            </div>
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
                    <div className='p-5 rounded-md flex flex-col gap-2'>
                        <div className='flex flex-col gap-2'>
                            <div className='flex flex-col gap-2'>
                                <Label className='font-bold'>Title</Label>
                                <Input type='text' placeholder='Title' {...register(`fourthSection.title`)} />
                                {/* {errors.fourthSection?.title && <p className='text-red-500'>{errors.fourthSection?.title.message}</p>} */}
                            </div>

                            <div className='flex flex-col gap-2'>
                                <Label className='font-bold'>Sub Title</Label>
                                <Input type='text' placeholder='Sub Title' {...register(`fourthSection.subTitle`)} />
                                {/* {errors.fourthSection?.subTitle && <p className='text-red-500'>{errors.fourthSection?.subTitle.message}</p>} */}
                            </div>
                        </div>
                        <div>
                            <div className='flex justify-between mb-3'>
                                <Label className='font-bold'>Items</Label>
                                {<Button className="bg-green-600 text-white" type="button" onClick={() => setReorderMode(!reorderMode)}>{reorderMode ? <GiConfirmed /> : <TbReorder />}</Button>}
                            </div>
                            <div className='border border-black/20 p-2 rounded-md flex flex-col gap-5'>

                                <DndContext collisionDetection={closestCorners} onDragEnd={createDragEndHandler(fourthSectionItems, fourthSectionMove)}>
                                    <SortableContext
                                        items={fourthSectionItems.map((field) => field.id)}
                                        strategy={verticalListSortingStrategy}
                                    >
                                        {fourthSectionItems.map((field, index) => (
                                            <SortableItem key={field.id} id={field.id} reorderMode={reorderMode}>
                                                {reorderMode ? (
                                                    <span className='font-medium'>
                                                        {watch(`fourthSection.items.${index}.title`) || `Item ${index + 1}`}
                                                    </span>
                                                ) : (
                                                    <>
                                                        <div className='absolute top-2 right-2'>
                                                            <RiDeleteBinLine onClick={() => fourthSectionRemove(index)} className='cursor-pointer text-red-600' />
                                                        </div>

                                                        <div className='flex flex-col gap-2 col-span-2'>
                                                            <Label className='font-bold'>Title</Label>
                                                            <Input type='text' placeholder='Title' {...register(`fourthSection.items.${index}.title`)} />
                                                            {/* {errors.fourthSection?.items?.[index]?.title && <p className='text-red-500'>{errors.fourthSection?.items?.[index]?.title.message}</p>} */}
                                                        </div>

                                                        <div className='flex flex-col gap-2 col-span-2'>
                                                            <Label className='font-bold'>Description</Label>
                                                            <Textarea placeholder='Description' {...register(`fourthSection.items.${index}.description`)} />
                                                            {/* {errors.fourthSection?.items?.[index]?.description && <p className='text-red-500'>{errors.fourthSection?.items?.[index]?.description.message}</p>} */}
                                                        </div>
                                                    </>
                                                )}
                                            </SortableItem>
                                        ))}
                                    </SortableContext>
                                </DndContext>

                            </div>
                            <div className='flex justify-end mt-2'>
                                <Button type='button' addItem onClick={() => fourthSectionAppend({ title: "", description: "" })}>Add Item</Button>
                            </div>
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
                    <div className='p-5 rounded-md flex flex-col gap-2'>
                        <div className='flex flex-col gap-2'>
                            <div className='flex flex-col gap-2'>
                                <Label className='font-bold'>Title</Label>
                                <Input type='text' placeholder='Title' {...register(`fifthSection.title`)} />
                                {/* {errors.fifthSection?.title && <p className='text-red-500'>{errors.fifthSection?.title.message}</p>} */}
                            </div>

                            <div className='flex flex-col gap-2'>
                                <Label className='font-bold'>Sub Title</Label>
                                <Input type='text' placeholder='Sub Title' {...register(`fifthSection.subTitle`)} />
                                {/* {errors.fifthSection?.subTitle && <p className='text-red-500'>{errors.fifthSection?.subTitle.message}</p>} */}
                            </div>

                            <div className='flex flex-col gap-1'>
                                <Label className=' font-bold'>Description</Label>
                                <Textarea placeholder='Description' {...register("fifthSection.description")} />
                                {/* {errors.fifthSection?.description && <p className='text-red-500'>{errors.fifthSection?.description.message}</p>} */}
                            </div>
                        </div>
                        <div>
                            <div className='flex justify-between mb-3'>
                                <Label className='font-bold'>Items</Label>
                                {<Button className="bg-green-600 text-white" type="button" onClick={() => setReorderMode(!reorderMode)}>{reorderMode ? <GiConfirmed /> : <TbReorder />}</Button>}
                            </div>
                            <div className='border border-black/20 p-2 rounded-md flex flex-col gap-5'>

                                <DndContext collisionDetection={closestCorners} onDragEnd={createDragEndHandler(fifthSectionItems, fifthSectionMove)}>
                                    <SortableContext
                                        items={fifthSectionItems.map((field) => field.id)}
                                        strategy={verticalListSortingStrategy}
                                    >
                                        {fifthSectionItems.map((field, index) => (
                                            <SortableItem key={field.id} id={field.id} reorderMode={reorderMode}>
                                                {reorderMode ? (
                                                    <span className='font-medium'>
                                                        {watch(`fifthSection.items.${index}.number`) || `Item ${index + 1}`}
                                                    </span>
                                                ) : (
                                                    <>
                                                        <div className='absolute top-2 right-2'>
                                                            <RiDeleteBinLine onClick={() => fifthSectionRemove(index)} className='cursor-pointer text-red-600' />
                                                        </div>

                                                        <div className='flex flex-col gap-2'>
                                                            <Label className='font-bold'>Number</Label>
                                                            <Input type='text' placeholder='Number' {...register(`fifthSection.items.${index}.number`)} />
                                                            {/* {errors.fifthSection?.items?.[index]?.number && <p className='text-red-500'>{errors.fifthSection?.items?.[index]?.number.message}</p>} */}
                                                        </div>

                                                        <div className='flex flex-col gap-2'>
                                                            <Label className='font-bold'>Value</Label>
                                                            <Input type='text' placeholder='Value' {...register(`fifthSection.items.${index}.value`)} />
                                                            {/* {errors.fifthSection?.items?.[index]?.value && <p className='text-red-500'>{errors.fifthSection?.items?.[index]?.value.message}</p>} */}
                                                        </div>
                                                    </>
                                                )}
                                            </SortableItem>
                                        ))}
                                    </SortableContext>
                                </DndContext>

                            </div>
                            <div className='flex justify-end mt-2'>
                                <Button type='button' addItem onClick={() => fifthSectionAppend({ number: "", value: "" })}>Add Item</Button>
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
                    <div className='p-5 rounded-md flex flex-col gap-2'>
                        <div className='flex flex-col gap-2'>
                            <div className='flex flex-col gap-2'>
                                <Label className='font-bold'>Title</Label>
                                <Input type='text' placeholder='Title' {...register(`sixthSection.title`)} />
                                {/* {errors.sixthSection?.title && <p className='text-red-500'>{errors.sixthSection?.title.message}</p>} */}
                            </div>
                        </div>
                        <div>
                            <div className='flex justify-between mb-3'>
                                <Label className='font-bold'>Items</Label>
                                {<Button className="bg-green-600 text-white" type="button" onClick={() => setReorderMode(!reorderMode)}>{reorderMode ? <GiConfirmed /> : <TbReorder />}</Button>}
                            </div>
                            <div className='border border-black/20 p-2 rounded-md flex flex-col gap-5'>

                                <DndContext collisionDetection={closestCorners} onDragEnd={createDragEndHandler(sixthSectionItems, sixthSectionMove)}>
                                    <SortableContext
                                        items={sixthSectionItems.map((field) => field.id)}
                                        strategy={verticalListSortingStrategy}
                                    >
                                        {sixthSectionItems.map((field, index) => (
                                            <SortableItem key={field.id} id={field.id} reorderMode={reorderMode}>
                                                {reorderMode ? (
                                                    <span className='font-medium'>
                                                        {watch(`sixthSection.items.${index}.title`) || `Item ${index + 1}`}
                                                    </span>
                                                ) : (
                                                    <>
                                                        <div className='absolute top-2 right-2'>
                                                            <RiDeleteBinLine onClick={() => sixthSectionRemove(index)} className='cursor-pointer text-red-600' />
                                                        </div>

                                                        <div className='flex flex-col gap-2 col-span-2'>
                                                            <Label className='font-bold'>Company</Label>
                                                            <Input type='text' placeholder='Company' {...register(`sixthSection.items.${index}.company`)} />
                                                            {/* {errors.sixthSection?.items?.[index]?.company && <p className='text-red-500'>{errors.sixthSection?.items?.[index]?.company.message}</p>} */}
                                                        </div>

                                                        <div className='gap-5 grid grid-cols-2 col-span-2 w-full'>

                                                            <div className='flex flex-col gap-2 col-span-1'>
                                                                <Label className='font-bold'>Number</Label>
                                                                <Input type='text' placeholder='Number' {...register(`sixthSection.items.${index}.number`)} />
                                                                {/* {errors.sixthSection?.items?.[index]?.number && <p className='text-red-500'>{errors.sixthSection?.items?.[index]?.number.message}</p>} */}
                                                            </div>

                                                            <div className='flex flex-col gap-2 col-span-1'>
                                                                <Label className='font-bold'>Value</Label>
                                                                <Input type='text' placeholder='Value' {...register(`sixthSection.items.${index}.value`)} />
                                                                {/* {errors.sixthSection?.items?.[index]?.value && <p className='text-red-500'>{errors.sixthSection?.items?.[index]?.value.message}</p>} */}
                                                            </div>

                                                        </div>

                                                        <div className='flex items-center gap-2 col-span-2'>
                                                            <input
                                                                type='checkbox'
                                                                id={`sixthSection.items.${index}.isPrimary`}
                                                                className='w-4 h-4 cursor-pointer'
                                                                {...register(`sixthSection.items.${index}.isPrimary`)}
                                                            />
                                                            <Label htmlFor={`sixthSection.items.${index}.isPrimary`} className='font-bold cursor-pointer'>
                                                                Select as Primary
                                                            </Label>
                                                        </div>


                                                        <div className='flex flex-col gap-2 col-span-2'>
                                                            <Label className='font-bold'>Title</Label>
                                                            <Input type='text' placeholder='Title' {...register(`sixthSection.items.${index}.title`)} />
                                                            {/* {errors.sixthSection?.items?.[index]?.title && <p className='text-red-500'>{errors.sixthSection?.items?.[index]?.title.message}</p>} */}
                                                        </div>

                                                        <div className='flex flex-col gap-2 col-span-2'>
                                                            <Label className='font-bold'>Description</Label>
                                                            <Textarea placeholder='Description' {...register(`sixthSection.items.${index}.description`)} />
                                                            {/* {errors.sixthSection?.items?.[index]?.description && <p className='text-red-500'>{errors.sixthSection?.items?.[index]?.description.message}</p>} */}
                                                        </div>
                                                    </>
                                                )}
                                            </SortableItem>
                                        ))}
                                    </SortableContext>
                                </DndContext>

                            </div>
                            <div className='flex justify-end mt-2'>
                                <Button type='button' addItem onClick={() => sixthSectionAppend({ title: "", description: "", number: "", value: "", company: "", isPrimary: false })}>Add Item</Button>
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
                    <div className='p-5 rounded-md flex flex-col gap-2'>
                        <div className='flex flex-col gap-2'>
                            <div className='flex flex-col gap-2'>
                                <Label className='font-bold'>Title</Label>
                                <Input type='text' placeholder='Title' {...register(`seventhSection.title`)} />
                                {/* {errors.seventhSection?.title && <p className='text-red-500'>{errors.seventhSection?.title.message}</p>} */}
                            </div>

                            <div className='flex flex-col gap-2'>
                                <Label className='font-bold'>Sub Title</Label>
                                <Input type='text' placeholder='Sub Title' {...register(`seventhSection.subTitle`)} />
                                {/* {errors.seventhSection?.subTitle && <p className='text-red-500'>{errors.seventhSection?.subTitle.message}</p>} */}
                            </div>

                            <div className='flex flex-col gap-2'>
                                <Label className='font-bold'>Logo</Label>
                                <Controller
                                    name={`seventhSection.logo`}
                                    control={control}
                                    render={({ field }) => (
                                        <ImageUploader
                                            isLogo
                                            value={field.value}
                                            onChange={field.onChange}
                                            className='w-[300px] h-fit'
                                        />
                                    )}
                                />
                                {errors.seventhSection?.logo && (
                                    <p className="text-red-500">{errors.seventhSection?.logo.message}</p>
                                )}
                            </div>

                            <div className='flex flex-col gap-2'>
                                <Label className='font-bold'>Logo Alt Tag</Label>
                                <Input type='text' placeholder='Alt Tag' {...register(`seventhSection.logoAlt`)} />
                                {/* {errors.seventhSection?.logoAlt && <p className='text-red-500'>{errors.seventhSection?.logoAlt.message}</p>} */}
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
                    <div className='p-5 rounded-md flex flex-col gap-2'>
                        <div className='flex flex-col gap-2'>

                            <div className='flex flex-col gap-2'>
                                <Label className='font-bold'>Title Red</Label>
                                <Input type='text' placeholder='Title Red' {...register(`ctaSection.titleRed`)} />
                                {/* {errors.ctaSection?.titleRed && <p className='text-red-500'>{errors.ctaSection?.titleRed.message}</p>} */}
                            </div>

                            <div className='flex flex-col gap-2'>
                                <Label className='font-bold'>Title</Label>
                                <Input type='text' placeholder='Title' {...register(`ctaSection.title`)} />
                                {/* {errors.ctaSection?.title && <p className='text-red-500'>{errors.ctaSection?.title.message}</p>} */}
                            </div>

                            <div className='flex flex-col gap-1'>
                                <Label className=' font-bold'>Description</Label>
                                <Textarea placeholder='Description' {...register("ctaSection.description")}
                                />
                                {/* {errors.ctaSection?.description && <p className='text-red-500'>{errors.ctaSection?.description.message}</p>} */}
                            </div>

                            <div className='flex flex-col gap-1'>
                                <Label className=' font-bold'>Button Text</Label>
                                <Input type='text' placeholder='Button Text' {...register("ctaSection.buttonText")} />
                                {/* {errors.ctaSection?.buttonText && <p className='text-red-500'>{errors.ctaSection?.buttonText.message}</p>} */}
                            </div>

                            <div className='flex flex-col gap-1'>
                                <Label className=' font-bold'>Button Link</Label>
                                <Input type='text' placeholder='Button Link' {...register("ctaSection.buttonLink")} />
                                {/* {errors.ctaSection?.buttonLink && <p className='text-red-500'>{errors.ctaSection?.buttonLink.message}</p>} */}
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
                    <div className='p-5 rounded-md flex flex-col gap-2'>
                        <div className='flex flex-col gap-2'>
                            <div className='flex flex-col gap-2'>
                                <Label className='font-bold'>Title</Label>
                                <Input type='text' placeholder='Title' {...register(`faqSection.title`)} />
                                {/* {errors.faqSection?.title && <p className='text-red-500'>{errors.faqSection?.title.message}</p>} */}
                            </div>
                        </div>
                        <div>
                            <div className='flex justify-between mb-3'>
                                <Label className='font-bold'>Items</Label>
                                {<Button className="bg-green-600 text-white" type="button" onClick={() => setReorderMode(!reorderMode)}>{reorderMode ? <GiConfirmed /> : <TbReorder />}</Button>}
                            </div>
                            <div className='border border-black/20 p-2 rounded-md flex flex-col gap-5'>

                                <DndContext collisionDetection={closestCorners} onDragEnd={createDragEndHandler(faqSectionItems, faqSectionMove)}>
                                    <SortableContext
                                        items={faqSectionItems.map((field) => field.id)}
                                        strategy={verticalListSortingStrategy}
                                    >
                                        {faqSectionItems.map((field, index) => (
                                            <SortableItem key={field.id} id={field.id} reorderMode={reorderMode}>
                                                {reorderMode ? (
                                                    <span className='font-medium'>
                                                        {watch(`faqSection.items.${index}.question`) || `FAQ ${index + 1}`}
                                                    </span>
                                                ) : (
                                                    <>
                                                        <div className='absolute top-2 right-2'>
                                                            <RiDeleteBinLine onClick={() => faqSectionRemove(index)} className='cursor-pointer text-red-600' />
                                                        </div>

                                                        <div className='flex flex-col gap-2 col-span-2'>
                                                            <Label className='font-bold'>Question</Label>
                                                            <Input type='text' placeholder='Question' {...register(`faqSection.items.${index}.question`)} />
                                                            {/* {errors.faqSection?.items?.[index]?.question && <p className='text-red-500'>{errors.faqSection?.items?.[index]?.question.message}</p>} */}
                                                        </div>

                                                        <div className='flex flex-col gap-2 col-span-2'>
                                                            <Label className='font-bold'>Answer</Label>
                                                            <Textarea placeholder='Answer' {...register(`faqSection.items.${index}.answer`)} />
                                                            {/* {errors.faqSection?.items?.[index]?.answer && <p className='text-red-500'>{errors.faqSection?.items?.[index]?.answer.message}</p>} */}
                                                        </div>
                                                    </>
                                                )}
                                            </SortableItem>
                                        ))}
                                    </SortableContext>
                                </DndContext>

                            </div>
                            <div className='flex justify-end mt-2'>
                                <Button type='button' addItem onClick={() => faqSectionAppend({ question: "", answer: "" })}>Add Item</Button>
                            </div>
                        </div>
                    </div>
                </AccordionSection>

                {/* When you add future sections, wrap each in its own AccordionSection with a unique sectionKey, e.g.:
                <AccordionSection title="Hero Section" sectionKey="heroSection" openSection={openSection} setOpenSection={setOpenSection}>
                    ... hero section fields ...
                </AccordionSection>
                */}

                <SeoFields<IndustryFormProps> control={control} register={register} errors={errors} />

                <div className='flex'>
                    <Button type='submit' className="cursor-pointer text-white text-[16px] w-full">Submit</Button>
                </div>

            </form>
        </div>
    )
}

export default IndiIndustryPage