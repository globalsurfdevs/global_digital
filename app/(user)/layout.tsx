
import type { Metadata } from "next";
import "../../app/globals.css";
import Header from "@/app/components/HomePage/Headerv2";
import { Space_Grotesk } from "next/font/google";
import Footer from "@/app/components/HomePage/Footer";
import Script from "next/script";


const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});



export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Global Surf Digital",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        {/* Google Tag Manager Script */}
        <Script
          id="gtm-script"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src='https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);})(window,document,'script','dataLayer','GTM-TVWCC3XC');`,
          }}
        />
      </head>
      <body>
        <noscript>
          <iframe
            src="https://www.googletagmanager.com/ns.html?id=GTM-TVWCC3XC"
            height="0"
            width="0"
            style={{ display: "none", visibility: "hidden" }}
          ></iframe>
        </noscript>
        <Header />
        <div className="mt-[63px] lg:mt-0">
  {children}
        </div>
      
        <Footer />

        <Script
        id="zoho-salesiq"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            window.$zoho=window.$zoho || {};
            $zoho.salesiq = $zoho.salesiq || {
              ready: function() {}
            };
          `,
        }}
      />

<script id="zsiqscript" src="https://salesiq.zohopublic.com/widget?wc=siqd36091b63288ec869166f3cf467a881309d2a521f748c31baf5dcb110565240345bcd627f6be5997ac154cc2af1056c5" defer></script>

      </body>
    </html>
  );
}
