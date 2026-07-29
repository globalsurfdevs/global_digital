"use client"

import React, { useEffect, useState } from 'react'
import { Label } from '@/components/ui/label'
import { Button } from '@/components/ui/button'
import { FiUploadCloud, FiCheckCircle, FiXCircle, FiX, FiFileText } from "react-icons/fi";
import AdminItemContainer from '@/app/components/common/AdminItemContainer';

interface SitemapInfo {
    updatedAt: string;
    urlCount: number;
    content: string;
}

const SitemapPage = () => {

    const [file, setFile] = useState<File | null>(null);
    const [uploading, setUploading] = useState(false);
    const [removing, setRemoving] = useState(false);
    const [status, setStatus] = useState<{ type: 'success' | 'error'; message: string } | null>(null);

    const [sitemapInfo, setSitemapInfo] = useState<SitemapInfo | null>(null);
    const [loadingInfo, setLoadingInfo] = useState(true);

    const fetchSitemapInfo = async () => {
        setLoadingInfo(true);
        try {
            const response = await fetch(`/api/sitemap`);
            if (response.ok) {
                const data = await response.json();
                setSitemapInfo(data.data ?? null);
            } else {
                setSitemapInfo(null);
            }
        } catch (error) {
            console.log("Error in fetching sitemap info", error);
            setSitemapInfo(null);
        } finally {
            setLoadingInfo(false);
        }
    }

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const selected = e.target.files?.[0] ?? null;
        setStatus(null);

        if (selected && !selected.name.endsWith('.xml')) {
            setStatus({ type: 'error', message: 'File must be a .xml file' });
            setFile(null);
            return;
        }
        setFile(selected);
    }

    const handleUpload = async () => {
        if (!file) return;

        setUploading(true);
        setStatus(null);

        try {
            const formData = new FormData();
            formData.append('file', file);

            const response = await fetch(`/api/sitemap`, {
                method: 'POST',
                body: formData,
            });

            const data = await response.json();

            if (response.ok) {
                setStatus({ type: 'success', message: data.message ?? 'Sitemap uploaded successfully' });
                setFile(null);
                fetchSitemapInfo();
            } else {
                setStatus({ type: 'error', message: data.message ?? 'Upload failed' });
            }
        } catch (error) {
            console.log("Error in uploading sitemap", error);
            setStatus({ type: 'error', message: 'Upload failed. Please try again.' });
        } finally {
            setUploading(false);
        }
    }

    const handleRemove = async () => {
        setRemoving(true);
        setStatus(null);

        try {
            const response = await fetch(`/api/sitemap`, {
                method: 'DELETE',
            });

            const data = await response.json();

            if (response.ok) {
                setSitemapInfo(null);
                setStatus({ type: 'success', message: data.message ?? 'Sitemap removed' });
            } else {
                setStatus({ type: 'error', message: data.message ?? 'Failed to remove sitemap' });
            }
        } catch (error) {
            console.log("Error in removing sitemap", error);
            setStatus({ type: 'error', message: 'Failed to remove sitemap. Please try again.' });
        } finally {
            setRemoving(false);
        }
    }

    useEffect(() => {
        fetchSitemapInfo();
    }, []);

    return (
        <div className='flex flex-col gap-5 pb-5'>
            <AdminItemContainer>
                <Label main>Sitemap</Label>

                <div className='p-5 rounded-md flex flex-col gap-3'>

                    {loadingInfo ? (
                        <p className='text-sm text-gray-500'>Loading...</p>
                    ) : sitemapInfo ? (
                        <div className='border border-black/20 rounded-md p-4 flex flex-col gap-3 relative'>
                            <button
                                type='button'
                                onClick={handleRemove}
                                disabled={removing}
                                className='absolute top-3 right-3 text-gray-500 hover:text-red-600 cursor-pointer disabled:opacity-50'
                                aria-label='Remove sitemap'
                            >
                                <FiX className='text-xl' />
                            </button>

                            <div className='flex items-center gap-3'>
                                <FiFileText className='text-2xl text-gray-500 flex-shrink-0' />
                                <div className='flex flex-col'>
                                    <span className='font-bold text-sm'>sitemap.xml</span>
                                    <span className='text-xs text-gray-500'>
                                        {sitemapInfo.urlCount} URLs · Updated {new Date(sitemapInfo.updatedAt).toLocaleString()}
                                    </span>
                                </div>
                            </div>

                            
                            <a    href='/sitemap.xml'
                                target='_blank'
                                rel='noopener noreferrer'
                                className='text-sm text-blue-600 underline w-fit'
                            >
                                View live sitemap
                            </a>
                        </div>
                    ) : (
                        <>
                            <div className='border border-dashed border-black/20 rounded-md p-6 flex flex-col items-center justify-center gap-2'>
                                <FiUploadCloud className='text-3xl text-gray-400' />
                                <input
                                    type='file'
                                    accept='.xml'
                                    onChange={handleFileChange}
                                    className='text-sm'
                                />
                                {file && (
                                    <p className='text-sm text-gray-600'>Selected: {file.name}</p>
                                )}
                            </div>

                            <div className='flex justify-end'>
                                <Button
                                    type='button'
                                    className='text-white'
                                    disabled={!file || uploading}
                                    onClick={handleUpload}
                                >
                                    {uploading ? 'Uploading...' : 'Upload Sitemap'}
                                </Button>
                            </div>
                        </>
                    )}

                    {status && (
                        <div className={`flex items-center gap-2 text-sm ${status.type === 'success' ? 'text-green-600' : 'text-red-500'}`}>
                            {status.type === 'success' ? <FiCheckCircle /> : <FiXCircle />}
                            <p>{status.message}</p>
                        </div>
                    )}

                </div>
            </AdminItemContainer>
        </div>
    )
}

export default SitemapPage