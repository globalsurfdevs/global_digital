

import { capabilitiesData } from "@/app/data/services/branding-and-positioning-agency-in-dubai/data";
import Image from "next/image";

interface RelatedCapabiliProps {
  data: typeof capabilitiesData;
}

const RelatedCapabili = ({ data }: RelatedCapabiliProps) => {
  return (
    <section className="py-120">
      <div className="container">
        <div className="mb-4 xl:mb-8 xxl:mb-12">
          <div className="flex items-center gap-2 mb-4 md:mb-6 xl:mb-8 xxl:mb-12">
            <h3 className="text-30 leading-[1] uppercase tracking-[-0.025em]  text-muted">
              {data.tag}
            </h3>
            <div className="h-5 w-5 bg-primary"></div>
          </div>
          <h2 className="title-60 max-w-[25ch]"> {data.title}</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 ">
          {data.items.map((item) => (
            <div key={item.id} className="p-6 border border-[#00000033] rounded-[10px] p-2 md:p-3 xl:p-5 xxl:p-10">
              <div className="flex items-center gap-2 xl:gap-4 3xl:gap-[24px] mb-3 md:mb-4 xl:mb-5 xxl:mb-6">
                <div className="bg-primary/5 border border-primary/12 w-50 h-50 xl:w-[100px] xl:h-[100px] flex items-center justify-center rounded-[7px] p-3 xl:p-5 shrink-0">
                  <Image src={item.icon} alt={item.title} width={60} height={60} className="w-10 h-10 xl:w-auto xl:h-auto xxl:w-[60px] xxl:h-[60px] object-contain" />
                </div>
                <h3 className="text-28 font-normal tracking-[-0.025em]">{item.title}</h3>
              </div>
              <p className="text-18 xxl:text-20 leading-[1.444444444444444] fnt-lexend text-[#77787B]">{item.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default RelatedCapabili;