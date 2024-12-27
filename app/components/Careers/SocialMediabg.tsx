import React from "react";
import aboutbnnr from "@/public/assets/aboutus/banner-aboutus.jpg";
import ButtonIcon from "../Button/ButtonIcon";

const SocialMediabg = () => {
  return (
    <section
      className="bg-center-left relative bg-cover bg-no-repeat py-24"
      style={{ backgroundImage: `url(${aboutbnnr.src})` }}
    >
      <div className="container mx-auto px-4">
        <div className="flex flex-wrap">
          <div className="w-full">
            <div className="relative p-8">
              <div className="flex flex-wrap items-stretch justify-end">
                <div className="w-full lg:w-1/5"></div>
                <div className="w-full bg-black p-[20px] md:p-[50px] lg:w-1/2 lg:p-[80px]">
                  <h2 className="leading-1  text-font65  text-white lg:leading-[4.5rem]">
                    Get on the Global Surf Digital talent radar.
                  </h2>
                  <p className="text-19 my-10 leading-relaxed text-white">
                    You think you might be a good fit for Global Surf Digital?
                    Send us your LinkedIn profile with just one click. If we
                    have a position that we think you're perfect for, we'll
                    reach out to you.
                  </p>
                  <ButtonIcon
                    icon={<img src="/images/linkedinicon.svg" alt="LinkedIn" />}
                    text="LinkedIn"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SocialMediabg;
