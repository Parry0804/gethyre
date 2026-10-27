"use client";

import { useEffect, useState } from "react";
import { CheckIcon } from "@/components/icons";
import { ArrowLink, ButtonLink, Card, Container } from "@/components/ui";
import type { LeadKind } from "@/lib/forms";
import { site } from "@/lib/site";

type Lead = { kind: LeadKind; firstName: string };

export function ThankYou() {
  const [lead, setLead] = useState<Lead | null>(null);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    try {
      const raw = sessionStorage.getItem("gh_lead");
      // eslint-disable-next-line react-hooks/set-state-in-effect
      if (raw) setLead(JSON.parse(raw) as Lead);
    } catch {
      // ignore
    }
  }, []);

  const student = !lead || lead.kind === "student" || lead.kind === "ambassador";
  const name = lead?.firstName ? `, ${lead.firstName}` : "";
  const shareUrl = `${site.url}/early-access?utm_source=referral&utm_medium=whatsapp`;
  const shareText = `I just joined GetHyre.ai early access. It shows you your skill gaps before placement season. Join here: ${shareUrl}`;

  const headline =
    lead?.kind === "college" || lead?.kind === "company"
      ? `Thanks${name}. We'll be in touch.`
      : lead?.kind === "ambassador"
        ? `Application received${name}.`
        : `You're on the list${name}.`;

  const body =
    lead?.kind === "college" || lead?.kind === "company"
      ? "We'll reply within 2 working days. A confirmation is on its way to your inbox."
      : lead?.kind === "ambassador"
        ? "We'll reply within a week. A confirmation is on its way to your inbox."
        : "We've sent you a confirmation. We'll invite you as soon as GetHyre.ai goes live at your campus.";

  return (
    <section className="py-12 lg:py-24">
      <Container className="flex flex-col items-center gap-4 text-center lg:gap-5">
        <span className="flex size-18 items-center justify-center rounded-full bg-success-tint text-success lg:size-22">
          <CheckIcon size={36} strokeWidth={2.5} />
        </span>
        <h1 className="max-w-[760px] text-[32px] font-extrabold leading-[1.15] tracking-[-0.025em] lg:text-5xl">{headline}</h1>
        <p className="max-w-[640px] text-base leading-relaxed text-body lg:text-[19px]">{body}</p>

        {student ? (
          <>
            <ol className="mt-4 grid w-full max-w-[1000px] gap-3 text-left md:grid-cols-3 lg:mt-6 lg:gap-5">
              {[
                ["Check your inbox", "Your confirmation email has a link to save us as a contact."],
                ["We open at your campus", "You'll get an invite on email and WhatsApp when your college goes live."],
                ["Start with your assessment", "Your first step is the skill assessment and AI mock interview."],
              ].map(([t, b], i) => (
                <li key={t}>
                  <Card className="flex h-full flex-col gap-2.5">
                    <span className="text-[15px] font-bold text-primary">{i + 1}</span>
                    <p className="text-[17px] font-bold lg:text-lg">{t}</p>
                    <p className="text-sm leading-relaxed text-body lg:text-[15px]">{b}</p>
                  </Card>
                </li>
              ))}
            </ol>

            <div className="mt-2 flex w-full max-w-[1000px] flex-col items-center gap-4 rounded-[24px] bg-tint p-6 lg:p-9">
              <h2 className="text-[21px] font-extrabold tracking-[-0.01em] lg:text-2xl">Bring your classmates along</h2>
              <p className="max-w-[620px] text-[15px] leading-normal text-body lg:text-[17px]">
                The more students from your college join, the sooner we can open there.
              </p>
              <div className="flex w-full flex-col gap-3 sm:w-auto sm:flex-row">
                <ButtonLink
                  href={`https://wa.me/?text=${encodeURIComponent(shareText)}`}
                  external
                  variant="whatsapp"
                  track="share-whatsapp"
                >
                  Share on WhatsApp
                </ButtonLink>
                <button
                  type="button"
                  onClick={async () => {
                    try {
                      await navigator.clipboard.writeText(shareUrl);
                      setCopied(true);
                    } catch {
                      setCopied(false);
                    }
                  }}
                  className="inline-flex min-h-[52px] items-center justify-center rounded-[14px] border-[1.5px] border-primary bg-white px-6 font-semibold text-primary hover:bg-tint"
                >
                  {copied ? "Link copied" : "Copy invite link"}
                </button>
              </div>
            </div>
          </>
        ) : null}

        <div className="mt-2 flex flex-col items-center gap-3 lg:flex-row lg:gap-8">
          {site.surveyUrl ? (
            <ArrowLink href={site.surveyUrl} external>
              Take the 2-minute campus survey
            </ArrowLink>
          ) : null}
          {site.social.instagram ? (
            <ArrowLink href={site.social.instagram} external>
              Follow us on Instagram
            </ArrowLink>
          ) : null}
          <ArrowLink href="/">Back to home</ArrowLink>
        </div>
      </Container>
    </section>
  );
}
