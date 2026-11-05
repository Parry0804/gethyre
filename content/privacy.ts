/**
 * GetHyre.ai privacy policy (draft).
 * Written for Apple App Store Review Guideline 5.1.1, Google Play's User Data policy
 * and India's DPDP Act, 2023 and DPDP Rules, 2025.
 * Everything in [brackets] must be filled in, and the final text reviewed by a lawyer, before launch.
 *
 * Inline text supports **bold** and [label](https://link) markup.
 */

export type PolicyBlock =
  | { type: "p"; text: string }
  | { type: "list"; items: string[] }
  | { type: "steps"; items: string[] }
  | { type: "note"; text: string }
  | { type: "table"; columns: string[]; rows: string[][] };

export type PolicySection = { id: string; title: string; blocks: PolicyBlock[] };

export const policyMeta = {
  effective: "[DD Month YYYY]",
  updated: "[DD Month YYYY]",
  privacyEmail: "[privacy@gethyre.ai]",
  supportEmail: "[support@gethyre.ai]",
  company: "[Registered company name]",
  address: "[registered address]",
  officer: "[Full name]",
};

export const policySummary = [
  "We never sell your personal data or use it for third-party advertising.",
  "Employers see your profile only when you apply to a job or choose to be discoverable.",
  "Voice answers in the mock interview are optional. You can always type instead.",
  "You can delete your account and data at any time, in the app or on the web.",
];

export const policySections: PolicySection[] = [
  {
    id: "who-we-are",
    title: "Who we are and what this policy covers",
    blocks: [
      {
        type: "p",
        text: "This policy explains what personal data GetHyre.ai collects, why, who we share it with, how long we keep it, and the choices you have.",
      },
      {
        type: "list",
        items: [
          `**Who we are:** GetHyre.ai is operated by ${policyMeta.company}, a company registered in India at ${policyMeta.address} ("GetHyre.ai", "we", "us"). Under India's Digital Personal Data Protection Act, 2023 ("DPDP Act"), we are the Data Fiduciary for the personal data described here.`,
          "**What it covers:** the GetHyre.ai mobile apps for Android and iOS, the website www.gethyre.ai, and related services such as campus programmes, emails and WhatsApp messages (together, the \"Services\").",
          "**What it doesn't cover:** websites, apps or services of colleges, employers and other third parties, even when we link to them. Their own privacy policies apply.",
          `**Contact:** ${policyMeta.privacyEmail}. Our Grievance Officer's details are in [section 13](#contact).`,
        ],
      },
      {
        type: "p",
        text: "By creating an account or using the Services, you are asked to agree to this policy. Where we rely on your consent, we ask for it clearly, and you can withdraw it at any time ([section 10](#your-rights)).",
      },
    ],
  },
  {
    id: "information-we-collect",
    title: "Information we collect",
    blocks: [
      {
        type: "p",
        text: "We collect only what we need to run your placement journey: diagnose your skills, build your roadmap, prepare your CV and match you to jobs.",
      },
      {
        type: "table",
        columns: ["Category", "What it includes", "Where it comes from", "Needed?"],
        rows: [
          ["Account details", "Name, email address, mobile or WhatsApp number, password (stored only as a secure hash), or your Google or Apple sign-in ID", "You", "Yes, to create an account"],
          ["Profile and education", "College, college code, course, branch, graduation year, target role, preferred job locations", "You, or your partner college when it enrols you", "Yes"],
          ["CV and work history", "CV files you upload, details we read from them (education, projects, skills, experience), and CVs we generate or tailor for you", "You; optionally your LinkedIn profile if you choose to import it", "Optional"],
          ["Assessment data", "Your answers, time taken, scores and skill levels", "Created as you use the app", "Yes, for the skill report"],
          ["AI mock interview data", "Your typed answers, **voice recordings** of spoken answers and their transcripts, [video, only if camera interviews are enabled], and the AI's feedback", "You, through the microphone [and camera] when you choose to answer by voice [or video]", "Optional; you can type instead"],
          ["Progress and results", "Readiness score, skill gaps, roadmap tasks, projects you submit, mentor reviews, certificates", "Created as you use the app; mentors", "Yes"],
          ["Job activity", "Jobs you view, save or apply to, applications, interview schedules, offers you record, and employer feedback on your applications", "You; hiring partners", "Optional"],
          ["Purchases", "Plan bought, price, date, transaction ID and status. **We do not receive or store card, UPI or bank details**", "Apple App Store, Google Play or [our payment processor, e.g. Razorpay]", "Only if you buy a plan"],
          ["Messages and support", "Emails, WhatsApp messages, survey answers and support requests you send us", "You", "Optional"],
          ["Device and usage data", "Device model, operating system, app version, language, IP address, crash logs, performance data, pages and features used, push-notification token", "Collected automatically by the app and website", "Yes, for security and to keep the app working"],
        ],
      },
      {
        type: "p",
        text: "We do **not** collect your precise location, contacts, photo library (other than files you pick), health data, or biometric identifiers. We do not use your voice to identify you.",
      },
      {
        type: "p",
        text: "**Cookies on our website:** we use essential cookies to run the site and, only with your consent, analytics cookies ([Google Analytics], [Microsoft Clarity]) to see how the site is used. You can change this in the cookie banner at any time.",
      },
    ],
  },
  {
    id: "how-we-use",
    title: "How we use your information",
    blocks: [
      {
        type: "p",
        text: "We use your data only for the purposes below, and we process it on the basis of your consent or for legitimate uses allowed under section 7 of the DPDP Act (such as complying with law).",
      },
      {
        type: "table",
        columns: ["Purpose", "Data used", "Basis"],
        rows: [
          ["Create and secure your account, sign you in, prevent fraud and abuse", "Account, device data", "Consent; legal obligations"],
          ["Run your skill assessment and AI mock interview, and produce your skill report and readiness score", "Profile, assessment, interview data", "Consent"],
          ["Build and update your roadmap and track your progress", "Progress data, assessment results", "Consent"],
          ["Generate and tailor your CV for specific jobs", "CV, profile, progress data", "Consent"],
          ["Match you to jobs and share your profile with employers you choose ([section 5](#sharing))", "Profile, CV, scores, job activity", "Consent, given per application or opt-in"],
          ["Share progress reports with your partner college, if you joined through one", "Profile, progress, placement outcome", "Consent at enrolment"],
          ["Process purchases, restore plans and handle refunds", "Purchase data", "Consent; legal obligations (tax, accounting)"],
          ["Send service messages (reminders, interview schedules, account and security notices)", "Contact details", "Consent"],
          ["Send launch news and offers by email or WhatsApp", "Contact details", "Separate opt-in consent; you can opt out at any time"],
          ["Fix bugs, measure performance and improve the Services", "Device and usage data, de-identified results", "Consent"],
          ["Respond to support requests and grievances", "Messages, account data", "Consent; legal obligations"],
          ["Meet legal, tax and regulatory duties, and respond to lawful requests", "As required", "Legal obligations"],
        ],
      },
      {
        type: "note",
        text: "**What we never do:** we do not sell your personal data, we do not share it with data brokers, and we do not use it for third-party advertising or to track you across other companies' apps and websites. If we ever want to use your data for a new purpose, we will tell you and ask for your consent first.",
      },
    ],
  },
  {
    id: "ai",
    title: "How we use AI",
    blocks: [
      {
        type: "p",
        text: "GetHyre.ai uses artificial intelligence to assess skills, run mock interviews and suggest a roadmap. Here is what that means for your data.",
      },
      {
        type: "list",
        items: [
          "**What the AI does:** it scores your assessment answers, asks interview follow-up questions, converts voice answers to text, gives feedback, estimates your readiness score, ranks your skill gaps, suggests roadmap tasks, tailors your CV and ranks jobs against your assessed skills.",
          "**AI providers:** we send the minimum needed content (for example, an interview answer or CV text) to AI service providers that process it on our behalf: [list providers]. They are contractually bound to use it only to provide the service to us and not to train their own models on it.",
          "**Training:** we do not use your identifiable data to train AI models. We may use de-identified, aggregated data (for example, average scores by role) to improve our assessments.",
          "**Your scores are guidance, not decisions:** AI scores and job matches help you and, where you choose, employers. They do not decide on their own whether you are hired. Employers make their own hiring decisions.",
          "**Accuracy:** AI can make mistakes. If you think a score or report is wrong, contact us ([section 10](#your-rights)) and a person will review it.",
          "**Recordings:** voice recordings are used to create transcripts and feedback, then [deleted within X days / kept for X days so you can replay them]. Transcripts stay with your interview results until you delete them or your account.",
        ],
      },
    ],
  },
  {
    id: "sharing",
    title: "Who we share your information with",
    blocks: [
      {
        type: "p",
        text: "We share personal data only with the people and companies below, only for the reasons given, and never for sale.",
      },
      {
        type: "list",
        items: [
          "**Hiring partners (employers):** only when you apply to a job, accept a referral or opt in to be discoverable. We share your name, contact details, CV, verified skill scores and the parts of your report you choose. Once shared, the employer also handles that data under its own privacy policy. You can turn off discoverability at any time in Settings.",
          "**Your partner college:** if you joined through your college, it can see your enrolment, progress, readiness score and placement outcome so it can support you. It cannot see your interview recordings or answers.",
          "**Mentors and reviewers:** people we engage to review your projects and give feedback see the work you submit and the details needed to review it.",
          "**Service providers (Data Processors):** companies that process data for us under contract and only on our instructions, including cloud hosting and storage [provider], AI providers ([section 4](#ai)), sign-in [Google, Apple], payments [Apple, Google Play, Razorpay], email and WhatsApp messaging [providers], analytics and crash reporting [providers], and customer support tools.",
          "**Legal and safety:** government authorities, courts or law enforcement when Indian law requires it, or to protect the rights, safety and security of our users, the public or GetHyre.ai.",
          "**Business transfers:** if GetHyre.ai is merged, acquired or sells its assets, your data may move to the new owner, who must keep protecting it under this policy. We will tell you before that happens.",
        ],
      },
      {
        type: "p",
        text: "Third-party SDKs in the app, and what they collect, are listed in the app's App Store privacy labels and Google Play Data safety section.",
      },
    ],
  },
  {
    id: "permissions",
    title: "App permissions",
    blocks: [
      {
        type: "p",
        text: "The app asks for a device permission only when you first use the feature that needs it. You can say no, and you can change your choice later in your phone's settings.",
      },
      {
        type: "table",
        columns: ["Permission", "Why we ask", "If you say no"],
        rows: [
          ["Microphone", "To record spoken answers in the AI mock interview", "You can type your answers instead"],
          ["Camera [only if used]", "[To record video answers or scan documents]", "[You can skip video answers]"],
          ["Files and photos", "To upload your CV or project files that you pick. We only access the files you choose", "You can fill in your profile manually"],
          ["Notifications", "Reminders for roadmap tasks, interviews and job updates", "You won't get reminders; everything stays in the app"],
        ],
      },
      { type: "p", text: "We do not access your contacts, call logs, SMS, location or other apps' data." },
    ],
  },
  {
    id: "retention",
    title: "How long we keep your information",
    blocks: [
      {
        type: "p",
        text: "We keep personal data only while your account is active or as long as we need it for the purpose you gave it for, then we delete it.",
      },
      {
        type: "table",
        columns: ["Data", "How long we keep it"],
        rows: [
          ["Account, profile, CV, assessment, interview and progress data", "Until you delete your account, or [3 years] after your last activity. We email you at least 48 hours before deleting an inactive account"],
          ["Voice recordings", "[X days] after the interview, then deleted. Transcripts and feedback are kept with your results"],
          ["Purchase and invoice records", "As long as Indian tax and accounting law requires, currently up to [8 years]"],
          ["Security and access logs", "At least 1 year, as required by the DPDP Rules, 2025"],
          ["Data already shared with an employer at your request", "Held by that employer under its own policy; we stop sharing anything new"],
          ["De-identified, aggregated statistics", "May be kept, because they no longer identify you"],
        ],
      },
    ],
  },
  {
    id: "delete-account",
    title: "Deleting your account",
    blocks: [
      {
        type: "p",
        text: "You can delete your account and its data at any time, from inside the app or on the web. You don't need to email or call us.",
      },
      {
        type: "list",
        items: [
          "**In the app:** Profile → Settings → Account → **Delete account**. We ask you to confirm, then start deletion.",
          "**On the web, without the app:** go to [www.gethyre.ai/delete-account], sign in or verify your email or mobile number, and confirm.",
          "**What gets deleted:** your account, profile, CVs, assessment and interview data (including recordings and transcripts), reports, roadmap, projects, job activity and messages, from our systems and from our service providers' systems.",
          "**What we keep:** only what the law requires, such as invoices and transaction records for tax, and security logs. We tell you this before you confirm.",
          "**How long it takes:** your account is deactivated immediately and fully deleted within [30] days. Backups are overwritten within [a further 30] days. We email you when deletion is complete.",
          `**Plans bought through Apple or Google:** deleting your account does not cancel a subscription. Cancel it first in your App Store or Google Play subscriptions. Refund requests for App Store purchases go through Apple; for Google Play, through Google or ${policyMeta.supportEmail}.`,
          "**Sign in with Apple:** if you used it, we also revoke our access to your Apple account.",
        ],
      },
      {
        type: "p",
        text: "If you only want to remove some data (for example, one interview recording or a CV), you can delete it in the app or ask us ([section 10](#your-rights)).",
      },
    ],
  },
  {
    id: "security",
    title: "How we protect your information",
    blocks: [
      { type: "p", text: "We use reasonable security safeguards as required by the DPDP Rules, 2025, including:" },
      {
        type: "list",
        items: [
          "encryption of data in transit (HTTPS/TLS) and at rest;",
          "access limited to staff and processors who need it, with logging and regular access reviews;",
          "secure password hashing and optional sign-in with Google or Apple;",
          "backups, monitoring and contracts that bind our processors to the same standards.",
        ],
      },
      {
        type: "p",
        text: "No system is completely secure. If a personal data breach affects you, we will tell you without delay through the app, email or SMS: what happened, when, the likely impact, what we are doing and who to contact. We will also report it to the Data Protection Board of India as the law requires.",
      },
    ],
  },
  {
    id: "your-rights",
    title: "Your rights and choices",
    blocks: [
      { type: "p", text: "Under the DPDP Act you have the right to:" },
      {
        type: "steps",
        items: [
          "**Access** a summary of the personal data we hold about you, how we use it and who we have shared it with.",
          "**Correct, complete or update** inaccurate or incomplete data. Most of it you can edit in the app.",
          "**Erase** your data or your whole account ([section 8](#delete-account)).",
          "**Withdraw consent** at any time, as easily as you gave it. This stops future processing that relied on that consent; it doesn't affect what was done before. Some features may stop working without it.",
          "**Nominate** someone to exercise these rights for you if you die or become unable to.",
          "**Raise a grievance** with us, and then with the Data Protection Board of India if you are not satisfied.",
        ],
      },
      {
        type: "p",
        text: `**How to use them:** in the app (Profile → Settings → Privacy), by emailing ${policyMeta.privacyEmail} from your registered email, or by writing to our Grievance Officer ([section 13](#contact)). Include the email or mobile number on your account so we can find it. We may need to verify your identity first. We aim to respond within [30] days, and always within the 90 days the DPDP Rules allow.`,
      },
      {
        type: "p",
        text: "**Marketing:** unsubscribe from emails using the link in any email, reply STOP on WhatsApp, or switch off marketing in Settings.",
      },
    ],
  },
  {
    id: "children",
    title: "Children",
    blocks: [
      {
        type: "p",
        text: "GetHyre.ai is meant for college students and graduates aged 18 or over. We do not knowingly collect data from anyone under 18 without verifiable consent from a parent or legal guardian.",
      },
      {
        type: "p",
        text: "If a partner college enrols a student who is under 18, we obtain verifiable parental consent before processing their data, as the DPDP Act and Rules require. For these users we do not carry out tracking, behavioural monitoring or targeted advertising. If you believe we hold a minor's data without that consent, contact us and we will delete it.",
      },
    ],
  },
  {
    id: "storage",
    title: "Where your data is stored",
    blocks: [
      {
        type: "p",
        text: "Your data is stored on servers in [India / region, e.g. AWS Mumbai]. Some service providers, such as AI providers, may process data outside India. We only transfer data to countries not restricted by the Government of India, and our contracts require the same level of protection.",
      },
    ],
  },
  {
    id: "contact",
    title: "Contact and Grievance Officer",
    blocks: [
      {
        type: "p",
        text: "For any privacy question, request or complaint, contact our Grievance Officer. We acknowledge grievances within [48 hours] and resolve them within [30] days, and in any case within 90 days. If you are not satisfied, you can complain to the Data Protection Board of India.",
      },
    ],
  },
  {
    id: "changes",
    title: "Changes to this policy",
    blocks: [
      {
        type: "p",
        text: "We may update this policy as the app or the law changes. We will post the new version here with a new \"Last updated\" date. For significant changes we will notify you in the app or by email before they take effect, and ask for fresh consent where the law requires.",
      },
    ],
  },
];
