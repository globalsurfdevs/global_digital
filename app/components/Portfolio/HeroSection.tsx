"use client"
import { motion } from 'framer-motion';
import { assets } from '@/public/assets/assets'
import Image from 'next/image'


const HeroSection = () => {
  const portfolioData = [
    {
      title: 'Lorem Ipsum',
      description: 'Lorem Ipsum is simply dummy text of the printing',
      tag: 'SaaS',
      imageSrc: assets.imgs1,
    },
    {
      title: 'Lorem Ipsum',
      description: 'Lorem Ipsum is simply dummy text of the printing',
      tag: 'Fintech',
      imageSrc: assets.imgs2,
    },
    {
      title: 'Lorem Ipsum',
      description: 'Lorem Ipsum is simply dummy text of the printing',
      tag: 'Fintech',
      imageSrc: assets.imgs2,
    },
    {
      title: 'Lorem Ipsum',
      description: 'Lorem Ipsum is simply dummy text of the printing',
      tag: 'Fintech',
      imageSrc: assets.imgs2,
    },
  ];
  return (
    <>
      <div className='container mx-auto py-4'>
      <motion.div
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.3 }} // Trigger animation once when 50% visible
                    variants={{
                      hidden: { opacity: 0, y: 50 }, // Start below and invisible
                      visible: { opacity: 1, y: 0, transition: { duration: 1, ease: "easeOut" } }, // Slide up and fade in
                      }}
        >
        <div className='lg:grid lg:grid-cols-8 items-center border-b lg:pt-[130px] sm:pt-[50px] pt-[20px] pb-[50px] flex flex-col gap-2'>

          <div className='text-font80 lg:col-span-2 xl:col-span-2 lg:text-left w-full h-full'>
            <h1 className='title-80'>Work</h1>
          </div>

          <div className='lg:col-span-6 xl:col-span-6 flex   items-center w-full h-full   lg:py-4 pt-4 pb-0'>

            <p className='text-30 text-gray1'>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry&apos;s standard dummy text ever since the 1500s</p>
          </div>

        </div>
        </motion.div>
        <div className="lg:grid lg:grid-cols-2 lg:gap-8 gap-8 lg:gap-y-12 items-center border-b lg:pt-[130px]  pt-[50px] pb-10 flex flex-col ">
          {portfolioData.map((item, index) => (

            <motion.div
            key={index}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }} // Trigger animation once when 50% visible
        variants={{
          hidden: { opacity: 0, y: 50 }, // Start below and invisible
          visible: { opacity: 1, y: 0, transition: { duration: 1.3, ease: "easeOut" } }, // Slide up and fade in
          }}
>
            <div  className="portfolio-card col-span-1 group">
              <div className="relative card-img">
                <Image src={item.imageSrc} alt="image" className="w-[100%]" />
                <div className="bg-gray1 group-hover:z-[1] group-hover:bg-primary ease-in-out duration-200 group-hover:text-white absolute md:top-5 md:left-5 top-3 left-3 px-4 py-2 rounded-3xl cursor-pointer">
                  <div className="text-white uppercase  "><p className='text-font14'>{item.tag}</p></div>
                </div>
              </div>
              <div className="mt-3 md:mt-4">
                <h3 className="text-30 mb-1 md:mb-2 group-hover:text-primary ease-in-out duration-200">{item.title}</h3>
                <p className="text-19 text-gray1 ">{item.description}</p>
              </div>
            </div>

        </motion.div>
          ))}
        </div>

      </div>

    </>
  )
}

export default HeroSection