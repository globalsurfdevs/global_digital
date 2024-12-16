import React from 'react'

const Goals = () => {
  return (
    <div className='container mx-auto py-4'>
        <div className='lg:py-24 py-12'>

        
        <div className='grid lg:grid-cols-2 border-t border-b lg:pt-10 lg:pb-20 py-3'>
            <div className='col-span-1 flex'>
                <h1 className='text-font65'>Goals</h1>
            </div>
            <div className='text-font19 pt-2 lg:pl-5'>
                <p>Innovo Group partnered with Global Surf to achieve several key objectives for their website. 
                The primary goal was to create a website that visually and thematically aligned with Innovo’s 
                innovative brand identity. Additionally, Innovo sought to improve website speed and reduce loading 
                times, enhance user experience to retain visitors longer, and increase conversions by attracting 
                more new users while maintaining a consistent user base.</p>
            </div>
        </div>

        <div className='grid lg:grid-cols-2 border-t border-b lg:pt-10 lg:pb-20 py-3'>
            <div className='col-span-1 flex'>
                <h1 className='text-font65'>Objectives</h1>
            </div>
            <div className='text-font19 pt-2 lg:pl-5'>
                <p>To address goals, Global Surf conducted an in-depth analysis of the website&apos;s performance and speed. 
                We implemented structural changes, optimized the code, and compressed media files to enhance site efficiency. 
                Additionally, Global Surf uplifted the brand image by incorporating high-quality branding materials, ensuring 
                a consistent and professional appearance across all touchpoints.</p>
            </div>
        </div>


        <div className='grid lg:grid-cols-2 border-t lg:pt-10 lg:pb-20 py-3'>
            <div className='col-span-1 flex'>
                <h1 className='text-font65'>Challenge</h1>
            </div>
            <div className='text-font19 pt-2 lg:pl-5'>
                <p>Redesigning the website brought several challenges. Migrating from an outdated CMS without disruptions was complex, 
                especially with its limitations. Ensuring cross-browser and mobile compatibility, preserving existing organic traffic, 
                and integrating new branding materials, for a consistent brand experience were all essential. With a product launch 
                looming, we delivered efficiently within tight deadlines.</p>
            </div>
        </div>

        <div className='grid lg:grid-cols-2 lg:space-x-5 lg:py-12 space-y-5 md:space-y-0 py-2'>
            
            <div className='bg-gray-200 flex flex-col w-full py-14 gap-4 px-14'>
            <div>
                <h1 className='text-font65'>Solutions</h1>
            </div>
            <div className='pl-4'>
                <ul className='list-disc flex flex-col gap-4 text-font19'>
                    <li>Implemented a more robust website platform to enhance scalability and security, resulting in a 50% reduction in downtime and a 30% increase in performance.</li>
                    <li>Addressed security vulnerabilities to improve load times and resolve issues that previously compromised the secure browsing experience.</li>
                </ul>
            </div>
            </div>

            <div className='bg-gray-200 flex flex-col w-full py-14 gap-4 px-14'>
            <div>
                <h1 className='text-font65'>Key Achievements</h1>
            </div>
            <div className='pl-4'>
                <ul className='list-disc flex flex-col gap-4 text-font19'>
                    <li>Optimized keywords to drive a 107.3% increase in new user traffic and a 125.5% boost in page views.</li>
                    <li>Redesigned the website and optimized user flow, resulting in a 102.35% growth in engaged sessions and a 125.5% increase in user engagement.</li>
                    <li>Revamped marketing materials with updated design and messaging to boost brand visibility and strengthen brand perception.</li>
                </ul>
            </div>
            </div>


        </div>
        

        </div>

    </div>
  )
}

export default Goals