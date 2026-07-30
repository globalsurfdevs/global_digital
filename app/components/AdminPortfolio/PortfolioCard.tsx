import { Portfolio } from '@/app/types/Portfolio'
import Link from 'next/link'
import React, { Dispatch, SetStateAction } from 'react'
import { toast } from 'sonner'
import { useSortable } from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'
import { MdDragIndicator, MdDelete } from 'react-icons/md'

const PortfolioCard = ({ item, setRefetch, id, reorderMode }: {
    item: Portfolio
    setRefetch: Dispatch<SetStateAction<boolean>>
    id: number
    reorderMode?: boolean
}) => {

    const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({ id })

    const style = {
        transition,
        transform: CSS.Transform.toString(transform),
    }

    const handlePortfolioDelete = async (e: React.MouseEvent, id: string) => {
        e.preventDefault()
        e.stopPropagation()

        try {
            const response = await fetch(`/api/portfolio?id=${id}`, {
                method: "DELETE"
            });
            if (response.ok) {
                const data = await response.json();
                toast.success(data.message)
                setRefetch((prev) => !prev)
            } else {
                toast.error("Failed to remove portfolio data")
            }
        } catch (error) {
            console.error("Error deleting portfolio:", error)
            toast.error("Something went wrong")
        }
    }

    const title = item.section === 'portfolio' || item.section === 'case study new'
        ? item.companyName
        : item.heading

    const href = !reorderMode
        ? item.section === 'portfolio' || item.section === 'case study new'
            ? `/admin/portfolio/${item._id}`
            : item.section === 'case study'
                ? `/admin/case-study/${item._id}`
                : '#'
        : '#'

    return (
        <div
            ref={setNodeRef}
            style={style}
            className={`group relative w-full rounded-xl border border-gray-200 bg-white shadow-sm transition-all dark:border-gray-700 dark:bg-gray-800 ${
                isDragging ? "z-10 scale-[1.02] opacity-90 shadow-lg" : "hover:shadow-md"
            }`}
        >
            <div className="flex h-32 items-stretch">
                {reorderMode && (
                    <button
                        {...attributes}
                        {...listeners}
                        type="button"
                        className="flex w-10 shrink-0 cursor-grab items-center justify-center rounded-l-xl bg-gray-50 text-gray-400 transition-colors hover:bg-gray-100 hover:text-gray-600 active:cursor-grabbing dark:bg-gray-700/50 dark:hover:bg-gray-700"
                    >
                        <MdDragIndicator className="text-xl" />
                    </button>
                )}

                <Link
                    href={href}
                    className={`flex flex-1 items-center overflow-hidden rounded-xl ${reorderMode ? "rounded-l-none" : ""} ${
                        reorderMode ? "pointer-events-none" : ""
                    }`}
                >
                    <div className="h-full w-32 shrink-0 overflow-hidden md:w-48">
                        <img
                            className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                            src={item.bannerImage ?? item.coverImage}
                            alt={title ?? "Portfolio image"}
                        />
                    </div>

                    <div className="flex flex-1 flex-col justify-center gap-2 px-5 py-4 min-w-0">
                        <h5 className="truncate text-lg font-semibold text-gray-900 dark:text-white">
                            {title}
                        </h5>
                        <span className="inline-flex w-fit items-center rounded-full bg-blue-50 px-2.5 py-0.5 text-xs font-medium capitalize text-blue-700 dark:bg-blue-500/10 dark:text-blue-400">
                            {item.section}
                        </span>
                    </div>
                </Link>
            </div>

            {!reorderMode && (
                <button
                    type="button"
                    onClick={(e) => handlePortfolioDelete(e, item._id)}
                    className="absolute right-3 top-3 flex h-7 w-7 items-center justify-center rounded-full bg-white text-gray-400 opacity-0 shadow-sm ring-1 ring-gray-200 transition-all hover:bg-red-50 hover:text-red-600 hover:ring-red-200 group-hover:opacity-100 dark:bg-gray-800 dark:ring-gray-600"
                >
                    <MdDelete className="text-sm" />
                </button>
            )}
        </div>
    )
}

export default PortfolioCard