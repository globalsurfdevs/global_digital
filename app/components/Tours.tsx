import React from 'react'

const Tours = () => {
  return (
    <div className='container px-4 mx-auto'>
        <div className='py-24 flex flex-col gap-10 border-b'>
        <h1 className='text-4xl'>Featured Tours</h1>
        <div className='grid grid-cols-2 gap-8'>
            <div className='bg-black h-96'>
                Bafco
            </div>

            <div className='bg-gray-500 h-96'>
                Saleo
            </div>
        </div>
        <div className='w-full flex justify-center'>
            <button className='border py-3 px-24 rounded-full'>VIEW ALL</button>
        </div>
        </div>
        
    </div>
  )
}

export default Tours