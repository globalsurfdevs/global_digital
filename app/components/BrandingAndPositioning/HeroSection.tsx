import Image from "next/image";
// import { heroData } from "@/app/data/services/branding-and-positioning-agency-in-dubai/data";
import Button from "../common/buttons/PrimaryButton";

interface HeroSectionProps {
  data: {
    title: string;
    description: string;
    image: string;
    imageAlt: string;
    items: {
      title: string;
      link: string;
    }[];
  };
}

const HeroSection = ({ data }: HeroSectionProps) => {
  return (
    <section className="relative h-[600px] md:h-screen overflow-hidden">
      <div className="absolute inset-0 z-0 h-full w-full">
        <Image
          src={data.image}
          alt={data.imageAlt}
          width={1920}
          height={1080}
          className="hidden h-full w-full object-cover md:block"
        />
        <Image
          src={"/images/service-hero-bg-mobile.jpg"}
          alt={data.imageAlt}
          width={1920}
          height={1080}
          className="h-full w-full object-cover md:hidden"
        />
      </div>
      <div className="container relative z-10 flex h-full flex-col justify-center">
        <div>
          <h1 className="title-70 mb-3 max-w-[16ch] tracking-[-0.025em] xl:mb-5">
            {data.title}
          </h1>
          <p className="text-25 text-77787B max-w-[53ch] leading-[1.4] 2xl:max-w-[45ch]">
            {data.description}
          </p>
          <div className="mt-4 flex flex-wrap items-center gap-4 xl:mt-8 xxl:mt-[60px]">
            <Button variant="primary" href={data.items[0].link}>
              {data.items[0].title}
            </Button>

            {data.items[1] && (
              <Button variant="whatsapp" href={data.items[1].link} external>
                {data.items[1].title}
              </Button>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
