import Image from "next/image";
import Link from "next/link";
import { caseStudiesData } from "@/app/data/services/branding-and-positioning-agency-in-dubai/data";

interface CaseSudiesSecProps {
  data: typeof caseStudiesData;
}

const CaseSudiesSec = ({ data }: CaseSudiesSecProps) => {
  return (
    <section className="pt-12 xl:pt-20 xxl:pt-[160px] pb-8 xl:pb-12 xxl:pb-[120px]">
      <div className="container">
        {/* Heading */}
        <div className="mb-8 xl:mb-12 xxl:mb-60">
          <div className="flex items-center gap-2 mb-4 xl:mb-8 xxl:mb-60">
            <h3 className="text-28 leading-[1] uppercase tracking-[-0.025em] text-muted">
              {data.tag}
            </h3>
            <div className="h-5 w-5 bg-primary" />
          </div>

          <h2 className="title-60 tracking-[-0.025em]">{data.title}</h2>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-[30px]">
          {data.items.map((item) => (
            <Link
              key={item.id}
              href={item.href}
              className="group flex flex-col overflow-hidden transition-all duration-300 hover:-translate-y-1"
            >
              {/* Top */}
              {/* <div className="bg-white pt-5 xl:pt-8 xxl:pt-[41px] pl-5 xl:pl-8 xxl:pl-[41px] 3xl:pl-[49px] pr-5 xl:pr-8 xxl:pr-[41px] 3xl:pr-[65px] min-h-[160px] xxl:min-h-[220px] flex flex-col border border-[#00000033] rounded-[10px]"> */}
              <div className="bg-white pt-5 xl:pt-8 xxl:pt-[41px] pl-5 xl:pl-8 xxl:pl-[41px] 3xl:pl-[49px] pr-5 xl:pr-8 xxl:pr-[41px] 3xl:pr-[65px] flex flex-col border border-[#00000033] rounded-[10px]">
                <h3 className="text-28 leading-[1] mb-8 xl:mb-10">{item.client}</h3>
                {/* <Image src={item.logo} alt={item.client} width={200} height={60} className="h-auto w-auto object-contain 3xl:h-[34.59px] max-w-[160px]" /> */}
              </div>

              {/* Bottom */}
              <div className="flex-1 bg-[#1F1F1F] text-white p-8 xl:p-12 3xl:pt-[62px] 3xl:pl-[49px] 3xl:pr-[65px] rounded-[10px]">
                <h3 className="text-30 leading-tight mb-6 group-hover:text-primary transition-colors">
                  {item.title}
                </h3>

                <p className="text-description !text-18 leading-[1.444444444444444] text-white">
                  {item.description}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CaseSudiesSec;