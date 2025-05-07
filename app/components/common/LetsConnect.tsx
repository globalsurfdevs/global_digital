"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";

interface LetsTalkProps {
  onClose: () => void;
}

const LetsTalk: React.FC<LetsTalkProps> = ({ onClose }) => {
  const [formData, setFormData] = useState<{
    PhoneNumber_countrycode?: string;
    Email?: string;
    SingleLine?: string;
    SingleLine2?: string;
    Dropdown?: string;
  }>({});
  const [phoneError, setPhoneError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [nameError, setNameError] = useState("");
  const [selectedBudget, setSelectedBudget] = useState("Select Your Budget");
  const [selectedService, setSelectedService] = useState("Service Looking for");
  // const [isBudgetOpen, setIsBudgetOpen] = useState(false);
  // const [isServiceOpen, setIsServiceOpen] = useState(false);
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  console.log("Entered email:", formData.Email);



  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    if (name === "PhoneNumber_countrycode") {
      if (value.length < 5) {
        setPhoneError("Phone number must be at least 5 digits.");
      } else {
        setPhoneError("");
      }
    }

    if (!formData.Email || !emailRegex.test(formData.Email.trim())) {
      setEmailError("Please enter a valid email address.");
      return;
    } else {
      setEmailError("");
    }

    if (name === "SingleLine") {
      if (value.trim().length < 3) {
        setNameError("Name must be at least 3 characters.");
      } else {
        setNameError("");
      }
    }
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (
      formData.PhoneNumber_countrycode &&
      formData.PhoneNumber_countrycode.length < 5
    ) {
      setPhoneError("Phone number must be at least 5 digits.");
      return;
    }
    if (
      !formData.Email ||
      !/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(formData.Email)
    ) {
      setEmailError("Please enter a valid email address.");
      return;
    }

    if (!formData.SingleLine || formData.SingleLine.trim().length < 3) {
      setNameError("Name must be at least 3 characters.");
      return;
    }

    const form = document.getElementById("form") as HTMLFormElement;
    if (form) {
      form.submit();
    } else {
      console.error("Form element not found");
    }
  };

  useEffect(() => {
    console.log(window.location.href);
    setFormData((prev) => ({ ...prev, SingleLine2: window.location.href }));
  }, [window.location.href]);

  useEffect(() => {
    console.log(formData);
  }, [formData]);

  return (
    <div className="mainconnect">
      <div className=" px-[20px] pb-[20px] pt-[50px] md:pb-0 xl:px-[80px] xxl:px-[130px] lg:pt-[140px]">
        <h1 className="title-65">
          Let’s<br></br> Connect <span className="text-primary">!</span>
        </h1>
        <p className="mt-2 text-gray1">
          Feel free to send us a mail, or fill up the form.
        </p>
        <div className="mt-[30px] flex flex-col gap-8 md:col-span-3 lg:mt-[80px]">
          <div className="flex flex-col gap-3">
            <div className="mb-3 flex items-center gap-6 border-b border-gray-300 pb-3 md:gap-3 lg:mb-[50px] lg:gap-[50px] lg:pb-[25px]">
              <p className="text-[20px] sm:text-font35">
                <a href="mailto:hello@globalsurf.ae" className="break-words">
                  hello<span className="text-primary">@</span>globalsurf.ae
                </a>
              </p>
              <svg
                width="20"
                height="20"
                viewBox="0 0 36 35"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="transition-transform duration-300 group-hover:scale-110"
              >
                <path
                  d="M33.8105 1.7998L1.25781 33.7227"
                  stroke="#E63E31"
                  stroke-width="2"
                  stroke-miterlimit="10"
                ></path>
                <path
                  d="M1.25781 1.7998H33.8105V33.0929"
                  stroke="#E63E31"
                  stroke-width="2"
                  stroke-miterlimit="10"
                ></path>
              </svg>
            </div>
            <div className="mb-3 flex items-center gap-6 border-b border-gray-300 pb-3 md:gap-3 lg:mb-[50px] lg:pb-[25px]  xxl:gap-[120px] ">
              <p className="text-[20px] sm:text-font35 min-w-fit">
                <a href="tel:+97145821133">+971 4 582 1133</a>
              </p>
              <svg
                width="20"
                height="20"
                viewBox="0 0 36 35"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="transition-transform duration-300 group-hover:scale-110"
              >
                <path
                  d="M33.8105 1.7998L1.25781 33.7227"
                  stroke="#E63E31"
                  stroke-width="2"
                  stroke-miterlimit="10"
                ></path>
                <path
                  d="M1.25781 1.7998H33.8105V33.0929"
                  stroke="#E63E31"
                  stroke-width="2"
                  stroke-miterlimit="10"
                ></path>
              </svg>
            </div>
          </div>
        </div>
        <div className="mb-3 mt-[30px] lg:mb-0 lg:mt-[70px]">
          <img src="/images/location.svg" alt="location" className="" />
          <p className="text-19 mt-2 md:mt-[30px]">
            P.O.Box 13653, 901 - SIT Tower, Dubai Silion Oasis, Dubai, UAE
          </p>
        </div>
      </div>
      <div className="psty bg-dgray  p-[20px] md:pt-[140px] xl:px-[80px]  xxl:px-[150px]">
        <div className="group">
          <button onClick={onClose}>
            <div className="  absolute right-5 top-[30px] z-[55px] w-fit cursor-pointer rounded-3xl bg-primary px-6 py-2 duration-200  ease-in-out group-hover:-translate-x-[-3px]    group-hover:bg-primary group-hover:shadow-lg  md:bg-white  ">
              <div className="uppercase text-white">
                <p className="bolder text-font16 text-white duration-300  ease-in-out ease-in-out group-hover:text-white md:text-black">
                  CLOSE
                </p>
              </div>
            </div>
          </button>
        </div>
        <div className="lg:mb-[100px[ mb-[20px] flex items-center gap-2">
          <p className="text-font30 uppercase">Message us</p>
          <div className="size-3 bg-primary md:size-4 lg:size-5"></div>
        </div>

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
            <div className="md:grid md:grid-cols-2 md:gap-5">
              <input
                type="text"
                className="hidden"
                name="SingleLine2"
                value={formData.SingleLine2 || ""}
              />

              <div className="mb-[30px]">
                <label className="mb-2 block text-sm font-medium text-gray-700">
                  Full Name
                </label>
                <input
                  type="text"
                  name="SingleLine"
                  id="SingleLine"
                  required
                  onChange={handleChange}
                  className=" gry-placeholder w-full border-b border-gray-300 bg-dgray px-0 pb-3 focus:border-gray-300 focus:ring-0"
                  placeholder="Enter your name"
                  style={{
                    borderTop: "none",
                    borderLeft: "none",
                    borderRight: "none",
                  }}
                />
                {nameError && (
                  <p className="mt-1 text-sm text-red-500">{nameError}</p>
                )}
              </div>
              <div className="mb-[30px]">
                <label className="mb-2 block text-sm font-medium text-gray-700">
                  Email
                </label>
                <input
                  type="email"
                  name="Email"
                  required
                  onChange={handleChange}
                  maxLength={255}
                  className=" gry-placeholder w-full border-b border-gray-300 bg-dgray px-0 pb-3 focus:border-gray-300 focus:ring-0"
                  style={{
                    borderTop: "none",
                    borderLeft: "none",
                    borderRight: "none",
                  }}
                  placeholder="Enter your email"
                />
                {emailError && (
                  <p className="mt-1 text-sm text-red-500">{emailError}</p>
                )}
              </div>
            </div>
            <div className="md:grid md:grid-cols-2 md:gap-5">
              <div className="mb-[30px]">
                <label className="mb-2 block text-sm font-medium text-gray-700 ">
                  Company
                </label>
                <input
                  type="text"
                  name="SingleLine1"
                  onChange={handleChange}
                  maxLength={255}
                  className=" gry-placeholder w-full border-b border-gray-300  bg-dgray px-0 pb-3   focus:border-gray-300 focus:ring-0"
                  style={{
                    borderTop: "none",
                    borderLeft: "none",
                    borderRight: "none",
                  }}
                  placeholder="Enter your company name"
                />
              </div>
              <div className="mb-[30px]">
                <label className="mb-2 block text-sm font-medium text-gray-700">
                  Phone Number
                </label>
                <input
                  type="number"
                  name="PhoneNumber_countrycode"
                  id="international_PhoneNumber_countrycode"
                  className=" gry-placeholder w-full border-b border-gray-300 bg-dgray px-0 pb-3 focus:border-gray-300 focus:ring-0"
                  placeholder="Contact Number"
                  style={{
                    borderTop: "none",
                    borderLeft: "none",
                    borderRight: "none",
                  }}
                  required
                  onChange={handleChange}
                />
                {phoneError && (
                  <p className="mt-1 text-sm text-red-500">{phoneError}</p>
                )}
              </div>
            </div>
            <div className="md:grid md:grid-cols-2 md:gap-5">
              <div className="mb-[30px]">
                <label className="mb-2 block text-sm font-medium text-gray-700">
                  Budget Range
                </label>
                <div
                  className="relative"
                  onClick={() => setSelectedBudget("first")}
                  style={{
                    cursor: "pointer",
                    color:
                      selectedBudget === "Select Your Budget"
                        ? "#0000004d"
                        : "black",
                  }}
                >
                  {/* <div className="gry-placeholder mt-3 flex w-full items-center justify-between border-b border-gray-300 bg-dgray px-0 pb-3 focus:border-gray-300 focus:ring-0">
                    {selectedBudget}
                    <img src="images/dp-arrow.svg" alt="dropdown arrow" />
                    <input type="hidden" name="Dropdown2" value={selectedBudget} />
                  </div> */}
                  {/* {isBudgetOpen && (
                    <ul className="absolute z-10 mt-2 w-full rounded-lg border border-gray-300 bg-dgray">
                      <li
                        className="cursor-pointer px-2 py-1 text-black hover:bg-gray-200"
                        onClick={() => {
                          setSelectedBudget("AED < 5000");
                          setIsBudgetOpen(false);
                        }}
                      >
                        AED &lt; 5000
                      </li>
                      <li
                        className="cursor-pointer px-2 py-1 text-black hover:bg-gray-200"
                        onClick={() => {
                          setSelectedBudget(" AED 5000 - 10000");
                          setIsBudgetOpen(false);
                        }}
                      >
                        AED 5000 - 10000
                      </li>
                      <li
                        className="cursor-pointer px-2 py-1 text-black hover:bg-gray-200"
                        onClick={() => {
                          setSelectedBudget("AED 10000 - 20000");
                          setIsBudgetOpen(false);
                        }}
                      >
                        AED 10000 - 20000
                      </li>
                      <li
                        className="cursor-pointer px-2 py-1 text-black hover:bg-gray-200"
                        onClick={() => {
                          setSelectedBudget(" AED 20000 - 30000");
                          setIsBudgetOpen(false);
                        }}
                      >
                        AED 20000 - 30000
                      </li>
                      <li
                        className="cursor-pointer px-2 py-1 text-black hover:bg-gray-200"
                        onClick={() => {
                          setSelectedBudget("AED 30000 - 40000");
                          setIsBudgetOpen(false);
                        }}
                      >
                        AED 30000 - 40000
                      </li>
                      <li
                        className="cursor-pointer px-2 py-1 text-black hover:bg-gray-200"
                        onClick={() => {
                          setSelectedBudget("AED 50000 - 100000");
                          setIsBudgetOpen(false);
                        }}
                      >
                        AED 50000 - 100000
                      </li>
                      <li
                        className="cursor-pointer px-2 py-1 text-black hover:bg-gray-200"
                        onClick={() => {
                          setSelectedBudget("AED > 100000");
                          setIsBudgetOpen(false);
                        }}
                      >
                        AED &gt; 100000
                      </li>
                    </ul>
                    
                  )} */}
                  <select
                  name="Dropdown"
                  onChange={handleChange}
                  className="bg-transparent  w-full border-t-0 border-x-0 border-b border-gray-300 outline-none pr-3 pl-0 focus:border-dgray focus:outline-none focus:ring-1 focus:ring-dgray"
                >
                  <option value="-Select-">Select Your Budget</option>
                  <option value="AED < 5000">AED &lt; 5000</option>
                  <option value="AED 5000 - 10000">AED 5000 - 10000</option>
                  <option value="AED 10000 - 20000">AED 10000 - 20000</option>
                  <option value="AED 20000 - 30000">AED 20000 - 30000</option>
                  <option value="AED 30000 - 40000">AED 30000 - 40000</option>
                  <option value="AED 50000 - 100000">AED 50000 - 100000</option>
                  <option value="AED > 100000">AED &gt; 100000</option>
                </select>
                </div>
              </div>
              <div className="mb-[30px]">
                <label className="mb-2 block text-sm font-medium text-gray-700">
                  Service
                </label>
                <div
                  className="relative"
                  onClick={() => setSelectedService("first")}
                  style={{
                    cursor: "pointer",
                    color:
                      selectedService === "Service Looking for"
                        ? "#0000004d"
                        : "#000",
                  }}
                >
                  {/* <div className="gry-placeholder mt-3 flex w-full items-center justify-between border-b border-gray-300 bg-dgray px-0 pb-3 focus:border-gray-300 focus:ring-0">
                    {selectedService}
                    <img src="images/dp-arrow.svg" alt="dropdown arrow" />
                    <input type="hidden" name="Dropdown1" value={selectedService} />
                  </div> */}
                  {/* {isServiceOpen && (
                    <ul className="absolute z-10 mt-2 w-full rounded-lg border border-gray-300 bg-dgray">
                      <li
                        className="cursor-pointer px-2 py-1 text-black hover:bg-gray-200"
                        onClick={() => {
                          setSelectedService("Performance Marketing");
                          setIsServiceOpen(false);
                        }}
                      >
                        Performance Marketing
                      </li>
                      <li
                        className="cursor-pointer px-2 py-1 text-black hover:bg-gray-200"
                        onClick={() => {
                          setSelectedService("SEO");
                          setIsServiceOpen(false);
                        }}
                      >
                        SEO
                      </li>
                      <li
                        className="cursor-pointer px-2 py-1 text-black hover:bg-gray-200"
                        onClick={() => {
                          setSelectedService("Social Media");
                          setIsServiceOpen(false);
                        }}
                      >
                        Social Media
                      </li>
                      <li
                        className="cursor-pointer px-2 py-1 text-black hover:bg-gray-200"
                        onClick={() => {
                          setSelectedService("Web Design and Development");
                          setIsServiceOpen(false);
                        }}
                      >
                        Web Design and Development
                      </li>
                      <li
                        className="cursor-pointer px-2 py-1 text-black hover:bg-gray-200"
                        onClick={() => {
                          setSelectedService("Branding and Creatives");
                          setIsServiceOpen(false);
                        }}
                      >
                        Branding and Creatives
                      </li>
                      <li
                        className="cursor-pointer px-2 py-1 text-black hover:bg-gray-200"
                        onClick={() => {
                          setSelectedService("Marketing Intelligence");
                          setIsServiceOpen(false);
                        }}
                      >
                        Marketing Intelligence
                      </li>
                    </ul>
                  )} */}
                  <select
                  name="Dropdown1"
                  onChange={handleChange}
                  className="bg-transparent w-full  border-t-0 border-x-0 border-b border-gray-300  pl-0 pr-3 focus:border-dgray focus:outline-none focus:ring-1 focus:ring-dgray"
                >
                  <option value="-Select-">Service Looking for</option>
                  <option value="Performance Marketing">
                    Performance Marketing
                  </option>
                  <option value="SEO">SEO</option>
                  <option value="Social Media">Social Media</option>
                  <option value="Web Design and Development">
                    Web Design and Development
                  </option>
                  <option value="Branding and Creatives">
                    Branding and Creatives
                  </option>
                  <option value="Marketing Intelligence">
                    Marketing Intelligence
                  </option>
                </select>
                </div>
              </div>
            </div>

            <div className="mb-[30px]">
              <label className="mb-2 block text-sm font-medium text-gray-700 lg:mb-[40px]">
                Message
              </label>
              <textarea
                name="MultiLine"
                onChange={handleChange}
                maxLength={65535}
                placeholder="Enter your message"
                className="gry-placeholder  h-[50px] w-full border-b border-gray-300 bg-dgray px-0 pb-3 text-gray1 focus:border-gray-300 focus:ring-0"
                style={{
                  borderTop: "none",
                  borderLeft: "none",
                  borderRight: "none",
                }}
              />
            </div>

            <div>
              <p className="font-19 fnt-lexend mb-5 font-[500] text-gray1 md:mb-[30px]">
                In submitting this form, you are agreeing to{" "}
                <Link href="/privacy-policy">Privacy Policy</Link>.
              </p>
            </div>
            {/* <button
                type="submit"
                className="w-fit rounded-[55px] bg-primary px-[40px] py-[10px] font-medium text-white transition duration-300 ease-in-out hover:bg-dgray hover:text-primary md:px-[50px] md:py-[20px]"
              >
                Submit
              </button> */}
            <button
              className=" hover:bg-prtext-primary group   flex items-center space-x-2 rounded-full border border-primary px-6 py-2 text-black transition duration-300 ease-in  hover:shadow-lg md:mb-0"
              type="submit"
            >
              <span className="fnt-lexend uppercase duration-300 ease-in group-hover:text-black">
                Submit enquiry
              </span>
              <div className=" bg-primary p-1">
                <svg
                  width="10"
                  height="10"
                  viewBox="0 0 10 10"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className="group-hover:scale-105"
                >
                  <g clip-path="url(#clip0_65_39)">
                    <path
                      d="M8.88346 1.26172L1.13281 8.8624"
                      stroke="white"
                      stroke-width="2"
                      stroke-miterlimit="10"
                    ></path>
                    <path
                      d="M1.13281 1.26172H8.88346V8.71245"
                      stroke="white"
                      stroke-width="2"
                      stroke-miterlimit="10"
                    ></path>
                  </g>
                  <defs>
                    <clipPath id="clip0_65_39">
                      <rect width="10" height="10" fill="white"></rect>
                    </clipPath>
                  </defs>
                </svg>
              </div>
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default LetsTalk;
