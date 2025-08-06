"use client";
import React, {useEffect, useState } from "react";
import Link from "next/link";

 

const RequestFreeAuditNew: React.FC = () => {
  const [formData, setFormData] = useState<{
    PhoneNumber_countrycode?: string;
    Email?: string;
    SingleLine?: string;
    SingleLine2?: string;
  }>({});
  const [phoneError, setPhoneError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [nameError, setNameError] = useState("");
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

  useEffect(()=>{
    console.log(window.location.href)
    setFormData((prev)=>({...prev,SingleLine2:window.location.href}))
  },[window.location.href])

  useEffect(()=>{
    console.log(formData)
  },[formData])

  return (
    <div>
      <div className="maintalk">
        <div className="bg-dgray px-[20px] pb-[20px] pt-[20px] md:pb-[0px] lg:px-[40px] lg:pt-[100px]">
          <h1 className="title-65">
            Collaborate. Create. Conquer<span className="text-primary">.</span>
          </h1>
          <div className="mt-[30px] flex flex-col gap-8 md:col-span-3 lg:mt-[150px]">
            <div className="flex flex-col gap-3">
              <p className="text-font35">
                <a href="mailto:hello@globalsurf.ae" className="break-words">
                  hello<span className="text-primary">@</span>globalsurf.ae
                </a>
              </p>
              <p className="text-font35">
                <a href="tel:+97145821133">+971 4 582 1133</a>
              </p>
            </div>
          </div>
        </div>
        <div className="psty p-[20px] md:p-[100px]">
          <div className="group">
            
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
              <div className="md:grid md:grid-cols-2 md:gap-5">
                <input
                  type="text"
                  className="hidden"
                  name="SingleLine2"
                  value={formData.SingleLine2 || ""}
                />

                <div className="mb-[30px]">
                  <input
                    type="text"
                    name="SingleLine"
                    required
                    onChange={handleChange}
                    className="w-full rounded-lg border border-gray-300 p-3 focus:border-dgray focus:outline-none focus:ring-1 focus:ring-dgray"
                    placeholder="Enter your name"
                  />
                  {nameError && (
                    <p className="mt-1 text-sm text-red-500">{nameError}</p>
                  )}
                </div>
                <div className="mb-[30px]">
                  <input
                    type="number"
                    name="PhoneNumber_countrycode"
                    id="international_PhoneNumber_countrycode"
                    className="w-full rounded-lg border border-gray-300 p-3 focus:border-dgray focus:outline-none focus:ring-1 focus:ring-dgray"
                    placeholder="Contact Number"
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
                  <input
                    type="email"
                    name="Email"
                    required
                    onChange={handleChange}
                    maxLength={255}
                    className="w-full rounded-lg border border-gray-300 p-3 focus:border-dgray focus:outline-none focus:ring-1 focus:ring-dgray"
                    placeholder="Enter your email"
                  />
                  {emailError && (
                    <p className="mt-1 text-sm text-red-500">{emailError}</p>
                  )}
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
              <div className="mb-[30px]">
                <select
                  name="Dropdown1"
                  onChange={handleChange}
                  className="mt-3 w-full rounded-lg border border-gray-300 p-3 focus:border-dgray focus:outline-none focus:ring-1 focus:ring-dgray"
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
                  In submitting this form, you are agreeing to{" "}
                  <Link href="/privacy-policy">Privacy Policy</Link>.
                </p>
              </div>
              <button
                type="submit"
                className="w-fit rounded-[55px] bg-primary px-[40px] py-[10px] font-medium text-white transition duration-300 ease-in-out hover:bg-dgray hover:text-primary md:px-[50px] md:py-[20px]"
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

export default RequestFreeAuditNew;
