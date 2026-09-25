import Script from "next/script";

const OPENAI_PIXEL_ID = "8WbMm1MBuRkNWvVvEV8toy";

export default function ChatGptAdsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Script
        id="openai-pixel"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `(function (w, d, s, u) {
  if (w.oaiq) return;
  var q = function () { q.q.push(arguments); };
  q.q = [];
  w.oaiq = q;
  var js = d.createElement(s);
  js.async = true;
  js.src = u;
  var f = d.getElementsByTagName(s)[0];
  f.parentNode.insertBefore(js, f);
})(window, document, "script", "https://bzrcdn.openai.com/sdk/oaiq.min.js");
oaiq("init", { pixelId: "${OPENAI_PIXEL_ID}" });`,
        }}
      />
      {children}
    </>
  );
}
