import React from "react";
import Link from "next/link";
interface Canonicals {
  canonical: string;
}

type Metadata = {
  title: string;
  description: string;
  alternates: Canonicals;
    robots: string;
};
export async function generateMetadata(): Promise<Metadata> {
  return {
    title: "Legal | GS.Digital",
    description:
      "GS.Digital",
    alternates: {
      canonical: "https://www.globalsurf.ae/legal",
    },
     robots: "Noindex, Nofollow",
  };
}
const page = () => {
  return (
    <>
      <div className="container px-4">
        <div className="py-[50px] lg:py-[100px]">
          <h1 className="mb-2 text-font65 leading-[1.2]">Legal</h1>
          <p className="mb-3 text-font35 ">
            <strong>WEB POLICIES – WEBSITE TERMS AND CONDITIONS</strong>
            <br></br>
          </p>
          <div className=" mb-5 grid grid-cols-1 gap-2">
            <p className=" text-font19">
              <strong>Global Surf Digital Media”</strong> maintains the{" "}
              <strong>www.globalsurf.ae</strong> (Website){" "}
            </p>
            <p>
              These Terms and Conditions ("Terms") govern your use of our
              website, globalsurf.ae (the "Website"), and the services provided
              by Global Surf Digital Media ("GS.digital," "we," "us," or "our").
              By accessing or using our Website and services, you agree to
              comply with these Terms. If you do not agree, you must discontinue
              use immediately.
            </p>
          </div>
          <div className=" mb-5 grid grid-cols-1 gap-2">
            <p className="  text-font19">
              <strong>1. Definitions </strong>
            </p>
            <div>
              <ul className="list-outside list-disc pl-[40px]">
                <li>
                  <strong>“Website”</strong> refers to globalsurf.ae, owned and
                  operated by GS.Digital.{" "}
                </li>
                <li>
                  <strong>“User,” “you,” or “your”</strong> refers to any
                  individual or entity accessing or using the Website.{" "}
                </li>
                <li>
                  <strong>“Services”</strong> refers to the digital marketing,
                  web development, and other offerings provided by GS.Digital.{" "}
                </li>
              </ul>
            </div>
          </div>
          <div className=" mb-5 grid grid-cols-1 gap-2">
            <p className="  text-font19">
              <strong>2. Use of the Website </strong>
            </p>
            <div>
              <ul className="list-outside list-disc pl-[40px]">
                <li>
                  {" "}
                  You agree to use the Website solely for lawful purposes and in
                  compliance with all applicable laws and regulations.{" "}
                </li>
                <li> You must not: </li>
                <ul className="list-outside list-disc pl-[40px]">
                  <li>
                    {" "}
                    Use the Website to distribute harmful or malicious content.{" "}
                  </li>
                  <li>Attempt to gain unauthorized access to our systems. </li>
                  <li>
                    Engage in activities that disrupt or harm the Website’s
                    functionality.{" "}
                  </li>
                </ul>
              </ul>
            </div>
          </div>
          <div className=" mb-5 grid grid-cols-1 gap-2">
            <p className="  text-font19">
              <strong>3. Intellectual Property </strong>
            </p>
            <div>
              <ul className="list-outside list-disc pl-[40px]">
                <li>
                  All content, trademarks, logos, and other intellectual
                  property displayed on the Website are the exclusive property
                  of GS.Digital or its licensors.
                </li>
                <li>
                  You may not reproduce, distribute, or modify any content
                  without prior written consent.
                </li>
                <li>
                  Unauthorized use of any intellectual property may result in
                  legal action.
                </li>
              </ul>
            </div>
          </div>
          <div className=" mb-5 grid grid-cols-1 gap-2">
            <p className="  text-font19">
              <strong>4. Services </strong>
            </p>
            <div>
              <ul className="list-outside list-disc pl-[40px]">
                <li>
                  GS.Digital provides digital marketing and web development
                  services as outlined on the Website.
                </li>
                <li>
                  All services are subject to specific terms and conditions
                  detailed in our service agreements.
                </li>
                <li>
                  We reserve the right to modify, suspend, or terminate any
                  service at our discretion.
                </li>
              </ul>
            </div>
          </div>
          <div className=" mb-5 grid grid-cols-1 gap-2">
            <p className="  text-font19">
              <strong> 5. Limitation of Liability </strong>
            </p>
            <div>
              <ul className="list-outside list-disc pl-[40px]">
                <li>
                  GS.Digital is not liable for any direct, indirect, incidental,
                  or consequential damages arising from:
                </li>
                <ul className="list-outside list-disc pl-[40px]">
                  <li>Your use or inability to use the Website.</li>
                  <li>
                    Errors, inaccuracies, or omissions in the Website’s content.
                  </li>
                  <li>
                    Third-party links or resources accessed through the Website.
                  </li>
                </ul>
                <li>Your use of the Website is at your own risk.</li>
              </ul>
            </div>
          </div>
          <div className=" mb-5 grid grid-cols-1 gap-2">
            <p className="  text-font19">
              <strong>6. Third-Party Links </strong>
            </p>
            <div>
              <ul className="list-outside list-disc pl-[40px]">
                <li>
                  The Website may include links to external websites. These
                  links are provided for convenience only.
                </li>
                <li>
                  GS.Digital does not endorse, monitor, or assume responsibility
                  for the content or privacy practices of third-party websites.
                </li>
              </ul>
            </div>
          </div>
          <div className=" mb-5 grid grid-cols-1 gap-2">
            <p className="  text-font19">
              <strong>7. Privacy and Cookies </strong>
            </p>
            <div>
              <ul className="list-outside list-disc pl-[40px]">
                <li>
                  Your use of the Website is also governed by our{" "}
                  <Link href="privacy-policy" className="text-primary">
                    Privacy Policy
                  </Link>{" "}
                  and{" "}
                  <Link href="cookie-policy" className="text-primary">
                    Cookies Policy
                  </Link>
                  . These policies explain how we collect, use, and protect your
                  personal data.
                </li>
                <li>
                  GS.Digital does not endorse, monitor, or assume responsibility
                  for the content or privacy practices of third-party websites.
                </li>
              </ul>
            </div>
          </div>
          <div className=" mb-5 grid grid-cols-1 gap-2">
            <p className="  text-font19">
              <strong>8. Indemnification </strong>
            </p>
            <p>
              You agree to indemnify and hold GS.Digital harmless from any
              claims, damages, or expenses arising from:{" "}
            </p>
            <div>
              <ul className="list-outside list-disc pl-[40px]">
                <li>Your breach of these Terms.</li>
                <li>Your use of the Website or services.</li>
                <li>Any violation of applicable laws or regulations.</li>
              </ul>
            </div>
          </div>
          <div className=" mb-5 grid grid-cols-1 gap-2">
            <p className="  text-font19">
              <strong>9. Changes to These Terms </strong>
            </p>
            <div>
              <ul className="list-outside list-disc pl-[40px]">
                <li>
                  GS.Digital reserves the right to update or modify these Terms
                  at any time without prior notice.
                </li>
                <li>
                  Your continued use of the Website after any changes indicates
                  acceptance of the revised Terms.
                </li>
              </ul>
            </div>
          </div>
          <div className=" mb-5 grid grid-cols-1 gap-2">
            <p className="  text-font19">
              <strong>10. Governing Law and Jurisdiction </strong>
            </p>
            <div>
              <ul className="list-outside list-disc pl-[40px]">
                <li>
                  These Terms are governed by the laws of the United Arab
                  Emirates.
                </li>
                <li>
                  Any disputes arising from the use of the Website or services
                  shall be subject to the exclusive jurisdiction of the courts
                  in Dubai, UAE.
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default page;
