import Topbar from "./Topbar";
import Hero from "./Hero";
import IntroSplit from "./IntroSplit";
import WhyItMatters from "./WhyItMatters";
import WalkAwayCards from "./WalkAwayCards";
import WhoForChips from "./WhoForChips";
import TestStructure from "./TestStructure";
import Faq from "./Faq";
import BookCallSection from "./BookCallSection";
import Footer from "./Footer";
import SmoothAnchorScroll from "./SmoothAnchorScroll";

/**
 * Self-contained landing page for the "ChatGPT Ads" campaign.
 *
 * Everything (styles, animation, form state) lives under this one wrapper —
 * drop <ChatGptAdsCampaign /> into any route and it won't touch the rest of
 * the app's global styles, fonts, or layout.
 */
export default function ChatGptAdsCampaign() {
  return (
    <div className="isolate overflow-x-hidden bg-white font-sans text-base leading-[1.6] text-[#0a0a0a] antialiased [&_h2]:max-w-[20ch] [&_h2]:text-[clamp(28px,4vw,44px)] [&_h2]:font-medium [&_h2]:leading-[1.08] [&_h2]:tracking-[-0.025em] [&_section]:relative [&_section]:py-[104px] max-[640px]:[&_section]:py-[72px] [&_strong]:font-semibold">
      <SmoothAnchorScroll />
      {/* <Topbar /> */}
      <Hero />
      <IntroSplit />
      <WhyItMatters />
      <WalkAwayCards />
      <WhoForChips />
      <TestStructure />
      <Faq />
      <BookCallSection />
      {/* <Footer /> */}
    </div>
  );
}
