import { Portfolio } from '@/app/types/Portfolio'
import Link from 'next/link'
import React, { Dispatch, SetStateAction } from 'react'
import { IoIosClose } from 'react-icons/io'
import { toast } from 'sonner'
import { useSortable } from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'

const PortfolioCard = ({item,setRefetch,id,reorderMode}:{
    item:Portfolio
    setRefetch:Dispatch<SetStateAction<boolean>>
    id:number
    reorderMode?:boolean
}) => {

    const {attributes,listeners,setNodeRef,transform,transition} = useSortable({id})

    const style = {
        transition,
        transform:CSS.Transform.toString(transform)
    }

    const handlePortfolioDelete = async(id:number) =>{
        try {
            const response = await fetch(`/api/portfolio?id=${id}`,{
                method:"DELETE"
            });
                if (response.ok) {
                    const data = await response.json();
                    toast.success(data.message)
                    setRefetch((prev)=>!prev)
                } else {
                    console.error("Failed to remove portfolio data");
                }
        } catch (error) {
            console.error("Error deleting portfolio:",error)
        }
    }

  return (
    <div className='w-full relative' key={item.id} ref={setNodeRef} {...attributes} {...listeners} style={style}>

                            <Link href={!reorderMode && item.section=='portfolio' ?  `/admin/portfolio/${item.id}` : !reorderMode && item.section=="case study" ? `/admin/case-study/${item.id}` : '#'} className="w-full h-32 flex flex-col items-center justify-between bg-white border border-gray-200 rounded-lg shadow md:flex-row hover:bg-gray-100 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700">
                                <div className='h-full grid grid-cols-2 w-full'>
                                    <div className='flex h-full w-full'>
                                    <img className="object-cover w-full rounded-t-lg h-full md:h-full md:w-48 md:rounded-none md:rounded-s-lg" src={item.bannerImage ?? item.coverImage} alt="" />
                                    <div className="flex flex-col justify-between p-4 leading-normal items-center">
                                        <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">{item.section=='portfolio' ? item.companyName : item.heading}</h5>
                                    </div>
                                    </div>
                                    <div className='flex items-center'>
                                        section : {item.section}
                                    </div>
                                </div>

                                
                            </Link>

                            <div className='justify-start flex h-full p-2 absolute top-5 right-5'>
                                    <div className='size-5 bg-red-600 rounded-full items-center flex justify-center text-xl text-white' onClick={()=>handlePortfolioDelete(item.id)}><IoIosClose/></div>
                                </div>

                        </div>
  )
}

export default PortfolioCard