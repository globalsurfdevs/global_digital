import Image from "next/image";
import CustomTable from "../BlogSocialMedia/CustomTable";
import {
  keyDifferenceTableData,
  keyDifferenceTableTitles,
} from "../../data/blogdatas/how-google-ads-meta-ads-works";
import  Link  from "next/link";

const cplComparisonByIndustryTitles = [
  "Industry",
  "Google Ads CPL",
  "Meta Ads CPL",
  "Recommended primary platform",
];

const cplComparisonByIndustryData = [
  {
    Industry: "Real Estate",
    "Google Ads CPL": "High",
    "Meta Ads CPL": "Medium",
    "Recommended primary platform": "Both",
  },
  {
    Industry: "Healthcare",
    "Google Ads CPL": "Medium",
    "Meta Ads CPL": "Low",
    "Recommended primary platform": "Google",
  },
  {
    Industry: "B2B Services",
    "Google Ads CPL": "High",
    "Meta Ads CPL": "Medium",
    "Recommended primary platform": "Google",
  },
  {
    Industry: "Education",
    "Google Ads CPL": "Medium",
    "Meta Ads CPL": "Low",
    "Recommended primary platform": "Both",
  },
  {
    Industry: "E-Commerce",
    "Google Ads CPL": "Medium",
    "Meta Ads CPL": "Low",
    "Recommended primary platform": "Meta",
  },
];

const HowDigitalMarketingWinsContent = () => {
  return (
    <section>
      <div className="container mx-auto py-[50px] lg:py-[50px]">
        <div className="grid grid-cols-1 xl:grid-cols-7 gap-4">
          <div className="col-span-2 mb-5 xl:mb-0"></div>

          <div className="col-span-5 w-full ">
            {/* <div>
              <p className="text-font19 text-[#77787B] mb-[16px]">If you are running paid campaigns in the UAE, you are likely using Google Ads or Meta Ads and wondering which one actually drives better results. Many businesses invest in both, but struggle to identify which platform delivers more reliable leads.</p>
              <p className="text-font19 text-[#77787B] mb-[16px]">The difference lies in how each platform works. Google Ads captures people who are actively searching for a solution, while Meta Ads introduces your brand to people who may not yet be looking. Both are widely used in the UAE, but they play very different roles in lead generation. </p>
              <p className="text-font19 text-[#77787B] mb-[16px]">Cost adds another layer to the decision, and this is where comparisons often become misleading. Our Performance Lead Ajay has observed, many UAE campaigns are not measured on equal terms. Meta is often set up with native lead forms, while Google drives users to website forms. This creates a natural imbalance. Meta tends to generate higher lead volume at a lower cost, while Google leads, though more expensive, often convert at a higher rate. Without aligning how leads are captured, the comparison between the two platforms is not truly equal. </p>
              <p className="text-font19 text-[#77787B] mb-[16px]">In this guide, we break down how both platforms perform, including cost per lead benchmarks, industry insights, and how to split your budget effectively. </p>
              <p className="text-font19 text-[#77787B] mb-0">The comparison below will help you decide where to focus next. </p>
            </div> */}

            <div>
              {/* Title */}
              <h2 className="title-65 mb-5 lg:mb-[40px] pt-7 lg:pt-[50px] 2xl:pt-[110px]" id="content1">
                Why Visibility Is Now a Procurement Criterion
              </h2>
              {/* 
              <Image
                src="/images/blogs/google-ads-vs-meta-ads-for-uae-lead-generation/img-2.png"
                alt="Importance of Technical SEO"
                width={1200}
                height={630}
                className="mb-5 lg:mb-[40px]"
              /> */}
              {/* Paragraphs */}
              <p className="text-font19 text-[#77787B] mb-[16px]">
                In the UAE, a developer researching contractors for a mixed-use project in Business Bay does not start with a referral call. They start with a Google search. They review websites, compare project portfolios, and form a shortlist before a single conversation takes place. If your company is not visible in that moment, you are not in the room.
              </p>
              <p className="text-font19 text-[#77787B] mb-[16px]">
                Digital visibility has become a pre-qualification criterion. Construction has always been relationship-driven. For a long time, that was a legitimate reason to deprioritise digital investment. It is no longer true. The relationships still matter. But the clients who enter those relationships now arrive having already assessed you online.
              </p>
              <p className="text-font19 text-[#77787B] mb-[16px]">
                The built environment sector in the UAE is competitive, project-based, and increasingly transparent. Procurement teams at developers, government entities, and real estate firms are doing their own research. They are not waiting for introductions.
              </p>
              <div>
                <h2 className="title-65 mb-5 lg:mb-[40px] pt-7 lg:pt-[50px] 2xl:pt-[110px]" id="content1">
                  How the Built Environment Procurement Journey Has Changed
                </h2>
                <p className="text-font19 text-[#77787B] mb-[16px]">
                  The built environment procurement journey now begins online in most major UAE markets. Before a developer in DIFC picks up the phone, their team has typically reviewed five to eight contractor websites, checked project portfolios on LinkedIn, and formed a preliminary shortlist based on digital evidence alone.</p>
                <Image
                  src="/images/blogs/how-digital-marketing-wins-projects-for-construction-companies-in-uae/main-2.jpg"
                  alt="Importance of Technical SEO"
                  width={1200}
                  height={630}
                  className="mb-5 lg:mb-[40px]"
                />
                <div>
                  <h3 className="text-30 mb-4 font-bold pt-4">The Research Phase: How Clients Search Before They Call</h3>
                  <p className="text-font19 text-[#77787B] mb-[16px] ">
                    A procurement officer at a government entity in Abu Dhabi searching for a structural contractor does not browse a trade directory. They search Google. They look for companies that rank for queries like 'structural contractor Abu Dhabi' or 'general contractor Dubai.' They cross-reference LinkedIn to check the company's project history, team credibility, and industry activity. Platforms like Zawya and ProQuo contribute to the picture. By the time they make contact, the shortlist is already formed.
                  </p>
                </div>
                <div>
                  <h3 className="text-30 mb-4 font-bold pt-4">The Comparison Phase: Your Website Is Your Pitch Deck</h3>
                  <p className="text-font19 text-[#77787B] mb-[16px] ">
                    A construction company website is not a digital brochure. It is a live, 24-hour business development tool that either earns or loses a place on the shortlist. Procurement teams look for specific things:
                  </p>
                  <ul className="list-disc pl-10 mt-3 mb-[24px]">
                    <li className="text-font19 mb-2"> Project portfolio with scope and scale</li>
                    <li className="text-font19 mb-2"> Clearly defined service capabilities and sector specialisations</li>
                    <li className="text-font19 mb-2"> Visible accreditations including ISO, CIOB, and RERA registration</li>
                    <li className="text-font19 mb-2"> Evidence of successful delivery in the relevant sector</li>
                  </ul>
                  <p className="text-font19  mb-[16px] ">
                    A website that fails to provide these fails the comparison phase before a human conversation begins.
                  </p>
                </div>
                <div>
                  <h3 className="text-30 mb-4 font-bold pt-4">The Shortlisting Phase: Why Some Companies Are Never Considered</h3>
                  <p className="text-font19 text-[#77787B] mb-[16px] ">
                    If a company cannot be found for its core services in UAE search results, it is invisible to the right audience. It does not lose to competitors. It simply does not appear in the conversation at all. The procurement manager moves on to the next result. This is the default operating reality for projects across Dubai, Abu Dhabi, and the wider Gulf right now.
                  </p>
                  <p className="text-font19 text-[#77787B] mb-[16px] ">
                    <strong>The procurement reality in 2026:</strong> Companies that rank on page one of Google for 'construction contractor Dubai' or 'MEP contractor Abu Dhabi' are already in the client's consideration set. Companies that do not rank are not.
                  </p>
                </div>

                <div>
                  <h2 className="title-65 mb-5 lg:mb-[40px] pt-7 lg:pt-[50px] 2xl:pt-[110px]" id="content1">
                    What Digital Visibility Actually Means for a Built Environment Company
                  </h2>
                  <p className="text-font19 text-[#77787B] mb-[16px]">
                    <Link href="/industry/construction" className="text-primary"> Digital visibility for a built environment company </Link> refers to the ability to be found, assessed, and shortlisted through online channels at every stage of a client's procurement process. It is not about social media followers or website aesthetics. It is about ensuring that when a developer or government entity searches for your specific services, your company appears, impresses, and is easy to contact.
                  </p>
                </div>

                <div>
                  <h3 className="text-30 mb-4 font-bold pt-4">Search Visibility</h3>
                  <p className="text-font19 text-[#77787B] mb-[16px] ">
                    <Link href="https://www.globalsurf.ae/seo-agency-dubai" className="text-primary">Ranking on Google for the service and location</Link> combinations your target clients actually use. 'Fit-out contractor Dubai,' 'MEP consultancy Abu Dhabi,' 'general contractor DIFC' - these are active procurement queries. Appearing on page one places you at the point of decision.
                  </p>
                </div>
                <div>
                  <h3 className="text-30 mb-4 font-bold pt-4">Credibility Signals</h3>
                  <p className="text-font19 text-[#77787B] mb-[16px] ">
                    What a client sees when they land on your website or LinkedIn profile. Accreditations, ISO certification, RERA registration, leadership profiles, and project documentation all function as trust signals. Their absence functions as a warning signal.
                  </p>
                </div>
                <div>
                  <h3 className="text-30 mb-4 font-bold pt-4">Content Authority</h3>
                  <p className="text-font19 text-[#77787B] mb-[16px] ">
                    Demonstrating expertise through project case studies, technical capability statements, and thought leadership content. <Link href="/creative-copywriting-agency-dubai" className="text-primary">Content authority</Link> builds over time and creates inbound interest that referral networks alone cannot generate.
                  </p>
                </div>
                <div>
                  <h3 className="text-30 mb-4 font-bold pt-4">Conversion Architecture</h3>
                  <p className="text-font19 text-[#77787B] mb-[16px] ">
                    Turning visibility into enquiries. A phone number, WhatsApp click-to-chat, and a clear RFQ pathway on every key page. Removing friction from the contact process is a business development decision, not a design preference.
                  </p>
                  <p className="text-font19 text-[#77787B] mb-[16px] ">
                    <span className="text-black">Key insight:</span> Most <Link href="/blogs/what-does-built-environment-really-mean-in-the-uae" className="text-primary">
                    built environment companies in the UAE</Link> excel at their craft. What they often lack is the digital infrastructure to make that capability visible to the clients who are actively looking for it. The gap between capability and visibility is where project opportunities are lost.
                  </p>
                </div>

                <div>
                  <h2 className="title-65 mb-5 lg:mb-[40px] pt-7 lg:pt-[50px] 2xl:pt-[110px]" id="content1">
                    The 5 Digital Channels That Drive Project Enquiries in the Built Environment
                  </h2>
                  <Image src="/images/blogs/how-digital-marketing-wins-projects-for-construction-companies-in-uae/main-3.jpg" alt="Importance of Technical SEO"
                    width={1200} height={630} className="mb-5 lg:mb-[40px]" />
                  {/* Paragraphs */}
                  <p className="text-font19 text-[#77787B] mb-[16px]">
                    Not all digital channels deliver equal value for built environment companies. The following five have the clearest, most measurable impact on project pipeline in UAE B2B markets.
                  </p>
                </div>

                <div>
                  <h3 className="text-30 mb-4 font-bold pt-4">1. Organic Search (SEO)</h3>
                  <p className="text-font19 text-[#77787B] mb-[16px] ">
                    Organic search delivers the highest quality of inbound intent for built environment companies. When a developer searches for 'general contractor Business Bay Dubai' or 'MEP fit-out specialist Abu Dhabi,' they are actively shortlisting. Ranking on page one for these terms means your company is present at precisely the moment procurement decisions begin. <Link href="/seo-agency-dubai" className="text-primary">SEO</Link> typically delivers meaningful results within three to six months for competitive B2B construction terms, and unlike paid advertising, those rankings work without ongoing budget once established.
                  </p>
                </div>
                <div>
                  <h3 className="text-30 mb-4 font-bold pt-4">2. LinkedIn - Organic and Paid</h3>
                  <p className="text-font19 text-[#77787B] mb-[16px] ">
                    LinkedIn serves two functions for built environment companies. Organically, consistent thought leadership content builds brand authority among developers, procurement directors, and consultants in the UAE. Through paid campaigns, <Link href="/social-media-marketing-dubai" className="text-primary">LinkedIn's Account-Based Marketing</Link> tools allow precise targeting by company, job title, and geography - reaching the specific procurement managers and development directors at firms you want to work with.
                  </p>
                </div>
                <div>
                  <h3 className="text-30 mb-4 font-bold pt-4">3. Google Business Profile</h3>
                  <p className="text-font19 text-[#77787B] mb-[16px] ">
                    Frequently overlooked for B2B, <Link href="/google-business-profile-dubai" className="text-primary">Google Business Profile</Link> is a significant credibility signal during procurement research. A fully optimised profile with project photos, consistent contact information, and professional descriptions appears in Google Maps and Knowledge Panels. When a procurement team searches your company name, what they see in that panel either reinforces or undermines the impression your website creates.
                  </p>
                </div>
                <div>
                  <h3 className="text-30 mb-4 font-bold pt-4">4. Content Marketing and Thought Leadership</h3>
                  <p className="text-font19 text-[#77787B] mb-[16px] ">
                    Project case studies, technical guides, and industry insight pieces position a built environment company as an authority rather than a commodity. <Link href="/content-marketing-agency-dubai" className="text-primary">Content that answers specific procurement queries</Link> - 'what to look for in a fit-out contractor UAE' or 'LEED certification contractors Dubai' - captures intent-rich traffic and builds trust over time. It also supports SEO by creating indexed pages that rank for long-tail searches.
                  </p>
                </div>
                <div>
                  <h3 className="text-30 mb-4 font-bold pt-4">5. Website Conversion Rate Optimisation (CRO)</h3>
                  <p className="text-font19 text-[#77787B] mb-[16px] ">
                    Traffic without conversion is wasted. <Link href="/conversion-rate-optimization-agency-dubai" className="text-primary">CRO for built environment companies</Link> means clear service scope on every page, visible accreditations and certifications, easy enquiry pathways including RFQ forms and WhatsApp click-to-chat, and a project portfolio that functions as a capability statement rather than a photo gallery.
                  </p>
                  <p className="text-font19 text-[#77787B] mb-[16px] ">
                    <span className="text-black">GS Digital perspective:</span> If you are unsure which of these channels to prioritise first, the answer depends on your current digital baseline, your target client type, and your project pipeline goals. That is exactly what GS Digital's strategy consultation is designed to work through.
                  </p>
                </div>

                <div>
                  <h2 className="title-65 mb-5 lg:mb-[40px] pt-7 lg:pt-[50px] 2xl:pt-[110px]" id="content1">
                    Why Most Construction Company Websites Fail to Generate Enquiries
                  </h2>
                  {/* Paragraphs */}
                  <p className="text-font19 text-[#77787B] mb-[16px]">
                    The problem is rarely that a built environment company lacks a website. The problem is that the <Link href="/web-design-and-development" className="text-primary">website was built to look professional</Link>, not to generate enquiries. A portfolio of excellent projects sits behind generic homepage copy that could describe any contractor in any market. These are not design problems. They are business development problems.
                  </p>

                  <h4 className="text-20 mb-3">Five specific failure modes that appear consistently:</h4>
                  <ul className="list-disc pl-10 mt-3 mb-[24px]">
                    <li className="text-font19 mb-2"> <strong>Generic homepage copy</strong> that does not state specific services, locations served, or sector specialisations. 'We deliver quality construction solutions' describes every competitor identically.</li>
                    <li className="text-font19 mb-2"> <strong>Project portfolios with no context</strong> - photographs without scope, scale, client type, or outcome. Evidence without narrative does not build confidence.</li>
                    <li className="text-font19 mb-2"> <strong>No visible accreditations</strong> - ISO, CIOB, RICS, or RERA registration are procurement trust signals. Their absence raises questions a strong CV alone cannot answer.</li>
                    <li className="text-font19 mb-2"> <strong>Friction in the contact process</strong> - a contact form with no phone number, no WhatsApp, and no direct email. A developer in a hurry moves to the next result.</li>
                    <li className="text-font19 mb-2"> <strong>No service and location landing pages</strong>targeting combinations like 'MEP contractor Dubai' or 'fit-out specialist Abu Dhabi,' which is where procurement searches actually land.</li>
                  </ul>
                  <p className="text-font19 text-[#77787B] mb-[16px]">
                    The result is a website that looks professional but functions as a digital brochure rather than a business development tool. Fixing these issues does not require a full website rebuild. It requires a structured audit, a clear content strategy, and technical SEO implementation - work that typically delivers measurable improvement within 60 to 90 days.
                  </p>
                </div>
                <div>
                  <h2 className="title-65 mb-5 lg:mb-[40px] pt-7 lg:pt-[50px] 2xl:pt-[110px]" id="content1">
                    What Results Look Like: Digital Visibility in Practice
                  </h2>
                  <p className="text-font19 text-[#77787B] mb-[16px]">
                    The most effective way to understand the impact of digital visibility is to look at what it delivers in practice.
                  </p>
                  <Image src="/images/blogs/how-digital-marketing-wins-projects-for-construction-companies-in-uae/main-4.jpg" alt="Importance of Technical SEO"
                    width={1200} height={630} className="mb-5 lg:mb-[40px]" />
                  {/* Paragraphs */}
                  <p className="text-font19 text-[#77787B] mb-[16px]">
                    ASGC Group - one of the UAE's leading general contracting and construction conglomerates, achieved immediate and sustained growth following their website redevelopment and SEO programme with GS Digital:
                  </p>
                  <ul className="list-disc pl-10 mt-3 mb-[24px]">
                    <li className="text-font19 mb-2">926% increase in weekly active users in the first week post-launch</li>
                    <li className="text-font19 mb-2">373,000 new website users attracted across three years</li>
                    <li className="text-font19 mb-2">4,638 contact form submissions generated, each a direct project enquiry</li>
                  </ul>
                </div>

                <p className="text-font19 text-[#77787B] mb-[16px]"> <Link href="/case-study/assent-steel" className="text-primary">ASSENT STEEL</Link> - a UAE-based structural steel fabricator and erector - achieved a 2x increase in organic traffic following a content and SEO programme focused on their core service keywords and project documentation. For a specialist contractor in a competitive sector, that increase represented a meaningful expansion of the project enquiry pipeline.</p>
                <p className="text-font19 text-[#77787B] mb-[16px]"> The consistent finding across built environment clients: the gap between current performance and potential is almost always larger than expected - and faster to close than most companies assume.</p>
              </div>

                <div>
                <h2 className="title-65 mb-5 lg:mb-[40px] pt-7 lg:pt-[50px] 2xl:pt-[110px]" id="content1"> Where to Start: A Practical Digital Audit for Built Environment Companies </h2>
                <p className="text-font19 text-[#77787B] mb-[16px]">
                  Any business development director or marketing manager at a construction company can run this five-question audit in under ten minutes.
                </p>
                <ol className="list-disc pl-10 mt-3 mb-[24px]">
                  <li className="text-font19 mb-2">
                    <strong>Search visibility:</strong> Can your company be found on page one of Google when you search for your core service and location, for example 'general contractor Dubai' or 'MEP contractor Abu Dhabi'? If not, every potential client running that search is being directed to a competitor.
                  </li>
                  <li className="text-font19 mb-2">
                    <strong>Homepage clarity:</strong> When a client lands on your homepage, can they identify your services, locations served, and sector specialisations within ten seconds? If they cannot, most will leave without exploring further.
                  </li>
                  <li className="text-font19 mb-2">
                    <strong>Project portfolio:</strong> Does your project portfolio include scope, scale, client type, and outcome descriptions, or just photographs? Photographs without context do not build procurement confidence.
                  </li>
                  <li className="text-font19 mb-2">
                    <strong>Accreditation visibility:</strong> Are your accreditations and certifications including ISO, CIOB, RICS, and RERA registration visible on your website? These are procurement signals, not just credentials.
                  </li>
                  <li className="text-font19 mb-2">
                    <strong>Enquiry pathway:</strong> Is there a clear, frictionless enquiry pathway - phone, WhatsApp, email, and an RFQ form on every key page? If a developer has to hunt for contact information, most will not bother.
                  </li>
                </ol>
                <p className="text-font19 text-[#77787B] mb-[16px]">
                  <span className="text-black">GS Digital:</span> GS Digital offers a structured digital audit specifically for built environment companies, identifying exactly where the gaps are and what to prioritise first. The audit covers search visibility, website conversion performance, content authority, and LinkedIn presence - mapped against the procurement journey of your target client type.
                </p>
              </div>
            </div>
            


            {/* never add content below the below closing div tag line */}

          </div>

        </div>
      </div>
    </section>
  );
}

export default HowDigitalMarketingWinsContent;
