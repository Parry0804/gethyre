"use client";

import Script from "next/script";
import { useEffect } from "react";
import { captureUtm } from "@/lib/utm";
import { track } from "@/lib/track";

const GA_ID = process.env.NEXT_PUBLIC_GA_ID;
const CLARITY_ID = process.env.NEXT_PUBLIC_CLARITY_ID;

/**
 * Loads GA4 and Microsoft Clarity when their IDs are set, stores first-touch UTM tags,
 * and sends a `cta_click` event for any link or button with a data-cta attribute.
 */
export function Analytics() {
  useEffect(() => {
    captureUtm();
    const onClick = (e: MouseEvent) => {
      const el = (e.target as HTMLElement | null)?.closest<HTMLElement>("[data-cta]");
      if (el?.dataset.cta) track("cta_click", { location: el.dataset.cta });
    };
    document.addEventListener("click", onClick);
    return () => document.removeEventListener("click", onClick);
  }, []);

  return (
    <>
      {GA_ID ? (
        <>
          <Script src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`} strategy="afterInteractive" />
          <Script id="ga4" strategy="afterInteractive">
            {`window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}gtag('js',new Date());gtag('config','${GA_ID}',{anonymize_ip:true});`}
          </Script>
        </>
      ) : null}
      {CLARITY_ID ? (
        <Script id="clarity" strategy="afterInteractive">
          {`(function(c,l,a,r,i,t,y){c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);})(window,document,"clarity","script","${CLARITY_ID}");`}
        </Script>
      ) : null}
    </>
  );
}
