import React from 'react'

const Services = () => {
  return (
    <div className='container mx-auto py-4'>
        <div className=' pt-[140px] pb-[150px] grid grid-cols-7'>

            <div className='col-span-2 text-5xl'>
                <h1 className='text-font65 leading-lh1p07'>Our Services Included</h1>
            </div>

            <div className='w-full col-span-5 ps-12 text-font30'>

                <div className='flex gap-10 py-[30px] border-t border-b'>
                    <p className='text-gray1'>01</p>
                    <div><p>Media Strategy Consulting</p></div>
                </div>

                <div className='flex gap-10 py-[30px] border-t border-b'>
                <p className='text-gray1'>02</p>
                    <div><p>Campaign Planning & Execution</p></div>
                </div>

                <div className='flex gap-10 py-[30px] border-t border-b'>
                <p className='text-gray1'>03</p>
                    <div><p>Audience Targeting & Segmentation</p></div>
                </div>

                <div className='flex gap-10 py-[30px] border-t border-b'>
                <p className='text-gray1'>04</p>
                    <div><p>Platform Setup & Optimization</p></div>
                </div>

                <div className='flex gap-10 py-[30px] border-t border-b'>
                <p className='text-gray1'>05</p>
                    <div><p>Campaign Execution & Management</p></div>
                </div>

                <div className='flex gap-10 py-[30px] border-t border-b'>
                <p className='text-gray1'>06</p>
                    <div><p>A/B Testing & Performance Improvement</p></div>
                </div>

                <div className='flex gap-10 py-[30px] border-t border-b'>
                <p className='text-gray1'>07</p>
                    <div><p>Data-Driven Reporting & Analysis</p></div>
                </div>

                <div className='flex gap-10 py-[30px] border-t border-b'>
                <p className='text-gray1'>08</p>
                    <div><p>Creative Content Development & Curation</p></div>
                </div>

            </div>

        </div>
    </div>
  )
}

export default Services