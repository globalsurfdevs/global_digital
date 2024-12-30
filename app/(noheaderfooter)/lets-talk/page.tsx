"use client";
import React, { useState } from "react";
import Link from "next/link";
const page = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    company: "",
    message: "",
    budget: "",
    service: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleChangeselect = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value, // Updates the 'service' value in formData
    }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
  };

  const aedopt = [
    { value: "5000", label: "AED < 5000" },
    { value: "5000-10000", label: "AED 5000- 10000" },
    { value: "10000-20000", label: "AED 10000-20000" },
    { value: "20000-50000", label: "AED 20000-50000" },
    { value: "50000-1000000", label: "AED 50000-1000000" },
    { value: ">1000000", label: "AED > 1000000" },
  ];

  return (
    <div>
      <div className="maintalk">
        <div className="bg-dgray px-[50px] pb-[50px] pt-[50px] md:pb-[0px] lg:px-[40px] lg:pt-[100px]">
          <h1 className="title-65">
            <span className="text-primary">Let’s</span> <br></br>Work together.
          </h1>
        </div>
        <div className="p-[50px] p-[50px]  lg:p-[100px] lg:p-[100px]  ">
          <div className="group">
            <Link href="/">
              <div className="  absolute right-5 top-[30px] w-fit cursor-pointer rounded-3xl bg-dgray px-6 py-2 duration-200 duration-300 ease-in-out ease-in-out    group-hover:-translate-x-[-3px] group-hover:bg-primary  group-hover:shadow-lg  ">
                <div className="uppercase text-white">
                  <p className="bolder text-font16 text-black  duration-300 ease-in-out ease-in-out group-hover:text-white">
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
            <form onSubmit={handleSubmit}>
              <div className="mb-[30px]">
                <input
                  type="text"
                  name="name"
                  id="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full rounded-lg border border-gray-300 p-3 focus:border-dgray focus:outline-none focus:ring-1 focus:ring-dgray"
                  placeholder="Enter your name"
                />
              </div>

              <div className="md:grid md:grid-cols-2 md:gap-5">
                <div className="mb-[30px]">
                  <input
                    type="email"
                    name="email"
                    id="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full rounded-lg border border-gray-300 p-3 focus:border-dgray focus:outline-none focus:ring-1 focus:ring-dgray"
                    placeholder="Enter your email"
                  />
                </div>

                <div className="mb-[30px]">
                  <input
                    type="text"
                    name="company"
                    id="company"
                    value={formData.company}
                    onChange={handleChange}
                    className="w-full rounded-lg border border-gray-300 p-3 focus:border-dgray focus:outline-none focus:ring-1 focus:ring-dgray"
                    placeholder="Enter your company name"
                  />
                </div>
              </div>

              <div className="mb-[30px]">
                <select
                  name="budget"
                  id="budget"
                  value={formData.budget}
                  onChange={handleChangeselect}
                  className="mt-3 w-full rounded-lg border border-gray-300 p-3 focus:border-dgray focus:outline-none focus:ring-1 focus:ring-dgray"
                >
                  <option value="" disabled>
                    Select your budget
                  </option>
                  {aedopt.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
              </div>
              <div className="mb-[30px]">
                <select
                  name="service"
                  id="service"
                  value={formData.service}
                  onChange={handleChangeselect}
                  className="w-full rounded-lg border border-gray-300 p-3 focus:border-dgray focus:outline-none focus:ring-1 focus:ring-dgray"
                >
                  <option value="" disabled>
                    Service looking
                  </option>
                  <option value="performance_marketing">
                    Performance Marketing
                  </option>
                  <option value="seo">SEO</option>
                  <option value="social_media">Social Media</option>
                  <option value="web_design">Web Design & Development</option>
                  <option value="branding_creatives">
                    Branding & Creatives
                  </option>
                  <option value="marketing_intelligence">
                    Marketing Intelligence
                  </option>
                </select>
              </div>

              <div className="mb-[30px]">
                <textarea
                  name="message"
                  id="message"
                  value={formData.message}
                  onChange={handleChange}
                  className="w-full rounded-lg border border-gray-300 p-3 focus:border-dgray focus:outline-none focus:ring-1 focus:ring-dgray"
                  placeholder="Enter your message (Optional)"
                  rows={5}
                ></textarea>
              </div>

              <div>
                <p className="font-19 mb-5 md:mb-[50px]">
                  In submitting this form, you are agreeing to Privacy Policy.
                </p>
              </div>

              <button
                type="submit"
                className="w-fit rounded-[55px] bg-primary  px-[50px] py-[20px] font-medium text-white transition duration-300  ease-in-out hover:bg-dgray hover:text-primary"
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
