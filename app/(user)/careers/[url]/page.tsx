'use client'
import { useParams } from "next/navigation";
import { career } from "../../../data/career";
import Link from "next/link";
import Button from "@/app/components/Button/Button";

export default function DetailsPage() {
  const { url } = useParams();


  const item = career.find((job) => job.url === url);

  if (!item) {
    return <p>Item not found!</p>;
  }

  return (
    <div className="container mx-auto py-4">
      <div className="pt-[30px] lg:pt-[100px] ">
        <h1 className="title-65 mb-5 md:mb-[75px] pb-5 md:pb-[50px] border-b ">Looking Experienced <br></br>{item.post}</h1>
        <div className="md:grid md:grid-cols-2 gap-2 mb-5 md:mb-[50px] pb-5 md:pb-[50px] border-b">
          <div>
            <div className="mb-[15px] md:mb-[30px]">
              <h2 className="text-font25 ">Job Type</h2>
              <p className="text-font19 text-gray1">Full-time, Permanent</p>
            </div>
            <div>
              <h2 className="text-font25 ">Location</h2>
              <p className="text-font19 text-gray1">Exchange Tower, Business Bay, Dubai, UAE</p>
            </div>
          </div>
          <div>
            <div className="mb-[15px] md:mb-[30px]">
              <h2 className="text-font25 ">Job Description</h2>
              <p className="text-font19 text-gray1">We are looking for an experienced AV Sales Specialist in Dubai</p>
            </div>
          </div>
        </div>
        <div>
            <div className="mb-[15px] md:mb-[30px] pb-[15px] md:pb-[40px] border-b">
              <h2 className="text-font25 mb-5 md:mb-[30px]">The Role & Responsibility</h2>
              <ul className="listst">
                                <li>Identify and target potential clients, including corporations, educational
                                    institutions, and event organizers.</li>
                                <li>Develop and maintain relationships with new and existing clients to drive sales
                                    growth.</li>
                                <li>Conduct market research to stay informed about industry trends and competitor
                                    activities.</li>
                                <li>Achieve sales targets.</li>
                                <li>Maintain a comprehensive understanding of AV products and solutions offered by the
                                    company.
                                </li>
                                <li>Provide product demonstrations to potential clients, highlighting key features and
                                    benefits.</li>
                                <li>Meet with clients to understand their specific AV needs and requirements.</li>
                                <li>Propose tailored AV solutions that align with client needs and budget constraints.
                                </li>
                                <li>Prepare detailed proposals and quotations for AV projects.</li>
                                <li>Oversee the implementation of AV projects, ensuring timely and accurate delivery of
                                    products and services.
                                </li>
                                <li>Coordinate with internal teams, such as installation and technical support, to
                                    ensure seamless execution of projects.
                                </li>
                                <li>Monitor project progress and address any issues that arise during installation and
                                    setup.</li>
                                <li>Provide ongoing support to clients after the sale, including troubleshooting and
                                    technical assistance.
                                </li>
                                <li>Conduct training sessions for clients on the proper use and maintenance of AV
                                    equipment.
                                </li>
                                <li>Handle warranty claims and service requests in a timely and efficient manner.</li>
                                <li>Maintain accurate records of sales activities, client interactions, and transactions
                                    in CRM systems.
                                </li>
                                <li>Prepare regular sales reports and forecasts for management review.</li>
                                <li>Attend sales meetings and provide updates on sales performance and market feedback.</li>
                                <li>Negotiate pricing and contract terms with clients to ensure profitability</li>
                            </ul>
            </div>
        </div>
        <div>
          <p className="text-font19 text-gray1 mb-5"><b>NB: Proceed to apply if the above job description matches with your profile.</b></p>
        </div>

        <div className='mt-3 lg:mt-[20px] mb-[40px] lg:mb-[100px] innerfnont'><Link href={`/apply-now/${item.id}`}><Button text="Apply Now" /></Link></div>
      </div>
      </div>
  );
}

