"use client";
import React, { useEffect, useRef, useState } from "react";
import Link from "next/link";
import ReCAPTCHA from 'react-google-recaptcha';
import { Images } from "lucide-react";



const RequestFreeAudit: React.FC = () => {
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
  const recaptcha = useRef<ReCAPTCHA>(null)
  const [error, setError] = useState("")
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
      if (recaptcha) {
        const captchaValue = recaptcha?.current?.getValue()
        if (!captchaValue) {
          setError("Please verify yourself to continue")
          return;
        } else {
          form.submit();
        }
      }
      // form.submit();
    } else {
      console.error("Form element not found");
    }
  }; 
  useEffect(() => {
    if (typeof window !== "undefined") {
      setFormData((prev) => ({
        ...prev,
        SingleLine2: window.location.href,
      }));
    }
  }, []);

  useEffect(() => {
    console.log(formData);
  }, [formData]);

  return (
    <div id="requestst" className="scroll-mt-10">

      <div className="psty bg-dgray    py-10   md:py-[140px]  px-[20px] xl:px-[80px]  xxl:px-[150px]">

        <div className="container ">
          <h2 className="title-65 text-black">Request Your Free Audit </h2>
          <p className="text-19 fnt-lexend font-400 text-[#77787B] my-5 lg:mt-10 lg:mb-[75px]">Use the form below, or send us an email</p>

          <div className="contctform ">
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
                  <label className="mb-2 block text-font30 font-[300] text-gray-700">
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
                  <label className="mb-2 block text-font30 font-[300] text-gray-700">
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
                  <label className="mb-2 block text-font30 font-[300] text-gray-700 ">
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
                  <label className="mb-2 block text-font30 font-[300] text-gray-700">
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
                {/* <div className="mb-[30px]">
                <label className="mb-2 block text-font30 font-[300] text-gray-700">
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
              </div> */}
                <div className="mb-[30px]">
                  <label className="mb-2 block text-font30 font-[300] text-gray-700">
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
                <div className="mb-[30px]">
                  <label className="mb-2 block text-font30 font-[300] text-gray-700  ">
                    Message
                  </label>
                  <textarea
                    name="MultiLine"
                    onChange={handleChange}
                    maxLength={65535}
                    placeholder="Tell us about your project. What problems can we help you solve?"
                    className="gry-placeholder  h-[40px] w-full border-b border-gray-300 bg-dgray px-0   text-gray-700 focus:border-gray-300 focus:ring-0"
                    style={{
                      borderTop: "none",
                      borderLeft: "none",
                      borderRight: "none",
                    }}
                  />
                </div>
              </div>


              <div >
            <ReCAPTCHA sitekey={process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY || ""} ref={recaptcha} />

            
              {error !== "" && <div className='text-red-500'>{error}</div>}
              </div>
              <div className="flex flex-wrap md:flex-nowrap items-center justify-between">
               
                <button
                  className="h-fit lg:w-[540px] md:my-0 mt-4  hover:bg-prtext-primary group mt-5 md:mt-10  flex items-center space-x-2 rounded-full border border-primary px-6 lg:px-8 py-4 lg:py-5 text-black transition duration-300 ease-in  hover:shadow-lg md:mb-0"
                  type="submit"
                >
                  <span className="fnt-lexend m-auto text-font30 font-[500] uppercase duration-300 ease-in group-hover:text-black">
                    Submit enquiry
                  </span>

                </button>

              </div>
            </form>
            <div className="flex items-center gap-3 mt-5"><svg xmlns="http://www.w3.org/2000/svg" width="32" height="33" viewBox="0 0 32 33" fill="none">
              <path d="M13.9869 3.36189L7.33354 5.84593C5.80021 6.41409 4.54688 8.21106 4.54688 9.82304V19.6403C4.54688 21.1994 5.58687 23.2474 6.85354 24.1856L12.5869 28.4269C14.4669 29.8275 17.5602 29.8275 19.4402 28.4269L25.1735 24.1856C26.4402 23.2474 27.4802 21.1994 27.4802 19.6403V9.82304C27.4802 8.19785 26.2269 6.40088 24.6935 5.83272L18.0402 3.36189C16.9069 2.95229 15.0935 2.95229 13.9869 3.36189Z" stroke="#77787B" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
              <path d="M12.0669 16.1002L14.2136 18.2274L19.9469 12.5459" stroke="#77787B" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
            </svg>
              <p className="text-19 fnt-lexend font-400 text-[#77787B] ]">100% Privacy. No spam ever.</p></div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default RequestFreeAudit;
