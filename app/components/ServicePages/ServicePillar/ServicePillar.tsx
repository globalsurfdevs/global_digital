// app/components/ServicePages/ServicePillar/ServicePillarDetail.tsx
import HeroSection from "../../ServicePillar/sections/HeroSection";
import Testimonials from "../../HomePage/Testimonials";
import FAQ from "../../PermormanceMarketing/FAQ";
import GetInTouch from "../../PermormanceMarketing/GetInTouch";
import TitleDesc from "../../BrandingAndPositioning/TitleDesc";
import ServicesSec from "../../BrandingAndPositioning/ServicesSec";
import ProcessSlider from "@/app/components/BrandingAndPositioning/ProcessSlider";
import BECS from "@/app/components/BrandingAndPositioning/BECS";
import ButtonSlider from "@/app/components/BrandingAndPositioning/ButtonSlider";
import WhyChoose from "@/app/components/BrandingAndPositioning/WhyChoose";
import Approach from "@/app/components/ServicePillar/sections/Approach";
import WhyMatters from "@/app/components/ServicePillar/sections/WhyMatters";
import InfoGrid, { FrameworkItem } from "@/app/components/ServicePillar/sections/Expertise";
import WhatsIncluded from "@/app/components/ServicePillar/sections/WhatsIncluded";
import Tours from "@/app/components/HomePage/Tours";
import { getTestimonials } from "@/app/lib/testimonials";
import { totitleSentenceCase } from "@/app/helpers/maintainProperWordings";
import { ServicePillarData } from "./servicePillar.type";

interface Props {
  data: ServicePillarData;
}

const ServicePillarDetail = async ({ data }: Props) => {
  const testimonials = await getTestimonials();

  const Cta = [
    {
      textred: data.ctaSection.titleRed,
      text: data.ctaSection.title,
      subhead: data.ctaSection.description,
    },
  ];

  const infoGridData: FrameworkItem[] = data.fifthSection.items.map(
    (item, index) => ({
      id: index,
      icon: item.image,
      title: item.title,
      dec: item.description,
      urllink: item.link,
    })
  );

  const relatedServiceData = data.eleventhSection.items.map((item:any) => ({
    id: item.pillarId.id,
    title: item.pillarId.name,
    description: item.description,
    icon: item.pillarId.icon,
    link: item.pillarId.slug ? `/${item.pillarId.slug}` : "#", // adjust once link shape is confirmed
  }));

//   console.log("relatedServiceData", data.eleventhSection);

  return (
    <div>
      {data.seo?.schema && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: data.seo.schema }}
        />
      )}
      {data.firstSection.showSection !== false && <HeroSection data={data.firstSection} />}
      {data.secondSection.showSection !== false && <TitleDesc data={data.secondSection} />}
      {data.thirdSection.showSection !== false && <Approach data={data.thirdSection} />}
      {data.fourthSection.showSection !== false && <WhyMatters data={data.fourthSection} />}
      {data.fifthSection.showSection !== false && (
        <InfoGrid
          title={data.fifthSection.title}
          subTitle={data.fifthSection.subTitle}
          description={data.fifthSection.description}
          colcount={4}
          data={infoGridData}
        />
      )}
      {data.sixthSection.showSection !== false && (
        <BECS data={data.sixthSection} page="service-pillar" />
      )}
      {data.seventhSection.showSection !== false && data.seventhSection.items.length > 0 && (
        <WhatsIncluded
          title={data.seventhSection.title}
          description={data.seventhSection.subTitle}
          items={data.seventhSection.items}
        />
      )}
      {data.eighthSection.showSection !== false && data.eighthSection.items.length > 0 && (
        <ProcessSlider data={data.eighthSection} variant="dark" />
      )}
      {data.ninthSection.showSection !== false && (
        <section className="py-120">
          <ButtonSlider data={data.ninthSection} />
        </section>
      )}
      {data.tenthSection.showSection !== false && (
        <WhyChoose data={data.tenthSection} page="service-pillar" />
      )}
      <Tours title="Featured works" showViewAll={false} />
      <Testimonials
        topTitle="Testimonials"
        data={testimonials}
        bottomText={false}
        reviews={false}
        page="service"
      />
      {data.eleventhSection.showSection !== false && (
        <ServicesSec
          description={data.eleventhSection.description}
          title={data.eleventhSection.title}
          items={relatedServiceData}
        />
      )}
      {data.ctaSection.showSection !== false && (
        <GetInTouch
          data={Cta}
          ctabbutton={totitleSentenceCase(data.ctaSection.buttonText)}
          redlast
          buttonLink={data.ctaSection.buttonLink}
          page="service"
        />
      )}
      {data.faqSection.showSection !== false && (
        <FAQ
          data={data.faqSection.data}
          initialCount={data.faqSection.data.length}
          page="service"
          title={data.faqSection.title}
        />
      )}
    </div>
  );
};

export default ServicePillarDetail;