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


type ServiceIndustry = {
    _id: string;
    image: string;
    imageAlt: string;
    title: string;
};

export interface ServiceFormProps {
    seo: SeoFormValues
    firstSection: {
        image: string;
        imageAlt: string;
        title: string;
        description: string;
        items: {
            title: string;
            link: string;
        }[];
    };
    secondSection: {
        title: string;
        description: string;
    };
    thirdSection: {
        title: string;
        subTitle: string;
        description: string;
        image: string;
        imageAlt: string;
    };
    fourthSection: {
        title: string;
        subTitle: string;
        description: string;
    };
    fifthSection: {
        title: string;
        subTitle: string;
        items: {
            title: string;
            image: string;
            imageAlt: string;
            description: string;
        }[];
    };
    sixthSection: {
        title: string;
        subTitle: string;
        items: {
            title: string;
            description: string;
        }[];
    };
    seventhSection: {
        title: string;
        items: {
            title: string;
            image: string;
            imageAlt: string;
            description: string;
        }[];
    };
    eighthSection: {
        title: string;
        subTitle: string;
        items: {
            title: string;
            description: string;
        }[];
    };
    ninethSection: {
        title: string;
        subTitle: string;
        items: {
            title: string;
            description: string;
            image: string;
            imageAlt: string;
        }[];
    };
tenthSection: {
        title: string;
        serviceIndustries: string[];
    };
    eleventhSection: {
        title: string;
        subTitle: string;
        description: string;
        items: {
            number: string;
            value: string;
        }[];
    };
    caseStudySection: {
        title: string;
        subTitle: string;
        items: {
            title: string;
            project: string;
            description: string;
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

const IndiServicePage = () => {

    const params = useParams<{ id: string }>();
    const slug = params?.id;

    const { register, handleSubmit, setValue, watch, control, formState: { errors } } = useForm<ServiceFormProps>();

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
        fields: fifthSectionItems,
        append: fifthSectionAppend,
        remove: fifthSectionRemove,
        move: fifthSectionMove,
    } = useFieldArray({
        control,
        name: "fifthSection.items"
    });

    const {
        fields: sixthSectionItems,
        append: sixthSectionAppend,
        remove: sixthSectionRemove,
        move: sixthSectionMove,
    } = useFieldArray({
        control,
        name: "sixthSection.items"
    });

    const {
        fields: seventhSectionItems,
        append: seventhSectionAppend,
        remove: seventhSectionRemove,
        move: seventhSectionMove,
    } = useFieldArray({
        control,
        name: "seventhSection.items"
    });

    const {
        fields: eighthSectionItems,
        append: eighthSectionAppend,
        remove: eighthSectionRemove,
        move: eighthSectionMove,
    } = useFieldArray({
        control,
        name: "eighthSection.items"
    });

    const {
        fields: ninethSectionItems,
        append: ninethSectionAppend,
        remove: ninethSectionRemove,
        move: ninethSectionMove,
    } = useFieldArray({
        control,
        name: "ninethSection.items"
    });



    const {
        fields: eleventhSectionItems,
        append: eleventhSectionAppend,
        remove: eleventhSectionRemove,
        move: eleventhSectionMove,
    } = useFieldArray({
        control,
        name: "eleventhSection.items"
    });

    const {
        fields: caseStudySectionItems,
        append: caseStudySectionAppend,
        remove: caseStudySectionRemove,
        move: caseStudySectionMove,
    } = useFieldArray({
        control,
        name: "caseStudySection.items"
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
    const [portfolios, setPortfolios] = useState<Portfolio[]>([]);
       const [serviceIndustries, setServiceIndustries] = useState<ServiceIndustry[]>([]);

    // Which top-level section accordion is open.
    const [openSection, setOpenSection] = useState<string | null>("");

    const handleAddService = async (data: ServiceFormProps) => {
        try {
            const response = await fetch(`/api/service?slug=${slug}`, {
                method: "PATCH",
                body: JSON.stringify(data),
            });
            if (response.ok) {
                const data = await response.json();
                alert(data.message);
            }
        } catch (error) {
            console.log("Error in adding service", error);
        }
    }

    const fetchServiceData = async () => {
        try {
            const response = await fetch(`/api/service?slug=${slug}`);
            if (response.ok) {
                const data = await response.json();
                setValue("seo", data.data?.seo);
                setValue("firstSection", data.data?.firstSection);
                setValue("firstSection.items", data.data?.firstSection?.items ?? []);
                setValue("secondSection", data.data?.secondSection);
                setValue("thirdSection", data.data?.thirdSection);
                setValue("fourthSection", data.data?.fourthSection);
                setValue("fifthSection", data.data?.fifthSection);
                setValue("fifthSection.items", data.data?.fifthSection?.items ?? []);
                setValue("sixthSection", data.data?.sixthSection);
                setValue("sixthSection.items", data.data?.sixthSection?.items ?? []);
                setValue("seventhSection", data.data?.seventhSection);
                setValue("seventhSection.items", data.data?.seventhSection?.items ?? []);
                setValue("eighthSection", data.data?.eighthSection);
                setValue("eighthSection.items", data.data?.eighthSection?.items ?? []);
                setValue("ninethSection", data.data?.ninethSection);
                setValue("ninethSection.items", data.data?.ninethSection?.items ?? []);
setValue("tenthSection", data.data?.tenthSection);
                setValue(
                    "tenthSection.serviceIndustries",
                    (data.data?.tenthSection?.serviceIndustries ?? []).map((item: any) =>
                        typeof item === "object" && item !== null ? item._id : item
                    )
                );
                setValue("eleventhSection", data.data?.eleventhSection);
                setValue("eleventhSection.items", data.data?.eleventhSection?.items ?? []);
                setValue("ctaSection", data.data?.ctaSection);
                setValue("faqSection", data.data?.faqSection);
                setValue("faqSection.items", data.data?.faqSection?.items ?? []);
                setValue("caseStudySection", data.data?.caseStudySection);
                setValue(
                    "caseStudySection.items",
                    (data.data?.caseStudySection?.items ?? []).map((item: any) => ({
                        ...item,
                        project: typeof item.project === "object" && item.project !== null
                            ? item.project._id
                            : item.project,
                    }))
                )
            } else {
                const data = await response.json();
                alert(data.message);
            }
        } catch (error) {
            console.log("Error in fetching service data", error);
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

    const fetchPortfolios = async () => {
        try {
            const response = await fetch(`/api/portfolio`, {
                headers: {
                    "x-auth-type": "admin",
                },
            });
            if (response.ok) {
                const data = await response.json();
                console.log(data.portfolio)
                setPortfolios(data.portfolio.filter((item: { section: string }) => item.section == "case study" || item.section == "case study new"));
            } else {
                console.error("Failed to fetch portfolio data");
            }
        } catch (error) {
            console.error("Error fetching portfolio data:", error);
        }
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
        Promise.all([fetchPortfolios(), fetchServiceIndustries()]).then(() =>
            fetchServiceData()
        );
    }, []);


    return (
        <div className='flex flex-col gap-5 pb-5'>
            <form className='flex flex-col gap-5' onSubmit={handleSubmit(handleAddService)}>

                {/* ---------------- First Section ---------------- */}
                <AccordionSection
                    title="First Section"
                    sectionKey="firstSection"
                    openSection={openSection}
                    setOpenSection={setOpenSection}
                >
                    <div className='p-5 rounded-md flex flex-col gap-2'>
                        <div className='flex flex-col gap-2'>
                            <div className='flex flex-col gap-2'>
                                <Label className='font-bold'>Image</Label>
                                <Controller
                                    name={`firstSection.image`}
                                    control={control}
                                    rules={{ required: "Image is required" }}
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
                                <Input type='text' placeholder='Alt Tag' {...register(`firstSection.imageAlt`, {
                                    required: "Alt Tag is required"
                                })} />
                                {errors.firstSection?.imageAlt && <p className='text-red-500'>{errors.firstSection?.imageAlt.message}</p>}
                            </div>

                            <div className='flex flex-col gap-2'>
                                <Label className='font-bold'>Title</Label>
                                <Input type='text' placeholder='Title' {...register(`firstSection.title`, {
                                    required: "Value is required"
                                })} />
                                {errors.firstSection?.title && <p className='text-red-500'>{errors.firstSection?.title.message}</p>}
                            </div>

                            

                            <div className='flex flex-col gap-1'>
                                <Label className=' font-bold'>Description</Label>
                                <Textarea placeholder='Description' {...register("firstSection.description", {
                                    required: "Description is required"
                                })} />
                                {errors.firstSection?.description && <p className='text-red-500'>{errors.firstSection?.description.message}</p>}
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
                                                            <Input type='text' placeholder='Title' {...register(`firstSection.items.${index}.title`, {
                                                                required: "Title is required"
                                                            })} />
                                                            {errors.firstSection?.items?.[index]?.title && <p className='text-red-500'>{errors.firstSection?.items?.[index]?.title.message}</p>}
                                                        </div>

                                                        <div className='flex flex-col gap-2'>
                                                            <Label className='font-bold'>Link</Label>
                                                            <Input type='text' placeholder='Link' {...register(`firstSection.items.${index}.link`, {
                                                                required: "Link is required"
                                                            })} />
                                                            {errors.firstSection?.items?.[index]?.link && <p className='text-red-500'>{errors.firstSection?.items?.[index]?.link.message}</p>}
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
                                <Input type='text' placeholder='Title' {...register(`secondSection.title`, {
                                    required: "Value is required"
                                })} />
                                {errors.secondSection?.title && <p className='text-red-500'>{errors.secondSection?.title.message}</p>}
                            </div>

                            <div className='flex flex-col gap-1'>
                                <Label className=' font-bold'>Description</Label>
                                <Textarea placeholder='Description' {...register("secondSection.description", {
                                    required: "Description is required"
                                })} />
                                {errors.secondSection?.description && <p className='text-red-500'>{errors.secondSection?.description.message}</p>}
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
                                <Input type='text' placeholder='Title' {...register(`thirdSection.title`, {
                                    required: "Value is required"
                                })} />
                                {errors.thirdSection?.title && <p className='text-red-500'>{errors.thirdSection?.title.message}</p>}
                            </div>

                            <div className='flex flex-col gap-2'>
                                <Label className='font-bold'>Sub Title</Label>
                                <Input type='text' placeholder='Sub Title' {...register(`thirdSection.subTitle`, {
                                    required: "Value is required"
                                })} />
                                {errors.thirdSection?.subTitle && <p className='text-red-500'>{errors.thirdSection?.subTitle.message}</p>}
                            </div>

                            <div className='flex flex-col gap-1'>
                                <Label className=' font-bold'>Description</Label>
                                <Textarea placeholder='Description' {...register("thirdSection.description", {
                                    required: "Description is required"
                                })} />
                                {errors.thirdSection?.description && <p className='text-red-500'>{errors.thirdSection?.description.message}</p>}
                            </div>

                            <div className='flex flex-col gap-2'>
                                <Label className='font-bold'>Image</Label>
                                <Controller
                                    name={`thirdSection.image`}
                                    control={control}
                                    rules={{ required: "Image is required" }}
                                    render={({ field }) => (
                                        <ImageUploader
                                            value={field.value}
                                            onChange={field.onChange}
                                            className='w-[300px] h-fit'
                                        />
                                    )}
                                />
                                {errors.thirdSection?.image && (
                                    <p className="text-red-500">{errors.thirdSection?.image.message}</p>
                                )}
                            </div>

                            <div className='flex flex-col gap-2'>
                                <Label className='font-bold'>Image Alt Tag</Label>
                                <Input type='text' placeholder='Alt Tag' {...register(`thirdSection.imageAlt`, {
                                    required: "Alt Tag is required"
                                })} />
                                {errors.thirdSection?.imageAlt && <p className='text-red-500'>{errors.thirdSection?.imageAlt.message}</p>}
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
                                <Input type='text' placeholder='Title' {...register(`fourthSection.title`, {
                                    required: "Value is required"
                                })} />
                                {errors.fourthSection?.title && <p className='text-red-500'>{errors.fourthSection?.title.message}</p>}
                            </div>

                            <div className='flex flex-col gap-2'>
                                <Label className='font-bold'>Sub Title</Label>
                                <Input type='text' placeholder='Sub Title' {...register(`fourthSection.subTitle`, {
                                    required: "Value is required"
                                })} />
                                {errors.fourthSection?.subTitle && <p className='text-red-500'>{errors.fourthSection?.subTitle.message}</p>}
                            </div>

                            <div className='flex flex-col gap-1'>
                                <Label className=' font-bold'>Description</Label>
                                <Textarea placeholder='Description' {...register("fourthSection.description", {
                                    required: "Description is required"
                                })} />
                                {errors.fourthSection?.description && <p className='text-red-500'>{errors.fourthSection?.description.message}</p>}
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
                                <Input type='text' placeholder='Title' {...register(`fifthSection.title`, {
                                    required: "Value is required"
                                })} />
                                {errors.fifthSection?.title && <p className='text-red-500'>{errors.fifthSection?.title.message}</p>}
                            </div>

                            <div className='flex flex-col gap-2'>
                                <Label className='font-bold'>Sub Title</Label>
                                <Input type='text' placeholder='Sub Title' {...register(`fifthSection.subTitle`, {
                                    required: "Value is required"
                                })} />
                                {errors.fifthSection?.subTitle && <p className='text-red-500'>{errors.fifthSection?.subTitle.message}</p>}
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
                                                        {watch(`fifthSection.items.${index}.title`) || `Item ${index + 1}`}
                                                    </span>
                                                ) : (
                                                    <>
                                                        <div className='absolute top-2 right-2'>
                                                            <RiDeleteBinLine onClick={() => fifthSectionRemove(index)} className='cursor-pointer text-red-600' />
                                                        </div>

                                                        <div className='flex flex-col gap-2'>
                                                            <div className='flex flex-col gap-2'>
                                                                <Label className='font-bold'>Image</Label>
                                                                <Controller
                                                                    name={`fifthSection.items.${index}.image`}
                                                                    control={control}
                                                                    rules={{ required: "Image is required" }}
                                                                    render={({ field }) => (
                                                                        <ImageUploader
                                                                            value={field.value}
                                                                            onChange={field.onChange}
                                                                            className=''
                                                                            isLogo
                                                                        />
                                                                    )}
                                                                />
                                                                {errors.fifthSection?.items?.[index]?.image && (
                                                                    <p className="text-red-500">{errors.fifthSection?.items?.[index]?.image.message}</p>
                                                                )}
                                                            </div>

                                                            <div className='flex flex-col gap-2'>
                                                                <Label className='font-bold'>Alt Tag</Label>
                                                                <Input type='text' placeholder='Alt Tag' {...register(`fifthSection.items.${index}.imageAlt`, {
                                                                    required: "Alt Tag is required"
                                                                })} />
                                                                {errors.fifthSection?.items?.[index]?.imageAlt && <p className='text-red-500'>{errors.fifthSection?.items?.[index]?.imageAlt.message}</p>}
                                                            </div>
                                                        </div>

                                                        <div className='flex flex-col gap-2'>
                                                            <div className='flex flex-col gap-2'>
                                                                <Label className='font-bold'>Title</Label>
                                                                <Input type='text' placeholder='Title' {...register(`fifthSection.items.${index}.title`, {
                                                                    required: "Title is required"
                                                                })} />
                                                                {errors.fifthSection?.items?.[index]?.title && <p className='text-red-500'>{errors.fifthSection?.items?.[index]?.title.message}</p>}
                                                            </div>

                                                            <div className='flex flex-col gap-2'>
                                                                <Label className='font-bold'>Description</Label>
                                                                <Textarea placeholder='Description' {...register(`fifthSection.items.${index}.description`, {
                                                                    required: "Description is required"
                                                                })} />
                                                                {errors.fifthSection?.items?.[index]?.description && <p className='text-red-500'>{errors.fifthSection?.items?.[index]?.description.message}</p>}
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
                                <Button type='button' addItem onClick={() => fifthSectionAppend({ title: "", image: "", imageAlt: "", description: "" })}>Add Item</Button>
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
                                <Input type='text' placeholder='Title' {...register(`sixthSection.title`, {
                                    required: "Value is required"
                                })} />
                                {errors.sixthSection?.title && <p className='text-red-500'>{errors.sixthSection?.title.message}</p>}
                            </div>

                            <div className='flex flex-col gap-2'>
                                <Label className='font-bold'>Sub Title</Label>
                                <Input type='text' placeholder='Sub Title' {...register(`sixthSection.subTitle`, {
                                    required: "Value is required"
                                })} />
                                {errors.sixthSection?.subTitle && <p className='text-red-500'>{errors.sixthSection?.subTitle.message}</p>}
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
                                                            <Label className='font-bold'>Title</Label>
                                                            <Input type='text' placeholder='Title' {...register(`sixthSection.items.${index}.title`, {
                                                                required: "Title is required"
                                                            })} />
                                                            {errors.sixthSection?.items?.[index]?.title && <p className='text-red-500'>{errors.sixthSection?.items?.[index]?.title.message}</p>}
                                                        </div>

                                                        <div className='flex flex-col gap-2 col-span-2'>
                                                            <Label className='font-bold'>Description</Label>
                                                            <Textarea placeholder='Description' {...register(`sixthSection.items.${index}.description`, {
                                                                required: "Description is required"
                                                            })} />
                                                            {errors.sixthSection?.items?.[index]?.description && <p className='text-red-500'>{errors.sixthSection?.items?.[index]?.description.message}</p>}
                                                        </div>
                                                    </>
                                                )}
                                            </SortableItem>
                                        ))}
                                    </SortableContext>
                                </DndContext>

                            </div>
                            <div className='flex justify-end mt-2'>
                                <Button type='button' addItem onClick={() => sixthSectionAppend({ title: "", description: "" })}>Add Item</Button>
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
                                <Input type='text' placeholder='Title' {...register(`seventhSection.title`, {
                                    required: "Value is required"
                                })} />
                                {errors.seventhSection?.title && <p className='text-red-500'>{errors.seventhSection?.title.message}</p>}
                            </div>
                        </div>
                        <div>
                            <div className='flex justify-between mb-3'>
                                <Label className='font-bold'>Items</Label>
                                {<Button className="bg-green-600 text-white" type="button" onClick={() => setReorderMode(!reorderMode)}>{reorderMode ? <GiConfirmed /> : <TbReorder />}</Button>}
                            </div>
                            <div className='border border-black/20 p-2 rounded-md flex flex-col gap-5'>

                                <DndContext collisionDetection={closestCorners} onDragEnd={createDragEndHandler(seventhSectionItems, seventhSectionMove)}>
                                    <SortableContext
                                        items={seventhSectionItems.map((field) => field.id)}
                                        strategy={verticalListSortingStrategy}
                                    >
                                        {seventhSectionItems.map((field, index) => (
                                            <SortableItem key={field.id} id={field.id} reorderMode={reorderMode}>
                                                {reorderMode ? (
                                                    <span className='font-medium'>
                                                        {watch(`seventhSection.items.${index}.title`) || `Item ${index + 1}`}
                                                    </span>
                                                ) : (
                                                    <>
                                                        <div className='absolute top-2 right-2'>
                                                            <RiDeleteBinLine onClick={() => seventhSectionRemove(index)} className='cursor-pointer text-red-600' />
                                                        </div>

                                                        <div className='flex flex-col gap-2'>
                                                            <div className='flex flex-col gap-2'>
                                                                <Label className='font-bold'>Image</Label>
                                                                <Controller
                                                                    name={`seventhSection.items.${index}.image`}
                                                                    control={control}
                                                                    rules={{ required: "Image is required" }}
                                                                    render={({ field }) => (
                                                                        <ImageUploader
                                                                            value={field.value}
                                                                            onChange={field.onChange}
                                                                            className=''
                                                                            isLogo
                                                                        />
                                                                    )}
                                                                />
                                                                {errors.seventhSection?.items?.[index]?.image && (
                                                                    <p className="text-red-500">{errors.seventhSection?.items?.[index]?.image.message}</p>
                                                                )}
                                                            </div>

                                                            <div className='flex flex-col gap-2'>
                                                                <Label className='font-bold'>Alt Tag</Label>
                                                                <Input type='text' placeholder='Alt Tag' {...register(`seventhSection.items.${index}.imageAlt`, {
                                                                    required: "Alt Tag is required"
                                                                })} />
                                                                {errors.seventhSection?.items?.[index]?.imageAlt && <p className='text-red-500'>{errors.seventhSection?.items?.[index]?.imageAlt.message}</p>}
                                                            </div>
                                                        </div>

                                                        <div className='flex flex-col gap-2'>
                                                            <div className='flex flex-col gap-2'>
                                                                <Label className='font-bold'>Title</Label>
                                                                <Input type='text' placeholder='Title' {...register(`seventhSection.items.${index}.title`, {
                                                                    required: "Title is required"
                                                                })} />
                                                                {errors.seventhSection?.items?.[index]?.title && <p className='text-red-500'>{errors.seventhSection?.items?.[index]?.title.message}</p>}
                                                            </div>

                                                            <div className='flex flex-col gap-2'>
                                                                <Label className='font-bold'>Description</Label>
                                                                <Textarea placeholder='Description' {...register(`seventhSection.items.${index}.description`, {
                                                                    required: "Description is required"
                                                                })} />
                                                                {errors.seventhSection?.items?.[index]?.description && <p className='text-red-500'>{errors.seventhSection?.items?.[index]?.description.message}</p>}
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
                                <Button type='button' addItem onClick={() => seventhSectionAppend({ title: "", image: "", imageAlt: "", description: "" })}>Add Item</Button>
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
                    <div className='p-5 rounded-md flex flex-col gap-2'>
                        <div className='flex flex-col gap-2'>
                            <div className='flex flex-col gap-2'>
                                <Label className='font-bold'>Title</Label>
                                <Input type='text' placeholder='Title' {...register(`eighthSection.title`, {
                                    required: "Value is required"
                                })} />
                                {errors.eighthSection?.title && <p className='text-red-500'>{errors.eighthSection?.title.message}</p>}
                            </div>

                            <div className='flex flex-col gap-2'>
                                <Label className='font-bold'>Sub Title</Label>
                                <Input type='text' placeholder='Sub Title' {...register(`eighthSection.subTitle`, {
                                    required: "Value is required"
                                })} />
                                {errors.eighthSection?.subTitle && <p className='text-red-500'>{errors.eighthSection?.subTitle.message}</p>}
                            </div>
                        </div>
                        <div>
                            <div className='flex justify-between mb-3'>
                                <Label className='font-bold'>Items</Label>
                                {<Button className="bg-green-600 text-white" type="button" onClick={() => setReorderMode(!reorderMode)}>{reorderMode ? <GiConfirmed /> : <TbReorder />}</Button>}
                            </div>
                            <div className='border border-black/20 p-2 rounded-md flex flex-col gap-5'>

                                <DndContext collisionDetection={closestCorners} onDragEnd={createDragEndHandler(eighthSectionItems, eighthSectionMove)}>
                                    <SortableContext
                                        items={eighthSectionItems.map((field) => field.id)}
                                        strategy={verticalListSortingStrategy}
                                    >
                                        {eighthSectionItems.map((field, index) => (
                                            <SortableItem key={field.id} id={field.id} reorderMode={reorderMode}>
                                                {reorderMode ? (
                                                    <span className='font-medium'>
                                                        {watch(`eighthSection.items.${index}.title`) || `Item ${index + 1}`}
                                                    </span>
                                                ) : (
                                                    <>
                                                        <div className='absolute top-2 right-2'>
                                                            <RiDeleteBinLine onClick={() => eighthSectionRemove(index)} className='cursor-pointer text-red-600' />
                                                        </div>

                                                        <div className='flex flex-col gap-2 col-span-2'>
                                                            <Label className='font-bold'>Title</Label>
                                                            <Input type='text' placeholder='Title' {...register(`eighthSection.items.${index}.title`, {
                                                                required: "Title is required"
                                                            })} />
                                                            {errors.eighthSection?.items?.[index]?.title && <p className='text-red-500'>{errors.eighthSection?.items?.[index]?.title.message}</p>}
                                                        </div>

                                                        <div className='flex flex-col gap-2 col-span-2'>
                                                            <Label className='font-bold'>Description</Label>
                                                            <Textarea placeholder='Description' {...register(`eighthSection.items.${index}.description`, {
                                                                required: "Description is required"
                                                            })} />
                                                            {errors.eighthSection?.items?.[index]?.description && <p className='text-red-500'>{errors.eighthSection?.items?.[index]?.description.message}</p>}
                                                        </div>
                                                    </>
                                                )}
                                            </SortableItem>
                                        ))}
                                    </SortableContext>
                                </DndContext>

                            </div>
                            <div className='flex justify-end mt-2'>
                                <Button type='button' addItem onClick={() => eighthSectionAppend({ title: "", description: "" })}>Add Item</Button>
                            </div>
                        </div>
                    </div>
                </AccordionSection>

                {/* ---------------- Nineth Section ---------------- */}
                <AccordionSection
                    title="Nineth Section"
                    sectionKey="ninethSection"
                    openSection={openSection}
                    setOpenSection={setOpenSection}
                >
                    <div className='p-5 rounded-md flex flex-col gap-2'>
                        <div className='flex flex-col gap-2'>
                            <div className='flex flex-col gap-2'>
                                <Label className='font-bold'>Title</Label>
                                <Input type='text' placeholder='Title' {...register(`ninethSection.title`)} />
                                {errors.ninethSection?.title && <p className='text-red-500'>{errors.ninethSection?.title.message}</p>}
                            </div>

                            <div className='flex flex-col gap-2'>
                                <Label className='font-bold'>Sub Title</Label>
                                <Input type='text' placeholder='Sub Title' {...register(`ninethSection.subTitle`)} />
                                {errors.ninethSection?.subTitle && <p className='text-red-500'>{errors.ninethSection?.subTitle.message}</p>}
                            </div>
                        </div>
                        <div>
                            <div className='flex justify-between mb-3'>
                                <Label className='font-bold'>Items</Label>
                                {<Button className="bg-green-600 text-white" type="button" onClick={() => setReorderMode(!reorderMode)}>{reorderMode ? <GiConfirmed /> : <TbReorder />}</Button>}
                            </div>
                            <div className='border border-black/20 p-2 rounded-md flex flex-col gap-5'>

                                <DndContext collisionDetection={closestCorners} onDragEnd={createDragEndHandler(ninethSectionItems, ninethSectionMove)}>
                                    <SortableContext
                                        items={ninethSectionItems.map((field) => field.id)}
                                        strategy={verticalListSortingStrategy}
                                    >
                                        {ninethSectionItems.map((field, index) => (
                                            <SortableItem key={field.id} id={field.id} reorderMode={reorderMode}>
                                                {reorderMode ? (
                                                    <span className='font-medium'>
                                                        {watch(`ninethSection.items.${index}.title`) || `Item ${index + 1}`}
                                                    </span>
                                                ) : (
                                                    <>
                                                        <div className='absolute top-2 right-2'>
                                                            <RiDeleteBinLine onClick={() => ninethSectionRemove(index)} className='cursor-pointer text-red-600' />
                                                        </div>

                                                        <div className='flex flex-col gap-2'>
                                                            <div className='flex flex-col gap-2'>
                                                                <Label className='font-bold'>Image</Label>
                                                                <Controller
                                                                    name={`ninethSection.items.${index}.image`}
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
                                                                {/* {errors.ninethSection?.items?.[index]?.image && (
                                                                    <p className="text-red-500">{errors.ninethSection?.items?.[index]?.image.message}</p>
                                                                )} */}
                                                            </div>

                                                            <div className='flex flex-col gap-2'>
                                                                <Label className='font-bold'>Alt Tag</Label>
                                                                <Input type='text' placeholder='Alt Tag' {...register(`ninethSection.items.${index}.imageAlt`)} />
                                                                {/* {errors.ninethSection?.items?.[index]?.imageAlt && <p className='text-red-500'>{errors.ninethSection?.items?.[index]?.imageAlt.message}</p>} */}
                                                            </div>
                                                        </div>

                                                        <div className='flex flex-col gap-2'>
                                                            <div className='flex flex-col gap-2'>
                                                                <Label className='font-bold'>Title</Label>
                                                                <Input type='text' placeholder='Title' {...register(`ninethSection.items.${index}.title`)} />
                                                                {/* {errors.ninethSection?.items?.[index]?.title && <p className='text-red-500'>{errors.ninethSection?.items?.[index]?.title.message}</p>} */}
                                                            </div>

                                                            <div className='flex flex-col gap-2'>
                                                                <Label className='font-bold'>Description</Label>
                                                                <Textarea placeholder='Description' {...register(`ninethSection.items.${index}.description`)} />
                                                                {/* {errors.ninethSection?.items?.[index]?.description && <p className='text-red-500'>{errors.ninethSection?.items?.[index]?.description.message}</p>} */}
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
                                <Button type='button' addItem onClick={() => ninethSectionAppend({ title: "", description: "", image: "", imageAlt: "" })}>Add Item</Button>
                            </div>
                        </div>
                    </div>
                </AccordionSection>

                {/* ---------------- Tenth Section ---------------- */}
                {/* <AccordionSection
                    title="Tenth Section"
                    sectionKey="tenthSection"
                    openSection={openSection}
                    setOpenSection={setOpenSection}
                >
                    <div className='p-5 rounded-md flex flex-col gap-2'>
                        <div className='flex flex-col gap-2'>
                            <div className='flex flex-col gap-2'>
                                <Label className='font-bold'>Title</Label>
                                <Input type='text' placeholder='Title' {...register(`tenthSection.title`, {
                                    required: "Value is required"
                                })} />
                                {errors.tenthSection?.title && <p className='text-red-500'>{errors.tenthSection?.title.message}</p>}
                            </div>
                        </div>
                        <div>
                            <div className='flex justify-between mb-3'>
                                <Label className='font-bold'>Items</Label>
                                {<Button className="bg-green-600 text-white" type="button" onClick={() => setReorderMode(!reorderMode)}>{reorderMode ? <GiConfirmed /> : <TbReorder />}</Button>}
                            </div>
                            <div className='border border-black/20 p-2 rounded-md flex flex-col gap-5'>

                                <DndContext collisionDetection={closestCorners} onDragEnd={createDragEndHandler(tenthSectionItems, tenthSectionMove)}>
                                    <SortableContext
                                        items={tenthSectionItems.map((field) => field.id)}
                                        strategy={verticalListSortingStrategy}
                                    >
                                        {tenthSectionItems.map((field, index) => (
                                            <SortableItem key={field.id} id={field.id} reorderMode={reorderMode}>
                                                {reorderMode ? (
                                                    <span className='font-medium'>
                                                        {watch(`tenthSection.items.${index}.title`) || `Item ${index + 1}`}
                                                    </span>
                                                ) : (
                                                    <>
                                                        <div className='absolute top-2 right-2'>
                                                            <RiDeleteBinLine onClick={() => tenthSectionRemove(index)} className='cursor-pointer text-red-600' />
                                                        </div>

                                                        <div className='flex flex-col gap-2'>
                                                            <div className='flex flex-col gap-2'>
                                                                <Label className='font-bold'>Image</Label>
                                                                <Controller
                                                                    name={`tenthSection.items.${index}.image`}
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
                                                                {errors.tenthSection?.items?.[index]?.image && (
                                                                    <p className="text-red-500">{errors.tenthSection?.items?.[index]?.image.message}</p>
                                                                )}
                                                            </div>

                                                            <div className='flex flex-col gap-2'>
                                                                <Label className='font-bold'>Alt Tag</Label>
                                                                <Input type='text' placeholder='Alt Tag' {...register(`tenthSection.items.${index}.imageAlt`, {
                                                                    required: "Alt Tag is required"
                                                                })} />
                                                                {errors.tenthSection?.items?.[index]?.imageAlt && <p className='text-red-500'>{errors.tenthSection?.items?.[index]?.imageAlt.message}</p>}
                                                            </div>
                                                        </div>

                                                        <div className='flex flex-col gap-2'>
                                                            <div className='flex flex-col gap-2'>
                                                                <Label className='font-bold'>Title</Label>
                                                                <Input type='text' placeholder='Title' {...register(`tenthSection.items.${index}.title`, {
                                                                    required: "Title is required"
                                                                })} />
                                                                {errors.tenthSection?.items?.[index]?.title && <p className='text-red-500'>{errors.tenthSection?.items?.[index]?.title.message}</p>}
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
                                <Button type='button' addItem onClick={() => tenthSectionAppend({ image: "", imageAlt: "", title: "" })}>Add Item</Button>
                            </div>
                        </div>
                    </div>
                </AccordionSection> */}

                {/* ---------------- Tenth Section ---------------- */}
                <AccordionSection
                    title="Tenth Section"
                    sectionKey="tenthSection"
                    openSection={openSection}
                    setOpenSection={setOpenSection}
                >
                    <div className='p-5 rounded-md flex flex-col gap-2'>
                        <div className='flex flex-col gap-2'>
                            <div className='flex flex-col gap-2'>
                                <Label className='font-bold'>Title</Label>
                                <Input type='text' placeholder='Title' {...register(`tenthSection.title`, {
                                    required: "Value is required"
                                })} />
                                {errors.tenthSection?.title && <p className='text-red-500'>{errors.tenthSection?.title.message}</p>}
                            </div>
                        </div>

                        <div>
                            <Label className='font-bold'>Industries</Label>
                            <Controller
                                name="tenthSection.serviceIndustries"
                                control={control}
                                render={({ field }) => (
                                    <div className='border border-black/20 p-3 rounded-md grid grid-cols-2 gap-3 mt-2'>
                                        {serviceIndustries.map((ind) => (
                                            <label key={ind._id} className='flex items-center gap-2 cursor-pointer'>
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
                                                    <img src={ind.image} alt={ind.imageAlt} className='h-6 w-6 rounded object-cover' />
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

                {/* ---------------- Eleventh Section ---------------- */}
                <AccordionSection
                    title="Eleventh Section"
                    sectionKey="eleventhSection"
                    openSection={openSection}
                    setOpenSection={setOpenSection}
                >
                    <div className='p-5 rounded-md flex flex-col gap-2'>
                        <div className='flex flex-col gap-2'>
                            <div className='flex flex-col gap-2'>
                                <Label className='font-bold'>Title</Label>
                                <Input type='text' placeholder='Title' {...register(`eleventhSection.title`, {
                                    required: "Value is required"
                                })} />
                                {errors.eleventhSection?.title && <p className='text-red-500'>{errors.eleventhSection?.title.message}</p>}
                            </div>

                            <div className='flex flex-col gap-2'>
                                <Label className='font-bold'>Sub Title</Label>
                                <Input type='text' placeholder='Sub Title' {...register(`eleventhSection.subTitle`, {
                                    required: "Value is required"
                                })} />
                                {errors.eleventhSection?.subTitle && <p className='text-red-500'>{errors.eleventhSection?.subTitle.message}</p>}
                            </div>

                            <div className='flex flex-col gap-1'>
                                <Label className=' font-bold'>Description</Label>
                                <Textarea placeholder='Description' {...register("eleventhSection.description", {
                                    required: "Description is required"
                                })} />
                                {errors.eleventhSection?.description && <p className='text-red-500'>{errors.eleventhSection?.description.message}</p>}
                            </div>
                        </div>
                        <div>
                            <div className='flex justify-between mb-3'>
                                <Label className='font-bold'>Items</Label>
                                {<Button className="bg-green-600 text-white" type="button" onClick={() => setReorderMode(!reorderMode)}>{reorderMode ? <GiConfirmed /> : <TbReorder />}</Button>}
                            </div>
                            <div className='border border-black/20 p-2 rounded-md flex flex-col gap-5'>

                                <DndContext collisionDetection={closestCorners} onDragEnd={createDragEndHandler(eleventhSectionItems, eleventhSectionMove)}>
                                    <SortableContext
                                        items={eleventhSectionItems.map((field) => field.id)}
                                        strategy={verticalListSortingStrategy}
                                    >
                                        {eleventhSectionItems.map((field, index) => (
                                            <SortableItem key={field.id} id={field.id} reorderMode={reorderMode}>
                                                {reorderMode ? (
                                                    <span className='font-medium'>
                                                        {watch(`eleventhSection.items.${index}.number`) || `Item ${index + 1}`}
                                                    </span>
                                                ) : (
                                                    <>
                                                        <div className='absolute top-2 right-2'>
                                                            <RiDeleteBinLine onClick={() => eleventhSectionRemove(index)} className='cursor-pointer text-red-600' />
                                                        </div>

                                                        <div className='flex flex-col gap-2'>
                                                            <Label className='font-bold'>Number</Label>
                                                            <Input type='text' placeholder='Number' {...register(`eleventhSection.items.${index}.number`, {
                                                                required: "Number is required"
                                                            })} />
                                                            {errors.eleventhSection?.items?.[index]?.number && <p className='text-red-500'>{errors.eleventhSection?.items?.[index]?.number.message}</p>}
                                                        </div>

                                                        <div className='flex flex-col gap-2'>
                                                            <Label className='font-bold'>Value</Label>
                                                            <Input type='text' placeholder='Value' {...register(`eleventhSection.items.${index}.value`, {
                                                                required: "Value is required"
                                                            })} />
                                                            {errors.eleventhSection?.items?.[index]?.value && <p className='text-red-500'>{errors.eleventhSection?.items?.[index]?.value.message}</p>}
                                                        </div>
                                                    </>
                                                )}
                                            </SortableItem>
                                        ))}
                                    </SortableContext>
                                </DndContext>

                            </div>
                            <div className='flex justify-end mt-2'>
                                <Button type='button' addItem onClick={() => eleventhSectionAppend({ number: "", value: "" })}>Add Item</Button>
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
                    <div className='p-5 rounded-md flex flex-col gap-2'>
                        <div className='flex flex-col gap-2'>
                            <div className='flex flex-col gap-2'>
                                <Label className='font-bold'>Title</Label>
                                <Input type='text' placeholder='Title' {...register(`caseStudySection.title`, {
                                    required: "Title is required"
                                })} />
                                {errors.caseStudySection?.title && <p className='text-red-500'>{errors.caseStudySection?.title.message}</p>}
                            </div>

                            <div className='flex flex-col gap-2'>
                                <Label className='font-bold'>Sub Title</Label>
                                <Input type='text' placeholder='Sub Title' {...register(`caseStudySection.subTitle`, {
                                    required: "Sub Title is required"
                                })} />
                                {errors.caseStudySection?.subTitle && <p className='text-red-500'>{errors.caseStudySection?.subTitle.message}</p>}
                            </div>

                        </div>
                        <div>
                            <div className='flex justify-between mb-3'>
                                <Label className='font-bold'>Items</Label>
                                {<Button className="bg-green-600 text-white" type="button" onClick={() => setReorderMode(!reorderMode)}>{reorderMode ? <GiConfirmed /> : <TbReorder />}</Button>}
                            </div>
                            <div className='border border-black/20 p-2 rounded-md flex flex-col gap-5'>

                                <DndContext collisionDetection={closestCorners} onDragEnd={createDragEndHandler(caseStudySectionItems, caseStudySectionMove)}>
                                    <SortableContext
                                        items={caseStudySectionItems.map((field) => field.id)}
                                        strategy={verticalListSortingStrategy}
                                    >
                                        {caseStudySectionItems.map((field, index) => (
                                            <SortableItem key={field.id} id={field.id} reorderMode={reorderMode}>
                                                {reorderMode ? (
                                                    <span className='font-medium'>
                                                        {watch(`caseStudySection.items.${index}.project`) || `Item ${index + 1}`}
                                                    </span>
                                                ) : (
                                                    <>
                                                        <div className='absolute top-2 right-2'>
                                                            <RiDeleteBinLine onClick={() => caseStudySectionRemove(index)} className='cursor-pointer text-red-600' />
                                                        </div>

                                                        <div className='flex flex-col gap-2'>
                                                            <Label className='font-bold'>Project</Label>
                                                            <Controller
                                                                control={control}
                                                                name={`caseStudySection.items.${index}.project`}
                                                                // rules={{ required: "System is required" }}
                                                                render={({ field }) => (
                                                                    <select className='border rounded-md p-2' {...field}>
                                                                        <option value="">Select a project</option>
                                                                        {portfolios.map((portfolio) => (
                                                                            <option key={portfolio._id} value={portfolio._id}>
                                                                                {portfolio.companyName}
                                                                            </option>
                                                                        ))}
                                                                    </select>
                                                                )}
                                                            />
                                                            {/* {errors.lowPolySection?.items?.[index]?.systemSlug && (
                                                <p className='text-red-500'>
                                                    {errors.lowPolySection.items[index]?.systemSlug?.message}
                                                </p>
                                            )} */}
                                                        </div>

                                                        <div className='flex flex-col gap-2'>
                                                            <Label className='font-bold'>Title</Label>
                                                            <Input
                                                                type='text'
                                                                placeholder='Title'
                                                                {...register(`caseStudySection.items.${index}.title`, {
                                                                    required: "Title is required",
                                                                })}
                                                            />
                                                        </div>

                                                        <div className='flex flex-col gap-2'>
                                                            <Label className='font-bold'>Description</Label>
                                                            <Textarea
                                                                placeholder='Description'
                                                                {...register(`caseStudySection.items.${index}.description`, {
                                                                    required: "Description is required",
                                                                })}
                                                            />
                                                        </div>

                                                    </>
                                                )}
                                            </SortableItem>
                                        ))}
                                    </SortableContext>
                                </DndContext>

                            </div>
                            <div className='flex justify-end mt-2'>
                                <Button type='button' addItem onClick={() => caseStudySectionAppend({ title: "", description: "", project: "" })}>Add Item</Button>
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
                                <Input type='text' placeholder='Title Red' {...register(`ctaSection.titleRed`, {
                                    required: "Title Red is required"
                                })} />
                                {errors.ctaSection?.titleRed && <p className='text-red-500'>{errors.ctaSection?.titleRed.message}</p>}
                            </div>

                            <div className='flex flex-col gap-2'>
                                <Label className='font-bold'>Title</Label>
                                <Input type='text' placeholder='Title' {...register(`ctaSection.title`, {
                                    required: "Value is required"
                                })} />
                                {errors.ctaSection?.title && <p className='text-red-500'>{errors.ctaSection?.title.message}</p>}
                            </div>

                            <div className='flex flex-col gap-1'>
                                <Label className=' font-bold'>Description</Label>
                                <Textarea placeholder='Description' {...register("ctaSection.description", {
                                    required: "Description is required"
                                })} />
                                {errors.ctaSection?.description && <p className='text-red-500'>{errors.ctaSection?.description.message}</p>}
                            </div>

                            <div className='flex flex-col gap-1'>
                                <Label className=' font-bold'>Button Text</Label>
                                <Input type='text' placeholder='Button Text' {...register("ctaSection.buttonText", {
                                    required: "Button Text is required"
                                })} />
                                {errors.ctaSection?.buttonText && <p className='text-red-500'>{errors.ctaSection?.buttonText.message}</p>}
                            </div>

                            <div className='flex flex-col gap-1'>
                                <Label className=' font-bold'>Button Link</Label>
                                <Input type='text' placeholder='Button Link' {...register("ctaSection.buttonLink", {
                                    required: "Button Link is required"
                                })} />
                                {errors.ctaSection?.buttonLink && <p className='text-red-500'>{errors.ctaSection?.buttonLink.message}</p>}
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
                                <Input type='text' placeholder='Title' {...register(`faqSection.title`, {
                                    required: "Value is required"
                                })} />
                                {errors.faqSection?.title && <p className='text-red-500'>{errors.faqSection?.title.message}</p>}
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
                                                            <Input type='text' placeholder='Question' {...register(`faqSection.items.${index}.question`, {
                                                                required: "Question is required"
                                                            })} />
                                                            {errors.faqSection?.items?.[index]?.question && <p className='text-red-500'>{errors.faqSection?.items?.[index]?.question.message}</p>}
                                                        </div>

                                                        <div className='flex flex-col gap-2 col-span-2'>
                                                            <Label className='font-bold'>Answer</Label>
                                                            <Textarea placeholder='Answer' {...register(`faqSection.items.${index}.answer`, {
                                                                required: "Answer is required"
                                                            })} />
                                                            {errors.faqSection?.items?.[index]?.answer && <p className='text-red-500'>{errors.faqSection?.items?.[index]?.answer.message}</p>}
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

                <SeoFields<ServiceFormProps> control={control} register={register} errors={errors} />

                <div className='flex'>
                    <Button type='submit' className="cursor-pointer text-white text-[16px] w-full">Submit</Button>
                </div>

            </form>
        </div>
    )
}

export default IndiServicePage