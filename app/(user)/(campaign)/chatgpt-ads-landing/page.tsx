import type { Metadata } from 'next';
import { Space_Grotesk } from 'next/font/google';
import ChatGptAdsCampaign from '@/app/components/gpt-campaign/ChatGptAdsCampaign';
// import { faqItems } from '@/app/components/gpt-campaign/faqData';

const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--gsca-font-family',
  display: 'swap',
});

const PAGE_URL = 'https://www.globalsurf.ae/chatgpt-ads-landing'; 

export const metadata: Metadata = {
  title: 'ChatGPT Ads for Your Business | GS Digital',
  description:
    "A new advertising channel has opened up inside ChatGPT. Book a free 30-minute call to find out if it's worth testing for your business.",
  alternates: { canonical: PAGE_URL },
  openGraph: {
    title: 'ChatGPT Ads for Your Business | GS Digital',
    description:
      "A new advertising channel has opened up inside ChatGPT. Book a free 30-minute call to find out if it's worth testing for your business.",
    url: PAGE_URL,
    siteName: 'GS Digital',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'ChatGPT Ads for Your Business | GS Digital',
    description: "A new advertising channel has opened up inside ChatGPT. Book a free 30-minute call.",
  },
};

export default function ChatGptAdsPage() {
  const faqJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    // mainEntity: faqItems.map((item) => ({
    //   '@type': 'Question',
    //   name: item.question,
    //   acceptedAnswer: {
    //     '@type': 'Answer',
    //     text: item.answer,
    //   },
    // })),
  };

  return (
    // <div className={spaceGrotesk.variable}>
    //   <script
    //     type="application/ld+json"
   
    //     dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
    //   />
      <ChatGptAdsCampaign />
    // </div>
  );
}
