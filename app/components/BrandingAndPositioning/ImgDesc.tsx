import Image from "next/image";

const ImgDesc = ({data}:any) => {
  return ( 
    <section className="py-8 xl:py-20 3xl:py-[100px]">
      <div className="container">
        <div className="grid grid-cols-1 lg:grid-cols-2 3xl:grid-cols-[auto_745px] gap-8 xxl:gap-20 items-center">
          <div>
            <Image src={data.image} alt={data.imageAlt} width={1500} height={1500}
             className="w-full h-full object-contain max-h-[600px]" />
          </div>
          <div>
            <div className="flex items-center gap-2 mb-4 md:mb-6 xl:mb-8 xxl:mb-[81px]">
              <h2 className="text-28 uppercase tracking-[-0.025em] leading-[1] text-muted">
                {data.title}
              </h2>
              <div className="h-5 w-5 bg-primary"></div>
            </div>
            <h2 className="title-65 mb-4 md:mb-5 xl:mb-10 tracking-[-0.025em]">{data.subTitle}</h2>
            <p className="text-19 text-77787B fnt-lexend">{data.description}</p>
          </div>
        </div>
      </div>
    </section>
   );
}
 
export default ImgDesc;