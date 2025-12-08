"use client"

import React, { SetStateAction, useCallback, useEffect, useState } from 'react'
import Label from '../Label/Label'
import { BlogInputTypes } from '@/app/types/BlogInputs'
import { Controller, SubmitHandler, useForm } from 'react-hook-form'
import { handleImageChange } from '@/app/helpers/handleImageChange'
import Image from 'next/image'
import RichEditor from '../RichEditor/RichEditor'
import "quill/dist/quill.snow.css";
import ReactQuill, { Quill } from 'react-quill-new'
import htmlEditButton from "quill-html-edit-button";
// import ImageResize from 'quill-image-resize-module-react';
import BlotFormatter from 'quill-blot-formatter';
import { generateAndUploadImage } from '@/app/helpers/generateAndUploadImage'
import { useRef } from 'react'
import { removeFromDropbox } from '@/app/lib/uploadToDropbox'
import { removeFromDropboxForBlog, uploadToDropboxForBlog } from '@/app/lib/uploadToDropboxForBlog'
import { toast } from 'sonner'
import { useRouter } from 'next/navigation'
import { generateSlugForBlog } from '@/app/helpers/generateSlug'
import TinyEditor from '../TinyMce/TinyEditor'
import { uploadImagesFromEditor } from '@/app/helpers/uploadImagesFromEditor'
import { useParams } from 'next/navigation'



Quill.register("modules/htmlEditButton", htmlEditButton);
// Quill.register('modules/imageResize', ImageResize);
Quill.register('modules/blotFormatter', BlotFormatter);




const AdminIndiBlog = ({ editMode }: {
    editMode?: boolean
}) => {

    const [thumbnail, setThumbnail] = useState<File | null>(null)
    const [thumbnailPreview, setThumbnailPreview] = useState<string | null>(null)
    const [thumbnailError, setThumbnailError] = useState<string | null>(null)
    const [addedImages, setAddedImages] = useState<{ url: string, path: string }[]>([])
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [blogContent, setBlogContent] = useState("")

    const reactQuillRef = useRef<ReactQuill | null>(null)

    const router = useRouter()
    const {blogId} = useParams()

    const {
        register,
        handleSubmit,
        setValue,
        control,
        formState: { errors },
        setError,
        watch,
    } = useForm<BlogInputTypes>()


    const onSubmit: SubmitHandler<BlogInputTypes> = async (data) => {
        setIsSubmitting(true);

        const uploadedImages = await uploadImagesFromEditor(blogContent)
        const actualContent = uploadedImages
        if (actualContent) {
            const formData = new FormData();
            formData.append("heading", data.heading);
            formData.append("description", data.description);
            // formData.append("thumbnail", data.thumbImage);
            formData.append("slug", data.slug)
            formData.append("content", actualContent)
            formData.append("category",data.category)


            if (thumbnail) {
                const image = await generateAndUploadImage(thumbnail)
                if (image) {
                    formData.append("thumbnail", image)
                }
            }

            try {
                const url = editMode ? `/api/blogs?id=${blogId}` : `/api/blogs`;
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
                    router.push('/admin/blogs')
                } else {
                    toast.error(data.error)
                }
                
            } catch (error) {
                console.error("Error updating blog:", error);
                toast.error("Failed to update blog data. Please try again.");
            } finally {
                setIsSubmitting(false);
            }

        }else{
            setIsSubmitting(false)
        }
       
    }

    useEffect(() => {
        setValue("slug", generateSlugForBlog(watch("heading")))
    }, [watch("heading")])

    
    useEffect(() => {
            const fetchBlogData = async () => {
                try {
                    const response = await fetch(`/api/blogs?id=${blogId}`);
                    if (response.ok) {
                        const data = await response.json();
                        
                        if (data.blogs[0]) {
                            setValue("heading", data.blogs[0].heading)
                            setValue("slug", data.blogs[0].slug)
                           setValue("category",data.blogs[0].category)
                            
    
                            if (data.blogs[0].thumbnail) {
                               
                                setThumbnailPreview(data.blogs[0].thumbnail as string);
    
                            }
                            
                            if(data.blogs[0].content){
                                setBlogContent(data.blogs[0].content)
                            }
    
                        }

    
                    } else {
                        console.error("Failed to fetch blog data");
                    }
                } catch (error) {
                    console.error("Error fetching blog data:", error);
                }
            }
    
            if (editMode) {
                fetchBlogData()
            }
    
        }, [])


    return (
        <form className='flex gap-2 flex-col' onSubmit={handleSubmit(onSubmit)}>
            <div className='w-full flex flex-col gap-2'>
                <Label content='Heading' />
                <input type="text" {...register("heading", { required: "Heading is required" })} className={'rounded-md pl-4 w-full border-gray-300 border-[1px] py-1 text-black bg-transparent focus:outline-none'} />
                {errors.heading && <p className='mt-1 text-sm text-red'>{errors.heading.message}</p>}
            </div>

            <div className='w-full flex flex-col gap-2'>
                <Label content='Slug' />
                <input type="text" {...register("slug")} readOnly className={'rounded-md pl-4 w-full border-gray-300 border-[1px] py-1 text-black bg-transparent focus:outline-none'} />
            </div>

            <div className='w-full flex flex-col gap-2'>
                <Label content='Category' />
                <input type="text" {...register("category",{ required: "Category is required" })} className={'rounded-md pl-4 w-full border-gray-300 border-[1px] py-1 text-black bg-transparent focus:outline-none'} />
                {errors.category && <p className='mt-1 text-sm text-red'>{errors.category.message}</p>}
            </div>

            <div>
                <div>Thumbnail</div>
                <div
                    className="w-full h-96 border-2 border-dashed border-gray-300 rounded-lg flex flex-col items-center justify-center cursor-pointer overflow-hidden"
                    onDragOver={(e) => e.preventDefault()}
                    onClick={() => document?.getElementById("thumbnail")?.click()}
                >
                    {thumbnailPreview ? (
                        <div className="relative w-full h-full">
                            <Image src={thumbnailPreview} alt="Preview" layout="fill" objectFit="cover" />
                            {<button
                                type="button"
                                onClick={(e) => {
                                    e.stopPropagation();
                                    setThumbnailPreview(null); // Clear the preview image
                                    setThumbnail(null);
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
                    <input type="file" id="thumbnail" accept="image/*" className="hidden" onChange={(e) => handleImageChange({
                        e,
                        setImageError: setThumbnailError,
                        setImageFile: setThumbnail,
                        setPreviewImage: setThumbnailPreview
                    })} />
                </div>
                {thumbnailError && <p className="mt-1 text-sm text-red-600">{thumbnailError}</p>}
            </div>


            {/* <div className='w-full flex flex-col gap-2'>
                <Label content='Description' />
                <RichEditor control={control} name='description' />
            </div> */}

            <div>
                <Label content='Content' />
                <TinyEditor setBlogContent={setBlogContent} blogContent={editMode && blogContent}/>
                {/* <Controller
                    name={"content"}
                    control={control}
                    rules={{ required: "Content is required" }}
                    render={({ field }) => (
                        <ReactQuill theme="snow" value={field.value} onChange={field.onChange} ref={reactQuillRef} className="h-full" modules={modules} formats={[
                            "header",
                            "font",
                            "size",
                            "bold",
                            "italic",
                            "underline",
                            "strike",
                            "align",
                            "blockquote",
                            "list",
                            "bullet",
                            "indent",
                            "link",
                            "image",
                            "video",
                            "code-block",
                        ]} />
                    )}

                /> */}
            </div>


            <div className='mt-25 pb-5'>
                <div

                    className="inline-flex items-center justify-center rounded-full bg-black px-10 py-2 text-center font-medium text-white hover:bg-opacity-90 lg:px-8 xl:px-10 w-[15%]"
                >
                    <button type='submit' disabled={isSubmitting}>{isSubmitting ? "Saving" : "Save"}</button>
                </div>
            </div>

        </form>
    )
}

export default AdminIndiBlog