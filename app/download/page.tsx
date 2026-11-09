import type { Metadata } from "next";
import QRCode from "qrcode";
import { CheckIcon } from "@/components/icons";
import { StoreButton } from "@/components/layout/store-buttons";
import { PhoneMockup } from "@/components/marketing/phone-mockup";
import { Reveal } from "@/components/motion";
import { Container, Eyebrow, H1, Lead, Section, SectionHeader, cx } from "@/components/ui";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Download the app",
  description: "Get GetHyre.ai on iPhone and Android: skill assessment, AI mock interview, skill report, roadmap, ATS-ready CV and job matches in one app.",
  alternates: { canonical: "/download" },
};

const inApp = [
  "Role-specific skill assessment",
  "10-minute AI mock interview with follow-ups",
  "Skill report with your readiness score and ranked gaps",
  "Month-by-month roadmap built from your gaps",
  "ATS-ready CV, tailored for each job",
  "Jobs matched to the skills you've proved",
];

/** Generates a QR code as an inline SVG at build time (the store URL comes from site config, not users). */
async function qr(url: string) {
  return QRCode.toString(url, { type: "svg", margin: 0, errorCorrectionLevel: "M", color: { dark: "#111827", light: "#ffffff00" } });
}

export default async function DownloadPage() {
  const platforms = [
    {
      store: "ios" as const,
      title: "iPhone",
      note: "For iPhone, from the App Store.",
      url: site.apps.ios,
      screen: "/screens/home-diagnose.webp",
      alt: "GetHyre.ai home screen on iPhone",
    },
    {
      store: "android" as const,
      title: "Android",
      note: "For Android phones, from Google Play.",
      url: site.apps.android,
      screen: "/screens/report.webp",
      alt: "GetHyre.ai skill report on Android",
    },
  ];
  const codes = await Promise.all(platforms.map((p) => (p.url ? qr(p.url) : Promise.resolve(""))));
  const anyLive = platforms.some((p) => p.url);

  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden pb-10 pt-10 lg:pb-16 lg:pt-16">
        <div className="bg-dots absolute inset-0 [mask-image:radial-gradient(ellipse_at_70%_20%,#000_15%,transparent_65%)]" aria-hidden />
        <Container className="relative grid items-center gap-10 lg:grid-cols-[minmax(0,1fr)_520px] lg:gap-16">
          <div className="flex flex-col items-start gap-5">
            <Eyebrow>Get the app</Eyebrow>
            <H1 className="lg:text-[64px]">Your placement journey, in your pocket.</H1>
            <Lead className="max-w-[560px]">
              Take the assessment, practise interviews, follow your roadmap and see matched jobs on iPhone or Android.
            </Lead>
            <div className="flex flex-wrap gap-3 pt-1">
              <StoreButton store="ios" size="lg" />
              <StoreButton store="android" size="lg" />
            </div>
            {!anyLive ? <p className="text-sm text-muted">Store links are being finalised. Check back shortly.</p> : null}
          </div>
          <div className="relative flex h-[420px] justify-center sm:h-[480px]">
            <div className="absolute bottom-0 left-1/2 h-[78%] w-full -translate-x-1/2 rounded-[32px] bg-sky" aria-hidden />
            <div className="absolute left-[8%] top-12 hidden -rotate-6 sm:block">
              <PhoneMockup src="/screens/report.webp" alt="Skill report screen" width={210} />
            </div>
            <div className="animate-float relative z-10 mt-2">
              <PhoneMockup src="/screens/home-diagnose.webp" alt="GetHyre.ai home screen" width={240} priority />
            </div>
            <div className="absolute right-[8%] top-12 hidden rotate-6 sm:block">
              <PhoneMockup src="/screens/plan.webp" alt="Roadmap screen" width={210} />
            </div>
          </div>
        </Container>
      </section>

      {/* Choose your phone */}
      <Section tone="white" labelledBy="platforms-title">
        <SectionHeader id="platforms-title" eyebrow="Choose your phone" title="Download for iPhone or Android." />
        <div className="mt-8 grid gap-4 md:grid-cols-2 lg:mt-12 lg:gap-6">
          {platforms.map((p, i) => (
            <Reveal key={p.store} delay={i * 100} className="flex flex-col gap-6 rounded-[20px] border border-line bg-surface p-6 sm:flex-row sm:items-center lg:p-8">
              <div className="flex flex-1 flex-col items-start gap-4">
                <h3 className="text-2xl font-extrabold tracking-[-0.02em] lg:text-[28px]">{p.title}</h3>
                <p className="text-[15px] text-body">{p.note}</p>
                <StoreButton store={p.store} size="lg" />
              </div>
              {codes[i] ? (
                <figure className="flex shrink-0 flex-col items-center gap-2">
                  <div
                    className="size-[132px] rounded-xl border border-line bg-white p-3"
                    // Trusted: generated at build time from the store URL in site config.
                    dangerouslySetInnerHTML={{ __html: codes[i] }}
                  />
                  <figcaption className="text-xs text-muted">Scan with your phone camera</figcaption>
                </figure>
              ) : (
                <div className="hidden shrink-0 sm:block">
                  <PhoneMockup src={p.screen} alt={p.alt} width={130} />
                </div>
              )}
            </Reveal>
          ))}
        </div>
      </Section>

      {/* What's in the app */}
      <Section labelledBy="inapp-title">
        <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
          <div className="flex flex-col gap-6">
            <SectionHeader
              id="inapp-title"
              eyebrow="What's in the app"
              title="The whole journey, from first test to first job."
              intro="Everything you see on this site lives in the app. Start with the assessment and see exactly where you stand."
            />
            <ul className="grid gap-3 sm:grid-cols-2">
              {inApp.map((x) => (
                <li key={x} className="flex items-start gap-3 rounded-xl border border-line bg-white px-4 py-3 text-[15px] font-semibold text-ink">
                  <span className="mt-0.5 flex size-5 shrink-0 items-center justify-center rounded-full bg-primary text-white">
                    <CheckIcon size={12} />
                  </span>
                  {x}
                </li>
              ))}
            </ul>
          </div>
          <div className="flex justify-center gap-4">
            {["/screens/assessment.webp", "/screens/interview.webp", "/screens/home-place.webp"].map((src, i) => (
              <div key={src} className={cx(i === 1 ? "mt-0" : "mt-10", i === 2 && "hidden sm:block")}>
                <PhoneMockup src={src} alt="" width={170} />
              </div>
            ))}
          </div>
        </div>
      </Section>
    </>
  );
}
