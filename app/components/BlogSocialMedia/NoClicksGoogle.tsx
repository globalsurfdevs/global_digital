"use client";

import React, { useState } from "react";
import Image from "next/image";
import { assets } from "@/public/assets/assets";
import { Collapse } from "react-collapse";
import arrowactive from "@/public/assets/logos/arr-active.svg";
import arrowdown from "@/public/assets/logos/arr-down.svg";

const ClicksGoogle = () => {
  const [open, setOpen] = useState<number | null>(null);

  const toggle = (index: number) => {
    if (open === index) {
      setOpen(null);
    } else {
      setOpen(index);
    }
  };
  return (
    <section>
      <div className="container mx-auto py-[50px] lg:py-[100px]">
        <div className="grid ">
          <div className="col-span-2 mb-5 xl:mb-0"></div>

          <div className="col-span-5 w-full ">
            <p className="mb-[16px] text-font19 text-[#77787B]">
              If your rankings look stable but traffic is falling, the reason is
              simple. Google zero click features and AI Overviews now answer
              many queries directly on the search page.{" "}
            </p>
            <p className="mb-[16px] text-font19 text-[#77787B]">
              For built environment brands, this shift is significant.
              Developers, architects, contractors, and engineering firms have
              long relied on search visibility to generate project enquiries.
              When users stop clicking, lead opportunities shrink.{" "}
            </p>
            <p className="mb-0 text-font19 text-[#77787B]">
              Today, success is not just about ranking. It is about being
              referenced inside AI generated summaries. This guide explains how
              built environment brands can adapt and stay visible in an AI led
              search environment.{" "}
            </p>

            {/* Title */}
            <h2
              className="title-65 mb-5 pt-7 lg:mb-[40px] lg:pt-[50px] 2xl:pt-[110px]"
              id="content1"
            >
              How AI Search is Stealing Your Clicks and What is Really Happening
            </h2>

            <Image
              src={assets.morg}
              alt="How zero-click searches reduce website traffic"
              className="mb-5 lg:mb-[40px] "
            />
            {/* Paragraphs */}
            <p className="mb-[16px] text-font19 text-[#77787B]">
              Google is no longer just a list of blue links. It increasingly
              acts like an answer engine.
            </p>

            <p className="mb-0 text-font19 text-[#77787B]">
              When AI Overviews appear, users often see a full summary at the
              top of the page. Even if your website ranks well, fewer people
              feel the need to click.
            </p>
            <h3
              className="title-65 mb-5 pt-7 lg:mb-[40px] lg:pt-[50px] 2xl:pt-[110px]"
              id="content2"
            >
              What Is a Zero Click Search?
            </h3>

            <Image
              src={assets.zeroclick}
              alt="Google zero-click search result answering a query directly"
              className="mb-5 lg:mb-[40px] "
            />
            <p className="mb-[16px] text-font19 text-[#77787B]">
              A zero click search happens when users get their answer directly
              on Google without visiting a website.{" "}
            </p>
            <p className="mb-[16px] text-font19 text-[#77787B]">
              For example, someone searching for the best facade system for
              coastal high-rise buildings may see:{" "}
            </p>
            <ul className="mb-[24px] mt-3 list-disc pl-10">
              <li className="mb-2 text-font19"> A summary of materials</li>
              <li className="mb-2 text-font19">Performance comparisons</li>
              <li className="mb-2 text-font19">Pros and cons</li>
              <li className="mb-2 text-font19">A few cited sources</li>
            </ul>
            <p className="mb-[16px] text-font19 text-[#77787B]">
              The response combines information from multiple websites into one
              explanation. Many users never visit the original pages.
            </p>
            {/* Sub title */}
            <h3 className="text-30 mb-3 mt-[30px]" id="content3">
              What has Changed?
            </h3>

            <p className="mb-[16px] text-font19 text-[#77787B]">
              Behind the scenes, search platforms now:
            </p>
            <ul className="mb-[24px] mt-3 list-disc pl-10">
              <li className="mb-2 text-font19">
                Scan multiple relevant websites
              </li>
              <li className="mb-2 text-font19">Extract key information</li>
              <li className="mb-2 text-font19">
                Combine it into a structured answer
              </li>
              <li className="mb-2 text-font19">Credit only selected sources</li>
            </ul>
            <p className="mb-[16px] text-font19 text-[#77787B]">
              This changes the competition. Ranking on page one is no longer
              enough. Your content must be selected as a trusted source.{" "}
            </p>
            <p className="mb-[16px] text-font19 text-[#77787B]">
              That is why many built environment brands notice steady rankings
              and impressions but declining clicks. Visibility has shifted from
              links to summaries.
            </p>
            <h2 className="text-30 mb-3 mt-[30px]" id="content4">
              Why Built Environment Brands are Uniquely Exposed in an AI First
              Google
            </h2>
            <p className="mb-[16px] text-font19 text-[#77787B]">
              Built environment projects are complex. They involve long sales
              cycles, multiple decision makers, and detailed technical
              evaluation.
            </p>
            <p className="mb-[16px] text-font19 text-[#77787B]">
              Now buyers increasingly ask full questions instead of short
              keywords. They read one structured summary and move forward.
            </p>
            <p className="mb-[16px] text-font19 text-[#77787B]">
              Examples include:
            </p>
            <ul className="mb-[24px] mt-3 list-disc pl-10">
              <li className="mb-2 text-font19">
                What is the most durable roofing system for coastal industrial
                facilities?
              </li>
              <li className="mb-2 text-font19">
                Which construction methods reduce lifecycle costs?
              </li>
              <li className="mb-2 text-font19">
                Who are experienced architects for sustainable mixed-use
                developments?
              </li>
            </ul>

            <p className="mt-4 text-font19 text-[#77787B]">
              Instead of reviewing several websites, buyers rely on a single
              consolidated response.
            </p>
            <p className="mt-4 text-font19 text-[#77787B]">
              This creates three clear risks:
            </p>
            <ul className="mb-[24px] mt-3 list-disc pl-10">
              <li className="mb-2 text-font19">
                Larger brands may be prioritised
              </li>
              <li className="mb-2 text-font19">
                Weak or generic case studies reduce authority
              </li>
              <li className="mb-2 text-font19">
                Poor content structure limits extractability
              </li>
            </ul>
            <p className="mb-0 text-font19 text-[#77787B]">
              Fewer clicks also mean fewer opportunities to educate prospects
              and capture leads directly. If your brand is not mentioned early
              in the research process, you may never enter consideration.
            </p>

            {/* -------------------- New Section -------------------- */}

            <h2
              className="title-65 mb-5 pt-7 lg:mb-[40px] lg:pt-[50px] 2xl:pt-[110px]"
              id="content5"
            >
              Ranking vs References: How Visibility Has Changed
            </h2>

            <p className="mb-[16px] text-font19 text-[#77787B]">
              In traditional SEO, success meant ranking high in organic results.
              Traffic followed position.
            </p>

            <p className="mb-[16px] text-font19 text-[#77787B]">
              In an AI first search environment, visibility works differently.
            </p>

            <p className="mb-[16px] text-font19 text-[#77787B]">
              Today, success depends on whether your content is referenced
              inside summaries that influence decisions. If your company is not
              mentioned, you may remain unseen, even if you rank well.
            </p>

            <h3 className="text-30 mb-3 mt-[30px]">
              The Shift from Ranking to References
            </h3>

            <div className="mb-3 overflow-x-auto lg:mb-[24px] ">
              <table className="min-w-full divide-y divide-gray-200 overflow-x-auto border border-gray-200  ">
                <thead className="bg-[#F2F2F2]">
                  <tr>
                    <th
                      className={`text-dark border-r border-gray-200 px-6 py-3 text-left text-font19 font-medium tracking-wider last:border-r-0  `}
                    >
                      Traditional SEO
                    </th>
                    <th
                      className={`text-dark border-r border-gray-200 px-6 py-3 text-left text-font19 font-medium tracking-wider last:border-r-0  `}
                    >
                      AI First Search
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 bg-white">
                  <tr>
                    <td
                      className={`border-r border-gray-200 px-6 py-4 align-top last:border-r-0 `}
                    >
                      <div className="text-font19 text-[#77787B]">
                        Focus on keyword rankings
                      </div>
                    </td>
                    <td
                      className={`border-r border-gray-200 px-6 py-4 align-top last:border-r-0 `}
                    >
                      <div className="text-font19 text-[#77787B]">
                        Focus on brand mentions in AI answers
                      </div>
                    </td>
                  </tr>
                  <tr>
                    <td
                      className={`border-r border-gray-200 px-6 py-4 align-top last:border-r-0 `}
                    >
                      <div className="text-font19 text-[#77787B]">
                        Measure organic position
                      </div>
                    </td>
                    <td
                      className={`border-r border-gray-200 px-6 py-4 align-top last:border-r-0 `}
                    >
                      <div className="text-font19 text-[#77787B]">
                        Measure citation frequency
                      </div>
                    </td>
                  </tr>
                  <tr>
                    <td
                      className={`border-r border-gray-200 px-6 py-4 align-top last:border-r-0 `}
                    >
                      <div className="text-font19 text-[#77787B]">
                        Compete for clicks
                      </div>
                    </td>
                    <td
                      className={`border-r border-gray-200 px-6 py-4 align-top last:border-r-0 `}
                    >
                      <div className="text-font19 text-[#77787B]">
                        Compete to be referenced
                      </div>
                    </td>
                  </tr>
                  <tr>
                    <td
                      className={`border-r border-gray-200 px-6 py-4 align-top last:border-r-0 `}
                    >
                      <div className="text-font19 text-[#77787B]">
                        Visibility = Traffic
                      </div>
                    </td>
                    <td
                      className={`border-r border-gray-200 px-6 py-4 align-top last:border-r-0 `}
                    >
                      <div className="text-font19 text-[#77787B]">
                        Visibility = Mentions & Inclusion
                      </div>
                    </td>
                  </tr>
                  <tr>
                    <td
                      className={`border-r border-gray-200 px-6 py-4 align-top last:border-r-0 `}
                    >
                      <div className="text-font19 text-[#77787B]">
                        Blue links shape decisions
                      </div>
                    </td>
                    <td
                      className={`border-r border-gray-200 px-6 py-4 align-top last:border-r-0 `}
                    >
                      <div className="text-font19 text-[#77787B]">
                        AI summaries shape decisions
                      </div>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>

            <p className="mb-[16px] text-font19 text-[#77787B]">
              In simple terms, AI search visibility refers to how often and how
              accurately your brand appears inside AI generated answers across
              platforms such as:
            </p>

            <ul className="mb-[24px] mt-3 list-disc pl-10">
              <li className="mb-2 text-font19">Google AI Overviews</li>
              <li className="mb-2 text-font19">ChatGPT</li>
              <li className="mb-2 text-font19">Gemini</li>
              <li className="mb-2 text-font19">Perplexity</li>
            </ul>

            <p className="mb-[16px] text-font19 text-[#77787B]">
              Instead of only tracking keywords and positions, built environment
              brands now need to monitor:
            </p>

            <ul className="mb-[24px] mt-3 list-disc pl-10">
              <li className="mb-2 text-font19">
                Brand mentions in AI overviews
              </li>
              <li className="mb-2 text-font19">
                How often your pages are cited or linked
              </li>
              <li className="mb-2 text-font19">
                Share of voice compared to competitors
              </li>
              <li className="mb-2 text-font19">
                The way AI describes your expertise
              </li>
            </ul>

            <p className="mb-[16px] text-font19 text-[#77787B]">
              For real estate digital marketing, AI search optimization for
              construction, and broader built environment marketing, winning
              means your case studies, technical guides, and specifications are
              the sources AI engines trust and reference when users ask detailed
              project questions.
            </p>
            <p className="mb-0 text-font19 text-[#77787B]">
              Even without a click, your brand influences the decision. That is
              the new definition of visibility.
            </p>
            {/* -------------------- How to Structure Content Section -------------------- */}

            <h2
              className="title-65 mb-5 pt-7 lg:mb-[40px] lg:pt-[50px] 2xl:pt-[110px]"
              id="content6"
            >
              How to Structure Content That AI Overviews Actually Cite
            </h2>

            <p className="mb-[16px] text-font19 text-[#77787B]">
              Understanding the shift is one thing. Structuring your content to
              be selected is another.
            </p>

            <p className="mb-[16px] text-font19 text-[#77787B]">
              Answer engines favour clarity, structure, and authority. If your
              pages are vague or poorly organised, they are less likely to be
              referenced.
            </p>

            <h3 className="text-30 mb-3 mt-[30px]">
              1. Put the Direct Answer First
            </h3>

            <p className="mb-[16px] text-font19 text-[#77787B]">
              AI prefers clarity.
            </p>

            <p className="mb-[16px] text-font19 text-[#77787B]">
              Use an inverted pyramid structure:
            </p>

            <ul className="mb-[24px] mt-3 list-disc pl-10">
              <li className="mb-2 text-font19">
                Begin with a clear, concise answer
              </li>
              <li className="mb-2 text-font19">
                Follow with supporting explanation
              </li>
              <li className="mb-2 text-font19">
                Add data, examples, and case studies
              </li>
            </ul>

            <p className="mb-[16px] text-font19 text-[#77787B]">
              For example, if the topic is “What is the best facade system for
              high rise buildings?”, begin with a direct explanation before
              diving into technical depth.
            </p>

            <p className="mb-[16px] text-font19 text-[#77787B]">
              Avoid long introductions that delay the answer.
            </p>

            <h3 className="text-30 mb-3 mt-[30px]">
              2. Use Question Led Headings
            </h3>

            <p className="mb-[16px] text-font19 text-[#77787B]">
              Headings should mirror real buyer queries. Question based headings
              align better with conversational search behaviour and improve
              extractability.
            </p>

            <h3 className="text-30 mb-3 mt-[30px]">
              3. Keep Information Modular and Easy to Extract
            </h3>

            <ul className="mb-[24px] mt-3 list-disc pl-10">
              <li className="mb-2 text-font19">
                Short paragraphs focused on one idea
              </li>
              <li className="mb-2 text-font19">
                Limited bullet points for clarity
              </li>
              <li className="mb-2 text-font19">
                Comparison tables for technical topics
              </li>
              <li className="mb-2 text-font19">
                Clear definitions where necessary
              </li>
            </ul>

            <p className="mb-[16px] text-font19 text-[#77787B]">
              The clearer the structure, the easier it is to summarise.
            </p>

            <h3 className="text-30 mb-3 mt-[30px]">
              4. Add FAQs for Niche, High Intent Questions
            </h3>

            <p className="mb-[16px] text-font19 text-[#77787B]">
              FAQ sections are extremely powerful in an AI led environment.
            </p>

            <p className="mb-[16px] text-font19 text-[#77787B]">They:</p>

            <ul className="mb-[24px] mt-3 list-disc pl-10">
              <li className="mb-2 text-font19">
                Reflect natural language queries
              </li>
              <li className="mb-2 text-font19">
                Provide concise, extractable answers
              </li>
              <li className="mb-2 text-font19">
                Improve your chances of appearing in AI Overviews traffic
              </li>
            </ul>

            <p className="mb-[16px] text-font19 text-[#77787B]">
              For built environment marketing, FAQs should address specific
              technical and commercial concerns, not generic questions.
            </p>

            <h3 className="text-30 mb-3 mt-[30px]">
              5. Support Structure with Semantic and Technical Signals
            </h3>

            <p className="mb-[16px] text-font19 text-[#77787B]">
              Content structure alone is not enough. You also need:
            </p>

            <ul className="mb-[24px] mt-3 list-disc pl-10">
              <li className="mb-2 text-font19">
                Internal links connecting related topics into clusters
              </li>
              <li className="mb-2 text-font19">
                Clear topical authority around methods, materials, and project
                types
              </li>
              <li className="mb-2 text-font19">
                Structured data such as FAQ Page, How To, Article, or Product
                schema
              </li>
            </ul>

            <p className="mb-[16px] text-font19 text-[#77787B]">
              These signals help search engines and AI systems understand your
              expertise and context.
            </p>

            <p className="mb-[16px] text-font19 text-[#77787B]">
              Finally, always reinforce authority.
            </p>

            <p className="mb-[16px] text-font19 text-[#77787B]">Include:</p>

            <ul className="mb-[24px] mt-3 list-disc pl-10">
              <li className="mb-2 text-font19">
                Named authors with relevant expertise
              </li>
              <li className="mb-2 text-font19">Real project examples</li>
              <li className="mb-2 text-font19">
                Data points and measurable outcomes
              </li>
              <li className="mb-2 text-font19">
                Clear attribution and references
              </li>
            </ul>

            <p className="mb-[16px] text-font19 text-[#77787B]">
              AI systems are more likely to cite brands that appear trustworthy,
              specialised, and technically credible.
            </p>

            <p className="mb-0 text-font19 text-[#77787B]">
              The goal is not just to rank. It is to be trusted and referenced.
            </p>

            {/* -------------------- E-E-A-T Section -------------------- */}

            <h2
              className="title-65 mb-5 pt-7 lg:mb-[40px] lg:pt-[50px] 2xl:pt-[110px]"
              id="content7"
            >
              How to Build E-E-A-T for AI Trust and Citations
            </h2>

            <Image
              src={assets.eeatseo}
              alt="E-E-A-T trust signals that influence AI search citations"
              className="mb-5 lg:mb-[30px]"
            />

            <p className="mb-[16px] text-font19 text-[#77787B]">
              Search platforms evaluate credibility before selecting sources.
            </p>

            <p className="mb-[16px] text-font19 text-[#77787B]">
              Experience, Expertise, Authoritativeness, and Trust increase the
              likelihood of being referenced.
            </p>

            <p className="mb-[16px] text-font19 text-[#77787B]">
              In an AI first search environment, strong E E A T is not optional.
              It directly influences whether your brand is considered a safe
              source to reference.
            </p>

            <h3 className="text-30 mb-3 mt-[30px]">
              On Page E E A T Signals to Strengthen
            </h3>

            <p className="mb-[16px] text-font19 text-[#77787B]">
              Built environment brands should ensure every important page
              includes:
            </p>

            <ul className="mb-[24px] mt-3 list-disc pl-10">
              <li className="mb-2 text-font19">
                Clear author attribution with relevant credentials
              </li>
              <li className="mb-2 text-font19">
                Real project examples with measurable outcomes
              </li>
              <li className="mb-2 text-font19">
                Technical depth, not surface level explanations
              </li>
              <li className="mb-2 text-font19">
                Data points, standards, and regulatory references where relevant
              </li>
              <li className="mb-2 text-font19">
                Updated publication or review dates
              </li>
            </ul>

            <p className="mb-[16px] text-font19 text-[#77787B]">
              For example, a construction methodology guide should demonstrate
              real world experience, not just theory. AI systems look for
              evidence of applied expertise.
            </p>

            <h3 className="text-30 mb-3 mt-[30px]">
              Site Wide Trust Signals That Matter
            </h3>

            <p className="mb-[16px] text-font19 text-[#77787B]">
              Beyond individual pages, your entire website should reinforce
              credibility.
            </p>

            <p className="mb-[16px] text-font19 text-[#77787B]">
              Key trust elements include:
            </p>

            <ul className="mb-[24px] mt-3 list-disc pl-10">
              <li className="mb-2 text-font19">
                A detailed About page explaining your expertise and history
              </li>
              <li className="mb-2 text-font19">
                Clear contact information and office locations
              </li>
              <li className="mb-2 text-font19">
                Transparent privacy and policy pages
              </li>
              <li className="mb-2 text-font19">
                Testimonials, reviews, or client case studies
              </li>
              <li className="mb-2 text-font19">
                Consistent branding and positioning within your niche
              </li>
            </ul>

            <p className="mb-[16px] text-font19 text-[#77787B]">
              If your website appears incomplete or generic, it may be
              deprioritised in favour of stronger sources.
            </p>

            <p className="mb-0 text-font19 text-[#77787B]">
              The objective is simple. Every key page should read like a
              reliable, expert answer.
            </p>

            {/* -------------------- Measure AI Visibility -------------------- */}

            <h2
              className="title-65 mb-5 pt-7 lg:mb-[40px] lg:pt-[50px] 2xl:pt-[110px]"
              id="content8"
            >
              How to Measure AI Search Visibility
            </h2>
            <Image
              src={assets.meassuringav}
              alt="Tracking mentions across AI search platform"
              className="mb-5 lg:mb-[40px] "
            />

            <p className="mb-[16px] text-font19 text-[#77787B]">
              Traditional SEO reporting focuses on rankings, clicks, and
              sessions. But in an AI led search environment, those numbers no
              longer tell the full story.
            </p>

            <p className="mb-[16px] text-font19 text-[#77787B]">
              Built environment brands now need to measure something different:
              how often they appear inside AI generated answers.
            </p>

            <p className="mb-[16px] text-font19 text-[#77787B]">
              This is where AI search presence becomes a new performance metric.
            </p>

            <h3 className="text-30 mb-3 mt-7">What Should You Be Tracking?</h3>

            <ul className="mb-[24px] mt-3 list-disc pl-10">
              <li className="mb-2 text-font19">
                Brand mentions across AI platforms
              </li>
              <li className="mb-2 text-font19">Citation frequency</li>
              <li className="mb-2 text-font19">
                Share of voice versus competitors
              </li>
              <li className="mb-2 text-font19">
                Accuracy and sentiment of descriptions
              </li>
              <li className="mb-2 text-font19">
                Coverage across buyer journey stages
              </li>
            </ul>

            <p className="mb-[16px] text-font19 text-[#77787B]">
              For example, if users ask about sustainable construction methods,
              are you cited? If they ask about mixed use development specialists
              in your region, does your name appear?
            </p>

            <h3 className="text-30 mb-3 mt-[30px]">
              Practical Ways to Measure AI Visibility
            </h3>
            <p className="mb-[16px] text-font19 text-[#77787B]">
              You can approach this in two ways:
            </p>
            <h4 className="mb-2 mt-[20px] text-font19 font-semibold">
              1. Manual Prompt Testing
            </h4>

            <ul className="mb-[24px] mt-3 list-disc pl-10">
              <li className="mb-2 text-font19">
                Whether your brand is mentioned
              </li>
              <li className="mb-2 text-font19">
                Whether competitors are referenced
              </li>
              <li className="mb-2 text-font19">
                The context and sentiment of the mention
              </li>
            </ul>

            <h4 className="mb-2 mt-[20px] text-font19 font-semibold">
              2. AI Visibility and Monitoring Tools
            </h4>

            <p className="mb-[16px] text-font19 text-[#77787B]">
              Use tools that track brand mentions in AI responses and provide
              visibility comparisons across competitors.
            </p>

            <p className="mb-[16px] text-font19 text-[#77787B]">
              When evaluating AI presence, assess:
            </p>

            <ul className="mb-[24px] mt-3 list-disc pl-10">
              <li className="mb-2 text-font19">
                Direct recommendation versus passing mention
              </li>
              <li className="mb-2 text-font19">
                Technical accuracy of how your brand is described
              </li>
              <li className="mb-2 text-font19">
                Consistency across different AI platforms
              </li>
            </ul>
            {/* -------------------- Business Impact Section -------------------- */}

            <h3 className="text-30 mb-3 mt-[30px]" id="content9">
              Connecting AI Visibility to Business Impact
            </h3>

            <p className="mb-[16px] text-font19 text-[#77787B]">
              AI search metrics must connect back to commercial performance.
            </p>

            <p className="mb-[16px] text-font19 text-[#77787B]">Monitor:</p>

            <ul className="mb-[24px] mt-3 list-disc pl-10">
              <li className="mb-2 text-font19">AI driven referral traffic</li>
              <li className="mb-2 text-font19">
                Increases in branded search volume
              </li>
              <li className="mb-2 text-font19">
                Enquiry quality and conversion rates
              </li>
              <li className="mb-2 text-font19">
                Deal value and project pipeline contribution
              </li>
            </ul>

            <p className="mb-[16px] text-font19 text-[#77787B]">
              If AI search optimization for construction or zero click SEO for
              real estate improves your brand mentions, you should eventually
              see stronger lead quality and better-informed prospects.
            </p>

            <p className="mb-0 text-font19 text-[#77787B]">
              The goal is not to chase mentions for vanity. It is to ensure AI
              visibility feeds real project enquiries and revenue growth.
            </p>

            {/* -------------------- 90 Day Plan -------------------- */}

            <h2
              className="title-65 mb-5 pt-7 lg:mb-[40px] lg:pt-[50px] 2xl:pt-[110px]"
              id="content10"
            >
              A 90-Day Action Plan to Regain Visibility and Leads in an AI-Led
              Search World
            </h2>

            <p className="mb-[16px] text-font19 text-[#77787B]">
              Understanding the shift is important. Acting on it is what
              restores visibility and leads.
            </p>

            <p className="mb-[16px] text-font19 text-[#77787B]">
              Below is a practical 90-day roadmap designed specifically for
              built environment brands that want to improve AI search
              visibility, not just recover lost clicks.
            </p>

            <h3 className="text-30 mb-3 mt-[30px]">
              Days 1 to 30: Fix Access and Define Focus
            </h3>

            <p className="mb-[16px] text-font19 text-[#77787B]">
              Start by ensuring AI systems can properly access and understand
              your content.
            </p>

            <p className="mb-[16px] text-font19 text-[#77787B]">Key actions:</p>

            <ul className="mb-[24px] mt-3 list-disc pl-10">
              <li className="mb-2 text-font19">
                Review robots.txt and XML sitemaps to ensure important pages are
                crawlable
              </li>
              <li className="mb-2 text-font19">
                Implement or review llms.txt if relevant
              </li>
              <li className="mb-2 text-font19">
                Identify 5 to 10 core topics your brand wants to be known for
              </li>
              <li className="mb-2 text-font19">
                Audit existing content to find opportunities to rewrite pages in
                answer first formats
              </li>
            </ul>

            <p className="mb-[16px] text-font19 text-[#77787B]">
              At this stage, the goal is clarity. You cannot win AI search
              visibility if search engines cannot easily access or interpret
              your expertise.
            </p>

            <h3 className="text-30 mb-3 mt-[30px]">
              Days 31 to 60: Restructure and Strengthen Core Pages
            </h3>

            <p className="mb-[16px] text-font19 text-[#77787B]">
              Now move from technical fixes to content transformation.
            </p>

            <p className="mb-[16px] text-font19 text-[#77787B]">Key actions:</p>

            <ul className="mb-[24px] mt-3 list-disc pl-10">
              <li className="mb-2 text-font19">
                Rewrite priority service and solution pages using direct answers
                at the top
              </li>
              <li className="mb-2 text-font19">
                Add FAQ sections targeting niche, high intent queries
              </li>
              <li className="mb-2 text-font19">
                Implement relevant schema such as FAQ Page or Article
              </li>
              <li className="mb-2 text-font19">
                Add project backed proof points, case studies, and measurable
                outcomes
              </li>
              <li className="mb-2 text-font19">
                Build or expand topical clusters around core themes such as
                materials, methods, or project types
              </li>
            </ul>

            <p className="mb-[16px] text-font19 text-[#77787B]">
              This is where zero click SEO for real estate and AI search
              optimization for construction start to take shape. You are
              restructuring your content so AI systems can extract and cite it.
            </p>

            <h3 className="text-30 mb-3 mt-[30px]">
              Days 61 to 90: Measure, Refine, and Expand
            </h3>

            <p className="mb-[16px] text-font19 text-[#77787B]">
              Once improvements are live, begin tracking visibility inside AI
              answers.
            </p>

            <p className="mb-[16px] text-font19 text-[#77787B]">Key actions:</p>

            <ul className="mb-[24px] mt-3 list-disc pl-10">
              <li className="mb-2 text-font19">
                Test priority queries across AI platforms and log brand mentions
              </li>
              <li className="mb-2 text-font19">
                Measure share of voice versus key competitors
              </li>
              <li className="mb-2 text-font19">
                Refine pages that are close to being cited but not yet
                referenced
              </li>
              <li className="mb-2 text-font19">
                Launch one or two new “answer hubs” targeting gaps in AI
                coverage
              </li>
            </ul>

            <p className="mb-[16px] text-font19 text-[#77787B]">
              An answer hub could be a detailed guide such as:
            </p>

            <ul className="mb-[24px] mt-3 list-disc pl-10">
              <li className="mb-2 text-font19">
                Sustainable construction methods for commercial projects
              </li>
              <li className="mb-2 text-font19">
                Cost comparison of façade systems for mixed use developments
              </li>
            </ul>

            <p className="mb-[16px] text-font19 text-[#77787B]">
              The focus during this phase is optimisation, not guesswork.
            </p>

            <h3 className="text-30 mb-3 mt-[30px]">
              Connect the Plan to Pipeline Impact
            </h3>

            <p className="mb-[16px] text-font19 text-[#77787B]">
              Throughout all 90 days, track commercial outcomes alongside AI
              metrics.
            </p>

            <p className="mb-[16px] text-font19 text-[#77787B]">Monitor:</p>

            <ul className="mb-[24px] mt-3 list-disc pl-10">
              <li className="mb-2 text-font19">Enquiry volume and quality</li>
              <li className="mb-2 text-font19">Increases in branded search</li>
              <li className="mb-2 text-font19">Sales cycle progression</li>
              <li className="mb-2 text-font19">
                Deal value and pipeline contribution
              </li>
            </ul>

            <p className="mb-0 text-font19 text-[#77787B]">
              The objective is not simply to appear in AI Overviews traffic. It
              is to ensure improved AI search visibility translates into real
              project opportunities and revenue growth.
            </p>

            {/* -------------------- Bottom Line -------------------- */}
            <h2
              className="title-65 mb-5 pt-7 lg:mb-[40px] lg:pt-[50px] 2xl:pt-[110px]"
              id="content11"
            >
              The Bottom Line: AI Search Is the New Visibility Battleground
            </h2>
            <p className="mb-[16px] text-font19 text-[#77787B]">
              AI led, zero click search is not a passing trend. It represents a
              permanent shift in how visibility is earned and how decisions are
              shaped. For built environment brands, rankings alone no longer
              guarantee influence. What matters now is whether your brand is
              cited and trusted inside AI generated answers.{" "}
            </p>

            <p className="mb-[16px] text-font19 text-[#77787B]">
              The focus must move from chasing positions to building authority
              that AI systems recognise and reference. In this environment,
              visibility means being part of the summary that informs
              early-stage research and shortlist decisions.{" "}
            </p>

            <p className="mb-[16px] text-font19 text-[#77787B]">
              The brands that succeed will be those that structure content
              clearly, demonstrate real expertise, and consistently strengthen
              trust signals across their websites. They will treat AI search
              visibility as an ongoing discipline, not a short-term optimisation
              task.
            </p>
            <p className="mb-0 text-font19 text-[#77787B]">
              The opportunity is still there. Search still drives demand. But
              the competitive advantage now belongs to brands that adapt early
              and position themselves as reliable sources that AI engines are
              confident enough to quote.{" "}
            </p>
          </div>
        </div>
      </div>
      <div className="bg-[#F2F2F2]">
        <div className="container mx-auto py-4">
          <div className="grid py-[50px] lg:py-[150px]">
            {/* Left Column */}
            <div className="col-span-2 mb-5 xl:mb-0">
              <h2 className="title-65 mb-[40px]">FAQ</h2>
              <p className="fnt-lexend text-19 mt-6 max-w-[74ch] text-gray1 lg:mt-[40px]" />
            </div>

            {/* Right Column */}
            <div className="col-span-5 w-full">
              {[
                {
                  question:
                    "How often should we audit our brand’s presence in AI search results?",
                  answer:
                    "Review AI search visibility at least quarterly. If search is a major lead source, test priority queries monthly. Consistent monitoring helps you spot visibility gaps before they affect pipeline.",
                },
                {
                  question:
                    "Which tools can help track brand mentions inside AI Overviews and chatbots?",
                  answer:
                    "Use AI visibility monitoring tools where available and combine them with structured manual prompt testing. Track brand mentions, competitor citations, and how your expertise is described across platforms.",
                },
                {
                  question:
                    "Should we create separate content specifically for AI search?",
                  answer:
                    "No. Focus on structuring existing and new content clearly with direct answers, strong expertise signals, and logical formatting. Well-structured content benefits both traditional SEO and AI search visibility.",
                },
                {
                  question:
                    "How do FAQ sections and schema markup help in zero click and AI results?",
                  answer:
                    "FAQ sections reflect real user questions, making answers easier for AI systems to extract. Schema markup improves machine readability, increasing your chances of being cited in AI generated summaries.",
                },
                {
                  question:
                    "How do we handle inaccuracies or outdated information about our brand in AI answers?",
                  answer:
                    "Update and strengthen your authoritative pages first. Clear, current, and well-structured content improves the likelihood that AI systems reference accurate information about your brand.",
                },
              ].map((item, index) => (
                <div
                  key={index}
                  className="flex w-full items-center justify-between gap-3 border-b py-6 first:border-t lg:py-[50px]"
                >
                  <div
                    className="flex cursor-pointer flex-col"
                    onClick={() => toggle(index)}
                  >
                    <h3
                      className={`text-30 ${
                        open === index ? "text-black" : "text-gray1"
                      }`}
                    >
                      {index + 1}. {item.question}
                    </h3>

                    <Collapse isOpened={open === index}>
                      <div className="pt-3 lg:pt-[22px]">
                        <p className="text-19 fnt-lexend text-gray1">
                          {item.answer}
                        </p>
                      </div>
                    </Collapse>
                  </div>

                  {open === index ? (
                    <Image
                      src={arrowactive}
                      alt="Toggle"
                      width={25}
                      height={25}
                    />
                  ) : (
                    <Image
                      src={arrowdown}
                      alt="Toggle"
                      width={20}
                      height={20}
                    />
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ClicksGoogle;
