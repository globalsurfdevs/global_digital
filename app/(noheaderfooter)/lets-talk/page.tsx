"use client";
import React, { useState } from "react";
import Link from "next/link";
const page = () => {


       const [formData, setFormData] = useState({

       });

       const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
         const { name, value } = e.target;
         setFormData((prev) => ({ ...prev, [name]: value }));
       };

       const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
         e.preventDefault();

         // Ensure correct type for the form element
         const form = document.getElementById("form") as HTMLFormElement;
         if (form) {
           form.submit();
         } else {
           console.error("Form element not found");
         }
       };

  return (
    <div>
      <div className="maintalk">
        <div className="bg-dgray px-[20px] pb-[20px] pt-[20px] md:pb-[0px] lg:px-[40px] lg:pt-[100px]">
          <h1 className="title-65">
            <span className="text-primary">Let’s</span> <br></br>Work together.
          </h1>
                <div className="flex flex-col gap-8 md:col-span-3 mt-[30px] lg:mt-[150px]">
                  <div className="flex flex-col gap-3">
                    <h2 className="text-font35">
                    <a href="mailto:hello@globalsurf.ae" className="break-words" > hello<span className="text-primary">@</span>globalsurf.ae</a>
                    </h2>
                    <h2 className="text-font35"><a href="tel:+97145821133" >+971 4 582 1133</a></h2>
                  </div>
                </div>
        </div>
        <div className="p-[20px] p-[20px]  md:p-[100px] md:p-[100px] psty  ">
          <div className="group">
            <Link href="/">
              <div className="  absolute right-5 top-[30px] w-fit cursor-pointer rounded-3xl bg-primary md:bg-dgray px-6 py-2 duration-200 duration-300 ease-in-out ease-in-out    group-hover:-translate-x-[-3px] group-hover:bg-primary  group-hover:shadow-lg  ">
                <div className="uppercase text-white">
                  <p className="bolder text-font16 text-white md:text-black  duration-300 ease-in-out ease-in-out group-hover:text-white">
                    CLOSE
                  </p>
                </div>
              </div>
            </Link>
          </div>
          <p className="text-font30">
            Get in touch today to discuss how we can help your brand stay ahead.
          </p>
          <div className="contctform pt-[15px] lg:pt-[50px]">
          <form
      onSubmit={handleSubmit}
      action="https://forms.zohopublic.com/Globalsurf/form/GlobalsurfNewForm/formperma/ed-ixp-D06mNuOfW52SHqkLRh7ZZV4AbxY-Ks8LcP_s/htmlRecords/submit"
      name="form"
      id="form"
      method="POST"
      acceptCharset="UTF-8"
      encType="multipart/form-data"
    >
      <input type="hidden" name="zf_referrer_name" value="" />
      <input type="hidden" name="zf_redirect_url" value="" />
              <input type="hidden" name="zc_gad" value="" />

              <div className="mb-[30px]">
                <input
                   type="text"
                  name="SingleLine"
                  required

                   onChange={handleChange}
                   maxLength={255}
                  className="w-full rounded-lg border border-gray-300 p-3 focus:border-dgray focus:outline-none focus:ring-1 focus:ring-dgray"
                  placeholder="Enter your name"
                />
              </div>

              <div className="md:grid md:grid-cols-2 md:gap-5">
                <div className="mb-[30px]">
                  <input
                   type="email"
                    name="Email"
                    required

                   onChange={handleChange}
                   maxLength={255}
                    className="w-full rounded-lg border border-gray-300 p-3 focus:border-dgray focus:outline-none focus:ring-1 focus:ring-dgray"
                    placeholder="Enter your email"
                  />
                </div>

                <div className="mb-[30px]">
                  <input
                     type="text"
                     name="SingleLine1"

                    onChange={handleChange}

                     maxLength={255}
                    className="w-full rounded-lg border border-gray-300 p-3 focus:border-dgray focus:outline-none focus:ring-1 focus:ring-dgray"
                    placeholder="Enter your company name"
                  />
                </div>
              </div>

              <div className="mb-[30px]">
              <select
                  name="Dropdown"


                  onChange={handleChange}
                  className="mt-3 w-full rounded-lg border border-gray-300 p-3 focus:border-dgray focus:outline-none focus:ring-1 focus:ring-dgray"
        >
          <option value="-Select-">-Select-</option>
          <option value="AED < 5000">AED &lt; 5000</option>
          <option value="AED 5000 - 10000">AED 5000 - 10000</option>
          <option value="AED 10000 - 20000">AED 10000 - 20000</option>
          <option value="AED 20000 - 30000">AED 20000 - 30000</option>
          <option value="AED 30000 - 40000">AED 30000 - 40000</option>
          <option value="AED 50000 - 100000">AED 50000 - 100000</option>
          <option value="AED > 100000">AED &gt; 100000</option>
        </select>
              </div>
              <div className="mb-[30px]">
              <select
                  name="Dropdown1"


                  onChange={handleChange}
                  className="mt-3 w-full rounded-lg border border-gray-300 p-3 focus:border-dgray focus:outline-none focus:ring-1 focus:ring-dgray"
        >
          <option value="-Select-">-Select-</option>
          <option value="Performance Marketing">Performance Marketing</option>
          <option value="SEO">SEO</option>
          <option value="Social Media">Social Media</option>
          <option value="Web Design and Development">
            Web Design and Development
          </option>
          <option value="Branding and Creatives">Branding and Creatives</option>
          <option value="Marketing Intelligence">Marketing Intelligence</option>
        </select>
              </div>

              <div className="mb-[30px]">
                <textarea
          name="MultiLine"

          onChange={handleChange}
          maxLength={65535}
                  placeholder="Enter your message"
                  className="w-full rounded-lg border border-gray-300 p-3 focus:border-dgray focus:outline-none focus:ring-1 focus:ring-dgray"
        />
              </div>

              <div>
                <p className="font-19 mb-5 md:mb-[50px]">
                  In submitting this form, you are agreeing to <Link href="/privacy-policy">Privacy Policy</Link>.
                </p>
              </div>

              <button
                type="submit"
                className="w-fit rounded-[55px] bg-primary  px-[40px] py-[10px] md:px-[50px] md:py-[20px] font-medium text-white transition duration-300  ease-in-out hover:bg-dgray hover:text-primary"
              >
                Submit
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default page;
