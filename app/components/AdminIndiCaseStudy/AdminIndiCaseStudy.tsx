"use client"

import React, { useEffect, useState } from 'react'
import { useParams, useRouter } from 'next/navigation'
import { Controller, SubmitHandler, useForm } from 'react-hook-form'
import { toast } from 'sonner'
import Label from '../Label/Label'
import ReactQuill,{Quill} from 'react-quill-new';
import 'react-quill-new/dist/quill.snow.css';
import Image from 'next/image'
import { IoIosClose } from "react-icons/io";
import { PortfolioHighlight } from '@/app/types/PortfolioHighlights'
import { FaPlus } from "react-icons/fa";
import { handleImageChange } from '@/app/helpers/handleImageChange'
import { v4 as uuidv4 } from 'uuid';
import { generateAndUploadImage } from '@/app/helpers/generateAndUploadImage'
import { categories as importedCategories } from '@/app/data/categories'
import { MdOutlineSwapHorizontalCircle } from "react-icons/md";
import { checkLogoAndBanner } from '@/app/helpers/checkLogoAndBanner'
import RichEditor from '../RichEditor/RichEditor'


type Inputs = {
    companyName: string
    industry: string
    country: string
    channelsUsed: string
    story: string
    goals: string;
    objectives: string;
    challenge: string;
    solutions: string;
    result: string;
    description: string;
    tag: string;
} & {
    [key: `highlightNumber${string}`]: string;
} & {
    [key: `highlightText${string}`]: string;
}

type addingHighlights = {
    highlightText: string;
    highlightNumber: string;
    customId: string;
}



const AdminIndiCaseStudy = ({ editMode }: {
    editMode?: boolean;
}) => {
    const { companyId } = useParams()
    const router = useRouter()

    const [imageError, setImageError] = useState<null | string>(null)
    const [imageFile, setImageFile] = useState<null | File>(null)
    const [previewImage, setPreviewImage] = useState<null | string>(null)
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [metaTitle, setMetaTitle] = useState("")
    const [metaDescription, setMetaDescription] = useState("")
    const [highlights, setHighlights] = useState<PortfolioHighlight[] | []>([])
    const [addedHighlights, setAddedHighlights] = useState<addingHighlights[]>([])
    const [highlightNumber, setHighlightNumber] = useState('')
    const [highlightText, setHighlightText] = useState('')


    const [modalOpen, setModalOpen] = useState(false)
    const [refetch, setRefetch] = useState(false)
    const [section2Image1, setSection2Image1] = useState<null | File>(null)
    const [section2Image2, setSection2Image2] = useState<null | File>(null)
    const [section2Image1Preview, setSection2Image1Preview] = useState<null | string>(null)
    const [section2Image2Preview, setSection2Image2Preview] = useState<null | string>(null)
    const [section2Image1Error, setSection2Image1Error] = useState<null | string>(null)
    const [section2Image2Error, setSection2Image2Error] = useState<null | string>(null)

    const [section2BannerImage, setSection2BannerImage] = useState<null | File>(null)
    const [section2BannerImagePreview, setSection2BannerImagePreview] = useState<null | string>(null)
    const [section2BannerImageError, setSection2BannerImageError] = useState<null | string>(null)

    const [resultImage1, setResultImage1] = useState<null | File>(null)
    const [resultImage2, setResultImage2] = useState<null | File>(null)
    const [resultImage1Preview, setResultImage1Preview] = useState<null | string>(null)
    const [resultImage2Preview, setResultImage2Preview] = useState<null | string>(null)
    const [resultImage1Error, setResultImage1Error] = useState<null | string>(null)
    const [resultImage2Error, setResultImage2Error] = useState<null | string>(null)


    const [categories, setCategories] = useState<{ id: number; name: string; zone: string; }[]>([])
    const [logoFile, setLogoFile] = useState<File | null>(null)
    const [previewLogo, setPreviewLogo] = useState<null | string>(null)
    const [logoError, setLogoError] = useState<string | null>(null)

    

    const {
        register,
        handleSubmit,
        setValue,
        control,
        formState: { errors },
    } = useForm<Inputs>()


    const onSubmit: SubmitHandler<Inputs> = async (data) => {
        setIsSubmitting(true);
        const formData = new FormData();
        formData.append("companyName", data.companyName);
        formData.append("industry", data.industry);
        formData.append("channelsUsed", data.channelsUsed);
        formData.append("country", data.country);
        formData.append("story", data.story);
        formData.append("metadataTitle", metaTitle);
        formData.append("metadataDesc", metaDescription);
        formData.append("goals", data.goals);
        formData.append("objectives", data.objectives);
        formData.append("challenge", data.challenge);
        formData.append("solutions", data.solutions);
        formData.append("result", data.result);

        const hightLightIds: string[] = []
        console.log(highlights)

        highlights.forEach((highlight: PortfolioHighlight) => {
            console.log("id of highlight", highlight.customId)
            formData.append(`highlightId${highlight.customId}`, highlight.customId.toString());
            formData.append(`highlightNumber${highlight.customId}`, highlight.number);
            formData.append(`highlightText${highlight.customId}`, highlight.text);

            hightLightIds.push(highlight.customId)
        });




        formData.append("highlightIds", JSON.stringify(hightLightIds))

        formData.append("addedCategories", JSON.stringify(addedCategories))
        formData.append("description", data.description)
        formData.append("tag", data.tag)

        if(!previewImage || !previewLogo){
            const check = checkLogoAndBanner(imageFile, setImageError, logoFile, setLogoError)
            if (!check) {
                setIsSubmitting(false)
                return;
            }
        }




        if (logoFile) {
            const image = await generateAndUploadImage(logoFile)
            if (image) {
                formData.append("logo", image)
            }
        }

        if (imageFile) {
            console.log("Image", imageFile)

            const image = await generateAndUploadImage(imageFile)
            if (image) {
                formData.append("image", image)
            }

        }

        if (section2Image1) {

            const image = await generateAndUploadImage(section2Image1)
            if (image) {
                formData.append("section2Image1", image)
            }

        }

        if (section2Image2) {

            const image = await generateAndUploadImage(section2Image2)
            if (image) {
                formData.append("section2Image2", image)
            }

        }

        if (section2BannerImage) {
            formData.append("section2BannerImage", section2BannerImage)
        }

        if (resultImage1) {
            formData.append("resultImage1", resultImage1)
        }

        if (resultImage2) {
            formData.append("resultImage2", resultImage2)
        }

        formData.forEach((value, key) => {
            console.log(`${key}:`, value);
        });

        try {
            const url = editMode ? `/api/portfolio?id=${companyId}` : `/api/portfolio`;
            const method = "POST";
            console.log("Here")
            const response = await fetch(url, {
                method: method,
                body: formData,
            });
            const data = await response.json();
            console.log(data);

            if (!data.error) {
                toast.success(data.message)
                router.push('/admin/portfolio')
            } else {
                toast.error(data.error)
            }
            // Redirect to news list page
        } catch (error) {
            console.error("Error updating about:", error);
            toast.error("Failed to update about. Please try again.");
        } finally {
            setIsSubmitting(false);
        }
    }


    useEffect(() => {
        const fetchPortfolioData = async () => {
            try {
                const response = await fetch(`/api/portfolio?id=${companyId}`);
                if (response.ok) {
                    const data = await response.json();
                    console.log(data)
                    if (data.portfolio[0]) {
                        setValue("companyName", data.portfolio[0].companyName)
                        setValue("industry", data.portfolio[0].industry)
                        setValue("country", data.portfolio[0].country)
                        setValue("channelsUsed", data.portfolio[0].channelsUsed)
                        setValue("story", data.portfolio[0].story)
                        setValue("goals", data.portfolio[0].goals)
                        setValue("objectives", data.portfolio[0].objectives)
                        setValue("challenge", data.portfolio[0].challenge)
                        setValue("solutions", data.portfolio[0].solutions)
                        setValue("result", data.portfolio[0].result)
                        setValue("description", data.portfolio[0].description)
                        setValue("tag", data.portfolio[0].tag)

                        if (data.portfolio[0].categories) {

                            setAddedCategories(data.portfolio[0].categories)

                        }

                        if (data.portfolio[0].bannerImage) {
                            setPreviewImage(data.portfolio[0].bannerImage as string);

                        }

                        if (data.portfolio[0].section2Image1) {
                            setSection2Image1Preview(data.portfolio[0].section2Image1 as string);
                        }

                        if (data.portfolio[0].section2Image2) {
                            setSection2Image2Preview(data.portfolio[0].section2Image2 as string);
                        }

                        if (data.portfolio[0].section2BannerImage) {
                            setSection2BannerImagePreview(data.portfolio[0].section2BannerImage as string);
                        }

                        if (data.portfolio[0].resultImage1) {
                            setResultImage1Preview(data.portfolio[0].resultImage1 as string);
                        }

                        if (data.portfolio[0].resultImage2) {
                            setResultImage2Preview(data.portfolio[0].resultImage2 as string);
                        }

                        if (data.portfolio[0].logo) {
                            setPreviewLogo(data.portfolio[0].logo as string);
                        }


                    }

                    if (data.portfolioHighlights) {
                        setHighlights(data.portfolioHighlights)
                        data.portfolioHighlights.forEach((item: PortfolioHighlight) => {
                            setValue(`highlightText${item.customId}`, item.text)
                            setValue(`highlightNumber${item.customId}`, item.number)
                        })
                    }

                } else {
                    console.error("Failed to fetch portfolio data");
                }
            } catch (error) {
                console.error("Error fetching portfolio data:", error);
            }
        }

        if (editMode) {
            fetchPortfolioData()
        }

    }, [refetch])

    useEffect(() => {
        setCategories(importedCategories)
    }, [])


    const handleInputChange = (customId: string, field: string, value: string) => {
        setHighlights((prev) =>
            prev.map((item) =>
                item.customId === customId ? { ...item, [field]: value } : item
            )
        );
    };

    const handleAddHighlight = async () => {
        try {

            if (highlights.length > 3) {
                toast.error("Maximum of 4 highlights only allowed")
                return;
            }

            setHighlights((prev) => ([...prev, { number: highlightNumber, text: highlightText, customId: uuidv4() }]))
            setModalOpen(false)
            setHighlightNumber("")
            setHighlightText("")


        } catch (error) {
            console.error("Error adding highlight data:", error);
        }
    }

    const handleDeleteHighlight = async (id?: number | string) => {
        try {

            console.log(id)
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
                    item.customId === id ? { ...item, customId: item.customId + "DELETE" } : item
                )
            );


        } catch (error) {
            console.error("Error removing highlight data:", error);
        }
    }


    const [addedCategories, setAddedCategories] = useState<{ id: number; name: string; zone: string; }[]>([])


    const handleSwapItem = (id: number) => {
        const itemInCategory = categories.find((item) => item.id === id)
        const itemInAddedCategory = addedCategories.find((item) => item.id === id)

        if (itemInCategory) {
            setAddedCategories((prev) => [...prev, itemInCategory])
            setCategories((categories) => categories.filter((item) => item.id !== itemInCategory.id))
        }

        if (itemInAddedCategory) {
            setCategories((prev) => [...prev, itemInAddedCategory])
            setAddedCategories((addedCategories) => addedCategories.filter((item) => item.id !== itemInAddedCategory.id))
        }
    }


    const modules = {
        htmlEditButton: {
            msg: "Edit the content in HTML format", //Custom message to display in the editor, default: Edit HTML here, when you click "OK" the quill editor's contents will be replaced
            okText: "Ok", // Text to display in the OK button, default: Ok,
            cancelText: "Cancel", // Text to display in the cancel button, default: Cancel
            buttonHTML: "HTML", // Text to display in the toolbar button, default: <>
            buttonTitle: "Show HTML source", // Text to display as the tooltip for the toolbar button, default: Show HTML source
            syntax: false, // Show the HTML with syntax highlighting. Requires highlightjs on window.hljs (similar to Quill itself), default: false
            prependSelector: "div#myelement", // a string used to select where you want to insert the overlayContainer, default: null (appends to body),
            editorModules: {} // The default mod
          }
    }


    return (
        <div>
            <h1 className='text-3xl'>Edit Portfolio Content</h1>
            <form onSubmit={handleSubmit(onSubmit)} className='h-full'>
                <div className='grid grid-cols-2 gap-10 mt-5'>
                    <div
                        className="w-full h-full border-2 border-dashed border-gray-300 rounded-lg flex flex-col items-center justify-center cursor-pointer overflow-hidden"
                        onDragOver={(e) => e.preventDefault()}
                        onClick={() => document?.getElementById("image")?.click()}
                    >
                        {previewImage ? (
                            <div className="relative w-full h-full">
                                <Image src={previewImage} alt="Preview" layout="fill" objectFit="cover" />
                                {<button
                                    type="button"
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        setPreviewImage(null); // Clear the preview image
                                        setImageFile(null);
                                        const inputElement = document.getElementById("image") as HTMLInputElement;
                                        if (inputElement) {
                                            inputElement.value = ""; // Reset the input value
                                        }
                                    }}
                                    className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-1"
                                >
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                        <path
                                            fillRule="evenodd"
                                            d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                                            clipRule="evenodd"
                                        />
                                    </svg>
                                </button>}
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
                                <p className="mt-1 text-sm text-gray-600">Drag and drop an image here, or click to select a file</p>
                            </>
                        )}
                        <input type="file" id="image" accept="image/*" className="hidden" onChange={(e) => handleImageChange({ e, setImageError, setImageFile, setPreviewImage })} />
                        {imageError && <p className="mt-1 text-sm text-red-600">{imageError}</p>}
                    </div>

                    <div>
                        <div className='flex flex-col'>
                            <div className='w-full flex flex-col gap-2'>
                                <Label content='Company Name' />
                                <input type="text" {...register("companyName", { required: "Company name is required" })} className={'rounded-md pl-4 w-full border-gray-300 border-[1px] py-1 text-black bg-transparent focus:outline-none'} />
                                {errors.companyName && <p className='mt-1 text-sm text-red'>{errors.companyName.message}</p>}
                            </div>

                            <div className='w-full flex flex-col gap-2'>
                                <Label content='Industry' />
                                <input type="text" {...register("industry", { required: "Industry is required" })} className={'rounded-md pl-4 w-full border-gray-300 border-[1px] py-1 text-black bg-transparent focus:outline-none'} />
                                {errors.industry && <p className='mt-1 text-sm text-red'>{errors.industry.message}</p>}
                            </div>

                            <div className='w-full flex flex-col gap-2'>
                                <Label content='Country' />
                                <input type="text" {...register("country", { required: "Country is required" })} className={'rounded-md pl-4 w-full border-gray-300 border-[1px] py-1 text-black bg-transparent focus:outline-none'} />
                                {errors.country && <p className='mt-1 text-sm text-red'>{errors.country.message}</p>}
                            </div>

                            <div className='w-full flex flex-col gap-2'>
                                <Label content='Channels Used' />
                                <input type="text" {...register("channelsUsed", { required: "Channels used is required" })} className={'rounded-md pl-4 w-full border-gray-300 border-[1px] py-1 text-black bg-transparent focus:outline-none'} />
                                {errors.channelsUsed && <p className='mt-1 text-sm text-red'>{errors.channelsUsed.message}</p>}
                            </div>

                        </div>

                    </div>
                </div>

                <div className='grid grid-cols-2 gap-10 mt-5'>

                    <div className='h-full'>
                        <div className='w-full flex flex-col gap-2 h-full'>
                            <Label content='Story' />
                            <div className='h-full'>
                                {/* <Controller
                                    name="story"
                                    control={control}
                                    rules={{ required: "Story is required" }}
                                    render={({ field }) => (
                                        <ReactQuill theme="snow" value={field.value} onChange={field.onChange} className="h-full" modules={modules}/>
                                    )}
                                /> */}
                                <RichEditor control={control} name="story"/>
                            </div>
                            {errors.story && <p className="mt-1 text-sm text-red-600">{errors.story.message}</p>}
                        </div>
                    </div>

                    <div className='h-full'>
                        <div className='flex gap-2 items-center'>
                            <h3>Highligths</h3>
                            <div className='bg-green-500 size-5 rounded-full flex items-center justify-center'>
                                <FaPlus className='text-sm' onClick={() => setModalOpen(true)} />
                            </div>
                        </div>

                        <div className='overflow-y-scroll h-64 p-1 gap-2 flex flex-col'>



                            {highlights.length > 0 ?

                                (

                                    highlights.map((item: PortfolioHighlight) => (

                                        item.customId.length == 36 ? (
                                            <div className='grid grid-cols-2 gap-5 bg-gray-400 p-3 text-white rounded-xl relative' key={item.customId}>

                                                <div className='absolute right-2 top-1 flex gap-2'>
                                                    {/* <div className='w-5 h-5 bg-yellow-200 rounded-full text-black flex items-center justify-center'>
                        <MdEdit />
                    </div> */}
                                                    <div className='w-5 h-5 bg-red-500 rounded-full text-black flex items-center justify-center' onClick={() => handleDeleteHighlight(item.customId)}>
                                                        <IoIosClose />
                                                    </div>
                                                </div>

                                                <div className='w-full'>
                                                    <label>Number</label>
                                                    <input type="text" value={item.number} onChange={(e) => handleInputChange(item.customId, 'number', e.target.value)} className={'w-full rounded-xl text-black pl-2'} />
                                                </div>

                                                <div className='w-full'>
                                                    <label>Text</label>
                                                    <input type='text' value={item.text} onChange={(e) => handleInputChange(item.customId, 'text', e.target.value)} className='w-full rounded-xl text-black pl-2'></input>
                                                </div>

                                            </div>
                                        ) : (
                                            null
                                        )

                                    ))


                                ) : (

                                    <div>No highlights available</div>
                                )
                            }




                        </div>
                    </div>


                    {modalOpen && <div className="relative z-10" aria-labelledby="modal-title" role="dialog" aria-modal="true">

                        <div className="fixed inset-0 bg-gray-500/75 transition-opacity" aria-hidden="true"></div>

                        <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
                            <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">

                                <div className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
                                    <div className="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
                                        {/* <div className="sm:flex sm:items-start">
                                            <div className="mx-auto flex size-12 shrink-0 items-center justify-center rounded-full bg-red-100 sm:mx-0 sm:size-10">
                                                <svg className="size-6 text-red-600" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" aria-hidden="true" data-slot="icon">
                                                    <path stroke-linecap="round" stroke-linejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126ZM12 15.75h.007v.008H12v-.008Z" />
                                                </svg>
                                            </div>
                                            <div className="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left">
                                                <h3 className="text-base font-semibold text-gray-900" id="modal-title">Deactivate account</h3>
                                                <div className="mt-2">
                                                    <p className="text-sm text-gray-500">Are you sure you want to deactivate your account? All of your data will be permanently removed. This action cannot be undone.</p>
                                                </div>
                                            </div>
                                        </div> */}

                                        <div className='w-full'>
                                            <label>Number</label>
                                            <input type="text" value={highlightNumber} onChange={(e) => setHighlightNumber(e.target.value)} className={'w-full rounded-xl text-black pl-2'} />
                                        </div>

                                        <div className='w-full'>
                                            <label>Text</label>
                                            <input type='text' value={highlightText} onChange={(e) => setHighlightText(e.target.value)} className='w-full rounded-xl text-black pl-2'></input>
                                        </div>

                                    </div>
                                    <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                                        <button type="button" className="inline-flex w-full justify-center rounded-md bg-red-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-500 sm:ml-3 sm:w-auto" onClick={handleAddHighlight}>Submit</button>
                                        <button type="button" className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto" onClick={() => setModalOpen(false)}>Cancel</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>}


                </div>

                <div className='border-t mt-15 pt-5 flex flex-col gap-6'>
                    <h3 className='text-3xl'>Section 2</h3>

                    <div className='grid grid-cols-2 gap-5'>
                        <div>
                            <div>Section 2 - Image 1</div>
                            <div
                                className="w-full h-96 border-2 border-dashed border-gray-300 rounded-lg flex flex-col items-center justify-center cursor-pointer overflow-hidden"
                                onDragOver={(e) => e.preventDefault()}
                                onClick={() => document?.getElementById("image1")?.click()}
                            >
                                {section2Image1Preview ? (
                                    <div className="relative w-full h-full">
                                        <Image src={section2Image1Preview} alt="Preview" layout="fill" objectFit="cover" />
                                        {<button
                                            type="button"
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                setSection2Image1Preview(null); // Clear the preview image
                                                setSection2Image1(null);
                                            }}
                                            className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-1"
                                        >
                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                                <path
                                                    fillRule="evenodd"
                                                    d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                                                    clipRule="evenodd"
                                                />
                                            </svg>
                                        </button>}
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
                                        <p className="mt-1 text-sm text-gray-600">Drag and drop an image here, or click to select a file</p>
                                    </>
                                )}
                                <input type="file" id="image1" accept="image/*" className="hidden" onChange={(e) => handleImageChange({
                                    e,
                                    setImageError: setSection2Image1Error,
                                    setImageFile: setSection2Image1,
                                    setPreviewImage: setSection2Image1Preview
                                })} />
                            </div>
                            {section2Image1Error && <p className="mt-1 text-sm text-red-600">{imageError}</p>}
                        </div>


                        <div>
                            <div>Section 2 - Image 2</div>
                            <div
                                className="w-full h-96 border-2 border-dashed border-gray-300 rounded-lg flex flex-col items-center justify-center cursor-pointer overflow-hidden"
                                onDragOver={(e) => e.preventDefault()}
                                onClick={() => document?.getElementById("image2")?.click()}
                            >
                                {section2Image2Preview ? (
                                    <div className="relative w-full h-full">
                                        <Image src={section2Image2Preview} alt="Preview" layout="fill" objectFit="cover" />
                                        {<button
                                            type="button"
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                setSection2Image2Preview(null); // Clear the preview image
                                                setSection2Image2(null);
                                            }}
                                            className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-1"
                                        >
                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                                <path
                                                    fillRule="evenodd"
                                                    d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                                                    clipRule="evenodd"
                                                />
                                            </svg>
                                        </button>}
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
                                        <p className="mt-1 text-sm text-gray-600">Drag and drop an image here, or click to select a file</p>
                                    </>
                                )}
                                <input type="file" id="image2" accept="image/*" className="hidden" onChange={(e) => handleImageChange({
                                    e,
                                    setImageError: setSection2Image2Error,
                                    setImageFile: setSection2Image2,
                                    setPreviewImage: setSection2Image2Preview
                                })} />
                            </div>
                            {section2Image2Error && <p className="mt-1 text-sm text-red-600">{section2Image2Error}</p>}
                        </div>

                    </div>

                    <div className='grid grid-cols-2 gap-5'>
                        <div>
                            <Label content='Goals' />
                            <div className='h-full'>
                                {/* <Controller
                                    name="goals"
                                    control={control}

                                    render={({ field }) => (
                                        <ReactQuill theme="snow" value={field.value == "<p>undefined</p>" ? "" : field.value} onChange={field.onChange} formats={['html']} className="h-full" />
                                    )}
                                /> */}
                                <RichEditor control={control} name='goals'/>
                            </div>

                        </div>


                        <div>
                            <Label content='Objectives' />
                            <div className='h-full'>
                                {/* <Controller
                                    name="objectives"
                                    control={control}

                                    render={({ field }) => (
                                        <ReactQuill theme="snow" value={field.value == "<p>undefined</p>" ? "" : field.value} onChange={field.onChange} className="h-full" />
                                    )}
                                /> */}
                                <RichEditor control={control} name='objectives'/>
                            </div>

                        </div>

                    </div>

                    <div className='mt-15'>
                        <div>
                            <div>Section 2 - Banner Image</div>
                            <div
                                className="w-full h-96 border-2 border-dashed border-gray-300 rounded-lg flex flex-col items-center justify-center cursor-pointer overflow-hidden"
                                onDragOver={(e) => e.preventDefault()}
                                onClick={() => document?.getElementById("banner")?.click()}
                            >
                                {section2BannerImagePreview ? (
                                    <div className="relative w-full h-full">
                                        <Image src={section2BannerImagePreview} alt="Preview" layout="fill" objectFit="cover" />
                                        {<button
                                            type="button"
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                setSection2BannerImagePreview(null); // Clear the preview image
                                                setSection2BannerImage(null);
                                            }}
                                            className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-1"
                                        >
                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                                <path
                                                    fillRule="evenodd"
                                                    d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                                                    clipRule="evenodd"
                                                />
                                            </svg>
                                        </button>}
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
                                        <p className="mt-1 text-sm text-gray-600">Drag and drop an image here, or click to select a file</p>
                                    </>
                                )}
                                <input type="file" id="banner" accept="image/*" className="hidden" onChange={(e) => handleImageChange({
                                    e,
                                    setImageError: setSection2BannerImageError,
                                    setImageFile: setSection2BannerImage,
                                    setPreviewImage: setSection2BannerImagePreview
                                })} />
                            </div>
                            {section2BannerImageError && <p className="mt-1 text-sm text-red-600">{section2BannerImageError}</p>}
                        </div>
                    </div>

                </div>

                <div className='grid grid-cols-2 gap-5 mt-5'>
                    <div className='h-full'>
                        <div className='w-full flex flex-col gap-2 h-full'>
                            <Label content='Challenge' />
                            <div className='h-full'>
                                {/* <Controller
                                    name="challenge"
                                    control={control}

                                    render={({ field }) => (
                                        <ReactQuill theme="snow" value={field.value == "<p>undefined</p>" ? "" : field.value} onChange={field.onChange} className="h-full" />
                                    )}
                                /> */}
                                <RichEditor control={control} name='challenge'/>
                            </div>

                        </div>
                    </div>

                    <div className='h-full'>
                        <div className='w-full flex flex-col gap-2 h-full'>
                            <Label content='Solutions' />
                            <div className='h-full'>
                                {/* <Controller
                                    name="solutions"
                                    control={control}

                                    render={({ field }) => (
                                        <ReactQuill theme="snow" value={field.value == "<p>undefined</p>" ? "" : field.value} onChange={field.onChange} className="h-full" />
                                    )}
                                /> */}
                                <RichEditor control={control} name='solutions'/>
                            </div>

                        </div>
                    </div>

                </div>

                <div className='grid grid-cols-3 mt-15 h-96 gap-5'>
                    <div className=''>
                        <div className='w-full flex flex-col gap-2 h-full'>
                            <Label content='Result' />
                            <div className='h-full'>
                                {/* <Controller
                                    name="result"
                                    control={control}

                                    render={({ field }) => (
                                        <ReactQuill theme="snow" value={field.value == "<p>undefined</p>" ? "" : field.value} onChange={field.onChange} className="h-full" />
                                    )}
                                /> */}
                                <RichEditor control={control} name='result'/>
                            </div>

                        </div>
                    </div>

                    <div>
                        <Label content='Result-Image1' />
                        <div
                            className="w-full h-full border-2 border-dashed border-gray-300 rounded-lg flex flex-col items-center justify-center cursor-pointer overflow-hidden mt-2"
                            onDragOver={(e) => e.preventDefault()}
                            onClick={() => document?.getElementById("resultimage1")?.click()}
                        >
                            {resultImage1Preview ? (
                                <div className="relative w-full h-full">
                                    <Image src={resultImage1Preview} alt="Preview" layout="fill" objectFit="cover" />
                                    {<button
                                        type="button"
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            setResultImage1Preview(null); // Clear the preview image
                                            setResultImage1(null);
                                        }}
                                        className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-1"
                                    >
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                            <path
                                                fillRule="evenodd"
                                                d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                                                clipRule="evenodd"
                                            />
                                        </svg>
                                    </button>}
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
                                    <p className="mt-1 text-sm text-gray-600">Drag and drop an image here, or click to select a file</p>
                                </>
                            )}
                            <input type="file" id="resultimage1" accept="image/*" className="hidden" onChange={(e) => handleImageChange({
                                e,
                                setImageError: setResultImage1Error,
                                setImageFile: setResultImage1,
                                setPreviewImage: setResultImage1Preview
                            })} />
                        </div>
                        {resultImage1Error && <p className="mt-1 text-sm text-red-600">{resultImage1Error}</p>}
                    </div>

                    <div>
                        <Label content='Result-Image2' />
                        <div
                            className="w-full h-full border-2 border-dashed border-gray-300 rounded-lg flex flex-col items-center justify-center cursor-pointer overflow-hidden mt-2"
                            onDragOver={(e) => e.preventDefault()}
                            onClick={() => document?.getElementById("resultimage2")?.click()}
                        >
                            {resultImage2Preview ? (
                                <div className="relative w-full h-full">
                                    <Image src={resultImage2Preview} alt="Preview" layout="fill" objectFit="cover" />
                                    {<button
                                        type="button"
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            setResultImage2Preview(null); // Clear the preview image
                                            setResultImage2(null);
                                        }}
                                        className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-1"
                                    >
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                            <path
                                                fillRule="evenodd"
                                                d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                                                clipRule="evenodd"
                                            />
                                        </svg>
                                    </button>}
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
                                    <p className="mt-1 text-sm text-gray-600">Drag and drop an image here, or click to select a file</p>
                                </>
                            )}
                            <input type="file" id="resultimage2" accept="image/*" className="hidden" onChange={(e) => handleImageChange({
                                e,
                                setImageError: setResultImage2Error,
                                setImageFile: setResultImage2,
                                setPreviewImage: setResultImage2Preview
                            })} />
                        </div>
                        {resultImage2Error && <p className="mt-1 text-sm text-red-600">{resultImage2Error}</p>}
                    </div>

                </div>

                <div className='mt-15 grid grid-cols-2 gap-5'>

                    <div className='w-full flex flex-col gap-2'>
                        <div>
                            <Label content='Description' />
                            <input type="text" {...register("description", { required: "Description is required" })} className={'rounded-md pl-4 w-full border-gray-300 border-[1px] py-1 text-black bg-transparent focus:outline-none'} />
                            {errors.description && <p className='mt-1 text-sm text-red'>{errors.description.message}</p>}
                        </div>

                    </div>

                    <div className='w-full flex flex-col gap-2'>
                        <Label content='Tag' />
                        <input type="text" {...register("tag", { required: "Tag is required" })} className={'rounded-md pl-4 w-full border-gray-300 border-[1px] py-1 text-black bg-transparent focus:outline-none'} />
                        {errors.tag && <p className='mt-1 text-sm text-red'>{errors.tag.message}</p>}
                    </div>


                </div>

                {/* <DndContext collisionDetection={closestCorners} onDragEnd={handleDragEnd}>
                            <Droppable categories={categories}/>
                </DndContext> */}

                <div className='grid grid-cols-2 mt-14 gap-5'>

                    <div>
                        <Label content='Added Categories' className='' />
                        <div className='w-full h-full border rounded-md gap-1 flex flex-wrap items-start p-4'>
                            {addedCategories.map((item) => (
                                <>
                                    <div className='border rounded-full w-fit py-1 px-2 h-fit bg-blue-950 text-white cursor-pointer relative group' onClick={() => handleSwapItem(item.id)}>
                                        <span className='group-hover:opacity-50'>{item.name}</span>
                                        <div className='w-full h-full bg-transparent absolute rounded-full top-0 left-0 opacity-0 group-hover:opacity-100 flex items-center justify-center text-xl'>
                                            <MdOutlineSwapHorizontalCircle />
                                        </div>
                                    </div>

                                </>
                            ))}
                        </div>
                    </div>

                    <div>
                        <Label content='Available Categories' className='' />
                        <div className='w-full h-full border rounded-md gap-1 flex flex-wrap items-start p-4'>

                            {categories.filter(
                                (item) => !addedCategories.some((addedItem) => addedItem.id === item.id)
                            ).map((item) => (
                                <div className='border rounded-full w-fit py-1 px-2 h-fit bg-blue-950 text-white cursor-pointer relative group' onClick={() => handleSwapItem(item.id)}>
                                    <span className='group-hover:opacity-50'>{item.name}</span>
                                    <div className='w-full h-full bg-transparent absolute rounded-full top-0 left-0 opacity-0 group-hover:opacity-100 flex items-center justify-center text-xl'>
                                        <MdOutlineSwapHorizontalCircle />
                                    </div>
                                </div>
                            ))}


                        </div>
                    </div>

                </div>
                <div className='h-36 w-1/3 mt-10'>
                    <Label content='Logo' />
                    <div
                        className="w-full h-full border-2 border-dashed border-gray-300 rounded-lg flex flex-col items-center justify-center cursor-pointer overflow-hidden"
                        onDragOver={(e) => e.preventDefault()}
                        onClick={() => document?.getElementById("logo")?.click()}
                    >
                        {previewLogo ? (
                            <div className="relative w-full h-full">
                                <img src={previewLogo} alt="Preview" className='object-cover w-full h-full' />
                                {<button
                                    type="button"
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        setPreviewLogo(null); // Clear the preview image
                                        setLogoFile(null);
                                        const inputElement = document.getElementById("logo") as HTMLInputElement;
                                        if (inputElement) {
                                            inputElement.value = ""; // Reset the input value
                                        }
                                    }}
                                    className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-1"
                                >
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                        <path
                                            fillRule="evenodd"
                                            d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                                            clipRule="evenodd"
                                        />
                                    </svg>
                                </button>}
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
                                <p className="mt-1 text-sm text-gray-600">Drag and drop an image here, or click to select a file</p>
                            </>
                        )}
                        <input type="file" id="logo" accept="image/*" className="hidden" onChange={(e) => handleImageChange({ e, setImageError: setLogoError, setImageFile: setLogoFile, setPreviewImage: setPreviewLogo })} />
                    </div>
                    {logoError && <p className="mt-1 text-sm text-red-600">{logoError}</p>}
                </div>

                <div className='mt-25 pb-5'>
                    <div

                        className="inline-flex items-center justify-center rounded-full bg-black px-10 py-2 text-center font-medium text-white hover:bg-opacity-90 lg:px-8 xl:px-10 w-[15%]"
                    >
                        <button type='submit' disabled={isSubmitting}>{isSubmitting ? "Saving" : "Save"}</button>
                    </div>
                </div>
            </form>

        </div>
    )
}

export default AdminIndiCaseStudy