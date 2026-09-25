import styles from "../css/campaign.module.css";
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
    <div className={styles.root}>
      <SmoothAnchorScroll />
      <Topbar />
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
