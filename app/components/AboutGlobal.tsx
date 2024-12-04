import React from 'react'

const AboutGlobal = () => {
    return (
        <div className='container mx-auto px-4 py-4'>
            <div className='flex flex-col gap-8 py-24 border-b-slate-400'>
                <h1 className="text-4xl md:text-6xl leading-tight">
                    Hello<span className='text-red-600'>!</span>
                </h1>
                <h3 className='text-xl w-1/2'>We’re Global Surf Digital, a full-service digital marketing agency in Dubai,
                    specializing in data-driven strategies, creative innovation, and business-focused solutions.</h3>
                <button className='border-b-orange-500 border w-fit p-3 flex gap-1 items-center border-t-0 border-l-0 border-r-0'><h5 className='text-sm font-bold'>ABOUT GS.DIGITAL</h5><span>&#11111;</span></button>
            </div>
        </div>
    )
}

export default AboutGlobal