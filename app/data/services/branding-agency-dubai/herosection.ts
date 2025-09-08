import { assets } from "@/public/assets/assets";

export const BannerSection = [
  {
    id: 1,
    image: assets.bannerbrandig,
    navigation: [
      { label: "Home", url: "/" }, 
      { label: "Creative Services",url: "/creative-agency-dubai" }, 
      { label: "Branding Service",url: "" },
    ],
    title:
      "Leading Branding Agency in Dubai",
      subtitle:"Building Strong Brand Identities With Creative Design, Marketing Collateral, and Storytelling",
      heroAlt:"Creative Branding Agency in Dubai",
    sub: [
      {
        stitle: "OUR APPROACH",
        buttonTitle :"Start Your Project",
        desc: "At GS Branding, we believe that great branding is more than just a logo—it’s about building a strong, authentic connection with your audience. As a leading branding company in Dubai, we take the time to understand your vision, values, and goals to craft a brand identity that speaks to your customers. Our approach is both creative and strategic, ensuring your brand stands out and leaves a lasting impression. From comprehensive brand audits to creative solutions, we’re here to help your brand grow and make a real impact.",
      },
    ],
  },
];
