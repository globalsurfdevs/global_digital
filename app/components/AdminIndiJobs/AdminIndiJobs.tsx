"use client"

import React, {useEffect, useState } from 'react'
import Label from '../Label/Label'
import { Controller, SubmitHandler, useForm } from 'react-hook-form'
import { toast } from 'sonner'
import { useRouter } from 'next/navigation'

import { useParams } from 'next/navigation'
import { JobInputType } from '@/app/types/JobInputType'
import RichEditor from '../RichEditor/RichEditor'
import "quill/dist/quill.snow.css";
import { formatLinkForCareer } from '@/app/helpers/formatLink'


const AdminIndiJob = ({ editMode }: {
    editMode?: boolean
}) => {

    const [isSubmitting, setIsSubmitting] = useState(false)


    const router = useRouter()
    const {jobId} = useParams()

    const {
        register,
        handleSubmit,
        setValue,
        control,
        formState: { errors },
        setError,
        watch,
    } = useForm<JobInputType>()


    const onSubmit: SubmitHandler<JobInputType> = async (data) => {
        setIsSubmitting(true);

            const formData = new FormData();
            formData.append("jobTitle", data.jobTitle);
            formData.append("team", data.team);
            formData.append("description", data.description)
            formData.append("slug", data.slug)

            try {
                const url = editMode ? `/api/jobs?id=${jobId}` : `/api/jobs`;
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
                    router.push('/admin/jobs')
                } else {
                    toast.error(data.error)
                }
                
            } catch (error) {
                console.error("Error updating jobs:", error);
                toast.error("Failed to update job data. Please try again.");
            } finally {
                setIsSubmitting(false);
            }
    }

    
    useEffect(() => {
            const fetchJobData = async () => {
                try {
                    const response = await fetch(`/api/jobs?id=${jobId}`);
                    if (response.ok) {
                        const data = await response.json();
                        
                        if (data.jobs[0]) {
                            setValue("jobTitle", data.jobs[0].jobTitle)
                            setValue("team", data.jobs[0].team)
                           setValue("description",data.jobs[0].description)
    
                        }

                    } else {
                        console.error("Failed to fetch job data");
                    }
                } catch (error) {
                    console.error("Error fetching job data:", error);
                }
            }
    
            if (editMode) {
                fetchJobData()
            }
    
        }, [])

        useEffect(()=>{
            setValue("slug",formatLinkForCareer(watch("jobTitle")))
        },[watch("jobTitle")])


    return (
        <form className='flex gap-2 flex-col' onSubmit={handleSubmit(onSubmit)}>
            <div className='w-full flex flex-col gap-2'>
                <Label content='Job title' />
                <input type="text" {...register("jobTitle", { required: "Job Title is required" })} className={'rounded-md pl-4 w-full border-gray-300 border-[1px] py-1 text-black bg-transparent focus:outline-none'} />
                {errors.jobTitle && <p className='mt-1 text-sm text-red'>{errors.jobTitle.message}</p>}
            </div>

            <div className='w-full flex flex-col gap-2'>
                <Label content='Slug' />
                <input type="text" {...register("slug")} readOnly className={'rounded-md pl-4 w-full border-gray-300 border-[1px] py-1 text-black bg-transparent focus:outline-none'} />
            </div>

            <div className='w-full flex flex-col gap-2'>
                <Label content='Team' />
                <input type="text" {...register("team", { required: "Team is required" })} className={'rounded-md pl-4 w-full border-gray-300 border-[1px] py-1 text-black bg-transparent focus:outline-none'} />
                {errors.team && <p className='mt-1 text-sm text-red'>{errors.team.message}</p>}
            </div>

            <div className='w-full flex flex-col gap-2'>
                <Label content='Description' />
                {/* <textarea {...register("description",{ required: "Description is required" })} className={'rounded-md pl-4 w-full border-gray-300 border-[1px] py-1 text-black bg-transparent focus:outline-none'} /> */}
                <RichEditor control={control} name="description" />
                {errors.description && <p className='mt-1 text-sm text-red'>{errors.description.message}</p>}
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

export default AdminIndiJob