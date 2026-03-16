'use client';

import React from 'react';
import Image from 'next/image';
import { assets } from '@/public/assets/assets';
import Link from 'next/link';
const TechnicalSeoEssentials  = () => {
  return (
    <section>
      <div className="container mx-auto py-[50px] lg:py-[50px]">
        <div className="grid grid-cols-1 xl:grid-cols-7 gap-4">
          <div className="col-span-2 mb-5 xl:mb-0"></div>

          <div className="col-span-5 w-full ">
            <p className="text-font19 text-[#77787B] mb-[16px]">In 2026, technical SEO is no longer optional for architecture, engineering, construction (AEC) firms and property brands. It forms the foundation that allows your website to load quickly, be properly indexed, and be clearly understood by both Google and AI-driven search systems.</p>
            <p className="text-font19 text-[#77787B] mb-[16px]">This article focuses on the core technical SEO essentials every built environment website needs: crawlability, indexation, speed, mobile responsiveness, site structure, schema, and security. These are not just error fixes, they directly power discoverability, user experience, qualified project enquiries, and increasingly, citations in AI Overviews and generative answers.</p>
            <p className="text-font19 text-[#77787B] mb-0">Below, you will find a practical checklist showing what to fix first and how these fundamentals support all future SEO and lead generation efforts.</p>


            {/* Title */}
            <h2 className="title-65 mb-5 lg:mb-[40px] pt-7 lg:pt-[50px] 2xl:pt-[110px]" id="content1">
               Why Technical SEO Matters for Built Environment Websites in 2026 
            </h2>

             {/* Paragraphs */}
            <p className="text-font19 text-[#77787B] mb-[16px]">
              Most built environment websites invest heavily in project photography, credentials, and sector expertise. Yet many underperform in search not because the content is weak, but because the underlying website infrastructure is unstable.

            </p>
 

            <Image src={assets.blog_77 } alt="Importance of Technical SEO " className='mb-5 lg:mb-[40px] ' />
            <p className="text-font19 text-[#77787B] mb-[16px]">
In 2026, technical SEO determines whether your architecture firm SEO, construction SEO audit efforts, or <Link className='text-primary' href="/seo-agency-dubai">real estate SEO strategy</Link> can actually deliver returns.
 </p>
            <p className="text-font19 text-[#77787B] mb-[16px]">
              For AEC brands, technical performance affects three commercial realities:     </p>
            <ul className="list-disc pl-10 mt-3 mb-[24px]">
              <li className="text-font19 mb-2"> <b>Ranking stability</b> : Technical weaknesses cause fluctuations, dropped pages, and inconsistent visibility.</li>
<li className="text-font19 mb-2"> <b>User confidence</b> : Slow or broken experiences reduce trust among developers, consultants, and investors.</li>
<li className="text-font19 mb-2"> <b>AI-era interpretation</b> : Structured, technically sound websites are easier for search engines and AI systems to interpret, prioritise and cite. Pages with proper schema and clean structure see up to 30-40% higher visibility in AI-generated answers and summaries.</li>

              
            </ul>
            <p className="text-font19 text-[#77787B] mb-[16px]">Built environment sites are particularly vulnerable. Large image galleries, interactive project filters, embedded PDFs, and heavy scripts often create hidden performance and crawl issues.</p>
          <p className="text-font19 text-[#77787B] mb-[16px]">Without strong AEC technical SEO, even well-written service pages and impressive portfolios struggle to perform consistently. With the right technical setup in place, every marketing effort works more efficiently.</p>
            {/* Sub title */}
            <h2 className="title-65 mb-5 lg:mb-[40px] pt-7 lg:pt-[50px] 2xl:pt-[110px]" id='content2'>
              Site Architecture for AEC: Structuring Services, Projects and Locations Clearly
            </h2>  

            <p className="text-font19 text-[#77787B] mb-[16px]">
              Clear site architecture is one of the most powerful technical SEO levers for AEC websites. It tells Google, AI systems, and users how your services, projects, sectors, and locations connect. When structure is messy or too deep, important pages lose visibility and authority.

            </p>
            <p className="text-font19 text-[#77787B] mb-[16px]">A simple, shallow hierarchy works best. Key pages should ideally be reachable within three to four clicks from the homepage.
</p>
<h3 className="text-30 mt-[30px] mb-3">Recommended structure example:</h3>
             <ul className="list-disc pl-10 mt-3 mb-[24px]">
  <li className="text-font19 mb-2">
    Home → Services → Individual Service
  </li>
  <li className="text-font19 mb-2">
    Home → Sectors → Sector Page
  </li>
  <li className="text-font19 mb-2">
    Home → Projects → Project Detail
  </li>
  <li className="text-font19 mb-2">
    Home → Locations → City → Service
  </li>
</ul>

<p className="text-font19 text-[#77787B] mb-[16px]">
  Each project should have one dedicated URL and sit within a logical hub such as a sector or service category. Service pages should link to relevant case studies, and project pages should link back to related services. This strengthens architecture firm SEO and improves overall AEC technical SEO performance.
</p>

<p className="text-font19 text-[#77787B] mb-[16px]">
  For multi-office construction or property firms, use consistent URL patterns such as:
</p>

<ul className="list-disc pl-10 mt-3 mb-[24px]">
  <li className="text-font19 mb-2">/locations/</li>
  <li className="text-font19 mb-2">/dubai/construction/</li>
  <li className="text-font19 mb-2">/abu-dhabi/architecture/</li>
</ul>

<p className="text-font19 text-[#77787B] mb-[16px]">
  Clear navigation menus, breadcrumb trails, and contextual internal links help both crawlers and real clients move smoothly through the site.
</p>


              {/* -------------------- New Section -------------------- */}

                <h2 className="title-65 mb-5 lg:mb-[40px] pt-7 lg:pt-[50px] 2xl:pt-[110px]" id="content3">
  Speed, Core Web Vitals & Hosting: Keeping Heavy Project Pages Fast
</h2>
 <Image src={assets.blog_78 } alt="Page Speed Insights" className='mb-5 lg:mb-[40px] ' />
            

                <p className="text-font19 text-[#77787B] mb-[16px]">
                 Speed directly affects revenue for AEC brands. Slow, image-heavy project pages reduce enquiries, increase bounce rates, and weaken rankings. In competitive markets, even a few seconds of delay can cost visibility and trust.
                </p> 

                <h3 className="text-30 mt-[30px] mb-3">
                 Built environment websites are naturally heavy because they include:
                </h3> 

                <ul className="list-disc pl-10 mt-3 mb-[24px]">
                    <li className="text-font19 mb-2">Large project photography and renders </li>
                  <li className="text-font19 mb-2">
  Technical drawings and PDFs </li>
                  <li className="text-font19 mb-2"> 
  Sliders, maps, and animations </li>
                  <li className="text-font19 mb-2"> 
  Filtering systems for projects and sectors</li>
                </ul>

                <p className="text-font19 text-[#77787B] mb-[16px]">
                  These elements often affect Core Web Vitals, such as how quickly the main image loads and whether the layout jumps around while loading.
                </p><p className="text-font19 text-[#77787B] mb-[16px]">
In 2026, the three Core Web Vitals remain LCP (Largest Contentful Paint), CLS (Cumulative Layout Shift), and INP (Interaction to Next Paint), with INP now the dominant interactivity metric since it fully replaced FID in 2024.
                </p>

 <h3 className="text-30 mt-[30px] mb-3">
                 Practical front-end improvements include:
                </h3> 
                  <ul className="list-disc pl-10 mt-3 mb-[24px]">
                    <li className="text-font19 mb-2">Compressing and resizing images before upload</li> 
                    <li className="text-font19 mb-2">Using modern formats like WebP or AVIF</li>  
                    <li className="text-font19 mb-2">Lazy-loading non-critical images and videos</li>  
                    <li className="text-font19 mb-2">Defining image dimensions to prevent layout shifts</li> 
                    <li className="text-font19 mb-2">Reducing unnecessary sliders and third-party scripts</li> 
                     <li className="text-font19 mb-2">Debouncing or throttling JavaScript events on interactive elements (e.g., project filters, map zooms) to keep INP under 200 ms (Google’s “good” threshold).</li> 
                    
                    </ul>

                <p className="text-font19 text-[#77787B] mb-[16px]">
                 Check your site speed regularly using tools like PageSpeed Insights or Lighthouse to see where delays are happening. Compare key project and service pages, not just the homepage, and track improvements over time.    </p>
      <h3 className="text-30 mt-[30px] mb-3"> Target benchmarks for AEC sites in 2026: </h3> 
                  <ul className="list-disc pl-10 mt-3 mb-[24px]">
                    <li className="text-font19 mb-2"> LCP &lt; 2.5 seconds (many heavy portfolio pages still average 4–6 s)</li>
                    <li className="text-font19 mb-2"> CLS &lt; 0.1</li> 
                    <li className="text-font19 mb-2"> INP ≤ 200 ms </li> 
                    
                    </ul>

                <p className="text-font19 text-[#77787B] mb-[16px]">If image and layout fixes do not fully solve the issue, the problem may be your hosting. Slow servers or shared hosting plans often limit performance. Upgrading hosting, enabling caching, and using a content delivery network can make pages load noticeably faster. </p>
                         
                <p className="text-font19 text-[#77787B] mb-[16px]">Faster pages mean fewer users drop off, more visitors explore your projects, and stronger overall visibility in search.</p>
{/* -------------------- How to Structure Content Section -------------------- */}

                 <h2 className="title-65 mb-5 lg:mb-[40px] pt-7 lg:pt-[50px] 2xl:pt-[110px]" id='content4'>
                   Mobile-First and UX Basics for Architecture, Construction and Property Sites
                </h2>

                <p className="text-font19 text-[#77787B] mb-[16px]">Most visitors now experience architecture, construction and property websites on mobile devices first. That makes mobile usability a ranking factor and a lead-generation factor, not just a design preference.
                  </p>

                <p className="text-font19 text-[#77787B] mb-[16px]">
                  Mobile-first design simply means building for the smallest screen first, then scaling up for desktop. This is especially important for on-the-go searches like “contractor near me” or “architect in Dubai,” where users expect quick answers and easy contact options.</p>

                <h3 className="text-30 mt-[30px] mb-3">
                 Key mobile UX basics for AEC websites include:
                </h3> 

                <ul className="list-disc pl-10 mt-3 mb-[24px]">
                  <li className="text-font19 mb-2">	Clear, readable typography without zooming</li>
                  <li className="text-font19 mb-2">
	Simple navigation with minimal dropdown complexity</li>
                  <li className="text-font19 mb-2">
Visible contact options such as click-to-call, WhatsApp, and short enquiry forms</li>
<li className="text-font19 mb-2">
Tap-friendly buttons and clearly spaced elements</li>
<li className="text-font19 mb-2">
Progressive enhancement for advanced embeds like BIM viewers, 3D renders, or digital twin previews so they degrade gracefully on mobile without killing load times.
</li>
                </ul>

                <p className="text-font19 text-[#77787B] mb-[16px]">
                  Project portfolios must also work well on mobile. Use vertical layouts, swipeable galleries, concise project summaries near the top, and optimised images that load quickly.
  </p>

                <p className="text-font19 text-[#77787B] mb-[16px]">
                 Good mobile experience supports mobile-first indexing and improves engagement signals such as time on site and bounce rate. A truly mobile-friendly architecture website increases both visibility and the chances of turning visits into project enquiries.

                </p>

                 <h2 className="title-65 mb-5 lg:mb-[40px] pt-7 lg:pt-[50px] 2xl:pt-[110px]" id='content5'>
                 Structured Data & Schema: Helping Search & AI Understand Your Content
                </h2>

                <p className="text-font19 text-[#77787B] mb-[16px]">
                 Structure data, also known as schema markup, gives search engines and AI systems clear signals about what your pages represent. Instead of guessing whether a page is a service, a project, a blog, or a location, schema tells them directly.
                </p>
                <p className="text-font19 text-[#77787B] mb-[16px]">In simple terms, structured data is a small piece of code added behind the scenes of a webpage. It does not change what users see. It helps Google and AI systems understand your content more accurately.</p>
            <p className="text-font19 text-[#77787B] mb-[16px]">The most commonly recommended format is JSON-LD. Think of JSON-LD as a structured label attached to your page. It clearly defines your business name, services, projects, and locations in a format machines can read easily.
            </p>

                <h3 className="text-30 mt-[30px] mb-3">Priority Schema Types for Built Environment Brands
                </h3>
 <div className="overflow-x-auto mb-3 lg:mb-[24px]">
                  <table className="w-full border-collapse">
                    <thead>
                      <tr>
                        <th className="border-b border-gray-300 text-left py-3 px-0 lg:px-4">Schema Type</th>
                        <th className="border-b border-gray-300 text-left py-3 px-0 lg:px-4">
	AEC Use Case	</th>
                        <th className="border-b border-gray-300 text-left py-3 px-0 lg:px-4">
 Why It Wins in 2026</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td className="border-b py-3 px-0 lg:px-4">LocalBusiness / Organization</td>
                        <td className="border-b py-3 px-0 lg:px-4"> Office pages, multi-location firms.</td>
                        <td className="border-b py-3 px-0 lg:px-4"> Entity recognition + Knowledge Graph</td>
                      </tr>
                      <tr>
                        <td className="border-b py-3 px-0 lg:px-4">Service</td>
                        <td className="border-b py-3 px-0 lg:px-4">MEP, architecture service pages.</td>
                        <td className="border-b py-3 px-0 lg:px-4">Intent matching for commercial queries.</td>
                      </tr>
                      <tr>
                        <td className="border-b py-3 px-0 lg:px-4">Project</td>
                        <td className="border-b py-3 px-0 lg:px-4">Case study and portfolio pages</td>
                        <td className="border-b py-3 px-0 lg:px-4">Rich results + AI citation boost</td>
                      </tr>
                      <tr>
                        <td className="border-b py-3 px-0 lg:px-4">BreadcrumbList</td>
                        <td className="border-b py-3 px-0 lg:px-4">All hub → detail navigation</td>
                        <td className="border-b py-3 px-0 lg:px-4">Direct AI Overview eligibility</td>
                      </tr>
                      <tr>
                        <td className="py-3 px-0 lg:px-4">FAQPage</td>
                        <td className="py-3 px-0 lg:px-4">Service FAQs such as “Construction SEO audit cost?”</td>
                        <td className="py-3 px-0 lg:px-4">Direct AI Overview eligibility</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                 <h3 className="text-30 mt-[30px] mb-3">
                 Where Each Should Live
                </h3>
                <ul className="list-disc pl-10 mt-3 mb-[24px]">
                  <li className="text-font19 mb-2"><b>LocalBusiness / Organization </b>: Add to contact and location pages.</li> 
                  <li className="text-font19 mb-2"><b>Service </b>: Apply to individual architecture, engineering, and construction service pages.</li> 
                  <li className="text-font19 mb-2"><b>Project or Article </b>: Use on detailed case studies and blog posts.</li> 
                  <li className="text-font19 mb-2"><b>FAQPage or HowTo </b>: Apply to guide-style or advisory content.</li> 
                  <li className="text-font19 mb-2"><b>BreadcrumbList </b>: Implement site-wide for better crawl understanding.</li> 
                </ul>

                <p className="text-font19 text-[#77787B] mb-[16px]"> For real estate technical SEO or property websites, location-based schema and listing-related markup (such as Offer schema) further strengthen clarity.
                </p>

                <h3 className="text-30 mt-[30px] mb-3">
                 Why Schema Matters in 2026
                </h3>  <p className="text-font19 text-[#77787B] mb-[16px]">
                  Structured data supports:
                </p>
 <ul className="list-disc pl-10 mt-3 mb-[24px]">
                  <li className="text-font19 mb-2">Rich results in search</li> 
                  <li className="text-font19 mb-2">
Clear entity recognition (your brand, services, and offices) </li> 
                  <li className="text-font19 mb-2">
Better AI interpretation in answer engines. Pages with valid schema see 30-40% higher visibility and citation rates in AI-generated summaries and overviews.
 </li> 
                  <li className="text-font19 mb-2"> Stronger trust through consistent business information
</li>  
                </ul>
                <p className="text-font19 text-[#77787B] mb-[16px]">
                  Always validate your markup using Google’s Rich Results Test or Schema validation tools, and update it whenever services, offices, or key offerings change.
                </p>

               
                {/* -------------------- E-E-A-T Section -------------------- */}

                <h2 className="title-65 mb-5 lg:mb-[40px] pt-7 lg:pt-[50px] 2xl:pt-[110px]" id='content6'>
                  Common Technical SEO Issues on Built Environment Websites (and How to Fix Them)
                </h2>

                <Image src={assets.blog_75} alt="GSC Errors" className="mb-5 lg:mb-[30px]" />

                <p className="text-font19 text-[#77787B] mb-[16px]">
                   Many architecture, construction, and property websites struggle not because of weak branding, but because of hidden technical SEO issues. Below are the most common problems seen during a construction SEO audit, along with simple fixes teams can brief to developers.
                </p>
 

               <h3 className="text-30 mt-[30px] mb-3"> 
  1. Crawl and Index Problems
</h3> 

<ul className="list-disc pl-10 mt-3 mb-[24px]">
  <li className="text-font19 mb-2">Important pages blocked by robots.txt</li>
  <li className="text-font19 mb-2">“No index” tags accidentally applied to service or project pages</li>
  <li className="text-font19 mb-2">Broken internal links</li>
  <li className="text-font19 mb-2">Missing or outdated XML sitemaps</li> 
</ul>

<h3 className="text-30 mt-[30px] mb-3"> 
  Fix:
</h3> 

<p className="text-font19 text-[#77787B] mb-[16px]">
  Run regular checks in Google Search Console. Ensure key service, project, and location pages are indexable and included in a clean XML sitemap.
</p>
<h3 className="text-30 mt-[30px] mb-3"> 
  2. Duplicate or Thin Content
</h3> 

<ul className="list-disc pl-10 mt-3 mb-[24px]">
  <li className="text-font19 mb-2">Near-identical service pages across cities</li>
  <li className="text-font19 mb-2">Repeated project descriptions</li>
  <li className="text-font19 mb-2">Multiple URLs for the same page</li> 
</ul>

<h3 className="text-30 mt-[30px] mb-3"> 
  Fix:
</h3> 

<p className="text-font19 text-[#77787B] mb-[16px]">
  Consolidate similar pages, use canonical tags correctly, and <Link className='text-primary' href="/creative-copywriting-agency-dubai">enrich thin pages with more detailed, unique content</Link>.
</p>

<h3 className="text-30 mt-[30px] mb-3"> 
  3. Slow, Image-Heavy Pages
</h3> 

<ul className="list-disc pl-10 mt-3 mb-[24px]">
  <li className="text-font19 mb-2">Large, uncompressed project images</li>
  <li className="text-font19 mb-2">Excessive sliders and scripts</li>
  <li className="text-font19 mb-2">Poor server response times</li> 
</ul>

<h3 className="text-30 mt-[30px] mb-3"> 
  Fix:
</h3> 

<p className="text-font19 text-[#77787B] mb-[16px]">
  Compress images, simplify layouts, enable caching, and review hosting infrastructure if performance issues persist.
</p>


<h3 className="text-30 mt-[30px] mb-3"> 
  4. Mobile and UX Issues
</h3> 

<ul className="list-disc pl-10 mt-3 mb-[24px]">
  <li className="text-font19 mb-2">Non-responsive layouts</li>
  <li className="text-font19 mb-2">Tiny tap targets</li>
  <li className="text-font19 mb-2">Hidden or hard-to-find contact buttons</li> 
</ul>

<h3 className="text-30 mt-[30px] mb-3"> 
  Fix:
</h3> 

<p className="text-font19 text-[#77787B] mb-[16px]">
  Ensure <Link className='text-primary' href="/web-design-agency-dubai">responsive design</Link>, clear CTAs, and simple navigation.
</p>


<h3 className="text-30 mt-[30px] mb-3"> 
  5. Interactivity Bottlenecks (INP failures)
</h3> 

<ul className="list-disc pl-10 mt-3 mb-[24px]">
  <li className="text-font19 mb-2">Unoptimized filters, maps, or gallery clicks</li>
  <li className="text-font19 mb-2">Heavy JavaScript blocking main thread</li> 
</ul>

<h3 className="text-30 mt-[30px] mb-3"> 
  Fix:
</h3> 

<p className="text-font19 text-[#77787B] mb-[16px]">
  Debounce events, lazy-load interactive scripts, and monitor INP in Search Console. </p>
  <p className="text-font19 text-[#77787B] mb-[16px]">Quarterly technical audits help identify these construction company website SEO issues before they quietly reduce rankings and project enquiries.
</p>

            
                {/* -------------------- Measure AI Visibility -------------------- */}

                <h2 className="title-65 mb-5 lg:mb-[40px] pt-7 lg:pt-[50px] 2xl:pt-[110px]" id='content7'>
                  A Simple Technical SEO Health Checklist for Your AEC Website
                </h2>
  <Image src={assets.blog_73} alt="Technical SEO Checklist" className='mb-5 lg:mb-[40px] '/>
           
                <p className="text-font19 text-[#77787B] mb-[16px]">
                  Before investing heavily in new content or campaigns, your architecture, construction, or property website should pass a basic technical health check. Think of this as a routine inspection to confirm your site is fit for 2026 and ready to support deeper SEO work.  </p>

                <p className="text-font19 text-[#77787B] mb-[16px]">
              Use this checklist as a starting point:   </p>
 

                <h3 className="text-30 mt-7 mb-3">Crawlability and Indexation</h3>

<ul className="list-disc pl-10 mt-3 mb-[24px]">
  <li className="text-font19 mb-2">Robots.txt is not blocking key service or project pages</li> 
  <li className="text-font19 mb-2">No accidental noindex tags on revenue-driving pages</li> 
  <li className="text-font19 mb-2">XML sitemap is clean and submitted in Google Search Console</li> 
  <li className="text-font19 mb-2">Key pages are actually indexed and appearing in search</li> 
</ul>

<h3 className="text-30 mt-7 mb-3">Site Security and Clean URLs</h3>

<ul className="list-disc pl-10 mt-3 mb-[24px]">
  <li className="text-font19 mb-2">HTTPS is active across all pages</li> 
  <li className="text-font19 mb-2">No mixed content warnings</li> 
  <li className="text-font19 mb-2">Clear redirects (no redirect chains)</li> 
  <li className="text-font19 mb-2">One preferred version of each important page (correct canonicals)</li> 
</ul>

<h3 className="text-30 mt-7 mb-3">Performance and Experience</h3>

<ul className="list-disc pl-10 mt-3 mb-[24px]">
  <li className="text-font19 mb-2">Pages load quickly on desktop and mobile</li> 
  <li className="text-font19 mb-2">LCP &lt; 2.5 s, CLS &lt; 0.1, INP ≤ 200 ms on project and service pages</li> 
  <li className="text-font19 mb-2">No broken internal links</li> 
  <li className="text-font19 mb-2">Mobile layout works properly</li> 
  <li className="text-font19 mb-2">Clear 404 page for removed content</li> 
</ul>

<h3 className="text-30 mt-7 mb-3">Structure and Clarity</h3>

<ul className="list-disc pl-10 mt-3 mb-[24px]">
  <li className="text-font19 mb-2">Logical site architecture</li> 
  <li className="text-font19 mb-2">Basic + advanced schema in place (Organization/LocalBusiness, Service, Project, BreadcrumbList, FAQ)</li> 
  <li className="text-font19 mb-2">Consistent titles and meta descriptions</li> 
</ul>

<h3 className="text-30 mt-7 mb-3">Basic Technical Audit Tools</h3>

<ul className="list-disc pl-10 mt-3 mb-[24px]">
  <li className="text-font19 mb-2">PageSpeed Insights for speed checks</li> 
  <li className="text-font19 mb-2">Google Search Console Coverage for crawl errors</li> 
  <li className="text-font19 mb-2">Mobile-Friendly Test for responsiveness</li> 
  <li className="text-font19 mb-2">Screaming Frog for internal link audits</li> 
  <li className="text-font19 mb-2">Rich Results Test + Schema Markup Validator for AI-readiness</li> 
</ul>

                <p className="text-font19 text-[#77787B] mb-[16px]">
               Run this checklist at least twice a year and log improvements to track progress over time.  </p>
 <h2 className="title-65 mb-5 lg:mb-[40px] pt-7 lg:pt-[50px] 2xl:pt-[110px]" id="content8" >
                        Technical SEO Is Now Basic Site Hygiene for AEC Brands
                      </h2>

                <p className="text-font19 text-[#77787B] mb-[16px]">The technical health of your website is no longer a backend concern. It is essential infrastructure for any architecture, engineering, construction, or property brand operating in 2026.</p>

                <p className="text-font19 text-[#77787B] mb-[16px]">When Google and AI systems can easily load, interpret, and understand your services, projects, and locations, your site becomes far easier to surface in search results. Strong technical SEO removes friction, stabilises rankings, and strengthens every future content and demand-generation effort.</p>

                <p className="text-font19 text-[#77787B] mb-[16px]">Treat this checklist like routine maintenance. Review it regularly, fix small issues early, and ensure your digital infrastructure remains strong. In competitive AEC markets, technical strength quietly protects your rankings and safeguards your pipeline.</p>
              
             {/* -------------------- FAQ Section -------------------- */}
<div className="  pb-10 lg:pb-[60px]">

                      <h2 className="title-65 mb-5 lg:mb-[40px] pt-7 lg:pt-[50px] 2xl:pt-[110px]" id='content9'>
                        Frequently Asked Questions
                      </h2>

                      {/* Question 1 */}
                      <p className="font-bold text-30 mt-5 lg:mt-[30px]">
                        1. What are the biggest technical SEO red flags on websites in 2026?
                      </p>

                      <p className="text-font19 text-[#77787B] mb-[16px]"> 
                      Common red flags include blocked or non-indexed service pages, duplicate content, slow project galleries, broken internal links, and poor mobile experience, and failing INP scores on interactive elements. These issues often go unnoticed but quietly reduce visibility and enquiries.
                        </p>

                      {/* Question 2 */}
                      <p className="font-bold text-30 mt-5 lg:mt-[30px]">
                      2.	Why do project gallery pages often fail performance tests?
                      </p>

                      <p className="text-font19 text-[#77787B] mb-[16px]">
Project pages usually contain large, uncompressed images, sliders, PDFs, and heavy scripts. Without proper optimisation, they load slowly and create unstable layouts, which frustrates users and weaken search performance.
   </p>

                      {/* Question 3 */}
                      <p className="font-bold text-30 mt-5 lg:mt-[30px]">
                       3.	What technical fixes most quickly lift rankings for architecture firms?
                      </p>

                      <p className="text-font19 text-[#77787B] mb-[16px]">
Improving page speed (especially LCP and INP), fixing crawl and index errors, cleaning up internal links, and ensuring mobile responsiveness often deliver the fastest gains. Stabilising technical foundations allows existing content to perform better.
  </p>

                      {/* Question 4 */}
                      <p className="font-bold text-30 mt-5 lg:mt-[30px]">
                      4.	How do broken internal links quietly damage AEC SEO performance?
                      </p>

                      <p className="text-font19 text-[#77787B] mb-[16px]">
Broken links waste crawl budget, disrupt user journeys, and reduce authority flow between service and project pages. Over time, this weakens ranking stability and user trust.
 </p>

                      {/* Question 5 */}
                      <p className="font-bold text-30 mt-5 lg:mt-[30px]">
                   5.	Can poor hosting alone ruin technical SEO for property websites?  </p>

                      <p className="text-font19 text-[#77787B]  "> 
Yes. Slow or unreliable hosting can delay page loads, increase downtime, and limit overall performance. Even well-optimised pages struggle if the server infrastructure is weak.
 </p>
</div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TechnicalSeoEssentials ;
