
import { servicesData } from "@/app/data/services/branding-and-positioning-agency-in-dubai/data";
import { StaticImageData } from "next/image";
import Image from "next/image";

interface ServicesSecProps {
  title: string;
  description: string;
  items : {
    title: string;
    description: string;
    id: string;
    icon: string | StaticImageData;
  }[];
}

const ServicesSec = ({ title, description, items }: ServicesSecProps) => {
  return ( 
    <section className="py-120">
      <div className="container">
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-[1fr_2fr] 3xl:grid-cols-[520px_auto] gap-6 3xl:gap-[30px]">
          <div>
            <div className="flex items-center gap-2 mb-4 md:mb-6 xl:mb-8 xxl:mb-12">
              <h2 className="text-30 leading-[1.5] text-muted">
                {title}
              </h2>
              <div className="h-5 w-5 bg-primary"></div>
            </div>
            <h1 className="title-65 tracking-[-0.025em]">{description}</h1>
          </div>
          <div>
            <div className="grid grid-cols-1 sm:grid-cols-2">
              {
                items.map((service) => (
                  <div key={service.id} className="p-6 border border-[#00000033] rounded-[10px] p-2 md:p-3 xl:p-5 xxl:p-10">
                    <div className="flex items-center gap-2 xl:gap-4 3xl:gap-[24px] mb-3 md:mb-4 xl:mb-5 xxl:mb-6">
                      <div className="bg-primary/5 border border-primary/12 w-50 h-50 xl:w-[100px] xl:h-[100px] flex items-center justify-center rounded-[7px]">
                        <Image src={service.icon} alt={service.title} width={50} height={50} />
                      </div>
                      <h3 className="text-28 font-normal tracking-[-0.025em]">{service.title}</h3>
                    </div>
                    <p className="text-14 md:text-16 xl:text-18 xxl:text-20 fnt-lexend text-[#77787B]">{service.description}</p>
                  </div>
                ))
              }
            </div>
          </div>
        </div>
      </div>
    </section>
   );
}
 
export default ServicesSec;