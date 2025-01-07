import React from "react";

const page = () => {
  return (
    <>
      <div className="container px-4">
        <div className="py-[50px] lg:py-[100px]">
          <p className=" text-font19">GS.Digital</p>
          <h1 className="mb-2 text-font65"> Cookie Policy </h1>
          <p className="mb-5 max-w-[44ch] text-font35 leading-[1.2]">
            <strong>
              At GS.Digital, we are committed to protecting the privacy and
              personal information of our users.
            </strong>
          </p>
          <div className=" mb-5 grid grid-cols-1 gap-2">
            <p className="  text-font19">
              <strong>What Are Cookies? </strong>
            </p>
            <div>
              <p>
                Cookies are small text files stored on your device (computer,
                tablet, smartphone) when you visit a website. These files help
                improve your browsing experience by remembering preferences,
                enhancing site performance, and providing insights into how you
                interact with our content.{" "}
              </p>
            </div>
          </div>

          <div className=" mb-5 grid grid-cols-1 gap-2">
            <p className="  text-font19">
              <strong>Types of Cookies We Use  </strong>
            </p>
            <div>
              <ul className="list-outside list-decimal pl-[40px]">
                <li>
                Essential Cookies
                </li>
              </ul>
              <ul className="list-outside list-disc pl-[60px]">
                <li>
                These cookies are necessary for the core functionality of our website. Without them, certain features may not work.
                </li>
              </ul>

              <ul className="list-outside list-decimal pl-[40px]">
                <li>
                Analytical/Performance Cookies
                </li>
              </ul>
              <ul className="list-outside list-disc pl-[60px]">
                <li>
                These cookies help us understand how visitors interact with our website by collecting data on user behaviour and site performance.
                </li>
              </ul>

              <ul className="list-outside list-decimal pl-[40px]">
                <li>
                Functionality Cookies
                </li>
              </ul>
              <ul className="list-outside list-disc pl-[60px]">
                <li>
                These cookies remember your preferences and choices to provide a more personalized experience.
                </li>
              </ul>

              <ul className="list-outside list-decimal pl-[40px]">
                <li>
                Advertising/Targeting Cookies
                </li>
              </ul>
              <ul className="list-outside list-disc pl-[60px]">
                <li>
                These cookies deliver relevant advertisements based on your browsing habits and interests.
                </li>
              </ul>
            </div>
          </div>
          <div className=" mb-5 grid grid-cols-1 gap-2">
            <p className="  text-font19">
              <strong>How We Use Cookies  </strong>
            </p>
            <p>
            We use cookies to:
            </p>
            <div>
              <ul className="list-outside list-disc pl-[40px]">
                <li>
                Provide and enhance our services.
                </li>
                <li>
                Remember your preferences and improve user experience.
                </li>
                <li>
                Analyze site traffic and user interactions to optimize our content.
                </li>
              </ul>
            </div>
          </div>
          <div className=" grid grid-cols-1 gap-2 mb-5">
            <p className="  text-font19">
              <strong>Third-Party Cookies </strong>
            </p>
            <div  >
              <p >Some cookies on our website may be set by third-party services, such as analytics providers or advertisers. We do not control these cookies and recommend reviewing their respective policies. </p>
            </div>
          </div>
          <div className=" grid grid-cols-1 gap-2 mb-5">
            <p className="  text-font19">
              <strong>Managing Cookies </strong>
            </p>
            <div  >
              <p >You have the option to manage or disable cookies through your browser settings. Please note that disabling certain cookies may affect the functionality of our website.

              For more information on managing cookies, visit <a href="https://www.aboutcookies.org/" target="_blank" rel="nofollow" className="text-primary">aboutcookies.org</a>. </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default page;
