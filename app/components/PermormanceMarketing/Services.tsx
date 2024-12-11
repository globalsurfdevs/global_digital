import React from 'react'

const Services = () => {
  return (
    <div className='container mx-auto py-4'>
        <div className='py-24 grid grid-cols-5'>
            
            <div className='col-span-2 text-5xl'>
                <h1>Our Services Included</h1>
            </div>

            <div className='w-full col-span-3'>
                
                <div className='flex gap-10 py-5 border-t border-b'>
                    <div>01</div>
                    <div>Media Strategy Consulting</div>
                </div>

                <div className='flex gap-10 py-5 border-t border-b'>
                    <div>02</div>
                    <div>Campaign Planning & Execution</div>
                </div>

                <div className='flex gap-10 py-5 border-t border-b'>
                    <div>03</div>
                    <div>Audience Targeting & Segmentation</div>
                </div>

                <div className='flex gap-10 py-5 border-t border-b'>
                    <div>04</div>
                    <div>Platform Setup & Optimization</div>
                </div>

                <div className='flex gap-10 py-5 border-t border-b'>
                    <div>05</div>
                    <div>Campaign Execution & Management</div>
                </div>

                <div className='flex gap-10 py-5 border-t border-b'>
                    <div>06</div>
                    <div>A/B Testing & Performance Improvement</div>
                </div>

                <div className='flex gap-10 py-5 border-t border-b'>
                    <div>07</div>
                    <div>Data-Driven Reporting & Analysis</div>
                </div>

                <div className='flex gap-10 py-5 border-t border-b'>
                    <div>08</div>
                    <div>Creative Content Development & Curation</div>
                </div>

            </div>
        
        </div>
    </div>
  )
}

export default Services