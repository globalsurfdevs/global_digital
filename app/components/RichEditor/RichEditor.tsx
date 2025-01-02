import React from 'react'
import { Control, Controller, Path } from 'react-hook-form'
import ReactQuill, { Quill } from 'react-quill-new'
import htmlEditButton from "quill-html-edit-button";

Quill.register("modules/htmlEditButton", htmlEditButton);

type PortfolioInputs = {
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
}

type CaseStudyInputs = {
    heading:string;
    sHeading:string;
    story:string;
    industry:string;
    country:string;
    channelsUsed:string;
    goals:string;
    objectives:string;
    challenge:string;
    overcomingChallenges:string;
    achievements:string;
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

const RichEditor = <T extends PortfolioInputs | CaseStudyInputs>({control,name}:{
    control: Control<T, any>;
    name:Path<T>;
}) => {
    return (
        <Controller
            name={name}
            control={control}
            rules={name=="story" ? { required: "Story is required" } : undefined }
            render={({ field }) => (
                <ReactQuill theme="snow" value={field.value} onChange={field.onChange} className="h-full" modules={modules} />
            )}
        />
    )
}

export default RichEditor