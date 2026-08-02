import Image from "next/image";
import { heroData } from "@/app/data/services/branding-and-positioning-agency-in-dubai/data";
import Button from "../common/buttons/PrimaryButton";

const HeroSection = ({data}:any) => {
  return ( 
    <section className="relative overflow-hidden h-screen">
      <div className="absolute inset-0 w-full h-full z-0">
        <Image src={data.image} alt={data.imageAlt} width={1920} height={1080} className="w-full h-full object-cover" />
      </div>
      <div className="container relative z-10 h-full flex flex-col justify-center">
        <div>
          <h1 className="title-70 max-w-[16ch] mb-3 xl:mb-5 tracking-[-0.025em]">{data.title}</h1>
          <p className="text-25 leading-[1.4] text-77787B 2xl:max-w-[45ch] max-w-[53ch]">{data.description}</p>
          <div className="flex flex-wrap items-center gap-4 mt-4 xl:mt-8 xxl:mt-[60px]">
            <Button variant="primary" href={data.items[0].link}>
              {data.items[0].title}
            </Button>

            {data.items[1] && <Button variant="whatsapp" href={data.items[1].link} external>
              {data.items[1].title}
            </Button>}
          </div>
        </div>
      </div>
    </section>
   );
}
 
export default HeroSection;