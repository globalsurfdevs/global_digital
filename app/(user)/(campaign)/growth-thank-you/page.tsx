import React from "react";
import { MdOutlineArrowBack, MdOutlineDoneOutline } from "react-icons/md";
import Link from "next/link";

type Metadata = {
  robots: string;
};
export async function generateMetadata(): Promise<Metadata> {
  return {
    robots: "noindex, nofollow",
  };
}
const page = () => {
  return (
    <div>
      <div className="py-[50px] text-center md:py-[100px]   ">
        <h2 className="mb-2 text-primary">
          {" "}
          <MdOutlineDoneOutline className="m-auto text-[50px]" />
        </h2>
        <h2 className="title-65 mb-3 lg:mb-[30px] lg:mt-[20px]">Thank You</h2>
        <p className="pe-2 ps-2">
          Your Response has been submitted<br></br>
          We will call you within 60 mins on working Hours
        </p>
        <div className="mt-4">
          <Link href="/" className="grdnbtn">
            <div>
              <span className="bggrdnt"></span>{" "}
              <span className="flex items-center justify-center gap-3 transition-transform duration-300 ease-in-out hover:-translate-x-1 hover:text-gray1">
                <MdOutlineArrowBack className="text-primary" />
                ENTER TO THE HOME PAGE
              </span>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default page;
