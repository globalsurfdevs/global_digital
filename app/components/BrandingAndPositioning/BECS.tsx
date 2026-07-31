import { becsData } from "@/app/data/services/branding-and-positioning-agency-in-dubai/data";
import Image from "next/image";
import { Fragment } from "react";

const BECS = ({data}:any) => {
  return (
    <section className="pt-8 xl:pt-12 xxl:pt-20 3xl:pt-[142px] pb-8 xl:pb-12 xxl:pb-20 3xl:pb-[146px]">
      <div className="container">
        <div className="row">
          <h2 className="title-65 mb-6 xl:mb-8 xxl:mb-60">{data.title}</h2>

          {/* Mobile: stacked cards, no connecting line */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:hidden">
            {data.items.map((item) => (
              <div key={item.id} className="bg-white p-6  border-b border-black/10">
                <div className="flex items-center justify-center gap-2 rounded-[10px] border border-black/20 py-3 px-4 w-fit mb-4">
                  <Image src={item.image} alt={item.imageAlt} width={42} height={42} className="w-7 h-7" />
                  <h3 className="text-28 font-normal leading-[1.214285714285714]">{item.title}</h3>
                </div>
                <p className="text-muted fnt-lexend text-19 font-normal">{item.description}</p>
              </div>
            ))}
          </div>

          {/* md and up: one continuous connected row + description grid below */}
          <div className="hidden md:block">
            <div className="flex items-center mb-4 xl:mb-[30px]">
              {data.items.map((item,index) => (
                <Fragment key={index}>
                  <div className="flex items-center justify-center gap-2 xl:gap-[14px] rounded-[10px] border border-black/20 py-3 xl:py-[24px] px-4 xl:px-6 xxl:px-10 w-fit bg-white relative z-10 shrink-0">
                    <Image src={item.image} alt={item.imageAlt} width={42} height={42} className="w-7 h-7 xl:w-[42px] xl:h-[42px]" />
                    <h3 className="text-28 font-normal leading-[1.214285714285714]">{item.title}</h3>
                  </div>
                  <span className="flex-1 h-px bg-black/10" />
                </Fragment>
              ))}
            </div>

            <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
              {data.items.map((item,idx) => (
                <p key={idx*2} className="text-muted fnt-lexend text-19 font-normal">
                  {item.description}
                </p>
              ))}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}

export default BECS;