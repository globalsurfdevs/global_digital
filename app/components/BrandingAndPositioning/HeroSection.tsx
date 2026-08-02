import Image from "next/image";
import { heroData } from "@/app/data/services/branding-and-positioning-agency-in-dubai/data";
import Button from "../common/buttons/PrimaryButton";

const HeroSection = () => {
  return ( 
    <section className="relative overflow-hidden h-screen">
      <div className="absolute inset-0 w-full h-full z-0">
        <Image src={heroData.image} alt="Hero Image" width={1920} height={1080} className="w-full h-full object-cover" />
      </div>
      <div className="container relative z-10 h-full flex flex-col justify-center">
        <div>
          <h1 className="title-70 max-w-[16ch] mb-3 xl:mb-5 tracking-[-0.025em]">{heroData.title}</h1>
          <p className="text-25 leading-[1.4] text-77787B 2xl:max-w-[45ch] 3xl:max-w-[53ch]">{heroData.description}</p>
          <div className="flex flex-wrap items-center gap-4 mt-4 xl:mt-8 xxl:mt-[60px]">
            <Button variant="primary" href="/contact">
              Let&apos;s discuss your project
            </Button>

            <Button variant="whatsapp" href="https://wa.me/1234567890" external>
              WhatsApp GS Digital
            </Button>
          </div>
        </div>
      </div>
    </section>
   );
}
 
export default HeroSection;