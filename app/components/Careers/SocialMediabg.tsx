import React, { useState } from "react";
import aboutbnnr from "@/public/assets/aboutus/banner-aboutus.jpg";
import Button from "../Button/Button";
import Link from "next/link";
import ButtonIcon from "../Button/ButtonIcon";
import { IoArrowBack } from "react-icons/io5";
import { submitLinkedIn } from "@/app/actions/submitLinkedIn";

const SocialMediabg = () => {
  const [isSectionVisible, setIsSectionVisible] = useState(false);
  const [linkedinUrl, setLinkedinUrl] = useState("");
  const [isChecked, setIsChecked] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleButtonClick = () => {
    setIsSectionVisible(!isSectionVisible);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!isChecked) {
      alert("Please confirm you'd like us to screen your profile.");
      return;
    }

    const form = e.currentTarget; // no need for getElementById

    try {
      setIsSubmitting(true);
      const formDataObj = new FormData(form);

      const result = await submitLinkedIn(formDataObj);

      if (result?.success) {
        alert("Thank you, we will get back to you soon!");
        form.reset();
        setLinkedinUrl("");   // reset controlled state too
        setIsChecked(false);  // form.reset() alone won't update React state
      } else {
        alert("Something went wrong. Please try again.");
      }
    } catch (err) {
      console.error(err);
      alert("Submission failed.");
    } finally {
      setIsSubmitting(false);
    }
  };

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
                <div className="relative w-full overflow-hidden bg-black p-[20px] sm:p-[50px] lg:w-1/2 lg:p-[80px]">
                  <div>
                    <h2 className="leading-1 text-font65 text-white lg:leading-[4.5rem]">
                      Get on the GS Digital talent radar.
                    </h2>
                    <p className="text-19 my-10 leading-relaxed text-white">
                      You think you might be a good fit for GS Digital?
                      Send us your LinkedIn profile with just one click. If we
                      have a position that we think you're perfect for, we'll
                      reach out to you.
                    </p>
                    <ButtonIcon
                      icon={<img src="/images/linkedinicon.svg" alt="LinkedIn" />}
                      text="LinkedIn"
                      onClick={handleButtonClick}
                      className="sm:text-30 text-[15px]"
                    />
                  </div>

                  <div
                    className={`absolute right-0 top-5 h-full w-full transform bg-black p-[20px] text-white transition-transform duration-500 md:p-[50px] lg:p-[80px] ${
                      isSectionVisible ? "translate-x-0" : "translate-x-full"
                    }`}
                  >
                    <div
                      onClick={() => setIsSectionVisible(false)}
                      className="absolute top-0 cursor-pointer text-2xl text-white md:top-8"
                    >
                      <IoArrowBack />
                    </div>

                    <h2 className="leading-1 mt-2 text-font65 text-white lg:leading-[4.5rem]">
                      Send your LinkedIn profile
                    </h2>

                    <form onSubmit={handleSubmit} className="mt-3 md:mt-6">
                      <input
                        type="url"
                        name="linkedinUrl"
                        value={linkedinUrl}
                        onChange={(e) => setLinkedinUrl(e.target.value)}
                        placeholder="Enter LinkedIn URL"
                        className="w-full border-b-2 border-l-0 border-r-0 border-t-0 border-white bg-transparent p-2 text-white focus:border-[black] focus:outline-none"
                        required
                      />

                      <div className="mt-2 flex items-center md:mt-8">
                        <input
                          type="checkbox"
                          name="agree"
                          checked={isChecked}
                          onChange={() => setIsChecked(!isChecked)}
                          id="agree"
                          className="mr-2"
                        />
                        <label htmlFor="agree" className="text-white">
                          Yeah, go screen my skills!
                        </label>
                      </div>
                      <p className="text-19 mb-4 mt-3 sm:my-8 text-gray1">
                        We're keeping your personal details secure and don't
                        share it with 3rd parties of course. Find out more in
                        our <Link href="/privacy-policy" className="text-slate-400">privacy policy</Link>.
                      </p>
                      <Button text="Send now" disabled={isSubmitting} />
                    </form>
                  </div>
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