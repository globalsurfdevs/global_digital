// ThreeColumnTable.tsx

import React from 'react';
import Image from 'next/image';

const ThreeColumnTable: React.FC = ({

}) => {
  return (
    <section className="pt-[50px] lg:pt-[100px]">
      <div className="container mx-auto ">
        <div className="grid">
          <div className="col-span-2 mb-5 xl:mb-0"></div>

          <div className="col-span-5 w-full" id="section2">
            <h2 className="title-65 mb-[40px]">
              How Google's AI Overviews Are Changing Search Behaviour and What It Means for UAE Markets
            </h2>

            <p className="text-font19 text-[#77787B] mb-[30px]">
              AI Overviews have inserted a new layer between the search and the click,
              and that layer is changing the commercial dynamics of organic search in
              ways that affect some UAE industries far more than others.
            </p>

            <h3 className="text-30 mb-3">
              The Research Phase: How UAE Customers Search Before They Contact
            </h3>

            <p className="text-font19 text-[#77787B] mb-4">
              A Dubai property investor searching for mortgage comparison options no
              longer has to click through to five different lender websites. Google's
              AI Overview synthesises the comparison and displays it directly on the
              results page. An Abu Dhabi business owner searching for VAT filing
              advice gets a step-by-step overview before a single organic result
              appears. In both cases, the user may get exactly what they needed
              without ever visiting a website.
            </p>

            <p className="text-font19 text-[#77787B] mb-[30px]">
              UAE smartphone penetration exceeds 97%. On mobile devices, AI
              Overviews occupy a substantial portion of the above-the-fold screen
              area, often the majority of what a user sees before any scrolling,
              making it significantly less likely that mobile users will scroll past
              the AI-generated answer to reach organic results below it. For B2B
              searches conducted on desktop during working hours, the dynamic
              differs, but the intercept effect on research-phase queries remains
              significant across both device types.
            </p>

            <h3 className="text-30 mb-3">
              Which Queries Trigger AI Overviews in UAE Search
            </h3>

            <Image alt="Comparison of weak versus strong contractor website" loading="lazy" width="1100" height="500" decoding="async" data-nimg="1" className="my-[40px] m-auto" src="../../assets/blogs/ai/ai4.webp" />


            <p className="text-font19 text-[#77787B] mb-[30px]">
              Not every search triggers an AI Overview. Informational, comparative,
              and guidance-seeking queries are most affected. Transactional,
              navigational, and branded queries remain largely unchanged.
              Understanding this distinction is the starting point for any UAE SEO
              adaptation strategy.
            </p>

            <div className="border border-gray-200 overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-[#F2F2F2]">
                  <tr>
                    <th className="px-6 py-3 border-r border-gray-200">
                      Query Type
                    </th>
                    <th className="px-6 py-3 border-r border-gray-200">
                      Before AI Overviews
                    </th>
                    <th className="px-6 py-3 border-r border-gray-200">
                      After AI Overviews
                    </th>
                    <th className="px-6 py-3">UAE Business Risk</th>
                  </tr>
                </thead>

                <tbody>
                  <tr>
                    <td className="px-6 py-4 border-r border-gray-200">
                      Best accounting software UAE
                    </td>
                    <td className="px-6 py-4 border-r border-gray-200">
                      User clicks organic result
                    </td>
                    <td className="px-6 py-4 border-r border-gray-200">
                      AI summary answers the question
                    </td>
                    <td className="px-6 py-4">HIGH</td>
                  </tr>

                  <tr>
                    <td className="px-6 py-4 border-r border-gray-200">
                      How to register a company in Dubai
                    </td>
                    <td className="px-6 py-4 border-r border-gray-200">
                      User visits guide pages
                    </td>
                    <td className="px-6 py-4 border-r border-gray-200">
                      AI provides step-by-step overview
                    </td>
                    <td className="px-6 py-4">HIGH</td>
                  </tr>

                  <tr>
                    <td className="px-6 py-4 border-r border-gray-200">
                      Dubai personal injury lawyer
                    </td>
                    <td className="px-6 py-4 border-r border-gray-200">
                      Multiple organic clicks
                    </td>
                    <td className="px-6 py-4 border-r border-gray-200">
                      AI lists key considerations
                    </td>
                    <td className="px-6 py-4">MEDIUM</td>
                  </tr>

                  <tr>
                    <td className="px-6 py-4 border-r border-gray-200">
                      SEO agency Abu Dhabi
                    </td>
                    <td className="px-6 py-4 border-r border-gray-200">
                      Navigational, less affected
                    </td>
                    <td className="px-6 py-4 border-r border-gray-200">
                      Mostly unchanged
                    </td>
                    <td className="px-6 py-4">LOW</td>
                  </tr>

                  <tr>
                    <td className="px-6 py-4 border-r border-gray-200">
                      VAT registration UAE process
                    </td>
                    <td className="px-6 py-4 border-r border-gray-200">
                      User visits FTA guides
                    </td>
                    <td className="px-6 py-4 border-r border-gray-200">
                      AI provides a process summary
                    </td>
                    <td className="px-6 py-4">HIGH</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <h3 className="text-30 mt-[40px] mb-3">
              The Shortlisting Phase: Invisible Before the First Click
            </h3>

            <p className="text-font19 text-[#77787B]">
              The most commercially significant consequence for UAE businesses is not
              the traffic loss itself. It is what that traffic represented:
              potential clients who were in the research phase of their buying
              journey. If a UAE legal firm, real estate developer, or financial
              services company relied on informational content to bring buyers into
              their funnel, that funnel entry point is being intercepted before the
              business ever has visibility into the interaction.
            </p>
          </div>
        </div>
      </div>
    </section>

  );
};

export default ThreeColumnTable;