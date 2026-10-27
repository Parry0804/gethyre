# GetHyre.ai website

The pre-launch showcase site for GetHyre.ai, built from the Figma file
[gethyred-personal → Website · v1](https://www.figma.com/design/nsOByI1JdY2hEIJx6fGirm/gethyred-personal?node-id=302-1274).

- **Stack:** Next.js 16 (App Router, Turbopack), React 19, TypeScript, Tailwind CSS 4, Zod.
- **Pages (all static):** Home, Students, Colleges, Companies, About, Early access, How we assess,
  Campus ambassadors, Guides, Careers, Press kit, Privacy, Terms, Thank you, 404.
- **Forms:** student early access, college partnership, company hiring interest, campus ambassador.
  One Server Action validates, checks spam, saves to Google Sheets and sends emails through Resend.

## Run it on your computer

You need [Node.js](https://nodejs.org) 20.9 or newer.

```bash
npm install
npm run dev
```

Open http://localhost:3000. With no settings, forms work in development and print each lead in the terminal.

Other commands:

```bash
npm run build   # production build (also type-checks)
npm run start   # serve the production build
npm run lint    # ESLint
```

## Settings

Copy `.env.example` to `.env.local` and fill in what you have. Every setting is optional for local work.

| Setting | What it turns on |
| --- | --- |
| `NEXT_PUBLIC_WHATSAPP_NUMBER` | The floating "Chat on WhatsApp" button and WhatsApp links |
| `NEXT_PUBLIC_SURVEY_URL` | The campus survey buttons |
| `NEXT_PUBLIC_BOOKING_URL` | "Book a partnership call" opens your calendar link |
| `NEXT_PUBLIC_DEMO_VIDEO_URL` | Replaces the video placeholder with the embedded video |
| `GOOGLE_*` | Saves every lead as a row in Google Sheets |
| `RESEND_API_KEY`, `EMAIL_FROM`, `LEADS_ALERT_EMAIL` | Auto-reply emails, and alerts for college, company and ambassador leads |
| `*_TURNSTILE_*` | Cloudflare Turnstile spam check on all forms |
| `NEXT_PUBLIC_GA_ID`, `NEXT_PUBLIC_CLARITY_ID` | GA4 events and Clarity heatmaps |

### Google Sheets

1. Create a Google Sheet with four tabs: `Students`, `Colleges`, `Companies`, `Ambassadors`.
2. Add headers in row 1 (optional but helpful):
   - Students: `Submitted (IST), Name, Email, WhatsApp, College, Course, Target role, Page, UTM source, UTM medium, UTM campaign, Consent version`
   - Colleges: `Submitted (IST), Name, Designation, College, Phone, Email, Final-year students, Page, UTM source, UTM medium, UTM campaign, Consent version`
   - Companies: `Submitted (IST), Name, Company, Email, Phone, Roles, Freshers per year, Page, UTM source, UTM medium, UTM campaign, Consent version`
   - Ambassadors: `Submitted (IST), Name, Email, WhatsApp, College, Course, Why, Page, UTM source, UTM medium, UTM campaign, Consent version`
3. In Google Cloud, create a service account, enable the Google Sheets API and create a JSON key.
4. Share the sheet with the service account's email as **Editor**.
5. Set `GOOGLE_SHEET_ID` (the long ID in the sheet's URL), `GOOGLE_SERVICE_ACCOUNT_EMAIL` and `GOOGLE_PRIVATE_KEY`.

If a sheet write fails and Resend is set up, the lead is emailed to `LEADS_ALERT_EMAIL` so nothing is lost.
In production, if neither Sheets nor Resend is configured, forms show "Our form isn't connected yet" instead of losing the lead.

### Campus tracking

Give each college its own link, for example `https://gethyre.ai/early-access?utm_source=college-name&utm_medium=qr`.
The first UTM tags a visitor arrives with are saved with their form, so the sheet shows sign-ups per college.

## Deploy

1. Push this folder to a GitHub repository.
2. Import it in [Vercel](https://vercel.com/new). The free Hobby plan is for non-commercial use only, so use a Pro seat for the live site.
3. Add the settings from `.env.example` in Vercel → Project → Settings → Environment Variables.
4. Add your domain in Vercel → Project → Domains and update `NEXT_PUBLIC_SITE_URL`.
5. Submit `https://<domain>/sitemap.xml` in Google Search Console.

## Where things live

```
app/                 one folder per page; actions/leads.ts handles every form
components/ui.tsx    buttons, sections, headings, cards
components/layout/   nav + mobile menu, footer, WhatsApp button, analytics
components/marketing/ phone mockup, journey stepper, FAQ, download cards, page hero
components/forms/    the shared lead form
content/journey.ts   the 7 journey steps and the FAQ
lib/site.ts          contact details, social links, downloads, nav
lib/forms.ts         form fields, validation rules, sheet columns
public/screens/      app screens exported from Figma (780×1688, 2×)
public/brand/        logo, logo mark, social share image
content/photos.ts    photos (Unsplash License, loaded from images.unsplash.com) with credits
app/globals.css      design tokens from Figma (colours, font, radii)
```

## Security

What's in place (see `next.config.ts`, `app/actions/leads.ts` and `lib/`):

- **Secrets stay on the server.** Only `NEXT_PUBLIC_*` values reach the browser, and none of them are secret.
  Google, Resend and Turnstile keys are read only in files marked `server-only`. Never put a secret in a
  `NEXT_PUBLIC_` variable, and never commit `.env.local` (it's git-ignored).
- **Security headers on every page:** Content-Security-Policy, HSTS, X-Frame-Options/frame-ancestors (no
  embedding in other sites), nosniff, Referrer-Policy, Permissions-Policy, COOP. No `X-Powered-By` header.
  If you add a new outside service (a chat widget, a new analytics tool), add its domain to the CSP in
  `next.config.ts` or the browser will block it.
- **Forms:** only the expected fields are accepted; text is cleaned of control and invisible characters and
  length-capped; names may only contain letters; values that would run as spreadsheet formulas are neutralised;
  personal data is kept out of server logs.
- **Spam and abuse:** hidden honeypot field; rate limits of 5 valid submissions per IP per 10 minutes and 3 per
  email address per hour (in memory, per server instance); Cloudflare Turnstile when its keys are set.
  Server Actions only accept same-origin requests (built into Next.js), so there's no CORS to configure.

Recommended before launch:

1. Turn on **Cloudflare Turnstile** (`NEXT_PUBLIC_TURNSTILE_SITE_KEY` + `TURNSTILE_SECRET_KEY`).
2. Add a **Vercel Firewall rate-limit rule** for POST requests to `/`, `/early-access`, `/colleges`,
   `/companies` and `/ambassadors` (Vercel → Project → Firewall). It works across all instances.
3. In Google Cloud, give the service account access to **only the leads sheet** (share just that sheet with it)
   and keep its JSON key out of email and chat. Rotate the key if it's ever exposed.
4. Keep dependencies patched: run `npm audit` and `npm outdated` monthly, and update `next`, `react` and
   `react-dom` as soon as a security release comes out.
5. If you add logins, a database or an admin area later, those need authentication, per-user access checks
   and password hashing; none exist today because the site has no accounts.

## Before launch

- Search the code for `[` and replace every bracketed placeholder (team, college logos, survey stat,
  company name, city, roles covered, legal text).
- Put the brochure and sample report PDFs in `public/downloads/` and set their `href` in `lib/site.ts`.
- Replace `public/brand/logo.png` with a vector logo when you have one (the current one is cut from a JPEG).
- Have the privacy policy and terms reviewed.
- Keep pricing and business-model wording off the site.
