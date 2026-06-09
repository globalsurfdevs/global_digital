"use client"

import React, { useEffect, useState } from 'react'
import { toast } from 'sonner'
import { IoIosClose } from 'react-icons/io'

type Industry = { _id: string; name: string }

const IndustryManager = () => {
    const [industries, setIndustries] = useState<Industry[]>([])
    const [newIndustry, setNewIndustry] = useState("")
    const [loading, setLoading] = useState(false)
    const [refetch, setRefetch] = useState(false)

    useEffect(() => {
        const fetch_ = async () => {
            const res = await fetch('/api/industries')
            const data = await res.json()
            if (!data.error) setIndustries(data.industries)
        }
        fetch_()
    }, [refetch])

    const handleAdd = async () => {
        if (!newIndustry.trim()) return toast.error("Enter an industry name")
        setLoading(true)
        const formData = new FormData()
        formData.append("name", newIndustry.trim())
        const res = await fetch('/api/industries', { method: "POST", body: formData })
        const data = await res.json()
        if (data.error) toast.error(data.error)
        else {
            toast.success(data.message)
            setNewIndustry("")
            setRefetch(p => !p)
        }
        setLoading(false)
    }

    const handleDelete = async (id: string) => {
        const res = await fetch(`/api/industries?id=${id}`, { method: "DELETE" })
        const data = await res.json()
        if (data.error) toast.error(data.error)
        else {
            toast.success(data.message)
            setRefetch(p => !p)
        }
    }

    return (
        <div className="border rounded-xl p-5 flex flex-col gap-4">
            <h2 className="text-xl font-semibold">Manage Industries</h2>

            {/* Add */}
            <div className="flex gap-2">
                <input
                    type="text"
                    value={newIndustry}
                    onChange={e => setNewIndustry(e.target.value)}
                    onKeyDown={e => e.key === "Enter" && handleAdd()}
                    placeholder="e.g. Healthcare"
                    className="rounded-md pl-4 border border-gray-300 py-1 flex-1 text-black bg-transparent focus:outline-none"
                />
                <button
                    onClick={handleAdd}
                    disabled={loading}
                    className="bg-black text-white px-5 py-1 rounded-full text-sm"
                >
                    {loading ? "Adding..." : "Add"}
                </button>
            </div>

            {/* List */}
            <div className="flex flex-wrap gap-2">
                {industries.length === 0 && <p className="text-sm text-gray-400">No industries yet.</p>}
                {industries.map(item => (
                    <div
                        key={item._id}
                        className="flex items-center gap-1 border rounded-full px-3 py-1 text-sm bg-gray-100"
                    >
                        <span>{item.name}</span>
                        <button onClick={() => handleDelete(item._id)}>
                            <IoIosClose className="text-lg text-red-500" />
                        </button>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default IndustryManager