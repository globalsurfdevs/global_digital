import React from 'react'

const FAQ = () => {
  return (
    <div className='container mx-auto py-4'>
        <div className='py-24 grid grid-cols-7'>
            
            <div className='col-span-2 text-4xl'>
                <h1>FAQ</h1>
            </div>

            <div className='col-span-5 w-full'>
                
                <div className='flex justify-between w-full border-b border-t py-8 items-center gap-3'>
                    <div className='text-[30px]'>
                        1. What is performance marketing, and how is it different from traditional marketing?
                    </div>
                    <div>&#8595;</div>
                </div>

                <div className='flex justify-between w-full border-b border-t py-8 items-center gap-3'>
                    <div className='flex flex-col gap-2'>
                        <div className='text-[30px]'>2. What services and platforms are included in performance marketing?</div>
                        <div>It includes PPC ads, social media ads, retargeting, affiliate marketing, and email marketing across platforms like Google, Facebook, LinkedIn, and Instagram.</div>
                    </div>
                    <div className='text-5xl text-primary'>&#8593;</div>
                </div>

                <div className='flex justify-between w-full border-b border-t py-8  items-center gap-3'>
                    <div className='text-[30px]'>
                    3. How long does it take to see results, and what ROI can I expect?
                    </div>
                    <div>&#8595;</div>
                </div>

                <div className='flex justify-between w-full border-b border-t py-8  items-center gap-3'>
                    <div className='text-[30px]'>
                    4. How do you measure and report campaign success?
                    </div> 
                    <div>&#8595;</div>
                </div> 
            
            </div>
        
        </div>
    </div>
  )
}

export default FAQ