"use client"

import React, { useCallback, useState } from 'react'
import Label from '../Label/Label'
import { BlogInputTypes } from '@/app/types/BlogInputs'
import { Controller, useForm } from 'react-hook-form'
import { handleImageChange } from '@/app/helpers/handleImageChange'
import Image from 'next/image'
import RichEditor from '../RichEditor/RichEditor'
import 'react-quill-new/dist/quill.snow.css';
import ReactQuill, { Quill } from 'react-quill-new'
import htmlEditButton from "quill-html-edit-button";
// import ImageResize from 'quill-image-resize-module-react';
import BlotFormatter from 'quill-blot-formatter';
import { generateAndUploadImage } from '@/app/helpers/generateAndUploadImage'
import { useRef } from 'react'

const BlockEmbed = Quill.import("blots/block/embed");

// class CustomImageBlot extends BlockEmbed {
//     static blotName = "customImage";
//     static tagName = "div";
//     static className = "custom-image-wrapper";

//     static create(value: string) {
//         const wrapper = document.createElement("div");
//         wrapper.setAttribute("class", CustomImageBlot.className);
//         wrapper.style.position = "relative";

//         // Create the image element
//         const img = document.createElement("img");
//         img.setAttribute("src", value);
//         img.style.width = "100%";
//         img.style.display = "block";

//         // Create the delete button
//         const deleteButton = document.createElement("button");
//         deleteButton.textContent = "X";
//         deleteButton.style.position = "absolute";
//         deleteButton.style.top = "5px";
//         deleteButton.style.right = "5px";
//         deleteButton.style.backgroundColor = "red";
//         deleteButton.style.color = "white";
//         deleteButton.style.border = "none";
//         deleteButton.style.borderRadius = "50%";
//         deleteButton.style.cursor = "pointer";
//         deleteButton.style.padding = "0.2rem";

//         // Delete button event
//         deleteButton.addEventListener("click", (e) => {
//             e.preventDefault();
//             const parent = wrapper.parentNode;
//             if (parent) {
//                 parent.removeChild(wrapper);
//             }
//         });

//         // Append elements to the wrapper
//         wrapper.appendChild(img);
//         wrapper.appendChild(deleteButton);

//         return wrapper;
//     }

//     static value(node: HTMLElement) {
//         const img = node.querySelector("img");
//         return img ? img.getAttribute("src") : null;
//     }
// }

Quill.register("modules/htmlEditButton", htmlEditButton);
// Quill.register('modules/imageResize', ImageResize);
Quill.register('modules/blotFormatter', BlotFormatter);
// Quill.register("formats/customImage", CustomImageBlot);

const AdminIndiBlog = () => {

    const [thumbnail, setThumbnail] = useState<File | null>(null)
    const [thumbnailPreview, setThumbnailPreview] = useState<string | null>(null)
    const [thumbnailError, setThumbnailError] = useState<string | null>(null)

    const reactQuillRef  = useRef<ReactQuill | null>(null)

    const {
        register,
        handleSubmit,
        setValue,
        control,
        formState: { errors },
        setError,
        watch,
    } = useForm<BlogInputTypes>()


    const imageHandler = useCallback(() => {
        const input = document.createElement("input");
        input.setAttribute("type", "file");
        input.setAttribute("accept", "image/*");
        input.click();
        input.onchange = async () => {
            if (input !== null && input.files !== null) {
                const file = input.files[0];
                console.log("file", file)
                const url = await generateAndUploadImage(file)
                const quill = reactQuillRef.current?.getEditor();
                if (quill) {
                    const range = quill.getSelection();
                    if (range) {
                        quill.insertEmbed(range.index, "customImage", url); // Insert image at cursor
                      }
                }
            }
        };
    }, []);

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
        },

        toolbar: {
            container: [
                [{ header: "1" }, { header: "2" }, { font: [] },],
                [{ size: [] }],
                ["bold", "italic", "underline", "strike", "blockquote"],
                [
                    { list: "ordered" },
                    { list: "bullet" },
                    { indent: "-1" },
                    { indent: "+1" },
                ],
                ["link", "image", "video","customImage"],
                ["code-block"],
                ["clean"],

            ],
            handlers: {
                image: imageHandler,   // <- 
            },
        },
        clipboard: {
            // toggle to add extra line breaks when pasting HTML:
            matchVisual: false
        },
        imageResize: {
            parchment: Quill.import('parchment'),
            modules: ['Resize', 'DisplaySize']
        },
        blotFormatter: {}

    }


    return (
        <div className='flex gap-2 flex-col'>
            <div className='w-full flex flex-col gap-2'>
                <Label content='Heading' />
                <input type="text" {...register("heading", { required: "Heading is required" })} className={'rounded-md pl-4 w-full border-gray-300 border-[1px] py-1 text-black bg-transparent focus:outline-none'} />
                {errors.heading && <p className='mt-1 text-sm text-red'>{errors.heading.message}</p>}
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


            <div className='w-full flex flex-col gap-2'>
                <Label content='Description' />
                <RichEditor control={control} name='description' />
            </div>

            <div>
                <Label content='Content' />
                <Controller
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
                />
            </div>


        </div>
    )
}

export default AdminIndiBlog