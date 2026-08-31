import Script from "next/script";

const GA_MEASUREMENT_ID = "G-3G93L0H2NV";

export default function GoogleAnalytics() {
  return (
    <>
      <Script id="ga-optout-check" strategy="beforeInteractive">
        {`
          (function () {
            try {
              var params = new URLSearchParams(window.location.search);
              if (params.get("ga_optout") === "1") {
                localStorage.setItem("ga_optout", "1");
              }
              if (localStorage.getItem("ga_optout") === "1") {
                window["ga-disable-${GA_MEASUREMENT_ID}"] = true;
              }
            } catch (e) {}
          })();
        `}
      </Script>
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`}
        strategy="afterInteractive"
      />
      <Script id="ga-init" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){ dataLayer.push(arguments); }
          gtag('js', new Date());
          gtag('config', '${GA_MEASUREMENT_ID}');
        `}
      </Script>
    </>
  );
}
